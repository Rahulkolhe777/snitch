import axiosInstance from './axiosInstance';

export const cartApi = {
  // Get cart
  getCart: async () => {
    const response = await axiosInstance.get('/cart');
    return response.data;
  },

  // Add item to cart
  addToCart: async ({ productId, quantity = 1, size }) => {
    const response = await axiosInstance.post('/cart', {
      productId,
      quantity,
      size,
    });
    return response.data;
  },
};

export default cartApi;
