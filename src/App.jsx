import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {
  NavBar,
  Movies,
  Actors,
  Profile,
  MovieInformation,
} from "./components";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Movies />,
        },
        {
          path: "movie",
          children: [
            {
              path: ":id",
              element: <MovieInformation />,
            },
          ],
        },
        {
          path: "/category",
          children: [
            {
              path: ":id",
              element: <Movies />,
            },
          ],
        },
        {
          path: "/genre",
          children: [
            {
              path: ":id",
              element: <Movies />,
            },
          ],
        },
        {
          path: "actors",
          children: [
            {
              path: ":id",
              element: <Actors />,
            },
          ],
        },
        {
          path: "profile",
          children: [
            {
              path: ":id",
              element: <Profile />,
            },
          ],
        },
        {
          path: "approved",
          element: <Movies />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

const Root = () => {
  return (
    <div>
      <NavBar />
      <div className=' absolute top-20 xs:top-18 md:left-60 -z-10 pb-4 overflow-hidden transition-all  duration-75 ease-in-out'>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
