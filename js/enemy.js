class Enemy {
  constructor(ctx, x, y, height, typeIndex) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = 0;
    this.typeIndex = typeIndex;

    this.horizontalFrames = 3;
    this.verticalFrames = 1;
    this.xFrame = 0;
    this.yFrame = 0;

    this.img = new Image();
    this.imageSrc = [
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

  
    this.img.src = this.imageSrc[this.typeIndex]
 
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
