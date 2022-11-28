class Player {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.width = 100
        this.height = 60

        this.horizontalFrames = 3
        this.verticalFrames = 1
        this.xFrame = 0
        this.yFrame = 0

        this.img = new Image ()
        this.img.src = './images/YellowFish.png'
        this.isReady = false
        this.img.onload = () => {
            this.isReady = true
        }

       
        this.gravity = 0.05
    
        this.speedY = 0


        this.isSwimming = false
    }

    draw () {
 
        if (this.isReady) {
            this.ctx.drawImage (this.img, 
                this.img.width/this.horizontalFrames * this.xFrame,
                this.img.height/this.verticalFrames * this.yFrame,
                this.img.width/this.horizontalFrames,
                this.img.height/this.verticalFrames,
                this.x, 
                this.y, 
                this.width, 
                this.height)
            
        }
    }

    move () {
        this.speedY += this.gravity
        this.y += this.speedY

        if (this.y > this.ctx.canvas.height - this.height) {
            this.y = this.ctx.canvas.height - this.height
        }

        if (this.y < 0) {
            this.y = 0
        }
        
    }

    onKeyUp (event) {
        console.log ('hi')
        if (event.keyCode === 38) {
            this.isSwimming = true
            this.speedY = -3
        }
    }

}
