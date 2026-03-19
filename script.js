import DOM from "./dom.js";

//povecati kategorije
const categories = {
  movies: [
    "THE GODFATHER",
    "TITANIC",
    "INCEPTION",
    "GLADIATOR",
    "CASABLANCA",
    "PSYCHO",
    "AVATAR",
    "JAWS",
    "FROZEN",
    "THE MATRIX",
    "GOODFELLAS",
    "BRAVEHEART",
    "FIGHT CLUB",
    "PULP FICTION",
    "FORREST GUMP",
    "THE LION KING",
    "BACK TO THE FUTURE",
    "JURASSIC PARK",
    "BLADE RUNNER",
    "STAR WARS",
    "THE DARK KNIGHT",
    "THE BIG LEBOWSKI",
    "THE WIZARD OF OZ",
    "SCHINDLER'S LIST",
    "TOY STORY",
    "THE SILENCE OF THE LAMBS",
    "ALIEN",
    "INTERSTELLAR",
    "RAIDERS OF THE LOST ARK",
    "LA LA LAND",
  ],
  tvshows: [
    "BREAKING BAD",
    "SOUTH PARK",
    "GAME OF THRONES",
    "STRANGER THINGS",
    "THE SOPRANOS",
    "FRIENDS",
    "THE OFFICE",
    "SHERLOCK",
    "BLACK MIRROR",
    "THE CROWN",
    "WESTWORLD",
    "BETTER CALL SAUL",
    "ORANGE IS THE NEW BLACK",
    "THE SIMPSONS",
    "ARRESTED DEVELOPMENT",
    "SUCCESSION",
    "FARGO",
    "MAD MEN",
    "THE WEST WING",
    "DEXTER",
    "RICK AND MORTY",
    "LOST",
    "DOCTOR WHO",
    "THE WALKING DEAD",
    "PEAKY BLINDERS",
    "BUFFY THE VAMPIRE SLAYER",
    "THE BIG BANG THEORY",
    "CURB YOUR ENTHUSIASM",
    "TED LASSO",
    "TRUE DETECTIVE",
  ],
  countries: [
    "AUSTRALIA",
    "BRAZIL",
    "CANADA",
    "DENMARK",
    "EGYPT",
    "FRANCE",
    "GERMANY",
    "HUNGARY",
    "INDIA",
    "JAPAN",
    "KENYA",
    "LUXEMBOURG",
    "MEXICO",
    "NETHERLANDS",
    "OMAN",
    "PERU",
    "QATAR",
    "RUSSIA",
    "SPAIN",
    "THAILAND",
    "UNITED KINGDOM",
    "VIETNAM",
    "ITALY",
    "UNITED STATES",
    "CHINA",
    "SOUTH AFRICA",
    "NEW ZEALAND",
    "ARGENTINA",
    "BELGIUM",
    "CHILE",
  ],
  capitalcities: [
    "TOKYO",
    "PARIS",
    "LONDON",
    "KUALA LUMPUR",
    "BERLIN",
    "OTTAWA",
    "CANBERRA",
    "MOSCOW",
    "BEIJING",
    "NEW DELHI",
    "COPENHAGEN",
    "CAIRO",
    "MADRID",
    "ROME",
    "BUENOS AIRES",
    "BANGKOK",
    "VIENNA",
    "SEOUL",
    "JAKARTA",
    "LISBON",
    "RIYADH",
    "HELSINKI",
    "OSLO",
    "STOCKHOLM",
    "ATHENS",
    "DUBLIN",
    "PRAGUE",
    "BUDAPEST",
    "WARSAW",
    "AMSTERDAM",
  ],
  animals: [
    "ELEPHANT",
    "LION",
    "GIRAFFE",
    "PENGUIN",
    "DOLPHIN",
    "TIGER",
    "KANGAROO",
    "PANDA",
    "ZEBRA",
    "POLAR BEAR",
    "CHEETAH",
    "RHINO",
    "BUFFALO",
    "KOALA",
    "GORILLA",
    "CHIMPANZEE",
    "CROCODILE",
    "FLAMINGO",
    "PEACOCK",
    "JAGUAR",
    "LEOPARD",
    "WOLF",
    "FOX",
    "BALD EAGLE",
    "OWL",
    "FROG",
    "SHARK",
    "OCTOPUS",
    "TURTLE",
    "SNAKE",
  ],
  sports: [
    "SOCCER",
    "BASKETBALL",
    "TENNIS",
    "BASEBALL",
    "ROCK CLIMBING",
    "SWIMMING",
    "VOLLEYBALL",
    "TABLE TENNIS",
    "BADMINTON",
    "RUGBY",
    "CRICKET",
    "HOCKEY",
    "BOXING",
    "MARTIAL ARTS",
    "FENCING",
    "ARCHERY",
    "SKIING",
    "BOBSLEIGH",
    "CYCLING",
    "CURLING",
    "SURFING",
    "DIVING",
    "GYMNASTICS",
    "ATHLETICS",
    "ROWING",
    "SAILING",
    "CANOEING",
    "ICE HOCKEY",
    "TRIATHLON",
    "AMERICAN FOOTBALL",
  ],
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
