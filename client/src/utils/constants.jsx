export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  USER_INFO: 'userInfo',
  CART: 'local_cart',
};

export const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'shirts', label: 'Shirts' },
  { id: 't-shirts', label: 'T-Shirts' },
  { id: 'jeans', label: 'Jeans' },
  { id: 'jackets', label: 'Jackets' },
  { id: 'trousers', label: 'Trousers' },
];

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest Arrivals' },
];

export const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
