/* eslint-disable camelcase */
// split the slots into 1 hour chunks
export const splitSlotsInto1HourChunks = (slots) => {
  if (!slots || Array.isArray(slots) === false || slots.length === 0) {
    return [];
  }
  const spliteSlots = [];
  slots.forEach((slot) => {
    const startHour = Number(slot.start_time.split(':')[0]);
    const endHour = Number(slot.end_time.split(':')[0]);
    for (let i = startHour; i < endHour; i += 1) {
      spliteSlots.push({
        start_time: `${String(i).padStart(2, '0')}:00`,
        end_time: `${String(i + 1).padStart(2, '0')}:00`,
      });
    }
  });
  return spliteSlots;
};

export const mergeSlots = (splitedSlots) => {
  if (!splitedSlots || Array.isArray(splitedSlots) === false || splitedSlots.length === 0) {
    return [];
  }
  const mergedSlots = [];
  let { start_time } = splitedSlots[0];
  let { end_time } = splitedSlots[0];
  for (let i = 1; i < splitedSlots.length; i += 1) {
    if (splitedSlots[i].start_time === end_time) {
      end_time = splitedSlots[i].end_time;
    } else {
      mergedSlots.push({ start_time, end_time });
      start_time = splitedSlots[i].start_time;
      end_time = splitedSlots[i].end_time;
    }
  }
  mergedSlots.push({ start_time, end_time });
  return mergedSlots;
};
