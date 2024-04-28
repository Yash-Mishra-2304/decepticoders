import Tile from '../Tile/Tile'
import './Chessboard.css'
import React, { useRef,useEffect,useState } from 'react';


const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"]

interface Piece {
    image: string;
    x: number;
    y: number;
}

const pieces: Piece[]= []

pieces.push({image: "assets/images/pawn_b.png", x: 0, y: 7})
pieces.push({image: "assets/images/pawn_b.png", x: 1, y: 7})
pieces.push({image: "assets/images/pawn_b.png", x: 0, y: 6})
pieces.push({image: "assets/images/pawn_b.png", x: 2, y: 7})
pieces.push({image: "assets/images/pawn_b.png", x: 0, y: 5})
pieces.push({image: "assets/images/pawn_b.png", x: 1, y: 6})
pieces.push({image: "assets/images/pawn_b.png", x: 3, y: 7})
pieces.push({image: "assets/images/pawn_b.png", x: 0, y: 4})
pieces.push({image: "assets/images/pawn_b.png", x: 1, y: 5})
pieces.push({image: "assets/images/pawn_b.png", x: 2, y: 6})

pieces.push({image: "assets/images/pawn_w.png", x: 7, y: 0})
pieces.push({image: "assets/images/pawn_w.png", x: 7, y: 1})
pieces.push({image: "assets/images/pawn_w.png", x: 6, y: 0})
pieces.push({image: "assets/images/pawn_w.png", x: 7, y: 2})
pieces.push({image: "assets/images/pawn_w.png", x: 5, y: 0})
pieces.push({image: "assets/images/pawn_w.png", x: 6, y: 1})
pieces.push({image: "assets/images/pawn_w.png", x: 7, y: 3})
pieces.push({image: "assets/images/pawn_w.png", x: 4, y: 0})
pieces.push({image: "assets/images/pawn_w.png", x: 5, y: 1})
pieces.push({image: "assets/images/pawn_w.png", x: 6, y: 2})



export default function Chessboard(){
    const chessboardRef = useRef<HTMLDivElement>(null);
    const [droppedPieceCoordinates, setDroppedPieceCoordinates] = useState<{ x: number, y: number } | null>(null);
    let activePiece: HTMLElement | null = null;

function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    if (element.classList.contains("chess-piece")) {
      const x = e.clientX -25;
      const y = e.clientY -25;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      /*const boardRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const boardCenter = {
        x: boardRect.left + boardRect.width / 2,
        y: boardRect.top + boardRect.height / 2,
      };
  
      const rotatedX = e.clientY - boardCenter.y + 25; 
      const rotatedY = boardCenter.x - e.clientX + 25; 
  
      element.style.position = "absolute";
      element.style.left = `${rotatedX}px`;
      element.style.top = `${rotatedY}px`;*/ 
      activePiece = element;
    }
  }
  
  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft -25;
      const minY = chessboard.offsetTop -25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 25;
      const maxY = chessboard.offsetTop + chessboard.clientWidth - 25;
      const x = e.clientX -25;
      const y = e.clientY -25;
      activePiece.style.position = "absolute";
      //activePiece.style.left = `${x}px`;
      //activePiece.style.top = `${y}px`;

      if(x < minX){
        activePiece.style.left = `${minX}px`;
      } 
      else if(x >maxX){
        activePiece.style.left = `${maxX}px`;
      }
      else{
        activePiece.style.left = `${x}px`;
      }

      if(y < minY){
        activePiece.style.top = `${minY}px`;
      } 
      else if(y > maxY){
        activePiece.style.top = `${maxY}px`;
      }
      else{
        activePiece.style.top = `${y}px`;
      }

      /*const boardRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const boardCenter = {
        x: boardRect.left + boardRect.width / 2,
        y: boardRect.top + boardRect.height / 2,
      };
  
      const rotatedX = e.clientY - boardCenter.y + 25; 
      const rotatedY = boardCenter.x - e.clientX + 25; 
  
      activePiece.style.left = `${rotatedX}px`;
      activePiece.style.top = `${rotatedY}px`;*/
    }
  }

function dropPiece(e: React.MouseEvent) {
    if(activePiece) {
        // const x=Math.abs(Math.floor((e.clientX-400)/100));
        // const y=Math.abs(Math.floor((e.clientY-400)/100));
        // const y=e.clientY;
       // const x=Math.abs(Math.floor((e.clientX-200)/100));
        //const y=Math.abs(Math.ceil((e.clientY-200)/100));
        const y=e.clientY;
        const x=e.clientX;
        setDroppedPieceCoordinates({x,y})
        activePiece = null;

    }
}
    let board = [];
    for(let j = verticalAxis.length-1; j >= 0; j--){
        for(let i = 0; i < horizontalAxis.length; i++){
            const number = j + i + 2;
            let image : string | undefined;
            pieces.forEach(p=>{
                if (p.x === i && p.y === j){
                    image = p.image;
                }

            })
            board.push(<Tile key={`${j} ${i}`} image={image} number = {number}/> );
        }
    }
    // useEffect(() => {
    //   if (chessboardRef.current) {
    //     const element = chessboardRef.current;
    //     const rect = element.getBoundingClientRect();
    //     const { top, left, bottom, right } = rect;
    //     console.log('Top:', top, 'Left:', left, 'Bottom:', bottom, 'Right:', right);
    //   }
    // }, [dropPiece]);
    useEffect(() => {
      if (droppedPieceCoordinates) {
        console.log('Dropped piece coordinates:', droppedPieceCoordinates);
      }
    }, [droppedPieceCoordinates]);
    return <div onMouseUp={(e) => dropPiece(e)} onMouseMove={(e) => movePiece(e)} onMouseDown={e => grabPiece(e)} id="chessboard" ref={chessboardRef}>{board}</div>
}