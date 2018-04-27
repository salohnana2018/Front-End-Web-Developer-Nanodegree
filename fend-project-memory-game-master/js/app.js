/*
 * Create a list that holds all of your cards
 */
$(document).ready(function(){
//declear variable to set moves count
let movesText = $(".moves");
//declear variable to  get and set  stars rating
const stars = $(".stars > li")
//array to hold all cards
const cards = $(".card");
// deck all the cards
const deck = $(".deck");
//variable to set and get timer
const timer = $(".timer");
//array to hold all matched cards
const cardMatch = $(".match")

//Matched cards  number
let matchcards = 0;
//Count moves
let moves = 0;
//array to hold openend cards
let cardsOpened = [];





// Shuffle function from http://stackoverflow.com/a/2450976 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//show cards when clicked
function showCard(){
  $(this).toggleClass('open');
  $(this).toggleClass('show');
  $(this).toggleClass('disable');
}

//set intiat values when the game start
function initGame(){
  $(deck).empty();
 moves = 0;
 second = 0, minute = 0; hour = 0;
for(star of stars){
 $(star).css("color","#D4AF37");
}
 let sCards = shuffle(cards);
 for(suffelCard of sCards){
   $(deck).append(suffelCard);
   $(suffelCard).removeClass("show open match disabled");
 }
cardsOpened = [];

}
//increase count and set rating based on moves
function movesCount(){
  moves += 1;
  $(movesText).text(moves);
  if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // rating  based on moves
    //the rating decrease as moves increase
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                $(stars[i]).css("color","black");
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
              $(stars[i]).css("color","black");

            }
        }
    }

}
let second = 0, minute = 0; hour = 0;

let timeInterval;
//set timer
function startTimer(){
    timeInterval = setInterval(function(){
        $(timer).text(minute+"mins "+second+"secs");
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
//check matching for opened cards
function cOpened() {


    cardsOpened.push(this);

    if(cardsOpened.length === 2){
        movesCount();

        if($(cardsOpened[0]).attr("cardType") === $(cardsOpened[1]).attr("cardType")){
          match();
          matchcards += 2;


        } else {
          unmatch();

        }
    }
}
// keep matched card opened and disable clicks on it
function match(){
$(cardsOpened[0]).removeClass("show open");
$(cardsOpened[0]).addClass("match disable");
$(cardsOpened[1]).removeClass("show open");
$(cardsOpened[1]).addClass("match disable");
cardsOpened = [];
}

// filp unmatch cards back
function unmatch(){

  $(cardsOpened[0]).addClass("unmatch");

  $(cardsOpened[1]).addClass("unmatch");
  disableAllOtherCards();
   setTimeout(function(){
    $(cardsOpened[0]).removeClass("show open unmatch disable");
    $(cardsOpened[1]).removeClass("show open unmatch disable");
    enableAllOtherCards();
     cardsOpened = [];
  },1050);

  }
//disable clicks on cards
function disableAllOtherCards(){
  for (card of cards){
    $(card).addClass("disable");
  }
}
//enable clicks on cards
function enableAllOtherCards(){
  for (card of cards){
    $(card).removeClass("disable");

  }
}
//show Congratulations message
function winGame(){
  if(matchcards === 16){
      clearInterval(timeInterval);
   const targeted_popup_class = "popup-1";
   $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
    //
    // declare star rating variable
        const starRating = $(".stars").html();
        let finalTime = timer.html();
        //showing move, rating and  time
        $("#fmoves").html(moves) ;
        $("#totalRating").html(starRating);
        $("#totalTime").html(finalTime);


   // close Congratulations message
   $('[data-pop-close]').on('click', function(e)  {
   var targeted_popup_class = jQuery(this).attr('data-pop-close');
   $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
   e.preventDefault();
   location.reload();
 });

}}
//restart the game
$(".restart").click(function(){
location.reload();
});
//intiat Game on page load
window.onload = initGame();
//attach click listner to cards
for(card of cards) {
  $(card).click(showCard);
  $(card).click(cOpened);
  $(card).click(winGame);
}
});
