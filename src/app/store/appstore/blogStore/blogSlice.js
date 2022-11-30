/* eslint-disable unused-imports/no-unused-imports */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'axios';
import api from 'app/APIs/caratell-service/apiService';
import mockAPI from 'mock/mockApiService';

export const getBlogItemsSF = createAsyncThunk(
  '/get-blog-items',
  async (payload, { dispatch, getState }) => {
    const { page, limit } = payload;
    const queryObj = {
      page,
      limit,
    };
    const { blogTab, searchText } = getState().appstore.blog;
    if (blogTab && blogTab !== 'all') queryObj.category = blogTab;
    if (searchText) {
      const encodedSearchText = searchText.includes(' ')
        ? encodeURIComponent(searchText)
        : searchText;
      queryObj.title = encodedSearchText;
    }
    const data = await api.getAllBlogs(queryObj);
    return data || [];
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    searchText: '',
    data: [],
    blogItems: {
      status: 'idle',
      data: [],
      error: null,
    },
    blogTab: 'all',
  },
  reducers: {
    setBlogTab: (state, action) => {
      state.blogTab = action.payload;
    },
    setDataSF: (state, action) => {
      state.data = action.payload;
    },
    searchTextSF: (state, action) => {
      state.searchText = action.payload;
    },
    setBlogSearchTextSF: (state, action) => {
      state.searchText = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBlogItemsSF.pending, (state, action) => {
        state.blogItems.status = 'loading';
      })
      .addCase(getBlogItemsSF.fulfilled, (state, action) => {
        state.blogItems.status = 'succeeded';
        state.blogItems.data = action.payload;
      })
      .addCase(getBlogItemsSF.rejected, (state, action) => {
        state.blogItems.status = 'failed';
        state.blogItems.error = action.error;
      });
  },
});

export const { setDataSF, setBlogTab, searchTextSF, setBlogSearchTextSF } = blogSlice.actions;

export default blogSlice.reducer;
