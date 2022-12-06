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
    //scorebar aún no funciona
   // this.scorebar = new ScoreBar(this.ctx);
  }

  //--Añadir enemigos y vidas----

  addEnemy() {
    const randomY = Math.random() * (this.canvas.height - 80);
    const randomType = Math.floor(Math.random() * 5);

    const randomX =
      Math.random() * (1200 - this.canvas.width) + this.canvas.width;

    this.enemies.push(new Enemy(this.ctx, randomX, randomY, 80, randomType));
  }

  addLife() {
    const randomY = Math.random() * (this.canvas.height - 50);
    const randomType = Math.floor(Math.random() * 6);
    const randomX =
      Math.random() * (1200 - this.canvas.width) + this.canvas.width;

    this.lives.push(new Life(this.ctx, randomX, randomY, 40,randomType));
  }

  //--Comienzo juego----
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

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.enemies = this.enemies.filter((enemy) => enemy.x + enemy.width > 0);
    this.lives = this.lives.filter((life) => life.x + life.width > 0);
  }

  //--Lo que entra en pantalla----
  draw() {
    this.bg.draw();
    this.player.draw();
    this.enemies.forEach((enemy) => enemy.draw());
    this.lives.forEach((life) => life.draw());
    this.drawLevel ()
    // this.scorebar.draw(this.player.level, this.score);
   // this.drawScore();
  }

  //--Movimientos elementos----
  move() {
    this.bg.move();
    this.player.move();
    this.enemies.forEach((enemy) => enemy.move());
    this.lives.forEach((life) => life.move());
  }

  //--Controladores----
  onKeyDown(e) {
    this.player.onKeyDown(e);
  }

  onKeyUp(e) {
    this.player.onKeyUp(e);
  }

  // --Colisiones----

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

  //--Subir nivel--- (no me sale)

  levelUp(fish) {
    this.score += fish.score;
    if (this.score >= this.scoreLimit) {
        this.scoreLimit = this.scoreLimit + 3;
        this.player.level += 1;
        // if (fish.level > 0) {
        //     this.player.img.src = fish.playerImageSrc;
        // } else if (this.player.level <= 1) {
        //     this.player.img.src = "./images/goldfishes.png";
        //     this.player.level += 1;
        // }
    }
  }
  //--Fin juego----

  gameOver() {
    clearInterval(this.intervalId);

    this.ctx.save();
    document.getElementById("game-over").style.display = "flex";
    this.isGameOver = true;
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    document.getElementById("skip-btn").style.display = "none";
  }

  //--Barra puntuación----

  drawLevel () {
    this.ctx.fillStyle = "red";
    this.ctx.font = "24px Arial";
    this.ctx.fillText("Level: " + this.player.level, 400, 30);
    this.ctx.fillText("Score: " + this.score, 500, 30);
}
}
