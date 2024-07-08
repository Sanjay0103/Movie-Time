export const key = "94068a19f5d8b6bb399102da5e7c6e4a";

const request = {
  rqtTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&include_adult=false&language=en-US`,
  rqtTrending: `https://api.themoviedb.org/3/trending/all/day?api_key=${key}&include_adult=false&language=en-US`,
  rqtUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&include_adult=false&language=en-US`,
  rqtPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&include_adult=false&language=en-US`,
  rqtSearch: `https://api.themoviedb.org/3/search/collection?api_key=${key}&language=en-US`,
};

export default request;
