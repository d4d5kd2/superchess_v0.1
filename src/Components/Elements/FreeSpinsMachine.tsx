import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Container, Sprite, Stage, Text } from '@pixi/react';
import { Reel } from '../Elements/Reel';
import { Circle, Rectangle, Texture } from 'pixi.js';
import { WinningLine } from './WinningLine';
import { WinAmountCounter } from './WinDisplay';
import { sound } from '@pixi/sound';
import { Assets } from '@pixi/assets'
import { ActiveComponentIndexContext } from '../../Utility/ActiveComponentContext';

import BALANCE_TEXT from '../../assets/images/BALANCE_TEXT.png'
import buttonImage from '../../assets/images/SPIN_BUTTON_ACTIVE.svg'
import buttonImageInactive from '../../assets/images/SPIN_BUTTON_INACTIVE.png'
import reelsBackground from '../../assets/images/mask.png'
import TOP_BAR from '../../assets/images/TOP_BAR.png'


interface ReelData {
  topSlot: string;
  centerSlot: string;
  bottomSlot: string;
}

interface FreeSpinMachineProps {
  width: number;
  height: number;
  x: number;
  y: number;
  balance: number;
  setBalance: (balance: number) => void;
  playerBet: number;
  linesBet: number;
  switchToChessGame: () => void;
  switchToFreeSpins: () => void;
  wildSymbol: string;
}

export const FreeSpinsMachine: React.FC<FreeSpinMachineProps> = ({ width, height, x, y, balance, setBalance, playerBet, linesBet, switchToChessGame, switchToFreeSpins }) => {
  const [reelData, setReelData] = useState<Array<ReelData>>([]);
  const [wins, setWins] = useState<
    Array<{ line: number; symbol: string; n: number; winAmount: number }>>([]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const { updateActiveComponentIndex } = useContext(ActiveComponentIndexContext);



  useEffect(() => {
    fetchFirstState();


  }, []);



  const handleSpinPress = () => {
    setIsSpinning(true);
    setTimeout(() => {
      fetchResults();
      setIsSpinning(false);
    }, 2000); // 2 seconds
    setBalance(balance -( playerBet * linesBet));

  };
  const fetchFirstState = async () => {
    const response = await fetch('http://superchess-server.herokuapp.com/spin');
    // const response = await fetch('http://localhost:8080/spin');
    const data = await response.json();
    // const data = await response.json();

    

    const formattedReelData = data.slice(0, 5).map((reel: any) => ({
      topSlot: reel.topSlot,
      centerSlot: reel.centerSlot,
      bottomSlot: reel.bottomSlot,
    }));

    const winsData = data[5];

    setReelData(formattedReelData);
    console.log(winsData)

  };




  const fetchResults = async () => {
    const response = await fetch('http://superchess-server.herokuapp.com/free_spin/WP');
    console.log(response)

    // const response = await fetch('http://localhost:8080/spin');
    const data = await response.json();
    // const data = await response.json();
    const firstReelState = data[0].topSlot
    const modifiedReelState = data[1]
    console.log("data:" + data)

    console.log("first" + firstReelState)
    console.log("modified" + modifiedReelState)

    const formattedReelData = data.slice(0, 5).map((reel: any) => ({
      topSlot: reel.topSlot,
      centerSlot: reel.centerSlot,
      bottomSlot: reel.bottomSlot,
    }));

    const winsData = data[5];
    const totalWin = winsData.reduce((total: number, win: { line: number; symbol: string; n: number; winAmount: number }) => total + win.winAmount, 0);
    setBalance(balance + (totalWin*playerBet) - playerBet * linesBet);

    const bonusGameTriggered = data[6]?.bonusGameTriggered || false;
    const freeGames3Triggered = data[6]?.freeGamesTriggered3 || false;
    const freeGames4Triggered = data[6]?.freeGamesTriggered3 || false;
    const freeGames5Triggered = data[6]?.freeGamesTriggered3 || false;

    console.log(bonusGameTriggered)
    console.log(freeGames3Triggered)
    console.log(freeGames4Triggered)
    console.log(freeGames5Triggered)


    if (bonusGameTriggered) {
      switchToChessGame(); // Assuming ChessGameComponent is at index 2
    }

    if (freeGames3Triggered) {
      switchToFreeSpins(); // Assuming FreeSpinsComponent is at index 3 
    }

    setReelData(formattedReelData);
    console.log(winsData)

    setWins(winsData);

    console.log(formattedReelData);

  };
  const reelWidth = width / 10
  const reelHeight = reelWidth * 3

  return (
    <Container x={x} y={y - reelHeight / 2 + reelHeight / 7}>
      <>

        {reelData.map((reel, index) => (
          <Reel
          id={index}
          key={index}
          x={-reelWidth + reelWidth * index}
          y={height}
            width={reelWidth}
            height={reelHeight}
            reelData={reel}
            isSpinning={isSpinning}
            
            
            />
            ))}
            <WinningLine winData={wins} reelWidth={reelWidth} reelHeight={reelHeight} lineBet={linesBet} />

      </>
      <Sprite texture={Texture.from(TOP_BAR)} x={-485} y={-400} width={width} height={120} alpha={100} />
      <Sprite texture={Texture.from(reelsBackground)} x={-485} y={-300} width={width + 40} height={height + 120}/>
  
        {isSpinning &&
        <Sprite
          
          anchor={{ x: 0.5, y: 0.5 }}
          x={0 + reelWidth * 6}
          y={0 + reelHeight * 0.5}
          texture={Texture.from(buttonImageInactive)}
          width={reelHeight / 5}
          height={reelHeight / 5}
          />
        }

        {!isSpinning &&
        <Sprite
          eventMode="static"
          onpointerdown={handleSpinPress}
          hitArea={new Circle(0, 0, reelWidth * 3.2)}
          anchor={{ x: 0.5, y: 0.5 }}
          x={0 + reelWidth * 6}
          y={0 + reelHeight * 0.5}
          texture={Texture.from(buttonImage)}
          width={reelHeight / 5}
          height={reelHeight / 5}
          
        />
}
      
      <WinAmountCounter x={x + reelWidth * 4} y={y / 2} winData={wins} duration={1000} width={width /15} height={height/30} bet={playerBet} linesBet={linesBet}/>

    </Container>
  );
};