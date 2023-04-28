import React, { useEffect, useState } from 'react';
import './App.css';
import { ComponentSwitcher } from './Utility/ComponentSwitcher';
import { StartComponent } from './Components/StartScreen';
import { MainGameComponent } from './Components/MainGameScreen';
import { BehaviorSubject } from 'rxjs';
import { ActiveComponentIndexContext } from './Utility/ActiveComponentContext';
import { ErrorBoundary } from './Utility/ErrorBoundary';
import { FreeGameComponent } from './Components/BonusGameScreen';
import { ChessboardGameComponent } from './Components/ChessboardGameScreen';


const activeComponentIndex$ = new BehaviorSubject<number>(0);



function App() {

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setDimensions({ width: 1920, height: 1080 });
  };

  useEffect(() => {
    window.addEventListener("click", () => {
      console.log("click");
    });
  }, []);

  useEffect(() => {
    handleResize();
  }, []);

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [window.innerWidth, window.innerHeight]);


  const updateActiveComponentIndex = (index: number) => {
    activeComponentIndex$.next(index);
  };
  return (

    <div className="App">
      <ActiveComponentIndexContext.Provider
        value={{
          activeComponentIndex$,
          updateActiveComponentIndex,
        }}
      >
        <ErrorBoundary>
          <ComponentSwitcher >
            <StartComponent width={dimensions.width} height={dimensions.height} />
            <MainGameComponent width={dimensions.width} height={dimensions.height}  dimensions={dimensions} />
            <FreeGameComponent width={dimensions.width} height={dimensions.height} />
            <ChessboardGameComponent width={dimensions.width} height={dimensions.height} />
          </ComponentSwitcher>
        </ErrorBoundary>
      </ActiveComponentIndexContext.Provider>
    </div>

  );
}

export default App;
