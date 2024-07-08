import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
// import { db } from "../config/FireBase";
// import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { img_org, noPicture, unavailableLandscape } from "./ImageSearch";
import {
  TbSquareRoundedChevronLeftFilled,
  TbSquareRoundedChevronRightFilled,
} from "react-icons/tb";
import axios from "axios";
import { key } from "../Apirqst";
import Singlepagemain from "./SinglePageMain";
import "./moviedetail.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import Suggestion from "./Suggestion";

const Singlepage = () => {
  const { MovieID } = useParams();
  const { MediaType } = useParams();
  const [image, setImage] = useState([]);
  const [Movie, setMovie] = useState([]);
  const [vdoLink, setVdoLink] = useState(null);
  const [vdoname, setVdoName] = useState([]);
  const [videoLink, setVideoLink] = useState([]);
  const [crewMembers, setCrewMembers] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);

    const config = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    async function GetVideoLink() {
      try {
        const videoResponse = await axios.get(
          `https://api.themoviedb.org/3/${MediaType}/${MovieID}/videos?api_key=${key}`
        );
        setVideoLink(videoResponse.data.results);
      } catch (error) {
        // Handle error
        console.error("Error fetching video link:", error);
      }
    }

    async function getCrewMembers() {
      try {
        const crewRespone = await axios.get(
          `https://api.themoviedb.org/3/${MediaType}/${MovieID}/credits?api_key=${key}`
        );
        setCrewMembers(crewRespone.data.cast);
      } catch (error) {
        console.error("Error fetching crew members:", error);
      }
    }

    GetVideoLink();
    getCrewMembers();

    axios
      .get(
        `https://api.themoviedb.org/3/${MediaType}/${MovieID}?api_key=${key}`,
        config
      )
      .then((response) => {
        setMovie(response?.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/${MediaType}/${MovieID}/images?api_key=${key}`,
        config
      )
      .then((response) => {
        setImage(response?.data?.backdrops);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [MediaType, MovieID]);

  const [suggestions, setSuggestions] = useState("");

  function Makingcategory() {
    if (Movie && Movie?.genres && Movie?.genres?.length > 0) {
      let FindedCategory = [];
      for (let i = 0; i < Movie?.genres?.length; i++) {
        const Presentcategory = Movie?.genres.find(
          (target) => target.name === Movie.genres[i].name
        );
        FindedCategory.push(Presentcategory.id);
      }
      const result = FindedCategory.join("%2c");
      setSuggestions(result);
    }
  }
  useEffect(() => {
    Makingcategory();
  }, [Movie.genres]);

  console.log(videoLink);

  const trailer = videoLink?.filter(
    (vdo) => vdo.type === "Trailer" && vdo.official
  );

  let length = trailer.length - 1;

  console.log(trailer);

  const youtubeKey =
    trailer.length !== 0 ? trailer?.[length]?.key : videoLink?.[0]?.key || null;

  console.log(youtubeKey);

  const slideLeft = (id) => {
    let slider = document.querySelector(id);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = (id) => {
    let slider = document.querySelector(id);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const [slidesPerView, setSlidesPerView] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setSlidesPerView(6);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerRef = useRef(null);

  return (
    <>
      <div className="py-0">
        <Singlepagemain item={Movie} videoLink={videoLink} mediaType={MediaType} />

        <section className=" p-5 my-5 flex flex-col gap-2 md:grid md:grid-cols-2 items-center">
          <div className="relative bg-black/50 backdrop-blur-2xl p-3 py-5 flex flex-col gap-2 border rounded-xl">
            <div>
              <h2 className=" text-3xl font-[800]">Overview :</h2>
              <span className="mt-2 text-lg"> {Movie?.overview}</span>
            </div>
            <div>
              <h2 className=" text-3xl font-[800]">Release Date :</h2>
              <span className="mt-2 text-lg">
                {Movie?.release_date || Movie?.first_air_date}
              </span>
            </div>
            <div>
              <h2 className=" text-3xl font-[800]">Production Studio :</h2>
              <span className="mt-2 text-lg">
                {Movie?.production_companies?.map((item, index) => (
                  <span key={index}> {item?.name} </span>
                ))}
              </span>
            </div>

            {MediaType === "tv" ? (
              <>
                <div>
                  <h2 className=" text-3xl font-[800]">Number of Seasons :</h2>
                  <span className="mt-2 text-lg">
                    {Movie?.number_of_seasons}
                  </span>
                </div>
                <div>
                  <h2 className=" text-3xl font-[800]">Number of Episodes :</h2>
                  <span className="mt-2 text-lg">
                    {Movie?.number_of_episodes}
                  </span>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <div
            className="relative col  w-full  p-3 flex flex-col gap-2 rounded-xl"
            id="OfcTrailer"
          >
            <iframe
              className="min-w-[220px] w-full h-auto  min-h-96 rounded-lg"
              src={`https://www.youtube.com/embed/${youtubeKey}`}
              title={`${Movie?.title}`}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </section>

        <div className="p-2">
          <h2 className=" text-3xl font-[800]">Cast :</h2>
          <div className="relative flex items-center group w-full">
            <TbSquareRoundedChevronLeftFilled
              onClick={() => slideLeft("#castSlider")}
              className="transition-all duration-300 left-0 cursor-pointer text-white text-[40px] absolute opacity-50 hover:opacity-100 z-10 hidden group-hover:block"
            />
            <div
              ref={containerRef}
              id="castSlider"
              className="relative flex items-center gap-5 overflow-x-scroll scroll-smooth w-full mx-auto scrollbar-hide group p-5 snap-x "
            >
              {crewMembers?.map((item, index) => (
                <>
                  <div
                    className="border border-white rounded-xl  bg-black/50 backdrop-blur-2xl min-h-[270px]"
                    key={index}
                  >
                    <div className="h-[200px] max-h-[200px] max-w-[160px] w-[160px] rounded-xl overflow-hidden ">
                      <img
                        src={
                          item.profile_path
                            ? `${img_org}${item.profile_path}`
                            : noPicture
                        }
                        alt={item.original_name}
                        className=" object-cover object-center min-w-[160px]"
                      />
                    </div>
                    <div className="text-center flex gap-2 mt-1 p-1 flex-col">
                      <span className=" text-sm">{item.character}</span>
                      <span className=" text-xs text-gray-500">
                        {item.name}
                      </span>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <TbSquareRoundedChevronRightFilled
              onClick={() => slideRight("#castSlider")}
              className="transition-all duration-300 right-0 cursor-pointer text-white text-[40px] absolute opacity-50 hover:opacity-100 z-10 hidden group-hover:block"
            />
          </div>
        </div>

        <section className="imgPage  p-2 mb-5">
          <div className="w-full text-xl font-[500] mx-auto text-white">
            ScreenShots ({image && image.length})
          </div>
          <div className="relative flex items-center group w-full">
            <TbSquareRoundedChevronLeftFilled
              onClick={() => slideLeft("#imageSlider")}
              className="transition-all duration-300 left-0 cursor-pointer text-white text-[40px] absolute opacity-50 hover:opacity-100 z-10 hidden group-hover:block"
            />
            <div
              ref={containerRef}
              id="imageSlider"
              className="relative flex items-center gap-5 overflow-x-scroll scroll-smooth w-full mx-auto scrollbar-hide group p-5 snap-x "
            >
              {image &&
                image.map((target, index) => (
                  <img
                    key={index}
                    className=" duration-300 scroll-ms-3 rounded-lg snap-start"
                    src={img_org + target.file_path}
                    alt={"image" + index}
                    width={"400px"}
                  />
                ))}
            </div>
            <TbSquareRoundedChevronRightFilled
              onClick={() => slideRight("#imageSlider")}
              className="transition-all duration-300 right-0 cursor-pointer text-white text-[40px] absolute opacity-50 hover:opacity-100 z-10 hidden group-hover:block"
            />
          </div>
        </section>

        <div className="bg-black/50 backdrop-blur-2xl border border-white rounded-2xl py-5 md:mx-2">
          <iframe
            className="min-w-[220px] max-w-5xl mx-auto w-full h-auto shadow-xl min-h-96 rounded-lg mb-8 border border-white"
            src={`https://www.youtube.com/embed/${
              vdoLink ? vdoLink : videoLink?.[0]?.key
            }`}
            title={`${vdoname}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <section id="video" className="py-5">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              spaceBetween={10}
              slidesPerView={slidesPerView}
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 100,
                modifier: 1,
                // slideShadows: true,
              }}
              loop={true}
              modules={[Autoplay, Pagination, EffectCoverflow]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: true }}
            >
              {videoLink.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <>
                    <div
                      className="h-auto w-full max-w-[500px] flex justify-center items-center rounded-xl overflow-hidden cursor-pointer"
                      onClick={() => {
                        setVdoLink(item?.key);
                        setVdoName(item?.name);
                      }}
                    >
                      <img
                        src={
                          image &&
                          (image[index]?.file_path
                            ? img_org + image[index]?.file_path
                            : unavailableLandscape)
                        }
                        className="h-full w-full object-cover object-center"
                        alt=""
                      />
                      <div className="absolute h-full w-full bg-black/25 top-0 left-0 p-2 rounded-xl">
                        {item?.name} <br />
                        {item?.type}
                        <h1>Click To play</h1>
                      </div>
                    </div>
                  </>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </div>

        <Suggestion
          cntId="1"
          title="Suggestion"
          fetchURL={`https://api.themoviedb.org/3/discover/${MediaType}?api_key=${key}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${suggestions}`}
        />
      </div>
    </>
  );
};

export default Singlepage;
