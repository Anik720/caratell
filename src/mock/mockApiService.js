import mockProducts, { kycDetails, policies } from './mockProductList';
import { homePageItems } from './mockHomePageTable';
import { mockPolicies } from './mockPolicies';
import mockProductsMap from './mockProductMapList';
import mockCustomerList from './mockCustomerList';
import { appointmentList } from './appointmentList';
import { blogList } from './blogList';
import { orderList } from './orderItems';
import { adminList } from './adminsList';

const apiService = {
  async getAllOrderItems(page, limit) {
    page += 1;
    const orderItems = orderList.rows.slice((page - 1) * limit, page * limit);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ rows: orderItems, count: orderList.count });
      }, 500);
    });
  },
  async getAllKycMasterData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(kycDetails);
      }, 500);
    });
  },

  async getProductPolicies() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(policies);
      }, 500);
    });
  },

  async mockGetProductsApi(page, limit) {
    page += 1;
    const products = mockProducts.result.slice((page - 1) * limit, page * limit);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ rows: products, count: mockProducts.length });
      }, 500);
    });
  },

  async mockAddProductApi(product) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(product);
      }, 500);
    });
  },

  async mockGetProductsMapApi(page, limit) {
    page += 1;
    const productsMap = mockProductsMap.result.slice((page - 1) * limit, page * limit);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(productsMap);
      }, 500);
    });
  },

  async getAllBanners(page, limit) {
    page += 1;
    const homeItems = homePageItems.rows.slice((page - 1) * limit, page * limit);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ rows: homeItems, count: homePageItems.rows.length });
      }, 500);
    });
  },

  async getAllPolicyItems(page, limit) {
    page += 1;
    const policyItems = mockPolicies.rows.slice((page - 1) * limit, page * limit);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ rows: policyItems, count: mockPolicies.rows.length });
      }, 500);
    });
  },

  async getAllCustomers(page, limit) {
    page += 1;
    const customers = mockCustomerList.result.slice((page - 1) * limit, page * limit);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ rows: customers, count: mockCustomerList.result.length });
      }, 500);
    });
  },

  async getAllCustomersBlackListed(page, limit) {
    page += 1;
    const customers = mockCustomerList.result.slice((page - 1) * limit, page * limit);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ rows: customers, count: mockCustomerList.result.length });
      }, 500);
    });
  },

  async makeUserBlackListed(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(id);
      }, 500);
    });
  },

  async getAppointmentItems(page, limit) {
    page += 1;
    const appointmentItems = appointmentList.rows.slice((page - 1) * limit, page * limit);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          rows: appointmentItems,
          count: appointmentList.count,
        });
      }, 500);
    });
  },

  async getAdminItems(page, limit) {
    page += 1;
    const adminItems = adminList.rows.slice((page - 1) * limit, page * limit);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          rows: adminItems,
          count: adminList.count,
        });
      }, 500);
    });
  },

  async getAllBlogItems(page, limit) {
    page += 1;
    const blogItems = blogList.rows.slice((page - 1) * limit, page * limit);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          rows: blogItems,
          count: blogList.count,
        });
      }, 500);
    });
  },

  async getAvailabilityItmes() {
    const defaultDays = () => {
      const days = [];
      const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      for (let i = 0; i < 7; i += 1) {
        days.push({
          isAvailable: i % 2 === 0,
          day: dayNames[i],
          startTime: '10:00',
          endTime: '18:00',
        });
      }
      return days;
    };
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          availablitiy: defaultDays(),
        });
      }, 500);
    });
  },
  async getOverideItmes() {
    const overideDays = () => {
      return [
        {
          startDate: '19 Apr 2022',
          endDate: '20 Apr 2022',
          startTime: '09:00',
          endTime: '11:00',
        },
        {
          startDate: '15 Mar 2022',
          endDate: '25 Mar 2022',
          startTime: '09:00',
          endTime: '11:00',
        },
        {
          startDate: '19 Aug 2022',
          endDate: '29 Apr 2022',
          startTime: '09:00',
          endTime: '11:00',
        },
        {
          startDate: '10 Dec 2022',
          endDate: '22 Apr 2022',
          startTime: '09:00',
          endTime: '11:00',
        },
      ];
    };
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          overiders: overideDays(),
        });
      }, 500);
    });
  },
};

export default apiService;
