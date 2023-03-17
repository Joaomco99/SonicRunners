window.onload = () => {
  

  
  document.getElementById('start-button').onclick = () => {
    startGame();
    document.getElementById('start-button').style.display = 'none';
  };
  

  const canvas = document.getElementById('canvas');

  const ctx = canvas.getContext('2d');


  const road = new Image();

  road.src = 'images/landscape.jpeg';
 

  const sonic = new Sonic(

    canvas.width / 2 - 25,

    canvas.height - 110,

    50,
    100,
    ctx
  );

  function startGame() {
    
    document.querySelector('.game-intro').style.display = 'none';
    document.querySelector('.arrow-img').style.display = 'none';

    let frames = 0;

    let score = 0;

    let obstacles = [];


    const gameInterval = setInterval(() => {
 
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(road, 0, 0, canvas.width, canvas.height);
 
      sonic.draw();
      sonic.update();

      obstacles.forEach((obstacle) => {
        obstacle.draw();
        obstacle.move();
      });

      



      frames++;

const minFrames = 150;
const maxFrames = 200;

const framesBetweenObstacles = {
  obstacle1: Math.floor(Math.random() * (maxFrames - minFrames + 1)) + minFrames,
  obstacle2: Math.floor(Math.random() * (maxFrames - minFrames + 1)) + minFrames,
  obstacle3: Math.floor(Math.random() * (maxFrames - minFrames + 1)) + minFrames,
};

if (frames % framesBetweenObstacles.obstacle1 === 0 && obstacles.every(obstacle => frames > obstacle.framesUntilNext)) {
  const obstacle1 = new Obstacle1(700, 600, 500, ctx);
  obstacle1.framesUntilNext = frames + framesBetweenObstacles.obstacle1;
  obstacles.push(obstacle1);
}

if (frames % framesBetweenObstacles.obstacle2 === 0 && obstacles.every(obstacle => frames > obstacle.framesUntilNext)) {
  const obstacle2 = new Obstacle2(900, 700, 800, ctx);
  obstacle2.framesUntilNext = frames + framesBetweenObstacles.obstacle2;
  obstacles.push(obstacle2);
}

if (frames % framesBetweenObstacles.obstacle3 === 0 && obstacles.every(obstacle => frames > obstacle.framesUntilNext)) {
  const obstacle3 = new Obstacle3(900, 800, 900, ctx);
  obstacle3.framesUntilNext = frames + framesBetweenObstacles.obstacle3;
  obstacles.push(obstacle3);
}


      obstacles.forEach((obstacle1, index) => {

        if (sonic.x < obstacle1.x + obstacle1.width &&
          sonic.x + sonic.width > obstacle1.x &&

          sonic.y < obstacle1.y + obstacle1.height &&
          sonic.y + sonic.height > obstacle1.y) {


          console.log('collision detected!');


          clearInterval(gameInterval);
          document.getElementById('restart-button').style.display = 'block';


          ctx.fillStyle = 'black';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.font = '50px Arial';
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';  // set textAlign to center
          ctx.fillText('Game Over', canvas.width / 2, 200);
          ctx.font = '30px Arial';
          ctx.fillText(`Score: ${score}`, canvas.width / 2, 250);
          

        }


        if (obstacle1.y > canvas.height) {

          obstacles.splice(index, 1);

        }

      });



      


      ctx.font = '30px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText(`Score: ${score}`, 70, 50);

      if (frames % 10 === 0) {
        score++;
      }
    }
      , 1000 / 60);

  }

  let gameInterval = null;
document.getElementById('restart-button').onclick = () => {
  startGame();
  score = 0; // Reset the score
  obstacles = []; // Reset the obstacles
  document.getElementById('restart-button').style.display = 'none';
};

  

  document.addEventListener('keydown', (event) => {
    switch (event.code) {
   
      case "ArrowUp":
        sonic.jump();
        break;
    }

    if (sonic.y < 0) {
      sonic.x = 0;
    }
    if (sonic.y > canvas.height - sonic.height) {
      sonic.y = canvas.height - sonic.height;
    }
  });


};





