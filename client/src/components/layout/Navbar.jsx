import { Link, NavLink, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectIsAuthenticated, logout } from '../../features/auth/authSlice';
import { useCart } from '../../hooks/useCart';

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { totalCount, toggleDrawer } = useCart();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <span className="brand-logo-text">SNITCH</span>
          <span className="brand-dot" />
        </Link>

        {/* Navigation Links */}
        <nav className="navbar-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            Shop
          </NavLink>
        </nav>

        {/* Right side actions */}
        <div className="navbar-actions">
          {/* Cart Icon / Drawer Button */}
          <button
            type="button"
            className="navbar-icon-btn cart-btn"
            onClick={toggleDrawer}
            aria-label="View Cart"
          >
            <span className="cart-icon">🛒</span>
            {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
          </button>

          {/* User profile / Auth buttons */}
          {isAuthenticated ? (
            <div className="navbar-user-dropdown">
              <Link to="/profile" className="navbar-user-info">
                <span className="user-avatar-circle">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
                <span className="user-name">{user?.name || 'Account'}</span>
              </Link>
              <button
                type="button"
                className="btn btn-sm btn-outline logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-auth-buttons">
              <Link to="/login" className="btn btn-sm btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
