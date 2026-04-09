import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetRecipeByIdQuery } from '../features/recipesApi';
import { toggleFavorite } from '../features/favoritesSlice';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetRecipeByIdQuery(id);
  const favorites = useSelector((state) => state.favorites.items);

  if (isLoading) return (
    <div className="status-msg"><span className="loader"></span> Loading recipe details…</div>
  );
  if (isError) return (
    <div className="status-msg error">❌ Could not load this recipe.</div>
  );

  const meal = data?.meals?.[0];
  if (!meal) return <div className="status-msg">Recipe not found.</div>;

  const isFav = favorites.some((m) => m.idMeal === meal.idMeal);
  const mealForFav = {
    idMeal: meal.idMeal,
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
  };

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  const steps = meal.strInstructions
    ? meal.strInstructions
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    : [];

  const ytId = meal.strYoutube
    ? meal.strYoutube.split('v=')[1]?.split('&')[0]
    : null;

  return (
    <section className="detail-page">
      {/* Top Bar */}
      <div className="detail-top-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <button
          className={`detail-fav-btn ${isFav ? 'fav-active' : ''}`}
          onClick={() => dispatch(toggleFavorite(mealForFav))}
        >
          {isFav ? '♥ Saved' : '♡ Save Recipe'}
        </button>
      </div>

      {/* Hero Section: Image, Info, Video */}
      <div className="detail-hero">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="detail-img" />

        <div className="detail-info">
          <div className="detail-tags">
            {meal.strCategory && <span className="detail-tag">{meal.strCategory}</span>}
            {meal.strArea && <span className="detail-tag detail-tag--area">🌍 {meal.strArea}</span>}
          </div>
          <h2 className="detail-title">{meal.strMeal}</h2>
          {meal.strSource && (
            <a href={meal.strSource} target="_blank" rel="noreferrer" className="source-link">
              📄 View Source
            </a>
          )}
        </div>

        <div className="detail-video-box">
          {ytId ? (
            <>
              <div className="yt-embed-wrap">
                <iframe
                  src={`https://www.youtube.com/embed/${ytId}`}
                  title={meal.strMeal}
                  allowFullScreen
                  className="yt-embed"
                />
              </div>
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="yt-open-btn"
              >
                ▶ Open in YouTube
              </a>
            </>
          ) : (
            <div className="yt-unavailable">
              <span>📹</span>
              <p>No video available</p>
            </div>
          )}
        </div>
      </div>

      {/* Body Section: Ingredients and Instructions */}
      <div className="detail-body">
        <div className="ingredients-box">
          <h3>🥘 Ingredients</h3>
          <ul>
            {ingredients.map((item, idx) => (
              <li key={idx}>
                <span className="measure">{item.measure}</span>
                <span className="ing-name">{item.ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="instructions-box">
          <h3>📋 Instructions</h3>
          <ol className="steps-list">
            {steps.map((step, idx) => (
              <li key={idx} className="step-item">
                <span className="step-num">{idx + 1}</span>
                <p className="step-text">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default RecipeDetail;