class Sonic {
    constructor(x, y, width, height, ctx) {
        this.x = 50;
        this.y = 760; 
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
            this.velocityY = -15;
            this.isJumping = true;
        }
    }

    update() {
        this.velocityY += this.gravity;
        this.y += this.velocityY;
        if (this.y + this.height > 760) {
            this.y = 760 - this.height;
            this.isJumping = false;
            this.velocityY = 0;
        }
    }
}








class Obstacle1 {
    constructor(x, y, width, ctx) {
        this.x = 1450;
        this.y = 700; 
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
        this.x += -4;
    }
};


class Obstacle2 {
    constructor(x, y, width, ctx) {
        this.x = 1450;
        this.y = 700; 
        this.width = 50;
        this.height = 50;
        this.image = new Image();
        this.image.src = 'images/enemy2.gif'
        this.ctx = ctx;
    }
    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    move() {
        this.x += -4;
    }
};


class Obstacle3 {
    constructor(x, y, width, ctx) {
        this.x = 1450;
        this.y = 530; 
        this.width = 100;
        this.height = 70;
        this.image = new Image();
        this.image.src = 'images/enemy3.gif'
        this.ctx = ctx;
    }
    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    move() {
        this.x += -4;
    }
};


