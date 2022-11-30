import clsx from 'clsx';
import FuseUtils from '@fuse/utils';
import {
  Typography,
  AppBar,
  CircularProgress,
  List,
  Toolbar,
  Paper,
  Icon,
  Input,
  Avatar,
} from '@mui/material';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

// import StatusIcon from './StatusIcon';

function ContactListItem(props) {
  return (
    <div className={clsx('flex px-16 py-12', props.isActive && 'bg-blue-50')}>
      <div className="w-[15%] relative">
        <div className="absolute -right-[9px] top-[31px] z-10">
          {/* <StatusIcon status="online" /> */}
        </div>
        <Avatar src={props.contact.avatar} alt="contactAvatar" variant="rounded" />
      </div>

      <div className="flex flex-col justify-center flex-1 ml-16">
        <p className="font-medium text-14">{props.contact.name}</p>
        {props.contact.lastMessageTime && (
          <p className="whitespace-nowrap text-12 text-[#9e9e9e]">
            {formatDistanceToNow(props.contact.lastMessageTime, { addSuffix: true })}
          </p>
        )}
      </div>
    </div>
  );
}

const ChatListSideBar = (props) => {
  const { conversations, selectedConversationSid, onConversationClick, header, added } = props;
  const [searchText, setSearchText] = useState('');

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  return (
    <div className="flex flex-col flex-auto">
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
              const preparedArray = arr.map((item) => ({ ...item.channelState, sid: item.sid }));
              if (_searchText.length === 0) {
                return arr;
              }
              return FuseUtils.filterArrayByString(preparedArray, _searchText);
            }
            const filteredConversations = getFilteredArray(conversations, searchText);
            const container = {
              show: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            };

            const itemOption = {
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            };

            return (
              <motion.div
                className="flex flex-col shrink-0 h-full"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={itemOption}>
                  <Typography className="font-medium text-20 px-16 py-24 text-dark">
                    Chats
                  </Typography>
                </motion.div>
                <div className="flex flex-col gap-[10px]">
                  {filteredConversations && filteredConversations.length > 0 ? (
                    filteredConversations.map((item) => {
                      const activeChannel = item.sid === selectedConversationSid;
                      const lastMessageTime = item.lastMessage?.dateCreated || new Date();
                      return (
                        <motion.div
                          variants={itemOption}
                          key={item.sid}
                          className="cursor-pointer hover:bg-gray-200"
                          onClick={() => onConversationClick(item)}
                        >
                          <ContactListItem
                            isActive={activeChannel}
                            item={item}
                            contact={{
                              avatar: item.attributes?.avatar || 'https://i.pravatar.cc/300',
                              name: item.friendlyName || item.sid,
                              chatId: item.sid,
                              lastMessageTime,
                            }}
                          />
                        </motion.div>
                      );
                    })
                  ) : (
                    <motion.div
                      variants={itemOption}
                      className="h-full w-full flex justify-center items-center"
                    >
                      <CircularProgress />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          }, [conversations, onConversationClick, searchText, selectedConversationSid])}
        </List>
      </FuseScrollbars>
    </div>
  );
};

export default ChatListSideBar;
