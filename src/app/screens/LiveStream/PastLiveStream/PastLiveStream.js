import { border } from '@mui/system';
import './PastLiveStream.css';

function PastLiveStream() {
  const dummyData = [
    {
      date: ' Monday, 22 November 2022',
      time: '9.00',
      status: 'Queue',
      participantName: 'Juan Eduardo González Rodríguez',
      hostName: 'Juan Eduardo González Rodríguez’s Live Stream',
    },
    {
      date: ' Monday, 22 November 2022',
      time: '10.00',
      status: 'Scheduled',
      participantName: 'Juan Eduardo González Rodríguez',
      hostName: 'Juan Eduardo González Rodríguez’s Live Stream',
    },
    {
      date: ' Monday, 22 November 2022',
      time: '10.00',
      status: 'Scheduled',
      participantName: 'Juan Eduardo González Rodríguez',
      hostName: 'Juan Eduardo González Rodríguez’s Live Stream',
    },
  ];
  const dummyItems = [
    {
      image: 'https://listany-prod.s3.amazonaws.com/images/Diamond-World/box_2_platinum.jpg',
      serial: 'SKU00001',
      name: 'Clover Diamond Pendant',
      description: 'My fingers are small, would like a thinner band. Thickness to be made as 5mm.',
      price: 1200,
    },
    {
      image: 'https://listany-prod.s3.amazonaws.com/images/Diamond-World/box_2_platinum.jpg',
      serial: 'SKU00001',
      name: 'Clover Diamond Pendant',
      description: 'My fingers are small, would like a thinner band. Thickness to be made as 5mm.',
      price: 1200,
    },
    {
      image: 'https://listany-prod.s3.amazonaws.com/images/Diamond-World/box_2_platinum.jpg',
      serial: 'SKU00001',
      name: 'Clover Diamond Pendant',
      description: 'My fingers are small, would like a thinner band. Thickness to be made as 5mm.',
      price: 1200,
    },
  ];

  return (
    <div className="container" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="m-32">
        <h1 className="past-live-text">Past Live Stream</h1>
      </div>
      <div>
        <div className="flex justify-between">
          <div>
            <div className="form-control m-48">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search…"
                  className="input input-bordered"
                  style={{ width: '300px', height: '40px' }}
                />
                <button
                  className="btn btn-square"
                  style={{ width: '83px', height: '40px', background: '#1890FF' }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="form-control m-48">
                <div className="input-group">
                  <input
                    type="date"
                    placeholder="Select date"
                    className="input input-bordered"
                    style={{ width: '300px', height: '40px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion part */}
      <div>
        {dummyData.map((x) => (
          <>
            <div className="h-56  w-full bg-gray mb-10 ">
              <p className="pt-20 text-white font-bold">{x.date}</p>
            </div>

            <div
              tabIndex={0}
              className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box  w-full"
              style={{
                height: 'full',
                background: '#FFFFFF',
              }}
            >
              <div className="collapse-title text-xl font-medium grid grid-cols-3">
                <div>
                  <p
                    style={{
                      width: '31px',
                      height: '22px',

                      fontFamily: 'SF Pro Text',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      fontSize: '14px',
                      lineHeight: '22px',
                    }}
                  >
                    {x.time}
                  </p>
                  {x.status === 'Queue' ? (
                    <button
                      className=""
                      style={{
                        width: '37px',
                        height: '20px',
                        backgroundColor: '#fff',
                        fontFamily: 'SF Pro Text',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '12px',
                        lineHeight: '20px',
                        color: '#FA8C16',
                        border: 'solid #FA8C16 1px',
                      }}
                    >
                      Queue
                    </button>
                  ) : (
                    <button
                      className=""
                      style={{
                        width: '60px',
                        height: '20px',
                        backgroundColor: '#fff',
                        fontFamily: 'SF Pro Text',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '12px',
                        lineHeight: '20px',
                        color: '#2F54EB',
                        border: 'solid #2F54EB 1px',
                      }}
                    >
                      Scheduled
                    </button>
                  )}
                </div>
                <div>
                  <p
                    className="mb-10 font-bold"
                    style={{
                      width: '236px',
                      height: '20px',

                      fontFamily: 'SF Pro Text',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      fontSize: '14px',
                      lineHeight: '22px',
                    }}
                  >
                    {x.participantName}
                  </p>
                  <p
                    style={{
                      width: '319px',
                      height: '20px',

                      fontFamily: 'SF Pro Text',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      fontSize: '14px',
                      lineHeight: '22px',
                    }}
                  >
                    {x.hostName}'s Live Stream
                  </p>
                </div>
              </div>

              <div className="collapse-content mt-40">
                <div className="flex" style={{ backgroundColor: '#FAFAFA' }}>
                  <div>
                    <button
                      style={{
                        width: '117px',
                        height: '40px',
                        background: '#1890FF',
                        color: '#fff',
                      }}
                    >
                      View Order
                    </button>

                    <p className="font-bold mt-20">Customer Details</p>
                    <p className="mt-20">juan.ed@gmail.com</p>
                    <p className="mt-20">(65) 8888 8888</p>
                  </div>
                  <div className="grid lg:grid-cols-1 md:grid-cols-1">
                    {dummyItems.map((x, index) => (
                      <div className="grid lg:grid-cols-4 border-2">
                        <div className="pl-20 flex justify-center items-center">
                          <p className="">{index + 1}.</p>{' '}
                        </div>
                        <div className="flex justify-center items-center">
                          <img src={x.image} className="w-96 h-96" />
                        </div>
                        <div>
                          <p>{x.serial}</p>
                          <p>{x.name}</p>
                          <p>{x.description}</p>
                          <p>{x.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pl-20 ">
                  <p className="text-primary">Add Notes</p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default PastLiveStream;
