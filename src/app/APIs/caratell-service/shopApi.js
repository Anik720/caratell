const shopApi = (service, errorHandler) => {
  return {
    async getAllProducts(payload) {
      const { page, limit, title, category, productTypes, minPrice, maxPrice } = payload;
      let url = `/get-products?page=${page}&pageSize=${limit}`;
      if (title) {
        url += `&title=${title}`;
      }
      if (category) {
        url += `&category=${category}`;
      }
      if (productTypes && productTypes.length > 0) {
        url += `&productTypes=${productTypes.join(',')}`;
      }
      if (minPrice) {
        url += `&minPrice=${minPrice}`;
      }
      if (maxPrice) {
        url += `&maxPrice=${maxPrice}`;
      }
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async getSingleProduct(id) {
      const url = `/get-product/${id}`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async getAllKycMasterData() {
      const url = `/get-all-kyc-masterdata`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async getProductPolicies() {
      const url = `/get-policies`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async createProduct(product) {
      const url = `/create-product`;
      return service
        .post(url, product)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async deleteProducts(productData) {
      const url = `/delete-products`;
      return service
        .post(url, productData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async getAllPolicyItems(page, limit) {
      const url = `/get-policies`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async createPolicy(policyData) {
      const url = `/create-policy`;
      return service
        .post(url, policyData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async updateProduct(product, productId) {
      const url = `/update-product/${productId}`;
      return service
        .put(url, product)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async updateProductKyc(kycData) {
      const url = `/update-product-kyc`;
      return service
        .post(url, kycData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async searchProduct(query) {
      const url = `/search-products?search=${query || ''}`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
  };
};

export default shopApi;
