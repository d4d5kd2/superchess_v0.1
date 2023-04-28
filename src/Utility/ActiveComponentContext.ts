import React from 'react';
import { Observable } from 'rxjs';

interface ActiveComponentIndexContextType {
  activeComponentIndex$: Observable<number> | null;
  updateActiveComponentIndex: (index: number) => void;
}

export const ActiveComponentIndexContext = React.createContext<ActiveComponentIndexContextType>({
  activeComponentIndex$: null,
  updateActiveComponentIndex: () => {},
});