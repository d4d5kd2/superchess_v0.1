import React, { useState } from 'react';
import { Container, Text, Sprite } from '@pixi/react';
import navigateWest from "../../assets/images/PNG/navigateWest.png";
import navigateEast from "../../assets/images/PNG/navigateEast.png";
import { Texture } from 'pixi.js';

import LETTER_B from '../../assets/images/LETTER_B.png';
import LETTER_E from '../../assets/images/LETTER_E.png';
import LETTER_T from '../../assets/images/LETTER_T.png';
import LETTER_L from '../../assets/images/LETTER_L.png';
import LETTER_I from '../../assets/images/LETTER_I.png';
import LETTER_N from '../../assets/images/LETTER_N.png';
import LETTER_S from '../../assets/images/LETTER_S.png';
import LETTER_C from '../../assets/images/LETTER_C.png';
import Letter_U from '../../assets/images/LETTER_U.png';
import Letter_R from '../../assets/images/LETTER_R.png';

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



interface BetControlProps {
    width: number;
    height: number;
    initialBetPerLine: number;
    initialLinesBet: number;
    minBetPerLine: number;
    maxBetPerLine: number;
    minLinesBet: number;
    maxLinesBet: number;
    onBetChange: (betPerLine: number, linesBet: number) => void;
}

const letterTextures = {
    B: Texture.from(LETTER_B),
    E: Texture.from(LETTER_E),
    T: Texture.from(LETTER_T),
    L: Texture.from(LETTER_L),
    I: Texture.from(LETTER_I),
    N: Texture.from(LETTER_N),
    S: Texture.from(LETTER_S),
    C: Texture.from(LETTER_C),
    U: Texture.from(Letter_U),
    R: Texture.from(Letter_R),
};



const renderLetterSprites = (word: string) => {
    const letters = word.split('');
    const sprites =
        letters.map((letter, index) => (
            <Sprite
                key={index}
                texture={letterTextures[letter as keyof typeof letterTextures]}
                x={index * 90 / 3 -500}
                y={-70}
                scale={0.5}
            />
        ));

    return sprites;
};
export const BetControl: React.FC<BetControlProps> = ({
    width,
    height,
    initialBetPerLine,
    initialLinesBet,
    minBetPerLine,
    maxBetPerLine,
    minLinesBet,
    maxLinesBet,
    onBetChange,
}) => {
    const [betPerLine, setBetPerLine] = useState(initialBetPerLine);
    const [linesBet, setLinesBet] = useState(initialLinesBet);

    const increaseBetPerLine = () => {
        if (betPerLine < maxBetPerLine) {
            const newBetPerLine = betPerLine + 1;
            setBetPerLine(newBetPerLine);
            onBetChange(newBetPerLine, linesBet);
        }
    };

    const decreaseBetPerLine = () => {
        if (betPerLine > minBetPerLine) {
            const newBetPerLine = betPerLine - 1;
            setBetPerLine(newBetPerLine);
            onBetChange(newBetPerLine, linesBet);
        }
    };

    const renderNumberSprites = (number: number) => {
        const digits = number.toString().split('').map(Number);
        const sprites = digits.map((digit, index) => (
          <Sprite
            key={index}
            texture={numberTextures[digit]}
            x={index * 90 / 3 - 450}
            y={10}
            scale={0.5}
          />
        ));
        return sprites;
      };

    const increaseLinesBet = () => {
        if (linesBet < maxLinesBet) {
            const newLinesBet = linesBet + 1;
            setLinesBet(newLinesBet);
            onBetChange(betPerLine, newLinesBet);
        }
    };

    const decreaseLinesBet = () => {
        if (linesBet > minLinesBet) {
            const newLinesBet = linesBet - 1;
            setLinesBet(newLinesBet);
            onBetChange(betPerLine, newLinesBet);
        }
    };

    return (
        <>
            <Container>
                <Container
                    x={width / 3} 
                    y={height / 3}
                >
                    {renderLetterSprites('BET')}
                    {renderNumberSprites(betPerLine)}
                    <Sprite 
                        eventMode='static' 
                        onpointerdown={decreaseBetPerLine} 
                        texture={Texture.from(navigateWest)} 
                        x={-width / 3.3} 
                        width={width / 25} 
                        height={height / 25} 
                    />

                

                    <Sprite 
                        eventMode='static' 
                        onpointerdown={increaseBetPerLine} 
                        texture={Texture.from(navigateEast)} 
                        x={-width / 5} 
                        width={width / 25} 
                        height={height / 25} 
                    />
                    
                </Container>



                <Container
                    x={width / 3}
                    y={height / 2}
                >

                    {renderLetterSprites('LINES')}
                    {renderNumberSprites(linesBet)}

                    <Sprite
                        eventMode='static'
                        onpointerdown={decreaseLinesBet}
                        texture={Texture.from(navigateWest)}
                        x={-width / 3.3}
                        width={width / 25}
                        height={height / 25}
                    />

                    <Sprite
                        eventMode='static'
                        onpointerdown={increaseLinesBet}
                        texture={Texture.from(navigateEast)}
                        x={-width / 5}
                        width={width / 25}
                        height={height / 25}
                    />

                </Container>

                <Container
                    x={width - 100}
                    y={height - 200}
                    scale={0.8}
                >
                    {renderLetterSprites('CURRENTBET')}
                    {renderNumberSprites(linesBet * betPerLine)}

                 


            </Container>
        </Container>
        </>
    );
};
