import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import axios from "axios";
import {
  TbSquareRoundedChevronLeftFilled,
  TbSquareRoundedChevronRightFilled,
} from "react-icons/tb";
import { Link } from "react-router-dom";

const Contents = ({ cntId, title, fetchURL }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(fetchURL)
      .then((res) => setMovies(res.data.results))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [fetchURL]);

  // console.log(movies);

  const slideLeft = () => {
    let slider = document.querySelector("#slider" + cntId);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    let slider = document.querySelector("#slider" + cntId);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <div className="relative">
        <h2 className="text-white font-bold md:text-xl p-4 text-lg">{title}</h2>
        <Link
          variant="contained"
          className="bg-white hover:text-white transition-all hover:bg-blue-700 duration-200 text-blue-900 font-[700] rounded-full absolute top-4 p-2 right-4"
          to={{
            pathname: `/${title}`,
            title: `${title}`,
          }}
        >
          More
        </Link>

        <div className="relative flex items-center group w-full">
          <TbSquareRoundedChevronLeftFilled
            onClick={slideLeft}
            className="transition-all duration-300 left-0 cursor-pointer text-white text-[40px] absolute opacity-50 hover:opacity-100 z-10 hidden group-hover:block"
          />
          <div
            id={"slider" + cntId}
            className="flex flex-row w-full mx-4 h-full overflow-x-scroll scroll-smooth gap-x-2 scrollbar-hide snap-x"
          >
            {movies.map((item, id) => (
              <Movie key={id} item={item} mediaType={item?.media_type} />
            ))}
          </div>
          <TbSquareRoundedChevronRightFilled
            onClick={slideRight}
            className="transition-all duration-300 right-0 cursor-pointer text-white text-[40px] absolute opacity-50 hover:opacity-100 z-10 hidden group-hover:block"
          />
        </div>
      </div>
    </>
  );
};

export default Contents;
