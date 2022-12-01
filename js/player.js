class Player {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.width = 70
        this.height = 40

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

       
        this.gravity = 0.1
    
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

        // this.speedY = this.gravity
        // this.y = this.speedY

        if (this.y > this.ctx.canvas.height - this.height) {
            this.y = this.ctx.canvas.height - this.height
        }

        if (this.y < 0) {
            this.y = 0
        }
        
    }

    onKeyUp (event) {
        
        if (event.keyCode === 38 || event.keyCode === 32) {
            this.isSwimming = true
            this.speedY = -3
        }
    }

    onKeyDown (event) {
        
        if (event.keyCode === 40) {
            this.isSwimming = true
            this.speedY = 6
        }
    }

    isColliding(obj) {
       
		return this.x < obj.x + obj.width
		 && this.x + this.width > obj.x
		 && this.y < obj.y + obj.height
		 && this.y + this.height > obj.y;
	}


}
