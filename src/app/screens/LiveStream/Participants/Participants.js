import React from 'react';
import Topbar from '../Upcoming/Topbar';
import VideoChat from '../Upcoming/VideoChat';
import { useDispatch, useSelector } from 'react-redux';
const Participants = () => {
  let remoteParticipantsName = [];
  remoteParticipantsName =
    useSelector((state) => {
      if (state?.videoUserSlice?.remoteUsername) {
        return state?.videoUserSlice?.remoteUsername;
      }
    }) || [];
  console.log('remoteParticipantsName', remoteParticipantsName);
  let names = [];
  if (remoteParticipantsName.length > 0) {
    names = remoteParticipantsName.map((name) => {
      return name?.identity;
    });
  }
console.log("names",names)
  const dummyUser = [
    {
      name: 'Florencio Dorrance',
    },
    {
      name: 'Harun',
    },
    {
      name: 'Harun',
    },
    {
      name: 'Harun',
    },
    {
      name: 'Harun',
    },
    // {
    //   name: 'Harun',
    // },
    // {
    //   name: 'Harun',
    // },
    // {
    //   name: 'Harun',
    // },
    // {
    //   name: 'Harun',
    // },
    // {
    //   name: 'Harun',
    // },
    // {
    //   name: 'Harun',
    // },
    // {
    //   name: 'Harun',
    // },
    // {
    //   name: 'Harun',
    // },
    // {
    //   name: 'Harun',
    // },
    // {
    //   name: 'Harun',
    // },
    // {
    //   name: 'Harun',
    // },
    // {
    //   name: 'Harun',
    // },
    // {
    //   name: 'Harun',
    // },
  ];
  return (
    <div
      className="grid lg:grid-cols-2 md:grid-cols-1 gap-2  h-screen"
      style={{
        marginTop: '-30px',
      }}
    >
      <div>
        <Topbar></Topbar>
        <div
          class="grid lg:grid-cols-2 gap-x-20 mx-10 mb-48"
          style={{
            marginTop: '32px',
          }}
        >
          {names.map((x) => (
            <div className="flex justify-between mb-10">
              <div>
                <img
                  src="https://www.shareicon.net/data/512x512/2016/09/15/829459_man_512x512.png"
                  style={{
                    width: '24px',
                    height: '24px',
                    marginRight: '46px',
                  }}
                />
              </div>
              <div
                style={{
                  width: '271px',
                  height: '22px',
                  border: 'none',
                  fontFamily: 'SF Pro Text',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  fontSize: '14px',
                }}
              >
                <div className="">{x} </div>
              </div>{' '}
              <div>
                {' '}
                <i
                  class="fa fa-microphone"
                  style={{
                    width: '18px',
                    height: '18px',
                    color: 'blue',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center align-items-center my-10">
          <div className="mx-10">
            <button
              className="btn bg-transparent text-black"
              style={{
                border: 'none',
                fontFamily: 'SF Pro Text',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '14px',
                marginRight: '16px',
              }}
            >
              Mute All
            </button>
          </div>
          <div>
            <button
              className="btn bg-transparent text-black"
              style={{
                border: 'none',
                fontFamily: 'SF Pro Text',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '14px',
              }}
            >
              Unmute All
            </button>
          </div>
        </div>
        <div className="border border-x-4 border-slate-500  mb-20"></div>
        {/* Customer profile section and KYC */}
        <div className="grid lg:grid-cols-2 gap-20 mx-10">
          {/* Customer Profile */}
          <div>
            <h1
              style={{
                width: ' 133px',
                height: '24px',
                fontFamily: 'SF Pro Text',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '16px',
                color: '#000000',
                lineHeight: '24px',
                marginLeft: '24px',
              }}
            >
              Customer Profile
            </h1>
            <div className="flex justify-between mt-32">
              <div className="avatar ">
                <div>
                  <img
                    src="https://placeimg.com/192/192/people"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      marginLeft: '36px',
                      marginBottom: '21px',
                    }}
                  />
                </div>
              </div>
              <div className="">
                <p className="font-bold" style={{}}>
                  Alfonzo Schuessler
                </p>
                <p className="font-bold text-current">Memeber since Jan 2022</p>
              </div>
            </div>
            <p
              className="mb-20"
              style={{
                width: '108px',
                height: '22px',
                left: '288px',
                fontFamily: 'SF Pro Text',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '14px',
                color: '#000000',
                marginLeft: '32px',
              }}
            >
              (65) 8888 8888
            </p>
            <p
              className="mt-10 mb-20"
              style={{
                width: '200px',
                height: '22px',
                left: '288px',
                fontFamily: 'SF Pro Text',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '14px',
                color: '#000000',
                marginLeft: '32px',
              }}
            >
              alfonzoschuessler@gmail.com
            </p>
            <p
              className="font-bold"
              style={{
                width: '308px',
                height: '22px',
                left: '288px',

                fontFamily: 'SF Pro Text',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '14px',
                color: '#000000',
                marginLeft: '32px',
              }}
            >
              Blk 123 Ang Mo Kio St 21
            </p>
            <p
              className="font-bold"
              style={{
                width: '108px',
                height: '22px',
                left: '288px',

                fontFamily: 'SF Pro Text',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '14px',
                color: '#000000',
                marginLeft: '32px',
              }}
            >
              #12-34
            </p>
            <p
              className="font-bold"
              style={{
                width: '108px',
                height: '22px',
                left: '288px',

                fontFamily: 'SF Pro Text',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '14px',
                color: '#000000',
                marginLeft: '32px',
              }}
            >
              Singapore 123456
            </p>
          </div>
          {/* KYC */}
          <div>
            <h1
              style={{
                width: '34px',
                height: '24px',
                left: '288px',
                fontFamily: 'SF Pro Text',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '16px',
                color: '#000000',
                marginLeft: '32px',
              }}
            >
              KYC
            </h1>
            <div className="flex justify-between mt-32">
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-HE9vwYkKEo2qxwC0lhi6-PauenETUVSew&usqp=CAU"
                  className="w-60 h-60"
                />
                <p className="text-center">Heart</p>
              </div>
              <div>
                <img
                  src="data:image/png;base64,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"
                  className="w-60 h-60"
                />
                <p className="text-center">Warm</p>
              </div>
              <div>
                <img
                  src="data:image/jpeg;base64,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"
                  className="w-60 h-60"
                />
                <p className="text-center">Olive</p>
              </div>
            </div>

            <div>
              <div className="grid lg:grid-cols-3 gap-20 mt-20">
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-HE9vwYkKEo2qxwC0lhi6-PauenETUVSew&usqp=CAU"
                    className="w-60"
                  />
                  <p className="text-center">Bony</p>
                </div>
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-HE9vwYkKEo2qxwC0lhi6-PauenETUVSew&usqp=CAU"
                    className="w-60"
                  />
                  <p className="text-center">Front Facing</p>
                </div>
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-HE9vwYkKEo2qxwC0lhi6-PauenETUVSew&usqp=CAU"
                    className="w-60"
                  />
                  <p className="text-center">Attached</p>
                </div>
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-HE9vwYkKEo2qxwC0lhi6-PauenETUVSew&usqp=CAU"
                    className="w-60"
                  />
                  <p className="text-center">Thin</p>
                </div>
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-HE9vwYkKEo2qxwC0lhi6-PauenETUVSew&usqp=CAU"
                    className="w-60"
                  />
                  <p className="text-center">Curved Earlobe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="ring"
        style={{
          border: '0',
          marginTop: '-32px',
        }}
      >
        {/* <div  id="bottom">
          <button className="btn mx-10 mb-20 bg-gray-50 h-20"><i class="fa fa-microphone" style={{fontSize:"18px",color:"blue"}}></i></button>
          <button className="btn mx-10 mb-20 bg-gray-50"><i class="fa fa-video-camera" style={{fontSize:"18px",color:"blue"}}></i></button>
          <button className="btn mx-10 mb-20 bg-blue-500"><i class='fas fa-tty' style={{fontSize:"18px",color:"white"}}></i></button>
        </div> */}
        <VideoChat></VideoChat>
      </div>
    </div>
  );
};

export default Participants;
