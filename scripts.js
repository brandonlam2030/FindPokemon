var pokemon = []
const frame = [
  "against_bug",
  "against_dark",
  "against_dragon",
  "against_electric",
  "against_fairy",
  "against_fight",
  "against_fire",
  "against_flying",
  "against_ghost",
  "against_grass",
  "against_ground",
  "against_ice",
  "against_normal",
  "against_poison",
  "against_psychic",
  "against_rock",
  "against_steel",
  "against_water",
  "attack",
  "base_egg_steps",
  "base_happiness",
  "base_total",
  "capture_rate",
  "classification",
  "defense",
  "experience_growth",
  "height_m",
  "hp",
  "japanese_name",
  "name",
  "percentage_male",
  "pokedex_number",
  "sp_attack",
  "sp_defense",
  "speed",
  "type1",
  "type2",
  "weight_kg",
  "generation",
  "is_legendary"]

  const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC"
};

//loads all pokemon data
async function loadCSVData() {
  const response = await fetch("pokemon.csv")
  const text = await response.text();

  let data = text.split("\n");
  data.forEach((obj) => {
    obj = obj.slice(obj.search("]")+3);
    const attributes = (obj.split(","));

    let zipped = {}
    for(let i = 0 ; i < attributes.length; i++) {
      zipped[frame[i]] = attributes[i];
    }
    pokemon.push(zipped);
  })
}


//edits existing card template
function editCardContent(card, newTitle, newImageURL, elements) {
  card.style.display = "flex";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = newTitle;
  card.classList.add(newTitle.toLowerCase());
  const cardImage = card.querySelector("img");


  
  cardImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${newImageURL.trim()}.png`;
  cardImage.alt = newTitle + " Poster";


  const type1Text = card.querySelector(".type1 h2");
  const type1 = card.querySelector(".type1");
  type1Text.textContent = elements[0];
  type1.style.background = typeColors[elements[0]];


  const type2 = card.querySelector(".type2");
  if (elements[1] && typeColors[elements[1]]) {
    const type2Text = card.querySelector(".type2 h2");
    type2Text.textContent = elements[1];
    type2.style.background = typeColors[elements[1]];
  } else {
    type2.style.display = "none";
  }
}



//loads intial set of cards on website launch
document.addEventListener("DOMContentLoaded", () => {
  showCards();

  const filter = document.querySelector(".hover-button");
  const option = document.querySelector('.filter-options')

  filter.addEventListener("click", () => {
    option.style.display = (option.style.display == "none" ? "grid" : "none");
  })
 
});


const searchBar = document.querySelector(".filter .search-box");
//on each input in the search bar, reset my search index to 1, clear all cards, and filter to show only what is searched
searchBar.addEventListener("input", () => {
  filterIndex = 1;
  document.getElementById("card-container").innerHTML = "";
  filter();
});


var filterIndex = 1;
function filter() {
  const value = searchBar.value.toLowerCase();
  var filter = [];

  while(filter.length < 24 && filterIndex < pokemon.length-1) {
    if (pokemon[filterIndex].name.toLowerCase().includes(value)) {
      filter.push(pokemon[filterIndex]);
    }
    filterIndex++;
  }
  const cardContainer = document.getElementById("card-container");

  const templateCard = document.querySelector(".card");
  
  filter.forEach((obj) => {
    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, obj.name, obj.pokedex_number, [obj.type1, obj.type2]); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  })
}




//loads pokemon.csv data then calls intial card setup
async function showCards() {
  if (pokemon.length == 0) {
    await loadCSVData();
  }
  filter();
}


function detail() {
  document.querySelector()
}