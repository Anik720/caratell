import React from 'react';

const ListOfSchedules = ({ data }) => {
  return (
    <div>
      <div className="participants mx-24 mb-5">
        <div className="border border-black rounded-lg participant-list">
          <div className="grid lg:grid-cols-4 gap-5 list">
            <div className="w-48 h-48 py-16 pl-24">
              <img src={data.image} />
            </div>
            <div className="py-16 ">
              <p>{data.name}</p>
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
                    width: ' 60px',
                    height: '20px',

                    fontFamily: 'SF Pro Text',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '12px',
                    lineHeight: '20px',
                    background: '#BAE7FF',
                    color: '#1890FF',
                  }}
                >
                  Scheduled
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
            <div
              className="py-16 "
              style={{ color: '#6ABE39', width: '18.75px', height: '18.75px' }}
            >
              <i class="fa fa-phone"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfSchedules;
