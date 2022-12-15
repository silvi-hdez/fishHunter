class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.bg = new Background(this.ctx, "./images/seabed-bg.jpg", -3);
    this.player = new Player(this.ctx, 300, 200, 80);
    this.enemies = [];

    this.lives = [];

    this.score = 0;
    this.scoreLimit = 5;
    this.totalScore = 0;
    this.tick = 0;

    this.scorebar = [
      new ScoreBar(this.ctx, 145),
      new ScoreBar(this.ctx, 180),
      new ScoreBar(this.ctx, 215),
    ];
    this.extraLife = null;

    //--music--

    this.sound = new Audio("./sounds/I_Like_Big_Bass.m4a");
    this.sound.volume = 0.3;
    this.sound.loop = true;
    this.eatsound = new Audio("./sounds/bubble_effect.m4a");
    this.gameoverSound = new Audio("./sounds/gameover_effect.mp3");
    this.winnerSound = new Audio("./sounds/winner_effect.mp3");
    this.failFish = new Audio("./sounds/wrong-fish.mp3");

    this.enemiesImgs = [
      "./images/L01_clown.png",
      "./images/L02_angelfish.png",
      "./images/L03_cardinal.png",
      "./images/L04_lionfish.png",
      "./images/L05_swellfish.png",
      "./images/L06__basslets.png",
      "./images/L07_barracuda.png",
      "./images/L08_raya.png",
      "./images/L09_swordfish.png",
      "./images/L10_shark.png",
    ];

    this.livesImgs = [
      {
        img: "./images/L00_foodfish.png",
        score: 1,
      },
      {
        img: "./images/L00_fruitfish.png",
        score: 1,
      },
      {
        img: "./images/L00_shrimp.png",
        score: 2,
      },
      {
        img: "./images/L01_hermitcrab.png",
        score: 2,
      },
      {
        img: "./images/L01_nautilus.png",
        score: 3,
      },
      {
        img: "./images/L01_seahorse.png",
        score: 3,
      },
      {
        img: "./images/L01_clown.png",
        score: 4,
      },
      {
        img: "./images/L02_angelfish.png",
        score: 4,
      },
      {
        img: "./images/L03_cardinal.png",
        score: 5,
      },
      {
        img: "./images/L04_lionfish.png",
        score: 5,
      },
    ];
  }

  //--Añadir enemigos----

  addEnemy() {
    const randomY = () => Math.random() * (this.canvas.height - 80);
    const randomX = () =>
      Math.random() * (1200 - this.canvas.width) + this.canvas.width;

    if (this.player.level === 0) {
      const randomIndex = Math.floor(Math.random() * 3);
      const enemyToAdd = new Enemy(
        this.ctx,
        randomX(),
        randomY(),
        80,
        this.enemiesImgs[randomIndex]
      );
      this.enemies.push(enemyToAdd);
    }

    if (this.player.level === 1) {
      const randomIndex = Math.floor(Math.random() * (4 - 1) + 1);
      const enemyToAdd = new Enemy(
        this.ctx,
        randomX(),
        randomY(),
        80,
        this.enemiesImgs[randomIndex]
      );
      enemyToAdd.speed = -5;
      this.enemies.push(enemyToAdd);
    }

    if (this.player.level === 2) {
      const randomIndex = Math.floor(Math.random() * (5 - 3) + 2);
      const enemyToAdd = new Enemy(
        this.ctx,
        randomX(),
        randomY(),
        80,
        this.enemiesImgs[randomIndex]
      );
      enemyToAdd.speed = -6;
      this.enemies.push(enemyToAdd);
    }

    if (this.player.level === 3) {
      const randomIndex = Math.floor(Math.random() * (6 - 3) + 3);
      const enemyToAdd = new Enemy(
        this.ctx,
        randomX(),
        randomY(),
        80,
        this.enemiesImgs[randomIndex]
      );
      enemyToAdd.speed = -7;
      this.enemies.push(enemyToAdd);
    }

    if (this.player.level === 4) {
      const randomIndex = Math.floor(Math.random() * (7 - 4) + 4);
      const enemyToAdd = new Enemy(
        this.ctx,
        randomX(),
        randomY(),
        80,
        this.enemiesImgs[randomIndex]
      );
      enemyToAdd.speed = -8;
      this.enemies.push(enemyToAdd);
    }

    if (this.player.level === 5) {
      const randomIndex = Math.floor(Math.random() * (8 - 5) + 5);
      const enemyToAdd = new Enemy(
        this.ctx,
        randomX(),
        randomY(),
        80,
        this.enemiesImgs[randomIndex]
      );
      enemyToAdd.speed = -9;
      this.enemies.push(enemyToAdd);
    }

    if (this.player.level === 6) {
      const randomIndex = Math.floor(Math.random() * (9 - 6) + 6);
      const enemyToAdd = new Enemy(
        this.ctx,
        randomX(),
        randomY(),
        80,
        this.enemiesImgs[randomIndex]
      );
      enemyToAdd.speed = -10;
      this.enemies.push(enemyToAdd);
    }

    if (this.player.level === 7) {
      const randomIndex = Math.floor(Math.random() * (10 - 7) + 7);
      const enemyToAdd = new Enemy(
        this.ctx,
        randomX(),
        randomY(),
        80,
        this.enemiesImgs[randomIndex]
      );
      enemyToAdd.speed = -11;
      this.enemies.push(enemyToAdd);
    }
  }

  //--Añadir vidas ----

  addLife() {
    const randomY = () => Math.random() * (-50 - 0);
    const randomX = () => Math.random() * 950;

    if (this.player.level === 0) {
      const randomIndex = Math.floor(Math.random() * 3);
      const lifeToAdd = new Life(
        this.ctx,
        randomX(),
        randomY(),
        40,
        this.livesImgs[randomIndex].img
      );
      lifeToAdd.score = this.livesImgs[randomIndex].score;
      this.lives.push(lifeToAdd);
    }

    if (this.player.level === 1) {
      const randomIndex = Math.floor(Math.random() * (4 - 1) + 1);
      const lifeToAdd = new Life(
        this.ctx,
        randomX(),
        randomY(),
        40,
        this.livesImgs[randomIndex].img
      );
      lifeToAdd.score = this.livesImgs[randomIndex].score;
      this.lives.push(lifeToAdd);
    }

    if (this.player.level === 2) {
      const randomIndex = Math.floor(Math.random() * (5 - 2) + 2);
      const lifeToAdd = new Life(
        this.ctx,
        randomX(),
        randomY(),
        40,
        this.livesImgs[randomIndex].img
      );
      lifeToAdd.score = this.livesImgs[randomIndex].score;
      this.lives.push(lifeToAdd);
    }

    if (this.player.level === 3) {
      const randomIndex = Math.floor(Math.random() * (6 - 3) + 3);
      const lifeToAdd = new Life(
        this.ctx,
        randomX(),
        randomY(),
        40,
        this.livesImgs[randomIndex].img
      );
      lifeToAdd.score = this.livesImgs[randomIndex].score;
      this.lives.push(lifeToAdd);
    }

    if (this.player.level === 4) {
      const randomIndex = Math.floor(Math.random() * (7 - 4) + 4);
      const lifeToAdd = new Life(
        this.ctx,
        randomX(),
        randomY(),
        40,
        this.livesImgs[randomIndex].img
      );
      lifeToAdd.score = this.livesImgs[randomIndex].score;
      this.lives.push(lifeToAdd);
    }

    if (this.player.level === 5) {
      const randomIndex = Math.floor(Math.random() * (8 - 5) + 5);
      const lifeToAdd = new Life(
        this.ctx,
        randomX(),
        randomY(),
        40,
        this.livesImgs[randomIndex].img
      );
      lifeToAdd.score = this.livesImgs[randomIndex].score;
      this.lives.push(lifeToAdd);
    }

    if (this.player.level === 6) {
      const randomIndex = Math.floor(Math.random() * (9 - 6) + 6);
      const lifeToAdd = new Life(
        this.ctx,
        randomX(),
        randomY(),
        40,
        this.livesImgs[randomIndex].img
      );
      lifeToAdd.score = this.livesImgs[randomIndex].score;
      this.lives.push(lifeToAdd);
    }

    if (this.player.level === 7) {
      const randomIndex = Math.floor(Math.random() * (10 - 7) + 7);
      const lifeToAdd = new Life(
        this.ctx,
        randomX(),
        randomY(),
        40,
        this.livesImgs[randomIndex].img
      );
      lifeToAdd.score = this.livesImgs[randomIndex].score;
      this.lives.push(lifeToAdd);
    }
  }

  //--Comienzo juego----
  start() {
    this.sound.play();
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

      this.addExtraLife();
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
    this.drawLevel();
    this.scorebar.forEach((life) => {
      life.draw();
    });
    this.drawPossibleEnemies();
    this.drawPossibleLives();

    if (this.extraLife) {
      this.extraLife.draw();
    }

    this.drawHealth();
  }

  //--Movimientos elementos----
  move() {
    this.bg.move();
    this.player.move();
    this.enemies.forEach((enemy) => enemy.move());
    this.lives.forEach((life) => life.move());
    if (this.extraLife) {
      this.extraLife.move();
    }
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
    //--Con extralife----

    const collidingExtraLife =
      this.extraLife && this.player.isColliding(this.extraLife);

    if (collidingExtraLife && this.player.life < 3) {
      this.extraLife = null;
      this.player.life++;

      this.scorebar.push(
        new ScoreBar(this.ctx, this.scorebar[this.scorebar.length - 1].x + 35)
      );
    }

    this.eatsound.currentTime = 0;
    this.eatsound.play();

    //--Con enemigo----

    const collidingEnemy = this.enemies.find((enemy) =>
      this.player.isColliding(enemy)
    );

    if (collidingEnemy) {
      this.player.receivingDamage = true;
      setTimeout(() => {
        this.player.receivingDamage = false;
      }, 500);

      this.enemies.splice(this.enemies.indexOf(collidingEnemy), 1);
      this.failFish.currentTime = 0;
      this.failFish.play();
      this.player.life--;
      this.scorebar.pop();
    }

    if (this.player.life <= 0) {
      this.gameOver();
    }

    //--Con vidas----
    const lifeCollision = this.lives.find((life) =>
      this.player.isColliding(life)
    );

    if (lifeCollision) {
      this.lives.splice(this.lives.indexOf(lifeCollision), 1);
      this.levelUp(lifeCollision);
      this.eatsound.currentTime = 0;
      this.eatsound.play();
    }

    //--Con límites----

    if (this.player.x <= 0 && !this.player.receivingDamage) {
      this.failFish.currentTime = 0;
      this.failFish.play();
      this.player.life--;
      this.scorebar.pop();
      this.player.receivingDamage = true;

      setTimeout(() => {
        this.player.receivingDamage = false;
      }, 1000);
    }
    if (
      this.player.x >= this.canvas.width - this.player.width &&
      !this.player.receivingDamage
    ) {
      this.player.life--;
      this.scorebar.pop();
      this.player.receivingDamage = true;

      setTimeout(() => {
        this.player.receivingDamage = false;
      }, 1000);
    }
    if (this.player.y <= 0 && !this.player.receivingDamage) {
      this.player.life--;
      this.scorebar.pop();
      this.player.receivingDamage = true;

      setTimeout(() => {
        this.player.receivingDamage = false;
      }, 1000);
    }
    if (
      this.player.y >= this.canvas.height - this.player.height &&
      !this.player.receivingDamage
    ) {
      this.player.life--;
      this.scorebar.pop();
      this.player.receivingDamage = true;

      setTimeout(() => {
        this.player.receivingDamage = false;
      }, 1000);
    }
  }

  //--Subir nivel---

  levelUp(fish) {
    console.log("entro", fish.score, this.score, this.totalScore);
    this.score += fish.score;
    this.totalScore += fish.score;
    if (this.score >= this.scoreLimit) {
      this.score = 0;
      this.scoreLimit = this.scoreLimit * 2;
      this.player.level += 1;
      this.player.height = this.player.height * 1.15;
      this.player.width = this.player.width * 1.15;
    }
    if (this.player.level === 8) {
      this.endGame();
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
    this.sound.pause();
    this.gameoverSound.play();
  }

  //--Barra puntuación----

  drawLevel() {
    this.ctx.fillStyle = "red";
    this.ctx.font = "24px Comic";
    this.ctx.fillText("lives: " + this.player.life + "/3", 150, 30);
    this.ctx.fillText("Level: " + this.player.level + "/7", 300, 30);
    this.ctx.fillText("Score: " + this.totalScore, 500, 30);
    this.ctx.fillText("BE CAREFUL!", 700, 30);
  }

  //--Pantalla fin juego----
  endGame() {
    clearInterval(this.intervalId);

    this.ctx.save();
    document.getElementById("finish-game").style.display = "flex";
    this.isEndGame = true;
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    document.getElementById("skip-btn").style.display = "none";
    this.sound.pause();
    this.winnerSound.play();
  }

  //-- Dibujo enemigos en el nivel----

  drawPossibleEnemies() {
    const img1 = new Image();
    img1.src = this.enemiesImgs[this.player.level];
    const img2 = new Image();
    img2.src = this.enemiesImgs[this.player.level + 1];
    const img3 = new Image();
    img3.src = this.enemiesImgs[this.player.level + 2];

    this.ctx.drawImage(
      img1,
      0,
      0,
      img1.width / 3,
      img1.height,
      700,
      40,
      50,
      50
    );
    this.ctx.drawImage(
      img2,
      0,
      0,
      img2.width / 3,
      img2.height,
      755,
      40,
      50,
      50
    );
    this.ctx.drawImage(
      img3,
      0,
      0,
      img3.width / 3,
      img3.height,
      805,
      40,
      50,
      50
    );
  }

  drawPossibleLives() {
    const img1 = new Image();
    img1.src = this.livesImgs[this.player.level].img;
    const img2 = new Image();
    img2.src = this.livesImgs[this.player.level + 1].img;
    const img3 = new Image();
    img3.src = this.livesImgs[this.player.level + 2].img;

    this.ctx.drawImage(
      img1,
      0,
      0,
      img1.width / 3,
      img1.height,
      495,
      40,
      30,
      30
    );
    this.ctx.drawImage(
      img2,
      0,
      0,
      img2.width / 3,
      img2.height,
      530,
      40,
      30,
      30
    );
    this.ctx.drawImage(
      img3,
      0,
      0,
      img3.width / 3,
      img3.height,
      565,
      40,
      30,
      30
    );
  }

  addExtraLife() {
    if (this.player.life < 3 && !this.extraLife) {
      const randomY = Math.random() * (-50 - 0);
      const randomX = Math.random() * 950;
      this.extraLife = new ExtraLife(this.ctx, randomX, randomY);
      setTimeout(() => {
        this.extraLife = null;
      }, 10000);
    }
  }

  drawHealth() {
    const score = this.score;
    let color = "green";

    this.ctx.fillStyle = color;
    this.ctx.strokeRect(280, 50, 140, 20);
    this.ctx.fillRect(280, 50, (score * 140) / this.scoreLimit, 20);
  }
}
