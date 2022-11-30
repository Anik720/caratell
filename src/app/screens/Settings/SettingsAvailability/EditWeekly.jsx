/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-nested-ternary */
import clsx from 'clsx';
import _ from 'lodash';
import { useState, useCallback } from 'react';
import { Typography, Button, Switch, IconButton, TextField } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'app/hooks';
import {
  toggleAvailability,
  editStartTime,
  editEndTime,
  addNewSlot,
  deleteSlot,
  resetweekDays,
  copyToOtherDays,
} from './store/availabilitySlice';
import CopyToDaysPopup from './CopyToDaysPopup';

const isEndTimeGreaterThanStartTime = (startTime, endTime) => {
  const dateObj = new Date().toISOString().split('T')[0];
  const start = new Date(`${dateObj} ${startTime}`);
  const end = new Date(`${dateObj} ${endTime}`);
  return end > start;
};

const SingleAvailability = (props) => {
  const dispatch = useDispatch();
  const showSnackbar = useSnackbar();
  const { singleDayItems, dayName, avType, getdayNameIdx } = props;
  const isAvailable = singleDayItems.is_active;
  const dayNameIdx = getdayNameIdx(singleDayItems.day);

  const handleSwitch = () => {
    dispatch(toggleAvailability({ dayName, dayNameIdx }));
  };

  const debStartTime = useCallback(
    _.debounce(
      (value, slotIndex) => dispatch(editStartTime({ dayNameIdx, startTime: value, slotIndex })),
      400
    ),
    []
  );

  const debEndTime = useCallback(
    _.debounce(
      (value, slotIndex) => dispatch(editEndTime({ dayNameIdx, endTime: value, slotIndex })),
      400
    ),
    []
  );

  const handleStartTimeChange = (e, slotIndex) => {
    const value = e.target?.value || '';
    debStartTime(value, slotIndex);
  };

  const handleEndTimeChange = (e, slotIndex) => {
    const value = e.target?.value || '';
    const { start_time } = singleDayItems.slots[slotIndex];
    if (!isEndTimeGreaterThanStartTime(start_time, value)) {
      showSnackbar('End time should be greater than start time', 'e');
    }
    debEndTime(value, slotIndex);
  };

  const [filterPoper, setfilterPoper] = useState(null);

  const filterPoperClick = (event) => {
    setfilterPoper(event.currentTarget);
  };

  const filterPoperClose = () => {
    setfilterPoper(null);
  };

  const handleCopyToOtherDays = (currDay, checkedDays) => {
    const currDayIdx = getdayNameIdx(currDay);
    const dayListIdx = checkedDays.map((day) => getdayNameIdx(day));
    dispatch(
      copyToOtherDays({
        fromDayIdx: currDayIdx,
        toDaysIdx: dayListIdx,
      })
    );
  };

  return (
    <div
      className={clsx(
        'grid grid-cols-11 gap-[8px] text-center border-b-1 border-grey-300 py-[10px] px-[25px] first:border-t-1',
        isAvailable ? 'bg-light-50' : 'bg-light-800'
      )}
    >
      <Switch
        checked={isAvailable}
        onChange={handleSwitch}
        inputProps={{ 'aria-label': 'controlled' }}
        color="blue"
        size="small"
        className="mt-[8px]"
      />
      <Typography className="text-[14px] font-[400] text-dark-900 mt-[8px]">
        {_.upperFirst(dayName).slice(0, 3)}
      </Typography>
      <div className="flex flex-col col-span-6 gap-[5px]">
        {!singleDayItems.is_active && (
          <div className="items-center flex justify-between gap-[10px]">
            <TextField
              className="w-full text-[14px] font-[400] text-dark-900"
              value="10:00"
              type="time"
              size="small"
              variant="outlined"
              disabled
            />
            <div className="h-[1px] w-[10%] bg-black-300" />
            <TextField
              className="w-full text-[14px] font-[400] text-dark-900"
              value="12:00"
              type="time"
              size="small"
              variant="outlined"
              disabled
            />
          </div>
        )}
        {singleDayItems &&
          singleDayItems.slots &&
          singleDayItems.slots.map((item, idx) => (
            <div className="items-center flex justify-between gap-[10px]" key={idx}>
              <TextField
                className="w-full text-[14px] font-[400] text-dark-900"
                value={item.start_time}
                type="time"
                onChange={(e) => {
                  handleStartTimeChange(e, idx);
                }}
                size="small"
                variant="outlined"
                disabled={!isAvailable}
              />
              <div className="h-[1px] w-[10%] bg-black-300" />
              <TextField
                className="w-full text-[14px] font-[400] text-dark-900"
                value={item.end_time}
                onChange={(e) => {
                  handleEndTimeChange(e, idx);
                }}
                type="time"
                size="small"
                variant="outlined"
                disabled={!isAvailable}
              />
            </div>
          ))}
      </div>
      <div className="flex flex-col">
        {singleDayItems.slots.length > 0 &&
          singleDayItems.slots.map((item, idx) => (
            <div className="flex" key={idx}>
              <IconButton
                size="medium"
                className="flex justify-center items-start hover:bg-transparent text-[#262626] h-[40px]"
                onClick={() => {
                  dispatch(deleteSlot({ dayNameIdx, slotIndex: idx }));
                }}
                disabled={singleDayItems.slots.length == 1}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </div>
          ))}
      </div>
      <IconButton
        size="medium"
        className="flex justify-center items-start hover:bg-transparent text-[#262626] h-[40px]"
        disabled={!isAvailable || singleDayItems.slots.length > 10}
        onClick={() => {
          if (singleDayItems.slots.length > 10) {
            showSnackbar('Maximum 10 slots allowed', 'e');
            return;
          }
          dispatch(addNewSlot({ dayNameIdx }));
        }}
      >
        <AddIcon />
      </IconButton>
      <div>
        <IconButton
          size="medium"
          className="flex justify-center items-start hover:bg-transparent text-[#262626] h-[40px]"
          onClick={filterPoperClick}
          disabled={!isAvailable}
        >
          <ContentCopyIcon />
        </IconButton>
        <CopyToDaysPopup
          filterPoper={filterPoper}
          filterPoperClose={filterPoperClose}
          currDay={dayName}
          avType={avType}
          handleCopyToOtherDays={handleCopyToOtherDays}
        />
      </div>
    </div>
  );
};

