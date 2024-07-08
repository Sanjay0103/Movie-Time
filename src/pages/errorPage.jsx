import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <img
          src="https://64.media.tumblr.com/382bd4f2f84c097d098eaada286cca53/8f3a0308fd40510c-6e/s540x810/5556f34650a94f411a2dbee5978108e076ff54e2.gif"
          alt=""
          className="rounded"
        />
        <p className="bg-black rounded p-2 mt-3">Error 404 : Page Not Found</p>
        <Link className="bg-black rounded p-4 absolute bottom-4" to="/">
          Click To go Back
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
