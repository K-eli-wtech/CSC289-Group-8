/* eslint-disable no-unused-vars */
const gameGenres = ["Action-Adventure", "Role-Playing", "Shooter", "Sports", "Simulation", "Platformer", "Strategy", "Fighting", "Racing", "Puzzle", "Massive Multiplayer"];
const gameCompanies = ["Nintendo", "Sony Interactive Entertainment", "Microsoft", "Activision Blizzard", "Electronic Arts", "Tencent Games", "Ubisoft", "Take-Two Interactive", "Epic Games", "Valve Corporation"];
const gameTitles = ["Minecraft", "Grand Theft Auto V", "Deathloop", "Resident Evil Village", "Returnal", "It Takes Two", "Ratchet & Clank: Rift Apart", "Halo Infinite", "Forza Horizon 5", "Psychonauts 2"];


async function fetchData(searchParams) {
  try {
    const response = await fetch('http://localhost:3000/pages/searchGames', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchParams),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

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

  
  
function createCardTemplate(game) {
  const name = game.name || 'Unknown Game';
  const released = game.released ? formatDate(game.released) : 'Unknown Release Date';
  const photo = game.photo || '../images/NoImageFound.png';
  const genre = (game.genres && game.genres.name) || 'Unknown Genre';
  const genre2 = (game.genres2 && game.genres2.name) || '';

  return `
      <div class="mini-card">
      <div class="mini-card-image">
          <img src="${photo}" alt="${name}" />
      </div>
      <div class="mini-card-content">
          <h3>${name}</h3>
          <p class="mini-base">Release Date: </p><p>${released}</p>
          <p class="mini-base">Genres: </p><p>${genre}${genre2 ? ', ' + genre2 : ''}</p>
      </div>
      </div>
  `;
}


async function handleSearch(searchParams, resultsContainer, count) {
  const data = await fetchData(searchParams);
  if (!data || !data.length) {
    console.log('No results found');
    return;
  }

  const cards = data.slice(0, count).map(createCardTemplate).join('');
  resultsContainer.innerHTML = cards;
}

async function searchGames(searchType, container, count) {
  const resultsContainer = document.getElementById(container);
  if (searchType === 'title') {
    const randomIndex = Math.floor(Math.random() * gameTitles.length);
    const randomTitle = gameTitles[randomIndex];
    await handleSearch({ searchType: 'title', query: randomTitle }, resultsContainer, count);
  } else if (searchType === 'genre') {
    const randomIndex = Math.floor(Math.random() * gameGenres.length);
    const randomGenre = gameGenres[randomIndex];
    await handleSearch({ searchType: 'genre', query: randomGenre }, resultsContainer, count);
  } else if (searchType === 'company') {
    const randomIndex = Math.floor(Math.random() * gameCompanies.length);
    const randomCompany = gameCompanies[randomIndex];
    await handleSearch({ searchType: 'company', query: randomCompany }, resultsContainer, count);
  }
}
