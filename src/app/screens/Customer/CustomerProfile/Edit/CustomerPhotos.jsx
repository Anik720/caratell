import React from 'react';
import { Grid, Typography } from '@mui/material';
import useCustomerStore from 'app/store/appstore/customerStore/useCustomerStore';
import { CIMG } from 'app/components';

const CustomerPhotos = () => {
  const { userProfile, updateUserProfile, userEditForm } = useCustomerStore();

  const customerPictures = userProfile.data.images;

  return (
    <div className="w-[50%] p-[30px] max-h-[440px] flex flex-col rounded-4 justify-start items-start bg-white">
      <Typography
        variant="h6"
        color="inherit"
        className="text-left font-[700] text-[18px] mb-[20px]"
      >
        Customer Photos
      </Typography>
      {(!userProfile.data.images || userProfile.data.images.length == 0) && (
        <div className="w-full h-full flex justify-center items-center border-1 border-gray-300 rounded-2">
          <Typography
            variant="h6"
            color="inherit"
            className="font-[600] text-[18px] mb-[20px] text-dark"
          >
            No photos uploaded
          </Typography>
        </div>
      )}
      <div className="overflow-y-auto">
        <Grid container spacing={2} columns={12}>
          {customerPictures &&
            customerPictures.map(
              (picture, index) =>
                picture.type != 'primary' && (
                  <Grid item key={index} xs={6}>
                    <CIMG src={picture.url} alt="customerface" className="rounded-4" />
                  </Grid>
                )
            )}
        </Grid>
      </div>
    </div>
  );
};

export default React.memo(CustomerPhotos);
