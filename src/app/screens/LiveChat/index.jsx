/* eslint-disable unused-imports/no-unused-imports */
import React from 'react';
import { Grid, Paper, Icon, AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import { Client as ConversationsClient } from '@twilio/conversations';
import api from 'app/APIs/caratell-service/apiService';
import { setChatDetails, setConversations } from 'app/store/appstore/chatStore/liveChatSlice';
import { connect, useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import ChatListSideBar from './ChatListSideBar';
import Conversation from './Conversation';
import StatusIcon from './StatusIcon';
import CustomerProfile from './CustomerProfile';

const ADMIN_CHAT_IDENTITY = 'superadmin@caratell.com';

const HeaderItem = ({ children, style }) => {
  const finalStyle = { padding: '0 19px 0 19px', ...style };

  return <div style={finalStyle}>{children}</div>;
};

class LiveChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    const { chatDetails } = this.props.chatStore;
    if (chatDetails.status == 'idle') {
      this.props.dispatch(setChatDetails({ status: 'loading' }));
      const twilioToken = await this.getToken({ shouldNew: false });
      this.props.dispatch(setChatDetails({ token: twilioToken }));
      this.initConversations();
    }
  };

  getToken = async ({ shouldNew }) => {
    const twilioToken = localStorage.getItem('twilioToken');
    if (!twilioToken || shouldNew) {
      const { result } = await api.getTwilioToken(ADMIN_CHAT_IDENTITY);
      localStorage.setItem('twilioToken', result);
      return result;
    }
    return twilioToken;
  };

  initConversations = async () => {
    try {
      const { token } = this.props.chatStore.chatDetails;
      this.conversationsClient = await ConversationsClient.create(token);
      this.props.dispatch(setChatDetails({ statusString: 'Connecting to Twilio…' }));
      this.conversationsClient.on('tokenExpired', () => {
        this.props.dispatch(setChatDetails({ statusString: 'Token expired. Fetching new token…' }));
        this.getToken({ shouldNew: true }).then((newToken) => {
          this.conversationsClient.updateToken(newToken);
          this.props.dispatch(setChatDetails({ token: newToken }));
        });
      });

      this.conversationsClient.on('connectionStateChanged', (state) => {
        if (state === 'connecting')
          this.props.dispatch(
            setChatDetails({
              statusString: 'Connecting to Twilio…',
              status: 'default',
            })
          );
        if (state === 'connected') {
          this.props.dispatch(
            setChatDetails({
              statusString: `You are connected )`,
              status: 'success',
            })
          );
        }
        if (state === 'disconnecting')
          this.props.dispatch(
            setChatDetails({
              statusString: 'Disconnecting from Twilio…',
              status: 'default',
            })
          );
        if (state === 'disconnected')
          this.props.dispatch(
            setChatDetails({
              statusString: 'Disconnected.',
              status: 'warning',
            })
          );
        if (state === 'denied')
          this.props.dispatch(
            setChatDetails({
              statusString: 'Failed to connect.',
              status: 'error',
            })
          );
      });
      this.conversationsClient.on('conversationJoined', (conversation) => {
        this.props.dispatch(setConversations({ conversation }));
      });
      this.conversationsClient.on('conversationLeft', (thisConversation) => {
        // this.setState((prev) => ({
        //   conversations: [...prev.filter((it) => it !== thisConversation)],
        // }));
      });
    } catch (err) {
      this.props.dispatch(showMessage({ message: err.message, variant: 'error' }));
      this.props.dispatch(setChatDetails({ status: 'error', statusString: err.message }));
      localStorage.removeItem('twilioToken');
    }
  };

  render() {
    const { conversations, allConversations, selectedConversationSid, status, statusString } =
      this.props.chatStore.chatDetails;

    if (status == 'error') {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Icon style={{ fontSize: 100, color: 'red' }}>error</Icon>
            <Typography variant="h5" style={{ color: 'red' }}>
              {statusString}
            </Typography>
          </div>
        </div>
      );
    }

    const selectedConversation = conversations.find((it) => it.sid === selectedConversationSid);

    return (
      <Grid container spacing={2} columns={12} className="h-full">
        <Grid item xs={3} className="border-r-1">
          <ChatListSideBar
            conversations={conversations}
            selectedConversationSid={selectedConversationSid}
            onConversationClick={(item) => {
              this.props.dispatch(setChatDetails({ selectedConversationSid: item.sid }));
            }}
          />
        </Grid>
        {selectedConversation ? (
          <>
            <Grid
              item
              xs={6}
              sx={{
                height: '86vh !important',
                paddingLeft: '0 !important',
              }}
            >
              <AppBar
                className="w-full border-b-1 border-grey-300"
                elevation={0}
                position="static"
                color="white"
              >
                <Toolbar className="px-16 flex justify-between">
                  <div>
                    <div className="flex items-center cursor-pointer">
                      <div className="relative mx-8">
                        <div className="absolute right-0 bottom-0 -m-4 z-10">
                          <StatusIcon status="online" />
                        </div>

                        <Avatar
                          src="https://i.pravatar.cc/300"
                          alt="person_avatar"
                          variant="rounded"
                        />
                      </div>
                      <Typography color="inherit" className="text-18 font-semibold px-4">
                        {selectedConversation.channelState.friendlyName || ''}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button className="text-[12px] font-[400] text-orange-800 px-[8px]">
                      Delete Chat
                    </Button>
                  </div>
                </Toolbar>
              </AppBar>
              <Conversation
                conversationProxy={selectedConversation}
                myIdentity={ADMIN_CHAT_IDENTITY}
              />
            </Grid>
            <Grid
              item
              xs={3}
              className="h-[85vh]"
              sx={{
                paddingLeft: '0 !important',
                overflowY: 'auto',
              }}
            >
              <CustomerProfile
                customerEmail={selectedConversation?.channelState?.uniqueName || ''}
              />
            </Grid>
          </>
        ) : (
          <div className="flex flex-col flex-1 items-center justify-center p-24 h-full">
            <Paper className="rounded-full p-48 md:p-64 shadow-xl">
              <Icon className="block text-48 md:text-64" color="secondary">
                chat
              </Icon>
            </Paper>
            <Typography variant="h6" className="mt-24 mb-12 text-32 font-700">
              Chat App
            </Typography>
            <Typography
              className="hidden md:flex px-16 pb-24 text-16 text-center"
              color="textSecondary"
            >
              Select a contact to start a conversation!..
            </Typography>
          </div>
        )}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  chatStore: state?.appstore?.liveChat || {},
});

export default connect(mapStateToProps)(LiveChat);
