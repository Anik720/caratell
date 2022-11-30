/* eslint-disable unused-imports/no-unused-imports */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'axios';
import api from 'app/APIs/caratell-service/apiService';
import mockAPI from 'mock/mockApiService';

import { formatCurrency } from 'app/utils';

export const getProductsMapSF = createAsyncThunk('/get-productsMap', async (payload) => {
  const { page, limit } = payload;
  const data2 = await mockAPI.mockGetProductsMapApi(page, limit);
  return data2 || [];
});

const productsMapSlice = createSlice({
  name: 'productsMap',
  initialState: {
    status: 'idle',
    searchText: '',
    productsMap: [],
    data: [],
    error: null,
    productFilters: {
      productStatus: 'All',
      productType: 'All',
      productPriceMin: '',
      productPriceMax: '',
    },
  },
  reducers: {
    setDataSF: (state, action) => {
      state.data = action.payload;
    },
    searchTextSF: (state, action) => {
      state.productsMap = _.filter(state.productsMap, (product) =>
        product.name.toLowerCase().includes(action.payload.searchText.toLowerCase())
      );
    },
    setProductsSearchTextSF: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      // prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setProductFiltersSF: (state, action) => {
      state.productFilters = { ...state.productFilters, ...action.payload };
    },
    applyProductFiltersSF: (state, action) => {
      // reset first
      if (state.data.length != 0) {
        state.productsMap = [...state.data];
        state.data = [];
      }
      // apply filters
      if (state.productFilters.productType.length > 0) {
        const filteredData = state.productsMap.filter((product) =>
          state.productFilters.productType.some(
            (type) => product.type.toLowerCase() === type.toLowerCase()
          )
        );
        state.data.push(...filteredData);
      }

      if (state.productFilters.productPriceMin != '') {
        state.data = _.filter(
          state.productsMap,
          (product) => formatCurrency(product.productPrice) >= state.productFilters.productPriceMin
        );
      }

      if (state.productFilters.productPriceMax != '') {
        state.data = _.filter(
          state.productsMap,
          (product) => formatCurrency(product.productPrice) <= state.productFilters.productPriceMax
        );
      }

      const dataLocalTemp = [...state.productsMap];
      state.productsMap = [...state.data];
      state.data = [...dataLocalTemp];
    },
    resetProductFiltersSF: (state, action) => {
      if (state.data.length != 0) {
        state.productsMap = [...state.data];
        state.data = [];
      }
      state.productFilters = {
        productType: '',
        productPriceMin: '',
        productPriceMax: '',
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProductsMapSF.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getProductsMapSF.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.productsMap = action.payload;
      })
      .addCase(getProductsMapSF.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  getAllSF,
  setProductsSearchTextSF,
  setProductFiltersSF,
  applyProductFiltersSF,
  resetProductFiltersSF,
} = productsMapSlice.actions;

export default productsMapSlice.reducer;
