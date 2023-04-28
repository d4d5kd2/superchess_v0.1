import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, useApp, useTick } from '@pixi/react';
import { Tile } from './Tile';
import gsap from 'gsap';

interface ReelProps {
  width: number;
  height: number;
  id: number;
  reelData: { bottomSlot: string; centerSlot: string; topSlot: string };
  x: number;
  y: number;
  isSpinning: boolean;
  scale?: number;
}

export const Reel: React.FC<ReelProps> = ({ width, height, id, reelData, x, scale, isSpinning }) => {
  
  const [tiles, setTiles] = useState<any[]>([]);
  const containerRef = useRef(null);

  const getRandomSymbol = () => {
    const slotSymbols = ["SC", "XX", "WQ", "WB", "WR", "WK", "WN", "WP", "BQ", "BB", "BR", "BK", "BN", "BP"];
    return slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
  };
  
  useEffect(() => {
    if (isSpinning) {
      const spinAnimation = gsap.to(containerRef.current, {
        y: '+=500',
        duration: 0.1,
        repeat: -1,
        ease: 'none',
       
        yoyo: false,
        onRepeat: () => {
          setTiles((prev) => {
            const newTiles = prev.map((tile, index) => {

              return React.cloneElement(tile, { symbol: getRandomSymbol()});
            });
            return newTiles;
          });
        },

        // onComplete: () => {
        //   setTiles((prev) => {
        //     const slotOrder = [
        //       reelData.topSlot,
        //       reelData.centerSlot,
        //       reelData.bottomSlot,
        //     ];
        //     const newTiles = prev.map((tile, index) => {
        //       return React.cloneElement(tile, { symbol: slotOrder[index % 3] });
        //     });
        //     return newTiles;
            
          // });
        // },
      });

      return () => {
        spinAnimation.kill();
      };
    }
  }, [isSpinning]);

  useEffect(() => {
    if (!isSpinning) {
      const slotOrder = [
        reelData.topSlot,
        reelData.centerSlot,
        reelData.bottomSlot,
      ];
     
      setTiles((prev) => {
        const newTiles = prev.map((tile, index) => {
          return React.cloneElement(tile, { symbol: slotOrder[index % 3] });
        });
        return newTiles;
        
      }
      );
    } 
    gsap.to(containerRef.current, {
      y: 0 + (height / 15),
      duration: 0,
    });

   
   
  }, [isSpinning, reelData]);

  useEffect(() => {
    const slotOrder = [
      reelData.topSlot,
      reelData.centerSlot,
      reelData.bottomSlot,
    ];
    const slotSymbols = ["SC", "XX", "WQ", "WB", "WR", "WK", "WN", "WP","BQ", "BB", "BR", "BK", "BN", "BP"];
    const bgPattern1: Array<"white" | "black"> = ["black", "white", "black", "white", "black"];
    const bgPattern2: Array<"white" | "black"> = ["white", "black", "white", "black", "white"];

    const bgPatterns = [bgPattern1, bgPattern2, bgPattern1, bgPattern2, bgPattern1];

    const newTiles = [];

    for (let i = 0; i < 3; i++) {
      if (slotOrder[i % 3] === "XX" || slotOrder[i % 3] === "SC") {
        newTiles.push(

          <Tile
            key={slotOrder[i % 3] + i * id}
            isBonus={true}
            isWild={true}
            id={id}
            width={(width - width / 15)}
            height={height / 3 - height / 30}
            symbol={slotOrder[i % 3]}
            x={0}
            y={(height / 3) * i - height / 3}
            bgPattern={bgPatterns[i][id]}

          />

        );
      } else {

        newTiles.push(


          <Tile
            key={slotOrder[i % 3] + i * id * 2}
            isWild={false}
            isBonus={false}
            id={id}
            width={width - width / 15}
            height={height / 3 - height / 30}
            symbol={slotOrder[i % 3]}
            x={0}
            y={(height / 3) * i - height / 3}
            bgPattern={bgPatterns[i][id]}
          />
        );
      }
    }

    newTiles.push(
      <Tile
        key={id + 'bottom'}
        isWild={false}
        isBonus={false}
        id={id}
        width={width - width / 15}
        height={height / 3 - height / 30}
        symbol={slotSymbols[Math.floor(Math.random() * slotSymbols.length)]}
        x={0}
        y={height / 3 + height / 3 + height / 3 - height / 3}
        bgPattern={bgPatterns[3][id]}
      />
      ,
      <Tile
        key={id + 'top' + 2}
        isWild={false}
        isBonus={false}
        id={id}
        width={width - width / 15}
        height={height / 3 - height / 30}
        symbol={slotSymbols[Math.floor(Math.random() * slotSymbols.length)]}
        x={0}
        y={height / 3 - height / 3 - height / 3 - height / 3}
        bgPattern={bgPatterns[3][id]}
        
      />
      ,
      <Tile
      key={id + 'top' + 3}
      isWild={false}
      isBonus={false}
      id={id}
      width={width - width / 15}
      height={height / 3 - height / 30}
      symbol={slotSymbols[Math.floor(Math.random() * slotSymbols.length)]}
      x={0}
      y={height / 3 + height / 3 - height / 3 - height / 3 - height / 3 - height / 3 - height/3}
      bgPattern={bgPatterns[2][id]}
      
    />
    );
    
    setTiles(newTiles);
  }, [reelData, width, height, id]);

  return <Container ref={containerRef} x={x} scale={scale} >{tiles}</Container>;
};
