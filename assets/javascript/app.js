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
var playerCounter = 0;
var playerId;

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
                move: "none",
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
        database.ref("player/" + playerId).update({
            move: "rock"
        });
        playerCounter +=1;
    } 
    else if ($(this).is("#pick-paper")) {
        console.log(playerId +" picks paper");
        database.ref("player/" + playerId).update({
            move: "paper"
        });
        playerCounter +=1;
    } 
    else if ($(this).is("#pick-scissors")) {
        console.log(playerId +" picks scissors");
        database.ref("player/" + playerId).update({
            move: "scissors"
        });
        playerCounter +=1;
    }
    playerMoves();
})

function findData() {
    database.ref("player").child(playerId).on("value", function(snapshot) {
        var moved = snapshot.val().uid;
        console.log(moved);
    })
}

function playerMoves() {
    database.ref("player/" + playerId).on("value", function(snapshot) {
        if (playerCounter === 1) {
            var firstMove = snapshot.val().move;
            $("#message-box").append("<p>" + playerId + " picks " + firstMove + "</p>");
        } else if (playerCounter === 2) {
            var secondMove = snapshot.val().move;
            $("#message-box").append("<p>" + playerId + " responds with " + secondMove + "</p>");
            gameOver(firstMove, secondMove);
        }
    });

};

function gameOver(firstMove, secondMove) {
    console.log("game over");
    playerCounter = 0;
    if ((firstMove === "paper" && secondMove === "rock") || (firstMove === "rock" && secondMove === "scissors") || (firstMove === "scissors" && secondMove === "paper")) {
        $("#message-box").append("Player One wins!");
    } else if ((firstMove === "rock" && secondMove === "paper") || (firstMove === "scissors" && secondMove === "rock") || (firstMove === "paper" && secondMove === "scissors")) {
        $("#message-box").append("Player Two wins!");
    } else if ((firstMove === "rock" && secondMove === "rock") || (firstMove === "scissors" && secondMove === "scissors") || (firstMove === "paper" && secondMove === "paper")) {
        $("#message-box").append("Draw!");
    }
}