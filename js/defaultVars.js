const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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