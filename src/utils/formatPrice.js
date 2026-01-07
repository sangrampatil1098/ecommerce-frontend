export const formatPrice = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatPriceCalculation = (quantity, spacialPrice) => {
  const total = (Number(quantity) * Number(spacialPrice)).toFixed(2);
  return total;
};
