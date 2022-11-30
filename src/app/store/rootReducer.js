import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import fuse from './fuse';
import videoSlice from '../screens/LiveStream/Store/videoSlice'
import videoUserSlice from '../screens/LiveStream/Store/participantUserSlice'
import i18n from './i18nSlice';
import appstore from './appstore';

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    auth,
    fuse,
    appstore,
    i18n,
    videoSlice,
    videoUserSlice,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === 'auth/user/userLoggedOut') {
    // state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
