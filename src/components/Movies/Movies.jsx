import React, { useState, useEffect } from "react";
import MoviesList from "../MoviesList/MoviesList";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import { Pagination, FeaturedMovie, Footer } from "..";
import { FadeLoader } from "react-spinners";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategory, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isLoading } = useGetMoviesQuery({
    genreIdOrCategory,
    page,
    searchQuery,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (isLoading) {
    return (
      <div className='w-[80vw] flex justify-center items-center'>
        {" "}
        <FadeLoader color='#ff0000' aria-label='Loading Spinner' />
      </div>
    );
  }
  if (error) {
    return (
      <div className='text-center text-xl font-bold text-red-700'>
        Something went wrong
      </div>
    );
  }

  return (
    <main className='p-4 pt-0 pb-1 '>
      {data?.results?.length !== 0 && (
        <FeaturedMovie movie={data?.results[0]} />
      )}
      {data?.results?.length !== 0 ? (
        <MoviesList movies={data} numberOfMovies={19} excludeFirst />
      ) : (
        <div className=' flex justify-center items-center w-[80vw]  text-xl font-bold text-red-700'>
          No Movies Found
        </div>
      )}
      {data?.results?.length !== 0 && (
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={data?.total_pages}
        />
      )}
      <Footer />
    </main>
  );
};
export default Movies;
