import DOM from "./dom.js";

//povecati kategorije
const categories = {
  movies: ["GLADIATOR", "TITANIC"],
  sport: ["FOOTBALL", "BOX"],
  countries: ["SERBIA", "FRANCE", "SPAIN"],
  capitals: ["BELGRADE", "PARIS", "TOKYO", "MADRID"],
  animals: ["CAT", "DOG", "SHARK"],
};

//stejt
const gameState = {
  category: "",
  chosenWord: "",
  guessedLetters: [],
  wrongLetters: [],
  maxWrongAttempts: 6,
};

DOM.playBtn.addEventListener("click", function () {
  DOM.startScreen.classList.add("hidden");
  DOM.categoryScreen.classList.remove("hidden");
});

DOM.backBtn.addEventListener("click", function () {
  DOM.categoryScreen.classList.add("hidden");
  DOM.startScreen.classList.remove("hidden");
});

DOM.categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedCategory = button.dataset.category;
    openGame(selectedCategory);
  });
});

DOM.modalBackBtn.addEventListener("click", function () {
  backToCategories();
});

DOM.newGameBtn.addEventListener("click", function () {
  goToStartScreen();
});

DOM.chooseCategoryBtn.addEventListener("click", function () {
  goToCategoryScreen();
});
//razdvoj odgovornosti i metode napravi
//pocetak igre
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

  hideResultModal();

  console.log(gameState.category);
  console.log(gameState.chosenWord);

  renderWord();
  renderLetters();
  renderAttempts();
}
//this
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

function renderLetters() {
  DOM.lettersContainer.innerHTML = "";
  //global scope
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

function renderAttempts() {
  const attemptsLeft =
    gameState.maxWrongAttempts - gameState.wrongLetters.length;

  DOM.attemptsText.textContent = `Attempts left: ${attemptsLeft}`;
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
function checkGameStatus() {
  const wordLetters = gameState.chosenWord.split("");

  let guessedCount = 0;

  wordLetters.forEach(function (letter) {
    if (gameState.guessedLetters.includes(letter)) {
      guessedCount++;
    }
  });

  if (guessedCount === wordLetters.length) {
    showResultModal("YOU WIN");
    return;
  }

  if (gameState.wrongLetters.length >= gameState.maxWrongAttempts) {
    showResultModal("YOU LOSE");
  }
}

//modal
function showResultModal(message) {
  DOM.resultMessage.textContent = message;
  DOM.resultModal.classList.remove("hidden");

  const allLetterButtons = DOM.lettersContainer.querySelectorAll(".letter-btn");

  allLetterButtons.forEach(function (button) {
    button.disabled = true;
  });
}

function hideResultModal() {
  DOM.resultModal.classList.add("hidden");
}

//restart
function resetGameState() {
  gameState.category = "";
  gameState.chosenWord = "";
  gameState.guessedLetters = [];
  gameState.wrongLetters = [];
}

function goToStartScreen() {
  hideResultModal();
  resetGameState();

  DOM.gameScreen.classList.add("hidden");
  DOM.categoryScreen.classList.add("hidden");
  DOM.startScreen.classList.remove("hidden");

  DOM.wordContainer.innerHTML = "";
  DOM.lettersContainer.innerHTML = "";
  DOM.categoryTitle.textContent = "";
  DOM.attemptsText.textContent = "";
}

function backToCategories() {
  hideResultModal();
  resetGameState();

  DOM.gameScreen.classList.add("hidden");
  DOM.categoryScreen.classList.remove("hidden");
  DOM.startScreen.classList.add("hidden");

  DOM.wordContainer.innerHTML = "";
  DOM.lettersContainer.innerHTML = "";
  DOM.categoryTitle.textContent = "";
  DOM.attemptsText.textContent = "";
}

function goToCategoryScreen() {
  hideResultModal();
  resetGameState();

  DOM.gameScreen.classList.add("hidden");
  DOM.startScreen.classList.add("hidden");
  DOM.categoryScreen.classList.remove("hidden");

  DOM.wordContainer.innerHTML = "";
  DOM.lettersContainer.innerHTML = "";
  DOM.categoryTitle.textContent = "";
  DOM.attemptsText.textContent = "";
}
