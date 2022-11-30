import { useDispatch, useSelector } from 'react-redux';
import {
  getAdminItemsSF,
  setSearchTextSf,
  getAvailabilityItemsSF,
  getCompanyInfoSF,
  updateCompanyInfoSF,
} from './settingsSlice';

const useSettingsStore = () => {
  const dispatch = useDispatch();
  const searchText = useSelector(({ appstore }) => appstore.settings.searchText);
  const adminItems = useSelector(({ appstore }) => appstore.settings.adminItems);
  const availabilityItems = useSelector(({ appstore }) => appstore.settings.availabilityItems);
  const companyInfo = useSelector(({ appstore }) => appstore.settings.companyInfo);

  const getAdminItems = (payload) => {
    dispatch(getAdminItemsSF(payload));
  };

  const setSearthText = (payload) => {
    dispatch(setSearchTextSf(payload));
  };

  const getAvailabilityItems = () => {
    dispatch(getAvailabilityItemsSF());
  };

  const getCompanyInfo = (payload) => {
    dispatch(getCompanyInfoSF(payload));
  };

  const updateCompanyInfo = (payload) => {
    dispatch(updateCompanyInfoSF(payload));
  };

  return {
    searchText,
    setSearthText,
    getAdminItems,
    adminItems,
    getAvailabilityItems,
    availabilityItems,
    companyInfo,
    getCompanyInfo,
    updateCompanyInfo,
  };
};

export default useSettingsStore;
