import { Navigate } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';

import MasterAdminRouteConfig from 'app/fuse-configs/MasterAdminRouteConfig';
import AuthRouteConfig from 'app/fuse-configs/AuthRouteConfig';
import Error404PageConfig from 'app/main/404/Error404PageConfig';
import Participants from 'app/screens/LiveStream/Participants/Participants';
import SalesOrder from 'app/screens/LiveStream/SalesOrder/SalesOrder';
import ProductEnquiry from 'app/screens/LiveStream/ProductEnquiry/ProductEnquiry';
import Lobby from 'app/screens/LiveStream/Upcoming/Lobby';

const routeConfigs = [Error404PageConfig, AuthRouteConfig, MasterAdminRouteConfig];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: '/',
    element: <Navigate to="dashboard" />,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: 'lobby',
    element: <Lobby />,
  },
  // {
  //   path: 'liveStream',
  //   element: <VideoChat />,
  // },
  {
    path: 'live-stream/allParticipants',
    element: <Participants />,
  },
  {
    path: 'live-stream/salesOrder',
    element: <SalesOrder />,
  },
  {
    path: 'live-stream/productEnquiry',
    element: <ProductEnquiry />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
