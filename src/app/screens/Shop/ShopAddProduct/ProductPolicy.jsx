/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash';
import { Checkbox, Typography } from '@mui/material';
import { CustomAccordion, EditorPreview } from 'app/components';
import { useEffect, useState } from 'react';
import useProductStore from 'app/store/appstore/productStore/useProductStore';

const ProductPolicy = ({ getValues, setValue }) => {
  const { kycData } = useProductStore();
  const [policies, setPolicies] = useState([]);

  const [policyTypes, setPolicyTypes] = useState(getValues('policies'));

  useEffect(() => {
    setPolicies(kycData.policies);
    setPolicyTypes(getValues('policies'));
  }, []);

  useEffect(() => {
    setValue('policies', policyTypes, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [policyTypes]);

  const handleCheckboxChange = (type) => {
    if (policyTypes.find((p) => p.id === type.id)) {
      setPolicyTypes(policyTypes.filter((policy) => policy.id !== type.id));
    } else {
      setPolicyTypes([...policyTypes, type]);
    }
  };

  return (
    <div className="flex flex-col p-[16px] w-full bg-white rounded-2">
      <div className="w-full">
        <Typography variant="h6" color="inherit" className="font-medium mb-16 text-grey-700">
          Product Policies
        </Typography>
      </div>
      <div className="w-full">
        {policies &&
          _.map(policies, (policy, index) => (
            <div key={index} className="flex flex-[4] flex-row justify-start w-full">
              <div className="flex-1 border-b-1 border-grey-200 mt-[2px] h-[62px] flex justify-center items-center">
                <Checkbox
                  checked={Boolean(policyTypes.find((p) => p.id === policy.id))}
                  onClick={(event) => handleCheckboxChange(policy)}
                  style={{ color: '#1890FF' }}
                />
              </div>
              <div className="w-full">
                <CustomAccordion title={policy.title} index={index}>
                  <div className="ml-[-45px]">
                    <EditorPreview content={policy.description} />
                  </div>
                </CustomAccordion>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductPolicy;
