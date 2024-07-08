import React from "react";
import imgLogo from "./MovieCon.gif";

const Logo = () => {
  return (
    <>
      <h1 className="flex rounded bg-gradient-to-r to-fuchsia-700 from-pink-700 shadow-xl w-fit h-full p-2">
        <span className="inline">
          <img className=" max-h-10 max-w-10" src={imgLogo} alt="MovieTime" />
        </span>
        <span className="inline text-white font-[900] text-2xl">movie</span>
        <span className="inline text-black font-[700] text-2xl">Time</span>
      </h1>
    </>
  );
};

export default Logo;
