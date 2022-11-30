// /* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Typography, Button, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch, useSelector } from 'react-redux';
import { convertDateToString } from 'app/utils';
import { deleteDateOverride } from './store/availabilitySlice';
import DateRangePopup from './DateRangePopup';

const SingleDateOveride = (props) => {
  const { singleDate, idx } = props;
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row px-[30px] py-[17px] justify-between border-b-1  border-grey-200 first:border-t-1">
      <div className="flex flex-col gap-[5px]">
        <Typography className="text-[14px] font-[600] text-black">
          {convertDateToString(singleDate.start_date)} - {convertDateToString(singleDate.end_date)}
        </Typography>
        {singleDate.slots &&
          singleDate.slots.map((slot, index) => (
            <React.Fragment key={index}>
              <Typography className="text-[14px] font-[400] text-grey">
                {slot.start_time} - {slot.end_time}
              </Typography>
            </React.Fragment>
          ))}
      </div>
      <IconButton
        size="medium"
        className="flex justify-center items-start hover:bg-transparent text-[#262626] h-[40px]"
        onClick={() => {
          dispatch(deleteDateOverride({ dateOverrideIdx: idx }));
        }}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </div>
  );
};

const EditDateOverrides = ({ avType }) => {
  const dispatch = useDispatch();
  const allAvailability = useSelector(
    ({ availabilityStore }) => availabilityStore.availability.all_availability
  );

  const avTypeIdx = useSelector(
    ({ availabilityStore }) => availabilityStore.availability.avTypeIdx
  );

  const { dateOverrides } = allAvailability[avTypeIdx];

  const [filterPoper, setfilterPoper] = useState(null);

  const filterPoperClick = (event) => {
    setfilterPoper(event.currentTarget);
  };

  const filterPoperClose = () => {
    setfilterPoper(null);
  };

  return (
    <div className="flex flex-col w-[40%] bg-light-50">
      <div className="flex justify-between items-center px-[30px] py-[17px]">
        <Typography className="text-[14px] font-[600] text-black">Date Overides</Typography>
        <Button
          variant="text"
          className="text-[14px] font-[600] text-black hover:bg-transparent"
          onClick={filterPoperClick}
        >
          +
        </Button>
        <DateRangePopup
          filterPoper={filterPoper}
          filterPoperClose={filterPoperClose}
          avType={avType}
        />
      </div>
      <div className="flex flex-col">
        {dateOverrides &&
          dateOverrides.map((item, index) => (
            <SingleDateOveride key={index} singleDate={item} avType={avType} idx={index} />
          ))}
      </div>
    </div>
  );
};

export default EditDateOverrides;
