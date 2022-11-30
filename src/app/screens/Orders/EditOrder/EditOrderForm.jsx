/* eslint-disable unused-imports/no-unused-imports */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import * as yup from 'yup';
import _ from '@lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { CustomAccordion } from 'app/components';
import { valueLabelToString, stringToValueLabel } from 'app/utils';
import { useSnackbarV2 } from 'app/hooks';
import api from 'app/APIs/caratell-service/apiService';
import { calculatedTotalGst, singleItemTotal } from './order_utils';
import MoreActions from './MoreActions';
import OrderHeader from './OrderHeader';
import BillTo from './BillTo';
import ShipTo from './ShipTo';
import OrderItems from './OrderItems';

/**
 * Form Validation Schema
 */
const schema = yup.object({
  invoiceNumber: yup.string().required('Invoice Number is required'),
  orderDate: yup.string().required('Order Date is required'),
  dueDate: yup.string().required('Due Date is required'),
  collectionMode: yup.object().required('Collection Mode is required'),
  billDetails: yup.object({
    billToName: yup.string().required('Bill To Name is required'),
    billToPhone: yup.string().required('Bill To Phone is required'),
    billToEmail: yup.string().required('Bill To Email is required'),
    billToPostal: yup.string().required('Bill To Postal is required'),
    billToUnit: yup.string().required('Bill To Unit is required'),
    billToDetail: yup.string().required('Bill To Detail is required'),
  }),
  shipDetails: yup.object({
    shipToName: yup.string().required('Ship To Name is required'),
    shipToPhone: yup.string().required('Ship To Phone is required'),
    shipToPostal: yup.string().required('Ship To Postal is required'),
    shipToUnit: yup.string().required('Ship To Unit is required'),
    shipToDetail: yup.string().required('Ship To Detail is required'),
  }),
  orderItems: yup.array().of(
    yup.object({
      itemId: yup.string(),
      itemName: yup.object().required('Item Name is required'),
      itemDescription: yup.string(),
      itemQuantity: yup
        .number()
        .typeError('Shound be a number')
        .required('Item Quantity is required'),
      itemUnitPrice: yup
        .number()
        .typeError('Shound be a number')
        .required('Item Unit Price is required'),
      itemDiscount: yup.number().typeError('Shound be a number'),
    })
  ),
  notesForCustomer: yup.string(),
  deliveryCharge: yup.number().typeError('Shound be a number'),
  otherCharges: yup.number().typeError('Shound be a number'),
  gstPercentage: yup.number().typeError('Shound be a number'),
  gstAmount: yup.number().typeError('Shound be a number'),
  netTotal: yup.number().typeError('Shound be a number'),
});

