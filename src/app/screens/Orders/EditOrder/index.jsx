import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from 'app/APIs/caratell-service/apiService';
import FuseLoading from '@fuse/core/FuseLoading';
import EditOrderForm from './EditOrderForm';

const EditOrder = () => {
  const { id } = useParams();

  const [orderReponse, setOrderReponse] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const response = await api.getOrderDetails(id);
      if (response) {
        setOrderReponse(response);
      }
      setLoading(false);
    };
    fetchOrderDetails();
  }, [id]);

  if (loading) return <FuseLoading />;

  return (
    <>
      {orderReponse && orderReponse.id ? (
        <EditOrderForm orderReponse={orderReponse} />
      ) : (
        <div className="flex w-full h-[100vh] items-center justify-center">
          <h1>No Order Found</h1>
        </div>
      )}
    </>
  );
};

export default EditOrder;
