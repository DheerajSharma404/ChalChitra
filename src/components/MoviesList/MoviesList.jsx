import React from "react";
import Movie from "../Movie/Movie";
const MoviesList = ({ movies, numberOfMovies, excludeFirst }) => {
  const startFrom = excludeFirst ? 1 : 0;
  return (
    <div className='grid grid-cols-1 xl:grid-cols-3  md:grid-cols-1 lg:grid-cols-2 gap-4 2xl:grid-cols-3'>
      {movies?.results.slice(startFrom, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </div>
  );
};

export default MoviesList;
