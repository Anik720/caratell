/* eslint-disable unused-imports/no-unused-imports */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'axios';
import api from 'app/APIs/caratell-service/apiService';
import mockAPI from 'mock/mockApiService';

export const getOrderItemsSF = createAsyncThunk(
  '/get-blog-items',
  async (payload, { dispatch, getState }) => {
    const { page, limit } = payload;
    const queryObj = {
      page,
      limit,
    };
    const { orderFilters, orderTab, searchText } = getState().appstore.orderSlice;

    const { modes, minPrice, maxPrice, minDate, maxDate, status } = orderFilters;

    if (modes && modes.length > 0) {
      queryObj.modes = modes.join(',');
    }
    if (minPrice) queryObj.minPrice = minPrice;
    if (maxPrice) queryObj.maxPrice = maxPrice;
    if (minDate) queryObj.minDate = minDate;
    if (maxDate) queryObj.maxDate = maxDate;
    if (status) queryObj.status = status;
    if (orderTab && orderTab !== 'All') queryObj.status = orderTab;
    if (searchText) {
      const encodedSearchText = searchText.includes(' ')
        ? encodeURIComponent(searchText)
        : searchText;
      queryObj.customer = encodedSearchText;
    }

    const data = await api.getAllOrders(queryObj);
    return data || [];
  }
);

export const updateOrderStatus = createAsyncThunk('/update-order-status', async (payload) => {
  const { orderIds, status } = payload;
  const data = await api.updateOrderStatus({ orderIds, status });
  return data || [];
});

const orderSlice = createSlice({
  name: 'orderStore',
  initialState: {
    searchText: '',
    data: [],
    orderItems: {
      status: 'idle',
      data: [],
      error: null,
    },
    updateOrderStatus: {
      status: 'idle',
      data: [],
      error: null,
    },
    selected: [],
    orderFilters: {
      modes: [],
      minPrice: '',
      maxPrice: '',
      minDate: '',
      maxDate: '',
      status: '',
    },
    orderTab: 'All',
  },
  reducers: {
    setSelectedIds(state, action) {
      state.selected = action.payload;
    },
    setOrderFilters: (state, action) => {
      state.orderFilters = {
        ...state.orderFilters,
        ...action.payload,
      };
    },
    setOrderTab: (state, action) => {
      state.orderTab = action.payload;
    },
    setDataSF: (state, action) => {
      state.data = action.payload;
    },
    setSearchTextSF: (state, action) => {
      state.searchText = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getOrderItemsSF.pending, (state, action) => {
        state.orderItems.status = 'loading';
      })
      .addCase(getOrderItemsSF.fulfilled, (state, action) => {
        state.orderItems.status = 'succeeded';
        state.orderItems.data = action.payload;
      })
      .addCase(getOrderItemsSF.rejected, (state, action) => {
        state.orderItems.status = 'failed';
        state.orderItems.error = action.error;
      });
    builder
      .addCase(updateOrderStatus.pending, (state, action) => {
        state.updateOrderStatus.status = 'loading';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.updateOrderStatus.status = 'succeeded';
        state.updateOrderStatus.data = action.payload;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updateOrderStatus.status = 'failed';
        state.updateOrderStatus.error = action.error;
      });
  },
});

export const { setOrderFilters, setOrderTab, setSelectedIds, setDataSF, setSearchTextSF } =
  orderSlice.actions;

export default orderSlice.reducer;
