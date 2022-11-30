import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { CustomAccordionV2 } from 'app/components';
import { selectContacts, selectContactById } from './store/contactsSlice';

const CustomerInfo = () => {
  const selectedContact = useSelector((state) =>
    selectContactById(state, state.chatApp.contacts.selectedContactId)
  );
  return (
    <div className="flex flex-col gap-[10px] px-[16px] py-[24px] border-b-1 border-grey-200">
      <Typography className="text-grey font-semibold">Customer Name:</Typography>
      <div className="flex ml-[8px]">
        <Avatar src={selectedContact.avatar} alt={selectedContact.name} variant="rounded" />
        <div className="flex flex-col ml-[16px]">
          <Typography className="text-grey-800 text-[14px] font-semibold">
            {selectedContact.name}
          </Typography>
          <Typography className="text-grey text-[14px]">Memeber since Jan 2022</Typography>
        </div>
      </div>
      <Typography className="text-grey font-semibold">Customer Contact Number:</Typography>
      <Typography className="text-grey-800 font-semibold">+65 8888 8888</Typography>
      <Typography className="text-grey font-semibold">Customer Email:</Typography>
      <Typography className="text-grey-800 font-semibold">florencio@gmail.com</Typography>
      <Typography className="text-grey font-semibold">Customer Address:</Typography>
      <Typography className="text-grey-800 font-semibold w-[70%]">
        Blk 123 Ang Mo Kio St 21 #12-34 Singapore 123456
      </Typography>
    </div>
  );
};

const PastOrders = () => {
  const orders = [
    {
      orderId: 'INV12345',
      orderDate: 'Jan 22, 2022',
      orderItems: [
        {
          itemId: '54',
          itemName: 'Item 1',
          itemPrice: '$10.00',
          itemQuantity: '1',
          itemTotal: '$10.00',
        },
        {
          itemId: '56',
          itemName: 'Item 2',
          itemPrice: '$10.00',
          itemQuantity: '1',
          itemTotal: '$10.00',
        },
      ],
    },
    {
      orderId: 'INV25415',
      orderDate: 'Jan 22, 2022',
      orderItems: [
        {
          itemId: '57',
          itemName: 'Item 3',
          itemPrice: '$10.00',
          itemQuantity: '1',
          itemTotal: '$10.00',
        },
      ],
    },
  ];

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
          1
        </span>
      </div>
      <div className="flex flex-col px-[16px] py-[10px] gap-[16px]">
        {orders.map((order, index) => (
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

function CustomerProfile(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const selectedContactId = useSelector(({ chatApp }) => chatApp.contacts.selectedContactId);

  const contact = contacts.find((_contact) => _contact.id === selectedContactId);

  if (!contact) {
    return null;
  }

  return (
    <div className="flex flex-col flex-auto h-full border-l-1  border-grey-300">
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

      <FuseScrollbars className="overflow-y-auto flex-1">
        <div className="flex flex-col flex-auto">
          <CustomerInfo />
          <PastOrders />
        </div>
      </FuseScrollbars>
    </div>
  );
}

export default CustomerProfile;
