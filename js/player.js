class Player {
  constructor(ctx, x, y, height) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = height;

    this.sizeX = this.width;
    this.sizeY = this.height;

    this.width = 0;

    this.horizontalFrames = 3;
    this.verticalFrames = 1;
    this.xFrame = 0;
    this.yFrame = 0;

    this.img = new Image();
    this.img.src = "./images/L00_PLYR_goldfish.png";
    this.isReady = false;
    this.img.onload = () => {
      this.isReady = true;
      this.width =
        (this.height * this.img.width) /
        this.img.height /
        this.horizontalFrames;
    };

    this.gravity = 0.05;
    this.vy = 0;

    this.movements = {
      up: false,
      down: false,
    };

    this.level = 0;

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
    this.vy += this.gravity;
    this.y += this.vy;

    if (this.tick % 10 === 0) {
      this.xFrame += 1;
    }

    if (this.xFrame > 1) {
      this.xFrame = 0;
    }

    //--Área de movimiento----

    if (this.y > this.ctx.canvas.height - this.height) {
      this.y = this.ctx.canvas.height - this.height;
    }

    if (this.y <= 0) {
      this.y = 0;
    }
  }

  //--Controladores----

  onKeyDown(e) {
    if (e.keyCode === 38 || e.keyCode === 32) {
      e.preventDefault();
      this.movements.up = true;
      this.vy = -3;
    }
    if (e.keyCode === 40) {
      this.movements.down = true;
      this.vy = 3;
    }
  }

  onKeyUp(e) {
    if (e.keyCode === 38) {
      this.movements.up = false;
    }
    if (e.keyCode === 40) {
      this.movements.down = false;
    }
  }

  //--Colisiones----
  isColliding(obj) {
    const threshold = 25;
    return (
      this.x + threshold < obj.x + obj.width &&
      this.x + this.width > obj.x + threshold &&
      this.y + threshold < obj.y + obj.height &&
      this.y + this.height > obj.y + threshold
    );
  }
}
