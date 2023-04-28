import React, { useEffect, useState } from "react";
import {  Container, Graphics, Sprite, Stage, useApp } from "@pixi/react";
import { Texture } from "@pixi/core";
import { EventSystem, FederatedEvent } from "@pixi/events";


import wildBonus from "../assets/images/mockups/wildbonus.png";

import logo from "../assets/images/logo.png";

import { Machine } from "./Elements/Machine";
import { FreeSpinsMachine } from "./Elements/FreeSpinsMachine";

interface FreeGameComponentProps {
    width: number;
    height: number;
}

export const FreeGameComponent: React.FC<FreeGameComponentProps> = ({width, height}) => {
    
        const logoWidth = height * 0.4
        const logoHeight = height * 0.4
        const containerWidth = height * 1
        const containerHeight = height * 0.66
    
    
        return (
            <>
            <Stage width={width} height={height}>
    
                {/* <Sprite texture={Texture.from(wildBonus)} x={0} y={0} width={width} height={height}/> */}
    
                <Container x={width/2 - containerWidth / 2.11} y={height/2} >

                    <Sprite texture={Texture.from(logo)} x={0 + logoWidth/2} y={0 - logoHeight} width={logoWidth} height={logoHeight}/>

                    <FreeSpinsMachine 
                        x={0}
                        y={0}
                        width={containerWidth}
                        height={containerHeight}
                        balance={100}
                        setBalance={() => {}}
                        playerBet={1}
                        linesBet={20}
                        switchToChessGame={() => {}}
                        switchToFreeSpins={() => {}}
                        wildSymbol="WP"

                    />
                    {/* <Machine x={width/2 - containerHeight * 1.3 } y={height} width={containerWidth} height={containerHeight} balance={}/> */}

                </Container>
            </Stage>
            </>
        )
    }

