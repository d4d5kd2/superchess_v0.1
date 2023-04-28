import React from "react";
import { Container, Text, Sprite } from "@pixi/react";
import { GridItem } from "../../Utility/types";
import { Texture } from "pixi.js";

import CLOCK from "../../assets/images/clock.png";
import FLAG from "../../assets/images/flag.png";
import WILD_BONUS from "../../assets/images/WILD_BONUS.png";
import white_field from "../../assets/images/WHITE_FIELD.svg";
import black_field from "../../assets/images/BLACK_FIELD.svg";

import NUMBER_0 from '../../assets/images/NUM_0.png';
import NUMBER_1 from '../../assets/images/NUM_1.png';
import NUMBER_2 from '../../assets/images/NUM_2.png';
import NUMBER_3 from '../../assets/images/NUM_3.png';
import NUMBER_4 from '../../assets/images/NUM_4.png';
import NUMBER_5 from '../../assets/images/NUM_5.png';
import NUMBER_6 from '../../assets/images/NUM_6.png';
import NUMBER_7 from '../../assets/images/NUM_7.png';
import NUMBER_8 from '../../assets/images/NUM_8.png';
import NUMBER_9 from '../../assets/images/NUM_9.png';

const numberTextures = [
  Texture.from(NUMBER_0),
  Texture.from(NUMBER_1),
  Texture.from(NUMBER_2),
  Texture.from(NUMBER_3),
  Texture.from(NUMBER_4),
  Texture.from(NUMBER_5),
  Texture.from(NUMBER_6),
  Texture.from(NUMBER_7),
  Texture.from(NUMBER_8),
  Texture.from(NUMBER_9),
];







interface SquareProps {
    x: number;
    y: number;
    width: number;
    height: number;
    id: number;
    revealed: boolean;
    setRevealed: (id: number, revealed: boolean, type: string, value: number | null) => void;
    type?: string;
    symbol?: string;
    value?: number | null;
}

export const ChessboardSquare: React.FC<SquareProps> = ({ x, y, width, height, id, revealed, symbol, value, type, setRevealed }) => {

  const fetchResults = async () => {
    const response = await fetch('http://superchess-server.herokuapp.com/grid');
    const data = await response.json();
    console.log(data);
    return data;

  
    };

    const renderNumberSprites = (number: number) => {
        const digits = number.toString().split('').map(Number);
        const sprites = digits.map((digit, index) => (
            <>
          <Sprite
            key={index}
            texture={numberTextures[digit]}
            x={width /digits.length +index*120}
            y={height / 2 +90 }
            scale={{ x: 3, y: 3}}

          />
          </>
        ));
        return sprites;
      };

      const isBlackField = (id: number) => {
        const gridSize = Math.sqrt(8 * 8); // Replace with your grid size (e.g., 5, if you have a 5x5 grid)
        const row = Math.floor(id / gridSize);
        const col = id % gridSize ;
        return (row + col) % 2 === 0;
      };
    
      const fieldTexture = isBlackField(id-1) ? black_field : white_field;
    

    const handleClick = async () => {
        if(!revealed) {
        const data = await fetchResults();     
        setRevealed(id, true, data.type, data.value);   
    }}
    return (
        <>
        
        <Container scale={1} x={x} y={y} width={width} height={height} interactive={true} pointerdown={() => handleClick()}>
            {!revealed ? (
                    <>
                    <Sprite key={Math.random() *x} texture={Texture.from(fieldTexture)} />
                    </>

               
            ) : (
                <>
                {(type === "multiplier_low" ||
                  type === "multiplier_mid" ||
                  type === "multiplier_high") && (
                    <>
                   
                    <Sprite texture={Texture.from(fieldTexture)} />
                   
                    <>
                     
                        {renderNumberSprites(value!)}
                       
                    </>
                    </>
                  )}
                 {type === "clock" && (
                    <>
                    <Sprite texture={Texture.from(fieldTexture)} />

                      <Sprite texture={Texture.from(CLOCK)}/>
                    </>
                )}
                 {type === "red_flag" && (
                 <>
                     <Sprite texture={Texture.from(fieldTexture)} />
                      <Sprite texture={Texture.from(FLAG)} />
                    </>
                    )}

                {type === "free_games" && (
                <>
                    <Sprite texture={Texture.from(fieldTexture)} />
                        <Sprite texture={Texture.from(WILD_BONUS)} scale={0.9}/>
                    </> 
                    )}


          </>
        )}
        </Container>
        </>
    );
};
