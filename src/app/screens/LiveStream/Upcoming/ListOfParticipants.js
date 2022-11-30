import React from 'react';
import './ListOfParticipants.css';
const ListOfParticipants = ({ data }) => {
  return (
    <div className="participants ml-24 mb-5">
      <div className="border border-black rounded-lg participant-list">
        <div className="grid lg:grid-cols-4 gap-6 list">
          <div className="w-48 h-48 py-16 pl-24">
            <img src={data.image} />
          </div>
          <div className="py-16">
            <p className='font-bold'>{data.name}</p>
          </div>
          <div
              className="m-auto"
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                padding: '2px 8px',
                gap: '10px',
               
              }}
            >
              {data.status === 'Queue' ? (
                <p
                  className="call-bg border rounded-full font-bold"
                  style={{
                    width: '37px',
                    height: '20px',

                    fontFamily: 'SF Pro Text',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '12px',
                    lineHeight: '20px',
                    background: '#FFE7BA',
                    color: '#D48806',
                  }}
                >
                  Queue
                </p>
              ) : (
                <p
                  className="call-bg border rounded-full font-bold"
                  style={{
                    background: '#D9F7BE',
                    color: '#3C8618',
                  }}
                >
                  In Call with Admin 1
                </p>
              )}
            </div>
          <div className="py-16" style={{ color: '#6ABE39', width: '18.75px', height: '18.75px' }}>
            <i class="fa fa-phone"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfParticipants;
