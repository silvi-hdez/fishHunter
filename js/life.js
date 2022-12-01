class Life {
    constructor (ctx, x, y, width, type) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.width = width
        this.height = 0
        this.type = type
        this.isOnSea = false;
        this.isVisible = true; // is replicable

        this.img = new Image()
        this.imgSrc = {
            life1: './images/life1.png',
            life2: './images/life2.png',
        }

        this.img.src = this.imgSrc[this.type]
        this.isReady = false
        this.img.onload = () => {
            this.isReady = true
            this.height = this.width * this.img.height / this.img.width;
        }

        this.speed = -3
        this.score = {
            life1: 1,
            life2: 2,
        }
    }

    draw () {
      
        if (this.isReady) {
            this.ctx.drawImage (this.img, this.x, this.y, this.width, this.height)
        }
    }

    move () {
        this.x += this.speed

        if (this.x + this.ctx.canvas.width <= 0) {
            this.x = 0
        }
    }
}