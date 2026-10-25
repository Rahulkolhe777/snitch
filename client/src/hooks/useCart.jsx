import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartApi } from '../api/cart.api';
import {
  setLoading,
  setError,
  setCart,
  addItem as addItemAction,
  updateQuantity as updateQtyAction,
  removeItem as removeItemAction,
  clearCart as clearCartAction,
  toggleCartDrawer as toggleCartDrawerAction,
  setCartDrawer as setCartDrawerAction,
  selectCartItems,
  selectCartTotalCount,
  selectCartSubtotal,
  selectIsCartDrawerOpen,
  selectCartLoading,
  selectCartError,
} from '../features/cart/cartSlice';
import { selectIsAuthenticated } from '../features/auth/authSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalCount = useSelector(selectCartTotalCount);
  const subtotal = useSelector(selectCartSubtotal);
  const isDrawerOpen = useSelector(selectIsCartDrawerOpen);
  const isLoading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Stable reference — safe to put in useEffect deps
  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) return;
    dispatch(setLoading(true));
    try {
      const response = await cartApi.getCart();
      const cartData = response?.data?.cart || response?.data || response;
      const products = cartData?.products || [];
      dispatch(setCart(products));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, isAuthenticated]);

  const addItem = useCallback(
    async ({ product, productId, size, quantity = 1, price }) => {
      const id = productId || product?._id || product?.id;
      dispatch(
        addItemAction({
          product,
          productId: id,
          size,
          quantity,
          price: price ?? product?.price?.amount,
        })
      );
      if (isAuthenticated) {
        try {
          await cartApi.addToCart({ productId: id, quantity, size });
        } catch (err) {
          console.error('Error syncing cart with server:', err);
        }
      }
    },
    [dispatch, isAuthenticated]
  );

  const updateQuantity = useCallback(
    (productId, size, quantity) => {
      dispatch(updateQtyAction({ productId, size, quantity }));
    },
    [dispatch]
  );

  const removeItem = useCallback(
    (productId, size) => {
      dispatch(removeItemAction({ productId, size }));
    },
    [dispatch]
  );

  const clearCart = useCallback(() => {
    dispatch(clearCartAction());
  }, [dispatch]);

  const toggleDrawer = useCallback(() => {
    dispatch(toggleCartDrawerAction());
  }, [dispatch]);

  const setDrawer = useCallback(
    (isOpen) => {
      dispatch(setCartDrawerAction(isOpen));
    },
    [dispatch]
  );

  return {
    items,
    totalCount,
    subtotal,
    isDrawerOpen,
    isLoading,
    error,
    addItem,
    fetchCart,
    updateQuantity,
    removeItem,
    clearCart,
    toggleDrawer,
    setDrawer,
  };
};

export default useCart;
