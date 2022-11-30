import { Icon, Paper, InputBase, IconButton } from '@mui/material';
import { Component } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import MessageBubble from './MessageBubble';

const ConversationsMessages = (props) => {
  const isLastMessageOfSameAuthor = (messages, index, isMe) => {
    return (
      (messages.length > index + 1 && messages[index + 1].author === messages[index].author) ||
      (messages.length === index + 1 && messages[index].author === isMe)
    );
  };

  // check is the message is the first message of the same author
  const isFirstMessageOfSameAuthor = (messages, index, isMe) => {
    return (
      (messages.length > index + 1 && messages[index - 1].author === messages[index].author) ||
      (messages.length === index + 1 && messages[index].author === isMe)
    );
  };

  return (
    <ul className="w-full">
      {props.messages.map((m, idx) => (
        <MessageBubble
          key={m.index}
          direction={m.author === props.identity ? 'outgoing' : 'incoming'}
          message={m}
          isLastItem={props.messages.length === m.index + 1}
        />
      ))}
    </ul>
  );
};

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: '',
      conversationProxy: props.conversationProxy,
      messages: [],
      loadingState: 'initializing',
      boundConversations: new Set(),
      typing: false,
    };
  }

  componentDidMount = () => {
    if (this.state.conversationProxy) {
      this.loadMessagesFor(this.state.conversationProxy);

      if (!this.state.boundConversations.has(this.state.conversationProxy)) {
        const newConversation = this.state.conversationProxy;
        newConversation.on('messageAdded', (m) => this.messageAdded(m, newConversation));
        newConversation.on('typingStarted', (member) => {
          this.setState({ typing: true });
        });

        newConversation.on('typingEnded', (member) => {
          this.setState({ typing: false });
        });
        this.setState((prev) => ({
          boundConversations: new Set([...prev.boundConversations, newConversation]),
        }));
      }
    }
  };

  componentDidUpdate = (oldProps, oldState) => {
    if (this.state.conversationProxy !== oldState.conversationProxy) {
      this.loadMessagesFor(this.state.conversationProxy);

      if (!this.state.boundConversations.has(this.state.conversationProxy)) {
        const newConversation = this.state.conversationProxy;
        newConversation.on('messageAdded', (m) => this.messageAdded(m, newConversation));
        this.setState((prev) => ({
          boundConversations: new Set([...prev.boundConversations, newConversation]),
        }));
      }
    }
  };

  static getDerivedStateFromProps(newProps, oldState) {
    const logic =
      oldState.loadingState === 'initializing' ||
      oldState.conversationProxy !== newProps.conversationProxy;
    if (logic) {
      return { loadingState: 'loading messages', conversationProxy: newProps.conversationProxy };
    }
    return null;
  }

  loadMessagesFor = (thisConversation) => {
    if (this.state.conversationProxy === thisConversation) {
      thisConversation
        .getMessages()
        .then((messagePaginator) => {
          if (this.state.conversationProxy === thisConversation) {
            this.setState({ messages: messagePaginator.items, loadingState: 'ready' });
          }
        })
        .catch((err) => {
          console.error("Couldn't fetch messages IMPLEMENT RETRY", err);
          this.setState({ loadingState: 'failed' });
        });
    }
  };

  messageAdded = (message, targetConversation) => {
    if (targetConversation === this.state.conversationProxy)
      this.setState((prevState, props) => ({
        messages: [...prevState.messages, message],
      }));
  };

  onMessageChanged = (event) => {
    this.setState({ newMessage: event.target.value });
    this.state.conversationProxy.typing();
  };

  sendMessage = (event) => {
    event.preventDefault();
    const message = this.state.newMessage;
    this.setState({ newMessage: '' });
    this.state.conversationProxy.sendMessage(message);
  };

  onDrop = (acceptedFiles) => {
    this.state.conversationProxy.sendMessage({
      contentType: acceptedFiles[0].type,
      media: acceptedFiles[0],
    });
  };

  render = () => {
    const { typing } = this.state;
    return (
      <Dropzone
        onDrop={this.onDrop}
        accept={{
          'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
        }}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            onClick={() => {}}
            id="OpenChannel"
            className="h-full flex flex-col justify-end border-r-1 p-[12px] relative top-0"
          >
            {isDragActive && (
              <div className="w-full h-full bg-[#2e8dee7a] z-999 absolute flex flex-col justify-center items-center ">
                <Icon type="cloud-upload" className="text-[5rem] text-[#fefefe]" />
                <h3 style={{ color: '#fefefe' }}>Release to Upload</h3>
              </div>
            )}
            <div
              className="flex flex-col"
              style={{
                filter: `blur(${isDragActive ? 4 : 0}px)`,
              }}
            >
              <input id="files" {...getInputProps()} />
              <ConversationsMessages
                identity={this.props.myIdentity}
                messages={this.state.messages}
              />
              {typing && (
                <div className="flex items-center my-[10px]">
                  <div className="px-[14px] py-[6px] text-[14px] text-[#000000] font-[400] p-[12px] rounded-r-full bg-[#f1f1f1]">
                    <p className="animate-bounce">Typing...</p>
                  </div>
                </div>
              )}
              <div>
                <form onSubmit={this.sendMessage}>
                  <Paper className="flex items-center relative rounded-8 border-1 border-grey-300">
                    <InputBase
                      autoFocus={false}
                      id="message-input"
                      className="flex-1 flex grow shrink-0 mx-16 ltr:mr-48 rtl:ml-48 my-8"
                      placeholder="Type a message"
                      disabled={this.state.loadingState !== 'ready'}
                      onChange={this.onMessageChanged}
                      value={this.state.newMessage}
                    />
                    <IconButton
                      className="absolute ltr:right-0 rtl:left-0 top-0"
                      type="submit"
                      size="large"
                    >
                      <Icon className="text-24" color="action">
                        send
                      </Icon>
                    </IconButton>
                  </Paper>
                </form>
              </div>
            </div>
          </div>
        )}
      </Dropzone>
    );
  };
}

Conversation.propTypes = {
  myIdentity: PropTypes.string.isRequired,
};

export default Conversation;
