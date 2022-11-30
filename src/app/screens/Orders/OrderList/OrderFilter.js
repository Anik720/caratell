import { Button, Checkbox, Input, Paper, Popover, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import { DatePicker } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderFilters, getOrderItemsSF } from 'app/store/appstore/orderStore/orderSlice';
import _ from 'lodash';

function OrderFilter(props) {
  const { filterPoper, filterPoperClose } = props;

  const orderFilters = useSelector(({ appstore }) => appstore.orderSlice.orderFilters);

  const [filterState, setFilterState] = useState({
    modes: orderFilters.modes,
    minPrice: orderFilters.minPrice,
    maxPrice: orderFilters.maxPrice,
    minDate: orderFilters.minDate,
    maxDate: orderFilters.maxDate,
  });

  const dispatch = useDispatch();

  const handleModeChange = (value) => {
    const modes = _.cloneDeep(filterState.modes);
    if (modes.includes(value)) {
      modes.splice(modes.indexOf(value), 1);
    } else {
      modes.push(value);
    }
    setFilterState({ ...filterState, modes });
  };

  const applyFilters = () => {
    dispatch(
      setOrderFilters({
        modes: filterState.modes,
        minPrice: filterState.minPrice,
        maxPrice: filterState.maxPrice,
        minDate: filterState.minDate,
        maxDate: filterState.maxDate,
      })
    );

    dispatch(getOrderItemsSF({ page: 0, limit: 10 }));
    filterPoperClose();
  };

  const handleReset = () => {
    const emptyFilter = {
      modes: [],
      minPrice: '',
      maxPrice: '',
      minDate: '',
      maxDate: '',
      status: '',
    };
    setFilterState(emptyFilter);
    dispatch(setOrderFilters(emptyFilter));
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
      <div className="flex flex-col p-[15px]">
        <div>
          <Typography className="text-[14px] font-bold">Modes</Typography>
          <div className="flex flex-row">
            <div className="flex flex-row">
              <div>
                <Checkbox
                  checked={filterState.modes.includes('Pickup')}
                  onChange={(e) => handleModeChange('Pickup')}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
              <div>
                <Typography className="text-[12px] mt-[12px]">Pick Up</Typography>
              </div>
            </div>
            <div className="flex flex-row ml-[40px]">
              <div className="flex flex-row">
                <div>
                  <Checkbox
                    checked={filterState.modes.includes('Delivery')}
                    onChange={(e) => handleModeChange('Delivery')}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </div>
                <div>
                  <Typography className="text-[12px] mt-[12px]">Delivery</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Typography className="text-[14px] font-bold mb-16">Order Amount</Typography>
          <div className="flex flex-row justify-between">
            <div>
              <Paper className="flex items-center  w-[180px] h-[40px] max-w-512 rounded-4 px-8 shadow-0 border-2">
                <Input
                  placeholder="Minumum"
                  className="flex flex-1 mx-8"
                  disableUnderline
                  value={filterState.minPrice}
                  inputProps={{
                    'aria-label': 'Minumum',
                  }}
                  onChange={(ev) => {
                    setFilterState({ ...filterState, minPrice: ev.target.value });
                  }}
                />
              </Paper>
            </div>
            <div className="flex items-center text-center justify-center w-[30px]">
              <RemoveTwoToneIcon />
            </div>
            <div>
              <Paper className="flex items-center  w-[180px] h-[40px] max-w-512 rounded-4 px-8 shadow-0 border-2">
                <Input
                  placeholder="Maximum"
                  className="flex flex-1 mx-8"
                  disableUnderline
                  value={filterState.maxPrice}
                  inputProps={{
                    'aria-label': 'Maximum',
                  }}
                  onChange={(ev) => {
                    setFilterState({ ...filterState, maxPrice: ev.target.value });
                  }}
                />
              </Paper>
            </div>
          </div>
        </div>

        <div>
          <Typography className="text-[14px] font-bold mb-16 mt-16">Order Date</Typography>
          <div className="flex flex-row justify-between">
            <div>
              <div className="flex items-center  w-[180px] h-[40px] max-w-512">
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  value={filterState.minDate}
                  onChange={(newValue) => {
                    setFilterState({ ...filterState, minDate: newValue });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </div>
            <div className="flex items-center text-center justify-center w-[30px]">
              <RemoveTwoToneIcon />
            </div>
            <div>
              <div className="flex items-center  w-[180px] h-[40px] max-w-512">
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  value={filterState.maxDate}
                  onChange={(newValue) => {
                    setFilterState({ ...filterState, maxDate: newValue });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-[30px]">
          <Button
            className="rounded-none w-full h-[30px] bg-primary-blue hover:bg-primary-blue-300"
            variant="contained"
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </div>
        <div className="w-full mt-[10px]">
          <Button
            className="rounded-none w-full h-[30px] bg-black hover:bg-black-50"
            variant="contained"
            onClick={handleReset}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </Popover>
  );
}

export default OrderFilter;
