import React from "react";

import Main from "../Components/Main";
import Contents from "./contents";
import request from "../Apirqst";

const Home = () => {
  window.scroll(0, 0);
  return (
    <>
      <div className="pb-5">
        <Main />
        <Contents cntId="1" title="Trending" fetchURL={request.rqtTrending} />
        <Contents cntId="2" title="Upcoming" fetchURL={request.rqtUpcoming} />
        <Contents cntId="3" title="Popular" fetchURL={request.rqtPopular} />
        <Contents cntId="4" title="TopRated" fetchURL={request.rqtTopRated} />
      </div>
    </>
  );
};

export default Home;
