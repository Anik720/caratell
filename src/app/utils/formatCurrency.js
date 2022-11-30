// convert 5000000 to $5,000,000
const convertToDollarString = (ammount) => {
  return `$${ammount.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
};

/**
 * format price dollar string
 * @param {number | string} ammount the ammount to format
 * @param {undefined | 'dollar'} type the type of ammount to format
 * @returns {string | number } If type is dollar, return a dollar string like $1,000,000. If type is undefined, return the ammount as a number
 */
const formatCurrency = (ammount, type) => {
  if (typeof ammount === 'number') {
    if (type && type === 'dollar') {
      ammount = String(ammount);
      return `${convertToDollarString(ammount)}`;
    }
    return ammount;
  }
  // remove $ and , from string
  ammount = ammount.replace('$', '').replace(',', '');
  if (type && type === 'dollar') {
    return convertToDollarString(ammount);
  }
  return Number(ammount);
};

export default formatCurrency;
