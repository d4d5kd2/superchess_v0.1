import React from 'react';
import { Observable } from 'rxjs';

type ObservableMap = {
  [key: string]: Observable<any>;
};

type ObservableContextType<T extends ObservableMap> = {
  [K in keyof T]: T[K] | null;
};

export function createObservableContext<T extends ObservableMap>() {
  const defaultValues = {} as ObservableContextType<T>;
  for (const key in defaultValues) {
    defaultValues[key] = null;
  }
  return React.createContext<ObservableContextType<T>>(defaultValues);
}
