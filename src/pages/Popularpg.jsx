import React, { useEffect, useState } from "react";
import axios from "axios";
import Mvpagination from "./Pagination";
import { key } from "../Apirqst";
import Movie from "./Movie";
import FilmTubeGenersPage from "./genre";
import useGenres from "../Hooks/GenresHook";

const Popularpg = () => {
  window.scroll(0, 0);
  const [movies, setMovies] = useState([]);
  const [mvorser, setmvorser] = useState("movie");
  const [page, setPage] = useState(1);
  // const [selectedGenres, setSelectedGenres] = useState([]);
  // const [genres, setGenres] = useState([]);
  // const GenresCollection = useGenres(selectedGenres);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const fetchNew = `https://api.themoviedb.org/3/${mvorser}/popular?api_key=${key}&include_adult=false&language=en-US&page=${page}`;

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
  }, [fetchNew, mvorser, page]);

  return (
    <>
      <div className=" mb-32">
        <h2 className="text-white font-bold md:text-xl p-4 mt-2 text-lg">
          Popular {mvorser === "movie" ? "Movies" : "TV"}
        </h2>
        <div
          className={`mvOrsr mx-auto w-fit border rounded-full overflow-hidden flex relative btnBar ${
            mvorser === "movie" ? "activeBtn" : ""
          } `}
          onClick={() => setmvorser(mvorser === "movie" ? "tv" : "movie")}
        >
          <button
            // onClick={() => setmvorser("movie")}
            className={`inline-flex items-center justify-center w-[150px] px-5 py-3  font-medium text-center rounded-lg shadow-sm cursor-pointer`}
            // disabled={mvorser === "movie"}
          >
            Movie
          </button>
          <button
            // onClick={() => setmvorser("tv")}
            className={`inline-flex items-center justify-center w-[150px] px-5 py-3 font-medium text-center rounded-lg shadow-sm cursor-pointer `}
            // disabled={mvorser === "tv"}
          >
            Series
          </button>
          <div className="atvBtn w-[150px] h-full"></div>
        </div>
        <div className="relative flex items-center group w-full p-4">
          <div className="grid gap-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full mx-auto h-full">
            {movies.map((dt, index) => (
              <Movie key={index} item={dt} mediaType={mvorser} />
            ))}
          </div>
        </div>
      </div>
      <Mvpagination setPage={setPage} />
    </>
  );
};

export default Popularpg;
