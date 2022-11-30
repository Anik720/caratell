/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import _ from 'lodash';

const validateSlots = ({ error, slots, day, date, type }) => {
  for (let i = 0; i < slots.length; i++) {
    const { start_time, end_time } = slots[i];
    const start_time_hh = start_time.split(':')[0];
    const start_time_mm = start_time.split(':')[1];
    const end_time_hh = end_time.split(':')[0];
    const end_time_mm = end_time.split(':')[1];
    if (start_time_mm !== '00' || end_time_mm !== '00') {
      error = `Start time should be in HH:00 format. `;
      if (day) error += `Day: ${day}`;
      if (date) error += `Date: ${date}`;
      error += `, Type: ${type}`;
      break;
    }
    if (start_time_hh >= end_time_hh) {
      error = `Start time should be less than end time. `;
      if (day) error += `Day: ${day}`;
      if (date) error += `Date: ${date}`;
      error += `, Type: ${type}`;
      break;
    }
    if (i > 0) {
      if (slots[i].start_time.split(':')[0] < slots[i - 1].end_time.split(':')[0]) {
        error = `Start time should be equal or greater than previous slot end time. `;
        if (day) error += `Day: ${day}`;
        if (date) error += `Date: ${date}`;
        error += `, Type: ${type}`;
        break;
      }
    }
  }
  return error;
};

const validateAvailability = (values) => {
  let error = '';
  _.forEach(values, (value) => {
    const { weekDays, dateOverrides, type } = value;
    _.forEach(weekDays, (weekDay) => {
      const { slots, day } = weekDay;
      if (slots && slots.length > 0) {
        error = validateSlots({ error, slots, day, type });
      }
      if (error) {
        return false;
      }
    });
    if (error) {
      return false;
    }

    _.forEach(dateOverrides, (dateOverride, i) => {
      if (i > 0) {
        if (dateOverride.start_date < dateOverrides[i - 1].end_date) {
          error = `Start_date should be equal or greater than previous end_date. `;
          error += `Date: ${dateOverride.start_date}, Type: ${type}`;
          return false;
        }
      }
      if (error) {
        return false;
      }
      const { slots, start_date } = dateOverride;
      if (slots.length > 0) {
        error = validateSlots({ error, slots, date: start_date, type });
      }
      if (error) {
        return false;
      }
    });

    if (error) {
      return false;
    }
  });
  return {
    status: error === '',
    message: error,
  };
};
export default validateAvailability;
