//variable declaration
var gamePattern = [];
var userClickedPattern = [];
var randomColors = ["green", "red", "yellow", "blue"];
var started = false;
var level = 0;
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePressed(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

//function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//function for animation on button
function animatePressed(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//function to check answer
function checkAnswer(current_level) {
  if (userClickedPattern[current_level] === gamePattern[current_level]) {
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
    console.log("success");
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 2000);
    $("#level-title").text("Game Over ! Press Any Key to Restart")
    startOver();
  }
}

//function for next sequence

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level" + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = randomColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  animatePressed(randomChosenColor);
  playSound(randomChosenColor);
}

//function to restart the game
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
