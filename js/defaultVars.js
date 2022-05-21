const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const winImg = new Image()
winImg.src = "images/youWin.png"


let name, xName,yName

function healthBarName(name,xName,yName) {



  ctx.font = "bold 20px Arial";
  ctx.fillStyle = "blue";
  ctx.fillText(`${name} Lifebar`, xName, yName, 400, 400);

  
}



//
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
    },
    space:{
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

 width=`${1270.1*0.9}`
          height=`${640.9*0.9}`


                    width=`${1270.1*0.9}`
          height=`${877.5*0.9}`


                    width="1270.1"
          height="465.4"
*/

