/* eslint-disable camelcase */
/* eslint-disable unused-imports/no-unused-imports */
import _ from 'lodash';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'app/APIs/caratell-service/apiService';
import { defaultAvailability } from './availabilityData';
import { mergeSlots, splitSlotsInto1HourChunks } from './availabilityUtils';

export const getAllAvailability = createAsyncThunk('availability/getAllAvailability', async () => {
  const response = await api.getAllAvailability();
  if (response && response.length > 0) {
    _.forEach(response, (availability) => {
      _.forEach(availability.weekDays, (weekDay) => {
        weekDay.slots = mergeSlots(weekDay.slots);
      });
      _.forEach(availability.dateOverrides, (dateOverride) => {
        dateOverride.slots = mergeSlots(dateOverride.slots);
      });
    });
  }
  return response;
});

export const updateAllAvailability = createAsyncThunk(
  'availability/updateAllAvailability',
  async (param1, { dispatch, getState }) => {
    const payload = {
      availabilityDetails: getState().availabilityStore.availability.all_availability,
    };
    const readyPayload = _.cloneDeep(payload);
    _.forEach(readyPayload.availabilityDetails, (availability) => {
      _.forEach(availability.weekDays, (weekDay) => {
        weekDay.slots = splitSlotsInto1HourChunks(weekDay.slots);
      });
      _.forEach(availability.dateOverrides, (dateOverride) => {
        dateOverride.slots = splitSlotsInto1HourChunks(dateOverride.slots);
      });
    });
    const response = await api.updateAvailability(readyPayload);
    if (response && response.length > 0) {
      _.forEach(response, (availability) => {
        _.forEach(availability.weekDays, (weekDay) => {
          weekDay.slots = mergeSlots(weekDay.slots);
        });
        _.forEach(availability.dateOverrides, (dateOverride) => {
          dateOverride.slots = mergeSlots(dateOverride.slots);
        });
      });
    }
    return response;
  }
);

const availabilitySlice = createSlice({
  name: 'availability',
  initialState: {
    all_availability: defaultAvailability,
    initial_availability: defaultAvailability,
    all_status: 'idle',
    avType: 'shop_visit',
    avTypeIdx: 0,
    update_status: 'idle',
  },
  reducers: {
    clearStatus: (state, action) => {
      const { type } = action.payload;
      state[type] = 'idle';
    },
    setAvailabilityType: (state, action) => {
      state.avType = action.payload;
      state.avTypeIdx = state.all_availability.findIndex((av) => av.type === action.payload);
    },
    toggleAvailability: (state, action) => {
      const { dayName, dayNameIdx } = action.payload;
      state.all_availability[state.avTypeIdx].weekDays[dayNameIdx] =
        state.all_availability[state.avTypeIdx].weekDays[dayNameIdx].slots.length > 0
          ? {
              ...state.all_availability[state.avTypeIdx].weekDays[dayNameIdx],
              is_active: false,
              slots: [],
            }
          : {
              ...state.all_availability[state.avTypeIdx].weekDays[dayNameIdx],
              is_active: true,
              slots: [
                {
                  start_time: '09:00',
                  end_time: '13:00',
                },
              ],
            };
    },
    editStartTime: (state, action) => {
      const { dayNameIdx, startTime, slotIndex } = action.payload;
      state.all_availability[state.avTypeIdx].weekDays[dayNameIdx].slots[slotIndex].start_time =
        startTime;
    },
    editEndTime: (state, action) => {
      const { dayNameIdx, endTime, slotIndex } = action.payload;
      state.all_availability[state.avTypeIdx].weekDays[dayNameIdx].slots[slotIndex].end_time =
        endTime;
    },
    addNewSlot: (state, action) => {
      const { dayNameIdx } = action.payload;
      state.all_availability[state.avTypeIdx].weekDays[dayNameIdx].slots.push({
        start_time: '09:00',
        end_time: '13:00',
      });
    },
    deleteSlot: (state, action) => {
      const { dayNameIdx, slotIndex } = action.payload;
      state.all_availability[state.avTypeIdx].weekDays[dayNameIdx].slots.splice(slotIndex, 1);
    },
    resetweekDays: (state, action) => {
      state.all_availability[state.avTypeIdx].weekDays =
        state.initial_availability[state.avTypeIdx].weekDays;
    },
    copyToOtherDays: (state, action) => {
      const { fromDayIdx, toDaysIdx } = action.payload;
      toDaysIdx.forEach((dayIdx) => {
        state.all_availability[state.avTypeIdx].weekDays[dayIdx] = {
          ...state.all_availability[state.avTypeIdx].weekDays[dayIdx],
          is_active: state.all_availability[state.avTypeIdx].weekDays[fromDayIdx].is_active,
          slots: state.all_availability[state.avTypeIdx].weekDays[fromDayIdx].slots,
        };
      });
    },
    addNewDateOverride: (state, action) => {
      const { rangeDetails } = action.payload;
      state.all_availability[state.avTypeIdx].dateOverrides.push(rangeDetails);
    },
    deleteDateOverride: (state, action) => {
      const { dateOverrideIdx } = action.payload;
      state.all_availability[state.avTypeIdx].dateOverrides.splice(dateOverrideIdx, 1);
    },
  },
  extraReducers: {
    [getAllAvailability.pending]: (state, action) => {
      state.all_status = 'loading';
    },
    [getAllAvailability.fulfilled]: (state, action) => {
      state.all_status = 'succeeded';
      const allAv = action.payload;
      if (allAv && allAv.length > 0 && allAv[0].weekDays && allAv[0].weekDays.length > 0) {
        state.all_availability = allAv;
        state.initial_availability = allAv;
      }
    },
    [getAllAvailability.rejected]: (state, action) => {
      state.all_status = 'failed';
    },
    [updateAllAvailability.pending]: (state, action) => {
      state.update_status = 'loading';
    },
    [updateAllAvailability.fulfilled]: (state, action) => {
      state.update_status = 'succeeded';
    },
    [updateAllAvailability.rejected]: (state, action) => {
      state.update_status = 'failed';
    },
  },
});

export const {
  clearStatus,
  setAvailabilityType,
  toggleAvailability,
  editStartTime,
  editEndTime,
  addNewSlot,
  deleteSlot,
  resetweekDays,
  copyToOtherDays,
  addNewDateOverride,
  deleteDateOverride,
} = availabilitySlice.actions;

export default availabilitySlice.reducer;
