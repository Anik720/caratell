import clsx from 'clsx';
import { CIMG } from 'app/components';

const EarBox = ({ earObject, personInfo, onClickHandler }) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div
        className={clsx(
          'flex w-[120px] justify-center h-full items-center rounded-4 hover:cursor-pointer relative'
        )}
        onClick={() => {
          onClickHandler(earObject);
        }}
      >
        <div className="flex justify-center flex-col items-center h-full">
          <CIMG
            src={earObject.image}
            sw="100px"
            hw="100px"
            w="100%"
            className={clsx(
              'mb-[5px] rounded-4',
              personInfo.ears.find((ear) => ear.ear_id === earObject.ear_id) &&
                'border-1 border-green'
            )}
            alt="ear"
          />
          <div className="text-center text-[16px]">{earObject.title}</div>
        </div>
      </div>
    </div>
  );
};

const EarInfo = ({ personInfo, setPersonInfo, kycDetails }) => {
  const getSelectedEars = (previousEars, newEar) => {
    if (previousEars.find((ear) => ear.ear_id === newEar.ear_id)) {
      return previousEars.filter((ear) => ear.ear_id !== newEar.ear_id);
    }
    return [...previousEars, newEar];
  };

  const onClickHandler = (earType) => {
    setPersonInfo((prevState) => {
      return {
        ...prevState,
        ears: getSelectedEars(prevState.ears, earType),
      };
    });
  };

  return (
    <div className="flex justify-center flex-col w-full">
      <div className="w-full grid gap-y-[20px] gap-x-10 grid-cols-3">
        {kycDetails.ears &&
          kycDetails.ears.map((earType, index) => (
            <EarBox
              key={index}
              earObject={earType}
              personInfo={personInfo}
              onClickHandler={onClickHandler}
            />
          ))}
      </div>
    </div>
  );
};

export default EarInfo;
