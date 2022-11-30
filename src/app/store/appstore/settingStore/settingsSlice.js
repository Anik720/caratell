/* eslint-disable unused-imports/no-unused-imports */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import mockAPI from 'mock/mockApiService';
import api from 'app/APIs/caratell-service/apiService';

export const getAdminItemsSF = createAsyncThunk('/get-admin-items', async (payload) => {
  const { page, limit } = payload;
  const data = await api.getAllAdmins(page, limit);
  return data || [];
});

export const getAvailabilityItemsSF = createAsyncThunk('/get-availability-items', async () => {
  const [availablitiy, overiders] = await Promise.all([
    mockAPI.getAvailabilityItmes(),
    mockAPI.getOverideItmes(),
  ]);
  return {
    ...availablitiy,
    ...overiders,
  };
});

export const getCompanyInfoSF = createAsyncThunk(
  '/get-company-info',
  async (payload, { dispatch, getState }) => {
    const myState = getState().appstore.settings?.companyInfo || null;
    if (myState && myState.status === 'succeeded') {
      return myState.data;
    }
    const res = api.getCompanyInfo();
    return res || {};
  }
);

export const updateCompanyInfoSF = createAsyncThunk('/update-company-info', async (payload) => {
  const res = api.updateCompanyInfo(payload);
  return res || {};
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    searchText: '',
    data: [],
    adminItems: {
      status: 'idle',
      data: [],
      error: null,
    },
    availabilityItems: {
      status: 'idle',
      data: [],
      error: null,
    },
    dateOverideItems: {
      status: 'idle',
      data: [],
      error: null,
    },
    companyInfo: {
      status: 'idle',
      data: {},
      error: null,
    },
  },
  reducers: {
    searchTextSF: (state, action) => {
      state.searchText = action.payload;
    },
    setSearchTextSf: (state, action) => {
      state.searchText = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAdminItemsSF.pending, (state, action) => {
        state.adminItems.status = 'loading';
      })
      .addCase(getAdminItemsSF.fulfilled, (state, action) => {
        state.adminItems.status = 'succeeded';
        state.adminItems.data = action.payload;
      })
      .addCase(getAdminItemsSF.rejected, (state, action) => {
        state.adminItems.status = 'failed';
        state.adminItems.error = action.error;
      });
    builder
      .addCase(getAvailabilityItemsSF.pending, (state, action) => {
        state.availabilityItems.status = 'loading';
      })
      .addCase(getAvailabilityItemsSF.fulfilled, (state, action) => {
        state.availabilityItems.status = 'succeeded';
        state.availabilityItems.data = action.payload;
      })
      .addCase(getAvailabilityItemsSF.rejected, (state, action) => {
        state.availabilityItems.status = 'failed';
        state.availabilityItems.error = action.error;
      });
    builder
      .addCase(getCompanyInfoSF.pending, (state, action) => {
        state.companyInfo.status = 'loading';
      })
      .addCase(getCompanyInfoSF.fulfilled, (state, action) => {
        state.companyInfo.status = 'succeeded';
        state.companyInfo.data = action.payload;
      })
      .addCase(getCompanyInfoSF.rejected, (state, action) => {
        state.companyInfo.status = 'failed';
        state.companyInfo.error = action.error;
      });
    builder
      .addCase(updateCompanyInfoSF.pending, (state, action) => {
        state.companyInfo.status = 'loading';
      })
      .addCase(updateCompanyInfoSF.fulfilled, (state, action) => {
        state.companyInfo.status = 'succeeded';
        state.companyInfo.data = action.payload;
      })
      .addCase(updateCompanyInfoSF.rejected, (state, action) => {
        state.companyInfo.status = 'failed';
        state.companyInfo.error = action.error;
      });
  },
});

export const { searchTextSF, setSearchTextSf } = settingsSlice.actions;

export default settingsSlice.reducer;
