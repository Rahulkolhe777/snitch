import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  filters: {
    category: 'all',
    searchQuery: '',
    sortBy: 'featured',
  },
};

const productsSlice = createSlice({
  name: 'products',
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
    setProducts: (state, action) => {
      state.items = Array.isArray(action.payload) ? action.payload : [];
      state.isLoading = false;
      state.error = null;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setProducts,
  setSelectedProduct,
  clearSelectedProduct,
  setCategoryFilter,
  setSearchQuery,
  setSortBy,
  resetFilters,
} = productsSlice.actions;

export const selectProductsState = (state) => state.products;
export const selectAllProducts = (state) => state.products.items;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectProductsLoading = (state) => state.products.isLoading;
export const selectProductsError = (state) => state.products.error;
export const selectProductFilters = (state) => state.products.filters;

export default productsSlice.reducer;
