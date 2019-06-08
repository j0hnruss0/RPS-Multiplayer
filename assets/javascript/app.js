// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDPZpdY5uCrUUHi2sHUPqiaV9_VP5_hnpo",
    authDomain: "rock-paper-scissors-a2363.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-a2363.firebaseio.com",
    projectId: "rock-paper-scissors-a2363",
    storageBucket: "rock-paper-scissors-a2363.appspot.com",
    messagingSenderId: "47197396459",
    appId: "1:47197396459:web:665d7ae4e6120d76"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var playerId;
var firstMove;
var lastMove;

$("#play-area").hide();
$("#score-board").hide();

$("#game-starter").on("click", function(event) {
    event.preventDefault();
    playerId = $("#sign-in").val();
    if (playerId === "") {
            playerId = "nobody";
    }
    firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        
      });
    
    firebase.auth().onAuthStateChanged(function(player) {
        if (player) {
            // User is signed in.
            console.log("Time to play, " + playerId);
            var isAnonymous = player.isAnonymous;
            var uid = player.uid;
            database.ref("player/" + playerId).set({
                uid: uid,
                isAnonymous: isAnonymous
                
            })
        
        } else {
            console.log("Welcome to the game, " + playerId);   
            
        }
        
    });

    startGame();
    
});

function startGame() {
    $("#play-area").show();
    $("#score-board").show();
    $("#start-page").hide();
    $("body").addClass("game-body");
};

$(document).on("click", ".img-div", function(event) {
    event.preventDefault();
    if ($(this).is("#pick-rock")) {
        console.log(playerId +" picks rock");
        database.ref("move").push(playerId + " picks rock");
        
    } 
    else if ($(this).is("#pick-paper")) {
        console.log(playerId +" picks paper");
        database.ref("move").push(playerId + " picks paper");
        
    } 
    else if ($(this).is("#pick-scissors")) {
        console.log(playerId +" picks scissors");
        database.ref("move").push(playerId + " picks scissors");
        
    }
    
})

database.ref("move").limitToLast(2).on("child_added", function(snapshot) {
    var moved = [snapshot.val()];
    moved.forEach(function() {
        $("#message-box").prepend("<div class='well'><span>" + moved + "</span></div>");
        
    });

    gameOver();
    
    
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

function gameOver(firstMove, lastMove) {
    firstMove = document.getElementsByClassName("well")[1].innerText;
    lastMove = document.getElementsByClassName("well")[0].innerText;
    if (firstMove.includes("rock") && lastMove.includes("scissors")) {
        if (firstMove.includes(playerId)) {
            console.log("Rock breaks Scissors, You Win!");
            $(".game-results").html("Rock breaks Scissors, You Win!");
        } else if (lastMove.includes(playerId)) {
            console.log("Rock breaks Scissors, You Lose...");
            $(".game-results").html("Rock breaks Scissors, You Lose...");
        } 
    } else if (firstMove.includes("scissors") && lastMove.includes("paper")) {
        if (firstMove.includes(playerId)) {
            console.log("Scissors cuts Paper, You Win!");
            $(".game-results").html("Scissors cuts Paper, You Win!");
        } else if (lastMove.includes(playerId)) {
            console.log("Scissors cuts Paper, You Lose...");
            $(".game-results").html("Scissors cuts Paper, You Lose...");
        } 
    } else if (firstMove.includes("paper") && lastMove.includes("rock")) {
        if (firstMove.includes(playerId)) {
            console.log("Paper covers Rock, You Win!");
            $(".game-results").html("Paper covers Rock, You Win!");
        } else if (lastMove.includes(playerId)) {
            console.log("Paper covers Rock, You Lose...");
            $(".game-results").html("Paper covers Rock, You Lose...");
        } 
    } else if (firstMove.includes("scissors") && lastMove.includes("rock")) {
        if (lastMove.includes(playerId)) {
            console.log("Rock breaks Scissors, You Win!");
            $(".game-results").html("Rock breaks Scissors, You Win!");
        } else if (firstMove.includes(playerId)) {
            console.log("Rock breaks Scissors, You Lose...");
            $(".game-results").html("Rock breaks Scissors, You Lose...");
        } 
    } else if (firstMove.includes("rock") && lastMove.includes("paper")) {
        if (lastMove.includes(playerId)) {
            console.log("Paper covers Rock, You Win!");
            $(".game-results").html("Paper covers Rock, You Win!");
        } else if (firstMove.includes(playerId)) {
            console.log("Paper covers Rock, You Lose...");
            $(".game-results").html("Paper covers Rock, You Lose...");
        } 
    } else if (firstMove.includes("paper") && lastMove.includes("scissors")) {
        if (lastMove.includes(playerId)) {
            console.log("Scissors cuts Paper, You Win!");
            $(".game-results").html("Scissors cuts Paper, You Win!");
        } else if (firstMove.includes(playerId)) {
            console.log("Scissors cuts Paper, You Lose...");
            $(".game-results").html("Scissors cuts Paper, You Lose...");
        } 
    } else if ((firstMove.includes("paper") && lastMove.includes("paper")) || (firstMove.includes("scissors") && lastMove.includes("scissors")) || (firstMove.includes("rock") && lastMove.includes("rock"))) {
        console.log("Looks like a tie");
        $(".game-results").html("Looks like a tie");
    }
}

function findData() {
    database.ref("move").limitToLast(2).on("child_added", function(snapshot) {
        var firstMove = document.getElementsByClassName("well")[1].innerText;
        var lastMove = document.getElementsByClassName("well")[0].innerText;
        var moved = [snapshot.val()];
        console.log(moved);
        if (firstMove.includes("rock") && lastMove.includes("scissors")) {
            if (firstMove.includes(playerId)) {
                console.log("Rock beats Scissors, You Win!");
            } else if (lastMove.includes(playerId)) {
                console.log("Rock beats Scissors, You Lose...");
            } 
        }
    })
};
