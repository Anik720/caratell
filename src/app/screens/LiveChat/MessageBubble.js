import { Component } from 'react';
import clsx from 'clsx';
// import formatDistanceToNow from 'date-fns/formatDistanceToNow';

class MessageBubble extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasMedia: this.props.message.type === 'media',
      mediaDownloadFailed: false,
      mediaUrl: null,
    };
  }

  componentDidMount = async () => {
    const { type } = await this.props.message.getParticipant();
    this.setState((prev) => ({
      ...prev,
      type,
    }));
    if (this.state.hasMedia) {
      this.props.message.media
        .getContentTemporaryUrl()
        .then((url) => {
          this.setState({ mediaUrl: url });
        })
        .catch((e) => this.setState({ mediaDownloadFailed: true }));
    }
    document.getElementById(this.props.message.sid).scrollIntoView({ behavior: 'smooth' });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    document.getElementById(this.props.message.sid).scrollIntoView({ behavior: 'smooth' });
  }

  render = () => {
    const m = this.props.message;
    const { isLastItem } = this.props;

    if (this.state.hasMedia) {
      console.log('Media properties', m.media);
    }

    const isMe = this.props.direction === 'outgoing';
    return (
      <li
        id={m.sid}
        className={clsx(
          'flex items-center w-full',
          { 'justify-end': isMe },
          { 'justify-start': !isMe },
          { 'mb-[20px]': isLastItem }
        )}
      >
        <div className="relative max-w-[80%] my-[2px]">
          <div
            className={clsx(
              'text-[14px] font-[400] p-[12px]',
              isMe
                ? 'rounded-l-full bg-[#1890FF] text-white'
                : 'rounded-r-full bg-[#f1f1f1] text-[#000000]'
            )}
          >
            {m.body}
          </div>
          {/* <p className="text-[10px] font-light absolute bottom-[-14px] right-0">
            {formatDistanceToNow(new Date(m.state.timestamp), { addSuffix: true })}
          </p> */}
        </div>
      </li>
    );
  };
}

export default MessageBubble;
