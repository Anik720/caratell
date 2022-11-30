import {
  Button,
  FormControl,
  FormControlLabel,
  Popover,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'app/hooks';
import { getOrderItemsSF, updateOrderStatus } from 'app/store/appstore/orderStore/orderSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderFilters } from 'app/static-data/orders';

function OrderMoreActions(props) {
  const { moreActionsPoper, moreActionsPoperClose } = props;
  const [orderStatusSet, setorderStatusSet] = useState(orderFilters[1].value);
  const dispatch = useDispatch();
  const showSnakbar = useSnackbar();
  const handleorderStatusSetChange = (event) => {
    setorderStatusSet(event.target.value);
  };

  const orderIds = useSelector(({ appstore }) => appstore.orderSlice.selected);

  const setMoreActionsApply = () => {
    if (!orderIds || orderIds.length == 0) {
      showSnakbar('Please select at least one order.', 'e');
      return;
    }
    const payload = {
      orderIds,
      status: orderStatusSet,
    };
    dispatch(updateOrderStatus(payload)).then((res) => {
      dispatch(getOrderItemsSF({ page: 0, limit: 10 }));
    });
    moreActionsPoperClose();
  };

  return (
    <Popover
      open={Boolean(moreActionsPoper)}
      anchorEl={moreActionsPoper}
      onClose={moreActionsPoperClose}
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
      <div className="flex flex-col p-[15px] max-w-[285px]">
        <div>
          <Typography className="text-[14px] font-bold">Set Order as:</Typography>
        </div>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={orderStatusSet}
            onChange={handleorderStatusSetChange}
          >
            <div className="grid grid-cols-2 gap-[5px]">
              {orderFilters.map((status) => (
                <div className="flex-1 w-[185px]" key={status.value}>
                  <FormControlLabel value={status.value} control={<Radio />} label={status.label} />
                </div>
              ))}
            </div>
          </RadioGroup>
        </FormControl>
        <div className="w-full mt-[30px]">
          <Button
            className="rounded-none w-full h-[30px] bg-primary-blue hover:bg-primary-blue-300"
            variant="contained"
            onClick={setMoreActionsApply}
          >
            Set
          </Button>
        </div>
        <div className="w-full mt-[10px]">
          <Button
            className="rounded-none w-full h-[30px] bg-black hover:bg-black-50"
            variant="contained"
            onClick={() => {}}
          >
            Export CSV
          </Button>
        </div>
        <div className="w-full mt-[10px]">
          <Button
            className="rounded-none w-full h-[30px] bg-black hover:bg-black-50"
            variant="contained"
            onClick={() => {}}
          >
            Download Invoice
          </Button>
        </div>
        <div className="w-full mt-[10px]">
          <Button
            className="rounded-none w-full h-[30px] bg-black hover:bg-black-50"
            variant="contained"
            onClick={() => {}}
          >
            Send Invoice
          </Button>
        </div>
      </div>
    </Popover>
  );
}

export default OrderMoreActions;
