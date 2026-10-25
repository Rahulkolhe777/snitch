import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { authApi } from '../api/auth.api';
import {
  setCredentials,
  setLoading,
  setError,
  clearError,
  selectAuthLoading,
  selectAuthError,
} from '../features/auth/authSlice';
import { validateLogin } from '../validators/auth.validator';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoading = useSelector(selectAuthLoading);
  const serverError = useSelector(selectAuthError);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (formErrors[e.target.name]) {
      setFormErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    const { isValid, errors } = validateLogin(form);
    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    dispatch(setLoading(true));
    try {
      const response = await authApi.login({
        email: form.email,
        password: form.password,
      });

      const { user, accessToken } = response?.data || response;
      dispatch(setCredentials({ user, accessToken }));
      navigate(from, { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        err.message ||
        'Login failed';
      dispatch(setError(msg));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your Snitch account</p>

        {serverError && <div className="alert-error">{serverError}</div>}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            error={formErrors.email}
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            error={formErrors.password}
            required
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="btn-block auth-submit-btn"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>

        <p className="auth-footer-prompt">
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
