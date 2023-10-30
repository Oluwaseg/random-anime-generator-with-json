const btn = document.getElementById("btn");
const animeImage = document.getElementById("anime-img");
const animeName = document.querySelector(".anime-name");
const animeContainer = document.querySelector(".anime-container");

function showLoading() {
  animeImage.classList.add("loading");
  animeContainer.classList.add("loading");
  animeName.textContent = "Loading...";
}

function hideLoading() {
  animeImage.classList.remove("loading");
  animeContainer.classList.remove("loading");
}

function getRandomAnime() {
  try {
    showLoading();

    // Simulate a 3-second delay (you can remove this in a real implementation)
    setTimeout(() => {
      // Fetch the animeData.json file (assuming it's in the same directory)
      fetch("animeData.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch anime data");
          }
          return response.json();
        })
        .then((animeData) => {
          const animeIds = Object.keys(animeData);
          const randomIndex = Math.floor(Math.random() * animeIds.length);
          const randomAnimeId = animeIds[randomIndex];
          const animeDetails = animeData[randomAnimeId];
          const animeTitle = animeDetails.name;
          const animeImageUrl = animeDetails.image_url;

          animeName.textContent = animeTitle;
          animeImage.src = animeImageUrl;

          hideLoading();

          // Show the anime container after data is displayed
          animeContainer.style.display = "block";
        })
        .catch((error) => {
          console.error("Error fetching and displaying anime data:", error);
          hideLoading();
        });
    }, 3000);
  } catch (error) {
    console.error("Error fetching and displaying anime data:", error);
    hideLoading();
  }
}

// Initially, hide the anime container
animeContainer.style.display = "none";

btn.addEventListener("click", getRandomAnime);
