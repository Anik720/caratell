import { CustomSelect } from 'app/components';
import { kycTagsOptions } from 'app/static-data/products';
import CustomerKycInfo from './CustomerKycInfo';

const KycDetails = (props) => {
  const { control, errors, setValue } = props;

  return (
    <div className="flex flex-col p-[16px] w-full bg-white rounded-2 min-h-[react-dropzone]">
      <div className="flex flex-row flex-wrap gap-[10px]">
        <div className="w-full">
          <span className="text-grey-700">KYC Tags</span>
          <CustomSelect options={kycTagsOptions} isMulti name="kycTags" control={control} />
        </div>
      </div>
      <div className="mt-[32px]">
        <CustomerKycInfo setValue={setValue} />
      </div>
    </div>
  );
};

export default KycDetails;
