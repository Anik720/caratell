import { Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CustomInput } from 'app/components';

const ShipTo = ({ getValues, setValue, control, errors }) => {
  return (
    <div className="flex flex-col w-[50%] ml-[15px]">
      <Typography variant="body1" color="inherit" className="mb-10 text-[14px] text-dark-800">
        Ship To
      </Typography>
      <div className="w-full mb-[16px]">
        <CustomInput
          name="shipDetails.shipToName"
          control={control}
          error={!!errors.shipDetails?.shipToName}
          helperText={errors?.shipDetails?.shipToName?.message}
        />
      </div>
      <div className="w-full mb-[16px]">
        <CustomInput
          name="shipDetails.shipToPhone"
          control={control}
          error={!!errors.shipDetails?.shipToPhone}
          helperText={errors?.shipDetails?.shipToPhone?.message}
        />
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-[50%] mr-[10px]">
          <Typography variant="body1" color="inherit" className="mb-6 text-[14px] text-dark-800">
            Postal Code
          </Typography>
          <div className="w-full mb-[16px]">
            <CustomInput
              name="shipDetails.shipToPostal"
              control={control}
              error={!!errors.shipDetails?.shipToPostal}
              helperText={errors?.shipDetails?.shipToPostal?.message}
            />
          </div>
        </div>
        <div className="w-[50%] ml-[10px]">
          <Typography
            variant="body1"
            color="inherit"
            className="mb-6 text-left text-[14px] text-dark-800"
          >
            Unit
          </Typography>
          <div className="w-full mb-[16px]">
            <CustomInput
              name="shipDetails.shipToUnit"
              control={control}
              error={!!errors.shipDetails?.shipToUnit}
              helperText={errors?.shipDetails?.shipToUnit?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full mb-[16px]">
        <CustomInput
          name="shipDetails.shipToDetail"
          control={control}
          error={!!errors.shipDetails?.shipToDetail}
          helperText={errors?.shipDetails?.shipToDetail?.message}
          multiline
          rows={4}
        />
      </div>
    </div>
  );
};

export default ShipTo;
