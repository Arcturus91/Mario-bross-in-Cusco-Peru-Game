class Background {
  constructor(x) {
    this.x = x;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image(); //esta es nativa de JS.
    //ahora img vale = {src:"",onload:()=>{},}
    this.img.src = "images/finalBg5.png";
  }
  //metodos:
  draw() {
    if (this.x < -canvas.width) {
      this.x = 0;
    }
    // mueve el canvas:
    //this.x --
    //dibujo el primer canvas
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    //agregamos otra imagen:
    ctx.drawImage(
      this.img,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
    //una atrás
    ctx.drawImage(
      this.img,
      this.x - this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

class Player {
  constructor() {
    this.velocity = 5;
    this.position = {
      x: 100,
      y: 50,
    };
    this.scale = 0.3;
    this.width = 398 * this.scale;
    this.height = 353 * this.scale;
    this.speed = {
      x: 0,
      y: 0,
    };

    this.framesImg = 0;
    this.invincible = false
    this.lifes = 100

    this.sprites = {
      stand: {
        right: "images/spriteMarioStandRight.png",
        left: "images/spriteMarioStandLeft.png",
        fireFlower: {
          right: "images/spriteFireFlowerStandRight.png",
          left: "images/spriteFireFlowerStandLeft.png",
        },
        cropWidth: 398,
        width: 398 * this.scale,
      },
      run: {
        right: "images/spriteMarioRunRight.png",
        left: "images/spriteMarioRunLeft.png",
        fireFlower: {
          right: "images/spriteFireFlowerRunRight.png",
          left: "images/spriteFireFlowerRunLeft.png",
        },

        cropWidth: 398,
        width: 398 * this.scale,
      },
      jump: {
        right: "images/spriteMarioJumpRight.png",
        left: "images/spriteMarioJumpLeft.png",
        fireFlower: {
          right: "images/spriteFireFlowerJumpRight.png",
          left: "images/spriteFireFlowerJumpLeft.png",
        },
        cropWidth: 398,
        width: 398 * this.scale,
      },
    };
    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = this.sprites.stand.cropWidth;
    //mayor reto

    this.img = new Image();
    this.img.src = this.currentSprite;
    this.img.width = this.currentCropWidth;
    this.powerUps = {
      fireFlower: false,
    };
  }
  draw() {
    ctx.drawImage(
      this.img,
      this.img.width * this.framesImg, //segun los pixeles, tu puedes dar desde dónde vas a cortar, y luego
      0, // hasta donde. Mira abajo: hay dimensiones indicando hasta dónde cortar
      this.img.width,
      353,

      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.img.src = this.currentSprite;
    this.img.width = this.currentCropWidth;

    this.framesImg++;
    //FRAME control for standing
    if (
      this.framesImg > 58 &&
      (this.currentSprite === this.sprites.stand.right ||
        this.currentSprite === this.sprites.stand.left||
        this.currentSprite === this.sprites.stand.fireFlower.right||
        this.currentSprite === this.sprites.stand.fireFlower.left
        )
    ) {
      this.framesImg = 0;
    }
    //FRAME control for running
    else if (
      this.framesImg > 28 &&
      (this.currentSprite === this.sprites.run.right ||
        this.currentSprite === this.sprites.run.left ||
        this.currentSprite === this.sprites.run.fireFlower.left||
        this.currentSprite === this.sprites.run.fireFlower.right)
    ) {
      this.framesImg = 0;
    } else if (
      this.currentSprite === this.sprites.jump.right ||
      this.currentSprite === this.sprites.jump.left||
      this.currentSprite === this.sprites.jump.fireFlower.left||
      this.currentSprite === this.sprites.jump.fireFlower.right
      
    ) {
      this.framesImg = 0;
    }

    /*  the amount of pictures you have) */
    this.draw();
    this.position.y += this.speed.y;
    this.position.x += this.speed.x;
    if (
      this.position.y + this.height + this.speed.y <=
      //this.speed.y debería ser cambiado por el valor al que vas a chocar en tierra
      canvas.height
    ) {
      this.speed.y += gravity;
    } /* else {
      this.speed.y = 0;
    } we want our player to keep falling down */

    if (this.position.x < 100) {
      this.position.x = 100;
    }
  }
}

class Platform {
  constructor({
    x,
    y,
    source,
    picDim = {
      w: 165,
      h: 50,
    },
  }) {
    this.position = {
      x: x,
      y: y,
    };

    this.img = new Image();

    this.img.src = source;

    this.width = picDim.w;

    this.height = picDim.h;
  }
  draw() {
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class GenericObject {
  constructor({ x, y,sourcebg="images/machuP.png",w=614,h=650 }) {
    this.position = {
      x: x,
      y: y,
    };

    this.img = new Image();

    this.img.src = sourcebg;
    this.width = w;
    this.height = h;
    //machuP tiene w 614 , h 650
  }
  draw() {
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class Enemy {
  constructor({
    position,
    speed,
    distance = {
      limit: 50,
      travel: 0,
    }, // default value
  }) {
    //aqui metes 1 object1o con items.
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.speed = {
      x: speed.x,
      y: speed.y,
    };
    this.scale = 0.7;
    this.width = 130 * this.scale;
    this.height = 190 * this.scale;

    this.framesImg = 0;
    this.now = now;
    this.then = then;
    this.count = count;

    this.img = new Image();
    this.img.src = "images/soldier1.png";

    this.distance = distance;
  }

  draw() {
    ctx.drawImage(
      this.img,
      130 * this.framesImg, //segun los pixeles, tu puedes dar desde dónde vas a cortar, y luego
      0, // hasta donde. Mira abajo: hay dimensiones indicando hasta dónde cortar
      130,
      190,

      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.now = Date.now();
    let difference = this.now - this.then;
    if (difference > 100) {
      this.count++;
      this.then = this.now;
      this.framesImg++;

      if (this.framesImg >= 9) {
        this.framesImg = 0;
      }
    }
    this.draw();

    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //gravity section
    if (this.position.y + this.height + this.speed.y <= canvas.height) {
      this.speed.y += gravity;
    }

    //walk the enemy back and forth
    this.distance.travel += Math.abs(this.speed.x);
    if (this.distance.travel > this.distance.limit) {
      this.distance.travel = 0;
      this.speed.x = -this.speed.x;
    }
  }
}

class Particle {
  //propiedades
  constructor({ position, speed, radius,color ="red",
fireball=false}) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.speed = {
      x: speed.x,
      y: speed.y,
    };

    this.radius = radius;
    this.ttl = 300; //frames living.

    this.color = color
    this.fireball =fireball
  }


  //métodos:

  draw() {
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.ttl--;
    this.draw();
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //gravity section
    if (this.position.y + this.radius + this.speed.y <= canvas.height) {
      this.speed.y += gravity * 0.2;
    }
  }
}

class FoodP {
  constructor(
    { position, speed } // default value
  ) {
    //aqui metes 1 object1o con items.
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.speed = {
      x: speed.x,
      y: speed.y,
    };
    this.scale = 0.7;
    this.width = 200 * this.scale;
    this.height = 200 * this.scale;

    this.framesImg = 0;
    this.now = now;
    this.then = then;
    this.count = count;

    this.img = new Image();
    this.img.src = "images/lomito.png";
    //"/images/chiliSprite1.png"; para el chile
  }

  draw() {
    ctx.drawImage(
      this.img,
      200 * this.framesImg, //segun los pixeles, tu puedes dar desde dónde vas a cortar, y luego
      0, // hasta donde. Mira abajo: hay dimensiones indicando hasta dónde cortar
      200,
      200,

      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.now = Date.now();
    let difference = this.now - this.then;
    if (difference > 200) {
      this.count++;
      this.then = this.now;
      this.framesImg++;

      if (this.framesImg >= 9) {
        this.framesImg = 0;
      }
    }

    this.draw();

    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //gravity section
    if (this.position.y + this.height + this.speed.y <= canvas.height) {
      this.speed.y += gravity;
    }
  }
}

class FoodT {
  constructor(
    { position, speed } // default value
  ) {
    //aqui metes 1 object1o con items.
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.speed = {
      x: speed.x,
      y: speed.y,
    };
    this.scale = 0.5;
    this.width = 200 * this.scale;
    this.height = 200 * this.scale;

    this.framesImg = 0;
    this.now = now;
    this.then = then;
    this.count = count;

    this.img = new Image();
    this.img.src = "images/tacos.png";
    //"/images/chiliSprite1.png"; para el chile
  }

  draw() {
    ctx.drawImage(
      this.img,
      200 * this.framesImg, //segun los pixeles, tu puedes dar desde dónde vas a cortar, y luego
      0, // hasta donde. Mira abajo: hay dimensiones indicando hasta dónde cortar
      200,
      200,

      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.now = Date.now();
    let difference = this.now - this.then;
    if (difference > 100) {
      this.count++;
      this.then = this.now;
      this.framesImg++;

      if (this.framesImg >= 9) {
        this.framesImg = 0;
      }
    }
    this.draw();

    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //gravity section
    if (this.position.y + this.height + this.speed.y <= canvas.height) {
      this.speed.y += gravity;
    }
  }
}

class Condor {
  constructor(
    { position, speed } // default value
  ) {
    //aqui metes 1 object1o con items.
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.speed = {
      x: speed.x,
      y: speed.y,
    };
    this.scale = 0.5;
    this.width = 488 * this.scale;
    this.height = 210 * this.scale;

    this.framesImg = 0;
    this.now = now;
    this.then = then;
    this.count = count;

    this.img = new Image();
    this.img.src = "images/condor.png";
    //"/images/chiliSprite1.png"; para el chile
  }

  draw() {
    ctx.drawImage(
      this.img,
      488 * this.framesImg, //segun los pixeles, tu puedes dar desde dónde vas a cortar, y luego
      0, // hasta donde. Mira abajo: hay dimensiones indicando hasta dónde cortar
      488,
      210,

      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.now = Date.now();
    let difference = this.now - this.then;
    if (difference > 100) {
      this.count++;
      this.then = this.now;
      this.framesImg++;

      if (this.framesImg >= 10) {
        this.framesImg = 0;
      }
    }
    this.draw();

    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}

class Llama {
  constructor(
    { position, speed } // default value
  ) {
    //aqui metes 1 object1o con items.
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.speed = {
      x: speed.x,
      y: speed.y,
    };
    this.scale = 0.5;
    this.width = (10620/60) * this.scale;
    this.height = 300 * this.scale;

    this.framesImg = 0;
    this.now = now;
    this.then = then;
    this.count = count;

    this.img = new Image();
    this.img.src = "images/standingLlamaLeft3.png";
    
  }
//10620 × 300
  draw() {
    ctx.drawImage(
      this.img,
      (10620/60) * this.framesImg, //segun los pixeles, tu puedes dar desde dónde vas a cortar, y luego
      0, // hasta donde. Mira abajo: hay dimensiones indicando hasta dónde cortar
      (10620/60),
      300,

      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.now = Date.now();
    let difference = this.now - this.then;
    if (difference > 200) {
      this.count++;
      this.then = this.now;
      this.framesImg++;

      if (this.framesImg >= 2) {
        this.framesImg = 0;
      }
    }
    this.draw();

    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}

class HealthBar {

  constructor(x,y,w,h,maxHealth,color){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.maxHealth=maxHealth;
    this.maxWidth=w;
    this.health = maxHealth;
    this.color=color;
  }

draw(){
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#333";
  ctx.fillStyle = this.color
  ctx.fillRect(this.x, this.y, this.w, this.h);
  ctx.strokeRect(this.x, this.y, this.maxWidth, this.h)
}

update() {
  this.draw();
  console.log("si me pintan")
}

}
