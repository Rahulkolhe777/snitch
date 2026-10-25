import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // [{ product: {}, productId: string, size: string, quantity: number, price: number }]
  isDrawerOpen: false,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
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
    setCart: (state, action) => {
      state.items = action.payload || [];
      state.isLoading = false;
      state.error = null;
    },
    addItem: (state, action) => {
      const { product, productId, size, quantity = 1, price } = action.payload;
      const targetId = productId || product?._id || product?.id;
      const existingIndex = state.items.findIndex(
        (item) =>
          (item.productId === targetId || item.product?._id === targetId) &&
          item.size === size
      );

      if (existingIndex > -1) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({
          product,
          productId: targetId,
          size,
          quantity,
          price: price ?? product?.price?.amount ?? 0,
        });
      }
    },
    updateQuantity: (state, action) => {
      const { productId, size, quantity } = action.payload;
      const item = state.items.find(
        (i) => (i.productId === productId || i.product?._id === productId) && i.size === size
      );
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (i) => !( (i.productId === productId || i.product?._id === productId) && i.size === size )
          );
        } else {
          item.quantity = quantity;
        }
      }
    },
    removeItem: (state, action) => {
      const { productId, size } = action.payload;
      state.items = state.items.filter(
        (i) => !( (i.productId === productId || i.product?._id === productId) && i.size === size )
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleCartDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    setCartDrawer: (state, action) => {
      state.isDrawerOpen = !!action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setCart,
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
  toggleCartDrawer,
  setCartDrawer,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectIsCartDrawerOpen = (state) => state.cart.isDrawerOpen;
export const selectCartLoading = (state) => state.cart.isLoading;
export const selectCartError = (state) => state.cart.error;

export const selectCartTotalCount = (state) =>
  state.cart.items.reduce((acc, item) => acc + (item.quantity || 1), 0);

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((acc, item) => {
    const itemPrice = item.price ?? item.product?.price?.amount ?? 0;
    return acc + itemPrice * (item.quantity || 1);
  }, 0);

export default cartSlice.reducer;
