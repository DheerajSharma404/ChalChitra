import React from "react";
import { NavLink, Link } from "react-router-dom";
import Rating from "react-rating";
const Movie = ({ movie, i }) => {
  return (
    //Movie Card
    <>
      {/* {console.log(movie)} */}
      <NavLink
        to={`/movie/${movie.id}`}
        className='flex border border-neutral-800 bg-neutral-900 h-60 rounded-xl hover:scale-105 transform transition duration-300 ease-in-out overflow-hidden'
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt='movie poster'
          className='w-40  object-cover rounded-l-xl'
        />
        <div className='p-4 xs:pt-2 rounded-r-xl  '>
          <h1 className='text-2xl font-bold mb-2 xs:text-xl md:text-2xl lg:text-2xl'>
            {movie.title} ({movie?.release_date?.slice(0, 4)})
          </h1>
          <Rating
            initialRating={movie?.vote_average / 2}
            emptySymbol={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                />
              </svg>
            }
            fullSymbol={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='gold'
                className='w-4 h-4'
              >
                <path
                  fillRule='evenodd'
                  d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                  clipRule='evenodd'
                />
              </svg>
            }
            readonly
          />
          <p className='text-sm  text-neutral-500 overflow-y-scroll'>
            <span className='text-md text-white truncate'>Overview:</span>{" "}
            {movie.overview.slice(0, 100)}
            <span className='text-neutral-300'>
              <span to={`/movie/${movie.id}`}> ...Read More</span>
            </span>
          </p>
        </div>
      </NavLink>
    </>
  );
};
export default Movie;
