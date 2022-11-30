import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  state: null,
  options: {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    autoHideDuration: 6000,
    message: 'Hi',
    variant: null,
  },
};
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    showMessage: (state, action) => {
      state.state = true;
      const { message, ...options } = action.payload;
      let messagetext = '';
      if (typeof message === 'string') {
        messagetext = message;
      } else if (Array.isArray(message)) {
        messagetext = message.join('\n');
      } else if (typeof message === 'object') {
        messagetext =
          message.message ||
          message.error ||
          message.warning ||
          message.info ||
          message.success ||
          'Something went wrong';
      } else {
        messagetext = 'Something went wrong';
      }
      state.options = {
        ...initialState.options,
        message: messagetext,
        ...options,
      };
    },
    hideMessage: (state, action) => {
      state.state = null;
    },
  },
});

export const { hideMessage, showMessage } = messageSlice.actions;

export default messageSlice.reducer;
