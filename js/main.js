window.onload = function () {
  const bg = new Background(0);

  const player = new Player();

  const genericObjects = [new GenericObject({ x: 0, y: 0 })];

  document.getElementById("start-button").onclick = function () {
    if (!requestId) {
      console.log("funciono");
      startGame();
    }
  };

  function startGame() {
    requestId = requestAnimationFrame(updateGame);
  }

  //

  function updateGame() {
    frames++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bg.draw();
    genericObjects.forEach((genericObject) => {
      genericObject.draw();
    });

    generatePlatforms();
    drawPlatforms();

    player.update();

    //controls section
    //rigth and left
    if (keys.right.pressed && player.position.x < 400) {
      player.speed.x = player.velocity;
      player.currentSprite = player.sprites.run.right
    } else if (
      (keys.left.pressed && player.position.x > 100) ||
      (keys.left.pressed && player.position.x > 0)
    ) {
      player.speed.x = -player.velocity;
    } else {
      player.speed.x = 0;

      if (keys.right.pressed) {
        scrollOffset += player.velocity;
        bg.x -= 5;
        platforms.forEach((platform) => {
          platform.position.x -= player.velocity;
        });

        genericObjects.forEach((genericObject) => {
          genericObject.position.x -= player.velocity * 0.66;
        });
      } else if (keys.left.pressed) {
        bg.x += 5;
        scrollOffset -= player.velocity;
        platforms.forEach((platform) => {
          platform.position.x += player.velocity;
        });

        genericObjects.forEach((genericObject) => {
          genericObject.position.xd += player.velocity * 0.66;
        });
      }
    }

    console.log(player.position.x , player.speed.x);
    //up section
    /*     if (keys.up.pressed && player.position.y > 0) {
        player.speed.y += 5;
      } 
       else {
        player.speed.y = 0;
      } */

    //platform collision detection section

    platforms.forEach((platform) => {
      if (
        player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.speed.y >=
          platform.position.y &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width
      ) {
        player.speed.y = 0;
      }
    });

    //loose condition
    if (player.position.y > canvas.height) {
      gameOver();
    }

    if (requestId) {
      requestAnimationFrame(updateGame); //v1.2
    }
  }

  function gameOver() {
    ctx.font = "50px Arial";
    ctx.fillText("Perdiste, refresh the page", 400, 400, 400, 400);
    requestId = undefined;
  }

  function generatePlatforms() {
    let positionRandom = 100;
    let positionFloor = 550;

    if (frames < 5) {
      let platform1 = new Platform({
        x: positionRandom,
        y: positionFloor,
      });
      platforms.push(platform1);
    }

    if (!(frames % 20 === 0)) {
      return true;
    }

    positionRandom +=
      frames * 15 + Math.floor(Math.random() * (canvas.width * 0.6));
    positionFloor = 550;
    //for the floor
    const platform2 = new Platform({
      x: positionRandom + 200,
      y: positionFloor,
    });

    //for the platforms in the air
    let positionRandomY = 0;
    positionRandomY += Math.floor(Math.random() * (canvas.height * 0.7));
    const platform1 = new Platform({ x: positionRandom, y: positionRandomY });

    platforms.push(platform2, platform1);
  }

  function drawPlatforms() {
    platforms.forEach((item, index_platform) => {
      if (item.position.x + item.width <= 0) {
        points++;

        platforms.splice(index_platform, 1);
      }

      item.draw();
    });

    /* if((platforms.length % 100 === 0)){
platforms.splice(0,10)
console.log(platforms);
  }; Porqué no borra los primeros?*/
  }

  if (requestId) {
    updateGame();
  }

  addEventListener("keydown", (event) => {
    switch (event.keyCode) {
      case 65:
        console.log("this is left");
        keys.left.pressed = true;
        break;

      case 83:
        console.log("this is down");

        break;

      case 68:
        console.log("this is right");
        console.log(player.currentSprite)
        keys.right.pressed = true;
        player.currentSprite = player.sprites.run.right
        console.log(player.currentSprite)
        break;

      case 87:
        console.log("this is key up down");
        player.speed.y -= 20;
        break;
    }
  });

  addEventListener("keyup", (event) => {
    switch (event.keyCode) {
      case 65:
        console.log("this is left");
        keys.left.pressed = false;
        break;

      case 83:
        console.log("this is down");
        break;

      case 68:
        console.log("this is right");
        keys.right.pressed = false;
        
        break;

      case 87:
        break;
    }
  });
};

//a 65
//s 83
//d 68
//w 87
