/**
 * Formats a numeric price into INR currency display.
 */
export const formatPrice = (amount, currency = 'INR') => {
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return '₹0.00';
  }

  const numeric = Number(amount);

  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency || 'INR',
      maximumFractionDigits: 2,
    }).format(numeric);
  } catch {
    return `₹${numeric.toFixed(2)}`;
  }
};

export default formatPrice;
