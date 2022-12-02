class Player {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.width = 70
        this.height = 40

        this.horizontalFrames = 3
        this.verticalFrames = 1
        this.xFrame = 0
        this.yFrame = 0

        this.img = new Image ()
        this.img.src = './images/YellowFish.png'
        this.isReady = false
        this.img.onload = () => {
            this.isReady = true
        }

       
       // this.gravity = 0.1
       // this.speedY = 0

       this.gravity = 0.05;
	    this.vy = 0;


        this.movements = {
			up: false,
			down: false
		};
    }

    draw () {
 
        if (this.isReady) {
            this.ctx.drawImage (this.img, 
                this.img.width/this.horizontalFrames * this.xFrame,
                this.img.height/this.verticalFrames * this.yFrame,
                this.img.width/this.horizontalFrames,
                this.img.height/this.verticalFrames,
                this.x, 
                this.y, 
                this.width, 
                this.height)
        }
        
    }

    move () {
       this.vy += this.gravity;
		this.y += this.vy;

        if (this.y > this.ctx.canvas.height - this.height) {
			this.y = this.ctx.canvas.height - this.height
		}

        if (this.y<=0) {
            this.y = 0
        }
    }


    onKeyDown (e) {
        if (e.keyCode === 38) {
			this.movements.up = true;
			this.vy = -3;
		}
		if (e.keyCode === 40) {
			this.movements.down = true;
            this.vy = 3
		}
    }

    onKeyUp (e) {  
        if (e.keyCode === 38 ){
			this.movements.up = false;
		}
        if (e.keyCode === 40 ){
			this.movements.down = false;
		}
    }


    isColliding(obj) {
       
		return this.x < obj.x + obj.width
		 && this.x + this.width > obj.x
		 && this.y < obj.y + obj.height
		 && this.y + this.height > obj.y;
	}


}
