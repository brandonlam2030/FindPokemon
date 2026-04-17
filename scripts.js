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


var offset = 1;


async function showCards() {
  await loadCSVData();
  const cardContainer = document.getElementById("card-container");

  const templateCard = document.querySelector(".card");

  for (let i = 0; i < 28; i++) {
    let target = pokemon[offset++];


    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, target.name, target.pokedex_number); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}

function editCardContent(card, newTitle, newImageURL) {
  card.style.display = "flex";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = newTitle;

  const cardImage = card.querySelector("img");
  cardImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${newImageURL.trim()}.png`;
  cardImage.alt = newTitle + " Poster";

  
  console.log("new card:", newTitle, "- html: ", card);
}


document.addEventListener("DOMContentLoaded", showCards);



