import { Typography } from '@mui/material';
import clsx from 'clsx';
import { CIMG } from 'app/components';

const skinTones = [
  {
    title: 'Warm',
    iconSRC: 'assets/images/skinTones/Warm.svg',
  },
  {
    title: 'Cool',
    iconSRC: 'assets/images/skinTones/Cool.svg',
  },
  {
    title: 'neutral',
    iconSRC: 'assets/images/skinTones/Neutral.svg',
  },
];

const underTones = [
  {
    title: 'Yellow',
    iconSRC: 'assets/images/skinTones/Yellow.svg',
  },
  {
    title: 'Pink',
    iconSRC: 'assets/images/skinTones/Pink.svg',
  },
  {
    title: 'Olive',
    iconSRC: 'assets/images/skinTones/Olive.svg',
  },
  {
    title: 'dark',
    iconSRC: 'assets/images/skinTones/Dark.svg',
  },
];

const ToneBox = ({ title, imgSRC, personInfo, imgSize, isUnder, onClickHandler }) => {
  return (
    <div className="w-[100px]">
      <div
        className={clsx(
          'flex justify-center w-full h-full p-[16px] items-center rounded-4 shadow-2xl hover:cursor-pointer relative',
          personInfo.skins.tone === title || personInfo.skins.underTone === title
            ? 'bg-gray-200 border-1 border-green'
            : 'bg-white'
        )}
        onClick={() => {
          onClickHandler(title, isUnder);
        }}
      >
        <div className={clsx('flex justify-center flex-col items-center h-full')}>
          <CIMG src={imgSRC} className="mb-[15px]" alt="skin" w={`w-[${imgSize}]`} />
          <div className="text-center text-[16px]">{title}</div>
        </div>
      </div>
    </div>
  );
};

const SkinInfo = ({ personInfo, setPersonInfo }) => {
  const onClickHandler = (toneType, isUnder) => {
    if (isUnder) {
      setPersonInfo((prevState) => {
        return {
          ...prevState,
          skins: {
            ...prevState.skins,
            underTone: toneType,
          },
        };
      });
      return;
    }
    setPersonInfo((prevState) => {
      return {
        ...prevState,
        skins: {
          ...prevState.skins,
          tone: toneType,
        },
      };
    });
  };

  return (
    <div className="flex justify-center flex-col w-full">
      <div className="w-full mb-[24px]">
        <Typography variant="body1" gutterBottom className="text-center text-[16px]">
          Skin Tone
        </Typography>
      </div>
      <div className="flex justify-around flex-row w-[75%] mx-auto gap-[25px]">
        {skinTones.map((skinTone, index) => (
          <ToneBox
            key={index}
            title={skinTone.title}
            imgSRC={skinTone.iconSRC}
            personInfo={personInfo}
            onClickHandler={onClickHandler}
            imgSize="20px"
          />
        ))}
      </div>
      <div className="w-full mb-[24px] mt-[30px]">
        <Typography variant="body1" gutterBottom className="text-center text-[16px]">
          Skin Undertone
        </Typography>
      </div>
      <div className="flex justify-around flex-row w-full mx-auto gap-[25px]">
        {underTones.map((tone, index) => (
          <ToneBox
            key={index}
            title={tone.title}
            imgSRC={tone.iconSRC}
            personInfo={personInfo}
            onClickHandler={onClickHandler}
            isUnder
            imgSize="64px"
          />
        ))}
      </div>
    </div>
  );
};

export default SkinInfo;
