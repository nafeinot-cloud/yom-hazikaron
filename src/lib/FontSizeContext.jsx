import { createContext, useContext, useEffect, useState } from 'react';

const FontSizeContext = createContext(null);
const STORAGE_KEY = 'font-scale';
const MIN = 0.9;
const MAX = 1.6;
const STEP = 0.1;

export function FontSizeProvider({ children }) {
  const [scale, setScale] = useState(() => {
    const saved = Number(localStorage.getItem(STORAGE_KEY));
    return saved >= MIN && saved <= MAX ? saved : 1;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(scale));
  }, [scale]);

  const increase = () => setScale((s) => Math.min(MAX, Math.round((s + STEP) * 100) / 100));
  const decrease = () => setScale((s) => Math.max(MIN, Math.round((s - STEP) * 100) / 100));

  return <FontSizeContext.Provider value={{ scale, increase, decrease }}>{children}</FontSizeContext.Provider>;
}

export function useFontSize() {
  return useContext(FontSizeContext);
}
