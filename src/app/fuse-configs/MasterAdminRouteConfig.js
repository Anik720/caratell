import Dashboard from 'app/screens/Dashboard/Dashboard';
import OrderList from 'app/screens/Orders/OrderList';
import EditOrder from 'app/screens/Orders/EditOrder';
// import LiveChat from 'app/screens/LiveChat/LiveChat';
import Chat from 'app/screens/Chat';
import LiveChat from 'app/screens/LiveChat';
import LiveStream from 'app/screens/LiveStream/LiveStream';
import PastLiveStream from 'app/screens/LiveStream/PastLiveStream/PastLiveStream';
import Appointment from 'app/screens/Appointment';
import Customer from 'app/screens/Customer/Customer';
import CustomerProfileView from 'app/screens/Customer/CustomerProfile/View';
import CustomerProfileEdit from 'app/screens/Customer/CustomerProfile/Edit';
import CustomerList from 'app/screens/Customer/CustomerList';
import ExpertKYC from 'app/screens/Customer/ExpertKYC';
import EditExpertKYC from 'app/screens/Customer/ExpertKYC/Edit';
import Blacklist from 'app/screens/Customer/Blacklist';
import Shop from 'app/screens/Shop/Shop';
import ShopProductList from 'app/screens/Shop/ShopProductList';
import ShopAddProduct from 'app/screens/Shop/ShopAddProduct';
import ShopInventory from 'app/screens/Shop/ShopInventory/ShopInventory';
import ShopProductMap from 'app/screens/Shop/ShopProductMap';
import ShopPolicy from 'app/screens/Shop/ShopPolicy';
import CreateShopPolicy from 'app/screens/Shop/ShopPolicy/Create';
import Content from 'app/screens/Content/Content';
import ContentHomepage from 'app/screens/Content/ContentHomepage';
import CreateBanner from 'app/screens/Content/ContentHomepage/Create';
import ContentBlog from 'app/screens/Content/ContentBlog';
import CreateBlogPost from 'app/screens/Content/ContentBlog/Create';
import ContentPopUp from 'app/screens/Content/ContentPopUp';
import Settings from 'app/screens/Settings/Settings';
import SettingsCompanyInfo from 'app/screens/Settings/SettingsCompanyInfo';
import SettingsAvailability from 'app/screens/Settings/SettingsAvailability';
import SettingsUsers from 'app/screens/Settings/SettingsUsers';
import CreateAdmin from 'app/screens/Settings/SettingsUsers/CreateAdmin';
import Upcoming from 'app/screens/LiveStream/Upcoming/Upcoming';
import RGComponent from 'app/routes/RouteGuards/RGComponent';
import TestView from 'app/screens/TestView';

const MasterAdminRouteConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  // auth: authRoles.masterAdmin, // ['Master Admin']
  // auth: ['Master Admin'],
  routes: [
    {
      path: 'dashboard',
      element: <RGComponent RGC={<Dashboard />} />,
    },
    {
      path: 'orders',
      element: <RGComponent RGC={<OrderList />} />,
    },
    {
      path: 'orders/edit/:id',
      element: <RGComponent RGC={<EditOrder />} />,
    },
    {
      path: 'live-chat',
      element: <RGComponent RGC={<LiveChat />} />,
    },
    {
      path: 'live-chat2',
      element: <RGComponent RGC={<Chat />} />,
    },
    {
      path: 'live-stream',
      element: <RGComponent RGC={<LiveStream />} />,
    },
    {
      path: 'live-stream/upcoming',
      element: <RGComponent RGC={<Upcoming />} />,
    },
    {
      path: 'live-stream/past-live-stream',
      element: <RGComponent RGC={<PastLiveStream />} />,
    },
    {
      path: 'appointment',
      element: <RGComponent RGC={<Appointment />} />,
    },
    {
      path: 'customer',
      element: <RGComponent RGC={<Customer />} />,
    },
    {
      path: 'customer/customer-list',
      element: <RGComponent RGC={<CustomerList />} />,
    },
    {
      path: 'customer/expert-kyc',
      element: <RGComponent RGC={<ExpertKYC />} />,
    },
    {
      path: 'customer/expert-kyc/:userId/edit',
      element: <RGComponent RGC={<EditExpertKYC />} />,
    },
    {
      path: 'customer/blacklist',
      element: <RGComponent RGC={<Blacklist />} />,
    },
    {
      path: 'customer/profile/:customerId/view',
      element: <RGComponent RGC={<CustomerProfileView />} />,
    },
    {
      path: 'customer/profile/:customerId/edit',
      element: <RGComponent RGC={<CustomerProfileEdit />} />,
    },
    {
      path: 'shop',
      element: <RGComponent RGC={<Shop />} />,
    },
    {
      path: 'shop/product-list',
      element: <RGComponent RGC={<ShopProductList />} />,
    },
    {
      path: 'shop/add-product',
      element: <RGComponent RGC={<ShopAddProduct />} />,
    },
    {
      path: 'shop/edit-product/:productId',
      element: <RGComponent RGC={<ShopAddProduct />} />,
    },
    {
      path: 'shop/inventory',
      element: <RGComponent RGC={<ShopInventory />} />,
    },
    {
      path: 'shop/product-map',
      element: <RGComponent RGC={<ShopProductMap />} />,
    },
    {
      path: 'shop/policy',
      element: <RGComponent RGC={<ShopPolicy />} />,
    },
    {
      path: 'shop/policy/create',
      element: <RGComponent RGC={<CreateShopPolicy />} />,
    },
    {
      path: 'content',
      element: <RGComponent RGC={<Content />} />,
    },
    {
      path: 'content/homepage',
      element: <RGComponent RGC={<ContentHomepage />} />,
    },
    {
      path: 'content/homepage/create',
      element: <RGComponent RGC={<CreateBanner />} />,
    },
    {
      path: 'content/homepage/edit/:bannerId',
      element: <RGComponent RGC={<CreateBanner />} />,
    },
    {
      path: 'content/blog',
      element: <RGComponent RGC={<ContentBlog />} />,
    },
    {
      path: 'content/blog/create',
      element: <RGComponent RGC={<CreateBlogPost />} />,
    },
    {
      path: 'content/blog/edit/:blogId',
      element: <RGComponent RGC={<CreateBlogPost />} />,
    },
    {
      path: 'content/pop-up',
      element: <RGComponent RGC={<ContentPopUp />} />,
    },
    {
      path: 'settings',
      element: <RGComponent RGC={<Settings />} />,
    },
    {
      path: 'settings/company-information',
      element: <RGComponent RGC={<SettingsCompanyInfo />} />,
    },
    {
      path: 'settings/availability',
      element: <RGComponent RGC={<SettingsAvailability />} />,
    },
    {
      path: 'settings/users',
      element: <RGComponent RGC={<SettingsUsers />} />,
    },
    {
      path: 'settings/admin/create',
      element: <RGComponent RGC={<CreateAdmin />} />,
    },
    {
      path: 'settings/admin/edit/:adminId',
      element: <RGComponent RGC={<CreateAdmin />} />,
    },
    {
      path: 'testview',
      element: <TestView />,
    },
  ],
};

export default MasterAdminRouteConfig;
