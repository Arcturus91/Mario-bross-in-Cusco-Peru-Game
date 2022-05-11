const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

frames=0

console.log(ctx)



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