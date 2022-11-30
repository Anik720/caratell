import { Typography, Button } from '@mui/material';
import { useState } from 'react';
import useCustomerStore from 'app/store/appstore/customerStore/useCustomerStore';
import { CIMG, CustomInput, CustomSelect, ConfirmDialog } from 'app/components';
import { useSnackbar } from 'app/hooks';
import apiService from 'app/APIs/caratell-service/apiService';

import countryList from './countryList';
import CustomerInfo from './CustomerInfo/index';
import CustomerPhotos from './CustomerPhotos';

function BasicInfo({ userData, formProps }) {
  const profilePic = userData.images && userData.images.find((image) => image.type === 'primary');

  const { control, errors } = formProps;
  return (
    <div className="flex flex-row p-[25px] gap-[25px] bg-white">
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
          <CustomInput
            name="first_name"
            className="mb-[32px]"
            control={control}
            error={!!errors.first_name}
            helperText={errors?.first_name?.message}
          />
          <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
            Contact
          </Typography>
          <CustomInput
            name="phone_number"
            className="mb-[32px]"
            control={control}
            error={!!errors.phone_number}
            helperText={errors?.phone_number?.message}
          />
        </div>
      </div>
      <div className="flex items-center w-full justify-start gap-[25px]">
        <div className="flex flex-col justify-start w-full">
          <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
            Date of Birth
          </Typography>
          <CustomInput
            name="birthDay"
            className="mb-[32px]"
            control={control}
            type="date"
            error={!!errors.birthDay}
            helperText={errors?.birthDay?.message}
          />
          <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
            Email
          </Typography>
          <CustomInput
            name="email"
            className="mb-[32px]"
            control={control}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
        </div>
      </div>
    </div>
  );
}

function ContactInfo({ userData, formProps }) {
  const { control, errors } = formProps;

  return (
    <div className="flex flex-row p-[25px] gap-[25px] bg-white">
      <div className="flex items-start w-full justify-start gap-[15px]">
        <div className="flex flex-col justify-start w-full">
          <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
            NRIC/FIN
          </Typography>
          <CustomInput
            name="nric"
            className="mb-[32px]"
            control={control}
            error={!!errors.nric}
            helperText={errors?.nric?.message}
          />
          <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
            Occupation
          </Typography>
          <CustomInput
            name="occupation"
            control={control}
            error={!!errors.occupation}
            helperText={errors?.occupation?.message}
          />
        </div>
        <div className="flex flex-col justify-start items-start w-full">
          <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
            Country
          </Typography>
          <CustomSelect name="country" control={control} options={countryList} />
        </div>
        <div className="flex flex-col justify-start w-full">
          <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
            Nationality
          </Typography>
          <CustomInput
            name="nationality"
            control={control}
            error={!!errors.nationality}
            helperText={errors?.nationality?.message}
          />
        </div>
      </div>
      <div className="w-full gap-[15px]">
        <Typography variant="h6" color="inherit" className="font-[600] text-[18px] mb-[4px]">
          Address
        </Typography>
        <CustomInput
          name="address"
          className="mb-[32px]"
          control={control}
          multiline
          rows={4}
          error={!!errors.address}
          helperText={errors?.address?.message}
        />
      </div>
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

const CustomerEditFormFields = (props) => {
  const { userId, formProps } = props;
  const { userProfile } = useCustomerStore();
  if (!userProfile.data || !userProfile.data.id) {
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
    <>
      <BasicInfo userData={userProfile.data} formProps={formProps} />
      <ContactInfo userData={userProfile.data} formProps={formProps} />
      <div className="flex flex-row gap-[25px]">
        <CustomerPhotos userId={userId} />
        <CustomerInfo setValue={formProps.setValue} />
      </div>
      <ActionButton userProfile={userProfile} userId={userId} formProps={formProps} />
    </>
  );
};

export default CustomerEditFormFields;
