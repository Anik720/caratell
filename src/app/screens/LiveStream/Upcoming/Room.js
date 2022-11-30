import React, { useEffect, useState } from 'react';
import Participant from './Participant';
import { getRemoteUsername } from '../Store/participantUserSlice';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
// import async from 'react-select/dist/declarations/src/async/index';
const Room = ({ roomName, room, handleLogout }) => {
  const dispatch = useDispatch();
  const [participants, setParticipants] = useState([]);
  const [videoEnabled, setVideo] = useState(true);
  const [audioEnabled, setAudio] = useState(true);
  const roomDetails = useSelector((state) => state.videoSlice);
  console.log('roomDetails', roomDetails);
  // useEffect(()=>{
  //   dispatch(getRemoteUsername({ participants }));
  // },[dispatch,participants])
  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) => prevParticipants.filter((p) => p !== participant));
    };

    room.on('participantConnected', participantConnected);
    room.on('participantDisconnected', participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off('participantConnected', participantConnected);
      room.off('participantDisconnected', participantDisconnected);
    };
  }, [dispatch, room, roomDetails]);
  //let remoteParticipants=[]
  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  // const asyncFunction = async () => {
  //   let remoteParticipantsName = [];
  //   remoteParticipantsName = participants.map((participant) => {
  //     return participant;
  //   });
  //   console.log('remoteParticipants from component', remoteParticipantsName);
  //   dispatch(getRemoteUsername({ remoteParticipants: remoteParticipantsName }));
  // };
  // asyncFunction();

  let remoteParticipantsName = [];

  setTimeout(() => {
    remoteParticipantsName = participants.map((participant) => {
      return participant;
    });
  }, 1000);
  setTimeout(() => {
    console.log('remoteParticipants from component', remoteParticipantsName);

    dispatch(getRemoteUsername({ remoteParticipants: remoteParticipantsName }));
  }, 3000);

  // if(remoteParticipants.length>0){
  //   dispatch(getRemoteUsername({ remoteParticipants }));
  // }
  console.log('remoteParticipants', remoteParticipants);
  const handleAudio = () => {
    if (audioEnabled) {
      room.localParticipant.audioTracks.forEach((publication) => {
        publication.track.disable();
      });

      setAudio((prevState) => !prevState);
    } else {
      room.localParticipant.audioTracks.forEach((publication) => {
        publication.track.enable();
      });

      setAudio((prevState) => !prevState);
    }
  };
  const handleVideo = () => {
    if (videoEnabled) {
      room.localParticipant.videoTracks.forEach((publication) => {
        publication.track.disable();
      });
      setVideo((prevState) => !prevState);
    } else {
      room.localParticipant.videoTracks.forEach((publication) => {
        publication.track.enable();
      });
      setVideo((prevState) => !prevState);
    }
  };
  return (
    <div className="grid lg:grid-cols-1 md:grid-cols-1 gap-2  h-screen">
      <div
        style={{
          width: '120px',
          height: '40px',

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '8px 16px',
          marginLeft: '24px',
        }}
      >
        {/* <br />
        <button onClick={handleAudio}>Audio is {audioEnabled ? 'ON' : 'OFF'}</button>
        <br /> */}
        <button
          onClick={handleVideo}
          style={{
            width: '120px',
            height: '40px',
            fontFamily: 'SF Pro Text',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '16px',
            padding: '8px 16px',
            backgroundColor: '#7D7D7D',
            marginLeft: '24px',
            marginTop: '24px',
            color: '#FFFFFF',
          }}
        >
          Your Camera
        </button>

        {/* <br /> */}
      </div>
      <div
        style={{
          zIndex: '9',
          margin: '20px',
        }}
      >
        <div
          className=""
          style={{
            width: '149.56px',
            height: ' 82.17px',
          }}
        >
          {remoteParticipants}
        </div>
      </div>

      <div
        className=""
        // style={{
        //   width: '100%',
        //   height: '100%',
        // }}
      >
        {/* <h2>Room: {roomName}</h2>
        <button onClick={handleLogout}>Log out</button> */}

        <div className="">
          {room ? (
            <Participant key={room.localParticipant.sid} participant={room.localParticipant} />
          ) : (
            ''
          )}
        </div>
        <div className="mt-10">
          <div className="flex justify-center">
            <button className="btn mx-10 mb-20 bg-gray-50 h-20" onClick={handleAudio}>
              <i class="fa fa-microphone" style={{ fontSize: '18px', color: 'blue' }}></i>
            </button>
            <button className="btn mx-10 mb-20 bg-gray-50" onClick={handleVideo}>
              <i class="fa fa-video-camera" style={{ fontSize: '18px', color: 'blue' }}></i>
            </button>
            <button className="btn mx-10 mb-20 bg-blue-500" onClick={handleLogout}>
              <i class="fas fa-tty" style={{ fontSize: '18px', color: 'white' }}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
