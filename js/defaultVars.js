const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


function isOnTopOfPlatform({object,platform}){
  return (  object.position.y + object.height <= platform.position.y &&
    object.position.y + object.height + object.speed.y >=
      platform.position.y &&
    object.position.x + object.width >= platform.position.x &&
    object.position.x <= platform.position.x + platform.width)
}

function collisionTop({object1,object2}){

  return (  object1.position.y + object1.height <= object2.position.y &&
    object1.position.y + object1.height + object1.speed.y >=
      object2.position.y &&
    object1.position.x + object1.width >= object2.position.x &&
    object1.position.x <= object2.position.x + object2.width)
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

/* 
    const beginningPlat = [new Platform({
        x: 30,
        y: 550,
      }),
      new Platform({
        x: 150*2,
        y: 550,
      })] */
/* 
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
  ]; */


