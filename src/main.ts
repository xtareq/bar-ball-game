import { RandomObjectMover } from './RandomMove'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
 <div id="board" class="board">
 <div id="ball" class="circle bg-red"></div>
 <div id="bar" class="rect bg-indigo bottom-bar"></div>
 </div>
 <br/>
 <button id="pButton" class="play-button">Play</button>

`



const playButton = document.querySelector<HTMLButtonElement>("#pButton")
const ball = document.querySelector<HTMLButtonElement>("#ball")
const bar = document.querySelector<any>("#bar")
const board = document.querySelector<any>("#board")

let moveRight = 0
let moveLeft = 250


if(playButton){
  playButton.addEventListener("click",(ev:any)=>{
    if(ev.target){
      ev.target.innerText=  ev.target.innerText == "Play" ?"Pause" :"Play"
    }
  })
}

window.addEventListener("load",()=>{
  window.addEventListener('keyup',(ev:any)=>{
     if(ev.keyCode == 37){
      
      if(moveLeft < 250){
        moveLeft += 50
        moveRight -= 50
       
      }

      if(bar.offsetLeft !== 0){
        bar.style.left = `${moveRight}px`
      }

     }
     if(ev.keyCode == 39){
      if(moveRight <250){
        moveRight += 50
        moveLeft -= 50
      }
      if(bar.offsetLeft < 250){
        bar.style.left = `${moveRight}px`
      }
     }
  })

  
  
  // Init it
  var x = new RandomObjectMover(ball, board);
  x.start();
  
})

