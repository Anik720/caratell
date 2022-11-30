const customerApi = (service, errorHandler) => {
  return {
    async postUserData(userData) {
      const url = `/post-user-data`;
      return service
        .post(url, userData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async getAllCustomers({ page, limit, status, name }) {
      let url = `/get-users?page=${page}&pageSize=${limit}`;
      if (status) {
        url += `&status=${status}`;
      }
      if (name) {
        url += `&name=${name}`;
      }
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async getExpertKycCustomers(page, limit) {
      const url = `/get-expert-requested-users?page=${page}&pageSize=${limit}`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async getUserProfile(id) {
      const url = `/get-user/${id}`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async updateUserProfile(userData) {
      const url = `/update-user-info`;
      return service
        .put(url, userData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async updateUserKyc(userKycData) {
      const url = `/update-user-kyc`;
      return service
        .post(url, userKycData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async getAllBlackListed(page, limit) {
      const url = `/get-blacklisted-users?page=${page}&pageSize=${limit}`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async makeUserBlackListed(userData) {
      const url = `/blacklist-users`;
      return service
        .post(url, userData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async undoBlackListedUser(userData) {
      const url = `/undo-blacklisted-users`;
      return service
        .post(url, userData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async setUserKycStatus(userKycData) {
      const url = `/set-user-kyc-status`;
      return service
        .put(url, userKycData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
  };
};

export default customerApi;
