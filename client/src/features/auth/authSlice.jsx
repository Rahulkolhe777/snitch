import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../../utils/storage';

const initialToken = storage.getToken();
const initialUser = storage.getUser();

const initialState = {
  user: initialUser || null,
  accessToken: initialToken || null,
  isAuthenticated: !!initialToken,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticated = !!accessToken;
      state.isLoading = false;
      state.error = null;

      if (accessToken) storage.setToken(accessToken);
      if (user) storage.setUser(user);
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!state.accessToken;
      if (action.payload) storage.setUser(action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      storage.clearAuth();
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setCredentials,
  setUser,
  logout,
} = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
