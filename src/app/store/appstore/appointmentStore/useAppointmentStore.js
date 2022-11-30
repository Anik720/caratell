import { useDispatch, useSelector } from 'react-redux';
import {
  getAppointmentItemsSF,
  setAppointmentSearchTextSF,
  setFiltersSF,
} from './appointmentSlice';

const useAppointmentStore = () => {
  const dispatch = useDispatch();
  const searchText = useSelector(({ appstore }) => appstore.appointment.searchText);
  const appointmentItems = useSelector(({ appstore }) => appstore.appointment.appointmentItems);
  const filters = useSelector(({ appstore }) => appstore.appointment.filters);

  const setFilters = (payload) => dispatch(setFiltersSF(payload));

  const getAppointmentItems = (payload) => {
    dispatch(getAppointmentItemsSF(payload));
  };

  const setAppointmentSearchText = (payload) => {
    dispatch(setAppointmentSearchTextSF(payload));
  };

  return {
    searchText,
    getAppointmentItems,
    setAppointmentSearchText,
    appointmentItems,
    filters,
    setFilters,
  };
};

export default useAppointmentStore;
