import { eventChannel, END } from 'redux-saga';
import type { EventChannel } from 'redux-saga';
import type { ActionPattern } from 'redux-saga/effects';
import { take, put, call, takeEvery, fork } from 'redux-saga/effects';
import {
  WS_CLOSE,
  WS_CONNECT,
  WS_INIT,
  WS_USER_ADD_MESSAGE,
  WS_USER_IN_PROJECT,
  WS_USER_SEND_MESSAGE,
  type WsSagaTypes,
} from '../../types/wsSagaTypes';
import { wsCloseAction, wsConnectAction } from '../redux/wsActions';
import { wsAddMessage, wsSet } from '../redux/wsActions/wsSlice';

function createSocketChannel(socket: WebSocket): EventChannel<WsSagaTypes> {
  return eventChannel((emit) => {
    socket.onopen = () => {
      emit(wsConnectAction());
    };

    socket.onerror = function (error) {
      emit(wsCloseAction());
    };

    socket.onmessage = function (event: MessageEvent<string>) {
      const receivedData = JSON.parse(event.data) as WsSagaTypes;
      emit(receivedData);
    };

    socket.onclose = function (event) {
      emit(wsCloseAction());
    };

    return () => {
      console.log('Socket off');
      emit(END);
    };
  });
}

// сага которая перехватывает событие входа в проект

function* updateUserProject(socket: WebSocket): Generator {
  while (true) {
    const message = yield take(WS_USER_IN_PROJECT);
    socket.send(JSON.stringify(message));
  }
}

function* wsSendMessage(socket: WebSocket): Generator {
  while (true) {
    console.log('saga');

    const message = yield take(WS_USER_SEND_MESSAGE);
    socket.send(JSON.stringify(message));
  }
}

function* wsWorker(): Generator<unknown, void, WsSagaTypes> {
  const socket = new WebSocket('ws://localhost:3001');
  const socketChannel = yield call(createSocketChannel, socket);

  yield fork(updateUserProject, socket);

  yield fork(wsSendMessage, socket);

  while (true) {
    try {
      const actionFromBack = yield take(socketChannel as unknown as ActionPattern<WsSagaTypes>);
      console.log('----', actionFromBack);
      switch (actionFromBack.type) {
        case WS_CONNECT:
          yield put(wsSet(true));
          break;
        case WS_CLOSE:
          yield put(wsSet(false));
          break;
        case WS_USER_ADD_MESSAGE:
          console.log('32423423423423423423423');
          yield put(wsAddMessage(actionFromBack.payload));
          break;
        default:
          break;
      }
    } catch {
      console.log('socket error');
    }
  }
}

export default function* wsWatcher(): Generator {
  yield takeEvery(WS_INIT, wsWorker);
}
