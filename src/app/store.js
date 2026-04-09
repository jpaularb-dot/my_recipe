import { configureStore } from '@reduxjs/toolkit';
import { recipesApi } from '../features/recipesApi';
import favoritesReducer from '../features/favoritesSlice';

export const store = configureStore({
  reducer: {
    [recipesApi.reducerPath]: recipesApi.reducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipesApi.middleware),
});