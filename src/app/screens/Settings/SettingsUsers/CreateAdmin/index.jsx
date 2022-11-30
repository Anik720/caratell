/* eslint-disable unused-imports/no-unused-imports */
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import api from 'app/APIs/caratell-service/apiService';
import AdminForm from './AdminForm';

const CreateAdmin = () => {
  const { adminId } = useParams();
  const [loading, setLoading] = useState(true);
  const [adminDetails, setAdminDetails] = useState({});

  useEffect(() => {
    if (adminId) {
      const fetchAdminDetails = async () => {
        const data = await api.getAdminById(adminId);
        setAdminDetails(data);
        setLoading(false);
      };
      fetchAdminDetails();
    } else setLoading(false);
  }, [adminId]);

  if (loading) return <FuseLoading />;

  return (
    <div>
      <AdminForm adminDetails={adminDetails} />
    </div>
  );
};

export default CreateAdmin;
