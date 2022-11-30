const chatApi = (service, errorHandler) => {
  return {
    async getTwilioToken(email) {
      const url = `/get-twilio-token`;
      return service
        .post(url, {
          email,
          isAdmin: true,
        })
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async createChatWithAdmin(chatData) {
      const url = `/create-chat-with-admin`;
      return service
        .post(url, chatData)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async getChatList() {
      const url = `/get-chat-list`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async addParticipant(data) {
      const url = `/add-participant`;
      return service
        .post(url, data)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async getParticipantsById(id) {
      const url = `/get-participants-by-id/${id}`;
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async getCustomerProfile(email) {
      const url = `/get-customer-profile/`;
      return service
        .post(url, {
          email,
        })
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
  };
};

export default chatApi;
