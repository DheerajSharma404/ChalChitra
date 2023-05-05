import React, { useState, useEffect } from "react";
import CategoryGenreBar from "../CategoryGenreBar/CategoryGenreBar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { searchMovie } from "../../features/currentGenreOrCategorySlice";
import { fetchToken, createSessionId, moviesApi } from "../../utils/index";
import { setUser, userSelector } from "../../features/auth";

import menu from "../../assets/images/menu.png";
import login from "../../assets/images/login.png";
import search from "../../assets/images/search.png";
import searchRed from "../../assets/images/search_red.png";

const NavBar = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(true);
  const [query, setQuery] = useState("");
  const [mobileSearch, setMobileSearch] = useState(false);
  const { isAuthenticated, user } = useSelector(userSelector);

  const token = localStorage.getItem("request_token");
  const session_idFromLocalStorage = localStorage.getItem("session_id");

  // console.log("user", user);

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
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [token]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    // console.log(query);
    dispatch(searchMovie(query));
  };
  const handleMobileSearch = () => {
    setMobileSearch((prev) => !prev);
    dispatch(searchMovie(query));
  };

  return (
    <div>
      <div
        id='nav__container'
        className='flex justify-between items-center fixed top-0 w-full  bg-black  z-50  py-3 px-4 border border-l-0 border-r-0 border-t-0 border-neutral-800  '
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
              className='border rounded-full caret-red-600  border-neutral-800 text-white text-xl  w-full p-2  pl-6  bg-black focus:border-red-600 focus:outline-none placeholder-neutral-600 sm:visible xs:invisible  '
              placeholder='Search ...'
              onChange={(e) => handleChange(e)}
              required
            />
            <div className='self-center cursor-pointer '>
              <img
                src={search}
                alt='searchIcon'
                className={`w-8 xs:${
                  mobileSearch ? "invisible" : "visible"
                } sm:invisible md:invisible lg:invisible xl:invisible 2xl:invisible`}
                onClick={() => setMobileSearch((prev) => !prev)}
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
              <div className='w-8 h-8 flex justify-center items-center'>
                {user?.avatar?.tmdb?.avatar_path ? (
                  <img
                    src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                    alt=''
                    className='w-full h-full object-cover rounded-full'
                  />
                ) : (
                  <div className='py-[9px] px-[10px]  font-bold  rounded-full bg-red-700'>
                    {user?.name.split(" ").map((name) => name[0])}
                  </div>
                )}
              </div>
            </NavLink>
          ) : (
            <div
              className=' flex justify-center items-center gap-2 md:py-2 md:px-8 lg:px-8 lg:py-2  ml-3  mr-0 bg-red-700 rounded-full hover:bg-red-800 cursor-pointer xs:text-xs xs:py-2 xs:px-5 xs:gap-1 md:text-[16px] lg:text-[16px]  active:scale-95 transform transition duration-200  ease-in-out'
              onClick={fetchToken}
            >
              <span>LOGIN</span>
              <img
                src={login}
                alt='loginIcon'
                className='w-6 invert xs:w-4 md:w-6 lg:w-6'
              />
            </div>
          )}
        </div>
      </div>
      <div
        className={` w-full fixed top-[62px] px-4 pt-4 ${
          mobileSearch ? "visible" : "invisible"
        } backdrop-blur-md  pb-2.5  sm:invisible md:invisible lg:invisible xl:invisible 2xl:invisible  bg-gradient-to-b from-black to-blacl-800`}
      >
        <div
          className={`w-full border border-red-600 rounded-full flex justify-center items-center gap-2`}
        >
          <input
            type='text'
            id='mobile-SearchField'
            className=' w-full h-12 pl-6 pr-4 text-lg   caret-red-600  rounded-full   text-white  focus:border-red-700 focus:outline-none placeholder-neutral-600 bg-transparent'
            placeholder='Search ...'
            onChange={(e) => setQuery((prev) => e.target.value)}
          />
          <div className='mr-4'>
            <img
              src={searchRed}
              alt='searchIcon'
              className={`w-8`}
              onClick={handleMobileSearch}
            />
          </div>
        </div>
      </div>
      <div
        className={`border  border-l-0 border-t-0 border-b-0 border-neutral-800 w-60  fixed  top-16 left-0 transition-all duration-300 sm:${
          openDrawer ? "visible" : "invisible"
        } 
          ${openDrawer ? "visible" : "invisible"}
        md:visible `}
        onClick={() => setOpenDrawer((prev) => !prev)}
      >
        <CategoryGenreBar />
      </div>
    </div>
  );
};
export default NavBar;
