var gamePattern = [];
var userClickedPattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function (){
         $("#" + currentColor).removeClass("pressed");
     }, 100);
}

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    var selectedButton = $("#" + randomChosenColor);
    selectedButton.fadeOut(50).fadeIn(50);
    playSound(randomChosenColor);
    console.log(level);
    $("h1#level-title").text("Level " + level);
    level ++ ;
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (gamePattern.length === userClickedPattern.length){
            setTimeout( function () {
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1#level-title").text("Game Over, Press Any key to Restart");
        startOver();
    }
}

function startOver(){
    started = false;
    gamePattern = [];
    level = 0;
}

$(document).keydown(function (event){
    if (!started){
        nextSequence();
        $("h1#level-title").text("Level " + level);
        started = true;
    }
});

$(".btn").on("click", function (event){
    var userChosenColor = $(event.target).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    var userLevel = userClickedPattern.length - 1;
    checkAnswer(userLevel);
});