/* eslint-disable unused-imports/no-unused-imports */
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import _ from '@lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Typography, Tooltip, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import useProductStore from 'app/store/appstore/productStore/useProductStore';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSnackbar } from 'app/hooks';
import { valueLabelToString, stringToValueLabel, filterArrayOfObjectsByKeys } from 'app/utils';
import { useNavigate } from 'react-router-dom';
import { ServerError } from 'app/components';
import {
  productFilterOptions,
  productChoiceOptions,
  productCategoryOptions,
  productTagsOptions,
  kycTagsOptions,
} from 'app/static-data/products';
import pageData from './addProductData';
import ProductUpload from './ProductUpload';
import ProductPolicy from './ProductPolicy';
import ProductInformation from './ProductInformation';
import KycDetails from './KycDetails';
import ProductFilter from './ProductFilter';

/**
 * Form Validation Schema
 */
const schema = yup.object({
  name: yup
    .string()
    .required('Product Name is required')
    .min(3, 'Product Name must be at least 2 characters')
    .max(50, 'Product Name must be less than 50 characters'),
  sku: yup
    .string()
    .min(5, 'Product SKU must be at least 5 characters')
    .max(20, 'Product SKU must be less than 20 characters')
    .required('Product SKU is required'),
  description: yup
    .string()
    .required('Product Description is required')
    .min(5, 'Product Description must be at least 5 characters')
    .max(500, 'Product Description must be less than 500 characters'),
  price: yup
    .number()
    .required('Product Price is required')
    .min(0.01, 'Product Price must be at least 0.01'),
  quantity: yup
    .number()
    .required('Product Quantity is required')
    .min(1, 'Product Quantity must be at least 1'),
  kycTags: yup.array().of(
    yup.object({
      value: yup.string(),
      label: yup.string(),
    })
  ),
  productType: yup
    .object({
      value: yup.string(),
      label: yup.string(),
    })
    .required(),
  productChoice: yup
    .object({
      value: yup.string(),
      label: yup.string(),
    })
    .required(),
  productCategory: yup
    .object({
      value: yup.string(),
      label: yup.string(),
    })
    .required(),
  productTags: yup.array().of(
    yup
      .object({
        value: yup.string(),
        label: yup.string(),
      })
      .required()
  ),
  policies: yup.array().required(),
  kycDetail: yup
    .object({
      profiles: yup.array().of(yup.object().required()).required(),
      faces: yup.array().of(yup.object().required()).required(),
      fingers: yup.array().of(yup.object().required()).required(),
      skins: yup.array().of(yup.object().required()).required(),
      ears: yup.array().of(yup.object().required()).required(),
      necklines: yup.array().of(yup.object().required()).required(),
    })
    .required(),
  images: yup.array().required(),
});

