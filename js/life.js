class Life {
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

    this.types = [
      {
        name: "shrimp",
        imageSrc: "./images/L00_foodfish.png",
        score: 1,
        level: 0,
      },
      {
        name: "star",
        imageSrc: "./images/L00_fruitfish.png",
        score: 1,
        level: 0,
      },
      {
        name: "prawn",
        imageSrc: "./images/L00_shrimp.png",
        score: 1,
        level: 0,
      },
      {
        name: "crab",
        imageSrc: "./images/L01_hermitcrab.png",
        score: 2,
        level: 1,
      },
      {
        name: "sea snail",
        imageSrc: "./images/L01_nautilus.png",
        score: 2,
        level: 1,
      },
      {
        name: "sea horse",
        imageSrc: "./images/L01_seahorse.png",
        score: 2,
        level: 1,
      },
    ];

    
    this.img = new Image();
    this.img.src = this.types[this.type].imageSrc;
    this.isReady = false;
    this.img.onload = () => {
      this.isReady = true;
      this.width =
       ((this.height * this.img.width) /
        this.img.height) /
        this.horizontalFrames;
    };

    this.speed = 3;
    this.score = this.types[this.type].score;
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
    this.y += this.speed;

    if (this.tick % 10 === 0) {
      this.xFrame += 1;
    }

    if (this.xFrame > 1) {
      this.xFrame = 0;
    }
  }
}
