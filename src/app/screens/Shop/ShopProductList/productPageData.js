import { productFilterOptions } from 'app/static-data/products';

const productPageData = {
  productFilterTypes: productFilterOptions,
  productFilterTypeIdsOnly: productFilterOptions.map((item) => item.value),
};
export default productPageData;
