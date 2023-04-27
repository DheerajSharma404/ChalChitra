import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import Rating from "react-rating";
import { NavLink } from "react-router-dom";
import { useGetListQuery } from "../../services/TMDB";
import Footer from "../Footer/Footer";
import logOut from "../../assets/images/logout.png";

const Profile = () => {
  const { isAuthenticated, user } = useSelector(userSelector);

  const { data: favourtieMovies, refetch: refetchFavorite } = useGetListQuery({
    listName: "/favorite/movies",
    account_id: user.id,
    session_id: localStorage.getItem("session_id"),
    page: 1,
  });

  const { data: watchlistMovies, refetch: refetchWatchlist } = useGetListQuery({
    listName: "/watchlist/movies",
    account_id: user.id,
    session_id: localStorage.getItem("session_id"),
    page: 1,
  });
  console.log("user", user);
  console.log("favourtieMovies", favourtieMovies);
  console.log("watchlistMovies", watchlistMovies);

  useEffect(() => {
    refetchFavorite();
    refetchWatchlist();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className=' px-6'>
      {isAuthenticated ? (
        <div className=' '>
          <div className='flex-col gap-2 md:flex-row md:justify-between lg:flex items-center'>
            <div className='md:text-5xl lg:text-5xl font-extrabold sm:text-center  lg:text-start xs:text-center xs:text-3xl   '>
              Welcome{" "}
              <span className='text-6xl font-extrabold '>{user.name}</span> !
            </div>
            <div
              className='flex  justify-start items-center cursor-pointer py-4 sm:justify-center sm:items-center lg:text-end xs:text-center xs:justify-center xs:items-center'
              onClick={logout}
            >
              <div className=' flex justify-center items-center gap-2  md:py-3 md:px-8 lg:px-8 lg:py-3 bg-red-700 rounded-full  hover:bg-red-800 hover:scale-95 transform transition duration-200 ease-in-out xs:text-sm xs:py-2 xs:px-5 md:text-[16px] lg:text-[16px]'>
                <span>LOGOUT</span>
                <img
                  src={logOut}
                  alt='logoutIcon'
                  className='w-6 invert  xs:w-4 md:w-6 lg:w-6'
                />
              </div>
            </div>
          </div>
          <div className='self-center'>
            <div className='text-3xl font-bold pt-6 pb-2 text-red-600 sm:text-center lg:text-start xs:text-center '>
              Favourites
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-6  place-content-center'>
              {favourtieMovies?.results?.map((movie) => (
                <NavLink
                  to={`/movie/${movie.id}`}
                  className='flex flex-col sm:justify-center sm:items-center  p-4 border-neutral-800  rounded-xl hover:scale-105 transform transition duration-300 ease-in-out overflow-hidden '
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt='movie poster'
                    className='w-60 object-cover rounded-xl border border-neutral-800'
                  />
                  <div className=' rounded-r-xl'>
                    <h1 className='text-lg w-48 h-10 font-bold pt-2 pl-1 overflow-hidden'>
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
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
          <div>
            <div className='text-3xl font-bold pt-6 pb-2 text-red-600 sm:text-center lg:text-start xs:text-center'>
              Watchlists
            </div>
            <div className='grid xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 place-content-center'>
              {watchlistMovies?.results?.map((movie) => (
                <NavLink
                  to={`/movie/${movie.id}`}
                  className='flex flex-col sm:justify-center sm:items-center p-4 border-neutral-800  rounded-xl hover:scale-105 transform transition duration-300 ease-in-out overflow-hidden xs'
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt='movie poster'
                    className='w-60 object-cover rounded-xl border border-neutral-800'
                  />
                  <div className=' rounded-r-xl'>
                    <h1 className='text-lg w-48 h-10 overflow-hidden font-bold pt-2 pl-1'>
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
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='text-xl  flex flex-col gap-2 justify-start items-start  xs:items-center xs:px-4 '>
          <span className='font-extrabold  text-6xl xs:text-3xl'>
            Welcome to{" "}
            <span className='text-6xl font-extrabold text-red-600 xs:text-5xl'>
              ChalChitra!
            </span>
          </span>
          <h1 className='xs:text-sm'>
            {" "}
            Please, Login to Add Movies to Favourites and Watchlist !!
          </h1>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Profile;
