/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { DataTable } from 'app/components';
import { useSnackbar } from 'app/hooks';
import useCustomerStore from 'app/store/appstore/customerStore/useCustomerStore';
import CustomerBlackListColumn from './CustomerBlackListColumn';

const CustomerBlackListTable = () => {
  const [loading, setLoading] = useState(true);
  const customerBlackListColumns = useMemo(() => CustomerBlackListColumn, []);
  const [productDataX, setProductData] = useState([]);
  const { getCustomerBlackList, customerBlackList } = useCustomerStore();

  const [data, setData] = useState(customerBlackList.data);
  const [selected, setSelected] = useState([]);

  const showSnackbar = useSnackbar();

  useEffect(() => {
    setLoading(true);
    resetData(0, 10);
  }, []);

  useEffect(() => {
    if (customerBlackList.status === 'succeeded') {
      setLoading(false);
    }
    if (customerBlackList.status === 'failed') {
      setLoading(false);
      showSnackbar('Failed to get home page items', 'e');
    }
  }, [customerBlackList.status]);

  useEffect(() => {
    if (
      customerBlackList.data &&
      customerBlackList.data.rows &&
      customerBlackList.data.rows.length > 0
    ) {
      setData(customerBlackList.data);
    }
  }, [customerBlackList.data]);

  const resetData = (page, limit) => {
    getCustomerBlackList({ page, limit });
  };

  if (loading) return <FuseLoading />;

  return (
    <div className="w-full">
      <DataTable
        columns={customerBlackListColumns}
        data={data.rows && data.rows.length !== 0 ? data.rows : []}
        loading={loading}
        total={data.count || 0}
        resetData={resetData}
        hasCheckbox
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};

export default CustomerBlackListTable;
