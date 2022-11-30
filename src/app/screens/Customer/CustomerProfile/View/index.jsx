/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar, useCurrentPath } from 'app/hooks';
import FuseLoading from '@fuse/core/FuseLoading';
import useCustomerStore from 'app/store/appstore/customerStore/useCustomerStore';
import ViewCustomer from './ViewCustomer';

const CustomerProfileView = () => {
  const { customerId } = useParams();
  const [loading, setLoading] = useState(true);
  const showSnackbar = useSnackbar();
  const navigate = useNavigate();

  const { userProfile, getUserProfile } = useCustomerStore();

  const currentPath = useCurrentPath(2); // shop/edit-product/1 -> edit-product

  useEffect(() => {
    getUserProfile({ id: customerId });
  }, [customerId]);

  useEffect(() => {
    if (userProfile && userProfile.status === 'succeeded') {
      setLoading(false);
    }
    if (userProfile && userProfile.status === 'failed') {
      showSnackbar("Can't get user profile data");
      navigate('/customer/customer-list');
    }
  }, [userProfile]);

  return (
    <>{loading ? <FuseLoading /> : <ViewCustomer userId={customerId} title="Customer Product" />}</>
  );
};

export default CustomerProfileView;
