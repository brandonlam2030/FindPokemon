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

const typeBackgrounds = {
  "normal": "#D4D4BC",
  "fire": "#F8C098",
  "water": "#B4C8F8",
  "electric": "#FCE898",
  "grass": "#BCE4A8",
  "ice": "#CCECEC",
  "fighting": "#E09898",
  "poison": "#D0A0D0",
  "ground": "#F0E0B4",
  "flying": "#D4C8F8",
  "psychic": "#FCACC4",
  "bug": "#D4DC90",
  "rock": "#DCD09C",
  "ghost": "#B8ACC4",
  "dragon": "#B8A0FC",
  "dark": "#B8ACAC",
  "steel": "#DCDCE8",
  "fairy": "#F8CCD8"
}

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
function editCardContent(card, obj) {
  card.style.display = "flex";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = obj.name;
  card.classList.add(obj.name.toLowerCase());
  const cardImage = card.querySelector("img");


  
  cardImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${obj.pokedex_number.trim()}.png`;
  cardImage.alt = obj.name + " Poster";


  const type1Text = card.querySelector(".type1 h2");
  const type1 = card.querySelector(".type1");
  type1Text.textContent = obj.type1;
  type1.style.background = typeColors[obj.type1];


  const type2 = card.querySelector(".type2");
  if (obj.type2 && typeColors[obj.type2]) {
    const type2Text = card.querySelector(".type2 h2");
    type2Text.textContent = obj.type2;
    type2.style.background = typeColors[obj.type2];
  } else {
    type2.style.display = "none";
  }


  card.addEventListener("mouseenter", () => {
    card.classList.add("expand");
    card.style.background = typeBackgrounds[obj.type1];
  });

  card.addEventListener("mouseleave", () => {
    card.classList.remove("expand");
    card.style.background = "none";
  });

  const atk = card.querySelector(".atk");
  const def = card.querySelector(".def");
  const spatk = card.querySelector(".spatk");
  const spdef = card.querySelector(".spdef");
  const spd = card.querySelector(".spd");

  console.log(obj.name, obj.attack,obj.defense,obj.sp_attack,obj.sp_defense,obj.speed)
  atk.style.backgroundImage = `linear-gradient(to right, rgb(255,98,98) ${Math.trunc(Number(obj.attack)/185*100)}%, white ${Math.trunc(Number(obj.attack)/185*100)}%)`;
  def.style.backgroundImage = `linear-gradient(to right, rgb(98, 140, 255) ${Math.trunc(Number(obj.defense)/230*100)}%, white ${Math.trunc(Number(obj.defense)/230*100)}%)`;
  spatk.style.backgroundImage = `linear-gradient(to right, rgb(184, 98, 255) ${Math.trunc(Number(obj.sp_attack)/194*100)}%, white ${Math.trunc(Number(obj.sp_attack)/194*100)}%)`;
  spdef.style.backgroundImage = `linear-gradient(to right, rgb(159, 255, 247) ${Math.trunc(Number(obj.sp_defense)/230*100)}%, white ${Math.trunc(Number(obj.sp_defense)/230*100)}%)`;
  spd.style.backgroundImage = `linear-gradient(to right, rgb(255, 98, 216) ${Math.trunc(Number(obj.speed)/200*100)}%, white ${Math.trunc(Number(obj.speed)/200*100)}%)`;
}



//loads intial set of cards on website launch
document.addEventListener("DOMContentLoaded", () => {
  showCards();

  const filter = document.querySelector(".hover-button");
  const option = document.querySelector('.filter-options')

  filter.addEventListener("mouseenter", () => {
    option.style.display = "flex";
  })

  option.addEventListener("mouseleave", () => {
    option.style.display = "none";
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
var reqs = [];
function filter() {
  const value = searchBar.value.toLowerCase();

  var filter = [];
  console.log(reqs);
  while(filter.length < 24 && filterIndex < pokemon.length-1) {
    if (value) {
      if (pokemon[filterIndex].name.toLowerCase().includes(value)) {
        filter.push(pokemon[filterIndex]);
      }  
    } else if (reqs) {
      var valid = true;
      for(const el of reqs) {
        console.log(el === pokemon[filterIndex].generation);
        if (pokemon[filterIndex].generation !== el && pokemon[filterIndex].type1.toLowerCase() !== el && pokemon[filterIndex].type2.toLowerCase() !== el) {
          valid = false;
          break;
        }
      }
      
      if (valid) {
        filter.push(pokemon[filterIndex]);
      }
    }
    filterIndex++;
  }
  const cardContainer = document.getElementById("card-container");

  const templateCard = document.querySelector(".card");
  
  filter.forEach((obj) => {
    console.log("created")
    const wrapper = document.createElement("div");
    wrapper.classList.add("card-wrapper");

    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, obj); // Edit title and image
    wrapper.appendChild(nextCard);
    cardContainer.appendChild(wrapper);
  })
}

//loads pokemon.csv data then calls intial card setup
async function showCards() {
  if (pokemon.length == 0) {
    await loadCSVData();
  }
  filter();
}


const checkbox = document.querySelectorAll("input[type = checkbox]");


checkbox.forEach((box) => {
  box.addEventListener("change", () => {
    filterIndex = 1;
    document.getElementById("card-container").innerHTML = "";
    reqs = Array.from(checkbox).filter(i => i.checked).map(i=>i.value);
    filter();
  })
})

