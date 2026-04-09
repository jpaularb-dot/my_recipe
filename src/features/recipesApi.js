import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.themealdb.com/api/json/v1/1/' }),
  endpoints: (builder) => ({
    getSeafoodList: builder.query({
      query: () => 'filter.php?c=Seafood',
    }),
    getRecipeById: builder.query({
      query: (id) => `lookup.php?i=${id}`,
    }),
    filterByIngredient: builder.query({
      query: (ingredient) => `filter.php?i=${encodeURIComponent(ingredient)}`,
    }),
    filterByArea: builder.query({
      query: (area) => `filter.php?a=${encodeURIComponent(area)}`,
    }),
  }),
});

export const {
  useGetSeafoodListQuery,
  useGetRecipeByIdQuery,
  useFilterByIngredientQuery,
  useFilterByAreaQuery,
} = recipesApi;