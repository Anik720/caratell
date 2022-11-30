/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Grid, Typography, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CustomSelect, CustomInput, CSelectSearchable } from 'app/components';
import api from 'app/APIs/caratell-service/apiService';
import { useWatch } from 'react-hook-form';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { calculateTotal } from './order_utils';

const OrderItems = ({
  getValues,
  setValue,
  control,
  errors,
  orderItemsState,
  priceCalculationState,
}) => {
  const [orders, setOrders] = useState([]);
  const [orderCalculations, setOrderCalculations] = useState({});
  const [orderState, dc, oc, gstp] = useWatch({
    control,
    name: ['orderItems', 'deliveryCharge', 'otherCharges', 'gstPercentage'],
  });
  useEffect(() => {
    const { calculatedItems, subTotal, gstAmount, netTotal } = calculateTotal(
      orderState,
      dc,
      oc,
      gstp
    );
    setOrders(calculatedItems);
    setOrderCalculations({
      subTotal,
      deliveryCharge: dc,
      otherCharges: oc,
      gstPercentage: gstp,
      gstAmount,
      netTotal,
    });
    return () => {
      setOrders([]);
      setOrderCalculations({});
    };
  }, [getValues]);

  useEffect(() => {
    const { calculatedItems } = calculateTotal(orderItemsState);
    setOrders(calculatedItems);
  }, [orderItemsState]);

  useEffect(() => {
    const [deliveryCharge, otherCharges, gstPercentage] = priceCalculationState;
    const { subTotal, gstAmount, netTotal, calculatedItems } = calculateTotal(
      orders,
      deliveryCharge,
      otherCharges,
      gstPercentage
    );

    setOrderCalculations({
      subTotal,
      deliveryCharge,
      otherCharges,
      gstPercentage,
      gstAmount,
      netTotal,
    });
    setValue('subTotal', subTotal);
    setValue('gstAmount', gstAmount);
    setValue('netTotal', netTotal);
    // setValue('orderItems', calculatedItems);
  }, [orders, priceCalculationState]);

  const addOrderItem = () => {
    const newOrderItem = {
      itemName: orders[0].itemName,
      itemDescription: '',
      itemQuantity: 1,
      itemUnitPrice: 0,
      itemDiscount: 0,
      itemTotal: 0,
    };
    setOrders([...orders, newOrderItem]);
    setValue('orderItems', [...orders, newOrderItem]);
  };

  const getSearchableList = async (inputValue) => {
    if (!inputValue || inputValue.length < 3) {
      return [];
    }
    const res = await api.searchProduct(inputValue);
    const options =
      res && res.length > 0
        ? res.map((item) => ({
            value: item.id,
            label: item.name,
            fullItem: item,
          }))
        : [];
    return options;
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center px-[24px] w-full h-[48px] bg-gold">
        <div className="flex flex-row gap-[15px]">
          <div className="w-[50%]">
            <Typography
              variant="body1"
              color="inherit"
              className="text-[20px] text-left text-white"
            >
              <span className="mr-10">#</span> Item & Comment
            </Typography>
          </div>
          <Grid className="w-[50%]" w="full" container spacing={1} columns={7}>
            <Grid item xs={1}>
              <Typography
                variant="body1"
                color="inherit"
                className="text-[20px] text-left text-white"
              >
                QTY
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant="body1"
                color="inherit"
                className="text-[20px] text-left text-white"
              >
                Unit Price
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant="body1"
                color="inherit"
                className="text-[20px] text-left text-white"
              >
                Discount
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant="body1"
                color="inherit"
                className="text-[20px] text-center text-white"
              >
                Subtotal
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="flex flex-row border-b-1 border-grey-300 items-center justify-start pl-[50px] w-full h-[75px] bg-light-50">
        <div className="flex flex-row cursor-pointer" onClick={addOrderItem}>
          <AddCircleOutlineIcon className="text-primary-blue text-[24px] mr-[10px]" />
          <Typography
            variant="body1"
            color="inherit"
            className="text-[16px] text-left text-primary-blue"
          >
            Add Item
          </Typography>
        </div>
      </div>
      <div className="flex flex-col w-full bg-light-50">
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-row gap-[15px] px-[24px] py-[15px] border-b-1 border-grey-300"
          >
            <div className="flex flex-col w-[50%] gap-[15px]">
              <div className="flex flex-row items-center w-full">
                <Typography
                  variant="body1"
                  color="inherit"
                  className="text-[20px] text-left mr-[8px] text-grey"
                >
                  {index + 1}.
                </Typography>
                <div className="w-full">
                  <CSelectSearchable
                    placeholder="Search by product name"
                    defaultItem={{
                      value: order.itemName.value,
                      label: order.itemName.label,
                    }}
                    getSearchableList={getSearchableList}
                    applySelect={(item) => {
                      const { value, label, fullItem } = item;
                      setValue(`orderItems[${index}].itemName`, {
                        value,
                        label,
                      });
                      setValue(`orderItems[${index}].itemDescription`, fullItem.description);
                      setValue(`orderItems[${index}].itemUnitPrice`, fullItem.price);
                    }}
                  />
                </div>
                {/* <div className="">
                  <IconButton
                    size="medium"
                    className="flex justify-center items-start hover:bg-transparent text-[#262626] h-[40px]"
                    onClick={() => {
                      const newOrders = [...orders];
                      newOrders.splice(index, 1);
                      setOrders(newOrders);
                      setValue('orderItems', newOrders);
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </div> */}
              </div>
              <div className="w-[100%] pl-[22px]">
                <CustomInput
                  name={`orderItems[${index}].itemDescription`}
                  control={control}
                  error={Boolean(
                    errors.orderItems &&
                      errors.orderItems[index] &&
                      errors.orderItems[index].itemDescription
                  )}
                  helperText={
                    errors.orderItems &&
                    errors.orderItems[index] &&
                    errors.orderItems[index].itemDescription &&
                    errors.orderItems[index].itemDescription.message
                  }
                  multiline
                  rows={4}
                />
              </div>
            </div>
            <Grid className="w-[50%]" w="full" container spacing={1} columns={7}>
              <Grid item xs={1}>
                <CustomInput
                  name={`orderItems[${index}].itemQuantity`}
                  type="number"
                  control={control}
                  error={Boolean(
                    errors.orderItems &&
                      errors.orderItems[index] &&
                      errors.orderItems[index].itemQuantity
                  )}
                  helperText={
                    errors.orderItems &&
                    errors.orderItems[index] &&
                    errors.orderItems[index].itemQuantity &&
                    errors.orderItems[index].itemQuantity.message
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <CustomInput
                  name={`orderItems[${index}].itemUnitPrice`}
                  type="number"
                  control={control}
                  error={Boolean(
                    errors.orderItems &&
                      errors.orderItems[index] &&
                      errors.orderItems[index].itemQuantity
                  )}
                  helperText={
                    errors.orderItems &&
                    errors.orderItems[index] &&
                    errors.orderItems[index].itemQuantity &&
                    errors.orderItems[index].itemQuantity.message
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <CustomInput
                  name={`orderItems[${index}].itemDiscount`}
                  type="number"
                  control={control}
                  error={Boolean(
                    errors.orderItems &&
                      errors.orderItems[index] &&
                      errors.orderItems[index].itemDiscount
                  )}
                  helperText={
                    errors.orderItems &&
                    errors.orderItems[index] &&
                    errors.orderItems[index].itemDiscount &&
                    errors.orderItems[index].itemDiscount.message
                  }
                />
              </Grid>
              <Grid item xs={2} mt="5px">
                <Typography
                  variant="body1"
                  color="inherit"
                  className="text-[16px] font-semibold text-center text-dark-800"
                >
                  {`$ ${order.itemTotal}`}
                </Typography>
              </Grid>
            </Grid>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full bg-light-50">
        <div className="flex flex-row gap-[15px] px-[24px] py-[15px]">
          <div className="flex flex-col w-[50%]">
            <div className="w-full pl-[22px]">
              <CustomInput
                name="notesForCustomer"
                control={control}
                error={Boolean(errors.notesForCustomer && errors.notesForCustomer)}
                helperText={errors.notesForCustomer && errors.notesForCustomer.message}
                multiline
                rows={6}
              />
            </div>
          </div>
          <div className="flex flex-col w-[50%] gap-[15px]">
            <div className="flex flex-row w-full gap-[15px] mb-[10px]">
              <div className="flex flex-col w-[50%] items-end">
                <Typography
                  variant="body1"
                  color="inherit"
                  className="text-[16px] font-semibold text-left text-dark-800"
                >
                  Subtotal
                </Typography>
              </div>
              <div className="flex flex-col w-[50%] items-end">
                <Typography
                  variant="body1"
                  color="inherit"
                  className="text-[16px] font-semibold text-left text-dark-800"
                >
                  {`$ ${orderCalculations.subTotal}`}
                </Typography>
              </div>
            </div>
            <div className="flex flex-row w-full gap-[15px]">
              <div className="flex flex-row w-[50%] justify-end items-center">
                <p className="text-[16px] text-dark-800">Delivery Charge</p>
                <HelpOutlineIcon className="text-dark-800 mx-[5px] text-[16px]" />
                <p className="text-[16px] text-dark-800">:</p>
              </div>
              <div className="flex flex-col w-[50%] items-end">
                <CustomInput
                  name="deliveryCharge"
                  type="number"
                  control={control}
                  error={Boolean(errors.deliveryCharge)}
                  helperText={errors.deliveryCharge?.message}
                />
              </div>
            </div>
            <div className="flex flex-row w-full gap-[15px]">
              <div className="flex flex-row w-[50%] justify-end items-center">
                <p className="text-[16px] text-dark-800">Other Charges</p>
                <HelpOutlineIcon className="text-dark-800 mx-[5px] text-[16px]" />
                <p className="text-[16px] text-dark-800">:</p>
              </div>
              <div className="flex flex-col w-[50%] items-end">
                <CustomInput
                  name="otherCharges"
                  type="number"
                  control={control}
                  error={Boolean(errors.otherCharges)}
                  helperText={errors.otherCharges?.message}
                />
              </div>
            </div>
            <div className="flex flex-row w-full gap-[15px] items-center">
              <div className="flex flex-row w-[50%] justify-end items-center">
                <p className="text-[16px] text-dark-800">GST(%)</p>
                <div className="mr-[15px] w-[80px] mx-[15px]">
                  <CustomInput
                    name="gstPercentage"
                    type="number"
                    control={control}
                    error={Boolean(errors.gstPercentage)}
                    helperText={errors.gstPercentage?.message}
                  />
                </div>
                <p className="text-[16px] text-dark-800">:</p>
              </div>
              <div className="flex flex-col w-[50%] items-end">
                <Typography
                  variant="body1"
                  color="inherit"
                  className="text-[16px] font-semibold text-left text-dark-800"
                >
                  {`$ ${orderCalculations.gstAmount}`}
                </Typography>
              </div>
            </div>
            <div className="flex flex-row w-full gap-[15px] mb-[10px]">
              <div className="flex flex-col w-[50%] items-end">
                <Typography
                  variant="body1"
                  color="inherit"
                  className="text-[16px] font-semibold text-left text-dark-800"
                >
                  Net Total
                </Typography>
              </div>
              <div className="flex flex-col w-[50%] items-end">
                <Typography
                  variant="body1"
                  color="inherit"
                  className="text-[16px] font-semibold text-left text-dark-800"
                >
                  {`$ ${orderCalculations.netTotal}`}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItems;
