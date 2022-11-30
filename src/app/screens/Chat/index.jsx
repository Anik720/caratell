import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GlobalStyles from '@mui/material/GlobalStyles';
import Chat from './Chat';
import ChatsSidebar from './ChatsSidebar';
import CustomerProfile from './CustomerProfile';
import StatusIcon from './StatusIcon';
import reducer from './store';
import { getUserData } from './store/userSlice';
import { selectContactById, getContacts } from './store/contactsSlice';
import { openContactSidebar, openMobileChatsSidebar } from './store/sidebarsSlice';
import MessageInput from './MessageInput';

const drawerWidth = 300;

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  minHeight: '100%',
  position: 'relative',
  flex: '1 1 auto',
  height: 'auto',
  backgroundColor: theme.palette.background.default,

  '& .ChatApp-contentCardWrapper': {
    position: 'relative',
    maxWidth: 1400,
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    width: '100%',
    minWidth: '0',
    maxHeight: '100%',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      padding: 16,
    },
    [theme.breakpoints.down('sm')]: {
      padding: 12,
    },
  },

  '& .ChatApp-contentCard': {
    display: 'flex',
    position: 'relative',
    flex: '1 1 100%',
    flexDirection: 'row',
    backgroundColor: theme.palette.background.paper,
    minHeight: 0,
    overflow: 'hidden',
  },

  '& .ChatApp-contentWrapper': {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 100%',
    zIndex: 10,
    background: `linear-gradient(to bottom, ${alpha(theme.palette.background.paper, 0.8)} 0,${alpha(
      theme.palette.background.paper,
      0.6
    )} 20%,${alpha(theme.palette.background.paper, 0.8)})`,
    justifyContent: 'space-between',
  },

  '& .ChatApp-content': {
    display: 'flex',
    flex: '1 1 100%',
    minHeight: 0,
    maxHeight: '70vh',
  },
}));

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    maxWidth: '100%',
    overflow: 'hidden',
    // height: '100%',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
}));

function ChatApp(props) {
  const dispatch = useDispatch();
  const chat = useSelector(({ chatApp }) => chatApp.chat);
  const selectedContact = useSelector((state) =>
    selectContactById(state, state.chatApp.contacts.selectedContactId)
  );

  useEffect(() => {
    dispatch(getUserData());
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <>
      <GlobalStyles
        styles={(theme) => ({
          '#fuse-main': {
            height: '100vh',
          },
        })}
      />
      <Root>
        <div className={clsx('ChatApp-contentCardWrapper', 'container')}>
          <div className={clsx('ChatApp-contentCard', 'shadow')}>
            <StyledSwipeableDrawer
              className="h-full z-20"
              variant="permanent"
              open
              onOpen={(ev) => {}}
              onClose={(ev) => {}}
            >
              <ChatsSidebar />
            </StyledSwipeableDrawer>
            <main className={clsx('ChatApp-contentWrapper', 'z-10')}>
              {!chat ? (
                <div className="flex flex-col flex-1 items-center justify-center p-24">
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
                  <Button
                    variant="outlined"
                    color="primary"
                    className="flex md:hidden"
                    onClick={() => dispatch(openMobileChatsSidebar())}
                  >
                    Select a contact to start a conversation!..
                  </Button>
                </div>
              ) : (
                <>
                  <AppBar
                    className="w-full border-b-1 border-grey-300"
                    elevation={0}
                    position="static"
                    color="white"
                  >
                    <Toolbar className="px-16 flex justify-between">
                      <div>
                        <IconButton
                          color="inherit"
                          aria-label="Open drawer"
                          onClick={() => dispatch(openMobileChatsSidebar())}
                          className="flex md:hidden"
                          size="large"
                        >
                          <Icon>chat</Icon>
                        </IconButton>
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => dispatch(openContactSidebar())}
                          onKeyDown={() => dispatch(openContactSidebar())}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="relative mx-8">
                            <div className="absolute right-0 bottom-0 -m-4 z-10">
                              <StatusIcon status={selectedContact.status} />
                            </div>

                            <Avatar
                              src={selectedContact.avatar}
                              alt={selectedContact.name}
                              variant="rounded"
                            >
                              {!selectedContact.avatar || selectedContact.avatar === ''
                                ? selectedContact.name[0]
                                : ''}
                            </Avatar>
                          </div>
                          <Typography color="inherit" className="text-18 font-semibold px-4">
                            {selectedContact.name}
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

                  <div className="ChatApp-content">
                    <Chat className="flex flex-1 z-10" />
                  </div>
                  <div className="m-[16px]">
                    <MessageInput />
                  </div>
                </>
              )}
            </main>
            {chat && (
              <StyledSwipeableDrawer
                className="h-full z-20"
                variant="permanent"
                open
                onOpen={(ev) => {}}
                onClose={(ev) => {}}
              >
                <CustomerProfile />
              </StyledSwipeableDrawer>
            )}
          </div>
        </div>
      </Root>
    </>
  );
}

export default withReducer('chatApp', reducer)(ChatApp);
