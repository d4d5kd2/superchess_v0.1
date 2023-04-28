

// Language: typescript
// 
//
// 8x8 grid of tiles 
//
// Timer bar - animated
//
// Win display - animated
//
// clock counter 
//
// logo
//

import React, { useEffect, useState } from "react";
import {  Container, Graphics, Sprite, Stage, useApp } from "@pixi/react";
import { Texture } from "@pixi/core";
import { EventSystem, FederatedEvent } from "@pixi/events";


import wildBonus from "../assets/images/mockups/chessboard.png";

import logo from "../assets/images/logo.png";
import startImage from "../assets/images/PNG/backgroundBeige.png";

import { ChessboardSquare } from "./Elements/ChessboardSquare";
import { Chessboard } from "./Elements/Chessboard";
import { WinAmountCounter } from "./Elements/WinDisplay";


interface ChessboardGameComponentProps {
    width: number;
    height: number;
}

export const ChessboardGameComponent: React.FC<ChessboardGameComponentProps> = ({width, height}) => {
    
        const logoWidth = height * 0.4
        const logoHeight = height * 0.4
        const onGridItemClick = (id: number) => {
            console.log(id);
            
        }
        
        return (
            <>
            <Stage width={width} height={height}>
            <Sprite texture={Texture.from(startImage)} x={0} y={0} width={width} height={height} alpha={100} />
            
                        <Chessboard width={800} height={800} onGridItemClick={onGridItemClick} x={-200} y={0} />
     
                    <Sprite texture={Texture.from(logo)} x={360+ logoWidth *2} y={100} width={logoWidth} height={logoHeight}/>
                    {/* <WinAmountCounter x={width/2} y={height/2} width={width} height={height} /> */}
            </Stage>
            </>
        )
    }

