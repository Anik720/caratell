export const phoneFormatter = (phone) => {
  if (typeof phone === 'number') {
    phone = phone.toString();
  }
  if (phone && phone.length > 7) {
    return `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(
      6,
      phone.length - 1
    )}`;
  }
  return phone;
};
