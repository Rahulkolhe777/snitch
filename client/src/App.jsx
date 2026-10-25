import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authApi } from './api/auth.api';
import { setUser, selectIsAuthenticated } from './features/auth/authSlice';
import { useCart } from './hooks/useCart';
import AppRoutes from './routes/AppRoutes';

export const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { fetchCart } = useCart();

  useEffect(() => {
    // If access token is present, sync current user profile & cart
    if (isAuthenticated) {
      authApi
        .getMe()
        .then((res) => {
          const user = res?.data?.user || res?.data || res;
          if (user) {
            dispatch(setUser(user));
          }
        })
        .catch(() => {
          // Token may be invalid or expired; interceptor will attempt refresh
        });

      fetchCart();
    }
  }, [isAuthenticated, dispatch, fetchCart]);

  return <AppRoutes />;
};

export default App;