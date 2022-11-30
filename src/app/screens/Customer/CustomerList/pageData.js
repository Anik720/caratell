import { kycStatus } from 'app/static-data/customer';

const productPageData = {
  pageTitle: 'Customer List',
  EXPORT_CSV: 'Export CSV',
  customerFilterTypes: kycStatus,
  customerFilterTypeIdsOnly: kycStatus.map((item) => item.value),
};
export default productPageData;
