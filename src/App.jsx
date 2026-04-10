import { Routes, Route, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import Footer from './components/Footer';
import './App.css';

function App() {
  const favCount = useSelector((state) => state.favorites.items.length);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="header-logo">🐟</span>
            <div>
              <h1 className="header-title">MyRecipe</h1>
              <p className="header-sub">Discover seafood recipes from around the world</p>
            </div>
          </div>
          <nav className="header-nav">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Browse
            </NavLink>
            <NavLink to="/favorites" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Favorites {favCount > 0 && <span className="nav-badge">{favCount}</span>}
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
