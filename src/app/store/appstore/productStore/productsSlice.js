/* eslint-disable unused-imports/no-unused-imports */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'axios';
import api from 'app/APIs/caratell-service/apiService';
import mockAPI from 'mock/mockApiService';

import { formatCurrency, flatObjOfArrays } from 'app/utils';

export const getProductsSF = createAsyncThunk(
  '/get-products',
  async (payload, { dispatch, getState }) => {
    const { page, limit } = payload;
    const queryObj = {
      page,
      limit,
    };
    const { productFilters, searchText } = getState().appstore.products;
    if (productFilters.productTypes && productFilters.productTypes.length > 0) {
      queryObj.productTypes = productFilters.productTypes;
    }
    if (productFilters.maxPrice) {
      queryObj.maxPrice = productFilters.maxPrice;
    }
    if (productFilters.minPrice) {
      queryObj.minPrice = productFilters.minPrice;
    }
    if (searchText) {
      const encodedSearchText = searchText.includes(' ')
        ? encodeURIComponent(searchText)
        : searchText;
      queryObj.title = encodedSearchText;
    }
    const res = await api.getAllProducts(queryObj);
    return res || [];
  }
);

export const addProductSF = createAsyncThunk('/add-product', async (payload) => {
  const { product } = payload;
  await api.createProduct(product);
});

export const getProductKycDataSF = createAsyncThunk('/get-all-kyc-masterdata', async (payload) => {
  const [kyc, policies] = await Promise.all([api.getAllKycMasterData(), api.getProductPolicies()]);
  return {
    ...kyc,
    policies,
  };
});

export const getSingleProductSF = createAsyncThunk('/get-single-product', async (payload) => {
  const { productId } = payload;
  const res = await api.getSingleProduct(productId);
  return res || {};
});

export const getAllPolicySF = createAsyncThunk('/get-all-policy', async (payload) => {
  const { page, limit } = payload;
  const res = await api.getAllPolicyItems(page, limit);
  return res || {};
});

export const updateProductWithKycSF = createAsyncThunk(
  '/update-product-with-kyc',
  async (payload) => {
    const { kycDetail, productDetail, productId } = payload;
    const [productUpdate, kycUpdate] = await Promise.all([
      api.updateProduct(productDetail, productId),
      api.updateProductKyc(kycDetail),
    ]);
    return { productUpdate, kycUpdate };
  }
);

export const deleteProducts = createAsyncThunk(
  '/delete-products',
  async (payload, { dispatch, getState }) => {
    const { selectedProductIds } = getState().appstore.products;
    const productData = {
      productIds: selectedProductIds,
    };
    const res = await api.deleteProducts(productData);
    return res || {};
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    status: 'idle',
    searchText: '',
    selectedProductIds: [],
    products: [],
    data: [],
    error: null,
    productFilters: {
      category: '',
      title: '',
      productTypes: [],
      minPrice: '',
      maxPrice: '',
    },
    formData: {},
    formStatus: 'idle',
    kycStatus: 'idle',
    kycData: [],
    kycError: null,
    singleProduct: {
      status: 'loading',
      data: {},
      error: null,
    },
    policies: {
      status: 'idle',
      data: [],
      error: null,
    },
    productUpdate: {
      status: 'idle',
      data: {},
      error: null,
    },
  },
  reducers: {
    setSelectedProductIds: (state, action) => {
      state.selectedProductIds = action.payload;
    },
    setFormStatusSF: (state, action) => {
      state.formStatus = action.payload;
      state.productUpdate.status = action.payload;
      state.singleProduct.status = action.payload;
    },
    setStatusIdleSF: (state) => {
      state.status = 'idle';
      state.singleProduct.status = 'idle';
    },
    setDataSF: (state, action) => {
      state.data = action.payload;
    },
    searchTextSF: (state, action) => {
      state.products = _.filter(state.products, (product) =>
        product.name.toLowerCase().includes(action.payload.searchText.toLowerCase())
      );
    },
    setProductsSearchTextSF: (state, action) => {
      state.searchText = action.payload;
    },
    setProductFiltersSF: (state, action) => {
      state.productFilters = { ...state.productFilters, ...action.payload };
    },
    resetProductFiltersSF: (state, action) => {
      state.productFilters = {
        category: '',
        title: '',
        productTypes: [],
        minPrice: '',
        maxPrice: '',
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProductsSF.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getProductsSF.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        const productResponse = action.payload;
        state.products = productResponse;
      })
      .addCase(getProductsSF.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong in server';
      });
    builder
      .addCase(addProductSF.pending, (state, action) => {
        state.formStatus = 'loading';
      })
      .addCase(addProductSF.fulfilled, (state, action) => {
        state.formStatus = 'succeeded';
        state.formData = action.payload;
        state.status = 'idle';
        state.products = [];
        state.data = [];
      })
      .addCase(addProductSF.rejected, (state, action) => {
        state.formStatus = 'failed';
        state.error = action.error.message || 'Something went wrong in server';
      });
    builder
      .addCase(getProductKycDataSF.pending, (state, action) => {
        state.kycStatus = 'loading';
      })
      .addCase(getProductKycDataSF.fulfilled, (state, action) => {
        state.kycStatus = 'succeeded';
        state.kycData = action.payload;
      })
      .addCase(getProductKycDataSF.rejected, (state, action) => {
        state.kycStatus = 'failed';
        state.kycError = action.error.message || 'Something went wrong in server';
      });
    builder
      .addCase(getSingleProductSF.pending, (state, action) => {
        // state.singleProduct.status = 'loading';
      })
      .addCase(getSingleProductSF.fulfilled, (state, action) => {
        state.singleProduct.status = 'succeeded';
        // Add any fetched posts to the array
        state.singleProduct.data = action.payload;
      })
      .addCase(getSingleProductSF.rejected, (state, action) => {
        state.singleProduct.status = 'failed';
        state.singleProduct.error = action.error.message || 'Something went wrong in server';
      });
    builder
      .addCase(getAllPolicySF.pending, (state, action) => {
        // state.singleProduct.status = 'loading';
      })
      .addCase(getAllPolicySF.fulfilled, (state, action) => {
        state.policies.status = 'succeeded';
        // Add any fetched posts to the array
        state.policies.data = action.payload;
      })
      .addCase(getAllPolicySF.rejected, (state, action) => {
        state.policies.status = 'failed';
        state.policies.error = action.error.message || 'Something went wrong in server';
      });
    builder
      .addCase(updateProductWithKycSF.pending, (state, action) => {
        // state.singleProduct.status = 'loading';
      })
      .addCase(updateProductWithKycSF.fulfilled, (state, action) => {
        state.productUpdate.status = 'succeeded';
        // Add any fetched posts to the array
        state.productUpdate.data = action.payload;
      })
      .addCase(updateProductWithKycSF.rejected, (state, action) => {
        state.productUpdate.status = 'failed';
        state.productUpdate.error = action.error.message || 'Something went wrong in server';
      });
  },
});

export const {
  getAllSF,
  setSelectedProductIds,
  setProductsSearchTextSF,
  setProductFiltersSF,
  resetProductFiltersSF,
  setStatusIdleSF,
  setFormStatusSF,
} = productsSlice.actions;

export default productsSlice.reducer;
