const commonApi = (service, errorHandler) => {
  return {
    async login(payload) {
      const url = '/admin-login';
      return service
        .post(url, payload)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async register(payload) {
      const url = '/admin-register';
      return service
        .post(url, payload)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async getAdminById(id) {
      const url = `/getAdminById/${id}`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async updateAdmin(payload) {
      const url = '/updateAdminInfo';
      return service
        .put(url, payload)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async getMockData() {
      return service
        .get('https://jsonplaceholder.typicode.com/todos/1')
        .then((res) => res.data)
        .catch([]);
    },

    async uploadImage(imageFile, setProgress) {
      const formData = new FormData();
      formData.append('image', imageFile);
      const config = {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      };
      const url = `/upload`;
      return service
        .post(url, formData, config)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async getCompanyInfo() {
      const url = `/get-company-info`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async updateCompanyInfo(companyData) {
      const url = `/update-company-info/1`;
      return service
        .put(url, companyData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
  };
};

export default commonApi;
