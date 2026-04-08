import { Routes, Route } from 'react-router-dom';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🐟 My Recipe</h1>
        <p>Discover seafood recipes from around the world</p>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;