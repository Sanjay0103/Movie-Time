import { Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TbCategoryFilled } from "react-icons/tb";
import { key } from "../Apirqst";

function FilmTubeGenersPage({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
}) {
  function handleAdd(genre) {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((target) => target.id !== genre.id));
    setPage(1);
  }
  function handleRemove(genre) {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  }

  async function GetGenersMovies() {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`
    );
    const data = await response.json();
    setGenres(data.genres);
    // console.log(data.genres);
  }
  useEffect(() => {
    GetGenersMovies();
    return () => {
      setGenres({});
    };
  }, [setGenres]);

  const [closeCategory, setCloseCategoryste] = useState(false);
  return (
    <>
      <div className="flex items-center justify-end w-full ">
        <button
          className=" text-white text-right font-[500] text-[20px] flex items-center gap-2 px-10 my-2 cursor-pointer"
          onClick={() => setCloseCategoryste(!closeCategory)}
        >
          Genres <TbCategoryFilled />
        </button>
      </div>
      <div
        className={`w-[300px] h-screen fixed ${
          closeCategory ? "right-[0px]" : "right-[-300px]"
        } top-0  bg-zinc-800 p-5 transition-all duration-300 z-[50]`}
      >
        <div className="flex items-center justify-center text-white font-[600] text-[20px] gap-1">
          Categories <TbCategoryFilled className="text-[20px]" />
        </div>
        <div className=" grid grid-cols-2 gap-5 flex-wrap justify-center my-5">
          {selectedGenres &&
            selectedGenres.map((target) => (
              <Chip
                color="error"
                label={target.name}
                key={target.id}
                clickable
                size="small"
                onDelete={() => handleRemove(target)}
                style={{ color: "white" }}
              />
            ))}
          {genres &&
            genres &&
            genres.map((target) => (
              <Chip
                color="error"
                label={target.name}
                key={target.id}
                clickable
                size="small"
                onClick={() => handleAdd(target)}
                className="w-[95%] text-sm"
                style={{ color: "white", background: "#414141" }}
              />
            ))}
        </div>
        <div
          className={`bg-red-500 cursor-pointer  text-white py-1 w-[90%] mx-auto text-center rounded-lg absolute bottom-2 left-2/4 translate-x-[-50%]`}
          onClick={() => setCloseCategoryste(!closeCategory)}
        >
          Close
        </div>
      </div>
    </>
  );
}

export default FilmTubeGenersPage;
