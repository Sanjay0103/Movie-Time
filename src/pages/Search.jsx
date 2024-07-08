import React, { useState, useEffect } from "react";
import axios from "axios";
// import request from "../Apirqst";
import Movie from "./Movie";
import Mvpagination from "./Pagination";

function Search() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [mvorser, setmvorser] = useState("movie");
  const key = "fe100bbca655353018637c478236eb4b";
  // const fetchURL = request.rqtSearch;
  // const fetchNew = `${fetchURL}&query=${query}&page=${page}`;
  const fetchNew = `https://api.themoviedb.org/3/search/${mvorser}?api_key=${key}&include_adult=false&language=en-US&query=${query}&page=${page}`;

  useEffect(() => {
    const searchMovies = async () => {
      if (query.trim() === "") return;
      const url = fetchNew;

      try {
        const res = await axios.get(url);
        setMovies(res.data.results);
        // console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    searchMovies();
  }, [query, fetchNew]);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4 mt-2 text-lg">
        Discover...
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
      <div className="relative flex flex-col items-center group w-full p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="border rounded-md p-2 text-black"
            type="text"
            placeholder={`Search for a ${
              mvorser === "movie" ? "movie..." : "series..."
            }`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <div className="mt-8">
          <div className="grid gap-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full mx-auto h-full">
            {movies.map((dt, index) => (
              <Movie key={index} item={dt} mediaType={mvorser} />
            ))}
          </div>
        </div>
        <Mvpagination setPage={setPage} />
      </div>
    </>
  );
}

export default Search;
