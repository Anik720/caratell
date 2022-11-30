import React from 'react';

const VideoTab = () => {
  return (
    <div>
      <div>
        <div className="stream-button">
          <div className="Your-Camera">
            <button
              className=""
              style={{
                width: '105px',
                height: '38px',
                backgroundColor: '#7D7D7D',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 10px',
              }}
            >
              <p
                style={{
                  width: '89px',
                  height: '22px',
                  fontFamily: 'SF Pro Text',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  fontSize: '14px',
                  color: '#FFFFFF',
                }}
              >
                {' '}
                Your Camera
              </p>
            </button>
          </div>
          <div className="Your-Camera">
            {/* <button
              className=""
              style={{
                width: '120px',
                height: '40px',
                backgroundColor: ' #1890FF',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 16px',
                marginRight: '24px',
              }}
            >
              <p
                style={{
                  width: '88px',
                  height: '24px',
                  fontFamily: 'SF Pro Text',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '16px',
                  color: '#FFFFFF',
                }}
              >
                {' '}
                Enter Room
              </p>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTab;
