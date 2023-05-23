const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../db/models/user');

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.mail.ru',
    port: 465,
    secure: true, // true only for 465, folse for other ports
    auth: {
      user: 'testtestovtestovich01@mail.ru',
      pass: 'JAmKBRNHkrqkZZj5uV0G',
    },
  },
  {
    from: '<testtestovtestovich01@mail.ru>',
  },
);

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log('Email sent: ', info);
  });
};

function sendEmail(user, uuid) {
  const mailOptions = {
    from: 'testtestovtestovich01@mail.ru',
    to: user.email,
    subject: 'Код подтверждения',
    html: `<p>Пожалуйста, перейдите по этой разовой ссылке для смены пароля: 
    <br /><strong>http://localhost:5173/login/forget/${uuid}</strong></p>`,
  };

  const transporter = nodemailer.createTransport(
    {
      host: 'smtp.mail.ru',
      port: 465,
      secure: true, // true only for 465, folse for other ports
      auth: {
        user: 'testtestovtestovich01@mail.ru',
        pass: 'Sukka20010101',
      },
    },
    {
      from: '<testtestovtestovich01@mail.ru>',
    },
  );

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email send', info);
    }
  });
}

module.exports = sendEmail;
module.exports = mailer;
