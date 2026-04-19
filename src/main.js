console.log(import.meta.env.VITE_API_KEY);

const search = document.getElementById("movie-search");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener = ("click", function () {
  const query = search.value;
  console.log(query);
});