import _ from '@lodash';
import { Checkbox, Popover, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { appointmentTypes } from 'app/static-data/settings';
import {
  setFiltersSF,
  getAppointmentItemsSF,
} from 'app/store/appstore/appointmentStore/appointmentSlice';

function AppointmentFilter(props) {
  const dispatch = useDispatch();
  const { filterPoper, filterPoperClose } = props;

  const { types } = useSelector(({ appstore }) => appstore.appointment.filters);

  const handleApTypeChange = (event, apType) => {
    const currentIndex = types.indexOf(apType);
    const newChecked = [...types];

    if (currentIndex === -1) {
      newChecked.push(apType);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    dispatch(setFiltersSF({ filters: { types: newChecked } }));
    dispatch(getAppointmentItemsSF({ page: 0, limit: 10 }));
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
      <div className="flex w-[175px] flex-col p-[15px]">
        <Typography className="text-[14px] font-bold">Filter</Typography>
        <div className="flex flex-col flex-wrap flex-grow-[1]">
          {appointmentTypes?.map((option, index) => (
            <div key={index} className="flex flex-row">
              <div>
                <Checkbox
                  checked={!!types.includes(option)}
                  onChange={(event) => {
                    handleApTypeChange(event, option);
                  }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
              <div>
                <Typography className="text-[12px] mt-[12px]">{_.startCase(option)}</Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Popover>
  );
}

export default AppointmentFilter;
