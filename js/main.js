//grabado hasta aqui!! 19:21

window.onload = function () {
  const bg = new Background(0);

  const player = new Player();

  let platImage = "images/platformFF.png";

  let blockImage = "images/blockTri.png";

  const platforms = [
    new Platform({
      x: 100,
      y: 530,
      source: platImage,
    }),
    new Platform({
      x: 400,
      y: 530,
      source: platImage,
    }),
    new Platform({
      x: 700,
      y: 530,
      source: platImage,
    }),
    new Platform({
      x: 1200,
      y: 300,
      source: platImage,
    }),new Platform({
      x: 700,
      y: 330,
      source: platImage,
    }),
    new Platform({
      x: 300,
      y: 230,
      source: platImage,
    }),
    new Platform({
      x: 100+2*canvas.width,
      y: 530,
      source: platImage,
    }),
    new Platform({
      x: 400+2*canvas.width,
      y: 530,
      source: platImage,
    }),
    new Platform({
      x: 700+2*canvas.width,
      y: 530,
      source: platImage,
    }),
    new Platform({
      x: 1200+2*canvas.width,
      y: 300,
      source: platImage,
    }),new Platform({
      x: 700+2*canvas.width,
      y: 330,
      source: platImage,
    }),
    new Platform({
      x: 300+2*canvas.width,
      y: 230,
      source: platImage,
    }),
  ];

  /* Prefiero no tener bloques:
  new Platform({
      x: 400,
      y: 300,
      source: blockImage,
      block: true,
    }) */

  const genericObjects = [new GenericObject({ x: 0, y: 0 })];

  const enemies = [
    new Enemy({
      //aqui metes 1 objeto con 2 itesm
      position: {
        x: 800,
        y: -500,
      },
      speed: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 200,
        travel: 0,
      },
    }),
    new Enemy({
      //aqui metes 1 objeto con 2 itesm
      position: {
        x: 500,
        y: -500,
      },
      speed: {
        x: -0.3,
        y: 0,
      },
    }),
    new Enemy({
      //aqui metes 1 objeto con 2 itesm
      position: {
        x: 400,
        y: -500,
      },
      speed: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 100,
        travel: 0,
      },
    }),
    new Enemy({
      //aqui metes 1 objeto con 2 itesm
      position: {
        x: 1000,
        y: -500,
      },
      speed: {
        x: -0.3,
        y: 0,
      },
    }),
  ];

  const particles = [];

  document.getElementById("start-button").onclick = function () {
    if (!requestId) {
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

    drawPlatforms();

    //enemy rendering
    enemies.forEach((enemy, enemy_index) => {
      enemy.update();

      if (
        collisionTop({
          object1: player,
          object2: enemy,
        })
      ) {
        for (let i = 0; i < 50; i++) {
          particles.push(
            new Particle({
              position: {
                x: enemy.position.x + enemy.width / 2,
                y: enemy.position.y + enemy.height / 2,
              },
              speed: {
                x: (Math.random() - 0.5) * 7,
                y: (Math.random() - 0.5) * 15,
              },
              radius: Math.random() * 3,
            })
          );
        }

        player.speed.y -= 40;
        setTimeout(() => {
          enemies.splice(enemy_index, 1);
        }, 1);
      } else if (
        player.position.x + player.width >= enemy.position.x &&
        player.position.y + player.height >= enemy.position.y &&
        player.position.x <= enemy.position.x + enemy.width
      ) {
        gameOver();
      }
    });

    particles.forEach((particle) => {
      particle.update();
    });
    player.update();

    //controls section - scrolling code
    //rigth and left
    if (keys.right.pressed && player.position.x < 400) {
      player.speed.x = player.velocity;
      player.currentSprite = player.sprites.run.right;
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

        enemies.forEach((enemy) => {
          enemy.position.x -= player.velocity;
        });

        particles.forEach((particle) => {
          particle.position.x -= player.velocity;
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

        enemies.forEach((enemy) => {
          enemy.position.x += player.velocity;
        });

        particles.forEach((particle) => {
          particle.position.x += player.velocity;
        });
      }
    }

    //platform collision detection section

    platforms.forEach((platform) => {
      if (isOnTopOfPlatform({ object: player, platform: platform })) {
        player.speed.y = 0;
      }

      particles.forEach((particle, index_particle) => {
        if (isOnTopOfPlatformCircle({ object: particle, platform: platform })) {
          particle.speed.y = -particle.speed.y * 0.9;
          if (particle.radius - 0.4 < 0) {
            particles.splice(index_particle, 1);
          } else {
            particle.radius -= 0.4;
          }
        }

        if (particle.ttl < 0) {
          particles.splice(index_particle, 1);
        }
      });

      enemies.forEach((enemy) => {
        if (isOnTopOfPlatform({ object: enemy, platform: platform })) {
          enemy.speed.y = 0;
        }
      });
    });

    //sprite switching
    if (player.speed.y === 0) {
      if (
        keys.right.pressed &&
        lastKey === "right" &&
        player.currentSprite !== player.sprites.run.right
      ) {
        player.framesImg = 58;
        player.currentSprite = player.sprites.run.right;
        player.currentCropWidth = player.sprites.run.cropWidth;
        player.width = player.sprites.run.width;
      } else if (
        !keys.right.pressed &&
        lastKey === "right" &&
        player.currentSprite !== player.sprites.stand.right
      ) {
        player.currentSprite = player.sprites.stand.right;
        player.currentCropWidth = player.sprites.stand.cropWidth;
        player.width = player.sprites.stand.width;
      } else if (
        keys.left.pressed &&
        lastKey === "left" &&
        player.currentSprite !== player.sprites.run.left
      ) {
        player.currentSprite = player.sprites.run.left;
        player.currentCropWidth = player.sprites.run.cropWidth;
        player.width = player.sprites.run.width;
      } else if (
        !keys.left.pressed &&
        lastKey === "left" &&
        player.currentSprite !== player.sprites.stand.left
      ) {
        player.currentSprite = player.sprites.stand.left;
        player.currentCropWidth = player.sprites.stand.cropWidth;
        player.width = player.sprites.stand.width;
      }
    }

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

  function drawPlatforms() {
    platforms.forEach((item, index_platform) => {
      /*       if (item.position.x + item.width <= 0) {
        points++;

        platforms.splice(index_platform, 1);
      } */

      item.draw();
    });
  }

  if (requestId) {
    updateGame();
  }

  addEventListener("keydown", (event) => {
    switch (event.keyCode) {
      case 65:
        keys.left.pressed = true;
        lastKey = "left";
        break;

      case 83:
        break;

      case 68:
        keys.right.pressed = true;
        lastKey = "right";
        break;

      case 87:
        player.speed.y -= 20;
        if (lastKey === "right") {
          player.currentSprite = player.sprites.jump.right;
        } else {
          player.currentSprite = player.sprites.jump.left;
        }
        break;
    }
  });

  addEventListener("keyup", (event) => {
    switch (event.keyCode) {
      case 65:
        keys.left.pressed = false;
        break;

      case 83:
        break;

      case 68:
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
