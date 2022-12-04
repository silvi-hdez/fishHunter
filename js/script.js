const game = new Game('canvas-game')
const startBtn = document.getElementById('start-btn')
const imgTittle = document.getElementById ('main-tittle')
const gameOver = document.getElementById ('game-over')
const restartBtn = document.getElementById('restart')

startBtn.addEventListener('click', () => {
	game.start();
	imgTittle.remove()
	startBtn.remove()
	restartBtn.classList.remove("hidden")
	
});


document.addEventListener('keydown', function(event) {
	game.onKeyDown(event);
});

document.addEventListener('keyup', function(event) {
	game.onKeyUp(event);
});

restartBtn.onclick = function() {
	window.location.reload()
}

