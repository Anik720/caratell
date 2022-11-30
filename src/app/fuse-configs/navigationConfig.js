import i18next from 'i18next';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  // {
  //   id: 'applications',
  //   title: 'Applications',
  //   translate: 'APPLICATIONS',
  //   type: 'collapse',
  //   icon: 'apps',
  //   url: 'example',
  //   children: [
  //     {
  //       id: 'example-component',
  //       title: 'Example',
  //       translate: 'EXAMPLE',
  //       type: 'item',
  //       icon: 'whatshot',
  //       url: 'example',
  //     },
  //   ],
  // },
  {
    id: 'dashboard',
    title: 'Dashboard',
    translate: 'Dashboard',
    type: 'item',
    icon: 'home',
    url: 'dashboard',
  },
  {
    id: 'orders',
    title: 'Orders',
    translate: 'Orders',
    type: 'item',
    icon: 'shopping_bag',
    url: 'orders',
  },
  {
    id: 'livechat',
    title: 'Live Chat',
    // translate: 'Live Chat',
    type: 'item',
    icon: 'headset',
    url: 'live-chat',
  },
  {
    id: 'livestream',
    title: 'Live Stream',
    type: 'collapse',
    icon: 'videocam',
    url: 'live-stream',
    children: [
      {
        id: 'upcoming-component',
        title: 'Upcoming',
        // translate: 'EXAMPLE',
        type: 'item',
        // icon: 'whatshot',
        url: 'live-stream/upcoming',
      },
      {
        id: 'pastlivestream-component',
        title: 'Past Live Stream',
        // translate: 'EXAMPLE',
        type: 'item',
        // icon: 'whatshot',
        url: 'live-stream/past-live-stream',
      },
    ],
  },
  {
    id: 'appointment',
    title: 'Appointment',
    // translate: 'Live Chat',
    type: 'item',
    icon: 'event',
    url: 'appointment',
  },
  {
    id: 'customer',
    title: 'Customer',
    type: 'collapse',
    icon: 'person_outline',
    // url: 'customer',
    children: [
      {
        id: 'customerlist-component',
        title: 'Customer List',
        // translate: 'EXAMPLE',
        type: 'item',
        // icon: 'whatshot',
        url: 'customer/customer-list',
      },
      {
        id: 'expertkyc-component',
        title: 'Expoert KYC',
        // translate: 'EXAMPLE',
        type: 'item',
        // icon: 'whatshot',
        url: 'customer/expert-kyc',
      },
      {
        id: 'blacklist-component',
        title: 'Blacklist',
        // translate: 'EXAMPLE',
        type: 'item',
        // icon: 'whatshot',
        url: 'customer/blacklist',
      },
    ],
  },
  {
    id: 'shop',
    title: 'Shop',
    type: 'collapse',
    icon: <DiamondOutlinedIcon className="text-[20px] h-[20px] mt-[-7px]" />,
    // url: 'shop',
    children: [
      {
        id: 'productlist-component',
        title: 'Product List',
        // translate: 'EXAMPLE',
        type: 'item',
        // icon: 'whatshot',
        url: 'shop/product-list',
      },
      {
        id: 'inventory-component',
        title: 'Inventory',
        // translate: 'EXAMPLE',
        type: 'item',
        // icon: 'whatshot',
        url: 'shop/inventory',
      },
      {
        id: 'productmap-component',
        title: 'Product Map',
        // translate: 'EXAMPLE',
        type: 'item',
        // icon: 'whatshot',
        url: 'shop/product-map',
      },
      {
        id: 'policy-component',
        title: 'Policy',
        // translate: 'EXAMPLE',
        type: 'item',
        // icon: 'whatshot',
        url: 'shop/policy',
      },
    ],
  },
  {
    id: 'content',
    title: 'Content',
    type: 'collapse',
    icon: 'book',
    // url: 'content',
    children: [
      {
        id: 'homepage-component',
        title: 'Homepage',
        // translate: 'EXAMPLE',
        type: 'item',
        // icon: 'whatshot',
        url: 'content/homepage',
      },
      {
        id: 'blog-component',
        title: 'Blog',
        // translate: 'EXAMPLE',
        type: 'item',
        // icon: 'whatshot',
        url: 'content/blog',
      },
      {
        id: 'popup-component',
        title: 'Pop-up',
        // translate: 'EXAMPLE',
        type: 'item',
        // icon: 'whatshot',
        url: 'content/pop-up',
      },
    ],
  },
  {
    id: 'settings',
    title: 'Settings',
    type: 'collapse',
    icon: 'settings',
    // url: 'settings',
    children: [
      {
        id: 'companyinformation-component',
        title: 'Company Information',
        // translate: 'EXAMPLE',
        type: 'item',
        // icon: 'whatshot',
        url: 'settings/company-information',
      },
      {
        id: 'availability-component',
        title: 'Availability',
        // translate: 'EXAMPLE',
        type: 'item',
        // icon: 'whatshot',
        url: 'settings/availability',
      },
      {
        id: 'users-component',
        title: 'Users',
        // translate: 'EXAMPLE',
        type: 'item',
        // icon: 'whatshot',
        url: 'settings/users',
      },
    ],
  },
];

export default navigationConfig;
