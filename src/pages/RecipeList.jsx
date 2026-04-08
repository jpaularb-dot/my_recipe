import { useState } from 'react';
import { useGetSeafoodListQuery } from '../features/recipesApi';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 8;

function RecipeList() {
  const { data, isLoading, isError } = useGetSeafoodListQuery();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return <div className="status-msg">⏳ Loading recipes...</div>;
  if (isError) return <div className="status-msg error">❌ Failed to load recipes. Please try again.</div>;

  const meals = data?.meals || [];

  const filtered = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1); // reset to page 1 on new search
  };

  return (
    <section className="recipe-list-page">
      <SearchBar value={search} onChange={handleSearch} />

      {filtered.length === 0 ? (
        <p className="status-msg">No recipes found for "{search}".</p>
      ) : (
        <>
          <p className="results-count">{filtered.length} recipe(s) found</p>
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