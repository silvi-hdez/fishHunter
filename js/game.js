class Game {
    constructor(canvasId){
     
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext ('2d')

        this.bg = new Background (this.ctx)
        this.player = new Player (this.ctx, 200, 70)
        this.enemies = []

        this.lives = [
            new Life (this.ctx, 400, 30, 50, 'life1'),
            new Life (this.ctx, 600, 100, 50, 'life2'),
            new Life (this.ctx, 800, 300, 30, 'life2'),
            new Life (this.ctx, 900, 100, 50, 'life1'),
            new Life (this.ctx, 1100, 100, 20, 'life1'),
            new Life (this.ctx, 1250, 350, 50, 'life2'),
            new Life (this.ctx, 1400, 100, 50, 'life2'),
        ]

        this.score = 0
        this.tick = 0
    }

    start () {
        this.intervalId = setInterval (() => {
            this.clear ()
            this.draw()
            this.move ()
            this.checkCollisions();
           // this.replyLevel()
            this.tick++;
            if(this.tick % 90 === 0) {
                this.addEnemy();
                this.tick = 0;
            }
        }, 1000/60)
    }
    
    draw () {
      
        this.bg.draw ()
        this.player.draw ()
        this.enemies.forEach(enemy => enemy.draw())
        this.lives.forEach(life => life.draw())
        this.drawScore ()
        
    }

    move () {
        this.bg.move ()
        this.player.move ()
        this.enemies.forEach(enemy => enemy.move())
        this.lives.forEach(life => life.move())
    }

    onKeyUp (event) {
        this.player.onKeyUp (event)
    }

    checkCollisions() {
		if (this.enemies.some(enemy => 
            this.player.isColliding(enemy))) {
			this.gameOver();
		}

        const lifeCollision = this.lives.find(life => this.player.isColliding(life));
		if (lifeCollision) {
           
			this.lives.splice(this.lives.indexOf(lifeCollision), 1)
                this.score++
                if (lifeCollision.type === 'life1') {
                    this.score += lifeCollision.score.life1
                } 
                else if (lifeCollision.type === 'life2') {
                    this.score += lifeCollision.score.life2
                } 
	        }
        }

    


    gameOver () {
        clearInterval (this.intervalId)
        
    }

    drawScore () {

        this.ctx.fillStyle = 'red'
        this.ctx.font = '24px Arial'
        this.ctx.fillText ('Score: ' + this.score, 10, 30)
    }

    // replyLevel () {
      
    //     this.enemies.forEach(enemy => {
    //         if (enemy.isOnSea &&  enemy.isVisible) {
    //             enemy.isVisible = false
    //             this.enemies.push(new Enemy (this.ctx, enemy.x + 3500, enemy.y, enemy.width, enemy.type))
    //         }
    //     })

    //     this.lives.forEach(life => {
    //         if (life.isOnSea &&  life.isVisible) {
    //             life.isVisible = false
    //             this.lives.push(new Life (this.ctx, life.x + 2000, life.y, life.width, life.type))
    //         }
    //     })
    // }

    addEnemy() {
        console.log (this.enemies)
        const randomWidth = Math.random() * 100 + 50
        const randomY = Math.random() * (this.canvas.height)
        this.enemies.push(new Enemy (this.ctx, this.ctx.canvas.width, randomY, randomWidth));
    }

    clear () {
        this.ctx.clearRect (0, 0, this.canvas.width, this.canvas.height)
        this.enemies = this.enemies.filter(enemy => enemy.y < this.canvas.height);
    }
}