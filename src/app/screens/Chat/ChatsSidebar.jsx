import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import AppBar from '@mui/material/AppBar';
import Icon from '@mui/material/Icon';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactListItem from './ContactListItem';
import { getChat } from './store/chatSlice';
import { selectContacts } from './store/contactsSlice';

function ChatsSidebar(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const user = useSelector(({ chatApp }) => chatApp.user);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const [searchText, setSearchText] = useState('');

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }
  const selectedContactId = useSelector(({ chatApp }) => chatApp.contacts.selectedContactId);

  return (
    <div className="flex flex-col flex-auto h-full">
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar className="flex justify-start items-center px-[20px]">
          <Typography className="font-[600] text-[20px] text-black">Live Chat</Typography>
        </Toolbar>
        {useMemo(
          () => (
            <Toolbar className="px-16">
              <Paper className="flex p-4 items-center w-full px-8 py-4 shadow">
                <Icon color="action">search</Icon>

                <Input
                  placeholder="Search or start new chat"
                  className="flex flex-1 px-8"
                  disableUnderline
                  fullWidth
                  value={searchText}
                  inputProps={{
                    'aria-label': 'Search',
                  }}
                  onChange={handleSearchText}
                />
              </Paper>
            </Toolbar>
          ),
          [searchText]
        )}
      </AppBar>

      <FuseScrollbars className="overflow-y-auto flex-1">
        <List className="w-full">
          {useMemo(() => {
            function getFilteredArray(arr, _searchText) {
              if (_searchText.length === 0) {
                return arr;
              }
              return FuseUtils.filterArrayByString(arr, _searchText);
            }

            const chatListContacts =
              contacts.length > 0 && user && user.chatList
                ? user.chatList.map((_chat) => ({
                    ..._chat,
                    ...contacts.find((_contact) => _contact.id === _chat.contactId),
                  }))
                : [];
            const filteredContacts = getFilteredArray([...contacts], searchText);
            const filteredChatList = getFilteredArray([...chatListContacts], searchText);

            const container = {
              show: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            };

            const item = {
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            };

            return (
              <motion.div
                className="flex flex-col shrink-0"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredChatList.length > 0 && (
                  <motion.div variants={item}>
                    <Typography className="font-medium text-20 px-16 py-24 text-dark">
                      Chats
                    </Typography>
                  </motion.div>
                )}

                {filteredChatList.map((contact) => (
                  <motion.div variants={item} key={contact.id}>
                    <ContactListItem
                      contact={contact}
                      onContactClick={(contactId) => {
                        const isActive = contact.id === selectedContactId;
                        if (isActive) return '';
                        return dispatch(getChat({ contactId, isMobile }));
                      }}
                    />
                  </motion.div>
                ))}

                {filteredContacts.length > 0 && (
                  <motion.div variants={item}>
                    <Typography className="font-medium text-20 px-16 py-24  text-dark">
                      Contacts
                    </Typography>
                  </motion.div>
                )}

                {filteredContacts.map((contact) => (
                  <motion.div variants={item} key={contact.id}>
                    <ContactListItem
                      contact={contact}
                      onContactClick={(contactId) => {
                        const isActive = contact.id === selectedContactId;
                        if (isActive) return '';
                        return dispatch(getChat({ contactId, isMobile }));
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            );
          }, [contacts, user, searchText, dispatch, isMobile, selectedContactId])}
        </List>
      </FuseScrollbars>
    </div>
  );
}

export default ChatsSidebar;
