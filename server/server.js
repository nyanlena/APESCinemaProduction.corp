const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const store = require("session-file-store");
const http = require("http");
const { WebSocketServer } = require("ws");
// const { Server } = require("socket.io");
const passport = require("passport");
const helmet = require("helmet");
const path = require("path");
const authRouter = require("./routers/authRouter");
const pathMiddlewares = require("./middlewares/pathMiddlewares");
const mainRouter = require("./routers/mainRouter");
const profileRouter = require("./routers/profileRouter");
const seachRouter = require("./routers/seachRouter");
const searchRouter = require("./routers/searchRouter");
const favoriteRouter = require("./routers/favoriteRouter");
const orderRouter = require("./routers/orderRouter");
const projectRouter = require("./routers/projectRouter");
const nodemailerRouter = require("./routers/nodemailerRouter");
const chatRouter = require("./routers/chatRouter");
const addRouter = require("./routers/addRouter");
const api = require("./routers/api");
require("dotenv").config();

require("./auth/google");
require("./auth/passport");
require("./db/models/user");

const FileStore = store(session);
// require('./google/auth');
const PORT = process.env.PORT || 3001;

const map = new Map();

const sessionConfig = session({
  name: "user_sid",
  secret: "test",
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
});

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(sessionConfig);
app.use(express.static("public"));
app.use(pathMiddlewares);

// app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.use(helmet());
// app.use("/api/lk", transactionRouter);

app.use("/", mainRouter);
app.use("/api/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/seach", seachRouter);
app.use("/search", searchRouter);
app.use("/projects", projectRouter);
app.use("/favorites", favoriteRouter);
app.use("/orders", orderRouter);
app.use("/chat", chatRouter);
app.use("/addpeople", addRouter);
app.use("/api/v1", api);
app.use("/api/auth/login/forget", nodemailerRouter);

const server = http.createServer(app);

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

server.on("upgrade", (request, socket, head) => {
  console.log("Parsing session from request...");

  sessionConfig(request, {}, () => {
    if (!request.session.user) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    console.log("Session is parsed!");

    // socket.removeListener('error', onSocketError);

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });
});

// app.get("/public/:img", (req, res) => {
//   try {
//     console.log(req.params.img);
//     const filePath = path.join(__dirname, "../public", req.params.img);
//     res.sendFile(filePath);
//   } catch (error) {
//     console.log(error);
//   }
// });
// app.use((err, req, res, next) => {
//   console.log(err);
// });

wss.on("connection", (ws, request) => {
  const { user } = request.session;

  map.set(user.id, [ws, user]);

  map.forEach(([wsItem, userItem]) => {
    wsItem.send(
      JSON.stringify({
        type: "WS_USER_ONLINE",
        payload: Array.from(map.values()).map(([, userI]) => userI),
      })
    );
  });

  ws.on("error", console.error);

  ws.on("message", (message) => {
    //
    // Here we can now use session parameters.
    //
    const fromFront = JSON.parse(message);
    console.log(fromFront);
    switch (fromFront.type) {
      case "WS_USER_IN_PROJECT":
        console.log("======1234567543245676543=======");
        map.set(user.id, [ws, user, fromFront.payload]);
        map.forEach(([wsItem, userItem, projectId]) => {
          if (projectId === fromFront.payload) {
            wsItem.send(
              JSON.stringify({
                type: "WS_USER_ONLINE_P",
                payload: Array.from(map.values())
                  .filter(([, , userI]) => userI === fromFront.payload)
                  .map(([, userI]) => userI),
              })
            );
          }
        });
        break;

      // case "WS_USER_ADD_MESSAGE":
      // отправить сообщение всем кто в чат
      // map.forEach(([wsItem, userItem, projectId]) => {
      //   if (projectId === fromFront.payload.projectId) {
      //     wsItem.send(
      //       JSON.stringify({
      //         type: "WS_USER_ADD_MESSAGE",
      //         payload: Array.from(map.values())
      //           .filter(
      //             ([, , userI]) => userI === fromFront.payload.projectId
      //           )
      //           .map(([, userI]) => userI),
      //       })
      //     );
      //   }
      // });
      // break;
      case "WS_USER_SEND_MESSAGE":
        // отправить сообщение всем кто в чат
        console.log("========== WSSSSSSS =====");
        map.forEach(([wsItem, userItem, projectId]) => {
          if (projectId === fromFront.payload.projectId) {
            wsItem.send(
              JSON.stringify({
                type: "WS_USER_ADD_MESSAGE",
                payload: {
                  name: user.email,
                  body: fromFront.payload.body,
                  projectId: fromFront.payload.projectId,
                },
              })
            );
          }
        });
        break;
      default:
        break;
    }
  });

  ws.on("close", () => {
    map.delete(user.id);
  });
});

// app.use((err, req, res, next) => {
//   // logic
//   console.log(err);
// });

server.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
