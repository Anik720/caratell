import { lazy } from 'react';

const Login = lazy(() => import('app/screens/auth/login'));

const AuthRouteConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: true,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  // auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'login',
      element: <Login />,
    },
  ],
};

export default AuthRouteConfig;
