/* eslint-disable camelcase */
/* eslint-disable unused-imports/no-unused-imports */
import _ from 'lodash';
import React, { useState } from 'react';
import { Button, Checkbox, Popover, Typography, TextField, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'app/hooks';

import { addNewDateOverride } from './store/availabilitySlice';

const isEndTimeGreaterThanStartTime = (startTime, endTime) => {
  const dateObj = new Date().toISOString().split('T')[0];
  const start = new Date(`${dateObj} ${startTime}`);
  const end = new Date(`${dateObj} ${endTime}`);
  return end > start;
};

function DateRangePopup(props) {
  const dispatch = useDispatch();
  const showSnackbar = useSnackbar();

  const { filterPoper, filterPoperClose, avType } = props;

  const [rangeDetails, setRangeDetails] = useState({
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0],
    slots: [
      {
        start_time: '09:00',
        end_time: '13:00',
      },
    ],
  });

  const handleStartDateChange = (e) => {
    const start_date = e.target.value;
    if (new Date(start_date) < new Date()) {
      showSnackbar("Start date should be greater than or equal to today's date", 'e');
    }
    setRangeDetails((prev) => ({
      ...prev,
      start_date,
    }));
  };

  const handleEndDateChange = (e) => {
    const end_date = e.target.value;
    if (new Date(end_date) < new Date(rangeDetails.start_date)) {
      showSnackbar('End date should be greater than or equal to start date', 'e');
      return;
    }
    setRangeDetails((prev) => ({
      ...prev,
      end_date,
    }));
  };

  const addSlot = () => {
    if (rangeDetails.slots.length >= 5) {
      showSnackbar('You can add only 5 slots', 'e');
      return;
    }
    setRangeDetails((prev) => ({
      ...prev,
      slots: [...prev.slots, { start_time: '09:00', end_time: '13:00' }],
    }));
  };

  const removeSlot = (index) => {
    if (index === 0) return;
    setRangeDetails((prev) => ({
      ...prev,
      slots: [...rangeDetails.slots.slice(0, index), ...rangeDetails.slots.slice(index + 1)],
    }));
  };

  const handleStartHourChange = (e, slot, index) => {
    setRangeDetails((prev) => ({
      ...prev,
      slots: [
        ...rangeDetails.slots.slice(0, index),
        {
          ...slot,
          start_time: e.target.value,
        },
        ...rangeDetails.slots.slice(index + 1),
      ],
    }));
  };

  const handleEndHourChange = (e, slot, index) => {
    const end_time = e.target.value;
    if (!isEndTimeGreaterThanStartTime(slot.start_time, end_time)) {
      showSnackbar('End_time time should be greater than or equal to start time', 'e');
      return;
    }
    setRangeDetails((prev) => ({
      ...prev,
      slots: [
        ...rangeDetails.slots.slice(0, index),
        {
          ...slot,
          end_time,
        },
        ...rangeDetails.slots.slice(index + 1),
      ],
    }));
  };

  const applyDateRange = () => {
    if (new Date(rangeDetails.end_date) < new Date(rangeDetails.start_date)) {
      showSnackbar('End date should be greater than or equal to start date', 'e');
      return;
    }
    dispatch(
      addNewDateOverride({
        rangeDetails,
      })
    );
    filterPoperClose();
  };

  return (
    <Popover
      open={Boolean(filterPoper)}
      anchorEl={filterPoper}
      onClose={filterPoperClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      classes={{
        paper: 'py-8',
      }}
      className="ml-[-140px]"
    >
      <div className="flex flex-col p-[20px]">
        <Typography className="text-[16px] font-medium mb-[16px]">Select Date Range</Typography>
        <div className="flex flex-col flex-wrap flex-grow-[1]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex justify-between items-center gap-[10px]">
              <Typography className="text-[12px]">Select Start Date</Typography>
              <TextField
                className="w-[52%] text-[14px] font-[400] text-dark-900"
                value={rangeDetails.start_date}
                type="date"
                size="small"
                variant="outlined"
                onChange={handleStartDateChange}
              />
            </div>
            <div className="flex justify-between items-center gap-[10px]">
              <Typography className="text-[12px]">Select End Date</Typography>
              <TextField
                className="w-[52%] text-[14px] font-[400] text-dark-900"
                value={rangeDetails.end_date}
                type="date"
                size="small"
                variant="outlined"
                onChange={handleEndDateChange}
              />
            </div>
          </div>
        </div>
        <Typography className="text-[16px] font-medium mt-[22px] mb-[16px]">
          Unavailable Hours
        </Typography>
        <div className="flex flex-col flex-wrap flex-grow-[1] gap-[8px]">
          {rangeDetails.slots.map((slot, index) => (
            <React.Fragment key={index}>
              <div className="grid grid-cols-10 gap-[5px] max-w-[340px]">
                <div className="col-span-8 items-center flex justify-between gap-[8px]">
                  <TextField
                    className="w-[47%] text-[14px] font-[400] text-dark-900"
                    value={slot.start_time}
                    type="time"
                    size="small"
                    variant="outlined"
                    onChange={(e) => {
                      handleStartHourChange(e, slot, index);
                    }}
                  />
                  <div className="h-[1px] w-[6%] bg-black-300" />
                  <TextField
                    className="w-[47%] text-[14px] font-[400] text-dark-900"
                    value={slot.end_time}
                    type="time"
                    size="small"
                    variant="outlined"
                    onChange={(e) => {
                      handleEndHourChange(e, slot, index);
                    }}
                  />
                </div>
                <IconButton
                  size="medium"
                  className="flex justify-center items-start hover:bg-transparent text-[#262626] h-[40px]"
                  onClick={() => removeSlot(index)}
                  disabled={index === 0}
                >
                  <DeleteOutlineIcon />
                </IconButton>
                <IconButton
                  size="medium"
                  className="flex justify-center items-start hover:bg-transparent text-[#262626] h-[40px]"
                  onClick={addSlot}
                  disabled={index >= 7}
                >
                  <AddIcon />
                </IconButton>
              </div>
            </React.Fragment>
          ))}
        </div>
        <Button
          variant="contained"
          className="text-[14px] text-white font-[400] px-[8px] mt-[10px]"
          color="blue"
          onClick={applyDateRange}
        >
          Appply
        </Button>
      </div>
    </Popover>
  );
}

export default DateRangePopup;
