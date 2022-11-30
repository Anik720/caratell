export const limitDecimal = (value) => {
  if (!value) return 0;
  if (typeof value !== 'number') return value;
  return parseFloat(value).toFixed(2);
};

export const calculatedTotalGst = (gst, subtotal, dc, oc) => {
  return limitDecimal((gst / 100) * (Number(subtotal) + Number(dc) + Number(oc)));
};

export const singleItemTotal = (unitPrice, quantity, discountx) => {
  const subtotal = Number(quantity) * Number(unitPrice);
  // const discount = limitDecimal((subtotal * Number(discountx)) / 100);
  const discount = discountx;
  const total = limitDecimal(subtotal - discount);
  return total;
};

export const calculateTotal = (orderedItems, deliveryCharge, otherCharges, gstPercentage) => {
  if (!orderedItems || orderedItems.length === 0)
    return {
      calculatedItems: [],
      subTotal: {},
      gstAmount: {},
      netTotal: {},
    };

  const calculatedItems = orderedItems.map((item, index) => {
    // const subtotal = Number(item.itemQuantity) * Number(item.itemUnitPrice);
    // const discount = limitDecimal((subtotal * Number(item.itemDiscount)) / 100);
    // const total = limitDecimal(subtotal - discount);
    const total = singleItemTotal(item.itemUnitPrice, item.itemQuantity, item.itemDiscount);
    return {
      ...item,
      itemTotal: total,
    };
  });
  const subTotal = calculatedItems.reduce((acc, item) => acc + Number(item.itemTotal), 0);

  let gstAmount;
  let netTotal;
  if (deliveryCharge !== undefined && otherCharges !== undefined && gstPercentage !== undefined) {
    gstAmount = calculatedTotalGst(gstPercentage, subTotal, deliveryCharge, otherCharges);
    netTotal = limitDecimal(
      Number(subTotal) + Number(deliveryCharge) + Number(otherCharges) + Number(gstAmount)
    );
  }
  return {
    calculatedItems,
    subTotal,
    gstAmount,
    netTotal,
  };
};
