import { Typography, Button } from '@mui/material';

const ProfileInfo = ({ personInfo, setPersonInfo }) => {
  const updateGender = (genderType) => {
    setPersonInfo((prevState) => ({
      ...prevState,
      profiles: {
        ...prevState.profiles,
        gender: genderType,
      },
    }));
  };

  const updateAgeRange = (event) => {
    setPersonInfo((prevState) => ({
      ...prevState,
      profiles: {
        ...prevState.profiles,
        age_range: event.target.innerText,
      },
    }));
  };

  return (
    <div className="flex justify-center flex-col">
      <div className="w-full mb-[24px]">
        <Typography variant="body1" gutterBottom className="text-center text-[16px]">
          Gender
        </Typography>
      </div>
      <div className="w-full flex justify-center gap-[20px]">
        <Button
          onClick={() => {
            updateGender('male');
          }}
          className="rounded-2 h-[40px]"
          variant={personInfo.profiles.gender == 'male' ? 'contained' : 'outlined'}
          aria-label="Male"
          type="button"
        >
          Male
        </Button>
        <Button
          onClick={() => {
            updateGender('female');
          }}
          className="rounded-2 h-[40px]"
          variant={personInfo.profiles.gender == 'female' ? 'contained' : 'outlined'}
          aria-label="Male"
          type="button"
        >
          Female
        </Button>
      </div>
      <div className="w-full my-[24px]">
        <Typography variant="body1" gutterBottom className="text-center text-[16px]">
          Age Range
        </Typography>
      </div>
      <div className="w-full flex justify-center gap-[20px]">
        <Button
          onClick={updateAgeRange}
          className="rounded-2 h-[40px]"
          variant={personInfo.profiles.age_range == '0-21' ? 'contained' : 'outlined'}
          aria-label="Male"
          type="button"
        >
          0-21
        </Button>
        <Button
          onClick={updateAgeRange}
          className="rounded-2 h-[40px]"
          variant={personInfo.profiles.age_range == '22-29' ? 'contained' : 'outlined'}
          aria-label="Female"
          type="button"
        >
          22-29
        </Button>
        <Button
          onClick={updateAgeRange}
          className="rounded-2 h-[40px]"
          variant={personInfo.profiles.age_range == '30-39' ? 'contained' : 'outlined'}
          aria-label="Female"
          type="button"
        >
          30-39
        </Button>
        <Button
          onClick={updateAgeRange}
          className="rounded-2 h-[40px]"
          variant={personInfo.profiles.age_range == '40-49' ? 'contained' : 'outlined'}
          aria-label="Female"
          type="button"
        >
          40-49
        </Button>
        <Button
          onClick={updateAgeRange}
          className="rounded-2 h-[40px]"
          variant={personInfo.profiles.age_range == '50-59' ? 'contained' : 'outlined'}
          aria-label="Female"
          type="button"
        >
          50-59
        </Button>
      </div>
    </div>
  );
};

export default ProfileInfo;
