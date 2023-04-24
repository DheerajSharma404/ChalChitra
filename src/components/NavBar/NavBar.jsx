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

const NavBar = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(true);
  const [query, setQuery] = useState("");
  const { isAuthenticated, user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const isMobile = true;
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
        className='flex justify-between items-center fixed top-0 w-full  bg-black z-50 h-54 px-6 border border-l-0 border-r-0 border-t-0 border-neutral-800'
      >
        <div className=' w-52 flex justify-start items-center'>
          <div className='flex justify-between items-center'>
            <img
              src={menu}
              alt='menu button'
              className='w-8 h-8 mr-3 cursor-pointer md:cursor-not-allowed lg:cursor-not-allowed '
              onClick={() => setOpenDrawer(!openDrawer)}
            />
            <img
              className=' w-36 object-cover '
              src='https://fontmeme.com/permalink/230422/9caf21c866ce86d1b336f173f9957b86.png'
              alt='chalchitra Logo'
            />
          </div>
        </div>
        {(location.pathname === `/category/${id}` ||
          location.pathname === `/genre/${id}` ||
          location.pathname === "/") && (
          <div className='w-6/12'>
            <input
              type='text'
              id='simple-search'
              className='border rounded-full border-neutral-800 text-neutral-400 text-xl block w-full p-2 pl-6 bg-black focus:border-neutral-600 focus:outline-none placeholder-neutral-600'
              placeholder='Search ...'
              // onKeyDown={(e) => handleKeyDown(e)}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        )}
        <div className='flex gap-2'>
          {isAuthenticated ? (
            <NavLink
              to='/profile/:id'
              className='flex justify-center items-center gap-2 p-4 cursor-pointer'
            >
              {/* <p className='text-white text-xl font-bold'>
                {user?.name || user?.username}
              </p> */}
              <div className='w-10 h-10 flex justify-center items-center'>
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
              className=' flex justify-center items-center gap-2 py-3 px-8 m-2 bg-red-700 rounded-full hover:bg-red-800 transition duration-300 ease-in-out cursor-pointer'
              onClick={fetchToken}
            >
              <span>LOGIN</span>
              <img src={login} alt='loginIcon' className='w-6 invert' />
            </div>
          )}
        </div>
      </div>
      <div
        className={`border  border-l-0 border-t-0 border-b-0 border-neutral-800 w-60  fixed top-16 left-0 transition-all duration-300 sm:${
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
