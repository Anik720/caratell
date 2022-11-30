const orderApi = (service, errorHandler) => {
  return {
    async getAllOrders({
      page,
      limit,
      customer,
      modes,
      minPrice,
      maxPrice,
      mindate,
      maxdate,
      status,
    }) {
      let url = `/get-all-orders?page=${page}&pageSize=${limit}`;
      if (customer) {
        url += `&customer=${customer}`;
      }
      if (modes && modes.length > 0) url += `&modes=${modes}`;
      if (minPrice) url += `&minPrice=${minPrice}`;
      if (maxPrice) url += `&maxPrice=${maxPrice}`;
      if (mindate) url += `&minDate=${mindate}`;
      if (maxdate) url += `&maxDate=${maxdate}`;
      if (status) url += `&status=${status}`;

      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async getOrderDetails(id) {
      const url = `/get-order/${id}`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async updateOrder(orderData, id) {
      const url = `/update-order/${id}`;
      return service
        .put(url, orderData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async updateOrderStatus(orderData) {
      const url = `/update-order-status`;
      return service
        .put(url, orderData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
  };
};

export default orderApi;
