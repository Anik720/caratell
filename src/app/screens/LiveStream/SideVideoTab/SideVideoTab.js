import React from 'react';

const SideVideoTab = () => {
  return (
    <div>
      <div className="main ring">
        <div id="bottom">
          <button className="btn mx-10 mb-20 bg-gray-50 h-20">
            <i class="fa fa-microphone" style={{ fontSize: '18px', color: 'blue' }}></i>
          </button>
          <button className="btn mx-10 mb-20 bg-gray-50">
            <i class="fa fa-video-camera" style={{ fontSize: '18px', color: 'blue' }}></i>
          </button>
          <button className="btn mx-10 mb-20 bg-blue-500">
            <i class="fas fa-tty" style={{ fontSize: '18px', color: 'white' }}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideVideoTab;
