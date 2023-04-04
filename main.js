var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var timerId;

function startGame(mode) {
	// Hide menu and show canvas
	var menu = document.getElementById("menu");
	menu.style.display = "none";
	canvas.style.display = "block";

	// Set game constants based on mode
	var targetSize, targetSpeed;
	switch(mode) {
		case "easy":
			targetSize = 50;
			targetSpeed = 5;
			break;
		case "medium":
			targetSize = 40;
			targetSpeed = 7;
			break;
		case "hard":
			targetSize = 30;
			targetSpeed = 9;
			break;
		case "expert":
			targetSize = 20;
			targetSpeed = 12;
			break;
		case "insane":
			targetSize = 10;
			targetSpeed = 15;
			break;
	}

	// Initialize game
	var score = 0;
	var targets = [];

	// Spawn new targets every 1000ms
	timerId = setInterval(function() {
		var x = Math.floor(Math.random() * (canvas.width - targetSize));
		var y = Math.floor(Math.random() * (canvas.height - targetSize));
		targets.push({
			x: x,
			y: y,
			size: targetSize,
			speed: targetSpeed
		});
	}, 1000);

	// Update and render game every 16ms (60fps)
	setInterval(function()
