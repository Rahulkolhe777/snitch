import { useEffect } from 'react';
import { Link } from 'react-router';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';
import { formatPrice } from '../../utils/formatPrice';

export const CartDrawer = () => {
  const { isDrawerOpen, setDrawer, items, totalCount, subtotal } = useCart();

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <div className="cart-drawer-backdrop" onClick={() => setDrawer(false)}>
      <div
        className="cart-drawer-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <h3>Shopping Bag ({totalCount})</h3>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setDrawer(false)}
            aria-label="Close cart drawer"
          >
            ✕
          </button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="drawer-empty-state">
              <span className="empty-icon">🛍️</span>
              <p>Your bag is empty</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setDrawer(false)}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="drawer-items-list">
              {items.map((item, idx) => (
                <CartItem
                  key={`${item.productId || item.product?._id}-${item.size}-${idx}`}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-subtotal">
              <span>Subtotal:</span>
              <span className="subtotal-amount">{formatPrice(subtotal)}</span>
            </div>
            <Link
              to="/cart"
              className="btn btn-secondary btn-block"
              onClick={() => setDrawer(false)}
            >
              View Full Bag
            </Link>
            <Link
              to="/checkout"
              className="btn btn-primary btn-block"
              onClick={() => setDrawer(false)}
            >
              Checkout Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
