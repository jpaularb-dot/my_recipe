import { useState } from 'react';
import {
  useGetSeafoodListQuery,
  useFilterByAreaQuery,
} from '../features/recipesApi';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import AreaFilter from '../components/AreaFilter';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 8;

function RecipeList() {
  const [search, setSearch] = useState('');
  const [area, setArea] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: seafoodData, isLoading, isError } = useGetSeafoodListQuery();

  const doArea = area !== 'All';
  const { data: areaData, isFetching: areaFetching } =
    useFilterByAreaQuery(area, { skip: !doArea });

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleArea = (value) => {
    setArea(value);
    setCurrentPage(1);
  };

  if (isLoading && !seafoodData) return (
    <div className="status-msg">
      <span className="loader"></span>
      Loading recipes…
    </div>
  );
  if (isError) return (
    <div className="status-msg error">
      ❌ Failed to load recipes. Please check your connection and try again.
    </div>
  );

  const allMeals = seafoodData?.meals || [];

  // Area filter: cross-reference with seafood list by meal ID
  let areaFiltered = allMeals;
  if (doArea) {
    if (areaFetching) {
      areaFiltered = [];
    } else {
      const ids = new Set((areaData?.meals || []).map((m) => m.idMeal));
      areaFiltered = allMeals.filter((m) => ids.has(m.idMeal));
    }
  }

  // Search filter: case-insensitive match on meal name
  const filtered = search.trim()
    ? areaFiltered.filter((m) =>
        m.strMeal.toLowerCase().includes(search.toLowerCase())
      )
    : areaFiltered;

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const paginated = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  return (
    <section className="recipe-list-page">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-text">
          <h2>Explore Seafood Recipes</h2>
          <p>From classic coastal dishes to global ocean flavors</p>
        </div>
      </div>

      {/* Search + Filter Controls */}
      <div className="controls-row">
        <SearchBar value={search} onChange={handleSearch} />
        <AreaFilter value={area} onChange={handleArea} />
      </div>

      {/* Results */}
      {areaFetching && doArea ? (
        <div className="status-msg">
          <span className="loader"></span> Filtering by region…
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <p>
            No recipes found
            {search ? ` for "${search}"` : ''}
            {area !== 'All' ? ` in ${area}` : ''}.
          </p>
          <button
            className="clear-btn"
            onClick={() => { handleSearch(''); handleArea('All'); }}
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <p className="results-count">
            Showing <strong>{paginated.length}</strong> of <strong>{filtered.length}</strong> seafood recipes
            {area !== 'All' && <> · <em>{area}</em></>}
          </p>
          <div className="recipe-grid">
            {paginated.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </section>
  );
}

export default RecipeList;
