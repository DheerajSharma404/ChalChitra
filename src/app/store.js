import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";
import currentGenreOrCategoryReducer from "../features/currentGenreOrCategorySlice";
import userReducer from "../features/auth";
export default configureStore({
  reducer: {
    // tmdbApi: tmdbApi.reducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: currentGenreOrCategoryReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(tmdbApi.middleware);
  },
});
