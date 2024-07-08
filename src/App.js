import Navbar from "./Components/Navbar";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { AuthContextProvider } from "./authRelated/Authcontext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import ErrorPage from "./pages/errorPage";
import Protectedroute from "./Components/Protectedroute";
import Trendingpg from "./pages/Trendingpg";
import Upcomingpg from "./pages/Upcomingpg";
import Popularpg from "./pages/Popularpg";
import Topratedpg from "./pages/Topratedpg";
import Search from "./pages/Search";
import Singlepage from "./pages/Singlepage";
import Footer from "./Components/Footer";
// import Slider from "./pages/Slideshow";
// import ResponsiveAppBar from "./Components/MuiNav";

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <Navbar />
          {/* <ResponsiveAppBar /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/Productpg/:MediaType/:MovieID"
              element={<Singlepage />}
            />

            <Route
              path="/account"
              element={
                <Protectedroute>
                  <Account />
                </Protectedroute>
              }
            />
            {/* {user?.email ? (
              <Route path="/account" element={<Account />} />
            ) : (
              <Route path="*" element={<ErrorPage />} />
            )} */}
            <Route path="/Trending" element={<Trendingpg />} />
            <Route path="/Upcoming" element={<Upcomingpg />} />
            <Route path="/Popular" element={<Popularpg />} />
            <Route path="/TopRated" element={<Topratedpg />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
