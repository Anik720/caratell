/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSnackbar } from 'app/hooks';
import { DraggabbleTable } from 'app/components';
import useHomePageStore from 'app/store/appstore/homePageStore/useHomePageStore';
import api from 'app/APIs/caratell-service/apiService';
import HomeItemsColumn from './HomeItemsColumn';

const HomeItemsTable = () => {
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(true);
  const homeItemColumns = useMemo(() => HomeItemsColumn, []);
  const { getHomePageItems, homePageItems } = useHomePageStore();

  const [data, setData] = useState(homePageItems.data);

  useEffect(() => {
    setLoading(true);
    resetData(0, 10);
  }, []);

  useEffect(() => {
    if (homePageItems.status === 'loading') {
      setLoading(true);
    }
    if (homePageItems.status === 'succeeded') {
      setLoading(false);
    }
    if (homePageItems.status === 'failed') {
      setLoading(false);
      showSnackbar('Failed to get home page items', 'e');
    }
  }, [homePageItems.status]);

  useEffect(() => {
    if (homePageItems.data && homePageItems.data && homePageItems.data.length > 0) {
      setData(homePageItems.data);
    }
  }, [homePageItems.data]);

  const resetData = (page, limit) => {
    getHomePageItems({ page, limit });
  };

  const dragHandler = (draggedObj) => {
    console.log('🚀 ~ file: PolicyTable.jsx ~ line 43 ~ dragHandler ~ draggedObj', draggedObj);
  };

  const deleteBanner = async (bannerIds) => {
    try {
      // if adminIds isn't an array, make it one
      if (!Array.isArray(bannerIds)) {
        bannerIds = [bannerIds];
      }

      bannerIds = bannerIds.map((id) => {
        return {
          id: Number(id),
        };
      });

      const payload = {
        banners: bannerIds,
      };

      await api.deleteBanner(payload);
      showSnackbar('Successfully deleted banner', 's');
      resetData(0, 10);
    } catch (err) {
      showSnackbar('Failed to delete banner', 'e');
    }
  };

  return (
    <div className="w-full">
      {loading ? (
        <FuseLoading />
      ) : (
        // <DataTable
        //   columns={homeItemColumns}
        //   data={data.rows && data.rows.length !== 0 ? data.rows : []}
        //   loading={loading}
        //   total={data.count || 0}
        //   resetData={resetData}
        // />
        <DraggabbleTable
          columns={homeItemColumns}
          data={data && data.length !== 0 ? data : []}
          loading={loading}
          total={data.count || 0}
          resetData={resetData}
          dragHandler={dragHandler}
          deleteBanner={deleteBanner}
        />
      )}
    </div>
  );
};

export default HomeItemsTable;
