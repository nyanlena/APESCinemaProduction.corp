import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ChatTypes } from '../../../types';

type InitStateType = {
  status: boolean;
  messages: ChatTypes[];
};

const initialState: InitStateType = {
  status: false,
  messages: [],
};

const wsSlice = createSlice({
  name: ' wsSlice',
  initialState,
  reducers: {
    wsSet(state, action: PayloadAction<boolean>) {
      state.status = action.payload;
    },
    wsAddMessage(state, action: PayloadAction<ChatTypes>) {
      state.messages.push(action.payload);
    },
    wsSetMessages(state, action: PayloadAction<ChatTypes[]>) {
      state.messages = action.payload;
    },
  },
});

export default wsSlice.reducer;
export const { wsSet, wsAddMessage, wsSetMessages } = wsSlice.actions;
