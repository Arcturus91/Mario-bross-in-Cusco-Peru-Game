class Background {
  constructor(x) {
    this.x = x;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image(); //esta es nativa de JS.
    //ahora img vale = {src:"",onload:()=>{},}
    this.img.src = "images/finalBg3.png";
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
    this.width = 66;
    this.height = 150;
    this.speed = {
      x: 0,
      y: 0,
    };

    this.framesImg = 0;

    this.sprites = {
      stand: {
        right: "images/spriteStandRight.png",
        left: "images/spriteStandLeft.png",
        cropWidth: 177,
        width: 66,
      },
      run: {
        right: "images/spriteRunRight.png",
        left: "images/spriteRunLeft.png",
        cropWidth: 341,
        width: 127.875,
      },
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
      400,

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
      this.framesImg > 59 &&
      (this.currentSprite === this.sprites.stand.right||this.currentSprite === this.sprites.stand.left)
    ) {
      this.framesImg = 0;
    } 
    //FRAME control for running
    else if (
      this.framesImg > 29 &&
      (this.currentSprite === this.sprites.run.right ||
        this.currentSprite === this.sprites.run.left )
    ) {
      this.framesImg = 0;
    } /*  the amount of pictures you have) */
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
  constructor({ x, y }) {
    this.position = {
      x: x,
      y: y,
    };

    this.img = new Image();

    this.img.src = "images/platformF.png";
    this.width = this.img.width / 2;

    this.height = this.img.height / 3.5;
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
