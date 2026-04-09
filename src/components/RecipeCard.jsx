import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/favoritesSlice';

function RecipeCard({ meal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFav = favorites.some((m) => m.idMeal === meal.idMeal);

  const handleFav = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(meal));
  };

  return (
  <div
      className="recipe-card"
      onClick={() => navigate(`/recipe/${meal.idMeal}`)}
    >
      <div className="card-img-wrap">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="card-img" />
        <button
          className={`fav-btn ${isFav ? 'fav-active' : ''}`}
          onClick={handleFav}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFav ? '♥' : '♡'}
        </button>
      </div>
      <div className="card-body">
        <h3 className="card-title">{meal.strMeal}</h3>
        <div className="card-footer-row">
          <span className="card-badge">🌊 Seafood</span>
          <span className={`card-save-label ${isFav ? 'saved' : ''}`}>
            {isFav ? '♥ Saved' : '♡ Save Recipe'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;