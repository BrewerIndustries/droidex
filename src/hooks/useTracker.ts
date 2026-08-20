import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY = 'droidex_v2';
const BACKUP_KEY = 'droidex_v2_backup';
interface StoredState {
  collected: string[];
  present: string[];
  flawless: string[];

  rebirthLevel: number;
  rebirthPath: number;
}
function readLocalStorage(): StoredState | null {
  const candidates = [
    localStorage.getItem(STORAGE_KEY),
    localStorage.getItem(BACKUP_KEY),

    // Migration from v1
    localStorage.getItem('droidex_v1'),
    localStorage.getItem('droidex_v1_backup'),
  ];

  for (const raw of candidates) {
    if (!raw) continue;

    try {
      const state = JSON.parse(raw) as StoredState;

      // migrate to v2 automatically
      writeLocalStorage(state);

      return state;
    } catch {
      //
    }
  }

  return null;
}

function writeLocalStorage(state: StoredState) {
  const payload = JSON.stringify(state);

  localStorage.setItem(STORAGE_KEY, payload);
  localStorage.setItem(BACKUP_KEY, payload);
}

export function useTracker(_uid: string | null) {
  const [collected, setCollected] = useState<Set<string>>(new Set());

  const [present, setPresent] = useState<Set<string>>(new Set());

  const [flawless, setFlawless] = useState<Set<string>>(new Set());

  const [rebirthLevel, setRebirthLevelState] = useState<number>(0);

  const [rebirthPath, setRebirthPathState] = useState<number>(1);

  const rebirthPathRef = useRef(rebirthPath);

  const rebirthLevelRef = useRef(rebirthLevel);

  useEffect(() => {
    rebirthLevelRef.current = rebirthLevel;
  }, [rebirthLevel]);

  useEffect(() => {
    rebirthPathRef.current = rebirthPath;
  }, [rebirthPath]);

  useEffect(() => {
    const local = readLocalStorage();

    setCollected(new Set(local?.collected ?? []));
    setPresent(new Set(local?.present ?? []));
    setFlawless(new Set(local?.flawless ?? []));

    setRebirthLevelState(local?.rebirthLevel ?? 0);

    setRebirthPathState(local?.rebirthPath ?? 1);
  }, []);

  const toggleCollected = useCallback(
    (id: string) => {
      setCollected((prev) => {
        const next = new Set(prev);

        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }

        writeLocalStorage({
          collected: Array.from(next),
          present: Array.from(present),
          flawless: Array.from(flawless),
          rebirthLevel: rebirthLevelRef.current,
          rebirthPath: rebirthPathRef.current,
        });

        return next;
      });
    },
    [present, flawless]
  );

  const togglePresent = useCallback(
    (id: string) => {
      setPresent((prev) => {
        const next = new Set(prev);

        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }

        writeLocalStorage({
          collected: Array.from(collected),
          present: Array.from(next),
          flawless: Array.from(flawless),
          rebirthLevel: rebirthLevelRef.current,
          rebirthPath: rebirthPathRef.current,
        });

        return next;
      });
    },
    [collected, flawless]
  );

  const toggleFlawless = useCallback(
    (id: string) => {
      setFlawless((prev) => {
        const next = new Set(prev);

        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }

        writeLocalStorage({
          collected: Array.from(collected),
          present: Array.from(present),
          flawless: Array.from(next),
          rebirthLevel: rebirthLevelRef.current,
          rebirthPath: rebirthPathRef.current,
        });

        return next;
      });
    },
    [collected, present]
  );

  const setRebirthLevel = useCallback(
    (level: number) => {
      setRebirthLevelState(level);

      setCollected((prev) => {
        writeLocalStorage({
          collected: Array.from(prev),
          present: Array.from(present),
          flawless: Array.from(flawless),

          rebirthLevel: level,
          rebirthPath: rebirthPathRef.current,
        });

        return prev;
      });
    },
    [present, flawless]
  );

  const setRebirthPath = useCallback(
    (path: number) => {
      setRebirthPathState(path);

      setCollected((prev) => {
        writeLocalStorage({
          collected: Array.from(prev),
          present: Array.from(present),
          flawless: Array.from(flawless),

          rebirthLevel: rebirthLevelRef.current,
          rebirthPath: path,
        });

        return prev;
      });
    },
    [present, flawless]
  );

  return {
    collected,
    present,
    flawless,

    toggleCollected,
    togglePresent,
    toggleFlawless,

    rebirthLevel,
    setRebirthLevel,
    rebirthPath,
    setRebirthPath,
  };
}
