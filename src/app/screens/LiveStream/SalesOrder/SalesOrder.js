import React from 'react';
import SideVideoTab from '../SideVideoTab/SideVideoTab';
import Topbar from '../Upcoming/Topbar';
import VideoChat from '../Upcoming/VideoChat';

const SalesOrder = () => {
  const dummy = [
    {
      image:
        'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg',
      name: 'Titus Kitamura',
      status: 'In Call with Admin 1',
      icon: '',
    },
    {
      image:
        'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg',
      name: 'Titus Kitamura',
      status: 'In Call with Admin 1',
      icon: '',
    },
    {
      image:
        'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg',
      name: 'Titus Kitamura',
      status: 'In Call with Admin 1',
      icon: '',
    },
    {
      image:
        'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg',
      name: 'Titus Kitamura',
      status: 'In Call with Admin 1',
      icon: '',
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
    <div
      className="grid lg:grid-cols-2 md:grid-cols-1 gap-2  h-screen"
      style={{
        marginTop: '-30px',
      }}
    >
      <div className="grid lg:grid-cols-1 md:grid-cols-1 gap-2">
        <Topbar></Topbar>
        <div className="grid lg:grid-cols-2 gap-10 m-20 items ">
          {dummy.map((x) => (
            <div className="grid lg:grid-cols-2 md:grid-cols-1  border rounded-lg">
              <div>
                <img src={x.image} className="w-48 h-48" />
              </div>
              <div>
                <p className="font-bold">Florencio Dorrance</p>
                <p className="text-slate-200">3 items</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-1 md:grid-cols-1 gap-y-2 mt-72">
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
              <div className="pl-20 flex justify-center items-center">
                <p>x1</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="main ring"
        style={{
          marginTop: '-41px',
        }}
      >
        <VideoChat></VideoChat>
      </div>
    </div>
  );
};

export default SalesOrder;
