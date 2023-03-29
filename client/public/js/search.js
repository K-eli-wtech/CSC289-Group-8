document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    const resultsOutput = document.getElementById('result');
  
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          handleSearch();
        }
      });
  
    async function fetchData(query) {
        try {
          const response = await fetch('http://localhost:3000/pages/rawgAPI', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
          });
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      
  
      function createCardTemplate(game) {
        const name = game.name || 'Unknown Game';
        const released = game.released || 'Unknown Release Date';
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
                <p>Released: ${released}</p>
                <p>Genres: ${genre}${genre2 ? ', ' + genre2 : ''}</p>
            </div>
            </div>
        `;
      }
  
    async function handleSearch() {
      const query = searchInput.value;
      if (!query) {
        resultsOutput.textContent = 'Please enter a search query';
        while (resultsContainer.firstChild) {
          resultsContainer.removeChild(resultsContainer.firstChild);
        }
        return;
      }
  
      const data = await fetchData(query);
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
  