const ProductAddForm = ({ title, productDetails }) => {
  const showSnackbar = useSnackbar();
  const {
    addProduct,
    getProductKycData,
    kycData,
    kycStatus,
    kycError,
    formStatus,
    singleProduct,
    getSingleProduct,
    setFormStatus,
    updateProductWithKyc,
    productUpdate,
  } = useProductStore();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (kycStatus === 'idle') {
      getProductKycData();
    }
    if (kycStatus === 'succeeded') {
      setLoading(false);
    }
  }, [kycStatus, getProductKycData, showSnackbar]);

  useEffect(() => {
    if (formStatus == 'loading') {
      showSnackbar('Adding Product');
    }
    if (formStatus == 'succeeded') {
      showSnackbar('Product Added Successfully', 's');
      navigate('/shop/product-list');
    }
    if (formStatus == 'failed') {
      showSnackbar('Failed to add product', 'e');
    }
    return () => {
      if (formStatus == 'succeeded' || formStatus == 'failed') {
        setFormStatus('idle');
      }
    };
  }, [formStatus, navigate, showSnackbar, setFormStatus]);

  useEffect(() => {
    if (productUpdate.status == 'succeeded') {
      showSnackbar('Product Updated Successfully', 's');
      navigate('/shop/product-list');
    } else if (productUpdate.status == 'failed') {
      showSnackbar('Failed to update product', 'e');
    }
    return () => {
      if (productUpdate.status == 'succeeded' || productUpdate.status == 'failed') {
        setFormStatus('idle');
      }
    };
  }, [navigate, productUpdate.status, showSnackbar, setFormStatus]);

  const { control, getValues, formState, handleSubmit, watch, setValue, reset } = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({
      name: productDetails?.name || '',
      sku: productDetails?.sku || '',
      description: productDetails?.description || '',
      price: productDetails?.price || 0,
      quantity: productDetails?.quantity || 0,
      kycTags: stringToValueLabel(productDetails?.kycTags || kycTagsOptions[0]),
      productType: stringToValueLabel(productDetails?.productType || productFilterOptions[0]),
      productChoice: stringToValueLabel(productDetails?.productChoice || productChoiceOptions[0]),
      productCategory: stringToValueLabel(
        productDetails?.productCategory || productCategoryOptions[0]
      ),
      productTags: productDetails?.productTags
        ? stringToValueLabel(productDetails.productTags)
        : [productTagsOptions[0]] || [productTagsOptions[0]],
      policies: productDetails?.policies || [],
      kycDetail: '',
      images: productDetails?.images || '',
    });
  }, [productDetails, reset]);

  // console.log('Watching form fields', watch('productTags'));
  // console.log('Watching form fields productTags', watch('productTags'));

  const { isValid, dirtyFields, errors } = formState;

  const filterImages = (images) => {
    if (!images) return [];
    if (!_.isArray(images)) return [];
    return _.map(images, (imageObj, index) => {
      if (imageObj.image_id) {
        return { ...imageObj };
      }
      return {
        url: imageObj.url,
        type: index === 0 ? 'primary' : 'other',
      };
    });
  };

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      sku: data.sku,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      kycTags: valueLabelToString(data.kycTags),
      productType: valueLabelToString(data.productType),
      productChoice: valueLabelToString(data.productChoice),
      productCategory: valueLabelToString(data.productCategory, 'label'),
      productTags: valueLabelToString(data.productTags),
      policies: data.policies,
      kycDetail: data.kycDetail,
      images: filterImages(data.images),
    };
    if (productDetails && productDetails.id) {
      if (!productDetails.kycDetail || !productDetails.kycDetail.id) {
        showSnackbar('Please upload KYC Details', 'e');
        return;
      }
      showSnackbar('Updating Product');
      const { kycDetail, ...rest } = payload;
      updateProductWithKyc({
        kycDetail: {
          productId: productDetails.id,
          kycDetailId: productDetails.kycDetail.id,
          kycDetail,
        },
        productDetail: {
          id: productDetails.id,
          ...rest,
        },
        productId: productDetails.id,
      });
    } else {
      addProduct({
        product: payload,
      });
    }
  };

  if (kycStatus === 'failed')
    return (
      <div className="flex w-full h-[100vh] justify-center items-center">
        <ServerError />
      </div>
    );

  return (
    <>
      {loading ? (
        <FuseLoading />
      ) : (
        <form
          name="addProductForm"
          noValidate
          className="flex flex-col justify-center w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col flex-1 p-[30px] bg-grey-50 ">
            <div className="max-w-[100%]">
              <div className="flex flex-row justify-between">
                <div>
                  <Typography variant="h4" color="inherit" className="font-medium mb-16">
                    {title}
                    <Tooltip title={pageData.pageTitle} placement="bottom-start" enterDelay={300}>
                      <InfoIcon className="text-primary-blue ml-[1rem] text-[2.5rem]" />
                    </Tooltip>
                  </Typography>
                </div>
                <div>
                  <Button
                    className="rounded-none h-[40px] ml-[5px] bg-primary-blue hover:bg-primary-blue"
                    variant="contained"
                    aria-label="CREATE"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    type="submit"
                  >
                    {productDetails ? 'Update' : 'Create'}
                  </Button>
                </div>
              </div>

              <div className="flex flex-row gap-[25px]">
                <div className="flex flex-col w-[40%] gap-[25px]">
                  <ProductUpload getValues={getValues} setValue={setValue} />
                  <ProductFilter control={control} errors={errors} />
                  <ProductPolicy
                    getValues={getValues}
                    setValue={setValue}
                    control={control}
                    errors={errors}
                  />
                </div>
                <div className="flex flex-col w-[60%] gap-[25px]">
                  <ProductInformation control={control} errors={errors} />
                  <KycDetails setValue={setValue} control={control} errors={errors} />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ProductAddForm;
