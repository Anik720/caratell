/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { DataTable } from 'app/components';
import { useSnackbar } from 'app/hooks';
import useProductMapStore from 'app/store/appstore/productMapStore/useProductMapStore';
import ProductMapColumns from './ProductMapColumns';

const ProductTabls = () => {
  const [loading, setLoading] = useState(true);
  const productMapColumns = useMemo(() => ProductMapColumns, []);
  const [productDataX, setProductData] = useState([]);
  const { productFilters, tableDataStatus, productMapData, getProductsMap } = useProductMapStore();

  const [data, setData] = useState(productMapData);
  const [selected, setSelected] = useState([]);
  const showSnackbar = useSnackbar();

  useEffect(() => {
    setLoading(true);
    resetData(0, 10);
  }, []);

  useEffect(() => {
    if (tableDataStatus === 'succeeded') {
      setLoading(false);
    }
    if (tableDataStatus === 'failed') {
      setLoading(false);
      showSnackbar('Failed to get product list', 'e');
    }
  }, [tableDataStatus]);

  useEffect(() => {
    if (productMapData && productMapData.length > 0) {
      setData(productMapData);
    }
  }, [productMapData, productFilters]);

  const resetData = (page, limit) => {
    getProductsMap({ page, limit });
  };

  return (
    <div className="w-full">
      {data.length === 0 ? (
        <FuseLoading />
      ) : (
        <DataTable
          columns={productMapColumns}
          data={data.length !== 0 ? data : []}
          loading={loading}
          total={data.length}
          resetData={resetData}
          hasCheckbox
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </div>
  );
};

export default ProductTabls;
