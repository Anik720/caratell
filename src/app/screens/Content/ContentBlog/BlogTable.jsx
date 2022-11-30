/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSnackbar } from 'app/hooks';
import { DataTable } from 'app/components';
import useBlogStore from 'app/store/appstore/blogStore/useBlogStore';
import api from 'app/APIs/caratell-service/apiService';
import BlogColumns from './BlogColumns';

const BlogTable = () => {
  const showSnackbar = useSnackbar();
  const [loading, setLoading] = useState(true);
  const blogColumns = useMemo(() => BlogColumns, []);
  const { getBlogItems, blogItems } = useBlogStore();

  const [data, setData] = useState(blogItems.data);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setLoading(true);
    resetData(0, 10);
  }, []);

  useEffect(() => {
    if (blogItems.status === 'succeeded') {
      setLoading(false);
    }
    if (blogItems.status === 'failed') {
      setLoading(false);
      showSnackbar('Failed to get blog items', 'e');
    }
  }, [blogItems.status]);

  useEffect(() => {
    if (blogItems.data && blogItems.data.rows && blogItems.data.rows.length >= 0) {
      setData(blogItems.data);
    }
  }, [blogItems.data]);

  const resetData = (page, limit) => {
    getBlogItems({ page, limit });
  };

  const deleteBlog = async (blogIds) => {
    try {
      // if adminIds isn't an array, make it one
      if (!Array.isArray(blogIds)) {
        blogIds = [blogIds];
      }

      blogIds = blogIds.map((id) => {
        return {
          id: Number(id),
        };
      });

      const payload = {
        blogs: blogIds,
      };

      await api.deleteBlog(payload);
      showSnackbar('Successfully deleted blog', 's');
      resetData(0, 10);
    } catch (err) {
      showSnackbar('Failed to delete blog', 'e');
    }
  };

  return (
    <div className="w-full">
      {loading === true ? (
        <FuseLoading />
      ) : (
        <DataTable
          columns={blogColumns}
          data={data.rows && data.rows.length !== 0 ? data.rows : []}
          loading={loading}
          total={data.count || 0}
          resetData={resetData}
          hasCheckbox
          selected={selected}
          setSelected={setSelected}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  );
};

export default BlogTable;
