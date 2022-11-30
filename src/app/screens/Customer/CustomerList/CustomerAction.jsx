import { useState } from 'react';
import { Checkbox, Popover, Typography, Button } from '@mui/material';
import { useSnackbar } from 'app/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { kycStatus } from 'app/static-data/customer';
import {
  getCustomersSF,
  updateUserKycStatus,
} from 'app/store/appstore/customerStore/customersSlice';

function CustomerAction(props) {
  const { filterPoper, filterPoperClose } = props;
  const dispatch = useDispatch();
  const showSnakbar = useSnackbar();
  const [customerKycStatus, setCustomerKycStatus] = useState('');

  const customerIds = useSelector(({ appstore }) => appstore.customers.customerIds);

  const setStatus = () => {
    if (!customerIds || customerIds.length == 0) {
      showSnakbar('Please select at least one customer.', 'e');
      return;
    }
    const payload = {
      userIds: customerIds,
      kycStatus: customerKycStatus,
    };
    dispatch(updateUserKycStatus(payload)).then((res) => {
      dispatch(getCustomersSF({ page: 0, limit: 10 }));
    });
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
      <div className="flex w-[175px] flex-col p-[15px]">
        <Typography className="text-[14px] font-bold">KYC Status</Typography>
        <div className="flex flex-col flex-wrap flex-grow-[1]">
          {kycStatus.map((option, index) => (
            <div key={index} className="flex flex-row">
              <div>
                <Checkbox
                  checked={customerKycStatus === option.value}
                  onChange={(event) => {
                    setCustomerKycStatus(event.target.checked ? option.value : '');
                  }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
              <div>
                <Typography className="text-[12px] mt-[12px]">{option.label}</Typography>
              </div>
            </div>
          ))}
          <div className="w-full mt-[15px]">
            <Button
              className="rounded-none w-full h-[30px] bg-primary-blue hover:bg-primary-blue-300"
              variant="contained"
              onClick={setStatus}
            >
              Set
            </Button>
          </div>
        </div>
      </div>
    </Popover>
  );
}

export default CustomerAction;
