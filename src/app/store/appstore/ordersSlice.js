import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

import { orders } from '../../../mock/mockOrders';

export const getOrders = createAsyncThunk('/get-orders', async () => {
  const data = orders;
  return data;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    status: 'idle',
    searchText: '',
    orders: [],
    data: [],
    error: null,
    orderFilters: {
      orderStatus: 'All',
      collectionModePickUp: true,
      collectionModeDel: true,
      orderAmountMin: '',
      orderAmountMax: '',
      strtOrderDate: '',
      endOrderDate: '',
    },
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    searchText: (state, action) => {
      state.orders = _.filter(state.orders, (order) =>
        order.name.toLowerCase().includes(action.payload.searchText.toLowerCase())
      );
    },
    setOrdersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      // prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setOrderFilters: (state, action) => {
      state.orderFilters = { ...state.orderFilters, ...action.payload };
    },
    applyOrderFilters: (state, action) => {
      // reset first
      if (state.data.length != 0) {
        state.orders = [...state.data];
        state.data = [];
      }

      // then apply filter logic
      if (state.orderFilters.collectionModePickUp !== false) {
        state.data.push(..._.filter(state.orders, (item) => item.collectionMode == 'Pick Up'));
      }
      if (state.orderFilters.collectionModeDel !== false) {
        state.data.push(..._.filter(state.orders, (item) => item.collectionMode == 'Delivery'));
      }

      if (state.orderFilters.orderAmountMin !== '') {
        state.data = [
          ..._.filter(state.data, (item) => item.orderAmount >= state.orderFilters.orderAmountMin),
        ];
      }
      if (state.orderFilters.orderAmountMax !== '') {
        state.data = [
          ..._.filter(state.data, (item) => item.orderAmount <= state.orderFilters.orderAmountMax),
        ];
      }

      if (state.orderFilters.strtOrderDate !== '') {
        state.data = [
          ..._.filter(
            state.data,
            (item) => new Date(item.orderDate) >= new Date(state.orderFilters.strtOrderDate)
          ),
        ];
      }
      if (state.orderFilters.endOrderDate !== '') {
        state.data = [
          ..._.filter(
            state.data,
            (item) => new Date(item.orderDate) <= new Date(state.orderFilters.endOrderDate)
          ),
        ];
      }

      const dataLocalTemp = [...state.orders];
      state.orders = [...state.data];
      state.data = [...dataLocalTemp];
    },
    resetOrderFilters: (state, action) => {
      if (state.data.length != 0) {
        state.orders = [...state.data];
        state.data = [];
      }
      state.orderFilters = {
        ...state.orderFilters,
        collectionModePickUp: true,
        collectionModeDel: true,
        orderAmountMin: '',
        orderAmountMax: '',
        strtOrderDate: '',
        endOrderDate: '',
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getOrders.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.orders = state.orders.concat(action.payload);
        // state.userData = state.userData.concat(action.payload);
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  getAll,
  setOrdersSearchText,
  setOrderFilters,
  applyOrderFilters,
  resetOrderFilters,
} = ordersSlice.actions;

export default ordersSlice.reducer;
