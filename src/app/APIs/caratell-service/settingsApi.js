const settingsApi = (service, errorHandler) => {
  return {
    async createAdmin(adminData) {
      const url = `/admin-register`;
      return service
        .post(url, adminData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async getAllAdmins(page, limit) {
      const url = `/getAllAdmins?page=${page}&pageSize=${limit}`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async deleteAdmins(adminList) {
      const url = `/deleteAdmins`;
      return service
        .post(url, adminList)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async resetAvailability() {
      const url = `/reset-availability`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async getAllAvailability() {
      const url = `/get-all-availability`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async updateAvailability(availabilityDetails) {
      const url = `/update-all-availability`;
      return service
        .post(url, availabilityDetails)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async getAvailableSlots(payload) {
      const url = `/get-available-slots`;
      return service
        .post(url, payload)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
  };
};

export default settingsApi;
