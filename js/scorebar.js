class ScoreBar {
    constructor (ctx) {
        this.ctx = ctx
        this.x = 30
        this.y = 30

        this.imgFishplayer = new Image ()
        this.imgFishplayer.src ='./images/icons/goldfish_icon.png'
        this.isReady = false
        this.imgFishplayer.onload = () => {
            this.isReady = true
        }

        this.imgScore = new Image ()
        this.imgScore.src = './images/icons/life.png'
        this.isReady = false
        this.imgScore.onload = () => {
            this.isReady = true
        }
    }

    isReady() {
        return this.imgFishplayer.isReady && this.imgScore.isReady
    }

    draw(level, score) {
        if (this.isReady()) {
            // Current level

            this.ctx.drawImage(
                this.imgFishplayer,
                Math.floor(this.x),
                Math.floor(this.y),
                this.width,
                this.height
            )
            this.ctx.save()
                this.ctx.font = '30px Arial'
                this.ctx.fillStyle = 'white'
                this.ctx.strokeStyle = '#000'
                this.ctx.lineWidth = 4;
                this.ctx.textAlign = 'left'
                this.ctx.strokeText(`Level: ${level}/11`, this.x + 475, 60);
                this.ctx.fillText(`Level: ${level}/11`, this.x + 475, 60)
            this.ctx.restore()
           
            // Print score
            this.ctx.drawImage(
                this.imgScore,
                this.x + 360,
                this.y,
                this.width,
                this.height
            )
            
            this.ctx.save()
                this.ctx.font = '30px Arial'
                this.ctx.fillStyle = 'white'
                this.ctx.strokeStyle = '#000'
                this.ctx.lineWidth = 4;
                this.ctx.textAlign = 'left'
                this.ctx.strokeText(score, this.x + 420, 60);
                this.ctx.fillText(score, this.x + 420, 60)
            this.ctx.restore()

            
        }
    }
}


