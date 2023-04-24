import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedMovie = ({ movie }) => {
  const navigate = useNavigate();
  return (
    <div
      className='bg-neutral-700 border  border-neutral-800 h-[600px] mb-4 rounded-xl relative cursor-pointer '
      onClick={() => navigate(`/movie/${movie?.id}`)}
    >
      <img
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt={movie?.title}
        className='mix-blend-overlay w-full h-full object-cover rounded-xl  '
      />

      <div className='   absolute bottom-2 left-5  overflow-hidden mr-10 sm:bottom-5 sm:left-8'>
        <h1 className='text-4xl sm:text-5xl font-bold mb-2 text-white'>
          {movie?.title}
        </h1>
        <p className='text-md sm:text-lg  mb-2 max-w-[800px] text-white '>
          {movie?.overview}
        </p>
      </div>
    </div>
  );
};

export default FeaturedMovie;
