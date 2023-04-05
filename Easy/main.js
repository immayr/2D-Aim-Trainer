var gameBox = document.getElementById("game-box");
var startBtn = document.getElementById("start-btn");
var endBtn = document.getElementById("end-btn");
var scoreElement = document.getElementById("score");
var timerElement = document.getElementById("timer");
var score = 0;
var timeLeft = 30;
var intervalId;
var gameOver = false;

function startGame() {
	score = 0;
	timeLeft = 30;
	gameOver = false;
	updateScore();
	updateTimer();
	gameBox.innerHTML = "";
	intervalId = setInterval(createCircle, 1000);
	setInterval(updateTimer, 1000);
	startBtn.disabled = true;
	endBtn.disabled = false;
}

function endGame() {
	clearInterval(intervalId);
	gameOver = true;
	startBtn.disabled = false;
	endBtn.disabled = true;
	startBtn.innerHTML = "Play Again";
}

function createCircle() {
	var circle = document.createElement("div");
	circle.className = "circle";
	circle.style.top = Math.floor(Math.random() * 601) + "px";
	circle.style.left = Math.floor(Math.random() * 601) + "px";
	gameBox.appendChild(circle);

	circle.addEventListener("click", function() {
		gameBox.removeChild(circle);
		score++;
		updateScore();
	});

	setTimeout(function() {
		gameBox.removeChild(circle);
	}, 1000);
}

function updateScore() {
	scoreElement.innerHTML = "Score: " + score;
}

function updateTimer() {
	if (gameOver) return;
	timerElement.innerHTML = "Time left: " + timeLeft;
	timeLeft--;
	if (timeLeft < 0) {
		endGame();
		alert("Game Over. Your score is " + score + ".");
	}
}

startBtn.addEventListener("click", startGame);

endBtn.addEventListener("click", function() {
	if (!gameOver) {
		endGame();
		alert("Game Over. Your score is " + score + ".");
	}
});
