/* eslint-disable camelcase */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'app/APIs/caratell-service/apiService';
import jwt_decode from 'jwt-decode';

export const login = createAsyncThunk('/login-auth', async (payload) => {
  const response = await api.login(payload);
  return response;
});
export const register = createAsyncThunk('/register-auth', async (payload) => {
  const response = await api.register(payload);
  return response;
});

export const setuser = createAsyncThunk('/setuser-auth', async (payload) => {
  return true;
});
export const logout = createAsyncThunk('/logout-auth', async (payload) => {
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'idle',
    logginStatus: 'idle',
    appUser: {
      roles: [],
      // photoURL: 'assets/images/avatars/Velazquez.jpg',
    },
    accessToken: '',
    isLoggedIn: false,
    isRegistered: false,
    redirect: {
      redirectFlag: false,
      redirectTo: '',
    },
    error: null,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setRedirect: (state, action) => {
      state.redirect = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.logginStatus = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.logginStatus = 'succeeded';

        state.appUser = action.payload.usersInfo;
        state.accessToken = action.payload.accessToken;

        state.isLoggedIn = true;

        localStorage.setItem('caratell-token', state.accessToken);
        localStorage.setItem('caratell-isLoggedIn', state.isLoggedIn);

        // TODO change after implementing roles
        state.appUser.roles = ['Master Admin'];
        state.appUser.photoURL = 'assets/images/avatars/Velazquez.jpg';
      })
      .addCase(login.rejected, (state, action) => {
        state.logginStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(register.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isRegistered = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(setuser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const user = jwt_decode(localStorage.getItem('caratell-token'));
        state.appUser = user;
        state.accessToken = localStorage.getItem('caratell-token');
        state.isLoggedIn = true;

        state.appUser.roles = ['Master Admin'];
        state.appUser.photoURL = 'assets/images/avatars/Velazquez.jpg';
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoggedIn = false;
        localStorage.removeItem('caratell-token');
        localStorage.removeItem('caratell-isLoggedIn');

        state.appUser.roles = [];
        state.appUser.photoURL = '';
      });
  },
});

export const { setRedirect } = authSlice.actions;

export default authSlice.reducer;
