const DOM = {
  playBtn: document.getElementById("playBtn"),
  backBtn: document.getElementById("backBtn"),
  startScreen: document.getElementById("startScreen"),
  categoryScreen: document.getElementById("categoryScreen"),
  gameScreen: document.getElementById("gameScreen"),
  categoryButtons: document.querySelectorAll(".category-btn"),
  wordContainer: document.getElementById("wordContainer"),
  categoryTitle: document.getElementById("categoryTitle"),
  lettersContainer: document.getElementById("lettersContainer"),
  attemptsText: document.getElementById("attemptsText"),
  resultModal: document.getElementById("resultModal"),
  resultMessage: document.getElementById("resultMessage"),
  modalBackBtn: document.getElementById("modalBackBtn"),
  newGameBtn: document.getElementById("newGameBtn"),
  chooseCategoryBtn: document.getElementById("chooseCategoryBtn"),
};

const categories = {
  movies: ["GLADIATOR", "TITANIC"],
  sport: ["FOTBALL", "BOX"],
  countries: ["SERBIA", "FRANCE", "SPAIN"],
  capitals: ["BELGRADE", "PARIS", "TOKYO", "MADRID"],
  animals: ["CAT", "DOG", "SHARK"],
};

const gameState = {
  category: "",
  chosenWord: "",
  guessedLetters: [],
  wrongLetters: [],
  maxWrongAttemts: 6,
};

DOM.playBtn.addEventListener("click", function () {
  DOM.startScreen.classList.add("hidden");
  DOM.categoryScreen.classList.remove("hidden");
});

DOM.backBtn.addEventListener("click", function () {
  DOM.categoryScreen.classList.add("hidden");
  DOM.startScreen.classList.remove("hidden");
});

function openGame(category) {
  gameState.category = category;
  gameState.guessedLetters = [];
  gameState.wrongLetters = [];

  DOM.categoryTitle.textContent = category.toUpperCase();

  const categoryWords = categories[category];
  const randomIndex = Math.floor(Math.random() * categoryWords.length);

  gameState.chosenWord = categoryWords[randomIndex];

  DOM.categoryScreen.classList.add("hidden");
  DOM.gameScreen.classList.remove("hidden");

  console.log(gameState.category);
  console.log(gameState.chosenWord);

  renderWord();
  renderLetters();
}

function renderWord() {
  DOM.wordContainer.innerHTML = "";

  gameState.chosenWord.split("").forEach(function (letter) {
    const letterBox = document.createElement("div");
    letterBox.classList.add("letter-box");

    if (gameState.guessedLetters.includes(letter)) {
      letterBox.textContent = letter;
    }

    DOM.wordContainer.appendChild(letterBox);
  });
}

DOM.categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedCategory = button.dataset.category;
    openGame(selectedCategory);
  });
});

function renderLetters() {
  DOM.lettersContainer.innerHTML = "";

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  alphabet.forEach(function (letter) {
    const letterBtn = document.createElement("button");
    letterBtn.textContent = letter;
    letterBtn.classList.add("letter-btn");

    letterBtn.addEventListener("click", function () {
      letterClick(letter, letterBtn);
    });

    DOM.lettersContainer.appendChild(letterBtn);
  });
}

/*
renderWord();
renderLetters();
*/

function checkGameStatus() {
  const allLettersGuessed = gameState.chosenWord
    .split("")
    .every(function (letter) {
      return gameState.guessedLetters.includes(letter);
    });

  if (allLettersGuessed) {
    showResultModal("YOU WIN");
    return;
  }

  if (gameState.wrongLetters.length >= gameState.maxWrongAttempts) {
    showResultModal("YOU LOSE");
  }
}

function letterClick(letter, button) {
  button.disabled = true;

  if (gameState.guessedLetters.includes(letter)) return;
  if (gameState.wrongLetters.includes(letter)) return;

  if (gameState.chosenWord.includes(letter)) {
    gameState.guessedLetters.push(letter);
  } else {
    gameState.wrongLetters.push(letter);
  }

  renderWord();
  renderAttempts();
  checkGameStatus();
}
function renderAttempts() {
  const attemptsLeft =
    gameState.maxWrongAttempts - gameState.wrongLetters.length;

  DOM.attemptsText.textContent = `Attempts left: ${attemptsLeft}`;
}

function resetGameState() {
  gameState.category = "";
  gameState.chosenWord = "";
  gameState.guessedLetters = [];
  gameState.wrongLetters = [];
}
