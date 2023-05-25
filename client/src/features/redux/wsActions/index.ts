import type { ChatTypes } from '../../../types';
import type { User } from '../../../types/userType';
import {
  WS_USER_SEND_MESSAGE,
  WsCloseActionType,
  WsConnectActionType,
  WsInitActionType,
  WsUserAddMessage,
  WsUserOnLineAction,
  WsUserProject,
  WsUserSendMessage,
} from '../../../types/wsSagaTypes';
import {
  WS_USER_ADD_MESSAGE,
  WS_USER_IN_PROJECT,
  WS_CLOSE,
  WS_CONNECT,
  WS_INIT,
  WS_USER_ONLINE,
} from '../../../types/wsSagaTypes';

export const wsInitAction = (): WsInitActionType => ({
  type: WS_INIT,
});

export const wsConnectAction = (): WsConnectActionType => ({
  type: WS_CONNECT,
});

export const wsCloseAction = (): WsCloseActionType => ({
  type: WS_CLOSE,
});

export const wsUserOnlineAction = (users: User[]): WsUserOnLineAction => ({
  type: WS_USER_ONLINE,
  payload: users,
});

export const wsUserInProjectAction = (payload: number): WsUserProject => ({
  type: WS_USER_IN_PROJECT,
  payload,
});

export const wsAddMessageAction = (payload: ChatTypes): WsUserAddMessage => ({
  type: WS_USER_ADD_MESSAGE,
  payload,
});

export const wsSendMessageAction = (payload: ChatTypes): WsUserSendMessage => ({
  type: WS_USER_SEND_MESSAGE,
  payload,
});
