import axiosInstance from './axiosInstance';

export const productsApi = {
  // Get all products
  getAll: async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
  },

  // Get product by ID
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data;
    } catch {
      // Fallback: search in list
      const all = await axiosInstance.get('/products');
      const list = all.data?.data || all.data || [];
      const item = list.find((p) => p._id === id || p.id === id);
      if (item) {
        return { data: item };
      }
      throw new Error('Product not found');
    }
  },

  // Create product (for sellers)
  create: async (formData) => {
    const response = await axiosInstance.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Unlist product
  unlist: async (id) => {
    const response = await axiosInstance.patch(`/products/unlist/${id}`);
    return response.data;
  },
};

export default productsApi;
