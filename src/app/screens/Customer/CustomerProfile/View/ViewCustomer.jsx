import _ from 'lodash';
import { useState } from 'react';
import { Typography, Tooltip, Button, Grid } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import useCustomerStore from 'app/store/appstore/customerStore/useCustomerStore';
import { phoneFormatter, convertDateToString } from 'app/utils';
import { Link } from 'react-router-dom';

import { CIMG, ConfirmDialog } from 'app/components';
import { useSnackbar } from 'app/hooks';
import apiService from 'app/APIs/caratell-service/apiService';
import { getCountryByCode } from '../Edit/countryList';

function Header({ userId }) {
  return (
    <div className="max-w-[100%]">
      <div className="flex flex-row justify-between">
        <div>
          <Typography variant="h4" color="inherit" className="font-medium mb-16">
            Customer Profile
            <Tooltip title="Customer Profile" placement="bottom-start" enterDelay={300}>
              <InfoIcon className="text-primary-blue ml-[1rem] text-[2.5rem]" />
            </Tooltip>
          </Typography>
        </div>
        <div className="flex flex-row">
          <Button
            className="rounded-none h-[40px] ml-[5px] bg-black-300 hover:bg-primary-blue"
            variant="contained"
            onClick={() => {}}
          >
            Download PDF
          </Button>
          <Button
            component={Link}
            to={`/customer/profile/${userId}/edit`}
            className="rounded-none h-[40px] ml-[5px] bg-black-300 hover:bg-primary-blue"
            variant="contained"
          >
            Edit
          </Button>
          <Button
            component={Link}
            to="/customer/customer-list"
            className="rounded-none h-[40px] ml-[5px] bg-black-300 hover:bg-primary-blue"
            variant="contained"
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}

function BasicInfo({ userData }) {
  const profilePic = userData.images && userData.images.find((image) => image.type === 'primary');

  return (
    <div className="flex flex-row p-[25px] bg-white">
      <div className="flex items-center w-full justify-start gap-[25px]">
        <CIMG
          v="circular"
          src={
            profilePic?.url ||
            `https://ui-avatars.com/api/?size=256&name=${userData.first_name || 'Jhon'}`
          }
          className="rounded-[50%]"
          w="150px"
          h="150px"
        />
        <div className="flex flex-col justify-start w-full">
          <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
            Name
          </Typography>
          <Typography variant="h6" color="inherit" className="font-[400] text-[15px] mb-[32px]">
            {userData.first_name || ''}
          </Typography>
          <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
            Contact
          </Typography>
          <Typography variant="h6" color="inherit" className="font-[400] text-[15px] mb-[32px]">
            {phoneFormatter(userData.phone_number || '')}
          </Typography>
        </div>
      </div>
      <div className="flex items-center w-full justify-start gap-[25px]">
        <div className="flex flex-col justify-start w-full">
          <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
            Date of Birth
          </Typography>
          <Typography variant="h6" color="inherit" className="font-[400] text-[15px] mb-[32px]">
            {convertDateToString(userData.birthDay)}
          </Typography>
          <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
            Email
          </Typography>
          <Typography variant="h6" color="inherit" className="font-[400] text-[15px] mb-[32px]">
            {userData.email || ''}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function ContactInfo({ userData }) {
  return (
    <div className="flex flex-row p-[25px] bg-white">
      <div className="flex items-start w-full justify-start gap-[25px]">
        <div className="flex flex-col justify-start w-full">
          <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
            NRIC/FIN
          </Typography>
          <Typography variant="h6" color="inherit" className="font-[400] text-[15px] mb-[32px]">
            {userData.nric || ''}
          </Typography>
          <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
            Occupation
          </Typography>
          <Typography variant="h6" color="inherit" className="font-[400] text-[15px]">
            {userData.occupation || ''}
          </Typography>
        </div>
        <div className="flex flex-col justify-start items-start w-full">
          <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
            Country
          </Typography>
          <Typography variant="h6" color="inherit" className="font-[400] text-[15px] mb-[32px]">
            {getCountryByCode(userData.country).label}
          </Typography>
        </div>
        <div className="flex flex-col justify-start w-full">
          <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
            Nationality
          </Typography>
          <Typography variant="h6" color="inherit" className="font-[400] text-[15px] mb-[32px]">
            {userData.nationality || ''}
          </Typography>
        </div>
      </div>
      <div className="w-full gap-[25px]">
        <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
          Address
        </Typography>
        <Typography variant="h6" color="inherit" className="font-[400] text-[15px] mb-[32px]">
          {userData.address || ''}
        </Typography>
      </div>
    </div>
  );
}

function KYCInfo({ userKyc }) {
  const ImageBox = ({ imageObject }) => {
    return (
      <div className="flex justify-center flex-col items-center">
        <div className="flex justify-center items-center p-[8px] w-[80px] h-[80px] mb-[16px] rounded-4">
          <CIMG
            src={imageObject.image}
            w={imageObject.w || '100%'}
            h={imageObject.h || '100%'}
            alt="face"
          />
        </div>
        <div className="text-center text-[16px]">{imageObject.title}</div>
      </div>
    );
  };

  userKyc = userKyc && userKyc.filter((kyc) => kyc.title === 'self');
  userKyc = userKyc && userKyc.length > 0 ? userKyc[0] : null;

  return (
    <div className="flex flex-col p-[25px] bg-white">
      <Grid container spacing={2} columns={9}>
        <Grid item xs={2}>
          <Typography
            variant="h6"
            color="inherit"
            className="font-[600] text-center py-[8px] text-[15px] mb-[4px] rounded-4 bg-light-600"
          >
            Face
          </Typography>
          <Grid container spacing={2} columns={2} mt="10px">
            {userKyc &&
              userKyc.faces &&
              userKyc.faces.map((face, index) => (
                <Grid item xs={1} key={index}>
                  <ImageBox
                    imageObject={{
                      image: `${userKyc?.faces[index]?.image || 'https://picsum.photos/300/300'}`,
                      title: `${userKyc?.faces[index]?.title || 'Shape'}`,
                      w: '60px',
                      h: '65px',
                    }}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="h6"
            color="inherit"
            className="font-[600] text-center py-[8px] text-[15px] mb-[4px] rounded-4 bg-light-600"
          >
            Skin
          </Typography>
          <Grid container spacing={2} columns={2} mt="10px">
            {userKyc &&
              userKyc.skins &&
              userKyc.skins.map((skin, index) => (
                <Grid item xs={1} key={index}>
                  <ImageBox
                    imageObject={{
                      image: `assets/images/skinTones/${_.capitalize(
                        userKyc?.skins[index]?.skin_tone || 'Warn'
                      )}.svg`,
                      title: `${userKyc?.skins[index]?.skin_tone || 'Tone'}`,
                      w: '20px',
                    }}
                  />
                </Grid>
              ))}
            {userKyc &&
              userKyc.skins &&
              userKyc.skins.map((skin, index) => (
                <Grid item xs={1} key={index}>
                  <ImageBox
                    imageObject={{
                      image: `assets/images/skinTones/${_.capitalize(
                        userKyc?.skins[index]?.skin_undertone || 'Yellow'
                      )}.svg`,
                      title: `${userKyc?.skins[index]?.skin_undertone || 'Under Tone'}`,
                    }}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="h6"
            color="inherit"
            className="font-[600] text-center py-[8px] text-[15px] mb-[4px] rounded-4 bg-light-600"
          >
            Finger Type
          </Typography>
          <Grid
            container
            spacing={2}
            columns={userKyc && userKyc.fingers && userKyc.fingers.length > 1 ? 2 : 1}
            mt="10px"
          >
            {userKyc &&
              userKyc.fingers &&
              userKyc.fingers.map((face, index) => (
                <Grid item xs={1} key={index}>
                  <ImageBox
                    imageObject={{
                      image: `${userKyc?.fingers[index]?.image || 'https://picsum.photos/300/300'}`,
                      title: `${userKyc?.fingers[index]?.title || 'Shape'}`,
                    }}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="h6"
            color="inherit"
            className="font-[600] text-center py-[8px] text-[15px] mb-[4px] rounded-4 bg-light-600"
          >
            Ear Info
          </Typography>
          <Grid container spacing={2} columns={3} mt="10px">
            {userKyc &&
              userKyc.ears &&
              userKyc.ears.map((ear, index) => (
                <Grid item xs={1} key={index}>
                  <ImageBox
                    imageObject={{
                      image: `${ear?.image || 'https://picsum.photos/300/300'}`,
                      title: `${ear?.title || 'Shape'}`,
                    }}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} columns={1} mt="10px">
        <Grid item xs={1}>
          <Typography
            variant="h6"
            color="inherit"
            className="font-[600] text-center py-[8px] text-[15px] mb-[4px] rounded-4 bg-light-600"
          >
            Neckline
          </Typography>
          <Grid
            container
            spacing={2}
            columns={10}
            mt="10px"
            sx={{
              justifyContent: 'start',
            }}
          >
            {userKyc &&
              userKyc.necklines &&
              userKyc.necklines.map((neckline, index) => (
                <Grid item xs={1} key={index}>
                  <ImageBox
                    imageObject={{
                      image: `${neckline?.image || 'https://picsum.photos/300/300'}`,
                      title: `${neckline?.title || 'Shape'}`,
                    }}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

function ActionButton({ userId, userProfile }) {
  const [isBlacklisted, setIsBlackListed] = useState(userProfile?.data?.isBlacklisted || false);
  const [blackListOpen, setBlackListOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  const showSnackbar = useSnackbar();

  const handleBlackList = async () => {
    try {
      const payload = {
        users: [
          {
            id: userId,
          },
        ],
      };
      showSnackbar('Loading...');
      if (isBlacklisted) {
        await apiService.undoBlackListedUser(payload);
      } else {
        await apiService.makeUserBlackListed(payload);
      }
      showSnackbar(isBlacklisted ? 'User Unblacklisted' : 'User Blacklisted', 's');
      setIsBlackListed(!isBlacklisted);
    } catch (e) {
      showSnackbar('Error while Updating Blacklist', 'e');
    }
  };

  return (
    <div className="flex flex-row p-[15px] bg-white">
      <div className="flex flex-row items-center w-full justify-center gap-[20px]">
        <Button
          className="rounded-none h-[40px] ml-[5px] bg-black-300 hover:bg-primary-blue"
          variant="contained"
          onClick={() => setBlackListOpen(true)}
        >
          {isBlacklisted ? 'Unblacklist' : 'Blacklist'}
        </Button>
        <ConfirmDialog
          handleDelete={handleBlackList}
          open={blackListOpen}
          variant="red"
          btnText={isBlacklisted ? 'Unblacklist' : 'Blacklist'}
          handleClose={() => setBlackListOpen(false)}
          title={isBlacklisted ? 'Unblacklist Account' : 'Blacklist Account'}
          subTitle={
            isBlacklisted
              ? 'User will be able to login again after unblacklisting'
              : 'Accounts login will be disabled'
          }
        />
        <Button
          className="rounded-none h-[40px] ml-[5px] bg-black-300 hover:bg-primary-blue"
          variant="contained"
          onClick={() => setResetOpen(true)}
        >
          Reset Password
        </Button>
        <ConfirmDialog
          handleDelete={() => console.log('Reset button pressed')}
          open={resetOpen}
          variant="blue"
          btnText="Confim Link"
          handleClose={() => setResetOpen(false)}
          title="Reset Password"
          subTitle="Send a link to reset password"
        />
      </div>
    </div>
  );
}

const ViewCustomer = ({ userId }) => {
  const { userProfile } = useCustomerStore();
  if (!userProfile.data) {
    return (
      <div className="flex flex-col flex-1 p-[30px] gap-[22px] bg-grey-50">
        <div className="flex flex-col h-[100vh] items-center justify-center flex-1">
          <Typography
            variant="h4"
            color="inherit"
            className="font-[600] text-center py-[8px] text-[15px] mb-[4px] rounded-4 bg-light-600"
          >
            User profile data not found
          </Typography>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col flex-1 p-[30px] gap-[22px] bg-grey-50">
      <Header userId={userId} />
      <BasicInfo userData={userProfile.data} />
      <ContactInfo userData={userProfile.data} />
      <KYCInfo userKyc={userProfile.data.userKyc} />
      <ActionButton userProfile={userProfile} userId={userId} />
    </div>
  );
};

export default ViewCustomer;
