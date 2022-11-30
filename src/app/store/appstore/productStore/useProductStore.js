import { useDispatch, useSelector } from 'react-redux';
import {
  getProductsSF,
  setProductsSearchTextSF,
  setProductFiltersSF,
  resetProductFiltersSF,
  addProductSF,
  getProductKycDataSF,
  getSingleProductSF,
  setStatusIdleSF,
  setFormStatusSF,
  getAllPolicySF,
  updateProductWithKycSF,
} from './productsSlice';

const useProductStore = () => {
  const dispatch = useDispatch();
  const searchText = useSelector(({ appstore }) => appstore.products.searchText);
  const productFilters = useSelector(({ appstore }) => appstore.products.productFilters);
  const tableDataStatus = useSelector(({ appstore }) => appstore.products.status);
  const productData = useSelector(({ appstore }) => appstore.products.products);
  const formData = useSelector(({ appstore }) => appstore.products.formData);
  const formStatus = useSelector(({ appstore }) => appstore.products.formStatus);
  const kycData = useSelector(({ appstore }) => appstore.products.kycData);
  const kycStatus = useSelector(({ appstore }) => appstore.products.kycStatus);
  const kycError = useSelector(({ appstore }) => appstore.products.kycError);
  const singleProduct = useSelector(({ appstore }) => appstore.products.singleProduct);
  const policies = useSelector(({ appstore }) => appstore.products.policies);
  const productUpdate = useSelector(({ appstore }) => appstore.products.productUpdate);

  const getProducts = (payload) => {
    dispatch(getProductsSF(payload));
  };

  const setStatusIdle = () => {
    dispatch(setStatusIdleSF());
  };

  const setProductsSearchText = (text) => {
    dispatch(setProductsSearchTextSF(text));
  };

  const setProductFilters = (filters) => {
    dispatch(setProductFiltersSF(filters));
  };

  const resetProductFilters = () => {
    dispatch(resetProductFiltersSF());
  };

  const addProduct = (payload) => {
    dispatch(addProductSF(payload));
  };

  const getProductKycData = () => {
    dispatch(getProductKycDataSF());
  };

  const getSingleProduct = (payload) => {
    dispatch(getSingleProductSF(payload));
  };

  const setFormStatus = (status) => {
    dispatch(setFormStatusSF(status));
  };

  const getAllPolicy = (payload) => {
    dispatch(getAllPolicySF(payload));
  };

  const updateProductWithKyc = (payload) => {
    dispatch(updateProductWithKycSF(payload));
  };

  return {
    dispatch,
    searchText,
    productFilters,
    tableDataStatus,
    productData,
    getProducts,
    setProductsSearchText,
    setProductFilters,
    resetProductFilters,
    addProduct,
    formData,
    formStatus,
    getProductKycData,
    kycData,
    kycStatus,
    kycError,
    getSingleProduct,
    singleProduct,
    setStatusIdle,
    setFormStatus,
    getAllPolicy,
    policies,
    updateProductWithKyc,
    productUpdate,
  };
};

export default useProductStore;
