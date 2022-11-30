/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCompanyInfoSF } from 'app/store/appstore/settingStore/settingsSlice';
import jwt_decode from 'jwt-decode';

function RGComponent({ RGC }) {
  // const isLoggedIn = useSelector(({ appstore }) => appstore.auth.isLoggedIn);
  const isLoggedIn = localStorage.getItem('caratell-isLoggedIn');
  const accessToken = localStorage.getItem('caratell-token');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Log IN Check
  useEffect(() => {
    if (isLoggedIn && accessToken) dispatch(getCompanyInfoSF());
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !accessToken) {
      navigate('/login');
    } else {
      try {
        const decoded = jwt_decode(accessToken);
        if (!decoded.email) {
          navigate('/login');
        }
      } catch (err) {
        navigate('/login');
      }
    }
  }, [isLoggedIn, navigate, accessToken]);

  return <>{isLoggedIn && RGC}</>;
}

export default RGComponent;
