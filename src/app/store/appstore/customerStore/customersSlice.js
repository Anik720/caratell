/* eslint-disable unused-imports/no-unused-imports */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'axios';
import api from 'app/APIs/caratell-service/apiService';
import mockAPI from 'mock/mockApiService';

export const getCustomersSF = createAsyncThunk(
  '/get-customers',
  async (payload, { dispatch, getState }) => {
    const { page, limit } = payload;
    const queryObj = {
      page,
      limit,
    };
    const { customerTab, searchText } = getState().appstore.customers;
    if (customerTab && customerTab !== 'all') queryObj.status = customerTab;
    if (searchText) {
      const encodedSearchText = searchText.includes(' ')
        ? encodeURIComponent(searchText)
        : searchText;
      queryObj.name = encodedSearchText;
    }
    const res = await api.getAllCustomers(queryObj);
    return res || [];
  }
);

export const updateUserKycStatus = createAsyncThunk('/update-order-status', async (payload) => {
  const { userIds, kycStatus } = payload;
  const data = await api.setUserKycStatus({ userIds, kycStatus });
  return data || [];
});

export const getExpertKycCustomersSF = createAsyncThunk(
  '/get-expert-kyc-requested-customers',
  async (payload, { dispatch, getState }) => {
    const { page, limit } = payload;
    const { expertSearchText } = getState().appstore.customers;
    const queryObj = {
      page,
      limit,
      status: 'requested',
    };
    if (expertSearchText) {
      const encodedSearchText = expertSearchText.includes(' ')
        ? encodeURIComponent(expertSearchText)
        : expertSearchText;
      queryObj.name = encodedSearchText;
    }
    const res = await api.getAllCustomers(queryObj);
    return res || [];
  }
);

export const getUserProfileSF = createAsyncThunk('/get-user-profile', async (payload) => {
  const { id } = payload;
  const res = await api.getUserProfile(id);
  return res || [];
});

export const getCustomerBlackListSF = createAsyncThunk(
  '/get-customer-black-list',
  async (payload) => {
    const { page, limit } = payload;
    const res = await api.getAllBlackListed(page, limit);
    return res || [];
  }
);

export const updateUserProfileSF = createAsyncThunk('/update-user-profile', async (payload) => {
  const { kycDetail, onlyKyc, ...rest } = payload;
  if (onlyKyc) {
    const userKycPayload = {
      userId: payload.id,
      userKycTitle: 'self',
      expertKycStatus: 'done',
      userKycData: kycDetail,
    };
    const kycUpdate = await api.updateUserKyc(userKycPayload);
    return { kycUpdate };
  }
  const userKycPayload = {
    userId: payload.id,
    userKycTitle: 'self',
    expertKycStatus: 'done',
    userKycData: kycDetail,
  };
  const userProfilePayload = {
    ...rest,
  };
  const [userUpdate, kycUpdate] = await Promise.all([
    api.updateUserProfile(userProfilePayload),
    api.updateUserKyc(userKycPayload),
  ]);
  return { userUpdate, kycUpdate };
});

export const makeUserBlackListedSF = createAsyncThunk(
  '/make-users-blacklisted',
  async (payload) => {
    const { userData } = payload;
    const res = await api.makeUserBlackListed(userData);
    return res || [];
  }
);

