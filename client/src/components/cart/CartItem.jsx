import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../hooks/useCart';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  if (!item) return null;

  const product = item.product || {};
  const productId = item.productId || product._id || product.id;
  const title = product.title || 'Product';
  const price = item.price ?? product.price?.amount ?? 0;
  const image =
    (Array.isArray(product.images) && product.images[0]) ||
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80';

  const handleDecrease = () => {
    updateQuantity(productId, item.size, item.quantity - 1);
  };

  const handleIncrease = () => {
    updateQuantity(productId, item.size, item.quantity + 1);
  };

  const handleRemove = () => {
    removeItem(productId, item.size);
  };

  return (
    <div className="cart-item-row">
      <div className="cart-item-image-wrapper">
        <img src={image} alt={title} className="cart-item-img" />
      </div>

      <div className="cart-item-details">
        <h4 className="cart-item-title">{title}</h4>
        {item.size && <p className="cart-item-size">Size: <strong>{item.size}</strong></p>}
        <p className="cart-item-price">{formatPrice(price)}</p>

        <div className="cart-item-actions">
          <div className="quantity-controller">
            <button
              type="button"
              className="qty-btn"
              onClick={handleDecrease}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="qty-value">{item.quantity}</span>
            <button
              type="button"
              className="qty-btn"
              onClick={handleIncrease}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="cart-item-remove-btn"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
