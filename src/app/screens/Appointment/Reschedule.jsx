/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable camelcase */
import _ from 'lodash';
import React, { useRef, useState, useEffect } from 'react';
import Select from 'react-select';
import { Typography, Button, TextField, Chip, CircularProgress } from '@mui/material';
import { BasicDatePicker } from 'app/components';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'app/hooks';
import {
  setRescheduleInput,
  getAvailableSlots,
  rescheduleAppointment,
  getAppointmentItemsSF,
} from 'app/store/appstore/appointmentStore/appointmentSlice';

const chipColorMap = {
  'Live Stream': {
    color: '#FA541C',
    borderColor: '#FFBB96',
    backgroundColor: '#FFF2E8',
  },
  'Live Chat': {
    color: '#1890FF',
    borderColor: '#91D5FF',
    backgroundColor: '#E6F7FF',
  },
  'Shop Visit': {
    color: '#1890FF',
    borderColor: '#91D5FF',
    backgroundColor: '#E6F7FF',
  },
  'Not Specified': {
    color: '#000000',
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
  },
};

const SelectDate = ({ type }) => {
  const dispatch = useDispatch();
  const date = useSelector(({ appstore }) => appstore.appointment.rescheduleInput.date);
  const handleDateChange = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    dispatch(setRescheduleInput({ date: formattedDate }));
    dispatch(getAvailableSlots({ type }));
  };
  return <BasicDatePicker value={date} setValue={handleDateChange} disablePast shouldStatic />;
};

const SelectSlot = ({ type }) => {
  const dispatch = useDispatch();
  const getSlotStatus = useSelector(
    ({ appstore }) => appstore.appointment.rescheduleInput.getSlotStatus
  );
  const slots = useSelector(({ appstore }) => appstore.appointment.rescheduleInput.slots);
  const [loading, setLoading] = useState(false);
  const [slotOptions, setSlotOptions] = useState([]);

  useEffect(() => {
    if (getSlotStatus === 'loading') {
      setLoading(true);
    }
    if (getSlotStatus === 'succeeded') {
      setLoading(false);
      const { availableSlots } = slots;
      if (availableSlots && availableSlots.length > 0) {
        const options = [];
        availableSlots.forEach((slot) => {
          options.push({
            value: `${slot.start_time}-${slot.end_time}`,
            label: `${slot.start_time}-${slot.end_time}`,
          });
        });
        setSlotOptions(options);
      } else {
        setSlotOptions([]);
      }
    }
  }, [slots, getSlotStatus]);

  const handleSlotChange = (selected) => {
    const { value } = selected;
    dispatch(setRescheduleInput({ selectedSlot: value }));
  };

  if (loading) {
    return (
      <div className="flex w-full justify-center items-center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <Select
      isSearchable
      options={[{ value: '', label: 'Select Time' }].concat(slotOptions)}
      onChange={handleSlotChange}
      classNamePrefix="select"
    />
  );
};

const Reschedule = ({ appointment, handleClose }) => {
  const dispatch = useDispatch();
  const showSnackbar = useSnackbar();

  const { user, slotDetails, id } = appointment;
  const { start_time, end_time, type } = slotDetails;
  const appointmentType = _.startCase(type);

  const handleReschedule = () => {
    showSnackbar('Rescheduling appointment...', 'i');
    dispatch(rescheduleAppointment({ id, type })).then((res) => {
      if (res.type.includes('rejected')) {
        showSnackbar(res.error?.message || 'Something went wrong', 'e');
      } else if (res.payload) {
        showSnackbar(res.payload, 's');
        handleClose();
        dispatch(getAppointmentItemsSF({ page: 0, limit: 10 }));
      }
    });
  };

  return (
    <div className="w-[300px] bg-[#FAFAFA]">
      <div className="flex flex-col gap-[8px]">
        <Typography className="font-[600] text-black text-[16px]">Rescheduling for</Typography>
        <div className="mb-[16px] flex flex-col px-[28px] py-[14px] bg-[#FFFFFF] border-1 border-grey-300 text-center gap-[8px]">
          <Typography className="font-[600] text-black text-[16px]">
            {user?.first_name || '-'} {user?.last_name || '-'}
          </Typography>
          <Typography variant="h6" color="inherit" className="text-[14px] font-[400] text-dark-800">
            {start_time} - {end_time}
          </Typography>
          <Chip
            label={appointmentType || '-'}
            color="primary"
            variant="outlined"
            size="small"
            sx={{
              borderRadius: '2px',
              borderColor: chipColorMap[appointmentType]?.borderColor || '#000',
              color: chipColorMap[appointmentType]?.color || '#000',
              backgroundColor: chipColorMap[appointmentType]?.backgroundColor || '#e8e8e8',
            }}
          />
        </div>
        <div className="flex flex-col gap-[12px] mb-[14px]">
          <SelectDate type={type} />
          <SelectSlot type={type} />
        </div>
        <Button
          className="rounded-none mb-[12px] bg-primary-blue hover:bg-primary-blue"
          variant="contained"
          aria-label="Cancel"
          onClick={handleReschedule}
        >
          Reschedule
        </Button>
      </div>
    </div>
  );
};

export default React.memo(Reschedule);
