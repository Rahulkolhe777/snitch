import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { authApi } from '../api/auth.api';
import {
  setUser,
  logout,
  selectUser,
  selectIsAuthenticated,
} from '../features/auth/authSlice';
import Button from '../components/common/Button';

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authApi.getMe();
        const userData = response?.data?.user || response?.data || response;
        if (userData) {
          dispatch(setUser(userData));
        }
      } catch (err) {
        console.error('Failed to load user profile', err);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="profile-meta">
            <h2>{user?.name || 'Customer'}</h2>
            <p className="profile-email">{user?.email}</p>
            {user?.role && <span className="profile-role-badge">{user.role}</span>}
          </div>
        </div>

        <div className="profile-details-grid">
          <div className="detail-item">
            <span className="detail-label">Account ID</span>
            <span className="detail-value">{user?.id || user?._id || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email Verified</span>
            <span className="detail-value text-success">Verified</span>
          </div>
        </div>

        <div className="profile-actions">
          <Button variant="danger" size="md" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
