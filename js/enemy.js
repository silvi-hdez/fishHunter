class Enemy {
  constructor(ctx, x, y, height, imgSrc) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = 0;

    this.horizontalFrames = 3;
    this.verticalFrames = 1;
    this.xFrame = 0;
    this.yFrame = 0;

    this.img = new Image();
    this.img.src = imgSrc
 
    this.isReady = false;
    this.img.onload = () => {
      this.isReady = true;
      this.width =
        (this.height * this.img.width) /
        this.img.height /
        this.horizontalFrames;
    };

    this.speed = -4;

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
