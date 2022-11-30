import _ from 'lodash';
import { useState, useEffect } from 'react';
import { Button, Checkbox, Popover, Typography } from '@mui/material';

const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function CopyToDaysPopup(props) {
  const { filterPoper, filterPoperClose, currDay, handleCopyToOtherDays } = props;

  const [checkedDays, setCheckedDays] = useState([currDay]);

  useEffect(() => {
    setCheckedDays([currDay]);
  }, [currDay]);

  const toggleCheckedDay = (day) => {
    const newCheckedDays = _.cloneDeep(checkedDays);
    const index = newCheckedDays.indexOf(day);
    if (index > -1) {
      newCheckedDays.splice(index, 1);
    } else {
      newCheckedDays.push(day);
    }
    setCheckedDays(newCheckedDays);
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
      <div className="flex w-[175px] flex-col p-[10px]">
        <Typography className="text-[12px] text-grey-500">COPY ITEMS TO...</Typography>
        <div className="flex flex-col flex-wrap flex-grow-[1]">
          {dayNames.map((day, index) => (
            <div key={index} className="flex flex-row">
              <div>
                <Checkbox
                  checked={!!checkedDays.includes(day)}
                  onChange={() => {
                    toggleCheckedDay(day);
                  }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
              <div>
                <Typography className="text-[12px] mt-[12px]">{_.upperFirst(day)}</Typography>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="contained"
          className="text-[14px] text-white font-[400] px-[8px] mt-[10px]"
          color="blue"
          onClick={() => {
            handleCopyToOtherDays(currDay, checkedDays);
            filterPoperClose();
          }}
        >
          Appply
        </Button>
      </div>
    </Popover>
  );
}

export default CopyToDaysPopup;
