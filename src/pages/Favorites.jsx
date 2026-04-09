import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleFavorite } from '../features/favoritesSlice';

function Favorites() {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section className="recipe-list-page">
      <div className="hero-banner hero-banner--fav">
        <div className="hero-text">
          <h2>❤️ My Favorites</h2>
          <p>Your saved seafood recipes, all in one place</p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🤍</span>
          <p>You haven't saved any recipes yet.</p>
          <button className="clear-btn" onClick={() => navigate('/')}>Browse Recipes</button>
        </div>
      ) : (
        <>
          <p className="results-count">
            <strong>{favorites.length}</strong> saved recipe{favorites.length !== 1 ? 's' : ''}
          </p>
          <div className="recipe-grid">
            {favorites.map((meal) => (
              <div
                key={meal.idMeal}
                className="recipe-card"
                onClick={() => navigate(`/recipe/${meal.idMeal}`)}
              >
                <div className="card-img-wrap">
                  <img src={meal.strMealThumb} alt={meal.strMeal} className="card-img" />
                  <button
                    className="fav-btn fav-active"
                    onClick={(e) => { e.stopPropagation(); dispatch(toggleFavorite(meal)); }}
                    aria-label="Remove from favorites"
                  >
                    ♥
                  </button>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{meal.strMeal}</h3>
                  <span className="card-badge">🌊 Seafood</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Favorites;