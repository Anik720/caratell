/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSnackbar } from 'app/hooks';
import { DataTable } from 'app/components';
import useSettingsStore from 'app/store/appstore/settingStore/useSettingsStore';
import api from 'app/APIs/caratell-service/apiService';
import AdminColumns from './AdminColumns';

const AdminTable = (props) => {
  const { selected, setSelected } = props;
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(true);
  const adminColumns = useMemo(() => AdminColumns, []);
  const { getAdminItems, adminItems } = useSettingsStore();

  const [data, setData] = useState(adminItems.data);

  useEffect(() => {
    setLoading(true);
    resetData(0, 10);
  }, []);

  useEffect(() => {
    if (adminItems.status === 'succeeded') {
      setLoading(false);
    }
    if (adminItems.status === 'failed') {
      setLoading(false);
      showSnackbar('Failed to get blog items', 'e');
    }
  }, [adminItems.status]);

  useEffect(() => {
    if (adminItems.data && adminItems.data.rows && adminItems.data.rows.length > 0) {
      setData(adminItems.data);
    }
  }, [adminItems.data]);

  const resetData = (page, limit) => {
    getAdminItems({ page, limit });
  };

  const deleteAdmins = async (adminIds) => {
    try {
      // if adminIds isn't an array, make it one
      if (!Array.isArray(adminIds)) {
        adminIds = [adminIds];
      }
      const payload = {
        ids: adminIds,
      };
      await api.deleteAdmins(payload);
      showSnackbar('Successfully deleted admins', 's');
      resetData(0, 10);
    } catch (err) {
      showSnackbar('Failed to delete admins', 'e');
    }
  };

  return (
    <div className="w-full">
      {loading === true ? (
        <FuseLoading />
      ) : (
        <DataTable
          columns={adminColumns}
          data={data.rows && data.rows.length !== 0 ? data.rows : []}
          loading={loading}
          total={data.count || 0}
          resetData={resetData}
          hasCheckbox
          selected={selected}
          setSelected={setSelected}
          deleteAdmins={deleteAdmins}
        />
      )}
    </div>
  );
};

export default AdminTable;
