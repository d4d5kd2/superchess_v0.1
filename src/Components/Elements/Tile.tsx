import React from 'react';
import { Sprite, Container } from '@pixi/react';
import { Texture } from '@pixi/core';

import BK from '../../assets/images/BK.svg';
import BQ from '../../assets/images/BQ.svg';
import BR from '../../assets/images/BR.svg';
import BB from '../../assets/images/BB.svg';
import BN from '../../assets/images/BN.svg';
import BP from '../../assets/images/BP.svg';

import WK from '../../assets/images/WK.svg';
import WQ from '../../assets/images/WQ.svg';
import WR from '../../assets/images/WR.svg';
import WB from '../../assets/images/WB.svg';
import WN from '../../assets/images/WN.svg';
import WP from '../../assets/images/WP.svg';

import whiteField from '../../assets/images/WHITE_FIELD.svg';
import blackField from '../../assets/images/BLACK_FIELD.svg';

import SC from '../../assets/images/SC.png';
import XX from '../../assets/images/XX.png';



const svgPaths = {
    BK,
    BQ,
    BR,
    BB,
    BN,
    BP,
    WK,
    WQ,
    WR,
    WB,
    WN,
    WP,
    whiteField,
    blackField,
    SC,
    XX,

};

const symbolTextures = Object.entries(svgPaths).reduce((acc, [key, value]) => {
  acc[key] = Texture.from(value);
  return acc;
}, {} as Record<string, Texture>);

interface TileProps {
  x: number;
  y: number;
  id: number;
  width: number;
  height: number;
  symbol: string;
  isWild: boolean;
  isBonus: boolean;
  bgPattern: "white" | "black";
  symbolSize?: number;
}

export const Tile: React.FC<TileProps> = ({ 
        x,
        y,
        width,
        height,
        symbol,
        isWild,
        isBonus,
        bgPattern,
        symbolSize
 }) => {
        const texture = symbolTextures[symbol];
        const bgWhiteTexture = Texture.from(svgPaths['whiteField'], { alphaMode: 1 });
        const bgBlackTexture = Texture.from(svgPaths['blackField'], { alphaMode: 1 });
        const bgTexture = bgPattern === "white" ? bgWhiteTexture : bgBlackTexture;
  
  return (
    <Container x={x} y={y}>
      <Sprite
        texture={bgTexture}
        width={width}
        height={height}
        anchor={{ x: 0, y: 0 }}
        x={width}
        y={height}
        
      />
      {texture && (isWild || isBonus) && (
        <Sprite
          texture={texture}
          width={height }
          height={height }
          anchor={{ x: 0, y: 0 }}
          x={width}
          y={height}
        />
      )
      }
      {texture && !isWild && (
          <Sprite
          texture={texture}
          width={height / 2}
          height={height / 2}
          anchor={{ x: -0.5, y: -0.50 }}
          x={width}
          y={height}
        />
       
      )}
    </Container>
  );
};