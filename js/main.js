//grabado hasta aqui!! 19:21

window.onload = function () {
  const bg = new Background(0);

  const player = new Player();

  const foodsP = [
    new FoodP({
      position: {
        x: 800,
        y: 200,
      },
      speed: {
        x: 0,
        y: 0,
      },
    }),
  ];

  const foodsT = [
    new FoodT({
      position: {
        x: 300,
        y: -400,
      },
      speed: {
        x: 0,
        y: 0,
      },
    }),
  ];

  const condor = [
    new Condor({
      position: {
        x: 770 + 4 * canvas.width,
        y: 200,
      },
      speed: {
        x: 0,
        y: 0,
      },
    }),
  ];

  let platImage = "images/platformFF.png";
  let platLongImage = "images/platformLong.png";

  const platforms = [
    new Platform({
      x: 70,
      y: 690,
      source: platLongImage,
      picDim: {
        w: 400,
        h: 70,
      },
    }),
    new Platform({
      x: 1150,
      y: 690,
      source: platLongImage,
      picDim: {
        w: 400,
        h: 70,
      },
    }),
    new Platform({
      x: 2070,
      y: 690,
      source: platLongImage,
      picDim: {
        w: 400,
        h: 70,
      },
    }),
    new Platform({
      x: 1570,
      y: 690,
      source: platLongImage,
      picDim: {
        w: 400,
        h: 70,
      },
    }),
    new Platform({
      x: 400,
      y: 530,
      source: platImage,
    }),
    new Platform({
      x: 800,
      y: 530,
      source: platImage,
    }),
    new Platform({
      x: 1200,
      y: 300,
      source: platImage,
    }),
    new Platform({
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
      x: 100 + 2 * canvas.width,
      y: 530,
      source: platImage,
    }),
    new Platform({
      x: 400 + 2 * canvas.width,
      y: 530,
      source: platImage,
    }),
    new Platform({
      x: 700 + 2 * canvas.width,
      y: 530,
      source: platImage,
    }),
    new Platform({
      x: 1200 + 2 * canvas.width,
      y: 300,
      source: platImage,
    }),
    new Platform({
      x: 800 + 2 * canvas.width,
      y: 330,
      source: platImage,
    }),
    new Platform({
      x: 300 + 2 * canvas.width,
      y: 230,
      source: platImage,
    }),
    new Platform({
      x: 1500,
      y: 230,
      source: platImage,
    }),
    new Platform({
      x: 400 + 2 * canvas.width,
      y: 330,
      source: platImage,
    }),
    new Platform({
      x: 1000 + 2 * canvas.width,
      y: 690,
      source: platLongImage,
      picDim: {
        w: 400,
        h: 70,
      },
    }),
    new Platform({
      x: 570 + 3 * canvas.width,
      y: 690,
      source: platLongImage,
      picDim: {
        w: 400,
        h: 70,
      },
    }),
    new Platform({
      x: 400 + 3 * canvas.width,
      y: 530,
      source: platImage,
    }),
    new Platform({
      x: 800,
      y: 530,
      source: platImage,
    }),
    new Platform({
      x: 600 + 3 * canvas.width,
      y: 300,
      source: platImage,
    }),
    new Platform({
      x: 570 + 4 * canvas.width,
      y: 690,
      source: platLongImage,
      picDim: {
        w: 400,
        h: 70,
      },
    }),
    new Platform({
      x: 4 * canvas.width,
      y: 230,
      source: platImage,
    }),
    new Platform({
      x: 100 + 4 * canvas.width,
      y: 530,
      source: platImage,
    }),
    new Platform({
      x: -200 + 4 * canvas.width,
      y: 450,
      source: platImage,
    }),
  ];

  const genericObjects = [
    new GenericObject({ x: 600, y: 100 }),
    new GenericObject({ x: 600 + canvas.width, y: 100 }),
  ];

  const enemies = [
    new Enemy({
      //aqui metes 1 objeto con 2 itesm
      position: {
        x: 400,
        y: -500,
      },
      speed: {
        x: -0.3, //velocidad del enemigo
        y: 0,
      },
      distance: {
        limit: 200, //limite de distancia que puede recorrer
        travel: 0,
      },
    }),
    new Enemy({
      position: {
        x: 750,
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
        x: 1200,
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
        x: 400 + canvas.width,
        y: -500,
      },
      speed: {
        x: -0.1,
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
        x: 780 + canvas.width,
        y: -500,
      },
      speed: {
        x: -0.1,
        y: 0,
      },
      distance: {
        limit: 50,
        travel: 0,
      },
    }),

    //fin
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

    condor[0].update();

    //power up pollo
    foodsP.forEach((food, index_food) => {
      if (
        objectsTouch({
          object1: player,
          object2: food,
        })
      ) {
        setTimeout(() => {
          foodsP.splice(index_food, 1);
        }, 1);
        player.lifes += 50;
      } else {
        food.update();
      }
    });
    //power up taco
    foodsT.forEach((food, index_food) => {
      if (
        objectsTouch({
          object1: player,
          object2: food,
        })
      ) {
        player.powerUps.fireFlower = true;

        setTimeout(() => {
          foodsT.splice(index_food, 1);
        }, 1);
      } else {
        food.update();
      }
    });

    console.log(player.lifes);
    //enemy rendering
    enemies.forEach((enemy, enemy_index) => {
      enemy.update();

      //fireball hit:

      //i need to make the balls only to remove the first enemy they touch
      //a method  can be to make this collision to work only when
      //a certain property is activated. once you touch one enemy, then the property turns false.

      particles.filter(particle => particle.fireball).forEach((particle, particle_index) => {
        if (
          particle.position.x + particle.radius >= enemy.position.x &&
          particle.position.y + particle.radius >= enemy.position.y &&
          particle.position.x - particle.radius<= enemy.position.x + enemy.width &&
          particle.position.y - particle.radius<= enemy.position.y + enemy.height
        )
          setTimeout(() => {
            enemies.splice(enemy_index, 1);
            particles.splice(particle_index, 1);

//explosion if fireball hit

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
      color:"orange",
      fireball:false
    })
  );
}





          }, 1);
      });

      if (
        collisionTop({
          object1: player,
          object2: enemy,
        })
      ) {


        //code for explosion when mario over soldier
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
      }

      //collision de costado tal que me quita una vida.
      else if (
        player.position.x + player.width - 15 >= enemy.position.x &&
        player.position.y + player.height >= enemy.position.y &&
        player.position.x + 15 <= enemy.position.x + enemy.width &&
        player.position.y <= enemy.position.y + enemy.height
      ) {
        if (!player.powerUps.fireFlower && !player.invincible) {
          player.lifes--;
        }

        //player hits enemy when power up on
        if (player.powerUps.fireFlower) {
          player.invincible = true;
          player.powerUps.fireFlower = false;

          setTimeout(() => {
            player.invincible = false;
          }, 2000);
        } else if (!player.invincible && player.lifes < 50) {
          console.log(player.lifes);
          gameOver();
        }
      }
    });

    particles.forEach((particle,index_particle) => {
      particle.update();

if(particle.fireball && particle.position.x - particle.radius >=
  canvas.width
  
  || particle.fireball && particle.position.x - particle.radius <=
  0
  
  ){

    setTimeout(() => {particles.splice(index_particle,1)},0)
    
  }
    });
