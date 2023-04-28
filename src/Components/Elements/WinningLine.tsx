import React, { useCallback, useEffect, useState } from 'react';
import { Container, Graphics, Sprite } from "@pixi/react";
import * as PIXI from "pixi.js";

type Payline = number[]

const colors: number[] = [
    0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0xabcdef,
    0xf0f0f0, 0x123456, 0x654321, 0x987654, 0x567890, 0x1a2b3c, 0x4d5e6f,
    0x7b8a9c, 0x9e7b6a, 0x5a9e7b, 0x7b5a9e, 0x9e7b5a, 0x7b9e5a, 0x5a7b9e,
  ];

const paylines: Payline[] = [
  [0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2],
  [0, 1, 2, 1, 0],
  [2, 1, 0, 1, 2],
  [0, 0, 1, 2, 2],
  [2, 2, 1, 0, 0],
  [1, 0, 0, 0, 1],
  [1, 2, 2, 2, 1],
  [0, 1, 1, 1, 0],
  [2, 1, 1, 1, 2],
  [1, 0, 1, 2, 1],
  [1, 2, 1, 0, 1],
  [0, 1, 0, 1, 0],
  [2, 1, 2, 1, 2],
  [0, 1, 2, 1, 2],
  [2, 1, 0, 1, 0],
  [1, 1, 0, 1, 0],
  [1, 1, 2, 1, 2],
  [0, 1, 1, 1, 2],
  [2, 1, 1, 1, 0],
];

interface WinningLineProps {
    winData: Array<{ line: number; symbol: string; n: number; winAmount: number }>;
    reelWidth: number;
    reelHeight: number;
    lineBet: number;
  }

  export const WinningLine: React.FC<WinningLineProps> = ({ winData, reelWidth, reelHeight, lineBet }) => {
    const [visibleWinData, setVisibleWinData] = useState(winData);

    useEffect(() => {
      setVisibleWinData(winData);
      const timer = setTimeout(() => {
        setVisibleWinData([]);
      }, 1000);

      return () => clearTimeout(timer);
    }, [winData]);

    const calculateLineCoordinates = (line: number, n: number): PIXI.Point[] => {
      const payline = paylines[line - 1];
      const symbolsWon = payline.slice(0, n);
      const coordinates = symbolsWon.map((position, index) => {
        const x = index * reelWidth + reelWidth / 2.5;
        const y = position * (reelHeight / 3) + reelHeight / 9;
        return new PIXI.Point(x, y);
      });
      return coordinates;
    };
    
    const renderLine = useCallback((g: PIXI.Graphics ,c: PIXI.Point[], color: number, reelWidth: number, reelHeight: number) => {
        g.clear()
        g.lineStyle(10, color, 1,);
        g.moveTo(c[0].x, c[0].y);
      
        c.forEach((c) => {
            g.lineTo(c.x, c.y + 20);
            g.drawRect(c.x - reelWidth/2, c.y - reelWidth/3.6 , reelWidth, reelWidth);
        });

        
    },[])

  
    return (
      <Container>
      {visibleWinData.map((win) => {
        // Check if lineBet is greater than or equal to the "line" from the response
        if (lineBet >= win.line) {
          const coordinates = calculateLineCoordinates(win.line + 1, win.n);
          return (
            <Graphics
              key={win.line}
              draw={(graphics) => {
                renderLine(graphics, coordinates, colors[win.line - 1], reelWidth, reelHeight);
              }}
            />
          );
        } else {
          return null;
        }
      })}
    </Container>
    );
  };