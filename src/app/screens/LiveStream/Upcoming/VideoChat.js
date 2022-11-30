import React, { useState, useCallback, useEffect } from 'react';
import Video from 'twilio-video';
import './App.css';
import Lobby from './Lobby';
import Room from './Room';
import { getUsernameAndRoomName } from '../Store/videoSlice';
import { getTwilioTokenVideo } from '../../api/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import VideoTab from './VideoTab';

const VideoChat = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const roomDetails = useSelector((state) => state.videoSlice);
  // console.log('roomDetails', roomDetails);
  useEffect(() => {
    const fun = async () => {
      if (roomName.length > 0) {
        dispatch(getUsernameAndRoomName({ username, roomName }));
      }

      if (roomDetails.RoomName.length > 0) {
        const data = await getTwilioTokenVideo({
          identity: roomDetails.Username,
          room: roomDetails.RoomName,
        });
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
      }
    };
    fun();
  }, [dispatch,username,roomName]);

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
        console.log(username);
        console.log(roomName);
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

  let render;
  if (room) {
    render = <Room roomName={roomName} room={room} handleLogout={handleLogout} />;
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
        connecting={connecting}
      />
    );
  }
  return (
    <div
      className="ring w-screen"
      style={{
        marginTop: '32px',
        border: 'none',
      }}
    >
      {/* The button to open modal */}
      <div>
        {room ? (
          <div className="">
            <Room roomName={roomName} room={room} handleLogout={handleLogout} />
          </div>
        ) : (
          <div className="Your-Camera" style={{}}>
            <div
              className="enter-button"
              style={{
                width: '120px',
                height: '40px',
                backgroundColor: '#1890FF',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 16px',
                marginRight: '24px',
                marginTop: '42px',
              }}
            >
              <label
                htmlFor="my-modal"
                style={{
                  width: '88px',
                  height: '24px',
                  fontFamily: 'SF Pro Text',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '16px',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                }}
              >
                Enter Room
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          {/* <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to use Wikipedia for
            free!
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Yay!
            </label>
          </div> */}
          <Lobby
            username={username}
            roomName={roomName}
            handleUsernameChange={handleUsernameChange}
            handleRoomNameChange={handleRoomNameChange}
            handleSubmit={handleSubmit}
            connecting={connecting}
          />
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
