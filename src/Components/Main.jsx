import React, { useEffect, useState } from "react";
import request from "../Apirqst";
import axios from "axios";
import Slideshow from "../pages/Slideshow";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    axios.get(request.rqtPopular).then((res) => {
      setTrendingMovies(res.data.results);
    });
  }, []);

  useEffect(() => {
    setMovies(trendingMovies.slice(0, 10));
  }, [trendingMovies]);

  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={30}
        slidesPerView={1}
        // slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
        modules={[Autoplay, Pagination, EffectCoverflow]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        // speed={500}
      >
        {movies.map((item) => (
          <SwiperSlide key={item?.id}>
            <Slideshow item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Main;
