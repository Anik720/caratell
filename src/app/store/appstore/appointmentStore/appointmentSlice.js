/* eslint-disable unused-imports/no-unused-imports */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'axios';
import api from 'app/APIs/caratell-service/apiService';
import mockAPI from 'mock/mockApiService';
import { appointmentTypes } from 'app/static-data/settings';
import { showMessage } from 'app/store/fuse/messageSlice';

export const getAppointmentItemsSF = createAsyncThunk(
  '/get-appointment-items',
  async (payload, { dispatch, getState }) => {
    const { page, limit } = payload;
    const { appointmentType, types, startDate, endDate } = getState().appstore.appointment.filters;
    let url = `/get-all-appointments`;
    if (appointmentType) {
      url += `${url.includes('?') ? '&' : '?'}${appointmentType}=true`;
    }
    if (types && types.length > 0) {
      url += `${url.includes('?') ? '&' : '?'}types=${types.join(',')}`;
    }
    if (startDate) {
      url += `${url.includes('?') ? '&' : '?'}startDate=${startDate}`;
    }
    if (endDate) {
      url += `${url.includes('?') ? '&' : '?'}endDate=${endDate}`;
    }
    const data = await api.getAllAppointments(url);
    const grouped = _.groupBy(data, 'slotDetails.date');
    return grouped || [];
  }
);

export const deleteAppointmentSF = createAsyncThunk(
  '/delete-appointment',
  async (payload, { dispatch, getState }) => {
    const { id } = payload;
    const data = await api.deleteAppointment(id);
    dispatch(getAppointmentItemsSF({ page: 1, limit: 10 }));
    return data;
  }
);

export const getAvailableSlots = createAsyncThunk(
  '/get-available-slots',
  async (payload, { dispatch, getState }) => {
    const { type } = payload;
    const { date } = getState().appstore.appointment.rescheduleInput;
    const data = await api.getAvailableSlots({ type, date });
    return data;
  }
);

export const rescheduleAppointment = createAsyncThunk(
  '/reschedule-appointment',
  async (payload, { dispatch, getState }) => {
    const { id, type } = payload;
    const { date, selectedSlot } = getState().appstore.appointment.rescheduleInput;
    if (!date || !selectedSlot) {
      dispatch(showMessage({ message: 'Please select date and time', variant: 'error' }));
      return null;
    }
    const formPayload = {
      appointmentId: payload.id,
      type,
      date,
      slot: selectedSlot,
    };
    const data = await api.rescheduleAppointment(formPayload);
    return data;
  }
);

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    searchText: '',
    data: [],
    filters: {
      appointmentType: 'upcoming',
      types: appointmentTypes,
      startDate: '',
      endDate: '',
    },
    appointmentItems: {
      status: 'idle',
      data: [],
      error: null,
    },
    deleteAppointmentStatus: 'idle',
    rescheduleInput: {
      getSlotStatus: 'idle',
      updateStatus: 'idle',
      updateError: null,
      date: new Date().toISOString().split('T')[0],
      selectedSlot: '',
      slots: [],
    },
  },
  reducers: {
    setFilters: (state, action) => {
      const { filters } = action.payload;
      state.filters = {
        ...state.filters,
        ...filters,
      };
    },
    setRescheduleInput: (state, action) => {
      state.rescheduleInput = {
        ...state.rescheduleInput,
        ...action.payload,
      };
    },
    searchTextSF: (state, action) => {
      state.searchText = action.payload;
    },
    setAppointmentSearchTextSF: (state, action) => {
      state.searchText = action.payload;
    },
  },
  extraReducers: {
    [getAppointmentItemsSF.pending]: (state, action) => {
      state.appointmentItems.status = 'loading';
    },
    [getAppointmentItemsSF.fulfilled]: (state, action) => {
      state.appointmentItems.status = 'succeeded';
      state.appointmentItems.data = action.payload;
    },
    [getAppointmentItemsSF.rejected]: (state, action) => {
      state.appointmentItems.status = 'failed';
    },

    [deleteAppointmentSF.pending]: (state, action) => {
      state.deleteAppointmentStatus = 'loading';
    },
    [deleteAppointmentSF.fulfilled]: (state, action) => {
      state.deleteAppointmentStatus = 'succeeded';
    },
    [deleteAppointmentSF.rejected]: (state, action) => {
      state.deleteAppointmentStatus = 'failed';
    },

    [getAvailableSlots.pending]: (state, action) => {
      state.rescheduleInput.getSlotStatus = 'loading';
    },
    [getAvailableSlots.fulfilled]: (state, action) => {
      state.rescheduleInput.getSlotStatus = 'succeeded';
      state.rescheduleInput.slots = action.payload;
    },
    [getAvailableSlots.rejected]: (state, action) => {
      state.rescheduleInput.getSlotStatus = 'failed';
    },

    [rescheduleAppointment.pending]: (state, action) => {
      state.rescheduleInput.updateStatus = 'loading';
    },
    [rescheduleAppointment.fulfilled]: (state, action) => {
      state.rescheduleInput.updateStatus = 'succeeded';
    },
    [rescheduleAppointment.rejected]: (state, action) => {
      state.rescheduleInput.updateStatus = 'failed';
      state.rescheduleInput.updateError = action.payload;
    },
  },
});

export const {
  setFilters: setFiltersSF,
  searchTextSF,
  setAppointmentSearchTextSF,
  setRescheduleInput,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
