import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from './store/chatSlice';

const MessageInput = () => {
  const dispatch = useDispatch();

  const chat = useSelector(({ chatApp }) => chatApp.chat);
  const selectedContactId = useSelector(({ chatApp }) => chatApp.contacts.selectedContactId);

  const [messageText, setMessageText] = useState('');

  function onMessageSubmit(ev) {
    ev.preventDefault();
    if (messageText === '') {
      return;
    }

    dispatch(
      sendMessage({
        messageText,
        chatId: chat.id,
        contactId: selectedContactId,
      })
    ).then(() => {
      setMessageText('');
    });
  }
  return (
    <form onSubmit={onMessageSubmit}>
      <Paper className="flex items-center relative rounded-8 border-1 border-grey-300">
        <InputBase
          autoFocus={false}
          id="message-input"
          className="flex-1 flex grow shrink-0 mx-16 ltr:mr-48 rtl:ml-48 my-8"
          placeholder="Type a message"
          onChange={(ev) => setMessageText(ev.target.value)}
          value={messageText}
        />
        <IconButton className="absolute ltr:right-0 rtl:left-0 top-0" type="submit" size="large">
          <Icon className="text-24" color="action">
            send
          </Icon>
        </IconButton>
      </Paper>
    </form>
  );
};

export default MessageInput;
