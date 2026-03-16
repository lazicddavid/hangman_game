const DOM = {
  playBtn: document.getElementById("playBtn"),
  backBtn: document.getElementById("backBtn"),
  startScreen: document.getElementById("startScreen"),
  categoryScreen: document.getElementById("categoryScreen"),
  gameScreen: document.getElementById("gameScreen"),
  categoryButtons: document.querySelectorAll(".category-btn"),
  wordContainer: document.getElementById("wordContainer"),
  wordContainer: document.getElementById("wordContainer"),
  categoryTitle: document.getElementById("categoryTitle"),
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

  DOM.categoryTitle.textContent = category.toUpperCase();

  const words = categories[category];
  selectedWord = words[Math.floor(Math.random() * words.length)];

  gameState.chosenWord = categoryWords[randomIndex];

  DOM.categoryScreen.classList.add("hidden");
  DOM.gameScreen.classList.remove("hidden");

  console.log(selectedCategory);
  console.log(selectedWord);
}

DOM.categoryButtons.forEach(function (button) {
  button.add.addEventListener("click", function () {
    const selectedCategory = button.dataset.category;
    openGame(selectedCategory);
  });
});

//funkc. za crtanje praznih polja

function renderWord() {
  DOM.wordContainer.innerHTML = "";

  gameState.chosenWord.split("").forEach(function () {
    const letterBox = document.createElement("div");
    letterBox.classList.add("letter-box");

    DOM.wordContainer.appendChild(letterBox);
  });
}
renderWord();
