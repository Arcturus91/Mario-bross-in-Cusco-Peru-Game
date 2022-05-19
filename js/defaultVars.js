const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


function isOnTopOfPlatform({object,platform}){
  return (  object.position.y + object.height <= platform.position.y &&
    object.position.y + object.height + object.speed.y >=
      platform.position.y &&
    object.position.x + object.width-15 >= platform.position.x &&
    object.position.x+15 <= platform.position.x + platform.width)
}

function collisionTop({object1,object2}){

  return (  object1.position.y + object1.height <= object2.position.y &&
    object1.position.y + object1.height + object1.speed.y >=
      object2.position.y &&
    object1.position.x + object1.width >= object2.position.x &&
    object1.position.x <= object2.position.x + object2.width)
}

function isOnTopOfPlatformCircle({object,platform}){
  return (  object.position.y + object.radius <= platform.position.y &&
    object.position.y + object.radius  + object.speed.y >=
      platform.position.y &&
    object.position.x + object.radius >= platform.position.x &&
    object.position.x <= platform.position.x + platform.width)
}


function objectsTouch({object1,object2}){
  return ( 
  object1.position.x + object1.width >= object2.position.x &&
    object1.position.x <= object2.position.x + object2.width &&

    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y <= object2.position.y + object2.height
    
    )
}


let frames=0
let points = 0
let lastKey


let scrollOffset = 0


const gravity = 0.5

const keys = {
    right: {
        pressed:false
    }
    ,
    left: {
        pressed:false
    }
}





const platforms = [

    ]

let requestId 

//frame control

let then = Date.now();
let now;
let count = 0;




//audio:
const audio = new Audio ();
//vamos a colocar el audio :

audio.src = "audio/condorPasa.mp3"
audio.loop = true;





/* 



    

    

    new Enemy({
      //aqui metes 1 objeto con 2 itesm
      position: {
        x: 1200,
        y: -500,
      },
      speed: {
        x: -0.2,
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
        x: 1500,
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
        x: 1070,
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
 */