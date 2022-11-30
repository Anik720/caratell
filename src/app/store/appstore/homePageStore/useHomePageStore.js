import { useDispatch, useSelector } from 'react-redux';
import { getHomePageItemsSF, setHomePageSearchTextSF } from './homePageSlice';

const useProductMapStore = () => {
  const dispatch = useDispatch();
  const searchText = useSelector(({ appstore }) => appstore.homePage.searchText);
  const homePageItems = useSelector(({ appstore }) => appstore.homePage.homePageItems);

  const getHomePageItems = (payload) => {
    dispatch(getHomePageItemsSF(payload));
  };

  const setHomePageSearchText = (payload) => {
    dispatch(setHomePageSearchTextSF(payload));
  };

  return {
    searchText,
    setHomePageSearchText,
    getHomePageItems,
    homePageItems,
  };
};

export default useProductMapStore;
