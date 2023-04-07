const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get("id");

const apiBaseUrl = "http://localhost:3000/api/game";


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


// Formatting date
function formatDate(dateString) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}


// Function to update the page info
function updateGameInfo(game) {
  if (game) {
    document.querySelector(".game-title h2").textContent = game.name;
    document.querySelector(".game-date p").textContent = game.released ? formatDate(game.released) : 'Unknown Release Date';
    document.querySelector(".game-genres p").textContent = game.genres.map(genre => genre.name).join(", ");
    document.querySelector(".game-platforms p").textContent = game.platforms.join(", ");
    document.querySelector(".rawg-rating p").textContent = game.rating;
    document.querySelector(".meta-rating p").textContent = game.meta;

    // Update game images
    const sliderWrapper = document.querySelector(".slider-wrapper");

    const img = document.createElement("img");
    img.src = game.background_image;
    img.alt = game.name;
    sliderWrapper.appendChild(img);


    if (game.short_screenshots && Array.isArray(game.short_screenshots)) {
      game.short_screenshots.forEach(screenshot => {
        const img = document.createElement("img");
        img.src = screenshot.image;
        img.alt = game.name;
        sliderWrapper.appendChild(img);
      });
    }

    // Update game description
    const gameDesc = document.querySelector(".game-desc p");
    gameDesc.innerHTML = game.description.replace(/<br>/g, '');
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
