class Enemy {
    constructor (ctx, x, y, width) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.width = width
        this.height = 0;
        this.isOnSea = false;
        this.isVisible = true; // is replicable


        this.img = new Image ()
        this.imgSrc = [
            './images/tunafish_enemy.png',
            './images/goldFish_enemy.png',
            './images/scaryFish_enemy.png',
            './images/shark_enemy.png'
        ]

        this.img.src = this.imgSrc[Math.floor(Math.random() * this.imgSrc.length)]
        this.isReady = false
        this.img.onload = () => {
            this.isReady = true
            this.height = this.width * this.img.height / this.img.width;
        }

      
        this.speed = -3
    }

    draw () {
        // if (this.x < this.ctx.canvas.width / 2 &&  !this.isOnSea &&  this.isVisible) {
        //     this.isOnSea = true
        // }
        if (this.isReady) {
            this.ctx.drawImage (this.img, this.x, this.y, this.width, this.height)
        }
    }

    move () {
        if (this.isReady) {
            this.x += this.speed
        }
    }
}