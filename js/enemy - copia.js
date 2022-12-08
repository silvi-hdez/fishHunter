class Enemy {
  constructor(ctx, x, y, height, type, level) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = 0;
    this.type = type;
    this.level = level

    this.horizontalFrames = 3;
    this.verticalFrames = 1;
    this.xFrame = 0;
    this.yFrame = 0;

    this.types = [
      // {
      //   name: ["Clownfish", "Angelfish", "Cardinalfish"],
      //   imageSrc: [
      //     "./images/L01_clown.png",
      //     "./images/L02_angelfish.png",
      //     "./images/L03_cardinal.png",
      //   ],
      //   //playerImageSrc: "./images/L00_PLYR_goldfish.png",
      //   //score: 1,
      //   level: 0,
      // },
      // {
      //   name: ["Angelfish", "Cardinalfish", "Lionfish"],
      //   imageSrc: [
      //     "./images/L02_angelfish.png",
      //     "./images/L03_cardinal.png",
      //     "./images/L04_lionfish.png",
      //   ],
      //   //playerImageSrc: "./images/L01_PLYR_clown.png",
      //   //score: 1,
      //   level: 1,
      // },
      // {
      //   name: ["Cardinalfish", "Lionfish", "Swellfish"],
      //   imageSrc: [
      //     "./images/L03_cardinal.png",
      //     "./images/L04_lionfish.png",
      //     "./images/L05_swellfish.png",
      //   ],
      // //  playerImageSrc: "./images/L02_PLYR_angelfish.png",
      //  // score: 1,
      //   level: 2,
      // },

      {
        name: "Cardinalfish",
        imageSrc: "./images/L03_cardinal.png",
        playerImageSrc: "./images/L03_PLYR_cardinal.png",
        score: 1,
        level: 3,
      },
      {
        name: "Lionfish",
        imageSrc: "./images/L04_lionfish.png",
        playerImageSrc: "./images/L04_PLYR_lionfish.png",
        score: 1,
        level: 4,
      },
    ];

   
    this.level = this.types[this.type].level;
   // this.score = this.types[this.type].score;
   // this.playerImageSrc = this.types[this.type].playerImageSrc;
    this.img = new Image();
   // this.imgPlayer = new Image ()
    this.img.src = this.types[this.type].imageSrc;
   // this.imgPlayer.src = this.types[this.type].playerImageSrc;
    this.isReady = false;
    this.img.onload = () => {
      this.isReady = true;
      this.width = ((this.height * this.img.width) / this.img.height)/this.horizontalFrames;
    };

    this.speed = -3;

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

  // drawPlayer() {
  //   if (this.isReady) {
  //     this.ctx.drawImage(
  //       this.imgPlayer,
  //       (this.imgPlayer.width / this.horizontalFrames) * this.xFrame,
  //       (this.imgPlayer.height / this.verticalFrames) * this.yFrame,
  //       this.imgPlayer.width / this.horizontalFrames,
  //       this.imgPlayer.height / this.verticalFrames,
  //       this.x,
  //       this.y,
  //       this.width,
  //       this.height
  //     );
  //     this.tick++;
  //   }
  // }

  move() {
    if (this.isReady) {
      this.x += this.speed;

      if (this.tick % 10 === 0) {
        this.xFrame += 1;}
       
       if (this.xFrame > 1) {
            this.xFrame = 0;
            }
    }
  }

}
