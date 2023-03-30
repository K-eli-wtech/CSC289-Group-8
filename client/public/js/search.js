document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');
  const resultsOutput = document.getElementById('result');

  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });

  async function fetchData(query, searchType) {
    try {
      const response = await fetch('http://localhost:3000/pages/searchGames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, searchType }),
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
    
    
    async function handleSearch() {
      const input = searchInput.value;
      if (!input) {
        resultsOutput.textContent = 'Please enter a search query';
        while (resultsContainer.firstChild) {
          resultsContainer.removeChild(resultsContainer.firstChild);
        }
        return;
      }
    
      const [searchType, ...rest] = input.split(':');
      const query = rest.join(':').trim();
    
      const data = await fetchData(query, searchType);
      if (!data || !data.length) {
        resultsOutput.textContent = 'No results found';
        while (resultsContainer.firstChild) {
          resultsContainer.removeChild(resultsContainer.firstChild);
        }
        return;
      }
    
      const cards = data.map(createCardTemplate).join('');
      resultsOutput.textContent = '';
      resultsContainer.innerHTML = cards;
    }
  });
  