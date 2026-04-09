function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search recipes by name or ingredient…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="search-input"
        />
        {value && (
          <button className="search-clear" onClick={() => onChange('')}>✕</button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;