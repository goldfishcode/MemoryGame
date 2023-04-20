let name = prompt('What is your name?');
if (name == null) {
    name = 'unknown';
}
document.getElementById('name').innerHTML = name;
const cards = document.querySelectorAll('.memory-card');
let timer = 0;
let timeout = null;
count();

function count() {
    timeout = setTimeout(function(){
    document.getElementById('time').innerHTML = timer++;
    count();
}, 1000)
}


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}
let matches = 0;
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  matches++;

  resetBoard();
}

let attempts = 0;
function unflipCards() {
attempts++;
document.getElementById('attempts').innerHTML = attempts;
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  if (matches == 8) { 
    clearTimeout(timeout);
  }
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));