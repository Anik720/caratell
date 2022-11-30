import { Grid } from '@mui/material';
import clsx from 'clsx';
import { CIMG } from 'app/components';

const FaceBox = ({ faceObject, personInfo, onClickHandler }) => {
  return (
    <Grid item md={4}>
      <div
        className={clsx(
          'flex justify-center items-center rounded-4 shadow-2xl hover:cursor-pointer relative',
          personInfo.faces.find((face) => face.face_id === faceObject.face_id)
            ? 'bg-gray-200 border-1 border-green'
            : 'bg-white'
        )}
        onClick={() => {
          onClickHandler(faceObject);
        }}
      >
        <div className="flex justify-center flex-col items-center p-[3px]">
          <CIMG
            src={faceObject.image}
            sw="100px"
            hw="100px"
            w="100%"
            className={clsx('mb-[5px] rounded-4')}
            alt="face"
          />
          <div className="text-center text-[16px]">{faceObject.title}</div>
        </div>
      </div>
    </Grid>
  );
};

const FaceInfo = ({ personInfo, setPersonInfo, kycDetails }) => {
  const getSelectedFaces = (previousFaces, newFace) => {
    if (previousFaces.find((face) => face.face_id === newFace.face_id)) {
      return previousFaces.filter((face) => face.face_id !== newFace.face_id);
    }
    return [...previousFaces, newFace];
  };

  const onClickHandler = (faceType) => {
    setPersonInfo((prevState) => {
      return {
        ...prevState,
        faces: getSelectedFaces(prevState.faces, faceType),
      };
    });
  };
  return (
    <div className="flex justify-center flex-col">
      <Grid container spacing={4}>
        {kycDetails.faces &&
          kycDetails.faces.map((faceType, index) => (
            <FaceBox
              key={index}
              faceObject={faceType}
              personInfo={personInfo}
              onClickHandler={onClickHandler}
            />
          ))}
      </Grid>
    </div>
  );
};

export default FaceInfo;
