import { useNavigate } from 'react-router-dom';

function RecipeCard({ meal }) {
  const navigate = useNavigate();

  return (
    <div
      className="recipe-card"
      onClick={() => navigate(`/recipe/${meal.idMeal}`)}
    >
      <img src={meal.strMealThumb} alt={meal.strMeal} className="card-img" />
      <div className="card-body">
        <h3 className="card-title">{meal.strMeal}</h3>
        <span className="card-badge">Seafood</span>
      </div>
    </div>
  );
}

export default RecipeCard;