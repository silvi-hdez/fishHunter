class Background {
    constructor(ctx, src, speed) {
        this.ctx = ctx
        this.x = 0
        this.y = 0
        this.width = this.ctx.canvas.width
        this.height = this.ctx.canvas.height
        this.src = src
        this.speed = speed

        this.image = new Image()
        this.image.src = this.src
        this.isReady = false
        this.image.onload = () => {
        this.isReady = true
        }

    }

    draw () {
        if (this.isReady) {
            this.ctx.drawImage (this.image, this.x - this.ctx.canvas.width, this.y, this.width, this.height)
            this.ctx.drawImage (this.image, this.x, this.y, this.width, this.height)
            this.ctx.drawImage (this.image, this.x + this.ctx.canvas.width, this.y, this.width, this.height)
        }
    }

    move () {
        this.x += this.speed

        if (this.x + this.ctx.canvas.width <= 0) {
            this.x = 0
        }
    }

}
