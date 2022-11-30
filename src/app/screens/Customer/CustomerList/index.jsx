import clsx from 'clsx';
import { Typography, Tooltip, Button, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from 'app/components/SearchBox';
import {
  getCustomersSF,
  setCustomersSearchTextSF,
  setCustomerTab,
} from 'app/store/appstore/customerStore/customersSlice';

import { kycStatus } from 'app/static-data/customer';

import pageData from './pageData';
import CustomerTable from './CustomerTable';
import CustomerAction from './CustomerAction';

const tabItmes = [
  {
    value: 'all',
    label: 'All',
  },
  ...kycStatus,
];

function CustomerList() {
  const [filterPoper, setfilterPoper] = useState(null);

  const dispatch = useDispatch();
  const searchText = useSelector(({ appstore }) => appstore.customers.searchText);
  const customerTab = useSelector(({ appstore }) => appstore.customers.customerTab);

  const filterPoperClick = (event) => {
    setfilterPoper(event.currentTarget);
  };

  const filterPoperClose = () => {
    setfilterPoper(null);
  };

  return (
    <div className="flex flex-col flex-1 p-[30px] bg-grey-50 ">
      <div className="max-w-[100%]">
        <div className="flex flex-row justify-between">
          <div>
            <Typography variant="h4" color="inherit" className="font-medium mb-16">
              {pageData.pageTitle}
              <Tooltip title={pageData.pageTitle} placement="bottom-start" enterDelay={300}>
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
              <CustomerAction filterPoper={filterPoper} filterPoperClose={filterPoperClose} />
            </div>
            <div>
              <Button
                className="rounded-none h-[40px] ml-[5px] bg-black-300 hover:bg-primary-blue"
                variant="contained"
                onClick={() => {}}
              >
                {pageData.EXPORT_CSV}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-row border-b-1 border-b-[#F0F0F0]">
          {tabItmes.map((item, index) => (
            <Box
              key={index}
              onClick={() => {
                dispatch(setCustomerTab(item.value));
                dispatch(setCustomersSearchTextSF(''));
                dispatch(getCustomersSF({ page: 0, limit: 10 }));
              }}
              sx={{
                borderBottom: '40px solid white',
                borderRight: '20px solid transparent',
                height: 0,
                padding: '0 20px',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              <div
                className={clsx(
                  'py-[10px] px-[15px]',
                  customerTab == item.value ? 'text-blue font-bold' : 'text-grey'
                )}
              >
                {item.label}
              </div>
            </Box>
          ))}
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col w-full bg-light">
            <SearchBox
              placeholder="Search by Customer name"
              searchText={searchText}
              applySearch={(value) => {
                dispatch(setCustomersSearchTextSF(value));
                dispatch(getCustomersSF({ page: 0, limit: 10 }));
              }}
            />
            <div className="flex flex-col flex-1 items-center justify-center w-full bg-white">
              <CustomerTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerList;
