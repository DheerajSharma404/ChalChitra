import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='bg-black  text-neutral-700  text-xs mt-8'>
      <div className='flex justify-center items-center gap-2 '>
        <NavLink
          to='https://www.linkedin.com/in/dheeraj-sharma-5ba698222/'
          className='hover:text-white transition duration-160 ease-in'
        >
          About Me
        </NavLink>
        <NavLink
          to='mailto:sharmaofficial1998@gmail.com'
          className='hover:text-white transition duration-160 ease-in'
        >
          Contact Me
        </NavLink>
        <NavLink
          to='https://github.com/DheerajSharma404'
          className='hover:text-white transition duration-160 ease-in'
        >
          My Projects
        </NavLink>
      </div>
      <div className='flex justify-center items-center'>
        {" "}
        &copy; 2023 ChalChitra from Dheeraj Sharma{" "}
      </div>
    </footer>
  );
};

export default Footer;
