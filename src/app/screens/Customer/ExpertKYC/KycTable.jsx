/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSnackbar } from 'app/hooks';
import { DataTable } from 'app/components';
import useCustomerStore from 'app/store/appstore/customerStore/useCustomerStore';
import KycColumn from './KycColumn';

const KycTable = (props) => {
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(true);
  const kycColumns = useMemo(() => KycColumn, []);
  const { getExpertKycCustomers, requestedCustomers } = useCustomerStore();

  const [data, setData] = useState(requestedCustomers);

  useEffect(() => {
    setLoading(true);
    resetData(0, 10);
  }, []);

  useEffect(() => {
    if (requestedCustomers.status === 'loading') setLoading(true);
    if (requestedCustomers.status === 'succeeded') {
      setLoading(false);
    }
    if (requestedCustomers.status === 'failed') {
      setLoading(false);
      showSnackbar('Failed to get blog items', 'e');
    }
  }, [requestedCustomers.status]);

  useEffect(() => {
    if (requestedCustomers.data) {
      setData(requestedCustomers.data);
    }
  }, [requestedCustomers.data]);

  const resetData = (page, limit) => {
    getExpertKycCustomers({ page, limit });
  };

  return (
    <div className="w-full">
      {loading === true ? (
        <FuseLoading />
      ) : (
        <DataTable
          columns={kycColumns}
          data={data.rows && data.rows.length !== 0 ? data.rows : []}
          loading={loading}
          total={data.count || 0}
          resetData={resetData}
          hasCheckbox
          selected={props.selected}
          setSelected={props.setSelected}
        />
      )}
    </div>
  );
};

export default KycTable;
