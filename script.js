const DOM = {
  playBtn: document.getElementById("playBtn"),
  backBtn: document.getElementById("backBtn"),
  startScreen: document.getElementById("startScreen"),
  categoryScreen: document.getElementById("categoryScreen"),
};

const words = ["......"];

const categories = {
  movies: ["gladiator", "titanic"],
  sport: ["Football", "box"],
  countries: ["Serbia", "France", "spain"],
  capitals: ["belgrade", "paris", "tokyo", "madrid"],
  animals: ["cat", "dog", "shark"],
};

const wordsByCategory = {};

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

let selectedCategory = "";
let selectedWord = "";

function openGame(category) {
  selectedCategory = category;

  const words = categories[category];
  selectedWord = words[Math.floor(Math.random() * words.length)];

  categoryScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  console.log(selectedCategory);
  console.log(selectedWord);
}
