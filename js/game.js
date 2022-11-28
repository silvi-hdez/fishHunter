class Game {
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext ('2d')

        this.bg = new Background (this.ctx)
        this.player = new Player (this.ctx, 300, 200)
    }

    start () {
        this.intervalId = setInterval (() => {
            this.draw()
            this.move ()

        }, 1000/60)
    }
    
    draw () {
        
        this.bg.draw ()
        this.player.draw ()
    }

    move () {
        this.bg.move ()
        this.player.move ()
    }

    onKeyUp (event) {
        this.player.onKeyUp (event)
    }


}