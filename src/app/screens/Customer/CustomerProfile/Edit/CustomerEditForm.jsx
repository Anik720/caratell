import { useEffect, useState } from 'react';
import * as yup from 'yup';
import _ from '@lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Typography, Tooltip, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import useProductStore from 'app/store/appstore/productStore/useProductStore';
import useCustomerStore from 'app/store/appstore/customerStore/useCustomerStore';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSnackbar } from 'app/hooks';
import { valueLabelToString, formatDate } from 'app/utils';
import { useNavigate, Link } from 'react-router-dom';
import ServerError from 'app/components/ServerError';
import CustomerEditFormFields from './CustomerEditFormFields';
import { getCountryByCode } from './countryList';

/**
 * Form Validation Schema
 */
const schema = yup.object({
  first_name: yup
    .string()
    .required('Product Name is required')
    .min(3, 'Product Name must be at least 2 characters')
    .max(50, 'Product Name must be less than 50 characters'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  phone_number: yup
    .string()
    .required('Phone Number is required')
    .min(7, 'Phone Number must be at least 7 characters')
    .max(15, 'Phone Number must be less than 15 characters'),
  birthDay: yup.string().required('Birthday is required'),
  nric: yup.string().required('NRIC is required'),
  country: yup
    .object({
      value: yup.string(),
      label: yup.string(),
    })
    .required(),
  nationality: yup.string().required('Nationality is required'),
  occupation: yup.string().required('Occupation is required'),
  kycDetail: yup
    .object({
      faces: yup.array().of(yup.object().required()).required(),
      fingers: yup.array().of(yup.object().required()).required(),
      skins: yup.array().of(yup.object().required()).required(),
      ears: yup.array().of(yup.object().required()).required(),
      necklines: yup.array().of(yup.object().required()).required(),
    })
    .required(),
});

const CustomerEditForm = ({ customerId }) => {
  const showSnackbar = useSnackbar();
  const { getProductKycData, kycStatus } = useProductStore();
  const { userProfile, updateUserProfile, clearUserEditForm, userEditForm } = useCustomerStore();

  const customerDetails = userProfile.data;

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (kycStatus === 'idle') {
      getProductKycData();
    } else if (kycStatus === 'succeeded') {
      setLoading(false);
    } else if (kycStatus === 'failed') {
      setLoading(false);
      showSnackbar('KYC data failed to load');
    }
  }, [kycStatus, getProductKycData, showSnackbar]);

  useEffect(() => {
    if (userEditForm.status == 'loading') {
      showSnackbar('Updating customer profile');
    }
    if (userEditForm.status == 'succeeded') {
      showSnackbar('Customer profile updated successfully', 's');
      navigate(`/customer/profile/${customerId}/view`);
    }
    if (userEditForm.status == 'failed') {
      showSnackbar('Failed to update customer profile', 'e');
    }
    return () => {
      if (userEditForm.status == 'succeeded') clearUserEditForm();
    };
  }, [navigate, showSnackbar, userEditForm.status, customerId, clearUserEditForm]);

  const { control, getValues, formState, handleSubmit, watch, setValue, reset } = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({
      first_name: customerDetails?.first_name || '',
      email: customerDetails?.email || '',
      phone_number: customerDetails?.phone_number || '',
      birthDay: formatDate(customerDetails?.birthDay || ''),
      nric: customerDetails?.nric || '',
      occupation: customerDetails?.occupation || '',
      country: getCountryByCode(customerDetails?.country || ''),
      nationality: customerDetails?.nationality || '',
      address: customerDetails?.address || '',
      kycDetail: {},
    });
  }, [customerDetails, reset]);

  // console.log('Watching form fields', watch());
  // console.log('Watching form fields productTags', watch('kycDetail'));

  const { isValid, dirtyFields, errors } = formState;

  // console.log('Dirty fields', dirtyFields);
  // console.log('Errors', errors);
  // console.log('isValid', isValid);

  const onSubmit = (data) => {
    const payload = {
      id: customerId,
      first_name: data.first_name,
      email: data.email,
      phone_number: data.phone_number,
      birthDay: data.birthDay,
      nric: data.nric,
      occupation: data.occupation,
      country: valueLabelToString(data.country),
      address: data.address,
      nationality: data.nationality,
      kycDetail: data.kycDetail,
    };
    updateUserProfile(payload);
  };

  if (kycStatus === 'failed')
    return (
      <div className="flex w-full h-[100vh] justify-center items-center">
        <ServerError />
      </div>
    );

  return (
    <>
      {loading ? (
        <FuseLoading />
      ) : (
        <form
          name="addProductForm"
          noValidate
          className="flex flex-col justify-center w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col flex-1 p-[30px] gap-[20px] bg-grey-50">
            <section className="flex flex-row justify-between">
              <div>
                <Typography variant="h4" color="inherit" className="font-medium mb-16">
                  Customer Profile
                  <Tooltip title="Customer Profile" placement="bottom-start" enterDelay={300}>
                    <InfoIcon className="text-primary-blue ml-[1rem] text-[2.5rem]" />
                  </Tooltip>
                </Typography>
              </div>
              <div className="flex flex-row gap-[10px]">
                <Button
                  component={Link}
                  to={`/customer/profile/${customerId}/view`}
                  className="rounded-none h-[40px] ml-[5px] bg-black-300 hover:bg-primary-blue"
                  variant="contained"
                  aria-label="Cancel"
                >
                  Cancel
                </Button>
                <Button
                  className="rounded-none h-[40px] ml-[5px] bg-primary-blue hover:bg-primary-blue"
                  variant="contained"
                  aria-label="CREATE"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </section>
            <CustomerEditFormFields
              userId={customerId}
              formProps={{
                getValues,
                setValue,
                control,
                formState,
                errors,
              }}
            />
          </div>
        </form>
      )}
    </>
  );
};

export default CustomerEditForm;
