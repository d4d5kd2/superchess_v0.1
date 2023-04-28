import React, { useEffect, useState, useContext } from "react";
import { Container, Graphics, Sprite, Stage, Text } from "@pixi/react";
import { Rectangle, Texture } from "@pixi/core";
import { EventSystem, FederatedEvent } from "@pixi/events";

import { ActiveComponentIndexContext } from "../Utility/ActiveComponentContext";
import { Machine } from "./Elements/Machine";
import { BetControl } from "./Elements/BetControls";


import BALANCE_TEXT from "../assets/images/BALANCE_TEXT.png";
import mainGame from "../assets/images/mockups/maingame.png";
import reelsBackground from "../assets/images/mask.png";
import startImage from "../assets/images/PNG/backgroundBeige.png";
import logo from "../assets/images/logo.png";


interface MainGameComponentProps {
    width: number;
    height: number;
    dimensions: { width: number, height: number };
}



export const MainGameComponent: React.FC<MainGameComponentProps> = ({ width, height, dimensions }) => {
    const [playerBalance, setPlayerBalance] = useState<number>(10000);
    const [playerBet, setPlayerBet] = useState<number>(1);
    const [linesBet, setLinesBet] = useState<number>(20);
    const { updateActiveComponentIndex } = useContext(ActiveComponentIndexContext);

    const logoWidth = height * 0.3
    const logoHeight = height * 0.3
    const containerWidth = width * 0.8



    const handleBetChange = (bet: number, lines: number) => {
        setPlayerBet(bet);
        setLinesBet(lines);
    };

    const switchToChessGame = () => {

        updateActiveComponentIndex(3)
    }



    return (
        <>
            <Stage width={dimensions.width} height={dimensions.height}>

                <Sprite texture={Texture.from(startImage)} x={0} y={0} width={width} height={height} alpha={100} />
                <Machine
                    x={width / 2 - containerWidth / 3}
                    y={height / 2}
                    width={width}
                    height={height}
                    balance={playerBalance}
                    setBalance={setPlayerBalance}
                    playerBet={playerBet}
                    setPlayerBet={setPlayerBet}
                    linesBet={linesBet}
                    setLinesBet={setLinesBet}
                    switchToChessGame={switchToChessGame}
                    switchToFreeSpins={switchToChessGame}
                />



                <Sprite texture={Texture.from(logo)} x={width / 2 - logoWidth / 1.4} y={height / 4 - logoHeight / 1.2} width={logoWidth} height={logoHeight} />
                <BetControl
                    initialBetPerLine={1}
                    initialLinesBet={1}
                    minBetPerLine={1}
                    maxBetPerLine={10}
                    minLinesBet={1}
                    maxLinesBet={20}
                    onBetChange={handleBetChange}
                    width={dimensions.width}
                    height={dimensions.height}
                />
                <Sprite texture={Texture.from(BALANCE_TEXT)} x={width / 10} y={height - 90} width={width /10} height={height / 28} alpha={100} />
                <Text text={playerBalance.toString()} x={width / 5 +20} y={height  - 90} width={width / 25} height={height / 25} />



            </Stage>
        </>
    )
}
