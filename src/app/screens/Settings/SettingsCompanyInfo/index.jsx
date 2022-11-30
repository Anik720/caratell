/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unused-imports/no-unused-imports */
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import api from 'app/APIs/caratell-service/apiService';
import useSettingsStore from 'app/store/appstore/settingStore/useSettingsStore';
import { useSnackbar } from 'app/hooks';
import CompanyInfoForm from './CompanyInfoForm';

const CompanyInfo = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyDetails, setCompanyDetails] = useState({});

  const { companyInfo, getCompanyInfo } = useSettingsStore();

  const showSnackbar = useSnackbar();

  useEffect(() => {
    if (companyInfo.status === 'succeeded') {
      setCompanyDetails(companyInfo.data);
      setLoading(false);
    } else if (companyInfo.status === 'failed') {
      showSnackbar('Failed to get company info', 'e');
      setLoading(false);
      setError('Failed to get company info');
    }
  }, [companyInfo]);

  if (loading) return <FuseLoading />;

  if (error) return <div>We are sorry! Try again</div>;

  return (
    <>
      <CompanyInfoForm companyDetails={companyDetails} />
    </>
  );
};

export default CompanyInfo;
