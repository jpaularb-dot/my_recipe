function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="recipe-search" className="search-label">
        Search Recipes
      </label>
      <div className="search-wrap">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          id="recipe-search"
          type="text"
          placeholder="Search by name or ingredient…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="search-input"
          aria-label="Search recipes by name or ingredient"
        />
        {value && (
          <button
            className="search-clear"
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
