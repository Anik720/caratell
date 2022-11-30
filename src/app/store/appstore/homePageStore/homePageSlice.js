/* eslint-disable unused-imports/no-unused-imports */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'axios';
import api from 'app/APIs/caratell-service/apiService';
import mockAPI from 'mock/mockApiService';

export const getHomePageItemsSF = createAsyncThunk('/get-all-banners', async (payload) => {
  const data = await api.getAllBanners();
  return data || [];
});

const homePageSlice = createSlice({
  name: 'homePage',
  initialState: {
    searchText: '',
    data: [],
    homePageItems: {
      status: 'idle',
      data: [],
      error: null,
    },
  },
  reducers: {
    setDataSF: (state, action) => {
      state.data = action.payload;
    },
    searchTextSF: (state, action) => {
      state.searchText = action.payload;
    },
    setHomePageSearchTextSF: (state, action) => {
      state.searchText = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getHomePageItemsSF.pending, (state, action) => {
        state.homePageItems.status = 'loading';
      })
      .addCase(getHomePageItemsSF.fulfilled, (state, action) => {
        state.homePageItems.status = 'succeeded';
        state.homePageItems.data = action.payload;
      })
      .addCase(getHomePageItemsSF.rejected, (state, action) => {
        state.homePageItems.status = 'failed';
        state.homePageItems.error = action.error;
      });
  },
});

export const { setDataSF, searchTextSF, setHomePageSearchTextSF } = homePageSlice.actions;

export default homePageSlice.reducer;
