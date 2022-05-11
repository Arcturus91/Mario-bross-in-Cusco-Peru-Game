window.onload = function () {

  const bg = new Background(0);

  const player = new Player();

  const genericObjects = [new GenericObject({x:0,y:0})]

  const platforms = [

    new Platform({
        x: 30,
        y: 550,
      }),
      new Platform({
        x: 150*2,
        y: 550,
      }),

    new Platform({
      x: 130,
      y: 300,
    }),
    new Platform({
      x: 440,
      y: 400,
    }),
    new Platform({
      x: 800,
      y: 300,
    }),
    new Platform({
      x: 130 + canvas.width,
      y: 300,
    }),
    new Platform({
      x: 440 + canvas.width,
      y: 400,
    }),
    new Platform({
      x: 800 + canvas.width,
      y: 300,
    }),
  ];

  function animate() {
    frames++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    bg.draw();
    genericObjects.forEach(genericObject =>{
        genericObject.draw()
    })
  

    platforms.forEach((platform) => {
      platform.draw();
    });

    player.update();

    //controls section
    //rigth and left
    if (keys.right.pressed && player.position.x < 400) {
      player.speed.x = 5;
    } else if (keys.left.pressed && player.position.x > 100) {
      player.speed.x = -5;
    } else {
      player.speed.x = 0;



      if (keys.right.pressed) {
        bg.x -= 5;
        platforms.forEach((platform) => {
          platform.position.x -= 5;
        })

        genericObjects.forEach(genericObject =>{
            genericObject.position.x -= 3;
        })
        
        
      } else if (keys.left.pressed) {
        bg.x += 5;
        platforms.forEach((platform) => {
          platform.position.x += 5;
        })

        genericObjects.forEach(genericObject =>{
            genericObject.position.x += 3;
        })
      }



    }

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
  }

  animate();

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
        keys.right.pressed = true;
        break;

      case 87:
        console.log("this is up");
        player.speed.y -= 5;
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
        console.log("this is up");
        player.speed.y -= 20;
        break;
    }
  });
};

//a 65
//s 83
//d 68
//w 87
