import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { productsApi } from '../api/products.api';
import {
  setSelectedProduct,
  setLoading,
  setError,
  selectSelectedProduct,
  selectProductsLoading,
  selectProductsError,
} from '../features/products/productsSlice';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';
import ImageGallery from '../components/product/ImageGallery';
import Loader from '../components/common/Loader';

export const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectSelectedProduct);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const { addItem, toggleDrawer } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      dispatch(setLoading(true));
      try {
        const response = await productsApi.getById(id);
        const data = response?.data || response;
        dispatch(setSelectedProduct(data));
        if (data?.sizes?.length > 0) {
          setSelectedSize(data.sizes[0].size);
        }
      } catch (err) {
        dispatch(setError(err.response?.data?.message || err.message || 'Product not found'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (id) fetchDetail();
  }, [id, dispatch]);

  if (isLoading) {
    return <Loader message="Loading product details..." size="lg" />;
  }

  if (error || !product) {
    return (
      <div className="product-not-found-container">
        <h2>Product Not Found</h2>
        <p>{error || 'The requested product could not be located.'}</p>
        <Link to="/shop" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const priceAmount = product.price?.amount ?? product.price ?? 0;
  const currency = product.price?.currency || 'INR';
  const availableSizes = product.sizes || [];
  const activeSizeObj = availableSizes.find((s) => s.size === selectedSize);
  const currentStock = activeSizeObj?.stock ?? 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setValidationError('Please select a size first');
      return;
    }
    setValidationError('');
    addItem({
      product,
      productId: product._id || product.id,
      size: selectedSize,
      quantity,
      price: priceAmount,
    });
    toggleDrawer();
  };

  return (
    <div className="product-details-page">
      <div className="breadcrumb-nav">
        <Link to="/">Home</Link> &gt; <Link to="/shop">Shop</Link> &gt; <span>{product.title}</span>
      </div>

      <div className="product-details-grid">
        {/* Left: Gallery */}
        <div className="gallery-col">
          <ImageGallery images={product.images} title={product.title} />
        </div>

        {/* Right: Info */}
        <div className="info-col">
          <h1 className="product-title">{product.title}</h1>

          <div className="product-price-tag">
            {formatPrice(priceAmount, currency)}
            <span className="tax-inclusive-label">(Inclusive of all taxes)</span>
          </div>

          <div className="product-divider" />

          {/* Sizes */}
          <div className="size-selector-block">
            <div className="size-selector-header">
              <span className="label">Select Size</span>
              {activeSizeObj && (
                <span className="stock-label">
                  {currentStock > 0 ? `${currentStock} in stock` : 'Out of Stock'}
                </span>
              )}
            </div>

            <div className="size-options-row">
              {availableSizes.map((s) => (
                <button
                  key={s.size}
                  type="button"
                  disabled={s.stock === 0}
                  className={`size-btn ${selectedSize === s.size ? 'size-active' : ''} ${s.stock === 0 ? 'size-out' : ''}`}
                  onClick={() => {
                    setSelectedSize(s.size);
                    setValidationError('');
                  }}
                >
                  {s.size}
                </button>
              ))}
            </div>

            {validationError && <p className="validation-error-text">{validationError}</p>}
          </div>

          {/* Quantity picker */}
          <div className="quantity-picker-block">
            <span className="label">Quantity</span>
            <div className="quantity-controller">
              <button
                type="button"
                className="qty-btn"
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                type="button"
                className="qty-btn"
                disabled={activeSizeObj && quantity >= currentStock}
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to bag button */}
          <div className="action-buttons-group">
            <button
              type="button"
              className="btn btn-primary btn-block btn-lg"
              disabled={activeSizeObj && currentStock === 0}
              onClick={handleAddToCart}
            >
              {activeSizeObj && currentStock === 0 ? 'Out of Stock' : 'Add to Shopping Bag'}
            </button>
          </div>

          {/* Product Description */}
          <div className="product-description-block">
            <h3>Product Overview</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
