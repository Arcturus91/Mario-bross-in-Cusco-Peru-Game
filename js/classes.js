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

    this.sprites = {
      stand: {
        right: "images/spriteMarioStandRight.png",
        left: "images/spriteMarioStandLeft.png",
        cropWidth:398,
        width: 398 * this.scale,
      },
      run: {
        right: "images/spriteMarioRunRight.png",
        left: "images/spriteMarioRunLeft.png",
        cropWidth: 398,
        width:  398 * this.scale,
      },
      jump: {
        right: "images/spriteMarioJumpRight.png",
        left: "images/spriteMarioJumpLeft.png",
        cropWidth: 398,
        width:  398 * this.scale,
      }
    };
    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = this.sprites.stand.cropWidth;
    //mayor reto

    this.img = new Image();
    this.img.src = this.currentSprite;
    this.img.width = this.currentCropWidth;
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
        this.currentSprite === this.sprites.stand.left)
    ) {
      this.framesImg = 0;
    }
    //FRAME control for running
    else if (
      this.framesImg > 28 &&
      (this.currentSprite === this.sprites.run.right ||
        this.currentSprite === this.sprites.run.left)
    ) {
      this.framesImg = 0;
    } else if(this.currentSprite === this.sprites.jump.right ||
      this.currentSprite === this.sprites.jump.left){
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
  constructor({ x, y,source,block}) {
    this.position = {
      x: x,
      y: y,
    };

    this.img = new Image();

    this.img.src = source;

    this.width = 660 / 4;

    this.height = 200 / 4;
    this.block = block
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
  constructor({ x, y }) {
    this.position = {
      x: x,
      y: y,
    };

    this.img = new Image();

    this.img.src = "images/hills.png";
    this.width = 7545;
    this.height = 592;
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

    this.width = 43.33;
    this.height = 50;

    this.framesImg = 0;

    this.img = new Image();
    this.img.src = "images/spriteGoomba.png";

    this.distance = distance;
  }

  draw() {
    ctx.drawImage(
      this.img,
      130 * this.framesImg, //segun los pixeles, tu puedes dar desde dónde vas a cortar, y luego
      0, // hasta donde. Mira abajo: hay dimensiones indicando hasta dónde cortar
      130,
      150,

      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.framesImg++;

    if (this.framesImg > 59) {
      this.framesImg = 0;
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
  constructor({ position, speed, radius }) {
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
    ctx.fillStyle = "red";
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
