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
    //this.scorebar = new ScoreBar(this.ctx);

    //--music--
   
    this.sound = new Audio('./sounds/I_Like_Big_Bass.m4a');
		this.sound.volume = 0.3;
		this.eatsound = new Audio('./sounds/bubble_effect.m4a');
		this.gameoverSound = new Audio('./sounds/gameover_effect.mp3'); 
    this.winnerSound = new Audio('./sounds/winner_effect.mp3');  
  }

  //--Añadir enemigos y vidas----

  addEnemy() {

    const randomY = () => Math.random() * (this.canvas.height - 80);
    const randomX = () => Math.random() * (1200 - this.canvas.width) + this.canvas.width;
  
      if (this.player.level === 0) {
        const randomIndex = Math.floor(Math.random() * 3);
        const enemyToAdd = new Enemy(this.ctx, randomX(), randomY(), 80, randomIndex);
        this.enemies.push(enemyToAdd);
      }
     
     if (this.player.level === 1) {
      const randomIndex = Math.floor(Math.random() * (4 - 1) + 1);
      const enemyToAdd = new Enemy(this.ctx, randomX(), randomY(), 80, randomIndex);
      enemyToAdd.speed = -5
      this.enemies.push(enemyToAdd);
     }

     if (this.player.level === 2) {
      const randomIndex = Math.floor(Math.random() * (5 - 3) + 2);
      const enemyToAdd = new Enemy(this.ctx, randomX(), randomY(), 80, randomIndex);
      enemyToAdd.speed = -6
      this.enemies.push(enemyToAdd);
     }

     if (this.player.level === 3) {
      const randomIndex = Math.floor(Math.random() * (6 - 3) + 3);
      const enemyToAdd = new Enemy(this.ctx, randomX(), randomY(), 80, randomIndex);
      enemyToAdd.speed = -7
      this.enemies.push(enemyToAdd);
     }

     if (this.player.level === 4) {
      const randomIndex = Math.floor(Math.random() * (7 - 4) + 4);
      const enemyToAdd = new Enemy(this.ctx, randomX(), randomY(), 80, randomIndex);
      enemyToAdd.speed = -8
      this.enemies.push(enemyToAdd);
     }

     if (this.player.level === 5) {
      const randomIndex = Math.floor(Math.random() * (8 - 5) + 5);
      const enemyToAdd = new Enemy(this.ctx, randomX(), randomY(), 80, randomIndex);
      enemyToAdd.speed = -9
      this.enemies.push(enemyToAdd);
     }

     if (this.player.level === 6) {
      const randomIndex = Math.floor(Math.random() * (9 - 6) + 6);
      const enemyToAdd = new Enemy(this.ctx, randomX(), randomY(), 80, randomIndex);
      enemyToAdd.speed = -10
      this.enemies.push(enemyToAdd);
     }

     if (this.player.level === 7) {
      const randomIndex = Math.floor(Math.random() * (10 - 7) + 7);
      const enemyToAdd = new Enemy(this.ctx, randomX(), randomY(), 80, randomIndex);
      enemyToAdd.speed = -11
      this.enemies.push(enemyToAdd);
     }

  }

  addLife() {

    const randomY = Math.random() * (-50-0) ;
    const randomType = Math.floor(Math.random() * 6);
    const randomX =
      Math.random() * 950;

    this.lives.push(new Life(this.ctx, randomX, randomY, 40, randomType));
  }

  //--Comienzo juego----
  start() {
    this.sound.play()
    this.intervalId = setInterval(() => {
      this.clear();
      this.draw();
      this.move();
      this.checkCollisions();

      this.tick++;
      if (this.tick % 90 === 0) {
        this.addLife();
        this.addEnemy();
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
   // this.scorebar.draw();
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
        this.gameOver();
      } 
      
    

    const lifeCollision = this.lives.find((life) =>
      this.player.isColliding(life)
    );

    if (lifeCollision) {
      this.lives.splice(this.lives.indexOf(lifeCollision), 1);
      this.levelUp(lifeCollision);
      this.eatsound.currentTime = 0;
			this.eatsound.play();
    }
  }

  //--Subir nivel--- (no me sale)

  levelUp(fish) {
    this.score += fish.score;
    if (this.score >= this.scoreLimit) {
      this.scoreLimit = this.scoreLimit + 2;
      this.player.level += 1;
  
    }
    if ( this.player.level === 8) {
      this.endGame()
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
    this.gameoverSound.play();
    this.sound.pause()
  }

  //--Barra puntuación----

  drawLevel() {
    this.ctx.fillStyle = "red";
    this.ctx.font = "24px Arial";
    this.ctx.fillText("Level: " + this.player.level + "/11", 300, 30);
    this.ctx.fillText("Score: " + this.score, 500, 30);
  }

  //--Pantalla fin juego----
  endGame (){
    clearInterval(this.intervalId);

    this.ctx.save();
    document.getElementById("finish-game").style.display = "flex";
    this.isEndGame = true;
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    document.getElementById("skip-btn").style.display = "none";
    this.sound.pause()
    this.winnerSound.play();
  }
}
