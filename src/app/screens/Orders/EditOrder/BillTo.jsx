import { Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CustomInput } from 'app/components';

const BillTo = ({ getValues, setValue, control, errors }) => {
  return (
    <div className="flex flex-col w-[50%] mr-[15px]">
      <Typography variant="body1" color="inherit" className="mb-10 text-[14px] text-dark-800">
        Bill To
      </Typography>
      <div className="w-full mb-[16px]">
        <CustomInput
          name="billDetails.billToName"
          control={control}
          error={!!errors.billDetails?.billToName}
          helperText={errors?.billDetails?.billToName?.message}
        />
      </div>
      <div className="w-full mb-[16px]">
        <CustomInput
          name="billDetails.billToPhone"
          control={control}
          error={!!errors.billDetails?.billToPhone}
          helperText={errors?.billDetails?.billToPhone?.message}
        />
      </div>
      <div className="w-full mb-[16px]">
        <CustomInput
          name="billDetails.billToEmail"
          control={control}
          error={!!errors.billDetails?.billToEmail}
          helperText={errors?.billDetails?.billToEmail?.message}
        />
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-[50%] mr-[10px]">
          <Typography variant="body1" color="inherit" className="mb-6 text-[14px] text-dark-800">
            Postal Code
          </Typography>
          <div className="w-full mb-[16px]">
            <CustomInput
              name="billDetails.billToPostal"
              control={control}
              error={!!errors.billDetails?.billToPostal}
              helperText={errors?.billDetails?.billToPostal?.message}
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
              name="billDetails.billToUnit"
              control={control}
              error={!!errors.billDetails?.billToUnit}
              helperText={errors?.billDetails?.billToUnit?.message}
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
          name="billDetails.billToDetail"
          control={control}
          error={!!errors.billDetails?.billToDetail}
          helperText={errors?.billDetails?.billToDetail?.message}
          multiline
          rows={4}
        />
      </div>
    </div>
  );
};

export default BillTo;
