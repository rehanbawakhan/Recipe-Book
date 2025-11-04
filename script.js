const searchBox= document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


// Function to get recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML = "";
        response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>        
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        //Adding EventListener to recipe button
        button.addEventListener("click", ()=>{
            openRecipePopup(meal);
        });

        recipeContainer.appendChild(recipeDiv);
        });
    } catch (error) {
        recipeContainer.innerHTML = "<h2>The dish doesn't exist</h2>";
                
    }
}

//Function to fetch ingredients and measurements
const fetchIngredients = (meal) =>{
    let ingredientsList = "";
    for(let i = 1; i <= 20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList +=`<li>${measure} ${ingredient}</li>`
        }
        else{
            break
        }
    }
    return ingredientsList;
}
const openRecipePopup = (meal) =>{
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="IngredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display ="none" ;
});

/*searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the meal in the search box</h2>`;
        return;
    }
    fetchRecipes(searchInput);
});*/

/*searchBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();

  if (!searchInput) {
    recipeContainer.innerHTML = `<h2>Type the meal in the search box</h2>`;
    return;
  }

  // List of known areas supported by the API
  const validAreas = [
    "American", "British", "Canadian", "Chinese", "Croatian", "Dutch",
    "Egyptian", "French", "Greek", "Indian", "Irish", "Italian",
    "Jamaican", "Japanese", "Kenyan", "Malaysian", "Mexican",
    "Moroccan", "Polish", "Portuguese", "Russian", "Spanish", "Thai",
    "Tunisian", "Turkish", "Vietnamese"
  ];

  const formattedInput = searchInput.charAt(0).toUpperCase() + searchInput.slice(1).toLowerCase();

  // Check if the input matches a valid area name
  if (validAreas.includes(formattedInput)) {
    recipeContainer.innerHTML = `<h2>Fetching ${formattedInput} dishes...</h2>`;
    try {
      const areaData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${formattedInput}`);
      const areaResponse = await areaData.json();
      recipeContainer.innerHTML = "";

      areaResponse.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
          <img src="${meal.strMealThumb}">
          <h3>${meal.strMeal}</h3>
          <p>Area: ${formattedInput}</p>
        `;
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        // Fetch full recipe details by ID
        button.addEventListener("click", async () => {
          const detailData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
          const detailResponse = await detailData.json();
          openRecipePopup(detailResponse.meals[0]);
        });

        recipeContainer.appendChild(recipeDiv);
      });
    } catch (error) {
      recipeContainer.innerHTML = `<h2>Error fetching ${formattedInput} recipes</h2>`;
      console.error(error);
    }
  } else {
    // Normal search by meal name
    fetchRecipes(searchInput);
  }
});*/

searchBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();

  if (!searchInput) {
    recipeContainer.innerHTML = `<h2>Type the meal in the search box</h2>`;
    return;
  }

  // List of valid areas from TheMealDB
  const validAreas = [
    "American", "British", "Canadian", "Chinese", "Croatian", "Dutch",
    "Egyptian", "French", "Greek", "Indian", "Irish", "Italian",
    "Jamaican", "Japanese", "Kenyan", "Malaysian", "Mexican",
    "Moroccan", "Polish", "Portuguese", "Russian", "Spanish", "Thai",
    "Tunisian", "Turkish", "Vietnamese"
  ];

  // Format input properly (capitalize first letter)
  const formattedInput = searchInput.charAt(0).toUpperCase() + searchInput.slice(1).toLowerCase();

  // Check if input is an area name
  if (validAreas.includes(formattedInput)) {
    recipeContainer.innerHTML = `<h2>Fetching ${formattedInput} dishes...</h2>`;
    try {
      const areaData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${formattedInput}`);
      const areaResponse = await areaData.json();

      if (!areaResponse.meals) {
        recipeContainer.innerHTML = `<h2>No dishes found for ${formattedInput} cuisine</h2>`;
        return;
      }

      recipeContainer.innerHTML = `
      <h2 class="results-title">🍛 Showing ${formattedInput} Dishes</h2>
      `;


      areaResponse.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
          <img src="${meal.strMealThumb}">
          <h3>${meal.strMeal}</h3>
          <p>Area: ${formattedInput}</p>
        `;
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        // Fetch full details using ID
        button.addEventListener("click", async () => {
          const detailData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
          const detailResponse = await detailData.json();
          openRecipePopup(detailResponse.meals[0]);
        });

        recipeContainer.appendChild(recipeDiv);
      });
    } catch (error) {
      recipeContainer.innerHTML = `<h2>Error fetching ${formattedInput} recipes</h2>`;
      console.error(error);
    }
  } else {
    // Default: search by meal name
    recipeContainer.innerHTML = `<h2>Fetching recipes for "${searchInput}"...</h2>`;
    try {
      await fetchRecipes(searchInput);
      const title = document.createElement('h2');
      title.innerHTML = `🍽️ Showing results for "${searchInput}"`;
      title.classList.add("results-title");

      recipeContainer.prepend(title);
    } catch (err) {
      recipeContainer.innerHTML = `<h2>Error fetching results for "${searchInput}"</h2>`;
      console.error(err);
    }
  }
});

