export function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
}

export function DateAndTime({ value }) {
  if (!value) return <div>"N/A"</div>;
  const date = new Date(value);
  const dateTime = `${date.toDateString().split(' ').slice(1, 3).join(' ')}-${formatAMPM(date)}`;
  return <span>{dateTime}</span>;
}

export function DateOnly({ value }) {
  if (!value) return <div>"N/A"</div>;
  const date = new Date(value);
  const dateNumber = date.toLocaleDateString('en-US', { day: 'numeric' });
  const monthName = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.toLocaleDateString('en-US', { year: 'numeric' });
  const fullDate = `${dateNumber} ${monthName} ${year}`;
  return <span>{fullDate}</span>;
}

// dayname and date like: "Monday, 22 May 2020"
export function DayAndFullDate({ value }) {
  if (!value) return <div>"N/A"</div>;
  const date = new Date(value);
  const dateNumber = date.toLocaleDateString('en-US', { day: 'numeric' });
  const monthName = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.toLocaleDateString('en-US', { year: 'numeric' });
  const fullDate = `${dateNumber} ${monthName} ${year}`;
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  return <span>{`${dayName}, ${fullDate}`}</span>;
}
