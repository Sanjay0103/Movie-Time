import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { db } from "../config/FireBase";
import { UserAuth } from "../authRelated/Authcontext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Slideshow = ({ item, videoLink }) => {
  const { user } = UserAuth();
  const [alreadySaved, setAlreadySaved] = useState([]);
  const [like, setLike] = useState(false);

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

  let navigate = useNavigate();
  const movieID = doc(db, "users", `${user?.email}`);
  const savedShows = async () => {
    if (user?.email) {
      setLike(!like);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
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
      const showArray = alreadySaved.filter((show) => show.item.id !== item.id);
      await updateDoc(movieID, { savedShows: showArray });
    } else {
      alert("LogIn to Save Movies");
    }
  };

  const trunkTxt = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const getcolor = (vote) => {
    if (vote >= 8) {
      return "text-green-700";
    } else if (vote <= 5) {
      return "text-red-700";
    } else {
      return "text-yellow-700";
    }
  };

  return (
    <div className="w-full h-full relative">
      <p className="absolute text-2xl top-4 z-50 left-0 font-[700] w-fit text-center h-fit p-2 px-4 rounded-full">
        <h2 className="  text-2xl">
          Rating :&nbsp;
          <span className={`${getcolor(item?.vote_average)}`}>
            {Math.floor(item?.vote_average * 100) / 100}
          </span>
        </h2>
      </p>
      <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
      <div className="w-full h-[550px] ">
        <img
          className="w-full h-full object-cover object-top "
          src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
          alt={item?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-[500]">{item?.title}</h1>
          <div className=" mt-5 flex gap-2">
            <div className=" relative">
              <button className="border text-black bg-gray-300 font-[500] border-gray-300 py-2 px-5 rounded">
                <Link key={item?.id} to={`/Productpg/movie/${item?.id}`}>
                  Play
                </Link>
              </button>
            </div>
            <p
              className="likeDislike border text-white font-[500] border-gray-300 py-2 px-5 rounded "
              onClick={() =>
                alreadySaved?.some((target) => target?.item?.id === item?.id)
                  ? removeSavedShows()
                  : savedShows()
              }
            >
              <div className="w-fit flex items-center gap-1 cursor-pointer">
                {alreadySaved?.some(
                  (target) => target?.item?.id === item?.id
                ) ? (
                  <>
                    <p>Remove From Favourite</p>
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
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Released: {item?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] ">
            {trunkTxt(item?.overview, 200)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;

