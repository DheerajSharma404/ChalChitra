import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CategoryGenreBar from "../CategoryGenreBar/CategoryGenreBar";
import { searchMovie } from "../../features/currentGenreOrCategorySlice";
import { fetchToken, createSessionId, moviesApi } from "../../utils/index";
import { setUser, userSelector } from "../../features/auth";
import menu from "../../assets/images/menu.png";
import login from "../../assets/images/login.png";
import search from "../../assets/images/search.png";

const NavBar = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(true);
  const [query, setQuery] = useState("");
  const { isAuthenticated, user } = useSelector(userSelector);
  const dispatch = useDispatch();

  const token = localStorage.getItem("request_token");
  const session_idFromLocalStorage = localStorage.getItem("session_id");

  console.log("user", user);

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (session_idFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${session_idFromLocalStorage}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId(token);
          const { data: userData } = await moviesApi.get(
            `/account/?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [token]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log(query);
    dispatch(searchMovie(query));
  };

  return (
    <div>
      <div
        id='nav__container'
        className='flex justify-between items-center fixed top-0 w-full  bg-black z-50  py-3 px-4 border border-l-0 border-r-0 border-t-0 border-neutral-800 '
      >
        <div className=' w-52 flex justify-start items-center'>
          <div className='flex justify-between items-center'>
            <img
              src={menu}
              alt='menu button'
              className=' md:w-8 md:h-8 sm:w-6 sm:h-6  xs:w-6 xs:h-6  mr-2 cursor-pointer md:cursor-not-allowed lg:cursor-not-allowed'
              onClick={() => setOpenDrawer(!openDrawer)}
            />
            <img
              className=' w-36 object-cover cursor-pointer'
              src='https://fontmeme.com/permalink/230422/9caf21c866ce86d1b336f173f9957b86.png'
              alt='chalchitraLogo'
              onClick={() => navigate("/")}
            />
          </div>
        </div>
        {(location.pathname === `/category/${id}` ||
          location.pathname === `/genre/${id}` ||
          location.pathname === "/" ||
          location.pathname === "/approved") && (
          <div className='w-6/12 flex'>
            <input
              type='text'
              id='simple-search'
              className='border rounded-full border-neutral-800 text-neutral-400 text-xl  w-full p-2  pl-6  bg-black focus:border-neutral-600 focus:outline-none placeholder-neutral-600 sm:visible xs:invisible'
              placeholder='Search ...'
              // onKeyDown={(e) => handleKeyDown(e)}
              onChange={(e) => handleChange(e)}
              required
            />
            <div className='self-center'>
              <img
                src={search}
                alt='searchIcon'
                className='w-8   visible sm:invisible md:invisible lg:invisible xl:invisible 2xl:invisible'
              />
            </div>
          </div>
        )}
        <div className='flex gap-2'>
          {isAuthenticated ? (
            <NavLink
              to={`/profile/${user?.id}`}
              className='flex justify-center items-center gap-2 xs:pl-4 py-2 xs:pr-0 cursor-pointer'
            >
              {/* <p className='text-white text-xl font-bold'>
                {user?.name || user?.username}
              </p> */}
              <div className='md:w-10 md:h-10 lg:w-10 lg:h-10 xs:w-8 xs:h-8 flex justify-center items-center'>
                {/* {user.name.split(" ").map((name) => name[0])} */}
                <img
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                  alt=''
                  className='w-full h-full object-cover rounded-full'
                />
              </div>
            </NavLink>
          ) : (
            <div
              className=' flex justify-center items-center gap-2 py-2 px-8 m-2 mr-0 bg-red-700 rounded-full hover:bg-red-800 transition duration-300 ease-in-out cursor-pointer xs:text-xs xs:py-2 xs:px-5 xs:gap-1 '
              onClick={fetchToken}
            >
              <span>LOGIN</span>
              <img src={login} alt='loginIcon' className='w-6 invert xs:w-4' />
            </div>
          )}
        </div>
      </div>
      <div
        className={`border  border-l-0 border-t-0 border-b-0 border-neutral-800 w-60  fixed  top-20 left-0 transition-all duration-300 sm:${
          openDrawer ? "visible" : "invisible"
        } 
          ${openDrawer ? "visible" : "invisible"}
        md:visible`}
      >
        <CategoryGenreBar />
      </div>
    </div>
  );
};
export default NavBar;
