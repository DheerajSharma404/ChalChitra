import React from "react";
import previous from "../../assets/images/previous.png";
import next from "../../assets/images/next.png";

const Pagination = ({ currentPage, setPage, totalPages }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };
  if (totalPages === 0) return null;
  return (
    <div className=' flex  justify-center items-center w-full'>
      <div className='flex justify-between border border-neutral-700  items-center rounded-full w-2/4 p-2 mt-8'>
        <button
          className=' flex justify-center items-center gap-4 py-2 px-6 text-center rounded-full hover:bg-neutral-900'
          onClick={handlePrev}
        >
          <img src={previous} alt='previousIcon' className='w-6 h-6 invert' />
        </button>
        <h1 className='text-xl font-bold mx-6'>{currentPage}</h1>
        <button
          className=' flex justify-center items-center gap-4 py-2 px-6  hover:bg-neutral-900 text-center rounded-full'
          onClick={handleNext}
        >
          <img src={next} alt='nextIcon' className='w-6 h-6 invert' />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
