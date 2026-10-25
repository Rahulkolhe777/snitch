import { Link } from 'react-router';
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../hooks/useCart';

export const ProductCard = ({ product }) => {
  const { addItem, toggleDrawer } = useCart();

  if (!product) return null;

  const id = product._id || product.id;
  const image =
    (Array.isArray(product.images) && product.images.length > 0 && product.images[0]) ||
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80';

  const priceAmount = product.price?.amount ?? product.price ?? 0;
  const currency = product.price?.currency || 'INR';

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Select default size or first available
    const defaultSize = product.sizes?.[0]?.size || 'M';
    addItem({
      product,
      productId: id,
      size: defaultSize,
      quantity: 1,
      price: priceAmount,
    });
    toggleDrawer();
  };

  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="product-card-image-wrapper">
        <img
          src={image}
          alt={product.title}
          className="product-card-image"
          loading="lazy"
        />
        {product.sizes?.length > 0 && (
          <span className="product-badge">
            {product.sizes.length} Sizes
          </span>
        )}
      </Link>

      <div className="product-card-body">
        <h3 className="product-card-title">
          <Link to={`/product/${id}`}>{product.title}</Link>
        </h3>

        <p className="product-card-description">
          {product.description?.slice(0, 55)}
          {product.description?.length > 55 ? '...' : ''}
        </p>

        <div className="product-card-footer">
          <span className="product-price">
            {formatPrice(priceAmount, currency)}
          </span>

          <button
            type="button"
            className="btn btn-sm btn-outline quick-add-btn"
            onClick={handleQuickAdd}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
