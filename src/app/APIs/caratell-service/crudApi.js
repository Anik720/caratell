const stringify = (paramObj) => {
  const keys = Object.keys(paramObj);
  const values = Object.values(paramObj);
  const string = keys.map((key, index) => `${key}=${values[index]}`).join('&');
  return `?${string}`;
};

const crudApi = (service, errorHandler) => {
  return {
    async _get(url, params) {
      if (!url) {
        throw new Error('URL is required');
      }
      if (params) {
        url = `${url}${stringify(params)}`;
      }
      return service
        .get(url)
        .then((res) => res.data)
        .catch((error) => errorHandler(error, url));
    },

    async _post(url, data) {
      if (!url) {
        throw new Error('URL is required');
      }

      if (!data) {
        throw new Error('Data is required');
      }

      return service
        .post(url, data)
        .then((response) => response.data)
        .catch((error) => errorHandler(error, url));
    },

    async _put(url, data) {
      if (!url) {
        throw new Error('URL is required');
      }

      if (!data) {
        throw new Error('Data is required');
      }

      return service
        .put(url, data)
        .then((response) => response.data)
        .catch((error) => errorHandler(error, url));
    },

    async _delete(url) {
      if (!url) {
        throw new Error('URL is required');
      }
      return service
        .delete(url)
        .then((response) => response.data)
        .catch((error) => errorHandler(error, url));
    },

    async _patch(url, data) {
      if (!url) {
        throw new Error('URL is required');
      }

      return service
        .patch(url, data)
        .then((response) => response.data)
        .catch((error) => errorHandler(error, url));
    },
  };
};

export default crudApi;
