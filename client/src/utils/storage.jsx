import { STORAGE_KEYS } from './constants';

export const storage = {
  getToken: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    } catch {
      return null;
    }
  },

  setToken: (token) => {
    try {
      if (token) {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
      } else {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      }
    } catch (e) {
      console.error('Failed to set token in storage', e);
    }
  },

  removeToken: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    } catch (e) {
      console.error('Failed to remove token', e);
    }
  },

  getUser: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_INFO);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setUser: (user) => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER_INFO);
      }
    } catch (e) {
      console.error('Failed to save user in storage', e);
    }
  },

  clearAuth: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_INFO);
    } catch (e) {
      console.error('Failed to clear auth storage', e);
    }
  },
};

export default storage;
