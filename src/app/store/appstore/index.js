import { combineReducers } from '@reduxjs/toolkit';
import auth from './authSlice';
import orders from './ordersSlice';
import products from './productStore/productsSlice';
import productsMap from './productMapStore/productsMapSlice';
import customers from './customerStore/customersSlice';
import homePage from './homePageStore/homePageSlice';
import appointment from './appointmentStore/appointmentSlice';
import blog from './blogStore/blogSlice';
import settings from './settingStore/settingsSlice';
import orderSlice from './orderStore/orderSlice';
import liveChat from './chatStore/liveChatSlice';

const appstoreReducers = combineReducers({
  auth,
  orders,
  products,
  productsMap,
  customers,
  homePage,
  appointment,
  blog,
  settings,
  orderSlice,
  liveChat,
});

export default appstoreReducers;
