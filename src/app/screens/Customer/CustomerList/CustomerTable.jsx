/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSnackbar } from 'app/hooks';
import { useDispatch } from 'react-redux';
import { DataTable } from 'app/components';
import { setCustomerIds } from 'app/store/appstore/customerStore/customersSlice';
import useCustomerStore from 'app/store/appstore/customerStore/useCustomerStore';
import CustomerColumn from './CustomerColumn';

const CustomerTable = () => {
  const [loading, setLoading] = useState(true);
  const customerColumns = useMemo(() => CustomerColumn, []);
  const { getCustomers, customerData, customerFilters, tableDataStatus } = useCustomerStore();
  const [data, setData] = useState(customerData);
  const [selected, setSelected] = useState([]);

  const showSnackbar = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    resetData(0, 10);
  }, []);

  useEffect(() => {
    dispatch(setCustomerIds(selected));
  }, [selected]);

  useEffect(() => {
    if (tableDataStatus === 'loading') setLoading(true);
    if (tableDataStatus === 'succeeded') {
      setLoading(false);
    }
    if (tableDataStatus === 'failed') {
      setLoading(false);
      showSnackbar('Failed to get product list', 'e');
    }
  }, [tableDataStatus]);

  useEffect(() => {
    if (customerData && customerData.rows) {
      setData(customerData);
    }
  }, [customerData, customerFilters]);

  const resetData = (page, limit) => {
    getCustomers({ page, limit });
  };

  return (
    <div className="w-full">
      {loading === true ? (
        <FuseLoading />
      ) : (
        <DataTable
          columns={customerColumns}
          data={data.rows && data.rows.length !== 0 ? data.rows : []}
          loading={loading}
          total={data.count || 0}
          resetData={resetData}
          hasCheckbox
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </div>
  );
};

export default CustomerTable;
