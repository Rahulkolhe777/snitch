import { useEffect } from 'react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { productsApi } from '../api/products.api';
import {
  setProducts,
  setLoading,
  selectAllProducts,
  selectProductsLoading,
} from '../features/products/productsSlice';
import ProductGrid from '../components/product/ProductGrid';

export const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const isLoading = useSelector(selectProductsLoading);

  useEffect(() => {
    const fetchFeatured = async () => {
      if (products.length > 0) return;
      dispatch(setLoading(true));
      try {
        const response = await productsApi.getAll();
        const list = response?.data || response || [];
        dispatch(setProducts(list));
      } catch (err) {
        console.error('Failed to load featured products', err);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchFeatured();
  }, [dispatch, products.length]);

  const featuredList = products.slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <span className="hero-badge">NEW SEASON '26</span>
          <h1 className="hero-title">UNFILTERED CONTEMPORARY STREETWEAR</h1>
          <p className="hero-subtitle">
            Curated fits crafted for modern aesthetics. Elevate your everyday wardrobe with signature styles.
          </p>
          <div className="hero-cta-group">
            <Link to="/shop" className="btn btn-primary btn-lg">
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="value-props-section">
        <div className="value-props-grid">
          <div className="value-prop-card">
            <span className="prop-icon">⚡</span>
            <h3>Express Shipping</h3>
            <p>Fast and reliable dispatch on all domestic orders</p>
          </div>
          <div className="value-prop-card">
            <span className="prop-icon">✨</span>
            <h3>Premium Fabrics</h3>
            <p>Signature custom blends with durable construction</p>
          </div>
          <div className="value-prop-card">
            <span className="prop-icon">🔄</span>
            <h3>Hassle-Free Returns</h3>
            <p>7-day seamless return & exchange policy</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-header">
          <div>
            <span className="section-tag">TRENDING NOW</span>
            <h2 className="section-title">Latest Drops</h2>
          </div>
          <Link to="/shop" className="btn btn-outline btn-sm">
            View All ({products.length})
          </Link>
        </div>

        <ProductGrid
          products={featuredList}
          isLoading={isLoading}
          emptyMessage="No drops currently available. Check back soon!"
        />
      </section>
    </div>
  );
};

export default Home;
