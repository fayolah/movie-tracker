console.log(import.meta.env.VITE_API_KEY);

const search = document.getElementById("movie-search");
const searchBtn = document.getElementById("search-btn");
const results = document.getElementById("results");
const viewBtn = document.getElementById("view-list");
const tierlist = document.getElementById("tierlist");

document.getElementById("results").style.display = "none";


// for search button
searchBtn.addEventListener("click", function () {
  const query = search.value;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${query}`;
  results.innerHTML =  "";
  console.log("API KEY:", import.meta.env.VITE_API_KEY);
  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(movie => {
        //create card
        const card = document.createElement("div");
        card.classList.add("movie-card");

        //create title
        const title = document.createElement("h3");
        title.textContent = movie.title;

        //poster img
        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

        //dropdown

        const select = document.createElement("select");

        ["S Tier", "A Tier", "B Tier", "C Tier", "D Tier", "E Tier", "F Tier"].forEach(tier => {
          const option = document.createElement("option");
          option.value = tier;
          option.textContent = tier;
          select.appendChild(option);
        });

        //listen for selection
        select.addEventListener("change", () => {
          console.log(movie.title, "→", select.value);
        });

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(select);

        results.appendChild(card);
      });
    })

    .catch(err => {
      console.error("Error:", err);
    });

    document.getElementById("results").style.display = "block";
});

// view list //
viewBtn.addEventListener("click", () => {
  results.classList.toggle("hidden");
  tierlist.class.toggle("hidden");
})
