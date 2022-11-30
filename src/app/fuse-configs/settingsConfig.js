const settingsConfig = {
  layout: {
    style: 'layout1', // layout1 layout2 layout3
    config: {}, // checkout default layout configs at app/fuse-layouts for example  app/fuse-layouts/layout1/Layout1Config.js
  },
  customScrollbars: true,
  direction: 'ltr', // rtl, ltr
  theme: {
    main: 'default',
    navbar: 'dark1',
    toolbar: 'dark1',
    footer: 'mainThemeDark',
  },
  // loginRedirectUrl: '/dashboard', // Default redirect url for the logged-in user
  // defaultAuth:['Master Admin'],
};

export default settingsConfig;
