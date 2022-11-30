const cmsApi = (service, errorHandler) => {
  return {
    async getAllBanners() {
      const url = `/get-all-banners`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async createBanner(bannerData) {
      const url = `/create-banner`;
      return service
        .post(url, bannerData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async getSingleBanner(bannerId) {
      const url = `/get-single-banner/${bannerId}`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async updateBanner(bannerData, id) {
      const url = `/update-banner/${id}`;
      return service
        .put(url, bannerData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async deleteBanner(bannerData) {
      const url = `/delete-banner`;
      return service
        .post(url, bannerData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async getAllBlogs({ page, limit, category, title }) {
      let url = `/get-all-blogs?page=${page}&pageSize=${limit}`;
      if (category) {
        url += `&category=${category}`;
      }
      if (title) {
        url += `&title=${title}`;
      }
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async getSingleBlog(id) {
      const url = `/get-single-blog/${id}`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async createBlog(blogData) {
      const url = `/create-blog`;
      return service
        .post(url, blogData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async updateBlog(blogData, id) {
      const url = `/update-blog/${id}`;
      return service
        .put(url, blogData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async deleteBlog(blogData) {
      const url = `/delete-blog`;
      return service
        .post(url, blogData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async createPopup(popupData) {
      const url = `/create-popup`;
      return service
        .post(url, popupData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
  };
};

export default cmsApi;
