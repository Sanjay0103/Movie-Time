import React, { useEffect, useState } from "react";
import axios from "axios";
import Mvpagination from "./Pagination";
import { key } from "../Apirqst";
import Movie from "./Movie";

const Upcomingpg = () => {
  window.scroll(0, 0);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const fetchNew = `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&include_adult=false&language=en-US&page=${page}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fetchNew);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {};
  }, [fetchNew, page]);

  return (
    <>
      <div>
        <h2 className="text-white font-bold md:text-xl p-4 mt-2 text-lg">
          Upcoming
        </h2>
        <div className="relative flex items-center group w-full p-4">
          <div className="grid gap-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full mx-auto h-full">
            {movies.map((dt, index) => (
              <Movie key={index} item={dt} mediaType={"movie"} />
            ))}
          </div>
        </div>
      </div>
      <Mvpagination setPage={setPage} />
    </>
  );
};

export default Upcomingpg;
