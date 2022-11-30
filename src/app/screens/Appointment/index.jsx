/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx';
import _ from 'lodash';
import { Typography, Tooltip, Button, Box, Divider } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import useAppointmentStore from 'app/store/appstore/appointmentStore/useAppointmentStore';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'app/hooks';
import FuseLoading from '@fuse/core/FuseLoading';
import AppointmentFilter from './AppointmentFilter';
import AppointmentItem from './AppointmentItem';

const TabButton = (props) => {
  const { setAppointmentType, appointmentType, currentValue } = props;
  return (
    <Box
      onClick={() => {
        setAppointmentType(currentValue);
      }}
      sx={{
        borderBottom: appointmentType == currentValue ? '2px solid rgb(33 150 243)' : 'none',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <div
        className={clsx(
          'py-[10px] px-[15px]',
          appointmentType == currentValue ? 'text-blue font-bold' : 'text-grey'
        )}
      >
        {_.startCase(currentValue)}
      </div>
    </Box>
  );
};

const Appointment = () => {
  const [filterPoper, setfilterPoper] = useState(null);
  const [loading, setLoading] = useState(true);

  const { appointmentItems, filters, setFilters, getAppointmentItems } = useAppointmentStore();
  const [appointmentData, setAppointmentData] = useState(appointmentItems);

  useEffect(() => {
    setLoading(true);
    resetData(0, 10);
  }, []);

  const showSnackbar = useSnackbar();

  useEffect(() => {
    if (appointmentItems.status === 'loading') {
      setLoading(true);
    }
    if (appointmentItems.status === 'succeeded') {
      setLoading(false);
    }
    if (appointmentItems.status === 'failed') {
      setLoading(false);
      showSnackbar('Failed to get product list', 'e');
    }
  }, [appointmentItems.status]);

  useEffect(() => {
    if (appointmentItems.data) {
      setAppointmentData(appointmentItems.data);
    }
  }, [appointmentItems]);

  const filterPoperClick = (event) => {
    setfilterPoper(event.currentTarget);
  };

  const filterPoperClose = () => {
    setfilterPoper(null);
  };

  const resetData = (page, limit) => {
    getAppointmentItems({ page, limit });
  };

  const { appointmentType } = filters;

  const setAppointmentType = (type) => {
    setFilters({ filters: { appointmentType: type } });
    resetData(0, 10);
  };
  return (
    <div className="flex flex-col flex-1 p-[30px] bg-grey-50 ">
      <div className="max-w-[100%]">
        <div className="flex flex-row justify-between">
          <div>
            <Typography variant="h4" color="inherit" className="font-medium mb-16">
              Appoinment
              <Tooltip title="Appoinment" placement="bottom-start" enterDelay={300}>
                <InfoIcon className="text-primary-blue ml-[1rem] text-[2.5rem]" />
              </Tooltip>
            </Typography>
          </div>
          <div className="flex flex-row">
            <div>
              <Button
                className="rounded-none h-[40px] bg-black-300 hover:bg-primary-blue"
                variant="contained"
                onClick={filterPoperClick}
              >
                <FilterAltIcon />
              </Button>
              <AppointmentFilter filterPoper={filterPoper} filterPoperClose={filterPoperClose} />
            </div>
          </div>
        </div>
        <div className="flex flex-col p-[20px] bg-white">
          <div className="flex flex-row border-b-[#F0F0F0]">
            <TabButton
              currentValue="upcoming"
              appointmentType={appointmentType}
              setAppointmentType={setAppointmentType}
            />
            <TabButton
              currentValue="past"
              appointmentType={appointmentType}
              setAppointmentType={setAppointmentType}
            />
          </div>
        </div>
        <Divider />
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full h-[300px]">
            <FuseLoading />
          </div>
        ) : (
          appointmentData &&
          Object.keys(appointmentData).length > 0 &&
          Object.keys(appointmentData).map((key, index) => (
            <AppointmentItem key={index} item={appointmentData[key]} date={key} />
          ))
        )}
      </div>
    </div>
  );
};

export default Appointment;
