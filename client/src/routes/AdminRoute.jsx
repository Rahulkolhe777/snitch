import { useSelector } from 'react-redux';
import { Navigate, useLocation, Outlet } from 'react-router';
import { selectUser, selectIsAuthenticated } from '../features/auth/authSlice';

export const AdminRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const role = user?.role?.toLowerCase();
  const isAuthorized = role === 'admin' || role === 'seller';

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;
