import { useEffect, useState, useRef } from 'react';
import { Container, Sprite, Text } from '@pixi/react';
import { TextStyle, Texture } from 'pixi.js';
import * as PIXI from 'pixi.js';
import WIN_DISPLAY from '../../assets/images/WIN_DISPLAY.png';

import BIG_WIN from '../../assets/images/BIG_WIN.png';
import HUGE_WIN from '../../assets/images/HUGE_WIN.png';
import MEGA_WIN from '../../assets/images/MEGA_WIN.png';

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



interface WinAmountCounterProps {
    winData: Array<{ line: number; symbol: string; n: number; winAmount: number }>;
    duration: number;
    x: number;
    y: number;
    fontSize?: number;
    fontFamily?: string;
    width: number;
    height: number;
    bet: number;
  }
const THRESHOLD_1 = 1;
const THRESHOLD_2 = 5;
const THRESHOLD_3 = 600;

export const WinAmountCounter: React.FC<WinAmountCounterProps> = ({
  winData,
  duration,
  fontSize,
  fontFamily,
  x,
  y,
  width,
  height,
  bet,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [targetValue, setTargetValue] = useState(0);
  const bigWinRef = useRef<PIXI.Sprite>(null);
  const hugeWinRef = useRef<PIXI.Sprite>(null);
  const megaWinRef = useRef<PIXI.Sprite>(null);

  useEffect(() => {
    // Animate the sprites' scale using GSAP
    if (bigWinRef.current && displayValue >= THRESHOLD_1 && displayValue < THRESHOLD_2) {
      const scale = Math.min((displayValue - THRESHOLD_1) / (THRESHOLD_2 - THRESHOLD_1), 1) * 0.5;
      gsap.to(bigWinRef.current.scale, { x: scale, y: scale, duration: 0.5 });
    }

    if (hugeWinRef.current && displayValue >= THRESHOLD_2) {
      gsap.to(hugeWinRef.current.scale, { x: 0.5, y: 0.5, duration: 0.5 });
    }
  }, [displayValue]);

  const renderNumberSprites = (number: number) => {
    const digits = number.toString().split('').map(Number);
    const sprites = digits.map((digit, index) => (
      <Sprite
        key={index}
        texture={numberTextures[digit]}
        x={x - x / 8 + index * width / digits.length}
        y={y - y / 1.4}
        width={width / digits.length - 10}
        height={height}
      />
    ));
    return sprites;
  };




  useEffect(() => {
    const totalWin = winData.reduce((total, win) => total + win.winAmount, 0);
    setTargetValue(totalWin * bet);

    const startTimestamp = performance.now();
    const step = (timestamp: number) => {
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      setDisplayValue(Math.round(targetValue * progress));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [winData, duration, targetValue, bet]);


  const textStyle = new TextStyle({
    fontFamily: 'Bangers',
    fontSize: fontSize || 30,
    fill: '#000000',
    align: 'center',
    });

  return (
    <>
    <Sprite texture={Texture.from(WIN_DISPLAY)} x={x - x/5} y={y - y} width={width *2} height={height *4}/>
    {/* <Text
      x={x - x/5}
      y={y - y/1.4}
      text={displayValue > 0 ? "    " + displayValue.toString(): ""}
      style={textStyle}
      width={width}
      height={height}

      /> */}
      <Container>{displayValue > 0 && renderNumberSprites(displayValue)}</Container>
   
    </>
    
  );
};
