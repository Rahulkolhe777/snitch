import axiosInstance from './axiosInstance';

export const authApi = {
  // Login
  login: async ({ email, password }) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  },

  // Register
  register: async ({ name, email, password }) => {
    const response = await axiosInstance.post('/auth/register', { name, email, password });
    return response.data;
  },

  // Get current user profile
  getMe: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },

  // Refresh token
  refreshToken: async () => {
    const response = await axiosInstance.post('/auth/refresh');
    return response.data;
  },
};

export default authApi;
