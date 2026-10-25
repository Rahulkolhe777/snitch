import ProductCard from './ProductCard';
import Loader from '../common/Loader';

export const ProductGrid = ({
  products = [],
  isLoading = false,
  emptyMessage = 'No products found.',
}) => {
  if (isLoading) {
    return <Loader message="Loading products..." size="lg" />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-grid-empty">
        <span className="empty-icon">🔍</span>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product._id || product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
