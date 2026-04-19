console.log(import.meta.env.VITE_API_KEY);

const tierData = {
  "S Tier": [],
  "A Tier": [],
  "B Tier": [],
  "C Tier": [],
  "D Tier": [],
  "E Tier": [],
  "F Tier": []
};

const savedData = localStorage.getItem("tierData");

if (savedData) {
  Object.assign(tierData, JSON.parse(savedData));
  renderTierList();
}



const search = document.getElementById("movie-search");
const searchBtn = document.getElementById("search-btn");
const results = document.getElementById("results");
const viewBtn = document.getElementById("view-list");
const tierlist = document.getElementById("tierlist");

document.getElementById("tierlist").style.display = "none";

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

        //add to list btn
        const addList = document.createElement("button");
        addList.textContent = "Add to Tierlist";

        //store movie when clicked
        addList.addEventListener("click", () => {
          const chosenTier = select.value;

          tierData[chosenTier].push({
            title: movie.title,
            poster: movie.poster_path
          });
          
          localStorage.setItem("tierData", JSON.stringify(tierData));

          renderTierList();
        });

        function renderTierList() {
          tierlist.innerHTML = "";

          //loop through each tier in order
          for (const tier in tierData) {
            const row = document.createElement("div");
            row.classList.add("tier-row");

            const label = document.createElement("h2");
            label.textContent = tier;
            label.classList.add("tier-label");

            row.appendChild(label);

            //container for movies in this tier
            const moviesContainer = document.createElement("div");
            moviesContainer.classList.add("tier-movies");

            //add each movie in this tier
            tierData[tier].forEach(movie => {
              const movieDiv = document.createElement("div");
              movieDiv.classList.add("tier-movie");

              const img = document.createElement("img");
              img.src = movie.poster;

              const title = document.createElement("h3");
              title.textContent = movie.title;

              movieDiv.appendChild(img);
              movieDiv.appendChild(title);
              moviesContainer.appendChild(movieDiv);
            });
            row.appendChild(moviesContainer);
            tierlist.appendChild(row);
          }
        }

        //listen for selection
        select.addEventListener("change", () => {
          console.log(movie.title, "→", select.value);
        });

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(select);
        card.appendChild(addList);

        results.appendChild(card);
      });
    })

    .catch(err => {
      console.error("Error:", err);
    });

});

// view list //
viewBtn.addEventListener("click", () => {
  results.classList.toggle("hidden");
  tierlist.classList.toggle("hidden");
})
