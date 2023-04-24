import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const tmbdApiKey = import.meta.env.VITE_TMBD_KEY;
export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    //* Get the genre
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmbdApiKey}`,
    }),
    //* Get the most popular movies
    getMovies: builder.query({
      query: ({ genreIdOrCategory, page, searchQuery }) => {
        if (searchQuery)
          return `search/movie?api_key=${tmbdApiKey}&query=${searchQuery}&page=${page}`;

        if (genreIdOrCategory && typeof genreIdOrCategory === "string") {
          return `movie/${genreIdOrCategory}?api_key=${tmbdApiKey}&page=${page}`;
        }
        if (genreIdOrCategory && typeof genreIdOrCategory === "number") {
          return `discover/movie?api_key=${tmbdApiKey}&with_genres=${genreIdOrCategory}&page=${page}`;
        }
        return `movie/popular?api_key=${tmbdApiKey}&page=${page}`;
      },
    }),
    //* Get the movie details
    getMovieDetails: builder.query({
      query: (id) =>
        `movie/${id}?api_key=${tmbdApiKey}&append_to_response=videos,credits,reviews,images`,
    }),
    //*  Get Recommended Movies
    getRecommendedMovies: builder.query({
      query: ({ list, movie_id }) =>
        `movie/${movie_id}/${list}?api_key=${tmbdApiKey}`,
    }),
    //* Get Actor Details
    getActorDetails: builder.query({
      query: (id) => `person/${id}?api_key=${tmbdApiKey}`,
    }),
    //* Get Movies by ActorId
    getMoviesByActorId: builder.query({
      query: ({ id, page }) =>
        `discover/movie?api_key=${tmbdApiKey}&with_cast=${id}&page=${page}`,
    }),

    //* Get List of favourite and watchlist movies
    getList: builder.query({
      query: ({ listName, accountId, session_id, page }) =>
        `account/${accountId}/${listName}?api_key=${tmbdApiKey}&session_id=${session_id}&page=${page}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieDetailsQuery,
  useGetRecommendedMoviesQuery,
  useGetActorDetailsQuery,
  useGetMoviesByActorIdQuery,
  useGetListQuery,
} = tmdbApi;
