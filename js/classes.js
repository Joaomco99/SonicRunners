class Sonic {
    constructor(x, y, width, height, ctx) {
        this.x = 20;
        this.y = 357;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = 'images/sonic.gif';
        this.ctx = ctx;
        this.gravity = 0.5;
        this.velocityY = 0;
        this.isJumping = false;
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    jump() {
        if (!this.isJumping) {
            this.velocityY = -12;
            this.isJumping = true;
        }
    }

    update() {
        this.velocityY += this.gravity;
        this.y += this.velocityY;
        if (this.y + this.height > 400) {
            this.y = 400 - this.height;
            this.isJumping = false;
            this.velocityY = 0;
        }
    }
}





class Obstacle {
    constructor(x, y, width, ctx) {
        this.x = 700;
        this.y = 400; // update y to be the ground level
        this.width = 50;
        this.height = 50;
        this.image = new Image();
        this.image.src = 'images/enemy1.gif'
        this.ctx = ctx;
    }
    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    move() {
        this.x += -1;
    }
};