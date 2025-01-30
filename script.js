// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
  autoScroll: true,
});

// Listen for the scroll event and log the event data
lenis.on("scroll", (e) => {});

const inputelement = document.querySelector("#input");
const container = document.querySelector(".container");
const searchelement = document.querySelector("#search");
const moviescontent = document.querySelector(".movie-content");
const imagesection = document.querySelector(".image-section > img");
const backdrpimg = document.querySelector(".backdrop-image > img");
const detailsection = document.querySelector(".detail-section");
const allmovies = document.querySelector(".all-movies");
const totalsearch = document.querySelector(".total-search-h2");
let data = "";

async function getMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDM0NjU1ZjJhZGQyMGEzNGFiMzc3ODA4MzZlM2FiOSIsIm5iZiI6MTczNzgxOTk3OS44NzMsInN1YiI6IjY3OTUwNzRiM2JlMGI3YjZmMzIzYzEwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A6bkrYD6WFsVu7nx-ST_vmE725IY8c837lft_Poi5PM",
    },
  };
  let Response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${inputelement.value}&include_adult=false&language=en-US&page=1`,
    options
  );
  data = await Response.json();
  
}


function allmoviesdata() {
  allmovies.innerHTML = ""; // Clear previous results
  data.results.forEach((element, index) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("items");

    const itemImage = document.createElement("div");
    itemImage.classList.add("item-image-container");
    movieItem.appendChild(itemImage);

    const itemimageimg = document.createElement("img");
    itemimageimg.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
    itemImage.appendChild(itemimageimg);

    const itemcontent = document.createElement("div");
    itemcontent.classList.add("item-details");
    movieItem.appendChild(itemcontent);

    const movieTitle = document.createElement("a");
    movieTitle.href = "#";
    movieTitle.textContent = ` ${element.original_title} | (${element.release_date})`;
    itemcontent.appendChild(movieTitle);

    // const readmore = document.createElement("button");
    // readmore.classList.add("readmore");
    // readmore.textContent = "Read More";
    // itemcontent.appendChild(readmore);

    movieItem.addEventListener("click", function (event) {
      event.preventDefault();
      moviescontent.style.display = "flex";
      allmovies.style.display = "none";
      totalsearch.style.display =  "none"
      imagesection.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
      backdrpimg.src = `https://image.tmdb.org/t/p/w500${element.backdrop_path}`;
      detailsection.innerHTML = `
                <h3>${element.original_title}</h3>
                <p>${element.overview}</p>
                <p>Release Date: ${element.release_date}</p>
                <p>Rating: ${element.vote_average}</p>
                <p>Popularity: ${element.popularity}%</p>
            `;

      backbutton();
    });
    itemcontent.appendChild(movieTitle);
    // movieItem.addEventListener("mouseenter", () => {
    //   readmore.style.visibility = "visible";
    // });
    // movieItem.addEventListener("mouseleave", () => {
    //   readmore.style.visibility = "hidden";
    // });

    allmovies.appendChild(movieItem);
  });
}

searchelement.addEventListener("click", async function (event) {
  allmovies.style.display = "flex";
  if (
    inputelement.value === "" ||
    inputelement.value === null ||
    !NaN === inputelement.value
  ) {
    allmovies.innerHTML = "PLEASE ENTER A VALID MOVIE NAME";
    return;
  } else {
    await getMovies();
    allmoviesdata();
    totalsearch.style.display = "contents";
    totalsearch.innerHTML = `Total Search (${data.results.length})`;
  }
});

function backbutton() {
  const backbutton = document.createElement("button");
  backbutton.classList.add("back-button");
  backbutton.innerHTML = `<i class="ri-arrow-go-back-line"></i>`;
  container.appendChild(backbutton);
  backbutton.addEventListener("click", function () {
    allmovies.style.display = "flex";
    totalsearch.style.display = "contents"
    backdrpimg.src = ``;
    backbutton.style.display = "none";
    backdrpimg.style.display = "none";
    moviescontent.style.display = "none";
  });
}
