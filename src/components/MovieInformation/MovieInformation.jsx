import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Rating from "react-rating";
import genreIcons from "../../assets/genreIcons";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategorySlice";
import {
  useGetListQuery,
  useGetMovieDetailsQuery,
  useGetRecommendedMoviesQuery,
} from "../../services/TMDB";
import { userSelector } from "../../features/auth";
import Footer from "../Footer/Footer";

import { FadeLoader } from "react-spinners";
import cancel from "../../assets/images/cancel.png";
import heart from "../../assets/images/heart.png";
import heartFilled from "../../assets/images/heart-filled.png";
import watchlist from "../../assets/images/watchlist.png";
import watchlistFilled from "../../assets/images/watchlist-filled.png";
import back from "../../assets/images/back.png";
import globe from "../../assets/images/globe.png";
import imdb from "../../assets/images/imdb.png";
import trailer from "../../assets/images/trailer.png";

const tmbdApiKey = import.meta.env.VITE_TMBD_KEY;

const MovieInformation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetMovieDetailsQuery(id);

  const { user } = useSelector(userSelector);

  const {
    data: recommendedMovies,
    error: recommendedMoviesError,
    isLoading: recommendedMoviesIsLoading,
  } = useGetRecommendedMoviesQuery({
    list: "/recommendations",
    movie_id: id,
  });

  console.log("DATA", data);

  const { data: favourtieMovies } = useGetListQuery({
    listName: "/favorite/movies",
    account_id: user.id,
    session_id: localStorage.getItem("session_id"),
    page: 1,
  });

  const { data: watchlistMovies } = useGetListQuery({
    listName: "/watchlist/movies",
    account_id: user.id,
    session_id: localStorage.getItem("session_id"),
    page: 1,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    setIsFavorite(
      !!favourtieMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favourtieMovies, data]);
  useEffect(() => {
    setIsWatchlist(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  const handleFavorite = async () => {
    const session_id = localStorage.getItem("session_id");
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${tmbdApiKey}&session_id=${session_id}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isFavorite,
      }
    );
    setIsFavorite((isFavorite) => !isFavorite);
  };

  const handleWatchlist = async () => {
    const session_id = localStorage.getItem("session_id");
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${tmbdApiKey}&session_id=${session_id}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isWatchlist,
      }
    );
    setIsWatchlist((isWatchlist) => !isWatchlist);
  };

  const handleTrailer = () => {
    setIsModalOpen((prev) => !prev);
    window.scrollTo(0, 0);
  };

  if (isLoading)
    return (
      <div className='w-[90vw] flex justify-center items-center'>
        {" "}
        <FadeLoader color='#ff0000' aria-label='Loading Spinner' />
      </div>
    );
  if (error) {
    return (
      <div className='flex justify-center items-center'>
        <h1>Something went wrong - </h1>
        &nbsp;
        <NavLink to={navigate(-1)} className='text-red-700'>
          Go back
        </NavLink>
      </div>
    );
  }

  return (
    <div className='flex flex-col px-4  relative'>
      <div className='flex flex-col lg:flex-row '>
        <div className='w-full md:w-2/3 sm:w-2/3 sm:mx-auto sm:pb-4  '>
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
            className='object-cover rounded-3xl border border-neutral-800'
          />
        </div>
        <div className='w-full md:w-3/3  sm:text-center md:mx-auto  xs:px-0   lg:px-8 '>
          <h1 className='text-6xl md:text-center font-extrabold pb-4 xs:pt-4 xs:text-4xl xs:text-center md:text-6xl md:pt-0 lg:pt-0'>
            {data.title} ( {data?.release_date?.slice(0, 4)} )
          </h1>
          <p className='text-xl text-center text-neutral-500 pb-2 '>
            {data.tagline}
          </p>
          <div>
            <p className='text-2xl font-bold text-white pb-2 lg:justify-start flex justify-start items-center xs:justify-center'>
              Overview{" "}
              <span
                className={` py-1 px-2 rounded-full border border-neutral-800 mx-4 text-xs  ${
                  data.status === "Released" ? "bg-green-600" : "bg-red-700"
                }`}
              >
                {data?.status}
              </span>
            </p>
            <p className='text-lg text-neutral-500 pb-2 xs:pb-4 lg:text-start xs:text-center'>
              {data.overview}
            </p>
          </div>
          <div className='flex sm:flex-col justify-between items-center pb-4 xs:flex-col xs:justify-center md:items-start lg:items-start '>
            <div className='flex justify-center items-center pb-4 lg:justify-between xs:flex-col md:flex-row lg:flex-row md:justify-center w-full'>
              <Rating
                initialRating={data?.vote_average / 2}
                emptySymbol={
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='md:w-8 md:h-8 lg:w-8 lg:h-8 xs:w-6 xs:h-6'
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
                    className='md:w-8 md:h-8 lg:w-8 lg:h-8 xs:w-6 xs:h-6 '
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
              <span className='text-xl ml-2 font-bold sm:text-2xl'>
                {data?.vote_average.toFixed(1)} / 10 ({data?.vote_count} votes)
              </span>
            </div>
            <p className='text-xl font-bold sm:text-2xl md:mx-auto lg:mx-0'>
              {data?.runtime} min - Language: {data?.spoken_languages[0]?.name}
            </p>
          </div>
          <div className='flex flex-wrap justify-start sm:justify-center items-center gap-2 pb-4 lg:justify-start xs:justify-center'>
            {data?.genres.map(({ name, id }) => (
              <NavLink
                key={id}
                to='/'
                className='py-2 px-6  border border-neutral-800 rounded-full  whitespace-nowrap flex justify-start items-center gap-2 hover:bg-red-700 hover:text-white transition duration-300 ease-in-out my-2'
                onClick={() => dispatch(selectGenreOrCategory(id))}
              >
                <img
                  src={genreIcons[name.toLowerCase()]}
                  alt='genreIcon'
                  className='w-5 h-5 invert focus:invert-0'
                />
                <span>{name}</span>
              </NavLink>
            ))}
          </div>
          <div className='pb-4'>
            <p className='text-3xl font-bold text-white pb-6 lg:text-start xs:text-center '>
              Top Cast
            </p>
            {data?.credits?.cast?.length !== 0 ? (
              <div className='flex flex-wrap  gap-2 justify-between items-center lg:justify-start xs:gap-4 xs:justify-center'>
                {data &&
                  data.credits?.cast
                    ?.map((character, i) =>
                      character.profile_path ? (
                        <NavLink
                          key={i}
                          to={`/actors/${character.id}`}
                          className='flex flex-col justify-between items-center   '
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                            alt={character?.name}
                            className='w-24 h-24  rounded-full  border border-neutral-800 object-cover'
                          />
                          <p className=''>{character?.name}</p>
                          <p className='text-neutral-600'>
                            {character?.character
                              .split(" ")
                              .slice(0, 1)
                              .join(" ")}
                          </p>
                        </NavLink>
                      ) : (
                        <NavLink
                          to={`/actors/${character.id}`}
                          className='flex flex-col justify-between items-center '
                        >
                          <div className='w-24 h-24  rounded-full  text-xl font-bold border border-neutral-800 object-cover flex justify-center items-center'>
                            {character?.name.split(" ").map((name) => name[0])}
                          </div>
                          <p className=''>{character?.name}</p>
                          <p className='text-neutral-600'>
                            {character?.character
                              .split(" ")
                              .slice(0, 1)
                              .join(" ")}
                          </p>
                        </NavLink>
                      )
                    )
                    .slice(0, 6)}
              </div>
            ) : (
              <p className='text-xl font-bold text-white pb-6 lg:text-start xs:text-center'>
                No Cast Found
              </p>
            )}
          </div>

          <div>
            <div
              id='buttonGroup1'
              className='flex flex-wrap justify-start sm:justify-center items-center gap-2 pb-4 lg:justify-start xs:justify-center'
            >
              <NavLink
                to={data?.homepage}
                className='py-2 px-6  border border-neutral-800 rounded-full  whitespace-nowrap flex justify-start items-center gap-2 hover:bg-red-700 active:scale-95 transform transition duration-200 ease-in-out '
              >
                <img
                  src={globe}
                  alt='genreIcon'
                  className='w-5 h-5 invert focus:invert-0'
                />
                <span>WEBSITE</span>
              </NavLink>
              <NavLink
                to={`https://www.imdb.com/title/${data?.imdb_id}`}
                className='py-2 px-6  border border-neutral-800 rounded-full  whitespace-nowrap flex justify-start items-center gap-2 hover:bg-red-700 active:scale-95 transform transition duration-200 ease-in-out   '
              >
                <img
                  src={imdb}
                  alt='genreIcon'
                  className='w-6 h-6 invert focus:invert-0'
                />
                <span>IMDB</span>
              </NavLink>
              <button
                className='py-2 px-6  border border-neutral-800 rounded-full  whitespace-nowrap flex justify-start items-center gap-2 hover:bg-red-700 active:scale-95 transform transition duration-200 ease-in-out   '
                onClick={handleTrailer}
              >
                <img
                  src={trailer}
                  alt='genreIcon'
                  className='w-5 h-5 invert focus:invert-0'
                />
                <span>TRAILER</span>
              </button>
            </div>
            <div
              id='btn-group-2'
              className='flex flex-wrap justify-start sm:justify-center items-center gap-2 pb-4 lg:justify-start xs:justify-center'
            >
              <button
                className='py-2 px-6  border border-neutral-800 rounded-full  whitespace-nowrap flex justify-start items-center gap-2 hover:bg-red-700 active:scale-95 transform transition duration-200 ease-in-out '
                onClick={handleFavorite}
              >
                <img
                  src={isFavorite ? ` ${heartFilled}` : `${heart}`}
                  alt='genreIcon'
                  className='w-5 h-5 '
                />
                <span>
                  {isFavorite ? "REMOVE FROM FAVOURITE" : "ADD TO FAVOURITE"}
                </span>
              </button>
              <button
                className='py-2 px-6  border border-neutral-800 rounded-full  whitespace-nowrap flex justify-start items-center gap-2 hover:bg-red-700 active:scale-95 transform transition duration-200 ease-in-out  '
                onClick={handleWatchlist}
              >
                <img
                  src={isWatchlist ? ` ${watchlistFilled} ` : `${watchlist}`}
                  alt='genreIcon'
                  className='w-5 h-5'
                />
                <span>
                  {isWatchlist ? "REMOVE FROM WATCHLIST" : "ADD TO WATCHLIST"}
                </span>
              </button>
              <button
                onClick={() => navigate(-1)}
                className='py-2 px-6  border border-neutral-800 rounded-full  whitespace-nowrap flex justify-start items-center gap-2 hover:bg-red-700 active:scale-95 transform transition duration-200 ease-in-out '
              >
                <img
                  src={back}
                  alt='genreIcon'
                  className='w-5 h-5 invert focus:invert-0'
                />
                <span>GO BACK</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className=' font-bold p-6 text-center sm:text-3xl  xs:text-3xl md:text-4xl lg:text-5xl'>
          ScreenShots
        </h1>
        <div className=' '>
          {data?.images?.backdrops?.length !== 0 ? (
            <div
              className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 justify-center items-center place-content-center
            '
            >
              {data?.images?.backdrops?.map((image, i) => (
                <img
                  key={i}
                  src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                  alt={data?.title}
                  className='w-full object-cover border border-neutral-800 rounded-lg'
                />
              ))}
            </div>
          ) : (
            <h1 className='text-xl  text-center text-red-700 font-extrabold p-6'>
              No Screenshots Available
            </h1>
          )}
        </div>
      </div>
      <div className='flex flex-col justify-center items-center '>
        <h1 className='text-6xl font-bold p-6 text-center xs:text-3xl  sm:text-3xl md:text-4xl lg:text-5xl'>
          Reviews
        </h1>

        {data?.reviews?.results?.length !== 0 ? (
          <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 items-center place-content-center '>
            {data?.reviews?.results?.map((review, i) => (
              <div
                key={i}
                className='flex flex-col justify-start items-start gap-4 p-4 border border-neutral-800 rounded-xl'
              >
                <div className='flex  justify-start items-start gap-4 '>
                  {review?.author_details?.avatar_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${review?.author_details?.avatar_path}`}
                      alt={review.author}
                      className='w-10 h-10 object-cover rounded-full'
                    />
                  ) : (
                    <div className='py-[9px] px-[10px]  font-bold  rounded-full bg-red-700'>
                      {review?.author_details?.name
                        .split(" ")
                        .map((name) => name[0])}
                    </div>
                  )}
                  <div className='flex flex-col'>
                    <p className='text-2xl font-extrabold'>{review?.author}</p>
                    <div className='flex justify-center items-center pb-1 lg:justify-start'>
                      <Rating
                        initialRating={review?.author_details?.rating / 2}
                        emptySymbol={
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-4 h-4 '
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
                      <span className='text-sm '>
                        {(review?.author_details?.rating / 2).toFixed(1)} / 5
                      </span>
                    </div>
                  </div>
                </div>
                <div className=' w-[100%] flex flex-col justify-start items-start h-56  overflow-y-scroll '>
                  <p className='text-sm text-neutral-400 w-full'>
                    {review.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className='text-xl  text-center text-red-700 font-extrabold p-6'>
            Sorry No Reviews Available
          </h1>
        )}
      </div>

      <div className='flex flex-col items-center my-6'>
        <h1 className='text-6xl font-bold p-6 xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl'>
          You Might Also Like
        </h1>
        <div className='  flex justify-center items-center gap-4 place-content-center'>
          {recommendedMovies?.results?.length !== 0 ? (
            // <MoviesList movies={recommendedMovies} numberOfMovies={6} />
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
              {recommendedMovies?.results.slice(0, 12).map((movie) => (
                <NavLink
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className='flex flex-col sm:justify-center sm:items-center  border-neutral-800  rounded-xl hover:scale-105 transform transition duration-300 ease-in-out overflow-hidden  lg:items-start xs:justify-center xs:items-center'
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    alt='movie poster'
                    className='w-60 object-cover rounded-xl border border-neutral-800 '
                  />
                  <div className='rounded-xl text-center'>
                    <p className='h-10 text-lg font-bold pt-2  overflow-hidden xs:w-full '>
                      {movie?.title} ({movie?.release_date?.slice(0, 4)})
                    </p>
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
            <div className='text-xl font-bold text-red-700 xs:text-center'>
              Sorry, Nothing Was Found!!
            </div>
          )}
        </div>
      </div>
      <Footer />

      <div className="border">
        <div
          className={` inline-flex flex-col absolute -top-6 left-0 w-full   bg-black  border border-red-700 rounded-3xl sm:h-[791px]  ${
            isModalOpen ? "visible" : "invisible"
          }`}
        >
          <div
            className='flex justify-end items-center p-4'
            onClick={() => setIsModalOpen((prev) => !prev)}
          >
            <img
              src={cancel}
              alt=''
              className='w-10 h-10 cursor-pointer hover:scale-110 transform transition duration-200 ease-in-out'
            />
          </div>
          {data?.videos?.results?.length > 0 ? (
            <iframe
              autoPlay
              title='trailer'
              className='w-full h-full pb-16'
              src={`https://www.youtube.com/embed/${data?.videos?.results[0].key}`}
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          ) : (
            <div className='flex justify-center items-center text-3xl font-bold text-neutral-600'>
              Sorry, No Video Was Found!!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieInformation;
