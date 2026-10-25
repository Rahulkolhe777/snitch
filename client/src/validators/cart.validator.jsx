export const validateAddToCart = ({ productId, quantity, size }) => {
  const errors = {};

  if (!productId) {
    errors.productId = 'Product ID is required';
  }

  if (!size) {
    errors.size = 'Please select a size';
  }

  const numQty = Number(quantity);
  if (!quantity || isNaN(numQty) || numQty < 1) {
    errors.quantity = 'Quantity must be at least 1';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
