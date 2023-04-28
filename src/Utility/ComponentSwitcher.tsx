import { useEffect, useState, useContext } from 'react';
import { ActiveComponentIndexContext } from './ActiveComponentContext';

export interface ComponentSwitcherProps {
  children: React.ReactNode[];
}

export const ComponentSwitcher: React.FC<ComponentSwitcherProps> = ({ children }) => {
  const { activeComponentIndex$, updateActiveComponentIndex } = useContext(ActiveComponentIndexContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activeComponentIndex$) {
      const subscription = activeComponentIndex$.subscribe((index) => {
        setCurrentIndex(index);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [activeComponentIndex$]);

  const switchToNext = () => {
    const nextIndex = (currentIndex + 1) % children.length;
    updateActiveComponentIndex(nextIndex);
  };

  const switchToPrev = () => {
    const prevIndex = (currentIndex - 1 + children.length) % children.length;
    updateActiveComponentIndex(prevIndex);
  };

  return (
    <div className="viewport-switcher">
      <div className="viewport-content">{children[currentIndex]}</div>
      <div className="viewport-controls">
        <button onClick={switchToPrev}>Prev</button>
        <button onClick={switchToNext}>Next</button>
        </div>
      </div>
   
  );
};
