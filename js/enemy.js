class Enemy {
  constructor(ctx, x, y, height, type) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = 0;
    this.type = type;

    this.horizontalFrames = 3;
    this.verticalFrames = 1;
    this.xFrame = 0;
    this.yFrame = 0;

    this.img = new Image();
    this.imageSrc = {
      Clownfish: "./images/L01_clown.png",
      Angelfish: "./images/L02_angelfish.png",
      Cardinalfish: "./images/L03_cardinal.png",
      Lionfish: "./images/L04_lionfish.png",
      Swellfish: "./images/L05_swellfish.png",
      Basslet: "./images/L06__basslets.png",
      Barracuda: "./images/L07_barracuda.png",
      Raya: "./images/L08_raya.png",
      Swordfish:"./images/L09_swordfish.png",
      Shark:"./images/L10_shark.png",
    };

  
    this.img.src = this.imageSrc[this.type]
 
    this.isReady = false;
    this.img.onload = () => {
      this.isReady = true;
      this.width =
        (this.height * this.img.width) /
        this.img.height /
        this.horizontalFrames;
    };

    this.speed = -2;

    this.tick = 0;
  }

  draw() {
    if (this.isReady) {
      this.ctx.drawImage(
        this.img,
        (this.img.width / this.horizontalFrames) * this.xFrame,
        (this.img.height / this.verticalFrames) * this.yFrame,
        this.img.width / this.horizontalFrames,
        this.img.height / this.verticalFrames,
        this.x,
        this.y,
        this.width,
        this.height
      );
      this.tick++;
    }
  }

  move() {
    if (this.isReady) {
      this.x += this.speed;

      if (this.tick % 10 === 0) {
        this.xFrame += 1;
      }

      if (this.xFrame > 1) {
        this.xFrame = 0;
      }
    }
  }
}