const EditWeekly = ({ avType }) => {
  const dispatch = useDispatch();
  const allAvailability = useSelector(
    ({ availabilityStore }) => availabilityStore.availability.all_availability
  );

  const avTypeIdx = useSelector(
    ({ availabilityStore }) => availabilityStore.availability.avTypeIdx
  );

  const { weekDays } = allAvailability[avTypeIdx];

  const getdayNameIdx = (dayName) => {
    return weekDays && weekDays.findIndex((day) => day.day === dayName);
  };

  return (
    <div className="flex flex-col w-[60%] bg-light-50">
      <div className="flex justify-between items-center p-[24px]">
        <Typography className="text-[14px] font-[600] text-black">Set Your Availability</Typography>
        <Button
          variant="text"
          className="text-[14px] font-[600] text-black hover:bg-transparent"
          onClick={() => {
            dispatch(resetweekDays());
          }}
        >
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-11 gap-[8px] px-[25px] py-[10px]">
        <div className="col-start-3 col-span-6 flex justify-between gap-[10px]">
          <Typography className="w-[48%] text-[14px] font-[400] text-dark-900 text-center">
            Start Time
          </Typography>
          <span />
          <Typography className="w-[48%] text-[14px] font-[400] text-dark-900 text-center">
            End Time
          </Typography>
        </div>
      </div>
      <div className="flex flex-col">
        {weekDays &&
          weekDays.map((item, index) => {
            return (
              <SingleAvailability
                singleDayItems={item}
                getdayNameIdx={getdayNameIdx}
                dayName={item.day}
                key={index}
                avType={avType}
              />
            );
          })}
      </div>
    </div>
  );
};

export default EditWeekly;
