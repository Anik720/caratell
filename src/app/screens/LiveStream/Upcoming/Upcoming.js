import clsx from 'clsx';
import { Typography, Tooltip, Button, Box } from '@mui/material';
import ListOfParticipants from './ListOfParticipants';
import Topbar from './Topbar';
import ListOfSchedules from './ListOfSchedules';
import React, { useState, useCallback, useEffect } from 'react';
import Lobby from './Lobby';
import Room from './Room';
import { getTwilioTokenVideo } from '../../api/auth.api';
import { useNavigate } from 'react-router-dom';
import VideoChat from './VideoChat';

const tabItmes = [
  {
    label: 'All',
    value: 'All',
  },
  {
    label: 'All',
    value: 'All',
  },
  {
    label: 'All',
    value: 'All',
  },
  {
    label: 'All',
    value: 'All',
  },
];

const dummy = [
  {
    image:
      'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg',
    name: 'Titus Kitamura',
    status: 'In Call with Admin 1',
    icon: '',
  },
  {
    image:
      'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg',
    name: 'Titus Kitamura',
    status: 'Queue',
    icon: '',
  },
  {
    image:
      'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg',
    name: 'Titus Kitamura',
    status: 'In Call with Admin 1',
    icon: '',
  },
];
function Upcoming() {
  const [username, setUsername] = useState('Admin');
  const [roomName, setRoomName] = useState('Caratell Shop Live');
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const navigate = useNavigate();
  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setConnecting(true);
      try {
        const data = await getTwilioTokenVideo({ identity: username, room: roomName });
        if (!data.error) {
          console.log('Apart ', data);
          Video.connect(data.twilioToken, {
            name: roomName,
          })
            .then((room) => {
              setConnecting(false);
              setRoom(room);
            })
            .catch((err) => {
              console.error(err);
              setConnecting(false);
            });
        } else {
        }
      } catch (error) {}

      //////////////////////////////////////////////////
      // fetch("/video/token", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     identity: username,
      //     room: roomName,
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }).then((res) => res.json());
      // Video.connect(data.token, {
      //   name: roomName,
      // })
      //   .then((room) => {
      //     setConnecting(false);
      //     setRoom(room);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     setConnecting(false);
      //   });
      //////////////////////////////////////////////////
    },
    [roomName, username]
  );

  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener('pagehide', tidyUp);
      window.addEventListener('beforeunload', tidyUp);
      return () => {
        window.removeEventListener('pagehide', tidyUp);
        window.removeEventListener('beforeunload', tidyUp);
      };
    }
  }, [room, handleLogout]);

  const handleVideo = (e) => {
    e.preventDefault();
    console.log('hello');
    navigate('/lobby');
  };
  return (
    <div
      className="grid lg:grid-cols-2 md:grid-cols-1  h-screen"
      style={{
        marginTop: '-30px',
      }}
    >
      <div className="">
        <div>
          <Topbar></Topbar>

          <h1
            className=" text-xl font-bold"
            style={{ marginTop: '12px', marginLeft: '29px', marginBottom: '16px' }}
          >
            Queuing
          </h1>

          {dummy.map((x) => (
            <ListOfParticipants data={x}></ListOfParticipants>
          ))}
        </div>

        <div>
          <h1
            className=" text-xl font-bold"
            style={{ marginTop: '12px', marginLeft: '29px', marginBottom: '16px' }}
          >
            Scheduled
          </h1>
          {dummy.map((x) => (
            <ListOfSchedules data={x}></ListOfSchedules>
          ))}
        </div>
      </div>
      {/* <div className="ring w-screen">
        <div className="stream-button">
          <div className="Your-Camera">
            <button
              className=""
              style={{
                width: '105px',
                height: '38px',
                backgroundColor: '#7D7D7D',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 10px',
              }}
            >
              <p
                style={{
                  width: '89px',
                  height: '22px',
                  fontFamily: 'SF Pro Text',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  fontSize: '14px',
                  color: '#FFFFFF',
                }}
              >
                {' '}
                Your Camera
              </p>
            </button>
          </div>
          <div className="Your-Camera">
            <button
              className=""
              style={{
                width: '120px',
                height: '40px',
                backgroundColor: ' #1890FF',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 16px',
                marginRight: '24px',
              }}
            >
              <p
                style={{
                  width: '88px',
                  height: '24px',
                  fontFamily: 'SF Pro Text',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '16px',
                  color: '#FFFFFF',
                }}
                onClick={handleVideo}
              >
                {' '}
                Enter Room
              </p>
            </button>
            
          </div>
        </div>
      </div> */}
      <div className='ring' style={{
        border:"0",
        marginTop:"-30px"
      }}>
        <VideoChat></VideoChat>
      </div>
    </div>
  );
}

export default Upcoming;
