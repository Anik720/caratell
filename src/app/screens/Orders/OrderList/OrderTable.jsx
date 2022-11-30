/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSnackbar } from 'app/hooks';
import { useDispatch } from 'react-redux';
import { setSelectedIds } from 'app/store/appstore/orderStore/orderSlice';
import { DataTable } from 'app/components';
import useOrderStore from 'app/store/appstore/orderStore/useOrderStore';
import OrderColumns from './OrderColumns';

const OrderTable = () => {
  const showSnackbar = useSnackbar();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const orderColumns = useMemo(() => OrderColumns, []);
  const { getOrderItems, orderItems } = useOrderStore();

  const [data, setData] = useState({
    rows: [],
    count: 0,
  });
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setLoading(true);
    resetData(0, 10);
  }, []);

  useEffect(() => {
    if (orderItems.status === 'loading') setLoading(true);
  }, [orderItems.status]);

  useEffect(() => {
    dispatch(setSelectedIds(selected));
  }, [selected]);

  useEffect(() => {
    if (orderItems.status === 'succeeded') {
      setLoading(false);
    }
    if (orderItems.status === 'failed') {
      setLoading(false);
      showSnackbar('Failed to get blog items', 'e');
    }
  }, [orderItems.status]);

  useEffect(() => {
    if (orderItems.data && orderItems.data.rows) {
      setData(orderItems.data);
    }
  }, [orderItems.status, orderItems.data]);

  const resetData = (page, limit) => {
    getOrderItems({ page, limit });
  };

  const navigate = useNavigate();

  return (
    <div className="w-full">
      {loading === true ? (
        <FuseLoading />
      ) : (
        <DataTable
          columns={orderColumns}
          data={data.rows && data.rows.length !== 0 ? data.rows : []}
          loading={loading}
          total={data.count || 0}
          resetData={resetData}
          hasCheckbox
          selected={selected}
          setSelected={setSelected}
          rowClickFunction={(row) => {
            navigate(`/orders/edit/${row.id}`);
          }}
        />
      )}
    </div>
  );
};

export default OrderTable;
