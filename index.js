
// 1. A player loses his/her entire score when they roll 6 in a row.




// After that, it's the next players turn (hint: Always save the previous dice roll in a seperate variable)
//
// 2. Add an input field to the HTML where players can set the winning score, so that
// they can change the predifined score of 100. (Hint: you can read that value with the .value property in Javascript.
// Use google to figure it out)
//
// 3. Add another dice to the game, so that there are two dices now. the player looses score when one of them
// is a 1. (hint: you need CSS to pisition the second dice, take a look at the css code for the first one)
//









var scores,roundscore, activePlayer, gamePlaying;

var lastDice;

init();


document.querySelector(".btn-roll").addEventListener("click", function(){

if (gamePlaying){
  //1. random number
  var dice=Math.floor(Math.random() * 6) + 1;

  //2. display the result- change the dice image
  var diceDOM=document.querySelector(".dice");
  diceDOM.style.display="block";
  diceDOM.src= "dice-" + dice + ".png";

  //3. update the roundscore If the rolled number is NOT 1
if (dice === 6 && lastDice ===6){
  //player loses score
  scores[activePlayer]=0;
  document.querySelector("#score-" + activePlayer).textContent= "0";
nextPlayer();
} else if (dice !==1){
  //add scores & display then in UI
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent= roundScore;
  } else{
    //Next player
    nextPlayer();
  }
lastDice = dice;

}

});


document.querySelector(".btn-hold").addEventListener("click", function(){

if (gamePlaying){

  //Add current score to global scores
  scores[activePlayer] += roundScore;

  //update the UI
  document.querySelector("#score-" + activePlayer).textContent =scores[activePlayer];

//users can change the winning score
var input =document.querySelector(".final-score").value;

var winningScore;

//we need to check if there is an input value
//Undefined, 0, "" or null are coerced to false
//anything else is coerced to true
if (input){
winningScore= input;
} else{
  winningScore=100;
}

  //check if player won the game
  if (scores[activePlayer] >=winningScore){
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    //hide the dice
  document.querySelector(".dice").style.display="none";

  //change the background of the active players
  document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
  document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
  gamePlaying= false;

  }else{
    //Next player
  nextPlayer();
  }
}

});



function nextPlayer(){
  //Next player
  activePlayer===0? activePlayer=1 : activePlayer=0;
  roundScore=0;

  document.getElementById("current-0").textContent="0";
  document.getElementById("current-1").textContent="0";

  //update the background when player players
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //disappear the dice when it's 1
  document.querySelector(".dice").style.display="none";
}

document.querySelector(".btn-new").addEventListener("click", init);


function init(){
gamePlaying= true;
  scores=[0 ,0];
  activePlayer=0;
  roundScore=0;

  document.querySelector(".dice").style.display="none";

  //change the display scores to 0
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent ="0";
  document.getElementById("current-0").textContent= "0";
  document.getElementById("current-1").textContent = "0";

// go back to the initial player 1- player 2
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  //remove winner class from both players

document.querySelector(".player-0-panel").classList.remove("winner");
document.querySelector(".player-1-panel").classList.remove("winner");

//remove the active class
document.querySelector(".player-0-panel").classList.remove("active");
document.querySelector(".player-1-panel").classList.remove("active");

//set the 1st player to the active player
document.querySelector(".player-0-panel").classList.add("active");

}
