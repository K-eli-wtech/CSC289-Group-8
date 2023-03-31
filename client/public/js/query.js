/* eslint-disable no-unused-vars */
let gameGenres = [];
let gameCompanies = [];
const gameTitles = ["Minecraft", "Grand Theft Auto V", "Deathloop", "Resident Evil Village", "Returnal", "It Takes Two", "Ratchet & Clank: Rift Apart", "Halo Infinite", "Forza Horizon 5", "Psychonauts 2"];

async function fetchGenres() {
  const key = 'd6823dbd4637434998d92a3eb889e30c';
  const response = await fetch(`https://api.rawg.io/api/genres?key=${key}`);
  const data = await response.json();
  return data.results;
}

async function fetchDevelopers() {
  const key = 'd6823dbd4637434998d92a3eb889e30c';
  const response = await fetch(`https://api.rawg.io/api/developers?key=${key}`);
  const data = await response.json();
  return data.results;
}

async function initData() {
  const genres = await fetchGenres();
  gameGenres = genres.map(genre => ({ id: genre.id, name: genre.name }));

  const developers = await fetchDevelopers();
  gameCompanies = developers.map(developer => ({ id: developer.id, name: developer.name }));

  return Promise.resolve();
}

initData();

async function fetchData(endpoint, searchParams) {
  try {
    const response = await fetch(`http://localhost:3000/api/${endpoint}`, {
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


async function handleSearch(endpoint, searchParams, resultsContainer, count) {
  const data = await fetchData(endpoint, searchParams);
  if (!data || !data.length) {
    console.log('No results found');
    return;
  }

  const cards = data.slice(0, count).map(createCardTemplate).join('');
  resultsContainer.innerHTML = cards;
}


async function searchGames(searchType, container, count) {
  await initData(); // Add this line to wait for data initialization
  const resultsContainer = document.getElementById(container);
  if (searchType === 'title') {
    const randomIndex = Math.floor(Math.random() * gameTitles.length);
    const randomTitle = gameTitles[randomIndex];
    await handleSearch('searchGames', { query: randomTitle }, resultsContainer, count);
  } else if (searchType === 'genre') {
    const randomIndex = Math.floor(Math.random() * gameGenres.length);
    const randomGenre = gameGenres[randomIndex];
    await handleSearch('genre', { genre: randomGenre.id }, resultsContainer, count);
  } else if (searchType === 'company') {
    const randomIndex = Math.floor(Math.random() * gameCompanies.length);
    const randomCompany = gameCompanies[randomIndex];
    await handleSearch('developer', { developer: randomCompany.id }, resultsContainer, count);
  } else if (searchType === 'rating') {
    await handleSearch('rating', { rating: '90,100' }, resultsContainer, count);
  } else if (searchType === 'year') {
    await handleSearch('year', { dates: '2021-01-01,2021-12-31' }, resultsContainer, count);
  }
}