const EditOrderForm = ({ orderReponse }) => {
  const [orderDetails, setOrderDetails] = useState(orderReponse);
  const [moreActionsPoper, setmoreActionsPoper] = useState(null);

  const moreActionsPoperClick = (event) => {
    setmoreActionsPoper(event.currentTarget);
  };

  const moreActionsPoperClose = () => {
    setmoreActionsPoper(null);
  };

  // func to convert '2022-02-05T18:00:00.000Z' to '2022-02-05'
  const convertDate = (date) => {
    if (!date) return '';
    return date.split('T')[0];
  };

  const showSnackbar = useSnackbarV2();

  const defaultValues = {
    invoiceNumber: 'INV00145',
    orderDate: convertDate(orderDetails.order_date || ''),
    dueDate: convertDate(orderDetails.due_date || ''),
    collectionMode: stringToValueLabel(orderDetails.collection_mode || ''),
    billDetails: {
      billToName: orderDetails.billing_user_name || '',
      billToPhone: orderDetails.billing_phone_number || '',
      billToEmail: orderDetails.billing_email || '',
      billToPostal: orderDetails.shipping_post_code || '',
      billToUnit: orderDetails.billing_unit_number || '',
      billToDetail: orderDetails.billing_address || '',
    },
    shipDetails: {
      shipToName: orderDetails.shipping_user_name || '',
      shipToPhone: orderDetails.shipping_phone_number || '',
      shipToPostal: orderDetails.shipping_post_code || '',
      shipToUnit: orderDetails.shipping_unit_number || '',
      shipToDetail: orderDetails.shipping_address || '',
    },
    orderItems:
      orderDetails.products &&
      orderDetails.products.map((item) => ({
        ...item,
        itemName: {
          value: item.id,
          label: item.name,
        },
        itemDescription: item.description,
        itemQuantity: item.orderProducts?.qty || 0,
        itemUnitPrice: item.orderProducts?.unit_price || 0,
        itemDiscount: item.orderProducts?.discount || 0,
      })),
    notesForCustomer: 'Notes for customer',
    deliveryCharge: Number(orderDetails.delivery_charge) || 0,
    otherCharges: Number(orderDetails.other_charges) || 0,
    subTotal: Number(orderDetails.sub_total) || 0,
    gstPercentage: Number(orderDetails.gst) || 0,
    gstAmount: calculatedTotalGst(
      orderDetails.gst,
      orderDetails.sub_total,
      orderDetails.delivery_charge,
      orderDetails.other_charges
    ),
    netTotal: Number(orderDetails.net_total) || 0,
  };

  const { control, getValues, register, formState, handleSubmit, watch, setValue, reset } = useForm(
    {
      mode: 'onChange',
      defaultValues,
      resolver: yupResolver(schema),
    }
  );

  const orderItemsState = useWatch({
    control,
    name: 'orderItems',
  });

  const priceCalculationState = useWatch({
    control,
    name: ['deliveryCharge', 'otherCharges', 'gstPercentage'],
  });

  // console.log('🚀  watch', watch());

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = async (data) => {
    try {
      console.log('🚀  onSubmit', data.orderItems);
      const payload = {
        userId: orderDetails.userId,
        order_id: orderDetails.order_id,
        order_date: data.orderDate,
        due_date: data.dueDate,
        collection_mode: data.collectionMode.value,
        billing_user_name: data.billDetails.billToName,
        billing_phone_number: data.billDetails.billToPhone,
        billing_email: data.billDetails.billToEmail,
        billing_post_code: data.billDetails.billToPostal,
        billing_unit_number: data.billDetails.billToUnit,
        billing_address: data.billDetails.billToDetail,
        shipping_user_name: data.shipDetails.shipToName,
        shipping_phone_number: data.shipDetails.shipToPhone,
        shipping_post_code: data.shipDetails.shipToPostal,
        shipping_unit_number: data.shipDetails.shipToUnit,
        shipping_address: data.shipDetails.shipToDetail,
        products: data.orderItems.map((item) => ({
          ...item,
          id: item.itemName.value || item.id,
          product_id: item.itemName.value,
          name: item.itemName.label,
          description: item.itemDescription,
          qty: item.itemQuantity,
          discount: item.itemDiscount,
          unit_price: item.itemUnitPrice,
          sub_total: singleItemTotal(item.itemUnitPrice, item.itemQuantity, item.itemDiscount),
        })),
        notes_for_customer: data.notesForCustomer,
        delivery_charge: data.deliveryCharge,
        other_charges: data.otherCharges,
        sub_total: data.subTotal,
        gst: data.gstPercentage,
        net_total: data.netTotal,
      };
      // console.log('Payload: ', payload);
      showSnackbar.showMessage('Updating Order...');
      const res = await api.updateOrder(payload, orderDetails.id);
      showSnackbar.showMessage('Order Updated Successfully', 's');
      // showSnackbar.hideMessage();
      setOrderDetails(res);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log('Watching values, ', watch('orderItems'));

  return (
    <div className="flex flex-col flex-1 p-[30px]">
      <div className="flex flex-col gap-[25px] max-w-[100%]">
        <div className="flex flex-row justify-between">
          <div>
            <Typography variant="h4" color="inherit" className="font-medium mb-16">
              Sales Order
              <Tooltip title="Orders" placement="bottom-start" enterDelay={300}>
                <InfoIcon className="text-primary-blue ml-[1rem] text-[2.5rem]" />
              </Tooltip>
            </Typography>
          </div>

          <div className="flex flex-row">
            <div>
              <Button
                component={Link}
                to="/orders"
                className="rounded-none h-[40px] ml-[5px] bg-black-300 hover:bg-primary-blue"
                variant="contained"
              >
                Back
              </Button>
            </div>
            <div>
              <Button
                className="rounded-none h-[40px] ml-[5px] bg-black-300 hover:bg-primary-blue"
                variant="contained"
                onClick={moreActionsPoperClick}
              >
                More Actions
              </Button>
              <MoreActions
                moreActionsPoper={moreActionsPoper}
                moreActionsPoperClose={moreActionsPoperClose}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <CustomAccordion title="Admin Notes" index={1} align="left">
            <div className="">
              <Typography>Customer is regular</Typography>
            </div>
          </CustomAccordion>
        </div>
        <div className="flex flex-col w-full">
          <form
            name="addProductForm"
            noValidate
            className="flex flex-col justify-center w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <OrderHeader
              getValues={getValues}
              setValue={setValue}
              control={control}
              errors={errors}
              register={register}
            />
            <div className="flex flex-col w-full mt-[25px] bg-white rounded-2">
              <div className="flex flex-row p-[24px] justify-between">
                <BillTo
                  getValues={getValues}
                  setValue={setValue}
                  control={control}
                  errors={errors}
                  register={register}
                />
                <ShipTo
                  getValues={getValues}
                  setValue={setValue}
                  control={control}
                  errors={errors}
                  register={register}
                />
              </div>
              <OrderItems
                getValues={getValues}
                setValue={setValue}
                control={control}
                errors={errors}
                register={register}
                orderItemsState={orderItemsState}
                priceCalculationState={priceCalculationState}
              />
              <div>
                <Button
                  className="rounded-none h-[40px] ml-[5px] bg-primary-blue hover:bg-primary-blue"
                  variant="contained"
                  aria-label="CREATE"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                  type="submit"
                >
                  Edit & Save
                </Button>
              </div>
              <div className="flex flex-col items-center m-[25px] py-[10px] border-1 border-grey-300">
                <p>Thank you for your support</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditOrderForm;
