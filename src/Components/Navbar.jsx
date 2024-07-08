import React, { useEffect, useState } from "react";
import Logo from "./logo";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../authRelated/Authcontext";
import { BiSearchAlt } from "react-icons/bi";
import { Avatar, Button, Popover } from "@mui/material";
import { db } from "../config/FireBase";
import { doc, onSnapshot } from "firebase/firestore";
import { IoIosMenu } from "react-icons/io";
import { FaGripfire } from "react-icons/fa";
import { FaArrowTrendUp, FaPeopleGroup } from "react-icons/fa6";
import { GiCometSpark } from "react-icons/gi";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  // console.log(user && user);
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [userName, setUserName] = useState(null);
  const [popover1Open, setPopover1Open] = useState(false);
  const [popover2Open, setPopover2Open] = useState(false);

  useEffect(() => {
    if (user && user.email) {
      const unsubscribe = onSnapshot(doc(db, "users", user.email), (doc) => {
        setUserName(doc.data()?.username);
        setProfilePic(doc.data()?.profilePicUrl);
      });
      return unsubscribe;
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopover1Open = (event) => {
    setAnchorEl(event.currentTarget);
    setPopover1Open(true);
  };

  const handlePopover1Close = () => {
    setPopover1Open(false);
  };

  const handlePopover2Open = (event) => {
    setAnchorEl(event.currentTarget);
    setPopover2Open(true);
  };

  const handlePopover2Close = () => {
    setPopover2Open(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div className="Nav z-[100] left-0 w-full shadow-lg flex md:gap-5 gap-2 flex-wrap border-none border-b-white bg-black/25  backdrop-blur-lg p-2 items-center justify-between">
        <div className="flex md:justify-start items-center order-2 md:order-1 w-fit">
          <Link to="/">
            <Logo className=" max-h-10 md:max-w-fit max-w-28 md:max-h-full scale-75 md:scale-100 rounded-xl overflow-hidden" />
          </Link>
          <div className="md:flex hidden w-fit">
            <Link
              className="bg-black px-5 py-2 text-white font-bold rounded flex justify-center items-center"
              to="/trending"
            >
              <span>
                <FaGripfire />
              </span>
              Trending
            </Link>
            <Link
              className="bg-black px-5 py-2 text-white font-bold rounded flex justify-center items-center"
              to="/Toprated"
            >
              <span>
                <FaArrowTrendUp />
              </span>
              Top Rated
            </Link>
            <Link
              className="bg-black px-5 py-2 text-white font-bold rounded flex justify-center items-center"
              to="/popular"
            >
              <span>
                <FaPeopleGroup />
              </span>
              Popular
            </Link>
            <Link
              className="bg-black px-5 py-2 text-white font-bold rounded flex justify-center items-center"
              to="/upcoming"
            >
              <span>
                <GiCometSpark />
              </span>
              Upcoming
            </Link>
            <Link
              className="bg-black px-5 py-2 text-white font-bold rounded flex justify-center items-center"
              to="/search"
            >
              <BiSearchAlt />
            </Link>
          </div>
        </div>
        <div className="md:hidden flex border border-white order-1 md:order-2 rounded-xl">
          <Button
            aria-describedby={id}
            variant="text"
            onClick={handlePopover1Open}
          >
            <IoIosMenu className="text-xl text-white w-11" />
          </Button>
        </div>

        <Popover
          id={1}
          open={popover1Open}
          anchorEl={anchorEl}
          onClose={handlePopover1Close}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Link
            className="bg-black px-5 py-2 text-white font-bold rounded flex justify-center items-center"
            to="/search"
          >
            <span>
              <BiSearchAlt />
            </span>
            Search
          </Link>
          <Link
            className="bg-black px-5 py-2 text-white font-bold rounded flex justify-center items-center"
            to="/trending"
          >
            <span>
              <FaGripfire />
            </span>
            Trending
          </Link>
          <Link
            className="bg-black px-5 py-2 text-white font-bold rounded flex justify-center items-center"
            to="/Toprated"
          >
            <span>
              <FaArrowTrendUp />
            </span>
            Top Rated
          </Link>
          <Link
            className="bg-black px-5 py-2 text-white font-bold rounded flex justify-center items-center"
            to="/popular"
          >
            <span>
              <FaPeopleGroup />
            </span>
            Popular
          </Link>
          <Link
            className="bg-black px-5 py-2 text-white font-bold rounded flex justify-center items-center"
            to="/upcoming"
          >
            <span>
              <GiCometSpark />
            </span>
            Upcoming
          </Link>
        </Popover>

        <div
          className="flex gap-2 border-white md:scale-100 scale-75 items-center rounded-full border p-2 order-3 cursor-pointer"
          onClick={handlePopover2Open}
        >
          <Avatar
            aria-describedby={id}
            alt={user?.email ? user?.email : "guest"}
            src={
              user?.email
                ? user?.photoURL
                : "https://banner2.cleanpng.com/20190730/shy/kisspng-photographic-film-movie-camera-cinema-website-and-mobile-application-development-service-5d3fc924ce3b33.8538265315644613488447.jpg"
            }
          />
          <h1 className="text-xl md:flex hidden">
            Welcome , {user?.displayName ? user?.displayName : "Guest"}
          </h1>
        </div>

        <Popover
          id={2}
          open={popover2Open}
          anchorEl={anchorEl}
          onClose={handlePopover2Close}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {user?.email ? (
            <div className="bg-black p-2 flex flex-col gap-2">
              <Link
                className="shadow-lg text-white font-bold px-5 py-2 rounded flex justify-center items-center"
                to="/account"
              >
                Account
              </Link>
              <button
                className="bg-red-700 px-5 py-2 text-white font-bold rounded flex justify-center items-center"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="bg-black p-2 flex flex-col gap-2">
              <Link
                className="text-white shadow-lg font-bold px-5 flex justify-center items-center rounded"
                to="/login"
              >
                Log In
              </Link>
              <Link
                className="bg-green-700 px-5 py-2 text-white font-bold rounded flex justify-center items-center"
                to="/signup"
              >
                Sign Up
              </Link>
            </div>
          )}
        </Popover>
      </div>
    </>
  );
};

export default Navbar;
