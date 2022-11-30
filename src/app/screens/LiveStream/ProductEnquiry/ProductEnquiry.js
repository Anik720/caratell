import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Topbar from '../Upcoming/Topbar';
import VideoChat from '../Upcoming/VideoChat';

const ProductEnquiry = () => {
  // useEffect(()=>{
  //   const fun=async()=>{
  //     dispatch(getUsernameAndRoomName({ username, roomName }));
  //   }
  // })
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
    <div
      className="grid lg:grid-cols-2 md:grid-cols-1 gap-2  h-screen"
      style={{
        marginTop: '-30px',
      }}
    >
      <div className="">
        <Topbar></Topbar>
        <div className="grid lg:grid-cols-1 md:grid-cols-1 gap-y-2 mt-20">
          {dummyItems.map((x, index) => (
            <div className="grid lg:grid-cols-5 border-2">
              <div className="pl-20 flex justify-center items-center">
                <p className="font-bold">{index + 1}.</p>{' '}
              </div>
              <div className="flex justify-center items-center">
                <img src={x.image} className="w-96 h-96" />
              </div>
              <div className="flex justify-center items-center">
                <div>
                  <p className="font-bold">{x.serial}</p>
                  <p className="font-bold">{x.name}</p>

                  <p className="font-bold">U.P ${x.price}</p>
                </div>
              </div>
              <div className="pl-20 flex justify-center items-center">
                <div>
                  <p>Discount</p>
                  <div className="form-control">
                    <div className="input-group">
                      <input type="text" placeholder="S$" className="input input-bordered" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pl-20 flex justify-center items-center">
                <p>
                  <i class="fa fa-close"></i>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="border border-x-4 border-slate-500 mt-10 mb-20"></div>
        <div className="ml-10">
          <div>
            <div>
              <div className="form-control">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Colors of Heritage™ Peranakan Tiles ..."
                    className="input input-bordered"
                    style={{ width: '328px', height: '30px' }}
                  />
                  <div className="flex justify-between">
                    <div>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
                        style={{ width: '63px', height: '30px', backgroundColor: '#1890FF' }}
                      >
                        Search
                      </button>
                    </div>
                    <div className="ml-20">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
                        style={{ width: '93px', height: '30px', backgroundColor: '#1890FF' }}
                      >
                        Add Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*Show Searched product details  */}
            <div className="flex justify-between mt-10 mb-10">
              <div>
                <img
                  src="https://listany-prod.s3.amazonaws.com/images/Diamond-World/box_2_platinum.jpg"
                  style={{ width: '92px', height: '92px' }}
                />
              </div>
              <div>
                <p className="font-bold">SKU00001</p>
                <p className="font-bold">
                  Colours of Heritage™ Peranakan Tiles Dangling Earrings (Plique-å-jour)
                </p>
                <p className="font-bold">U.P S$100,600</p>
              </div>
            </div>

            <div className="mb-10">
              <p className="font-bold">Product Type: </p>
              <p>Ear Ring </p>
            </div>
            <div className="mb-10">
              <p className="font-bold">Product Choices: </p>
              <p>Yellow Gold </p>
            </div>
            <div>
              <p className="font-bold">Product Description: </p>
              <p>
                Essences of flourishing Peranakan artifacts and European art of enameling create a
                well-balanced of bold yet feminine style and make it surprisingly versatile for all
                occasions in 18k gold.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="ring"
        style={{
          border: '0',
          marginTop: '-32px',
        }}
      >
        {/* <div id="bottom">
          <button className="btn mx-10 mb-20 bg-gray-50 h-20">
            <i class="fa fa-microphone" style={{ fontSize: '18px', color: 'blue' }}></i>
          </button>
          <button className="btn mx-10 mb-20 bg-gray-50">
            <i class="fa fa-video-camera" style={{ fontSize: '18px', color: 'blue' }}></i>
          </button>
          <button className="btn mx-10 mb-20 bg-blue-500">
            <i class="fas fa-tty" style={{ fontSize: '18px', color: 'white' }}></i>
          </button>
        </div> */}
        <VideoChat></VideoChat>
      </div>
    </div>
  );
};

export default ProductEnquiry;
