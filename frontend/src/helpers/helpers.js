import moment from "moment";

export const calculateOrderCost = (cartItems) => {
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const taxPrice = itemsPrice * 0.2;

  const totalPrice = itemsPrice + taxPrice;

  return {
    itemsPrice: parseFloat(itemsPrice.toFixed(2)),
    taxPrice: parseFloat(taxPrice.toFixed(2)),
    totalPrice: parseFloat(totalPrice.toFixed(2)),
  };
};
export const getPriceQuery = (searchParams, key, value) => {
  const hasParamsValue = searchParams.has(key);

  if (value && hasParamsValue) {
    searchParams.set(key, value);
  } else if (value) {
    searchParams.append(key, value);
  } else if (hasParamsValue) {
    searchParams.delete(key, value);
  }

  return searchParams;
};

export const getDateLocal = (date) => {
  return moment(date).format("DD MMMM YY HH:mm");
};
