const slider = document.querySelector('.slider');
const sliderWrapper = slider.querySelector('.slider-wrapper');
const sliderImages = sliderWrapper.querySelectorAll('img');
const leftArrow = slider.querySelector('.slider-button-left');
const rightArrow = slider.querySelector('.slider-button-right');
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get("id");

const apiBaseUrl = "http://localhost:3000/api/game";

// Image slider scrolling
let currentSlide = 0;
const slideWidth = slider.clientWidth;

// Set initial position of slider wrapper
sliderWrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

// Event listener for left arrow
leftArrow.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide--;
    sliderWrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }
});

// Event listener for right arrow
rightArrow.addEventListener('click', () => {
  if (currentSlide < sliderImages.length - 1) {
    currentSlide++;
    sliderWrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }
});

// Function to fetch the game data
async function fetchGameData(gameId) {
  try {
    const response = await fetch(apiBaseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameId }),
    });

    if (!response.ok) {
      console.error(`Error fetching game data: ${response.status} - ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    console.log('Fetched game data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching game data:', error);
  }
}



// Function to update the page info
function updateGameInfo(game) {
  if (game) {
    document.querySelector(".game-title h2").textContent = game.name;
    document.querySelector(".game-date p").textContent = new Date(game.released).getFullYear();
    document.querySelector(".game-genres p").textContent = game.genres.map(genre => genre.name).join(", ");
    document.querySelector(".game-platforms p").textContent = game.platforms.join(", ");
    document.querySelector(".rawg-rating p").textContent = game.rating;
    document.querySelector(".meta-rating p").textContent = game.meta;

    // Update game images
    const sliderWrapper = document.querySelector(".slider-wrapper");
    sliderWrapper.innerHTML = "";
    if (game.images && Array.isArray(game.images)) {
      game.images.forEach(image => {
        const img = document.createElement("img");
        img.src = image;
        img.alt = game.name;
        sliderWrapper.appendChild(img);
      });
    }

    // Update game description
    document.querySelector(".game-desc p").innerHTML = game.description;
  }
}



async function initResultsPage() {
  if (gameId) {
    const gameData = await fetchGameData(gameId);
    if (gameData) {
      updateGameInfo(gameData);
    } else {
      console.error("Game data is not valid.");
    }
  } else {
    console.error("Game ID not found in the URL.");
  }
}

initResultsPage();
