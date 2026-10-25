import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsApi } from '../api/products.api';
import {
  setProducts,
  setLoading,
  setError,
  setCategoryFilter,
  setSearchQuery,
  setSortBy,
  selectAllProducts,
  selectProductsLoading,
  selectProductsError,
  selectProductFilters,
} from '../features/products/productsSlice';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import useDebounce from '../hooks/useDebounce';

export const Shop = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const { category, searchQuery, sortBy } = useSelector(selectProductFilters);

  const debouncedSearch = useDebounce(searchQuery, 250);

  useEffect(() => {
    const loadProducts = async () => {
      dispatch(setLoading(true));
      try {
        const response = await productsApi.getAll();
        const list = response?.data || response || [];
        dispatch(setProducts(list));
      } catch (err) {
        dispatch(setError(err.response?.data?.message || err.message || 'Failed to load products'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadProducts();
  }, [dispatch]);

  // Client-side filtering and sorting
  const filteredProducts = products.filter((p) => {
    // Search query
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      const matchTitle = p.title?.toLowerCase().includes(q);
      const matchDesc = p.description?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }
    // Category
    if (category !== 'all') {
      const titleLower = p.title?.toLowerCase() || '';
      const descLower = p.description?.toLowerCase() || '';
      if (!titleLower.includes(category) && !descLower.includes(category)) {
        return false;
      }
    }
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.price?.amount ?? a.price ?? 0;
    const priceB = b.price?.amount ?? b.price ?? 0;

    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    if (sortBy === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    return 0;
  });

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1 className="shop-title">Discover The Collection</h1>
        <p className="shop-subtitle">
          Engineered for modern silhouettes and everyday wear.
        </p>
      </div>

      <ProductFilters
        searchQuery={searchQuery}
        onSearchChange={(val) => dispatch(setSearchQuery(val))}
        selectedCategory={category}
        onCategoryChange={(cat) => dispatch(setCategoryFilter(cat))}
        sortBy={sortBy}
        onSortChange={(sort) => dispatch(setSortBy(sort))}
        totalResults={sortedProducts.length}
      />

      {error && <div className="alert-error">{error}</div>}

      <ProductGrid
        products={sortedProducts}
        isLoading={isLoading}
        emptyMessage="No products match your current filters. Try resetting search."
      />
    </div>
  );
};

export default Shop;
