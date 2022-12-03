class Enemy {
  constructor(ctx, x, y, width, type) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 0;

    this.types = [
      {
        imageSrc: "./images/goldfish_life.png",
        playerImageSrc: "./images/YellowFish.png",
        score: 1,
        level: 0,
      },
      {
        imageSrc: "./images/goldFish_enemy.png",
        playerImageSrc: "./images/tunafish.png",
        score: 1,
        level: 1,
      },
      {
        imageSrc: "./images/tunafish_enemy.png",
        playerImageSrc: "./images/scaryFishes.png",
        score: 1,
        level: 2,
      },

      {
        imageSrc: "./images/scaryFish_enemy.png",
        playerImageSrc: "./images/sharks.png",
        score: 1,
        level: 3,
      },
      {
        imageSrc: "./images/shark_enemy.png",
        playerImageSrc: "./images/shark_enemy.png",
        score: 1,
        level: 4,
      },
    ];

    this.type = type;
    this.level = this.types[this.type].level;
    this.score = this.types[this.type].score;
    this.playerImageSrc = this.types[this.type].playerImageSrc;
    this.img = new Image();

    this.img.src = this.types[this.type].imageSrc;
    this.isReady = false;
    this.img.onload = () => {
      this.isReady = true;
      this.height = (this.width * this.img.height) / this.img.width;
    };

    this.speed = -3;
  }

  draw() {
    if (this.isReady) {
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  move() {
    if (this.isReady) {
      this.x += this.speed;
    }
  }
}
