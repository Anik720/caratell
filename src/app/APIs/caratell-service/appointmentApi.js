const appointmentApi = (service, errorHandler) => {
  return {
    async getAllAppointments(url) {
      return service
        .get(url)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
    async deleteAppointment(id) {
      return service
        .delete(`/delete-appointment/${id}`)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, id));
    },
    async rescheduleAppointment(payload) {
      const url = `/reschedule-appointment`;
      return service
        .put(url, payload)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },

    async updateAppointmentNote(payload) {
      const url = `/update-appointment-note`;
      return service
        .put(url, payload)
        .then((res) => res.data)
        .catch((e) => errorHandler(e, url));
    },
  };
};

export default appointmentApi;