console.log(particles)
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

        condor.forEach((item) => {
          item.position.x -= player.velocity;
        });

        foodsT.forEach((food) => {
          food.position.x -= player.velocity;
        });

        foodsP.forEach((food) => {
          food.position.x -= player.velocity;
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

    if (player.position.y < 0) {
      player.speed.y += 1;
    }

    //platform collision detection section

    platforms.forEach((platform) => {
      if (isOnTopOfPlatform({ object: player, platform: platform })) {
        player.speed.y = 0;
      }
//particle bounce
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

      foodsP.forEach((food) => {
        if (isOnTopOfPlatform({ object: food, platform: platform })) {
          food.speed.y = 0;
        }
      });

      foodsT.forEach((food) => {
        if (isOnTopOfPlatform({ object: food, platform: platform })) {
          food.speed.y = 0;
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
        //player.framesImg = 58;
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
    //condition for power up
    if (player.speed.y === 0 && player.powerUps.fireFlower) {
      console.log("me transformo");
      if (
        keys.right.pressed &&
        lastKey === "right" &&
        player.currentSprite !== player.sprites.run.fireFlower.right
      ) {
        player.currentSprite = player.sprites.run.fireFlower.right;
        player.currentCropWidth = player.sprites.run.cropWidth;
        player.width = player.sprites.run.width;
      } else if (
        !keys.right.pressed &&
        lastKey === "right" &&
        player.currentSprite !== player.sprites.stand.fireFlower.right
      ) {
        player.currentSprite = player.sprites.stand.fireFlower.right;
        player.currentCropWidth = player.sprites.stand.cropWidth;
        player.width = player.sprites.stand.width;
      } else if (
        keys.left.pressed &&
        lastKey === "left" &&
        player.currentSprite !== player.sprites.run.fireFlower.left
      ) {
        player.currentSprite = player.sprites.run.fireFlower.left;
        player.currentCropWidth = player.sprites.run.cropWidth;
        player.width = player.sprites.run.width;
      } else if (
        !keys.left.pressed &&
        lastKey === "left" &&
        player.currentSprite !== player.sprites.stand.fireFlower.left
      ) {
        player.currentSprite = player.sprites.stand.fireFlower.left;
        player.currentCropWidth = player.sprites.stand.cropWidth;
        player.width = player.sprites.stand.width;
      }
    }

    //loose condition
    if (player.position.y > canvas.height) {
      gameOver();
    }

    //win condition
    if (scrollOffset >= 5800) {
      win();
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

  function win() {
    ctx.font = "50px Arial";
    ctx.fillText(
      "Congratulations, you defended the entrance! Now lets go inside",
      400,
      400,
      400,
      400
    );
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
    //para mostrar el keycode de la tecla : console.log(event.keyCode)
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

        if (!player.powerUps.fireFlower) break;

        if (lastKey === "right") {
          player.currentSprite = player.sprites.jump.fireFlower.right;
        } else {
          player.currentSprite = player.sprites.jump.fireFlower.left;
        }
        break;

      case 32:
        if (!player.powerUps.fireFlower) {
          return;
        }

        let speedX = 15;

        if (lastKey === "left") {
          speedX = -speedX;
        }

        particles.push(
          new Particle({
            position: {
              x: player.position.x + player.width / 2,
              y: player.position.y + player.height / 2,
            },
            speed: {
              x: speedX,
              y: 0,
            },
            radius: 5,
            color: "orange",
            fireball: true
          })
        );
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
