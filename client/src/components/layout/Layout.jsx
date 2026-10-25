import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';

export const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        {children || <Outlet />}
      </main>
      <CartDrawer />
      <Footer />
    </div>
  );
};

export default Layout;
