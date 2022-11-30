/* eslint-disable unused-imports/no-unused-imports */
import { useDispatch, useSelector } from 'react-redux';
import { getOrderItemsSF, setDataSF, setSearchTextSF } from './orderSlice';

const useOrderStore = () => {
  const dispatch = useDispatch();
  const searchText = useSelector(({ appstore }) => appstore.orderSlice.searchText);
  const orderItems = useSelector(({ appstore }) => appstore.orderSlice.orderItems);

  const getOrderItems = (payload) => {
    dispatch(getOrderItemsSF(payload));
  };

  const setSearchText = (payload) => {
    dispatch(setSearchTextSF(payload));
  };

  return {
    searchText,
    orderItems,
    getOrderItems,
    setSearchText,
  };
};

export default useOrderStore;
