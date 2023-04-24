import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Rating from "react-rating";
import {
  useGetActorDetailsQuery,
  useGetMoviesByActorIdQuery,
} from "../../services/TMDB";
import Pagination from "../Pagination/Pagination";
import Footer from "../Footer/Footer";
import { FadeLoader } from "react-spinners";
import back from "../../assets/images/back.png";
import imdb from "../../assets/images/imdb.png";

const Actors = () => {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetActorDetailsQuery(id);

  const {
    data: moviesByActor,
    error: errorMoviesByActor,
    isLoading: isLoadingMoviesByActor,
  } = useGetMoviesByActorIdQuery({ id, page });
  console.log("moviesbyActor", moviesByActor);
  console.log("data", data);
  if (isLoading) {
    return (
      <div className='w-[100vw-60px] flex justify-center items-center'>
        {" "}
        <FadeLoader color='#ff0000' aria-label='Loading Spinner' />
      </div>
    );
  }
  if (error) {
    return (
      <div className='text-red-700 text-center text-2xl'>
        Something went wrong
      </div>
    );
  }
  return (
    <div className=' w-full px-4'>
      <div className='flex flex-col lg:flex-row  md:justify-center md:items-center sm:justify-center sm:items-center '>
        <div className='w-full md:w-2/3 sm:w-1/3 lg:self-start lg:w-1/3 '>
          <img
            src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`}
            alt={data?.name}
            className=' object-cover rounded-3xl border border-neutral-800'
          />
        </div>
        <div className='w-full md:w-2/3 px-8 md:px-0 lg:px-8  lg:self-start xs:px-0'>
          <h1 className='text-6xl  text-center font-extrabold pb-2 sm:text-4xl'>
            {data?.name}
          </h1>
          <p className='text-xl text-center text-neutral-500 pb-2'>
            {new Date(data?.birthday).toDateString()}
          </p>
          <div className='pb-2 '>
            <p className='text-2xl font-bold text-white pb-2 md:text-center sm:text-center lg:text-start xs:text-center'>
              Biography
            </p>
            <p className='text-lg text-neutral-500  md:text-center sm:text-center lg:text-start xs:text-center'>
              {data?.biography.length !== 0
                ? data?.biography
                : "Sorry no biography yet!"}
            </p>
          </div>

          <div className=''>
            <div
              id='buttonGroup1'
              className='flex md:justify-center items-center gap-4 sm:justify-center lg:justify-start xs:justify-center'
            >
              <NavLink
                to={`https://www.imdb.com/title/${data?.imdb_id}`}
                className='py-2 px-6  border border-neutral-800 rounded-full  whitespace-nowrap flex justify-start items-center gap-2 hover:bg-red-700 transition duration-300 ease-in-out  my-2'
              >
                <img src={imdb} alt='imdbIcon' className='w-6 h-6 invert ' />
                <span>IMDB</span>
              </NavLink>
              <button
                className='py-2 px-6  border border-neutral-800 rounded-full  whitespace-nowrap flex justify-start items-center gap-2 hover:bg-red-700 transition duration-300 ease-in-out  my-2'
                onClick={() => navigate(-1)}
              >
                <img src={back} alt='backIcon' className='w-5 h-5 invert ' />
                <span>GO BACK</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center my-6 '>
        <h1 className='text-5xl font-extrabold p-6 md:text-center sm:text-center sm:text-4xl xs:text-3xl xs:text-center'>
          {data?.name}'s Movies
        </h1>
        <div className='  flex justify-center items-center gap-4'>
          {moviesByActor?.results !== 0 ? (
            // <MoviesList movies={recommendedMovies} numberOfMovies={6} />
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 place-content-center gap-4'>
              {moviesByActor?.results.slice(0, 12).map((movie) => (
                <NavLink
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className='flex flex-col sm:justify-center sm:items-center border-neutral-800  rounded-xl hover:scale-105 transform transition duration-300 ease-in-out '
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    alt='movie poster'
                    className='w-60 object-cover rounded-xl border border-neutral-800'
                  />
                  <div className=' rounded-r-xl w-[100%] '>
                    <h1 className='text-lg w-48 h-10  font-bold pt-2 pl-1 overflow-hidden '>
                      {movie?.title} ({movie?.release_date?.slice(0, 4)})
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
                  </div>
                </NavLink>
              ))}
            </div>
          ) : (
            <div className='text-xl font-bold text-neutral-600'>
              {" "}
              Sorry, Nothing Was Found!!
            </div>
          )}
        </div>
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={moviesByActor?.total_pages}
        />
        <Footer />
      </div>
    </div>
  );
};

export default Actors;
