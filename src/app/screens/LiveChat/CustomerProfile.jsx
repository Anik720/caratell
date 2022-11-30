import { useEffect } from 'react';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Avatar, CircularProgress, AppBar, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { CustomAccordionV2 } from 'app/components';
import { getCustomerProfile } from 'app/store/appstore/chatStore/liveChatSlice';
import format from 'date-fns/format';

const CustomerInfo = ({ customerDetails }) => {
  return (
    <div className="flex flex-col gap-[10px] px-[16px] py-[24px] border-b-1 border-grey-200">
      <Typography className="text-grey font-semibold">Customer Name:</Typography>
      <div className="flex ml-[8px]">
        <Avatar
          src={customerDetails.avatar || 'https://i.pravatar.cc/300'}
          alt="customerProfile"
          variant="rounded"
        />
        <div className="flex flex-col ml-[16px]">
          <Typography className="text-grey-800 text-[14px] font-semibold">
            {`${customerDetails.first_name || ''} ${customerDetails.last_name || ''}`}
          </Typography>
          <Typography className="text-grey text-[14px]">
            Memeber since: {format(new Date(customerDetails.created_at), 'dd MMM yyyy')}
          </Typography>
        </div>
      </div>
      <Typography className="text-grey font-semibold">Customer Contact Number:</Typography>
      <Typography className="text-grey-800 font-semibold">
        {customerDetails.phone_number || 'Not Available'}
      </Typography>
      <Typography className="text-grey font-semibold">Customer Email:</Typography>
      <Typography className="text-grey-800 font-semibold">
        {customerDetails.email || 'Not Available'}
      </Typography>
      <Typography className="text-grey font-semibold">Customer Address:</Typography>
      <Typography className="text-grey-800 font-semibold w-[70%]">
        {customerDetails.address || 'Not Available'}
      </Typography>
    </div>
  );
};

const PastOrders = ({ orderDetails }) => {
  const Title = ({ order }) => {
    return (
      <div className="flex flex-col">
        <Typography className="text-[14px] font-semibold">{order.orderId}</Typography>
        <Typography className="text-[14px] font-semibold text-grey">
          {order.orderItems && order.orderItems.length} items
        </Typography>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center px-[16px] py-[16px]">
        <Typography color="inherit" className="text-18 font-semibold px-4">
          Past Orders
        </Typography>
        <span className="flex items-center justify-center w-[20px] h-[20px] bg-blue-50 rounded-full">
          {orderDetails && orderDetails.length}
        </span>
      </div>
      <div className="flex flex-col px-[16px] py-[10px] gap-[16px]">
        {orderDetails &&
          orderDetails.map((order, index) => (
            <div key={index}>
              <CustomAccordionV2 title={<Title order={order} />} index={index} shadow>
                <div className="flex flex-col">
                  <Typography className="text-grey font-semibold">Order ID:</Typography>
                </div>
              </CustomAccordionV2>
            </div>
          ))}
      </div>
    </div>
  );
};

function CustomerProfile({ customerEmail }) {
  const dispatch = useDispatch();

  const {
    status,
    data: { userDetails, ordreDetails },
  } = useSelector(({ appstore }) => appstore.liveChat.customerProfile);

  useEffect(() => {
    dispatch(getCustomerProfile({ customerEmail }));
  }, [dispatch, customerEmail]);

  if (status !== 'succeeded') {
    return (
      <div className="h-full w-full flex flex-col flex-auto justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (!customerEmail || customerEmail == '') {
    return null;
  }

  return (
    <div className="flex flex-col flex-auto h-full">
      <AppBar
        className="w-full border-b-1 border-grey-300"
        elevation={0}
        position="static"
        color="white"
      >
        <Toolbar className="px-16 flex justify-between">
          <div>
            <div className="flex items-center cursor-pointer" role="button" tabIndex={0}>
              <Typography color="inherit" className="text-18 font-semibold px-4">
                Customer Profile
              </Typography>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      {!userDetails && !ordreDetails ? (
        <div className="flex flex-col items-center justify-center h-full">
          <Typography className="text-grey-800 text-[18px] font-semibold">
            No Customer Found
          </Typography>
        </div>
      ) : (
        <FuseScrollbars className="overflow-y-auto flex-1">
          <div className="flex flex-col flex-auto">
            <CustomerInfo customerDetails={userDetails} />
            <PastOrders orderDetails={ordreDetails} />
          </div>
        </FuseScrollbars>
      )}
    </div>
  );
}

export default CustomerProfile;
