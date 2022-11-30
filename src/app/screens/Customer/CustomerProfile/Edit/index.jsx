import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar, useCurrentPath } from 'app/hooks';
import useCustomerStore from 'app/store/appstore/customerStore/useCustomerStore';
import FuseLoading from '@fuse/core/FuseLoading';

import CustomerEditForm from './CustomerEditForm';

const CustomerProfileEdit = () => {
  const { customerId } = useParams();
  const [loading, setLoading] = useState(true);
  const showSnackbar = useSnackbar();
  const navigate = useNavigate();

  const { userProfile, getUserProfile } = useCustomerStore();

  const currentPath = useCurrentPath(4); // shop/edit-product/1 -> edit-product

  useEffect(() => {
    if (userProfile.status == 'failed') {
      showSnackbar("Can't get user profile data");
      navigate('/customer/customer-list');
    }
  }, [navigate, showSnackbar, userProfile.status]);

  useEffect(() => {
    if (currentPath == 'edit' && customerId) {
      if (!userProfile.data.id || userProfile.data.id != customerId) {
        if (userProfile.status === 'idle') {
          getUserProfile({ id: customerId });
        }
      }
      if (userProfile.status === 'succeeded') {
        setLoading(false);
      }
    } else navigate('/customer/customer-list');
  }, [currentPath, customerId, getUserProfile, navigate, userProfile]);

  return <>{loading ? <FuseLoading /> : <CustomerEditForm customerId={customerId} />}</>;
};

export default CustomerProfileEdit;
