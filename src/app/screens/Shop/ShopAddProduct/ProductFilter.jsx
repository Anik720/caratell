import { CustomSelect } from 'app/components';
import { Typography } from '@mui/material';
import {
  productFilterOptions,
  productCategoryOptions,
  productChoiceOptions,
  productTagsOptions,
} from 'app/static-data/products';

const ProductFilter = (props) => {
  const { control, errors } = props;

  return (
    <div className="flex flex-col p-[16px] w-full bg-white rounded-2">
      <div className="">
        <Typography variant="h6" color="inherit" className="font-medium mb-16 text-grey-700">
          Product Filter
        </Typography>
      </div>
      <div className="flex flex-col">
        <div className="w-full mb-[15px]">
          <span className="text-grey-700 mb-[5px]">Product Type</span>
          <CustomSelect options={productFilterOptions} name="productType" control={control} />
        </div>
        <div className="w-full mb-[15px]">
          <span className="text-grey-700 mb-[5px]">Product Category</span>
          <CustomSelect options={productCategoryOptions} name="productCategory" control={control} />
        </div>
        <div className="w-full mb-[15px]">
          <span className="text-grey-700 mb-[5px]">Product Choice</span>
          <CustomSelect options={productChoiceOptions} name="productChoice" control={control} />
        </div>
        <div className="w-full mb-[15px]">
          <span className="text-grey-700 mb-[5px]">Product Tags</span>
          <CustomSelect options={productTagsOptions} isMulti name="productTags" control={control} />
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
