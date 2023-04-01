/* eslint-disable no-unused-vars */
const gameGenres = [{ id: 4, name: "Action" },{ id: 51, name: "Indie" },{ id: 3, name: "Adventure" },{ id: 5, name: "RPG" },{ id: 10, name: "Strategy" },{ id: 2, name: "Shooter" },{ id: 40, name: "Casual" },{ id: 14, name: "Simulation" },{ id: 7, name: "Puzzle" },{ id: 11, name: "Arcade" },{ id: 83, name: "Platformer" },{ id: 1, name: "Racing" },{ id: 59, name: "Massively Multiplayer" },{ id: 15, name: "Sports" },{ id: 6, name: "Fighting" },{ id: 19, name: "Family" },{ id: 28, name: "Board Games" },{ id: 34, name: "Educational" },{ id: 17, name: "Card" }];
const gameTitles = ["Minecraft", "Grand Theft Auto V", "Deathloop", "Resident Evil Village", "Returnal", "It Takes Two", "Ratchet & Clank: Rift Apart", "Halo Infinite", "Forza Horizon 5", "Psychonauts 2"];
let gameCompanies = [];


// Get updated company ids
async function fetchDevelopers() {
  const key = 'd6823dbd4637434998d92a3eb889e30c';
  const response = await fetch(`https://api.rawg.io/api/developers?key=${key}&page_size=20`);
  const data = await response.json();
  console.log(data);
  return data.results;
}

async function initData() {
  const developers = await fetchDevelopers();
  gameCompanies = developers.map(developer => ({ id: developer.id, name: developer.name }));

  return Promise.resolve();
}


// Getting the genre id
function findGenreIdByName(genreName) {
  const genre = gameGenres.find((g) => g.name === genreName);
  return genre ? genre.id : null;
}


// Fetching data from api-call.js
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


// Creating the cards based on template
function createCardTemplate(game, type) {
  const name = game.name || 'Unknown Game';
  const released = game.released ? formatDate(game.released) : 'Unknown Release Date';
  const photo = game.photo || '../images/NoImageFound.png';
  const rating = game.rating || 'Not rated yet';
  const genre = (game.genres && game.genres.name) || 'Unknown Genre';
  const genre2 = (game.genres2 && game.genres2.name) || '';
  if (type === 'mini') {
    return `
      <div class="mini-card">
        <div class="mini-card-image">
          <img src="${photo}" alt="${name}" />
        </div>
        <div class="mini-card-content">
          <h3>${name}</h3>
          <p class="mini-base">Release Date: </p><p>${released}</p>
          <p class="mini-base">Genres: </p><p>${genre}${genre2 ? ', ' + genre2 : ''}</p>
          <p class="mini-base">Rating: </p>${rating}</p>
        </div>
      </div>
    `;
  } else {
    return `
      <div class="card">
        <div class="card-image">
          <img src="${photo}" alt="${name}" />
        </div>
        <div class="card-content">
          <h3>${name}</h3>
          <p class="base">Release Date: </p><p>${released}</p>
          <p class="base">Genres: </p><p>${genre}${genre2 ? ', ' + genre2 : ''}</p>
        </div>
      </div>
    `;
  }
}


// Genre cards for recommender
function createGenreCard(genre) {
  return `
    <div class="genre-card" data-id="${genre.id}" data-name="${genre.name}">
      <div class="genre-card-content">
        <h3>${genre.name}</h3>
      </div>
    </div>
  `;
}


// Filling up the grid with the genre cards when called
async function populateGenresGrid() {
  const genresGrid = document.getElementById("genres-grid");
  const genresCards = gameGenres.map(createGenreCard).join("");
  genresGrid.innerHTML = genresCards;
}


// Searching for the data and making cards
async function handleSearch(endpoint, searchParams, resultsContainer, count, type) {
  const data = await fetchData(endpoint, searchParams);
  if (!data || !data.length) {
    console.log('No results found');
    return;
  }

  const cards = data.slice(0, count).map((game) => createCardTemplate(game, type)).join('');
  resultsContainer.innerHTML = cards;
}


// Handing the function call and getting random games, titles, genres, developers, ratings, and years for cards
async function randomGames(searchType, container, count, type) {
  const resultsContainer = document.getElementById(container);
  if (searchType === 'title') {
    const randomIndex = Math.floor(Math.random() * gameTitles.length);
    const randomTitle = gameTitles[randomIndex];
    await handleSearch('searchGames', { query: randomTitle }, resultsContainer, count, type);
  } else if (searchType === 'genre') {
    const randomIndex = Math.floor(Math.random() * gameGenres.length);
    const randomGenre = gameGenres[randomIndex];
    await handleSearch('genre', { genre: randomGenre.id }, resultsContainer, count, type);
  } else if (searchType === 'company') {
    await initData();
    const randomIndex = Math.floor(Math.random() * gameCompanies.length);
    const randomCompany = gameCompanies[randomIndex];
    await handleSearch('developer', { developer: randomCompany.id }, resultsContainer, count, type);
  } else if (searchType === 'rating') {
    await handleSearch('rating', { rating: '90,100' }, resultsContainer, count, type);
  } else if (searchType === 'year') {
    await handleSearch('year', { dates: '2021-01-01,2021-12-31' }, resultsContainer, count, type);
  }
}


// Handing the function call getting random games in a specified genre
async function genreGames(genre, container, count, type) {
  const genreId = genre.id;
  if (!genreId) {
    console.log(`genre "${genre.name}" not found.`);
    return;
  }

  const resultsContainer = container;
  await handleSearch('genre', { genre: genreId }, resultsContainer, count, type);
}

