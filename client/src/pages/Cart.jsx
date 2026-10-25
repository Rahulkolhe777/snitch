import { Link } from 'react-router';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

export const Cart = () => {
  const { items, totalCount, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page-empty">
        <span className="empty-cart-icon">🛒</span>
        <h2>Your Shopping Bag is Empty</h2>
        <p>Explore our latest arrivals and elevate your wardrobe today.</p>
        <Link to="/shop" className="btn btn-primary btn-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page-header">
        <h1>Shopping Bag ({totalCount})</h1>
        <button
          type="button"
          className="btn btn-ghost btn-sm clear-btn"
          onClick={clearCart}
        >
          Clear All
        </button>
      </div>

      <div className="cart-layout-grid">
        {/* Items List */}
        <div className="cart-items-column">
          {items.map((item, idx) => (
            <CartItem
              key={`${item.productId || item.product?._id}-${item.size}-${idx}`}
              item={item}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="cart-summary-column">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
