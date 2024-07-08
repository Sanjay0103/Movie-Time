import React from "react";
import Logo from "./logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="shadow bg-black/50 backdrop-blur-lg w-full">
        <div className="w-full mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center justify-center items-center md:justify-between">
            <Link
              to="/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 mx-auto md:mx-2 w-fit"
            >
              <Logo />
            </Link>
            <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium my-2">
              <Link className="hover:text-white" to="/">
                Home
              </Link>
              <Link className="hover:text-white" to="/trending">
                Trending
              </Link>
              <Link className="hover:text-white" to="/Toprated">
                Top Rated
              </Link>
              <Link className="hover:text-white" to="/popular">
                Popular
              </Link>
              <Link className="hover:text-white" to="/upcoming">
                Upcoming
              </Link>
              <Link className="hover:text-white" to="/search">
                Search
              </Link>
            </nav>

            {/* <ul class="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400 gap-2">
              <li>
                <Link to="/">About</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/">Licensing</Link>
              </li>
              <li>
                <Link to="/">Contact</Link>
              </li>
            </ul> */}
          </div>

          <div className="flex justify-center items-center space-x-5 FooterIcon ">
            <Link
              to="/"
              onClick={() => window.scroll(0, 0)}
              rel="noopener noreferrer"
            >
              <img
                src="https://img.icons8.com/fluent/30/000000/facebook-new.png"
                alt="Facebook"
              />
            </Link>

            <Link
              to="/"
              onClick={() => window.scroll(0, 0)}
              rel="noopener noreferrer"
            >
              <img
                src="https://img.icons8.com/fluent/30/000000/linkedin-2.png"
                alt="LinkedIn"
              />
            </Link>
            <Link
              to="/"
              onClick={() => window.scroll(0, 0)}
              rel="noopener noreferrer"
            >
              <img
                src="https://img.icons8.com/fluent/30/000000/instagram-new.png"
                alt="Instagram"
              />
            </Link>
            <Link
              to="/"
              onClick={() => window.scroll(0, 0)}
              rel="noopener noreferrer"
            >
              <img
                src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png"
                alt="Messenger"
              />
            </Link>
            <Link
              to="/"
              onClick={() => window.scroll(0, 0)}
              rel="noopener noreferrer"
            >
              <img
                src="https://img.icons8.com/fluent/30/000000/twitter.png"
                alt="Twitter"
              />
            </Link>
          </div>
          <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
          <span className="block text-sm sm:text-center text-gray-400">
            © 2024 . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
