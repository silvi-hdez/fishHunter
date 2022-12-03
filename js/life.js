class Life {
  constructor(ctx, x, y, width, type) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 0;

    this.types = {
      1: {
        imageSrc: "./images/life1.png",
        score: 1,
      },
      2: {
        imageSrc: "./images/life2.png",
        score: 2,
      },
    };

    this.type = type;
    // this.isOnSea = false;
    // this.isVisible = true; // is replicable

    this.img = new Image();
    // this.imgSrc = [
    //     './images/life1.png',
    //     './images/life2.png'
    // ]

    this.score = this.types[this.type].score;
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
    this.x += this.speed;

    if (this.x + this.ctx.canvas.width <= 0) {
      this.x = 0;
    }
  }
}
