import { Link } from 'react-router';
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../hooks/useCart';

export const CartSummary = ({ onCheckout, showCheckoutButton = true }) => {
  const { subtotal, totalCount } = useCart();
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const grandTotal = subtotal + shipping;

  return (
    <div className="cart-summary-card">
      <h3 className="summary-title">Order Summary</h3>

      <div className="summary-row">
        <span>Items ({totalCount})</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      <div className="summary-row">
        <span>Estimated Delivery</span>
        <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
      </div>

      <div className="summary-divider" />

      <div className="summary-row total-row">
        <span>Total Amount</span>
        <span className="total-amount">{formatPrice(grandTotal)}</span>
      </div>

      {showCheckoutButton && (
        <div className="summary-actions">
          {onCheckout ? (
            <button
              type="button"
              className="btn btn-primary btn-block btn-lg"
              disabled={totalCount === 0}
              onClick={onCheckout}
            >
              Proceed to Checkout
            </button>
          ) : (
            <Link
              to="/checkout"
              className={`btn btn-primary btn-block btn-lg ${totalCount === 0 ? 'btn-disabled' : ''}`}
            >
              Proceed to Checkout
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default CartSummary;
