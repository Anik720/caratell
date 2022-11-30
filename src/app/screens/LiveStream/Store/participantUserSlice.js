import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { setSelectedContactId } from './contactsSlice';
// import { closeMobileChatsSidebar } from './sidebarsSlice';
// import { updateUserChatList } from './userSlice';

export const getUsernameAndRoomName = createAsyncThunk(
  'liveStreamApp/liveStream/getUsernameAndRoomName',
  async ({ username, roomName }, { dispatch, getState }) => {
    // const { id: userId } = getState().chatApp.user;
    console.log('Username', username);
    dispatch(getRemoteUsername({ remoteParticipants: username }));
    // const response = await axios.get('/api/chat/get-chat', {
    //   params: {
    //     contactId,
    //     userId,
    //   },
    // });
    // const { chat, userChatList } = await response.data;

    // dispatch(setSelectedContactId(contactId));
    // dispatch(updateUserChatList(userChatList));

    // if (isMobile) {
    //   dispatch(closeMobileChatsSidebar());
    // }
    const usernameAndRoomName = {
      Username: username || '',
      RoomName: roomName || '',
    };
    return usernameAndRoomName;
  }
);
export const getRemoteUsername = createAsyncThunk(
  'liveStreamApp/liveStream/getRemoteUsername',
  async ({ remoteParticipants }, { dispatch, getState }) => {
    // const { id: userId } = getState().chatApp.user;
    console.log('remoteParticipantss', remoteParticipants);
    // const response = await axios.get('/api/chat/get-chat', {
    //   params: {
    //     contactId,
    //     userId,
    //   },
    // });
    // const { chat, userChatList } = await response.data;

    // dispatch(setSelectedContactId(contactId));
    // dispatch(updateUserChatList(userChatList));

    // if (isMobile) {
    //   dispatch(closeMobileChatsSidebar());
    // }
    const username = {
      remoteUsername: remoteParticipants || [],
    };
    return username;
  }
);

const videoUserSlice = createSlice({
  name: 'liveStreamApp/liveStream',
  initialState: null,
  reducers: {
    // getRemoteUsername: (state, action) => action.payload,
  },
  extraReducers: {
    [getRemoteUsername.fulfilled]: (state, action) => action.payload,
  },
});

export default videoUserSlice.reducer;
