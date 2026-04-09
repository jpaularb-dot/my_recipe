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
    <div className="status-msg"><span className="loader"></span> Loading recipes…</div>
  );
  if (isError) return (
    <div className="status-msg error">❌ Failed to load recipes. Please try again.</div>
  );

  const allMeals = seafoodData?.meals || [];

  // Area filter: cross-reference with seafood list
  let areaFiltered = allMeals;
  if (doArea) {
    if (areaFetching) {
      areaFiltered = [];
    } else {
      const ids = new Set((areaData?.meals || []).map((m) => m.idMeal));
      areaFiltered = allMeals.filter((m) => ids.has(m.idMeal));
    }
  }

  
  const filtered = search.trim()
    ? areaFiltered.filter((m) =>
        m.strMeal.toLowerCase().includes(search.toLowerCase())
      )
    : areaFiltered;

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="recipe-list-page">
      <div className="hero-banner">
        <div className="hero-text">
          <h2>Explore Seafood Recipes</h2>
          <p>From classic coastal dishes to global ocean flavors</p>
        </div>
      </div>

      <div className="controls-row">
        <SearchBar value={search} onChange={handleSearch} />
        <AreaFilter value={area} onChange={handleArea} />
      </div>

      {areaFetching && doArea ? (
        <div className="status-msg"><span className="loader"></span> Filtering…</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <p>No recipes found{search ? ` for "${search}"` : ''}.</p>
          <button className="clear-btn" onClick={() => { handleSearch(''); handleArea('All'); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <p className="results-count">
            Showing <strong>{paginated.length}</strong> of <strong>{filtered.length}</strong> seafood recipes
          </p>
          <div className="recipe-grid">
            {paginated.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </section>
  );
}

export default RecipeList;