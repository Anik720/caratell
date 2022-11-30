/**
 * A function that returns a formatted date string from ISO to yyyy-mm-dd format.
 * @param {string} date - Date in ISO format
 * @returns {string} - Date in MM/DD/YYYY format
 */
export function formatDate(date) {
  if (!date) return '';
  if (date.length < 11) return date;
  const dateTime = `${date.split('T')[0]}`;
  return dateTime;
}

/**
 * A function that returns a formatted date string from yyyy-mm-dd to 01 Jan 2020 format.
 * @param {string} date - Date in ISO format
 * @returns {string} - Date in 01 Jan 2020 format
 */
export function convertDateToString(date) {
  if (!date) return 'N/A';
  if (typeof date === 'string' && date.length < 10) return date;
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
