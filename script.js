const recipeList = document.getElementById('recipe-list');

function searchRecipes(event) {
  event.preventDefault();

  const searchInput = event.target.querySelector('input');
  const searchQuery = searchInput.value.trim();

  if (searchQuery !== '') {
    fetch(`https://api.edamam.com/search?q=${searchQuery}&app_id=ab091492&app_key=
    34740a294dbfe5f3e99b056ebc310356`)
      .then(response => response.json())
      .then(data => {
        recipeList.innerHTML = '';

        data.hits.forEach(hit => {
          const recipe = hit.recipe;
          const recipeCard = document.createElement('div');
          recipeCard.classList.add('recipe-card');

          const recipeImage = document.createElement('img');
          recipeImage.src = recipe.image;

          const recipeTitle = document.createElement('h2');
          recipeTitle.textContent = recipe.label;

          const recipeIngredients = document.createElement('p');
          recipeIngredients.textContent = recipe.ingredientLines.join(', ');

          recipeCard.appendChild(recipeImage);
          recipeCard.appendChild(recipeTitle);
          recipeCard.appendChild(recipeIngredients);

          recipeList.appendChild(recipeCard);
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}

const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', searchRecipes);