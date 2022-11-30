/* eslint-disable unused-imports/no-unused-imports */
import { useDispatch, useSelector } from 'react-redux';
import {
  getCustomersSF,
  setCustomersSearchTextSF,
  setCustomerFiltersSF,
  applyCustomerFiltersSF,
  resetCustomerFiltersSF,
  getCustomerBlackListSF,
  getUserProfileSF,
  updateUserProfileSF,
  clearUserEditFormSF,
  getExpertKycCustomersSF,
} from './customersSlice';

const useCustomerStore = () => {
  const dispatch = useDispatch();
  const searchText = useSelector(({ appstore }) => appstore.customers.searchText);
  const customerFilters = useSelector(({ appstore }) => appstore.customers.customerFilters);
  const tableDataStatus = useSelector(({ appstore }) => appstore.customers.status);
  const customerData = useSelector(({ appstore }) => appstore.customers.customers);
  const customerBlackList = useSelector(({ appstore }) => appstore.customers.customerBlackList);
  const userProfile = useSelector(({ appstore }) => appstore.customers.userProfile);
  const userEditForm = useSelector(({ appstore }) => appstore.customers.userEditForm);
  const requestedCustomers = useSelector(({ appstore }) => appstore.customers.requestedCustomers);

  const getCustomers = (payload) => {
    dispatch(getCustomersSF(payload));
  };

  const setCustomersSearchText = (text) => {
    dispatch(setCustomersSearchTextSF(text));
  };

  const setCustomerFilters = (filters) => {
    dispatch(setCustomerFiltersSF(filters));
  };

  const applyCustomerFilters = () => {
    dispatch(applyCustomerFiltersSF());
  };

  const resetCustomerFilters = () => {
    dispatch(resetCustomerFiltersSF());
  };

  const getCustomerBlackList = (payload) => {
    dispatch(getCustomerBlackListSF(payload));
  };

  const getUserProfile = (payload) => {
    dispatch(getUserProfileSF(payload));
  };

  const updateUserProfile = (payload) => {
    dispatch(updateUserProfileSF(payload));
  };

  const clearUserEditForm = () => {
    dispatch(clearUserEditFormSF());
  };

  const getExpertKycCustomers = (payload) => {
    dispatch(getExpertKycCustomersSF(payload));
  };

  return {
    dispatch,
    searchText,
    customerFilters,
    tableDataStatus,
    customerData,
    getCustomers,
    setCustomersSearchText,
    setCustomerFilters,
    applyCustomerFilters,
    resetCustomerFilters,
    customerBlackList,
    getCustomerBlackList,
    userProfile,
    getUserProfile,
    updateUserProfile,
    userEditForm,
    clearUserEditForm,
    requestedCustomers,
    getExpertKycCustomers,
  };
};

export default useCustomerStore;
