class ScoreBar {
  constructor(ctx, x) {
    this.ctx = ctx;
    this.x = x;
    this.y = 40;
    this.height = 25;
    this.width = 25;

    this.imgFishplayer = new Image ()
    this.imgFishplayer.src ='./images/icons/goldfish_icon.png'
    this.isReady = false
    this.imgFishplayer.onload = () => {
        this.isReady = true
            }

  }

  draw() {
    if (this.isReady) {

    this.ctx.drawImage(
      this.imgFishplayer,
      this.x,
      this.y,
      this.width,
      this.height
    );
    }
  }
}
