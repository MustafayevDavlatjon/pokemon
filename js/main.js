var elBox = document.querySelector("[data-pokemon]");
var elForm = document.querySelector("[data-form");
var elImageUrl = document.querySelector("[data-img-url]");
var elName = document.querySelector("[data-name]");
var elType = document.querySelector("[data-type]");
var elSearch = document.querySelector("[data-search]");
var elWeight = document.querySelector("[data-weight]");
var elHeight = document.querySelector("[data-height]");
var elTemplate = document.querySelector("[data-template]");
var elSelect = document.querySelector("[data-select]");
var elFavorites = document.querySelector("[data-favorites]");

const favorites = getFavorites();
renderFavorites(favorites)

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  var pokemon = {
    img: null,
    name: null,
    type: null,
    weight: null,
    height: null,
    type: null,
  };
  pokemon.img = elImageUrl.value;
  pokemon.name = elName.value;
  pokemon.type = elType.value;
  pokemon.weight = `${elWeight.value} ${"kg"}`;
  pokemon.height = `${elHeight.value} ${"m"}`;
  pokemon.search = elSearch.value;

  pokemons.unshift(pokemon);
  elBox.prepend(createDiv(pokemon));
});

function renderPokemons(pokemons) {
  elBox.innerHTML = "";
  for (i = 0; i < pokemons.length; i++) {
    pokemon = pokemons[i];
    elBox.appendChild(createDiv(pokemon));
  }
}

function createDiv(pokemon) {
  var elCard = elTemplate.content.cloneNode(true);
  elCard.querySelector("[data-btn-add]").dataset.id = pokemon.id;
  elCard.querySelector("[data-btn-add]").textContent = favorites.includes(
    pokemon.id
  )
    ? "Added"
    : "Add";
  elCard.querySelector("[data-card-img]").src = pokemon.img;
  elCard.querySelector("[data-card-h4]").textContent = pokemon.name;
  elCard.querySelector("[data-card-h5]").textContent = pokemon.type;
  elCard.querySelector("[data-card-weight]").textContent = pokemon.weight;
  elCard.querySelector("[data-card-height]").textContent = pokemon.height;
  return elCard;
}

renderPokemons(pokemons);

elSearch.addEventListener("keyup", (evt) => {
  var searchPokemon = [];
  pokemons.forEach((pokemon) => {
    if (pokemon.name.includes(elSearch.value)) {
      searchPokemon.push(pokemon);
    }
  });
  renderPokemons(searchPokemon);
});

elSelect.addEventListener("click", (evt) => {
  var selectPokemon = [];
  pokemons.forEach((pokemon) => {
    if (pokemon.type.includes(elSelect.value)) {
      selectPokemon.push(pokemon);
    }
  });

  renderPokemons(selectPokemon);
});

elBox.addEventListener("click", (evt) => {
  onFavoriteClick(evt);
});

function onFavoriteClick(evt) {
  const el = evt.target.closest("[data-btn-add]");

  if (!el) return;

  const id = +el.dataset.id;
  if (favorites.includes(id)) {
    favorites.splice(favorites.indexOf(id), 1);
  } else {
    favorites.push(id);
  }
  setFavorites(favorites);
  renderPokemons(pokemons);
}

function setFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites(favorites)
}

function getFavorites(favorites) {
  const stringFav = localStorage.getItem("favorites") || "[]";
  return JSON.parse(stringFav);
}

function renderFavorites(favorites) {
  let html = "";
  favorites.forEach(item => {
    const pokemon = pokemons.find((pokemon) => (pokemon.id === item));
    html += `<h4 class="d-block text-center w-50 badge bg-warning text-dark">${pokemon.name}</h4>`;
  });
  elFavorites.innerHTML = html;
}
