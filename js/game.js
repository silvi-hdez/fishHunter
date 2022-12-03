class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.bg = new Background(this.ctx);
    this.player = new Player(this.ctx, 300, 200);
    this.enemies = [];

    this.lives = [];

    this.score = 0;
    this.tick = 0;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear();
      this.draw();
      this.move();
      this.checkCollisions();
      this.changeAppearance();
      // this.replyLevel()
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
    this.drawScore();
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
    if (this.enemies.some((enemy) => this.player.isColliding(enemy))) {
      this.gameOver();
    }

    const lifeCollision = this.lives.find((life) =>
      this.player.isColliding(life)
    );

    if (lifeCollision) {
        this.score += lifeCollision.score;
        this.lives.splice(this.lives.indexOf(lifeCollision), 1);
      }

    

  }

  gameOver() {
    clearInterval(this.intervalId);
  }

  drawScore() {
    this.ctx.fillStyle = "red";
    this.ctx.font = "24px Arial";
    this.ctx.fillText("Score: " + this.score, 10, 30);
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
    console.log(this.enemies);
    const randomWidth = Math.random() * (120 - 80) + 80;
    const randomY = Math.random() * this.canvas.height;
    const randomX =
      Math.random() * (1200 - this.canvas.width) + this.canvas.width;
    this.enemies.push(new Enemy(this.ctx, randomX, randomY, randomWidth));
  }

  addLife() {
    const randomWidth = Math.random() * (50 - 30) + 30;
    const randomY = Math.random() * this.canvas.height;
    const randomType = Math.floor((Math.random() * 2) + 1)

    const randomX =
      Math.random() * (1200 - this.canvas.width) + this.canvas.width;
    this.lives.push(new Life(this.ctx, randomX, randomY, randomWidth, randomType));
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.enemies = this.enemies.filter(enemy => enemy.x + enemy.width >  0);
    //this.lives = this.lives.filter(life => life.x > this.canvas.width);
  }

  changeAppearance() {
    if (this.score >= 3) {
      this.player.img.src = "./images/goldfishes.png";
      // this.enemy.imgSrc = [
      //     './images/tunafish_enemy.png',
      //     './images/scaryFish_enemy.png',
      //     './images/shark_enemy.png'
      // ]
      // this.life.imgSrc = [
      //     './images/life1.png',
      //     './images/life2.png',
      //     './images/golfish_life.png',
      // ]
    }
  }
}
