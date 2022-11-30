/* eslint-disable react-hooks/exhaustive-deps */
import { Typography, Tooltip, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import _ from '@lodash';
import { useSnackbar } from 'app/hooks';
import { useEffect, useState } from 'react';
import useCustomerStore from 'app/store/appstore/customerStore/useCustomerStore';
import useProductStore from 'app/store/appstore/productStore/useProductStore';
import FuseLoading from '@fuse/core/FuseLoading';
import CustomerPhotos from '../../CustomerProfile/Edit/CustomerPhotos';
import CustomerInfo from '../../CustomerProfile/Edit/CustomerInfo';

const ExpertKYC = () => {
  const { userId } = useParams();
  const showSnackbar = useSnackbar();
  const navigate = useNavigate();

  const { userProfile, getUserProfile, userEditForm, updateUserProfile, clearUserEditForm } =
    useCustomerStore();

  const { control, getValues, formState, handleSubmit, watch, setValue, reset } = useForm({
    mode: 'onChange',
    defaultValues: {},
  });
  const { isValid, dirtyFields, errors } = formState;

  // console.log('Watching values', watch());
  const onSubmit = (data) => {
    const payload = {
      onlyKyc: true,
      id: userId,
      kycDetail: data.kycDetail,
    };
    updateUserProfile(payload);
  };

  useEffect(() => {
    if (userEditForm.status == 'loading') {
      showSnackbar('Updating customer profile kyc');
    }
    if (userEditForm.status == 'succeeded') {
      showSnackbar('Customer profile updated successfully', 's');
      navigate(`/customer/expert-kyc`);
    }
    if (userEditForm.status == 'failed') {
      showSnackbar('Failed to update customer profile', 'e');
    }
    return () => {
      if (userEditForm.status == 'succeeded') clearUserEditForm();
    };
  }, [userEditForm.status]);

  const [loading, setLoading] = useState(true);
  const { getProductKycData, kycStatus } = useProductStore();

  useEffect(() => {
    if (!userProfile.data.id || userProfile.data.id != userId) {
      if (userProfile.status === 'idle') {
        getUserProfile({ id: userId });
      }
    }
    if (kycStatus === 'idle') {
      getProductKycData();
    }
    if (userProfile.status === 'succeeded' && kycStatus === 'succeeded' && loading) {
      setLoading(false);
    }
  }, [userProfile, kycStatus]);

  if (loading) return <FuseLoading />;

  return (
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
              Expert KYC
              <Tooltip title="Customer Profile" placement="bottom-start" enterDelay={300}>
                <InfoIcon className="text-primary-blue ml-[1rem] text-[2.5rem]" />
              </Tooltip>
            </Typography>
          </div>
          <div className="flex flex-row gap-[10px]">
            <Button
              component={Link}
              to="customer/customer-list"
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
        <div className="flex flex-row gap-[25px]">
          <CustomerPhotos userId={userId} />
          <CustomerInfo setValue={setValue} />
        </div>
      </div>
    </form>
  );
};

export default ExpertKYC;
