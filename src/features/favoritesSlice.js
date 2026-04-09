import { createSlice } from '@reduxjs/toolkit';

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem('recipe_favorites');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (favorites) => {
  try {
    localStorage.setItem('recipe_favorites', JSON.stringify(favorites));
  } catch {}
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: loadFromStorage(),
  },
  reducers: {
    toggleFavorite(state, action) {
      const meal = action.payload;
      const exists = state.items.find((m) => m.idMeal === meal.idMeal);
      if (exists) {
        state.items = state.items.filter((m) => m.idMeal !== meal.idMeal);
      } else {
        state.items.push(meal);
      }
      saveToStorage(state.items);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;