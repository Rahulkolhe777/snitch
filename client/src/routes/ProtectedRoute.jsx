import { useSelector } from 'react-redux';
import { Navigate, useLocation, Outlet } from 'react-router';
import { selectIsAuthenticated } from '../features/auth/authSlice';

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
