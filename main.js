// Step 1a - Select and store the gameboard element
const gameboard = document.querySelector('#gameboard');
// Step 1b - Select and store the score element
const score = document.querySelector('#score');
// Step 1c - Select and store the cards element
const cards = document.querySelector('#cards');
// Step 1d - Select and store the message element
const message = document.querySelector('#message');
message.textContent = "Welcome! The rules are simple. Match 2 cards - get a point."
 
// Step 2 - Create an array of cards
const cardValues = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
let deck = [];
let cardElements = [];

// Step 2a - Create a function to shuffle the deck
function shuffleDeck () {
  // Step 2b - Create a placeholder array
  // Step 2c - Iterate through card values 4 times
  for(let i = 0; i < 4; i++) {
    var tmp = cardValues.slice(0);
    // Step 2d - Using a conditional loop
    let x = 13
    while(x > 0) {
      // Step 2e - Select a random card from the array
      let random = Math.floor(Math.random() * tmp.length);
      randomCard = tmp[random];
      
      tmp.splice(random,1);
      // Step 2f - Add the card to the deck array
      deck.push(randomCard);
      x--;
    }
  }
}

// Step 2g - Call the shuffleDeck function
shuffleDeck();

// Step 3a - Create an array to store 2 players
const playerOne = {name: 'Player One', score: 0};
const playerTwo = {name: 'Player Two', score: 0};
const players = [ playerOne, playerTwo ];

score.textContent = `Player One - ${playerOne.score} | Player Two - ${playerTwo.score}`;

// Step 3b - Create a variable to store the current player
var currentPlayer = players[0];

// Step 3c - Create a variable to store the first selected card
var currentCard;

// Step 4 - Iterate through the deck and bind a click event to each one
for(let i = 0; i < deck.length; i++){
  // Step 4a - Create a new div element to be a card
  let cardEle = document.createElement('div');
  // Step 3b - Add a 'card' class to the class list on the new div element
  cardEle.classList.add('card');

  // Step 3c - Add a data value to the card with the card's value in it
  cardEle.dataset.value = deck[i];

  // Step 3c - Bind the cardSelected function
  // to the click event on the cardEle
  cardEle.addEventListener('click', cardSelected);
  cardEle.addEventListener('mouseover', function(event){
    event.target.classList.toggle('.card:hover');
  })
  cards.appendChild(cardEle);
  cardElements.push(cardEle);
}

// Step 5 - Create a function to store the logic
// for when a card is selected
function cardSelected (event) {
  // Step 5a - Check if there is already a card selected
  if(currentCard != null){
    for(let card of cardElements){
      card.classList.toggle('unclickable');
    }

    event.target.classList.toggle('flipped');
    event.target.classList.toggle('card');
    event.target.textContent = event.target.dataset.value;
    // Step 6 - Compare the cards
    if(currentCard.dataset.value === event.target.dataset.value){
      // Remove click events from both cards because they are out of play
      // Step 6c - Add a point to the score for this player
      currentPlayer.score++;
      // Step 6d - Tell the player to go again
      // (use string interpolation to show which player you're addressing)
      message.textContent = `Congratulations! ${currentPlayer.name}, please go again!`;
      currentCard = null;

      for(let card of cardElements){
        card.classList.toggle('unclickable');
      }

      score.textContent = `Player One - ${playerOne.score} | Player Two - ${playerTwo.score}`;

      evaluateBoard();
    }else{
      // Step 6e - Provide a fail message to the player
      message.textContent = "Wrong! ";

      // Step 6f - Using a ternary, change players
      (currentPlayer === players[0]) ? currentPlayer = players[1] : currentPlayer = players[0];

      // Step 6g - Concatenate a message to the message element
      // advising player 2 that it's their turn now
      // (use string interpolation to show which player you're addressing)
      message.textContent = message.textContent + `${currentPlayer.name}, your turn!`;

      setTimeout(function(){
        event.target.classList.toggle('flipped');
        event.target.classList.toggle('card');

        currentCard.classList.toggle('flipped');
        currentCard.classList.toggle('card');

        for(let card of cardElements){
          card.classList.toggle('unclickable');
        }

        currentCard = null;
      }, 1000);
    }
  }else{
    // Step 5b - Assign the card to currentCard
    currentCard = event.target;
    currentCard.classList.toggle('flipped');
    currentCard.classList.toggle('card');

    currentCard.textContent = currentCard.dataset.value;

    // Step 5c - Tell the player to select another card
    // (use string interpolation to show which player you're addressing)
    message.textContent = `${currentPlayer.name}, please select another card`;
  }
}

   
  // Step 7 - Check if the board is full
  function evaluateBoard(){
  if(playerOne.score + playerTwo.score == 26){
    // Step 7a - Check if one of the players has won
    if(playerOne.score != playerTwo.score){
      // Step 7b - Tell the player they've won
      // (use string interpolation to show which player you're addressing)
      (playerOne.score > playerTwo.score) ? message.textContent = `${playerOne.name}, you won!!! Congratulations!` : 
      `${playerTwo.name}, you won!!! Congratulations!`;

      for(let card of cardElements){
        card.classList.toggle('unclickable');
      }
    }else{
      // Step 7c - Tell the players that the game has ended in a tie
      message.textContent = "The game was a tie! Nice try!";
    }
  }else if (playerOne.score == 14){
    message.textContent = `${playerOne.name}, you won!!! Congratulations!`;
    for(let card of cardElements){
      card.classList.toggle('unclickable');
    }
  }else if (playerTwo.score == 14){
    message.textContent = `${playerTwo.name}, you won!!! Congratulations!`;
    for(let card of cardElements){
      card.classList.toggle('unclickable');
    }
  }
}

// Take it further - Reset the board allowing the user to play again (Worth 20% of the final grade)

//Step 1 - You will need a reset button in index.html
const reset = document.querySelector('#reset');
reset.textContent = 'Reset Board';

reset.addEventListener('mouseover', function (event){
  event.target.classList.toggle('#reset:hover');
});

//Step 2 - You will need to bind an event listener
//that detects the click and executes a function
reset.addEventListener('click', function(event){

  var resetChoice = confirm("Are you sure you want to reset the game?");

  if (resetChoice == true){
    currentCard = null;
    shuffleDeck();
    currentPlayer = players[0];

    for(let card of cardElements){
      if(card.classList.contains('flipped')){
        card.classList.toggle('flipped');
        card.classList.toggle('card');
      }
      
      if(card.classList.contains('unclickable')){
        card.classList.toggle('unclickable');
      }
    }

  //Step 4 - You will need to reset the messages
    message.textContent = "Welcome! The rules are simple. Match 2 cards - get a point.";

  //Step 5 - You will need to reset the players
    playerOne.score = 0;
    playerTwo.score = 0;
    score.textContent = `Player One - ${playerOne.score} | Player Two - ${playerTwo.score}`;
  }
});