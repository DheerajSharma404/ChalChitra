import { Routes, Route, Outlet } from "react-router-dom";
import {
  NavBar,
  Movies,
  Actors,
  Profile,
  MovieInformation,
} from "./components";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Movies />} />
        <Route path='movie/:id' element={<MovieInformation />} end />
        <Route path='actors/:id' element={<Actors />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='profile/:id' element={<Profile />} />
        <Route path='/approved' element={<Movies />} />
      </Route>
    </Routes>
  );
};

const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className=' absolute top-16 md:left-[228px] -z-10 pb-4  transition-all  duration-75 ease-in-out  '>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
