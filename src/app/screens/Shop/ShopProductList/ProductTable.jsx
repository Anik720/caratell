/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { DataTable } from 'app/components';
import { useSnackbar } from 'app/hooks';
import api from 'app/APIs/caratell-service/apiService';
import useProductStore from 'app/store/appstore/productStore/useProductStore';
import { setSelectedProductIds } from 'app/store/appstore/productStore/productsSlice';
import { useDispatch } from 'react-redux';
import ProductColumns from './ProductColumns';

const ProductTabls = () => {
  const showSnackbar = useSnackbar();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const productColumns = useMemo(() => ProductColumns, []);
  const { productFilters, tableDataStatus, productData, getProducts } = useProductStore();

  const [data, setData] = useState(productData);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setLoading(true);
    resetData(0, 10);
  }, []);

  useEffect(() => {
    dispatch(setSelectedProductIds(selected));
  }, [selected]);

  useEffect(() => {
    if (tableDataStatus === 'loading') {
      setLoading(true);
    }
    if (tableDataStatus === 'succeeded') {
      setLoading(false);
    }
    if (tableDataStatus === 'failed') {
      setLoading(false);
      showSnackbar('Failed to get product list', 'e');
    }
  }, [tableDataStatus]);

  useEffect(() => {
    if (productData && productData.rows) {
      setData(productData);
    }
  }, [productData, productFilters]);

  const resetData = (page, limit) => {
    getProducts({ page, limit });
  };

  const deleteProducts = async (productIds) => {
    try {
      // if adminIds isn't an array, make it one
      if (!Array.isArray(productIds)) {
        productIds = [productIds];
      }
      productIds = productIds.map((id) => Number(id));
      const payload = {
        productIds,
      };
      await api.deleteProducts(payload);
      showSnackbar('Product deleted successfully', 's');
      resetData(0, 10);
    } catch (err) {
      showSnackbar('Failed to delete product', 'e');
    }
  };

  return (
    <div className="w-full">
      {loading ? (
        <FuseLoading />
      ) : (
        <DataTable
          columns={productColumns}
          data={data.rows && data.rows.length !== 0 ? data.rows : []}
          loading={loading}
          total={data.count || 0}
          resetData={resetData}
          hasCheckbox
          selected={selected}
          setSelected={setSelected}
          deleteProducts={deleteProducts}
        />
      )}
    </div>
  );
};

export default ProductTabls;
