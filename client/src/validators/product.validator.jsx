export const validateProduct = ({ title, description, amount, currency, sizes }) => {
  const errors = {};

  if (!title || !title.trim()) {
    errors.title = 'Title is required';
  }

  if (!description || !description.trim()) {
    errors.description = 'Description is required';
  }

  const priceAmount = Number(amount);
  if (!amount || isNaN(priceAmount) || priceAmount <= 0) {
    errors.amount = 'Amount must be a positive number';
  }

  if (!currency) {
    errors.currency = 'Currency is required';
  }

  if (!sizes || (Array.isArray(sizes) && sizes.length === 0)) {
    errors.sizes = 'At least one size with stock is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
