var cards = document.querySelectorAll('.card');
var counter = document.querySelector('.attempts');
var finalCounter = document.querySelector('.final');
var best = document.querySelector('.best');
var bestTracker = Infinity;
var matches = 0;
var attempts = 0;
var cardOne, cardTwo;
var alreadyFlipped = false;
var lockDeck = false;

function flipCard() {
  if(lockDeck) {
    return;
  }
  if (cardOne === this) {
    return;
  }
  this.classList.add('flip');
  if (!alreadyFlipped) {
    alreadyFlipped = true;
    cardOne = this;
    return;
  } else {
    cardTwo = this;
    alreadyFlipped = false;
    attempts++;
    counter.innerHTML = attempts;
    finalCounter.innerHTML = attempts;
    match();
  }
}
function match() {
  if (cardOne.id === cardTwo.id) {
    matches++;
    lockFlippedCards();
    if(matches === 8) {
      gameComplete();
    }
    return;
  }
  resetCards();
}
function lockFlippedCards() {
  cardOne.removeEventListener('click', flipCard);
  cardTwo.removeEventListener('click', flipCard);
}
function resetCards() {
  lockDeck = true;
  setTimeout(function(){
    cardOne.classList.remove('flip');
    cardTwo.classList.remove('flip');
    lockDeck = false;
  },1000);
}
//cards.forEach(card => card.addEventListener('click', flipCard));
function shuffle() {
  var array = [];
  for (var i = 0; i < cards.length; i++) {
    array[i] = i + 1;
  }
  for (var i = 0; i < array.length; i++) {
    var j = Math.floor(Math.random() * i);
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  for (var i = 0; i < cards.length; i++) {
    cards[i].style.order = array[i];
  }
};
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
//var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
/*
btn.onclick = function() {
  modal.style.display = "block";
}
*/
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  startAgain();
}

document.body.onload = startGame();

function startGame() {
  cardOne = null;
  cardTwo = null;
  alreadyFlipped = false;
  lockDeck = false;
  attempts = 0;
  counter.innerHTML = 0;
  matches = 0;
  shuffle();
  cards.forEach(card => card.addEventListener('click', flipCard));
}
function startAgain() {
  lockDeck = true;
  attempts = 0;
  counter.innerHTML = 0;
  modal.style.display = "none";
  cards.forEach(card => card.classList.remove('flip'));
  setTimeout(function(){
    lockDeck = false;
    startGame();
  },750);
}
function gameComplete() {
    if (attempts < bestTracker) {
      bestTracker = attempts;
      best.innerHTML = attempts;
    }
    setTimeout(function(){
      modal.style.display = "block";
    },750);
}