import clsx from 'clsx';
import { Typography, Tooltip, Button, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { SearchBox } from 'app/components';
import {
  setOrderTab,
  getOrderItemsSF,
  setSearchTextSF,
} from 'app/store/appstore/orderStore/orderSlice';
import { orderFilters } from 'app/static-data/orders';
import OrderFilter from './OrderFilter';
import OrderMoreActions from './OrderMoreActions';
import OrderTable from './OrderTable';
import '../orders.css';

const tabItmes = [
  {
    label: 'All',
    value: 'All',
  },
  ...orderFilters,
];

function OrderList() {
  const [filterPoper, setfilterPoper] = useState(null);

  const dispatch = useDispatch();
  const searchText = useSelector(({ appstore }) => appstore.orderSlice.searchText);

  const filterPoperClick = (event) => {
    setfilterPoper(event.currentTarget);
  };

  const filterPoperClose = () => {
    setfilterPoper(null);
  };
  const [moreActionsPoper, setmoreActionsPoper] = useState(null);

  const moreActionsPoperClick = (event) => {
    setmoreActionsPoper(event.currentTarget);
  };

  const moreActionsPoperClose = () => {
    setmoreActionsPoper(null);
  };

  const orderTab = useSelector(({ appstore }) => appstore.orderSlice.orderTab);

  return (
    <div className="flex flex-col flex-1 p-[30px] bg-grey-50 ">
      <div className="max-w-[100%]">
        <div className="flex flex-row justify-between">
          <div>
            <Typography variant="h4" color="inherit" className="font-medium mb-16">
              Orders
              <Tooltip title="Blog" placement="bottom-start" enterDelay={300}>
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

              <OrderFilter filterPoper={filterPoper} filterPoperClose={filterPoperClose} />
            </div>
            <div>
              <Button
                className="rounded-none h-[40px] ml-[5px] bg-black-300 hover:bg-primary-blue"
                variant="contained"
                onClick={moreActionsPoperClick}
              >
                More Actions
              </Button>

              <OrderMoreActions
                moreActionsPoper={moreActionsPoper}
                moreActionsPoperClose={moreActionsPoperClose}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row border-b-1 border-b-[#F0F0F0]">
          {tabItmes.map((item, index) => (
            <Box
              key={index}
              onClick={() => {
                dispatch(setOrderTab(item.value));
                dispatch(setSearchTextSF(''));
                dispatch(getOrderItemsSF({ page: 0, limit: 10 }));
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
                  orderTab == item.value ? 'text-blue font-bold' : 'text-grey'
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
              placeholder="Search by customer name"
              searchText={searchText}
              applySearch={(value) => {
                dispatch(setSearchTextSF(value));
                dispatch(getOrderItemsSF({ page: 0, limit: 10 }));
              }}
            />
            <div className="flex flex-col flex-1 items-center justify-center w-full bg-white">
              <OrderTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
