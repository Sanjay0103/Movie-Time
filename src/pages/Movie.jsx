import React, { useEffect } from "react";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { UserAuth } from "../authRelated/Authcontext";
import { db } from "../config/FireBase";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { MdBookmarkAdded } from "react-icons/md";
import "./movieUi.css";
import { Link, useNavigate } from "react-router-dom";

const Movie = ({ item, mediaType }) => {
  // console.log(mediaType);

  mediaType = mediaType ? mediaType : "movie";

  const [like, setLike] = useState(false);
  // const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const [alreadySaved, setAlreadySaved] = useState([]);
  const navigate = useNavigate();

  const movieID = doc(db, "users", `${user?.email}`);
  const savedShows = async () => {
    if (user?.email) {
      setLike(!like);
      // setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          item: {
            ...item,
            mediaType: mediaType,
          },
        }),
      });
    } else {
      const Nav = window.confirm("LogIn to Save Movies");
      if (Nav) {
        navigate("/login");
      }
    }
  };

  const removeSavedShows = async () => {
    if (user?.email) {
      setLike(!like);
      // setSaved(true);
      const showArray = alreadySaved?.filter(
        (show) => show?.item?.id !== item?.id
      );
      await updateDoc(movieID, { savedShows: showArray });
    } else {
      alert("LogIn to Save Movies");
    }
  };

  const getcolor = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote <= 5) {
      return "red";
    } else {
      return "yellow";
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  useEffect(() => {
    if (user?.email) {
      const subscriber = onSnapshot(doc(db, "users", user?.email), (data) => {
        if (data.exists()) {
          setAlreadySaved(data.data().savedShows);
        }
        // console.log(data.data().savedShows);
      });
      return () => {
        subscriber();
      };
    }
  }, [user?.email]);

  // Image

  return (
    <>
      <div
        key={item?.id}
        className="product_items col rounded-lg shadow min-w-[230px] md:min-w-[240px] max-w-[300px] inline-block relative p-2 overflow-hidden"
      >
        <p className="movieimage pb-3 w-full h-[350px] overflow-hidden rounded-lg">
          <img
            className="w-full movieimg h-full block rounded-lg transition-all duration-200"
            src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
            alt={item?.title ? item?.title : item?.name}
            title={item?.title ? item?.title : item?.name}
          />
        </p>
        <div className="w-fit absolute top-3 right-3 flex items-center gap-1 p-2 px-4">
          {alreadySaved?.some((target) => target?.item?.id === item?.id) ? (
            <div className="rounded-full p-3 backdrop-blur-lg bg-black/50 shadow">
              {/* <FaHeart className=" text-red-700" /> */}
              <MdBookmarkAdded className=" text-white text-xl" />
            </div>
          ) : (
            <></>
          )}
        </div>

        <p
          className="likeDislike absolute top-4 left-0 rounded-e-[99px] cursor-pointer"
          onClick={() =>
            alreadySaved?.some((target) => target?.item?.id === item?.id)
              ? removeSavedShows()
              : savedShows()
          }
        >
          <div className="w-fit flex items-center gap-1 p-2 px-4">
            {alreadySaved?.some((target) => target?.item?.id === item?.id) ? (
              <>
                <p>Remove from Favourite</p>
                <FaHeart className=" text-red-700" />
              </>
            ) : (
              <>
                <p>Add To Favourite</p>
                <FaRegHeart className=" text-gray-300" />
              </>
            )}
          </div>
        </p>
        <div className="product_details grid grid-cols-6 w-full p-2">
          <p className="col-span-4 rounded p-1 text-xl">
            {item?.title ? item?.title : item?.name}
          </p>
          <div className="col-span-2 text-right">
            <p
              className="rating font-[700] w-full text-center h-fit p-2 px-4 rounded-full"
              style={{ backgroundColor: getcolor(item?.vote_average) }}
            >
              {Math.floor(item?.vote_average * 100) / 100}
            </p>
          </div>
        </div>
        <Link key={item?.id} to={`/Productpg/${mediaType}/${item?.id}`}>
          <div className="product_overview w-full gap-y-2 rounded-t-3xl p-2">
            <h3 className="mvOvHeading rounded-full p-3 text-xl font-[900] text-center">
              Movie Overview
            </h3>
            <p>{truncateText(item?.overview, 150)}</p>

            {/* <button className="bg-white text-black transition-all duration-200 w-full rounded-full p-2 text-lg">
              Know More
            </button> */}
          </div>
        </Link>
      </div>
    </>
  );
};

export default Movie;
