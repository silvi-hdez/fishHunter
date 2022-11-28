const game = new Game('canvas-game')

window.onload = function () {
    game.start ()
}

document.addEventListener ('keyup', function (event) {
    game.onKeyUp(event)
})