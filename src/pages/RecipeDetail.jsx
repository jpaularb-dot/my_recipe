import { useParams, useNavigate } from 'react-router-dom';
import { useGetRecipeByIdQuery } from '../features/recipesApi';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetRecipeByIdQuery(id);

  if (isLoading) return <div className="status-msg">⏳ Loading recipe details...</div>;
  if (isError) return <div className="status-msg error">❌ Could not load this recipe.</div>;

  const meal = data?.meals?.[0];
  if (!meal) return <div className="status-msg">Recipe not found.</div>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <section className="detail-page">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to list
      </button>

      <div className="detail-hero">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="detail-img" />
        <div className="detail-info">
          <h2 className="detail-title">{meal.strMeal}</h2>
          <p><strong>Category:</strong> {meal.strCategory}</p>
          <p><strong>Area:</strong> {meal.strArea}</p>
          {meal.strYoutube ? (
            <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="yt-link">
              ▶ Watch on YouTube
            </a>
          ) : null}
        </div>
      </div>

      <div className="detail-body">
        <div className="ingredients-box">
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((item, idx) => (
              <li key={idx}>
                <span className="measure">{item.measure}</span> {item.ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="instructions-box">
          <h3>Instructions</h3>
          <p>{meal.strInstructions}</p>
        </div>
      </div>
    </section>
  );
}

export default RecipeDetail;