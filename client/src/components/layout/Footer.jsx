import { Link } from 'react-router';

export const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-column brand-col">
          <h3 className="footer-logo">SNITCH</h3>
          <p className="footer-tagline">
            Redefining modern streetwear and men's contemporary fashion with premium craftsmanship and bold aesthetics.
          </p>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop All</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Account</h4>
          <ul className="footer-links">
            <li><Link to="/login">Sign In</Link></li>
            <li><Link to="/register">Create Account</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Contact & Support</h4>
          <p className="footer-contact-item">support@snitch.co.in</p>
          <p className="footer-contact-item">100% Genuine Products</p>
          <p className="footer-contact-item">Free standard delivery available</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SNITCH. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
