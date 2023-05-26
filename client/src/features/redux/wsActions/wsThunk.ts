import axios from 'axios';
import type { ChatTypes } from '../../../types';
import type { AppThunk } from '../store';
import { wsSetMessages } from './wsSlice';
import { wsAddMessageAction } from '.';

export const wsAddMessageThunk =
  (messages: ChatTypes): AppThunk =>
  (dispatch) =>
    axios
      .post<ChatTypes>(`/projects/${messages.projectId}`, messages)
      .then(({ data }) => dispatch(wsAddMessageAction(data)))
      .catch(console.log);

export const wsSetMessagesThunk =
  (projectId: ChatTypes['projectId']): AppThunk =>
  (dispatch) => {
    axios
      .get<ChatTypes[]>(`/chat/${projectId}`)
      .then(({ data }) => dispatch(wsSetMessages(data)))
      .catch(console.log);
  };
