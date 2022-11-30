import clsx from 'clsx';
import { CIMG } from 'app/components';
import { Grid } from '@mui/material';

const NeckBox = ({ necklineObject, personInfo, onClickHandler }) => {
  return (
    <div className="flex justify-center items-center flex-col shadown-md">
      <div
        className={clsx(
          'flex w-full justify-center h-full items-center rounded-4 hover:cursor-pointer relative'
        )}
        onClick={() => {
          onClickHandler(necklineObject);
        }}
      >
        <div className="flex justify-center flex-col items-center h-full">
          <CIMG
            src={necklineObject.image}
            sw="100px"
            hw="100px"
            w="100%"
            className={clsx(
              'mb-[5px] rounded-4',
              personInfo.necklines.find(
                (neckline) => neckline.neckline_id === necklineObject.neckline_id
              ) && 'border-1 border-green'
            )}
            alt="neckline"
          />
          <div className="text-center text-[16px]">{necklineObject.title}</div>
        </div>
      </div>
    </div>
  );
};

const NecklineInfo = ({ personInfo, setPersonInfo, kycDetails }) => {
  const getSelectedNecklines = (previousNecklines, newNeckLine) => {
    if (previousNecklines.find((neckline) => neckline.neckline_id === newNeckLine.neckline_id)) {
      return previousNecklines.filter(
        (neckline) => neckline.neckline_id !== newNeckLine.neckline_id
      );
    }
    return [...previousNecklines, newNeckLine];
  };

  const onClickHandler = (neckType) => {
    setPersonInfo((prevState) => {
      return {
        ...prevState,
        necklines: getSelectedNecklines(prevState.necklines, neckType),
      };
    });
  };

  return (
    <div className="flex justify-center flex-col w-full">
      <Grid container spacing={2} columns={12}>
        {kycDetails.necklines &&
          kycDetails.necklines.map((neckline, index) => (
            <Grid item xs={3} key={index}>
              <NeckBox
                key={index}
                necklineObject={neckline}
                personInfo={personInfo}
                onClickHandler={onClickHandler}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default NecklineInfo;
