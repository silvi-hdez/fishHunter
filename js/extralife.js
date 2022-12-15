class ExtraLife {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;

    this.speed = 3;

    this.img = new Image();
    this.img.src = "./images/ironhack_logonegro.png";
    this.isReady = false;
    this.img.onload = () => {
      this.isReady = true;
    };
  }

  draw() {
    if (this.isReady) {
    
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  move() {
    if (this.isReady) {
      this.y += this.speed;
    }
  }
}
