import { useDispatch, useSelector } from 'react-redux';
import {
  getProductsMapSF,
  setProductsSearchTextSF,
  setProductFiltersSF,
  applyProductFiltersSF,
  resetProductFiltersSF,
} from './productsMapSlice';

const useProductMapStore = () => {
  const dispatch = useDispatch();
  const searchText = useSelector(({ appstore }) => appstore.productsMap.searchText);
  const productFilters = useSelector(({ appstore }) => appstore.productsMap.productFilters);
  const tableDataStatus = useSelector(({ appstore }) => appstore.productsMap.status);
  const productMapData = useSelector(({ appstore }) => appstore.productsMap.productsMap);

  const getProductsMap = (payload) => {
    dispatch(getProductsMapSF(payload));
  };

  const setProductsSearchText = (text) => {
    dispatch(setProductsSearchTextSF(text));
  };

  const setProductFilters = (filters) => {
    dispatch(setProductFiltersSF(filters));
  };

  const applyProductFilters = () => {
    dispatch(applyProductFiltersSF());
  };

  const resetProductFilters = () => {
    dispatch(resetProductFiltersSF());
  };

  return {
    dispatch,
    searchText,
    productFilters,
    tableDataStatus,
    productMapData,
    getProductsMap,
    setProductsSearchText,
    setProductFilters,
    applyProductFilters,
    resetProductFilters,
  };
};

export default useProductMapStore;
