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
    <div className="status-msg error">❌ Could not load this recipe. Please go back and try again.</div>
  );

  const meal = data?.meals?.[0];
  if (!meal) return <div className="status-msg">Recipe not found.</div>;

  const isFav = favorites.some((m) => m.idMeal === meal.idMeal);
  const mealForFav = {
    idMeal: meal.idMeal,
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
  };

  // Build ingredients list
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : '',
      });
    }
  }

  // Build numbered steps — split on newlines OR on "STEP N." patterns
  const rawInstructions = meal.strInstructions || '';
  const steps = rawInstructions
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5)      // skip very short/empty lines
    .reduce((acc, line) => {
      // If a line starts with "STEP" or a number+period, treat as its own step
      const isHeader = /^(step\s*\d+[:\.]?|\d+[\.\)])/i.test(line);
      if (isHeader) {
        // Strip the "STEP N" prefix before pushing
        acc.push(line.replace(/^(step\s*\d+[:\.\s]+|\d+[\.\)\s]+)/i, '').trim());
      } else {
        acc.push(line);
      }
      return acc;
    }, [])
    .filter(Boolean);

  const ytId = meal.strYoutube
    ? meal.strYoutube.split('v=')[1]?.split('&')[0]
    : null;

  return (
    <section className="detail-page">

      {/* ── Top bar ── */}
      <div className="detail-top-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back to Recipes</button>
        <button
          className={`detail-fav-btn ${isFav ? 'fav-active' : ''}`}
          onClick={() => dispatch(toggleFavorite(mealForFav))}
        >
          {isFav ? '♥ Saved to Favorites' : '♡ Save to Favorites'}
        </button>
      </div>

      {/* ── Hero: image | info | video ── */}
      <div className="detail-hero">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="detail-img" />

        <div className="detail-info">
          <div className="detail-tags">
            {meal.strCategory && <span className="detail-tag">🍽 {meal.strCategory}</span>}
            {meal.strArea && <span className="detail-tag detail-tag--area">🌍 {meal.strArea}</span>}
          </div>
          <h2 className="detail-title">{meal.strMeal}</h2>
          {meal.strSource && (
            <a href={meal.strSource} target="_blank" rel="noreferrer" className="source-link">
              📄 View Original Source
            </a>
          )}
          <p className="detail-meta">
            <strong>{ingredients.length}</strong> ingredients &nbsp;·&nbsp;
            <strong>{steps.length}</strong> steps
          </p>
        </div>

        <div className="detail-video-box">
          {ytId ? (
            <>
              <p className="video-label">📺 Watch Tutorial</p>
              <div className="yt-embed-wrap">
                <iframe
                  src={`https://www.youtube.com/embed/${ytId}`}
                  title={`How to make ${meal.strMeal}`}
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
              <p>No video available for this recipe</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Body: ingredients + instructions ── */}
      <div className="detail-body">

        {/* Ingredients */}
        <div className="ingredients-box">
          <h3>🥘 Ingredients</h3>
          <ul>
            {ingredients.map((item, idx) => (
              <li key={idx}>
                <span className="measure">{item.measure || '—'}</span>
                <span className="ing-name">{item.ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="instructions-box">
          <h3>📋 Instructions</h3>
          {steps.length > 0 ? (
            <ol className="steps-list">
              {steps.map((step, idx) => (
                <li key={idx} className="step-item">
                  <span className="step-num" aria-hidden="true">{idx + 1}</span>
                  <p className="step-text">{step}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="step-text" style={{ padding: '1rem 0', whiteSpace: 'pre-line' }}>
              {rawInstructions}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default RecipeDetail;
