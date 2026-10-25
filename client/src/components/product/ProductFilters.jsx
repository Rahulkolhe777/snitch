import { PRODUCT_CATEGORIES, SORT_OPTIONS } from '../../utils/constants';

export const ProductFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  totalResults,
}) => {
  return (
    <div className="product-filters-wrapper">
      <div className="filter-search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search by title, style or keyword..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
          >
            ✕
          </button>
        )}
      </div>

      <div className="filter-controls-row">
        {/* Category Pills */}
        <div className="category-pills">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort dropdown & Result count */}
        <div className="sort-container">
          <label htmlFor="sort-select" className="sort-label">Sort:</label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {totalResults !== undefined && (
            <span className="results-badge">{totalResults} Items</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
