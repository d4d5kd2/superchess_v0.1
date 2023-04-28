import React, { useEffect, useContext, useState } from "react";
import { Container, Sprite, Stage, AppConsumer } from "@pixi/react";
import { Texture } from "@pixi/core";
import { EventSystem, FederatedEvent } from "@pixi/events";

// import startImage from "../assets/images/PNG/backgroundBeige.png";
import startImage from "../assets/images/PNG/backgroundBeige2.png";
import buttonImagePng from "../assets/images/buttonStart.png";
import buttonPressedImagePng from "../assets/images/buttonStartPressed.png";
import logo from "../assets/images/logo.png";
import navigateWest from "../assets/images/PNG/navigateWest.png";
import navigateEast from "../assets/images/PNG/navigateEast.png";
import bubbleFilled from "../assets/images/PNG/bubbleFilled.png";
import bubbleEmpty from "../assets/images/PNG/bubbleEmpty.png";
import { Assets, Rectangle } from "pixi.js";
import { ActiveComponentIndexContext } from "../Utility/ActiveComponentContext";
// import { audio, bgm } from "../Utility/Audio";


interface StartComponentProps {
    width: number;
    height: number;
}

export const StartComponent: React.FC<StartComponentProps> = ({width, height}) => {
    const [buttonPressed, setButtonPressed] = useState(false);
    const [buttonImage, setButtonImage] = useState(buttonImagePng);

    const { updateActiveComponentIndex } = useContext(ActiveComponentIndexContext);

 
    const switchToMainGame = () => {
        updateActiveComponentIndex(1); // Assuming MainGameComponent is at index 1
    };

    const handleButtonPress = () => {
        
        setButtonPressed(true);
        setButtonImage(buttonPressedImagePng);
    };

    const handleButtonRelease = () => {
        setButtonPressed(false);
        setButtonImage(buttonImagePng);
        switchToMainGame();
    };
    
    // let hasInteracted = false;
    // document.addEventListener('pointerdown', () =>
    // {
    //     if (!hasInteracted)
    //     {
    //         // Only play audio if it hasn't already been played
    //         bgm.play('assets/audio/lobbyMusic.mp3');

    //     hasInteracted = true;
    // };
    // });

    const buttonWidth = height * 0.4;
    const buttonHeight = height * 0.2;
    const logoWidth = height  / 1.5;
    const logoHeight = height / 1.6;
    const navWidth = height * 0.1;
    const navHeight = height * 0.1;
    const bubbleWidth = height * 0.05;
    const bubbleHeight = height * 0.05;

    return (
        <>
            <Stage width={width} height={height}>
                <Sprite texture={Texture.from(startImage)} x={0} y={0} width={width} height={height} />
                <Sprite
                    texture={Texture.from(logo)}
                    x={width /2 - logoWidth/1.85} y={height/1.6 - logoHeight} width={logoWidth} height={logoHeight}
                    
                />
                <Sprite
                    eventMode="static"
                    onpointerdown={handleButtonPress}
                    onpointerup={handleButtonRelease}
                    hitArea={new Rectangle(0, 0, buttonWidth * 1.85, buttonHeight * 1.50)}
                    x={width * 0.5 - buttonWidth * 0.5}
                    y={height * 0.72}
                    texture={Texture.from(buttonImage)}
                    width={buttonWidth}
                    height={buttonHeight}
                    anchor={[0.0, 0.0]}
                />
                {/* <Sprite
                    texture={Texture.from(navigateEast)}
                    x={width * 0.6 + buttonWidth * 0.5}
                    y={height * 0.85}
                    width={navWidth}
                    height={navHeight}
                />
                <Sprite
                    texture={Texture.from(navigateWest)}
                    x={width * 0.4 - buttonWidth * 0.5 - navWidth }
                    y={height * 0.85}
                    width={navWidth}
                    height={navHeight}
                />
                <Sprite
                    texture={Texture.from(bubbleFilled)}
                    x={width * 0.5 - bubbleWidth * 2}
                    y={height * 0.85 + bubbleHeight * 0.5}
                    width={bubbleWidth}
                    height={bubbleHeight}
                />
                <Sprite
                     texture={Texture.from(bubbleEmpty)}
                     x={width * 0.5 - bubbleWidth * 1}
                     y={height * 0.85 + bubbleHeight * 0.5}
                     width={bubbleWidth}
                     height={bubbleHeight}
                />
                <Sprite
                    texture={Texture.from(bubbleEmpty)}
                    x={width * 0.5 }
                    y={height * 0.85 + bubbleHeight * 0.5}
                    width={bubbleWidth}
                    height={bubbleHeight}
                />
                <Sprite
                    texture={Texture.from(bubbleEmpty)}
                    x={width * 0.5 + bubbleWidth }
                    y={height * 0.85 + bubbleHeight * 0.5}
                    width={bubbleWidth}
                    height={bubbleHeight}
                /> */}
              
            </Stage>
        </>
    );
};