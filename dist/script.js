const lyrics = [
   { lyric: "Cause you’re a sky, cause you’re a sky full of ______.", answer: "stars", videoId: "VPRjCeoBqrI" }, // Replace with actual YouTube video ID
   { lyric: "And I will always ______ you.", answer: "love", videoId: "3JWTaaS7LdU" },
   { lyric: "Don't stop ______.", answer: "believin'", videoId: "1k8craCGpgs" },
   { lyric: "We found love in a ______ place.", answer: "hopeless", videoId: "tg00YEETFzg" },
   { lyric: "I got a feeling that tonight’s gonna be a ______ night.", answer: "good", videoId: "uSD4vsh1zDA" },
   { lyric: "Hit me baby one more ______.", answer: "time", videoId: "C-u5WLJ9Yk4" },
   { lyric: "I'm gonna take my horse to the old town ______.", answer: "road", videoId: "r7qovpFAGrQ" },
   { lyric: "Is it too late now to say ______?", answer: "sorry", videoId: "fRh_vgS2dFE" },
   { lyric: "Shake it off, shake it ______.", answer: "off", videoId: "nfWlot6h_JM" },
   { lyric: "Hello from the other ______.", answer: "side", videoId: "YQHsXMglC9A" }
];
let currentLyricIndex = 0;
let currentPlayerIndex = 0;
let players = [];
let scores = [];
let player;  // YouTube player variable
function startGame() {
   const playerCount = parseInt(document.getElementById('player-count').value);
   players = Array.from({ length: playerCount }, (_, i) => `Player ${i + 1}`);
   scores = Array(playerCount).fill(0);
   document.getElementById('player-info').style.display = 'none';
   document.getElementById('game-board').style.display = 'block';
   updateScoreboard();
   displayLyric();
   updateTurnIndicator();
}
function displayLyric() {
   document.getElementById('current-lyric').textContent = lyrics[currentLyricIndex].lyric;
   document.getElementById('player-guess').value = '';
   document.getElementById('round-result').textContent = '';
   document.getElementById('next-turn').style.display = 'none';
   // Load and play the YouTube video
   player.loadVideoById(lyrics[currentLyricIndex].videoId);
}
function updateTurnIndicator() {
   document.getElementById('turn-indicator').textContent = `${players[currentPlayerIndex]}'s turn`;
}
function checkGuess() {
   const userGuess = document.getElementById('player-guess').value.trim().toLowerCase();
   const correctAnswer = lyrics[currentLyricIndex].answer.toLowerCase();
   if (userGuess === correctAnswer) {
       scores[currentPlayerIndex]++;
       document.getElementById('round-result').textContent = "Correct!";
   } else {
       document.getElementById('round-result').textContent = `Incorrect! The correct answer was "${lyrics[currentLyricIndex].answer}".`;
   }
   updateScoreboard();
   document.getElementById('next-turn').style.display = 'inline';
}
function nextTurn() {
   currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
   if (currentPlayerIndex === 0) {
       currentLyricIndex++;
       if (currentLyricIndex >= lyrics.length) {
           endGame();
           return;
       }
   }
   displayLyric();
   updateTurnIndicator();
}
function updateScoreboard() {
   const scoreboard = document.getElementById('scoreboard');
   scoreboard.innerHTML = '';
   players.forEach((player, index) => {
       const li = document.createElement('li');
       li.textContent = `${player}: ${scores[index]} points`;
       scoreboard.appendChild(li);
   });
}
function endGame() {
   document.getElementById('current-lyric').textContent = "Game Over!";
   document.getElementById('turn-indicator').style.display = 'none';
   document.getElementById('player-guess').style.display = 'none';
   document.getElementById('submit-guess').style.display = 'none';
   document.getElementById('next-turn').style.display = 'none';
}
function onYouTubeIframeAPIReady() {
   player = new YT.Player('player', {
       height: '360',
       width: '640',
       videoId: lyrics[currentLyricIndex].videoId,
       events: {
           'onReady': startGame
       }
   });
}
// Load YouTube IFrame Player API code asynchronously.
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('submit-guess').addEventListener('click', checkGuess);
document.getElementById('next-turn').addEventListener('click', nextTurn);