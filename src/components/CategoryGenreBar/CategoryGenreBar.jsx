import React from "react";
import { NavLink } from "react-router-dom";
import { useGetGenresQuery } from "../../services/TMDB";
import { useDispatch } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategorySlice";
import genreIcons from "../../assets/genreIcons";
import { FadeLoader } from "react-spinners";

import "./styles.css";

const CategoryGenreBar = () => {
  const dispatch = useDispatch();

  const { data, isLoading } = useGetGenresQuery();

  const categories = [
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Now Playing", value: "now_playing" },
  ];

  return (
    <div className='fixed top-[calc(100% - 64px)] left-0 h-screen  pb-16 px-2 overflow-auto bg-black '>
      <div className='select-none px-2  '>
        <span className=' text-start text-lg sm:text-2xl  font-bold text-neutral-500/80'>
          Categories:
        </span>
        <div className='text-start  '>
          {categories.map(({ label, value }) => (
            <NavLink
              to={`/`}
              key={value}
              className={`py-2 px-6  hover:bg-red-700  focus:bg-red-700 focus:text-white rounded-full whitespace-nowrap flex justify-start items-center gap-4 transition duration-200 ease-in-out my-2 `}
              onClick={() => dispatch(selectGenreOrCategory(value))}
            >
              <img
                src={genreIcons[label.toLowerCase()]}
                alt='categoryIcon'
                className='w-5 h-5 invert focus:invert-0'
              />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className='select-none px-2 pt-4  '>
        <span className=' text-start text-lg  sm:text-2xl font-bold  text-neutral-500/80'>
          Genres:
        </span>
        <div className='text-start '>
          {isLoading ? (
            <div className='flex justify-center items-center'>
              {" "}
              <FadeLoader color='#ff0000' aria-label='Loading Spinner ' />
            </div>
          ) : (
            data?.genres.map(({ name, id }) => (
              <NavLink
                key={id}
                to='/'
                className='py-2 px-6  rounded-full  whitespace-nowrap flex justify-start items-center gap-4 focus:bg-red-700 focus:text-white hover:bg-red-700 transition duration-100 ease-in-out   my-2'
                onClick={() => dispatch(selectGenreOrCategory(id))}
              >
                <img
                  src={genreIcons[name.toLowerCase()]}
                  alt='genreIcon'
                  className='w-5 h-5 invert'
                />
                <span>{name}</span>
              </NavLink>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryGenreBar;
