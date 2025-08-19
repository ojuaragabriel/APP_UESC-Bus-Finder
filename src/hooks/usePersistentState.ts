"use client";

import { useState, useEffect, useCallback } from 'react';

export function usePersistentState<T>(key: string, defaultValue: T): [T, (value: T | ((prevState: T) => T)) => void] {
  const [state, setState] = useState<T>(() => defaultValue);

  useEffect(() => {
    // This effect runs once on mount to get the stored value.
    try {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue) {
        setState(JSON.parse(storedValue));
      }
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
    }
  }, [key]);

  const setPersistentState = useCallback((newValue: T | ((prevState: T) => T)) => {
    setState(prevState => {
      const valueToStore = newValue instanceof Function ? newValue(prevState) : newValue;
      try {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key “${key}”:`, error);
      }
      return valueToStore;
    });
  }, [key]);
  
  return [state, setPersistentState];
}
