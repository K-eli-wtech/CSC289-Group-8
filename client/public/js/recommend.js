const selectedGenres = new Set();
const genresGrid = document.getElementById("genres-grid");
const continueButton = document.getElementById("continue-button");

genresGrid.addEventListener("click", (event) => {
    if (event.target.closest(".genre-card")) {
        const genreCard = event.target.closest(".genre-card");
        genreCard.classList.toggle("selected");

        const genreId = genreCard.dataset.id;
        if (selectedGenres.has(genreId)) {
        selectedGenres.delete(genreId);
        } else {
        selectedGenres.add(genreId);
        }

        continueButton.disabled = selectedGenres.size !== 3;
    }
});
  