import React from "react";
import { useEffect, useState } from "react";
import {
  TbSquareRoundedChevronLeftFilled,
  TbSquareRoundedChevronRightFilled,
} from "react-icons/tb";
import { UserAuth } from "../authRelated/Authcontext";
import { FaTrash } from "react-icons/fa6";
import { db } from "../config/FireBase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const Savedshows = () => {
  const { user } = UserAuth();
  const [movies, setMovies] = useState([]);

  const slideLeft = () => {
    let slider = document.querySelector("#slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    let slider = document.querySelector("#slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    try {
      onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
        setMovies(doc.data()?.savedShows);
      });
    } catch (error) {
      console.log(error);
    }
  }, [user?.email]);
  // console.log(user?.email);

  const movieRef = doc(db, "users", `${user?.email}`);

  const deleteShow = async (showId) => {
    try {
      const result = movies.filter((dt) => dt?.item?.id !== showId);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getcolor = (vote) => {
    if (vote >= 8) {
      return "blue";
    } else if (vote <= 5) {
      return "yellow";
    } else {
      return "red";
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  // console.log(movies);

  return (
    <>
      <div>
        <h2 className="text-white font-bold md:text-xl p-4 mt-12 text-lg">
          Favourite Shows
        </h2>
        <div className="relative flex items-center group w-full">
          <TbSquareRoundedChevronLeftFilled
            onClick={slideLeft}
            className=" transition-all duration-300 left-0 cursor-pointer text-white text-[40px] absolute opacity-50 hover:opacity-100 z-10 hidden group-hover:block"
          />
          <div
            id={"slider"}
            className="flex flex-row w-full mx-4 h-full overflow-x-scroll scroll-smooth scrollbar-hide"
          >
            {movies?.map((dt, id) => (
              <div
                key={id}
                className="product_items col rounded-lg shadow min-w-[230px] md:min-w-[240px] max-w-[300px] inline-block relative p-2 overflow-hidden"
              >
                <p className="movieimage pb-3 w-full h-[350px] overflow-hidden rounded-lg">
                  <img
                    className="w-full movieimg h-full block rounded-lg transition-all duration-200"
                    src={`https://image.tmdb.org/t/p/original/${dt?.item?.poster_path}`}
                    alt={dt?.item?.title}
                    title={dt?.item?.title}
                  />
                </p>

                <p className="likeDislike absolute top-4 left-0 rounded-e-[99px] ">
                  <div className="w-fit flex items-center gap-1 p-2 px-4">
                    <p
                      className=" font-[500] w-fit flex items-center gap-1 p-2 px-4 cursor-pointer"
                      onClick={() => deleteShow(dt?.item?.id)}
                    >
                      <p> Remove From List</p>
                      <FaTrash className=" text-red-700" />
                    </p>
                  </div>
                </p>
                <div className="product_details grid grid-cols-6 w-full p-2">
                  <p className="col-span-4 rounded p-1 text-xl">
                    {dt?.item?.title ? dt?.item?.title : dt?.item?.name}
                  </p>
                  <div className="col-span-2 text-right">
                    <p
                      className="rating font-[700] w-full text-center h-fit p-2 px-4 rounded-full"
                      style={{
                        backgroundColor: getcolor(dt?.item?.vote_average),
                      }}
                    >
                      {Math.floor(dt?.item?.vote_average * 100) / 100}
                    </p>
                  </div>
                </div>

                <Link
                  key={dt?.item?.id}
                  to={`/Productpg/${
                    dt?.item?.media_type || dt?.item?.mediaType
                  }/${dt?.item?.id}`}
                >
                  <div className="product_overview w-full gap-y-2 rounded-t-3xl p-2">
                    <h3 className="mvOvHeading rounded-full p-3 text-xl font-[900] text-center">
                      Movie Overview
                    </h3>
                    <p>{truncateText(dt?.item?.overview, 150)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <TbSquareRoundedChevronRightFilled
            onClick={slideRight}
            className=" transition-all duration-300 right-0 cursor-pointer text-white text-[40px] absolute opacity-50 hover:opacity-100 z-10 hidden group-hover:block"
          />
        </div>
      </div>
    </>
  );
};

export default Savedshows;
