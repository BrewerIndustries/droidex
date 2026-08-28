import { useEffect, useState } from 'react';

export type ViewMode = 'GRID' | 'LIST';

const STORAGE_KEY = 'droidex_view';

/**
 * Grid or list, remembered across visits.
 *
 * Kept out of the save file on purpose: this is a preference about the screen
 * you are looking at, not collection data, and it has no business travelling in
 * an export or getting restored over on another device.
 */
export function useViewMode(): [ViewMode, (mode: ViewMode) => void] {
  const [mode, setMode] = useState<ViewMode>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'LIST' ? 'LIST' : 'GRID';
    } catch {
      return 'GRID'; // private mode, or site data blocked
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Not being able to remember the choice is not worth breaking over.
    }
  }, [mode]);

  return [mode, setMode];
}
