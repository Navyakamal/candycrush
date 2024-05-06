import React, { useEffect, useState } from 'react'
import BlueCandy from "./images/blank.png"
import GreenCandy from "./images/green-candy.png"
import OrangeCandy from "./images/orange-candy.png"
import PurpleCandy from "./images/purple-candy.png"
import RedCandy from "./images/red-candy.png"
import yellowCandy from "./images/yellow-candy.png"
import blank from "./images/blank.png"
import candy_crush from "./candy_crush_sound3.mp3"
import tiffi from "./images/tiffi.gif"
import Score from './Score'

const width=8;
// const Candy=new Audio(candy_crush);
const candyColors=[
    BlueCandy,
    GreenCandy,
    OrangeCandy,
    PurpleCandy,
    RedCandy,
    yellowCandy
]
function Game() {
    const [currentColorArrangement,setcurrentColorArrangement]=useState([])
    const [squareBeingDragged,setSquarebeingDragged]=useState(null);
    const [squareBeingReplaced,setSquarebeingReplaced]=useState(null);
    const[score,setScore]=useState(0);
    const[dancing,setDancing]=useState(null)

    const createBoard=()=>{
        const randomColorArrangement=[]
        for(let i=0;i<width*width;i++){
            const randomColor=candyColors[Math.floor(Math.random() * candyColors.length)]
            randomColorArrangement.push(randomColor);
          }
          setcurrentColorArrangement(randomColorArrangement);
      }
      const checkForColumnOfThree=()=>{
        for(let i=0;i<=47;i++){
           const columnOfThree=[i,i + width,i + width *2]
           const decidedColor=currentColorArrangement[i]
           const isBlank=currentColorArrangement[i]===blank
  
           if(columnOfThree.every(square=>currentColorArrangement[square]===decidedColor && !isBlank)){
              setScore((score)=>score+3)
              columnOfThree.forEach(square=>currentColorArrangement[square]=blank)
              return true
           }
        }
     }
     const checkForColumnOfFour=()=>{
      for(let i=0;i<=39;i++){
         const columnOfFour=[i,i + width,i + width *2,i+ width *3]
         const decidedColor=currentColorArrangement[i]
         const isBlank=currentColorArrangement[i]===blank
         if(columnOfFour.every(square=>currentColorArrangement[square]===decidedColor && !isBlank)){
           setScore((score)=>score+4)
           columnOfFour.forEach(square=>currentColorArrangement[square]=blank)
            return true
  
         }
      }
   }
   const checkForRowOfThree=()=>{
      for(let i=0;i<64;i++){
         const rowOfThree=[i,i + 1,i+2]
         const decidedColor=currentColorArrangement[i]
         const isBlank=currentColorArrangement[i]===blank
         const notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
         if(notValid.includes(i)) continue
         if(rowOfThree.every(square=>currentColorArrangement[square]===decidedColor && !isBlank)){
           setScore((score)=>score+3)
           rowOfThree.forEach(square=>currentColorArrangement[square]=blank)
          return true
  
         }
      }
   }
   const checkForRowOfFour=()=>{
      for(let i=0;i<64;i++){
         const rowOfFour=[i,i + 1,i + 2,i+3]
         const decidedColor=currentColorArrangement[i]
         const isBlank=currentColorArrangement[i]===blank
  
         const notValid=[5,13,21,29,37,45,53,62,6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
         if(notValid.includes(i)) continue
  
         if(rowOfFour.every(square=>currentColorArrangement[square]===decidedColor && !isBlank)){
           setScore((score)=>score+4)
           rowOfFour.forEach(square=>currentColorArrangement[square]=blank)
            return true
  
         }
      }
   }
   const moveIntoSquareBelow=()=>{
      const firstRow=[0,1,2,3,4,5,6,7]
      for(let i=0;i<55;i++){
        const isFirstRow=firstRow.includes(i)
        if(isFirstRow && currentColorArrangement[i]===blank)
        {
            let randomNumber=Math.floor(Math.random()*candyColors.length)
            currentColorArrangement[i]=candyColors[randomNumber];
        }
        if((currentColorArrangement[i+width])==blank){
            currentColorArrangement[i+width]=currentColorArrangement[i]
            currentColorArrangement[i]=blank
        }
      }
 }
 const dragStart=(e)=>{
   //  console.log("DragStart");
    setSquarebeingDragged(e.target)
 }
 const dragEnd=(e)=>{
   //  console.log("DragEnd");
    const squareBeingDraggedId =parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId=parseInt(squareBeingReplaced.getAttribute('data-id'))
    currentColorArrangement[squareBeingReplacedId]=squareBeingDragged.getAttribute('src')
    currentColorArrangement[squareBeingDraggedId]=squareBeingReplaced.getAttribute('src')

   //  console.log('squareBeingDraggedId',squareBeingDraggedId);
   //  console.log('squareBeingReplacedId',squareBeingReplacedId);
    const validMoves=[
        squareBeingDraggedId-1,
        squareBeingDraggedId-width,
        squareBeingDraggedId+1,
        squareBeingDraggedId+width,
   ]
   const validMove=validMoves.includes(squareBeingReplacedId)
   const isColumnOfFour= checkForColumnOfFour()
   const isColumnOfThree=   checkForColumnOfThree()
   const isRowOfFour=  checkForRowOfFour()
   const isRowOfThree=  checkForRowOfThree()
   if(squareBeingReplacedId && validMove &&(isColumnOfFour ||isColumnOfThree ||isRowOfFour||isRowOfThree)){
    setSquarebeingDragged(null)
    setSquarebeingReplaced(null)
   }
   else{
    currentColorArrangement[squareBeingReplacedId]=squareBeingReplaced.getAttribute('src')
    currentColorArrangement[squareBeingDraggedId]=squareBeingDragged.getAttribute('src')
    setcurrentColorArrangement([...currentColorArrangement])
   }

}
 const dragDrop=(e)=>{
   //  console.log(e.target);
    setSquarebeingReplaced(e.target)

 }
   useEffect(()=>{
    createBoard();
    
},[])
useEffect(()=>{

  const timer=setInterval(()=>{

    checkForColumnOfFour()
    checkForColumnOfThree()
    checkForRowOfThree()
    checkForRowOfFour()
    moveIntoSquareBelow()
   setcurrentColorArrangement([...currentColorArrangement])
   
},100)
return ()=>clearInterval(timer)
},[checkForColumnOfFour,checkForColumnOfThree,checkForRowOfThree,checkForRowOfFour,moveIntoSquareBelow,currentColorArrangement])
useEffect(()=>{
if(score>150){
setDancing(<img src={tiffi} style={{height:'110px',width:'110px'}} />)
}
else{
setDancing(null)
}
},[score])

return(
<div className='back'>
   <div style={{float:'right'}}>
     <img src="https://i.postimg.cc/LXpH96jN/candy-crush-soda-candy-crush.gif" style={{height:'100px',width:'100px'}}/>
    </div>
<div className='board'>
<audio autoPlay loop>
     <source src={candy_crush}  type='audio/mp3'/>
 </audio>
 <div className='game'>
 {currentColorArrangement.map((candyColors,index) => (
              <img
              key={index}
              src={candyColors}
              style={{backgroundColor:candyColors}}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
          />
        ))}
       
      </div>
  </div>
   <div className='gameBoard'>
      <Score score={score}></Score>
   </div>
   <div style={{marginBottom:'0px', height:''}}>
        {dancing}
   </div>
    </div>
   //  </div>
  )
}

export default Game