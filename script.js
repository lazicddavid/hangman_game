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

const gameState = {
  category: "",
  chosenWord: "",
  guessedLetters: [],
  wrongLetter: [],
};

//funkcija koja bira rec
