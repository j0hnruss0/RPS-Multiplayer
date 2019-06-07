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

$("#play-area").hide();

$("#game-starter").on("click", function(event) {
    event.preventDefault();
    var playerId = $("#sign-in").val();
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
    $("#start-page").hide();
};

function checkData() {
    var ref = database.ref("player/johnny");
    ref.once("value").then(function (snapshot) {
        console.log(snapshot.child("player").val());
    })
};