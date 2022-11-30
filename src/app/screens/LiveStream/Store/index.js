import { combineReducers } from '@reduxjs/toolkit';
import usernameAndRoomName from './videoSlice';

const reducer = combineReducers({
  usernameAndRoomName,
});

export default reducer;
