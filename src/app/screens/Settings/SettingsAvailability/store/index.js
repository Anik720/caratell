import { combineReducers } from '@reduxjs/toolkit';
import availability from './availabilitySlice';

const reducer = combineReducers({
  availability,
});

export default reducer;
