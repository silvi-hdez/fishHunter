class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.bg = new Background(this.ctx);
    this.player = new Player(this.ctx, 300, 200, 80);
    this.enemies = [];

    this.lives = [];

    this.score = 0;
    this.scoreLimit = 3;
    this.tick = 0;
    this.level = 0;

    this.scorebar = new ScoreBar(this.ctx)
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear();
      this.draw();
      this.move();
      this.checkCollisions();

      this.tick++;
      if (this.tick % 90 === 0) {
        this.addEnemy();
        this.addLife();
        this.tick = 0;
      }
    }, 1000 / 60);
  }

  draw() {
    this.bg.draw();
    this.player.draw();
    this.enemies.forEach((enemy) => enemy.draw());
    this.lives.forEach((life) => life.draw());
    this.scorebar.draw(this.player.level, this.score);
  }

  move() {
    this.bg.move();
    this.player.move();
    this.enemies.forEach((enemy) => enemy.move());
    this.lives.forEach((life) => life.move());
  }

  onKeyDown(e) {
    this.player.onKeyDown(e);
  }

  onKeyUp(e) {
    this.player.onKeyUp(e);
  }

  checkCollisions() {
    const collidingEnemy = this.enemies.find((enemy) =>
      this.player.isColliding(enemy)
    );
    if (collidingEnemy) {
      if (collidingEnemy.level > this.player.level) {
        this.gameOver();
      } else if (collidingEnemy.level < this.player.level) {
        this.enemies.splice(this.enemies.indexOf(collidingEnemy), 1);
        this.levelUp(collidingEnemy);
      }
    }

    const lifeCollision = this.lives.find((life) =>
      this.player.isColliding(life)
    );

    if (lifeCollision) {
      this.lives.splice(this.lives.indexOf(lifeCollision), 1);
      this.levelUp(lifeCollision);
    }
  }

  gameOver() {
    clearInterval(this.intervalId);

    this.ctx.save();
    document.getElementById("game-over").style.display = "flex";
    this.isGameOver = true;
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    document.getElementById("skip-btn").style.display = "none";
  }

  addEnemy() {
    //const randomWidth = Math.random() * (120 - 80) + 80;
    const randomY = Math.random() * (this.canvas.height - 80);
    const randomType = Math.floor(Math.random() * 5);

    const randomX =
      Math.random() * (1200 - this.canvas.width) + this.canvas.width;

    this.enemies.push(
      new Enemy(this.ctx, randomX, randomY, 80, randomType)
    );
  }

  addLife() {
  //  const randomWidth = Math.random() * (50 - 30) + 30;
    const randomY = Math.random() * (this.canvas.height-50)
    const randomType = Math.floor(Math.random() * 6);
    const randomX =
      Math.random() * (1200 - this.canvas.width) + this.canvas.width;
  
      this.lives.push(
      new Life(this.ctx, randomX, randomY, 50, randomType)
    );
  }


  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.enemies = this.enemies.filter((enemy) => enemy.x + enemy.width > 0);
    this.lives = this.lives.filter((life) => life.x + life.width > 0);
  }


  levelUp(fish) {
    this.score += fish.score;
    if (this.score >= this.scoreLimit) {
      this.scoreLimit = this.scoreLimit * 2;
      this.player.level += 1;
      

      // if (this.player.level = 0) {
      //   this.player.img.src = "./images/L00_PLYR_goldfish.png";
  
      // } else if (fish.level > 0) {
      // this.player.img.src = fish.playerImageSrc;

      // } 
      }

      const newPlayer = this.enemies.filter((enemy) => {
        return enemy.level = this.player.level
        })

      //  this.player.img.src = newPlayer.drawPlayer()

       // this.enemies.drawPlayer(this.player)
    }

    
  
  
   
  //   //this.enemies.forEach((enemy) => enemy.draw());


  //   // Pensar que en cada nivel, puedes cambiar
  //   //de tamaño al 33% del nivel. cuando estás al 66%
  //   //puedes comerte peces de tu mismo nivel

  //  //level 0
  //  //if (this.score <= 3) {
  //   //add life level 0 Hacer que también caigan de arriba
  //   // en el 66% add lifes as you (player level 0)
  //   // player level 0
  //   //add enemies level 1
  //   // en el 33% add enemies level 2
  //   // en el 66% add enemies level 3

  

  //   //level 1
  //   if (this.score > 3) {
  //   //add life level 0
  //   // en el 33% add lives level 0
  //   //en el 66% add lives player level 1
  //   // player level 1
  //   //add enemies level 2
  //   // en el 33% add enemies level 3
  //   // en el 66% add enemies level 4
  //   }

  //   //level 2
  //   if (this.score > 7) {
  //   //add life level 0
  //   // en el 33% add lives player level 0
  //   // en el 66% add lives player level 1
  //   // player level 2
  //   //add enemies level 3
  //   // en el 33% add enemies level 4
  //   // en el 66% add enemies level 5
  //   }

  //   //level 3
  //   if (this.score > 12) {
  //    //add life player level 0
  //   // en el 33% add lives player level 1
  //   // en el 66% add lives player level 2
  //   // player level 3
  //   //add enemies level 4
  //   // en el 33% add enemies level 5
  //   // en el 66% add enemies level 6
  //   }

  //   //level 4
  //   if (this.score > 17) {
  //   //add life player level 1
  //   // en el 33% add lives player level 2
  //   // en el 66% add lives player level 3
  //   // player level 4
  //   //add enemies level 5
  //   // en el 33% add enemies level 6
  //   // en el 66% add enemies level 7
  //   }

  //   //level 5
  //   if (this.score > 22) {
  //   //add life player level 2
  //   // en el 33% add lives player level 3
  //   // en el 66% add lives player level 4
  //   // player level 5
  //   //add enemies level 6
  //   // en el 33% add enemies level 7
  //   // en el 66% add enemies level 8
  //   }

  //   //level 6
  //   if (this.score > 30) {
  //  //add life player level 3
  //   // en el 33% add lives player level 4
  //   // en el 66% add lives player level 5
  //   // player level 6
  //   //add enemies level 7
  //   // en el 33% add enemies level 8
  //   // en el 66% add enemies level 9
  //   }

  //   //level 7
  //   if (this.score > 38) {
  //      //add life player level 4
  //   // en el 33% add lives player level 5
  //   // en el 66% add lives player level 6
  //   // player level 7
  //   //add enemies level 8
  //   // en el 33% add enemies level 9
  //   // en el 66% add enemies level 10
  //   }

  //   //level 8
  //   if (this.score > 45) {
  //  //add life player level 5
  //   // en el 33% add lives player level 6
  //   // en el 66% add lives player level 7
  //   // player level 8
  //   //add enemies level 9
  //   // en el 33% add enemies level 10
  //   // en el 66% add enemies level 11
  //   }

  //   //level 9
  //   if (this.score > 52) {
  //    //add life player level 6
  //   // en el 33% add lives player level 7
  //   // en el 66% add lives player level 8
  //   // player level 9
  //   //add enemies level 10
  //   // en el 66% add enemies level 11
  //   }

  //   //level 10
  //    //add life player level 7
  //   // en el 33% add lives player level 8
  //   // en el 66% add lives player level 9
  //   // player level 10
  //   //add enemies level 11
   
    

  

  drawScore() {
    this.ctx.fillStyle = "red";
    this.ctx.font = "24px Arial";
    this.ctx.fillText("Level: " + this.player.level, 400, 30);
    this.ctx.fillText("Score: " + this.score, 500, 30);
    
  }
}
