const DOM = {
  playBtn: document.getElementById("playBtn"),
  backBtn: document.getElementById("backBtn"),
  startScreen: document.getElementById("startScreen"),
  categoryScreen: document.getElementById("categoryScreen"),
  gameScreen: document.getElementById("gameScreen"),
};

const words = ["......"];

const categories = {
  movies: ["GLADIATOR", "TITANIC"],
  sport: ["FOOTBALL", "BOX"],
  countries: ["SERBIA", "FRANCE", "SPAIN"],
  capitals: ["BELGRADE", "PARIS", "TOKYO", "MADRID"],
  animals: ["CAT", "DOG", "SHARK"],
};

const gameState = {
  category: "",
  chosenWord: "",
  guessedLetters: [],
  wrongLetter: [],
};

//funkcija koja bira rec

DOM.playBtn.addEventListener("click", function () {
  DOM.startScreen.classList.add("hidden");
  DOM.categoryScreen.classList.remove("hidden");
});

DOM.backBtn.addEventListener("click", function () {
  DOM.categoryScreen.classList.add("hidden");
  DOM.startScreen.classList.remove("hidden");
});

//funkcije:
/*
let selectedCategory = "";
let selectedWord = "";
*/
function openGame(category) {
  selectedCategory = category;

  const words = categories[category];
  selectedWord = words[Math.floor(Math.random() * words.length)];

  DOM.categoryScreen.classList.add("hidden");
  DOM.gameScreen.classList.remove("hidden");

  console.log(selectedCategory);
  console.log(selectedWord);
}
