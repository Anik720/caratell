/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSnackbar } from 'app/hooks';
import { DraggabbleTable } from 'app/components';
import useProductStore from 'app/store/appstore/productStore/useProductStore';
import PolicyColumns from './PolicyColumns';

const PolicyTable = () => {
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(true);
  const policyColumns = useMemo(() => PolicyColumns, []);
  const { getAllPolicy, policies } = useProductStore();

  const [data, setData] = useState(policies.data);

  useEffect(() => {
    setLoading(true);
    resetData(0, 10);
  }, []);

  useEffect(() => {
    if (policies.status === 'succeeded') {
      setLoading(false);
    }
    if (policies.status === 'failed') {
      setLoading(false);
      showSnackbar('Failed to get home page items', 'e');
    }
  }, [policies.status]);

  useEffect(() => {
    if (policies.data && policies.data.length > 0) {
      setData(policies.data);
    }
  }, [policies.data]);

  const resetData = (page, limit) => {
    getAllPolicy({ page, limit });
  };

  const dragHandler = (draggedObj) => {
    console.log('🚀 ~ file: PolicyTable.jsx ~ line 43 ~ dragHandler ~ draggedObj', draggedObj);
  };

  return (
    <div className="w-full">
      {loading ? (
        <FuseLoading />
      ) : (
        <DraggabbleTable
          columns={policyColumns}
          data={data && data.length !== 0 ? data : []}
          loading={loading}
          total={data.count || 0}
          resetData={resetData}
          dragHandler={dragHandler}
        />
      )}
    </div>
  );
};

export default PolicyTable;
