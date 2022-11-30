/* eslint-disable unused-imports/no-unused-imports */
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge, & > .logo-text': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  const companyInfo = useSelector(({ appstore }) => appstore.settings.companyInfo);
  const logoURL = companyInfo.data?.image || 'assets/images/logos/CaratellLogoWhite.png';

  return (
    <Root className="flex items-center">
      <img className="logo-icon  w-[160px] h-[40px] ml-[30px]" src={logoURL} alt="logo" />
    </Root>
  );
}

export default Logo;
