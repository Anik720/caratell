export function truncateString(str, length) {
  if (!str) return '';
  if (!length) length = 30;
  if (str.length > length) {
    return `${str.substring(0, length)}...`;
  }
  return str;
}
