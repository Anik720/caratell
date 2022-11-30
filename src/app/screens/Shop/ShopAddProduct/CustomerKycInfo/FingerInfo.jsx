import clsx from 'clsx';
import { CIMG } from 'app/components';

const ToneBox = ({ fingerObject, personInfo, onClickHandler }) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div
        className={clsx(
          'flex w-[120px] justify-center h-full items-center rounded-4 hover:cursor-pointer relative'
        )}
        onClick={() => {
          onClickHandler(fingerObject);
        }}
      >
        <div className="flex justify-center flex-col items-center h-full">
          <CIMG
            src={fingerObject.image}
            w="100%"
            className={clsx(
              'mb-[5px] rounded-4',
              personInfo.fingers.find((finger) => finger.finger_id === fingerObject.finger_id) &&
                'border-1 border-green'
            )}
            alt="finger"
          />
          <div className="text-center text-[16px]">{fingerObject.title}</div>
        </div>
      </div>
    </div>
  );
};

const FingerInfo = ({ personInfo, setPersonInfo, kycDetails }) => {
  const getSelectedFingers = (previousFingers, newFinger) => {
    if (previousFingers.find((finger) => finger.finger_id === newFinger.finger_id)) {
      return previousFingers.filter((finger) => finger.finger_id !== newFinger.finger_id);
    }
    return [...previousFingers, newFinger];
  };

  const onClickHandler = (fignerType) => {
    setPersonInfo((prevState) => {
      return {
        ...prevState,
        fingers: getSelectedFingers(prevState.fingers, fignerType),
      };
    });
  };

  return (
    <div className="flex justify-center flex-col w-full">
      <div className="w-full grid gap-y-[20px] gap-x-10 grid-cols-3">
        {kycDetails.fingers &&
          kycDetails.fingers.map((finger, index) => (
            <ToneBox
              key={index}
              fingerObject={finger}
              personInfo={personInfo}
              onClickHandler={onClickHandler}
            />
          ))}
      </div>
    </div>
  );
};

export default FingerInfo;
