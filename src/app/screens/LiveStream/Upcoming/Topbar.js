import React from 'react';
import { Link } from 'react-router-dom';
import VideoChat from './VideoChat';

const Topbar = () => {
  return (
    <div className='' style={{
      border: '0',
    }}>
      <div className="flex justify-content-center align-items-center ">
        <div className="ml-5 mr-20" style={{ textDecoration: 'none' }}>
          <Link to="/live-stream/upcoming" style={{ textDecoration: 'none' }}>
            {' '}
            <p className="text-lg" style={{ textDecoration: 'none' }}>
              Upcoming
            </p>
          </Link>
        </div>
        <div className="mr-20">
          <Link to="/live-stream/allParticipants" style={{ textDecoration: 'none' }}>
            {' '}
            <p className="text-lg">Paricipants</p>
          </Link>
        </div>
        <div className="mr-20">
          <Link to="/live-stream/salesOrder" style={{ textDecoration: 'none' }}>
            {' '}
            <p className="text-lg">Sales_Order</p>
          </Link>
        </div>
        <div className="mr-20">
          <div>
            <Link to="/live-stream/productEnquiry" style={{ textDecoration: 'none' }}>
              <p className="text-lg">Product_Enquiry</p>
            </Link>
          </div>
        </div>
        <div className="mr-52">
          <p className="text-lg">Chat</p>
        </div>
      </div>
    
    </div>
  );
};

export default Topbar;
