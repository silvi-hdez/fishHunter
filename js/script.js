const game = new Game('canvas-game')
const startBtn = document.getElementById('start-btn')

// window.onload = function () {
//     game.start ()
// }

startBtn.addEventListener('click', () => {
	game.start();
});


document.addEventListener('keydown', function(event) {
	game.onKeyDown(event);
});

document.addEventListener('keyup', function(event) {
	game.onKeyUp(event);
});