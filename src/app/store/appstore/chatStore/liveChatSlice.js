import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import api from 'app/APIs/caratell-service/apiService';

export const getCustomerProfile = createAsyncThunk(
  '/get-customer-profile/',
  async (payload, { dispatch, getState }) => {
    const { customerEmail } = payload;
    const response = await api.getCustomerProfile(customerEmail);
    return response;
  }
);

const liveChatSlice = createSlice({
  name: 'liveChat',
  initialState: {
    searchText: '',
    customerProfile: {
      status: 'idle',
      data: {
        userDetails: null,
        ordreDetails: null,
      },
      error: null,
    },
    chatDetails: {
      status: 'idle',
      statusString: '',
      twilioToken: '',
      conversations: [],
      allConversations: [],
      selectedConversationSid: null,
    },
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setStatus: (state, action) => {
      state.chatDetails.status = action.payload;
    },
    setStatusString: (state, action) => {
      state.chatDetails.statusString = action.payload;
    },
    setTwilioToken: (state, action) => {
      state.chatDetails.twilioToken = action.payload;
    },
    setConversations: (state, action) => {
      const { conversation } = action.payload;
      if (state.chatDetails.conversations.length === 0) {
        state.chatDetails.conversations.push(conversation);
      }
      const conversationIndex = _.findIndex(state.chatDetails.conversations, {
        sid: conversation.sid,
      });
      if (conversationIndex === -1) {
        state.chatDetails.conversations.push(conversation);
      } else {
        state.chatDetails.conversations[conversationIndex] = conversation;
      }
    },
    filterConverstationByUserName: (state, action) => {
      const { userName } = action.payload;
      const filteredConversations = state.chatDetails.allConversations.filter((conversation) => {
        const { friendlyName } = conversation;
        return friendlyName.includes(userName);
      });
      state.chatDetails.conversations = filteredConversations;
    },
    setAllConversations: (state, action) => {
      state.chatDetails.allConversations = action.payload;
    },
    setSelectedConversationSid: (state, action) => {
      state.chatDetails.selectedConversationSid = action.payload;
    },
    setChatDetails: (state, action) => {
      state.chatDetails = {
        ...state.chatDetails,
        ...action.payload,
      };
    },
  },
  extraReducers: {
    [getCustomerProfile.fulfilled]: (state, action) => {
      state.customerProfile.status = 'succeeded';
      state.customerProfile.data = action.payload;
    },
  },
});

export const getUserData = (state, userEmail) => {
  const { users } = state.liveChat;
  const user = _.find(users.data, { email: userEmail });
  return user;
};

export const {
  setDataSF,
  setChatDetails,
  setBlogTab,
  setStatus,
  setStatusString,
  setConversations,
  setAllConversations,
  setSelectedConversationSid,
  setTwilioToken,
} = liveChatSlice.actions;

export default liveChatSlice.reducer;
