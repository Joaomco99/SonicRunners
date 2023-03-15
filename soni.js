window.onload = () => {


  const startBtn = document.getElementById("start-button");
  const restartBtn = document.getElementById("restart-button");
  const canvas = document.getElementById('game-screen');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = '/images/landscape.jpeg';

  const backgroundImage = {
    img: img,
    x: 0,
    speed: -1,

    move: function () {
      this.x += this.speed;
      this.x %= canvas.width;
    },

    draw: function () {
      this.move();
      ctx.drawImage(this.img, this.x, 0);
      if (this.speed < 0) {
        ctx.drawImage(this.img, this.x + canvas.width, 0);
      } else {
        ctx.drawImage(this.img, this.x - this.img.width, 0);
      }
    },
  };


  let lastTime = 0;
  function startGame(time) {
    console.log('START GAME CALLED');
    const delta = time - lastTime;
    lastTime = time;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.update(delta);
    game.draw(ctx);
    console.log(game.sonic);
    if (game.gameOver) {
      game.endGame(ctx);
      document.body.style.overflow = "visible";
      restartBtn.style.display = "block";
      cancelAnimationFrame;
    } else {
      requestAnimationFrame(startGame);
    }
  }

  startBtn.addEventListener("click", () => {
    canvas.style.display = "block";
    document.getElementById("instructions").style.display = "none";
    startBtn.style.display = "none";
    document.body.style.overflow = "hidden";
    startGame(0);
  });

  class Sonic {
    constructor(x, y, width, height, ctx) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.image = new Image();
      this.image.src = '/images/sonic.gif';
      this.ctx = ctx;
      this.velocityY = 0;
      this.gravity = 0.5;
      this.isJumping = false;
    }

    draw() {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    moveLeft() {
      this.x -= 10;
    }

    moveRight() {
      this.x += 10;
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
      }
    }
  }

  class Enemy1 {
    constructor(x, y, width, ctx) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.image = new Image();
      this.image.src = '/images/enemy1.gif';
      this.ctx = ctx;
      this.speed = -5;
    }

    draw() {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.width);
    }

    update() {
      this.x += this.speed;
    }

    isCollidingWithSonic(sonic) {
      if (
        this.x < sonic.x + sonic.width &&
        this.x + this.width > sonic.x &&
        this.y < sonic.y + sonic.height &&
        this.y + this.width > sonic.y
      ) {
        return true;
      }
      return false;
    }
  }




  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.sonic = new Sonic(50, 300, 50, 50, ctx);
      this.enemies = [new Enemy1(600, 355, 60, ctx), new Enemy1(900, 355, 60, ctx)];
      this.score = 0;
      this.gameOver = false;
    }

    update(delta) {
      this.sonic.update();
      for (const enemy of this.enemies) {
        enemy.update();
        if (this.checkCollision(this.sonic, enemy)) {
          this.gameOver = true;
          break;
        }
      }
      this.score += delta;
    }

    draw(ctx) {
      backgroundImage.draw();
      this.sonic.draw();
      for (const enemy of this.enemies) {
        enemy.draw();
      }
      ctx.fillStyle = "white";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("Score: " + Math.floor(this.score / 10), 20, 30);
    }

    endGame(ctx) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.fillStyle = "white";
      ctx.font = "bold 60px sans-serif";
      ctx.fillText("Game Over", this.width / 2, this.height / 2 - 60);
      ctx.font = "bold 30px sans-serif";
      ctx.fillText("Final Score: " + Math.floor(this.score / 10), this.width / 2, this.height / 2);
    }

    checkCollision(obj1, obj2) {
      return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
      );
    }

    detectCollisions() {
      const sonicLeft = this.sonic.x;
      const sonicRight = this.sonic.x + this.sonic.width;
      const sonicTop = this.sonic.y;
      const sonicBottom = this.sonic.y + this.sonic.height;

      for (const enemy of this.enemies) {
        const enemyLeft = enemy.x;
        const enemyRight = enemy.x + enemy.width;
        const enemyTop = enemy.y;
        const enemyBottom = enemy.y + enemy.width;

        if (
          sonicLeft < enemyRight &&
          sonicRight > enemyLeft &&
          sonicTop < enemyBottom &&
          sonicBottom > enemyTop
        ) {
          this.gameOver = true;
          break;
        }
      }
    }
  }
  const game = new Game(canvas.width, canvas.height);


  let last_Time = 0;
  function startGame(time) {
    const delta = time - last_Time;
    lastTime = time;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.update(delta);
    game.draw(ctx);
    if (game.gameOver) {
      game.endGame(ctx);
      document.body.style.overflow = "visible";
      restartBtn.style.display = "block";
      cancelAnimationFrame;
    } else {
      requestAnimationFrame(startGame);
    }
  }

  startBtn.addEventListener("click", () => {
    canvas.style.display = "block";
    document.getElementById("instructions").style.display = "none";
    startBtn.style.display = "none";
    document.body.style.backgroundColor = "black";
    //gameLoop();
  });

  restartBtn.addEventListener("click", () => {
    game.score = 0;
    game.gameOver = false;
    game.sonic = new Sonic(50, 300, 50, 50, ctx);
    game.enemies = [new Enemy1(600, 355, 60, ctx), new Enemy1(900, 355, 60, ctx)];
    canvas.style.display = "block";
    document.getElementById("instructions").style.display = "none";
    restartBtn.style.display = "none";
    document.body.style.overflow = "hidden";
    startGame(0);
  });

  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "ArrowLeft":
        game.sonic.moveLeft();
        break;
      case "ArrowRight":
        game.sonic.moveRight();
        break;
      case "Space":
        game.sonic.jump();
        break;
    }
  });

  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchmove", handleTouchMove, false);
  let xDown = null;
  let yDown = null;

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        game.sonic.moveLeft();
      } else {
        game.sonic.moveRight();
      }
    } else if (yDiff < 0) {
      game.sonic.jump();
    }

    xDown = null;
    yDown = null;
  }
}
