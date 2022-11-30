/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar, useCurrentPath } from 'app/hooks';
import useProductStore from 'app/store/appstore/productStore/useProductStore';
import FuseLoading from '@fuse/core/FuseLoading';

import ProductAddForm from './ProductAddForm';

const ShopAddProduct = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const showSnackbar = useSnackbar();
  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState({});

  const { singleProduct, getSingleProduct } = useProductStore();

  const currentPath = useCurrentPath(2); // shop/edit-product/1 -> edit-product

  useEffect(() => {
    if (currentPath == 'edit-product' && productId) {
      if (singleProduct.status == 'failed') {
        showSnackbar('Failed to get product', 'e');
        navigate('/shop/product-list');
        return;
      }
      if (singleProduct.status == 'succeeded' || singleProduct.data.id === productId) {
        setProductDetails(singleProduct.data);
        setLoading(false);
      }
      if (
        !singleProduct.data ||
        singleProduct.data.id != productId ||
        singleProduct.status == 'idle'
      )
        getSingleProduct({ productId });
    }
  }, [singleProduct]);

  return (
    <>
      {currentPath == 'edit-product' && productId ? (
        <>
          {loading ? (
            <FuseLoading />
          ) : (
            <ProductAddForm
              title="Edit Product"
              productId={productId || null}
              productDetails={productDetails}
            />
          )}
        </>
      ) : (
        <ProductAddForm title="Create Product" />
      )}
    </>
  );
};

export default ShopAddProduct;
