export const calculateActualPriceBasedOnDiscount = (priceAfterDiscount, discountRate) => {
  if (discountRate === 0) {
    return priceAfterDiscount;
  }
  if (discountRate < 0 || discountRate >= 100) {
    throw new Error('Invalid discount rate. It should be between 0 and 100.');
  }

  if (priceAfterDiscount <= 0) {
    throw new Error('Invalid price. It should be greater than 0.');
  }

  return priceAfterDiscount / (1 - discountRate / 100);
};
