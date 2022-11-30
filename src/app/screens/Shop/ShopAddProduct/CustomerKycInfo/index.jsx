import * as React from 'react';
import _ from '@lodash';
import useProductStore from 'app/store/appstore/productStore/useProductStore';
import { TabPanel } from 'app/components';
import ProfileInfo from './ProfileInfo';
import FaceInfo from './FaceInfo';
import SkinInfo from './SkinInfo';
import FingerInfo from './FingerInfo';
import EarInfo from './EarInfo';
import NecklineInfo from './NecklineInfo';

const tabItems = [
  {
    header: 'Profile',
    component: ProfileInfo,
  },
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
  return {
    tone: _.startCase(value?.skin_tone || ''),
    underTone: _.startCase(value?.skin_undertone || ''),
  };
};

const CustomerKycInfo = ({ setValue }) => {
  const { kycData, singleProduct } = useProductStore();
  const [kycDetails, setKycDetails] = React.useState({
    ...kycData.kycDetail,
  });

  const [personInfo, setPersonInfo] = React.useState({
    profiles: singleProduct?.data?.kycDetail?.profiles[0] || {},
    faces: singleProduct?.data?.kycDetail?.faces || [],
    skins: skinToneFormatter(singleProduct?.data?.kycDetail?.skins[0] || {}),
    fingers: singleProduct?.data?.kycDetail?.fingers || [],
    ears: singleProduct?.data?.kycDetail?.ears || [],
    necklines: singleProduct?.data?.kycDetail?.necklines || [],
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
      const profiles = kycDetails.profiles.find((profile) => {
        return (
          _.lowerCase(profile.gender) === _.lowerCase(personInfo.profiles.gender) &&
          profile.age_range == personInfo.profiles.age_range
        );
      });
      kycDetailsInfo.skins = [skins];
      kycDetailsInfo.profiles = [profiles];
    }
    if (kycDetailsInfo) {
      setValue('kycDetail', kycDetailsInfo, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [personInfo, setValue, kycDetails]);

  return (
    <TabPanel
      tabItems={tabItems}
      childProps={{
        personInfo,
        kycDetails,
        setPersonInfo,
      }}
    />
  );
};

export default React.memo(CustomerKycInfo);