const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    status: 'idle',
    searchText: '',
    expertSearchText: '',
    customers: [],
    data: [],
    error: null,
    customerFilters: {
      kycStatus: 'All',
      status: [],
    },
    customerBlackList: {
      status: 'idle',
      data: [],
      error: null,
    },
    userProfile: {
      status: 'idle',
      data: [],
      error: null,
    },
    userEditForm: {
      status: 'idle',
      data: {},
      error: null,
    },
    requestedCustomers: {
      status: 'idle',
      data: [],
      error: null,
    },
    userKycUpdate: {
      status: 'idle',
      data: [],
      error: null,
    },
    customerTab: 'all',
    customerIds: [],
  },
  reducers: {
    setCustomerTab: (state, action) => {
      state.customerTab = action.payload;
    },
    setCustomerIds: (state, action) => {
      state.customerIds = action.payload;
    },
    setDataSF: (state, action) => {
      state.data = action.payload;
    },
    searchTextSF: (state, action) => {
      state.customers = _.filter(state.customers, (product) =>
        product.name.toLowerCase().includes(action.payload.searchText.toLowerCase())
      );
    },
    setCustomersSearchTextSF: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      // prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setExpertsSearchTextSF: (state, action) => {
      state.expertSearchText = action.payload;
    },
    setCustomerFiltersSF: (state, action) => {
      state.customerFilters = { ...state.customerFilters, ...action.payload };
    },
    applyCustomerFiltersSF: (state, action) => {
      // reset first
      if (state.data.length != 0) {
        state.customers = [...state.data];
        state.data = [];
      }

      const dataLocalTemp = [...state.customers];
      state.customers = [...state.data];
      state.data = [...dataLocalTemp];
    },
    resetCustomerFiltersSF: (state, action) => {
      if (state.data.length != 0) {
        state.customers = [...state.data];
        state.data = [];
      }
      state.customerFilters = {
        kycStatus: 'All',
      };
    },
    clearUserEditFormSF: (state, action) => {
      state.userEditForm = {
        status: 'idle',
        data: {},
        error: null,
      };
      state.userProfile = {
        status: 'idle',
        data: [],
        error: null,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCustomersSF.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getCustomersSF.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.customers = action.payload;
      })
      .addCase(getCustomersSF.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder
      .addCase(getCustomerBlackListSF.pending, (state, action) => {
        state.customerBlackList.status = 'loading';
      })
      .addCase(getCustomerBlackListSF.fulfilled, (state, action) => {
        state.customerBlackList.status = 'succeeded';
        // Add any fetched posts to the array
        state.customerBlackList.data = action.payload;
      })
      .addCase(getCustomerBlackListSF.rejected, (state, action) => {
        state.customerBlackList.status = 'failed';
        state.customerBlackList.error = action.error.message;
      });
    builder
      .addCase(getUserProfileSF.pending, (state, action) => {
        state.userProfile.status = 'loading';
      })
      .addCase(getUserProfileSF.fulfilled, (state, action) => {
        state.userProfile.status = 'succeeded';
        // Add any fetched posts to the array
        state.userProfile.data = action.payload;
      })
      .addCase(getUserProfileSF.rejected, (state, action) => {
        state.userProfile.status = 'failed';
        state.userProfile.error = action.error?.message || "Can't get user profile data";
      });
    builder
      .addCase(updateUserProfileSF.pending, (state, action) => {
        state.userEditForm.status = 'loading';
      })
      .addCase(updateUserProfileSF.fulfilled, (state, action) => {
        state.userEditForm.status = 'succeeded';
        // Add any fetched posts to the array
        state.userEditForm.data = action.payload;
        state.status = 'idle';
        state.customers = [];
        state.data = [];
        state.requestedCustomers = {
          status: 'idle',
          data: [],
          error: null,
        };
        state.requestedCustomers = {
          status: 'idle',
          data: [],
          error: null,
        };
      })
      .addCase(updateUserProfileSF.rejected, (state, action) => {
        state.userEditForm.status = 'failed';
        state.userEditForm.error = action.error?.message || "Can't update user profile";
      });
    builder
      .addCase(getExpertKycCustomersSF.pending, (state, action) => {
        state.requestedCustomers.status = 'loading';
      })
      .addCase(getExpertKycCustomersSF.fulfilled, (state, action) => {
        state.requestedCustomers.status = 'succeeded';
        // Add any fetched posts to the array
        state.requestedCustomers.data = action.payload;
      })
      .addCase(getExpertKycCustomersSF.rejected, (state, action) => {
        state.requestedCustomers.status = 'failed';
        state.requestedCustomers.error =
          action.error?.message || "Can't get expert kyc requested customers";
      });
    builder
      .addCase(updateUserKycStatus.pending, (state, action) => {
        state.userKycUpdate.status = 'loading';
      })
      .addCase(updateUserKycStatus.fulfilled, (state, action) => {
        state.userKycUpdate.status = 'succeeded';
        state.userKycUpdate.data = action.payload;
      })
      .addCase(updateUserKycStatus.rejected, (state, action) => {
        state.userKycUpdate.status = 'failed';
      });
  },
});

export const {
  setCustomersSearchTextSF,
  setCustomerFiltersSF,
  applyCustomerFiltersSF,
  resetCustomerFiltersSF,
  clearUserEditFormSF,
  setCustomerTab,
  setCustomerIds,
  setExpertsSearchTextSF,
} = customersSlice.actions;

export default customersSlice.reducer;
