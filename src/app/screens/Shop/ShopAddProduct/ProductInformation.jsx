import { Typography } from '@mui/material';
import { CustomInput } from 'app/components';

import pageData from './addProductData';

const ProductPolicy = (props) => {
  const { control, errors } = props;

  return (
    <div className="flex flex-col p-[16px] w-full bg-white rounded-2">
      <div className="">
        <Typography variant="h6" color="inherit" className="font-medium mb-16 text-grey-700">
          {pageData.PRODUCT_INFORMATION}
        </Typography>
      </div>
      <div className="flex flex-row flex-wrap gap-[10px]">
        <div className="flex flex-row gap-[10px] w-full">
          <div className="w-full">
            <CustomInput
              name="name"
              control={control}
              className="mb-16"
              label="Name"
              autoFocus
              type="text"
              error={!!errors.name}
              helperText={errors?.name?.message}
              variant="outlined"
              required
              fullWidth
            />
          </div>
          <div className="w-full">
            <CustomInput
              name="sku"
              control={control}
              className="mb-16"
              label="Product SKU"
              autoFocus
              type="text"
              error={!!errors.sku}
              helperText={errors?.sku?.message}
              variant="outlined"
              required
              fullWidth
            />
          </div>
        </div>
        <div className="w-full">
          <CustomInput
            name="description"
            control={control}
            className="mb-16"
            label="Description"
            autoFocus
            multiline
            rows={4}
            type="text"
            error={!!errors.description}
            helperText={errors?.description?.message}
            variant="outlined"
            required
            fullWidth
          />
        </div>
        <div className="flex flex-row gap-[10px] w-full">
          <div className="w-full">
            <CustomInput
              name="price"
              control={control}
              className="mb-16"
              label="Price"
              autoFocus
              type="number"
              error={!!errors.price}
              helperText={errors?.price?.message}
              variant="outlined"
              required
              fullWidth
            />
          </div>
          <div className="w-full">
            <CustomInput
              name="quantity"
              control={control}
              className="mb-16"
              label="Quantity"
              autoFocus
              type="number"
              error={!!errors.quantity}
              helperText={errors?.quantity?.message}
              variant="outlined"
              required
              fullWidth
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPolicy;
