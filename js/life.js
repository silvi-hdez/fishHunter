class Life {
    constructor (ctx, x, y, width) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.width = width
        this.height = 0
       
        // this.isOnSea = false;
        // this.isVisible = true; // is replicable

        this.img = new Image()
        this.imgSrc = [
            './images/life1.png',
            './images/life2.png'
        ]

        //  this.imgSrc = [
        //     {image: './images/life1.png',
        //     score: 1,
        //  },
        //     {image:  './images/life2.png',
        //     score: 2,
        // }
        // ]

        this.img.src = this.imgSrc[Math.floor(Math.random() * this.imgSrc.length)]
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