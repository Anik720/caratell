import * as React from 'react';
import _ from '@lodash';
import useProductStore from 'app/store/appstore/productStore/useProductStore';
import useCustomerStore from 'app/store/appstore/customerStore/useCustomerStore';
import { TabPanel } from 'app/components';
import FaceInfo from './FaceInfo';
import SkinInfo from './SkinInfo';
import FingerInfo from './FingerInfo';
import EarInfo from './EarInfo';
import NecklineInfo from './NecklineInfo';

const tabItems = [
  {
    header: 'Face',
    component: FaceInfo,
  },
  {
    header: 'Skin',
    component: SkinInfo,
  },
  {
    header: 'Finger',
    component: FingerInfo,
  },
  {
    header: 'Ear',
    component: EarInfo,
  },
  {
    header: 'Neckline',
    component: NecklineInfo,
  },
];

const skinToneFormatter = (value) => {
  if (!value || value.length == 0)
    return {
      tone: '',
      undertone: '',
    };
  value = value[0] || {};
  return {
    tone: _.startCase(value?.skin_tone || ''),
    underTone: _.startCase(value?.skin_undertone || ''),
  };
};

const CustomerInfo = ({ setValue }) => {
  const { kycData, singleProduct } = useProductStore();
  const { userProfile, updateUserProfile, userEditForm } = useCustomerStore();

  const [kycDetails, setKycDetails] = React.useState({
    ...kycData.kycDetail,
  });

  const userKyc =
    userProfile.data.userKyc && userProfile.data.userKyc.filter((kyc) => kyc.title === 'self')[0];

  const [personInfo, setPersonInfo] = React.useState({
    faces: userKyc?.faces || [],
    skins: skinToneFormatter(userKyc?.skins || {}),
    fingers: userKyc?.fingers || [],
    ears: userKyc?.ears || [],
    necklines: userKyc?.necklines || [],
  });

  React.useEffect(() => {
    const kycDetailsInfo = { ...personInfo };
    if (kycDetails && kycDetails.skins && kycDetails.profiles) {
      const skins = kycDetails.skins.find((skin) => {
        return (
          _.lowerCase(skin.skin_tone) === _.lowerCase(personInfo.skins.tone) &&
          _.lowerCase(skin.skin_undertone) === _.lowerCase(personInfo.skins.underTone)
        );
      });
      kycDetailsInfo.skins = [skins];
    }
    if (kycDetailsInfo) {
      setValue('kycDetail', kycDetailsInfo, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [personInfo, setValue, kycDetails]);

  return (
    <div className="w-[50%] overflow-x-auto p-[30px] flex flex-col justify-start rounded-4 items-center bg-white">
      <TabPanel
        tabItems={tabItems}
        childProps={{
          personInfo,
          kycDetails,
          setPersonInfo,
        }}
      />
    </div>
  );
};

export default CustomerInfo;
