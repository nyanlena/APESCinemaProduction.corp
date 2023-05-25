import type { ChatTypes } from './chatType';
import type { User } from './userType';

export const WS_INIT = 'WS_INIT';
export type WsInitActionType = {
  type: typeof WS_INIT;
};

export const WS_CONNECT = 'WS_CONNECT';
export type WsConnectActionType = {
  type: typeof WS_CONNECT;
};

export const WS_CLOSE = 'WS_CLOSE';
export type WsCloseActionType = {
  type: typeof WS_CLOSE;
};

export const WS_USER_ONLINE = 'WS_USER_ONLINE';

export type WsUserOnLineAction = {
  type: typeof WS_USER_ONLINE;
  payload: User[];
};

export const WS_USER_IN_PROJECT = 'WS_USER_IN_PROJECT';

export type WsUserProject = {
  type: typeof WS_USER_IN_PROJECT;
  payload: number;
};

export const WS_USER_ADD_MESSAGE = 'WS_USER_ADD_MESSAGE';

export type WsUserAddMessage = {
  type: typeof WS_USER_ADD_MESSAGE;
  payload: ChatTypes;
};

export const WS_USER_SEND_MESSAGE = 'WS_USER_SEND_MESSAGE';

export type WsUserSendMessage = {
  type: typeof WS_USER_SEND_MESSAGE;
  payload: ChatTypes;
};
export type WsSagaTypes =
  | WsInitActionType
  | WsConnectActionType
  | WsCloseActionType
  | WsUserProject
  | WsUserAddMessage
  | WsUserSendMessage;
