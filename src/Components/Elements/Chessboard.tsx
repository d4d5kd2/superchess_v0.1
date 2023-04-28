import { ChessboardSquare } from "./ChessboardSquare";
import { useEffect, useState } from "react";
import { Stage, Container } from "@pixi/react";


interface ChessboardProps {
    width: number;
    height: number;
    x: number;
    y: number;
    onGridItemClick: (id: number) => void;
}



export const Chessboard: React.FC<ChessboardProps> = ({width, height}) => {
    const [squares, setSquares] = useState<{ [key: number]: { revealed: boolean, type: string, value: number | null } }>({});
 

  
    // Function to update the revealed status of a square
    const setRevealed = (id: number, revealed: boolean, type: string, value: number | null ) => {
      setSquares(prevSquares => ({
        ...prevSquares,
        [id]: {
          revealed,
          type,
          value,
        },
      }));
    };

    // Render ChessboardSquare components in a loop
    const renderSquares = () => {
      const squareComponents = [];
  
      for (let i = 1; i <= 64; i++) { // assuming 8x8 grid
        const squareData = squares[i] || { revealed: false, type: "", value: null };
        squareComponents.push(
          <ChessboardSquare
                key={i}
                x={(i - 1) % 8 * 100}
                y={Math.floor((i - 1) / 8) * 100}
                width={100}
                height={100}
                id={i}
                revealed={squareData.revealed}
                type={squareData.type}
                value={squareData.value}
                setRevealed={setRevealed}
                />
        );
      }
  
      return squareComponents;
    };
  
    return (
      <>
          {/* ... */}
          <Container width={width} height={800} x={200} y={200}>
            {/* Render all squares */}
            {renderSquares()}
          </Container>
      </>
    );
  };