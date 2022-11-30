import { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';

const GenderSelect = ({ getValues, setValue }) => {
  const [genderInfo, setGenderInfo] = useState(getValues('gender'));

  useEffect(() => {
    setValue('gender', genderInfo, { shouldDirty: true });
  }, [genderInfo, setValue]);

  return (
    <div className="flex justify-center flex-col">
      <div className="w-full mb-[24px]">
        <Typography variant="body1" gutterBottom className="text-center text-[16px]">
          Gender
        </Typography>
      </div>
      <div className="w-full flex justify-center gap-[20px]">
        <Button
          onClick={() => setGenderInfo('Male')}
          className="rounded-2 h-[40px]"
          variant={genderInfo == 'Male' ? 'contained' : 'outlined'}
          aria-label="Male"
          type="button"
        >
          Male
        </Button>
        <Button
          onClick={() => setGenderInfo('Female')}
          className="rounded-2 h-[40px]"
          variant={genderInfo == 'Female' ? 'contained' : 'outlined'}
          aria-label="Male"
          type="button"
        >
          Female
        </Button>
      </div>
    </div>
  );
};

export default GenderSelect;
