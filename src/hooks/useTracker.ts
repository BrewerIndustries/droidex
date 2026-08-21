import { useState, useEffect, useCallback, useRef } from 'react';
import type { TeamAssignments } from '../lib/team';
import type { Station } from '../data/rebirthUnlocks';

const STORAGE_KEY = 'droidex_v2';
const BACKUP_KEY = 'droidex_v2_backup';
interface StoredState {
  collected: string[];
  present: string[];
  flawless: string[];

  rebirthLevel: number;
  rebirthPath: number;

  /** cardId -> station. Absent in saves written before the Team tab existed. */
  team?: TeamAssignments;
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

  const [team, setTeam] = useState<TeamAssignments>({});

  const teamRef = useRef(team);

  const rebirthPathRef = useRef(rebirthPath);

  const rebirthLevelRef = useRef(rebirthLevel);

  useEffect(() => {
    rebirthLevelRef.current = rebirthLevel;
  }, [rebirthLevel]);

  useEffect(() => {
    rebirthPathRef.current = rebirthPath;
  }, [rebirthPath]);

  useEffect(() => {
    teamRef.current = team;
  }, [team]);

  useEffect(() => {
    const local = readLocalStorage();

    setCollected(new Set(local?.collected ?? []));
    setPresent(new Set(local?.present ?? []));
    setFlawless(new Set(local?.flawless ?? []));

    setRebirthLevelState(local?.rebirthLevel ?? 0);

    setRebirthPathState(local?.rebirthPath ?? 1);

    const loadedTeam = local?.team ?? {};
    setTeam(loadedTeam);
    teamRef.current = loadedTeam;
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
          team: teamRef.current,
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
          team: teamRef.current,
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
          team: teamRef.current,
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
          team: teamRef.current,
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
          team: teamRef.current,
        });

        return prev;
      });
    },
    [present, flawless]
  );

  /**
   * Put a droid in a station. A droid sitting in a slot is by definition on
   * hand, so this also marks it present and the rebirth tracker picks it up.
   */
  const assignDroid = useCallback(
    (cardId: string, station: Station) => {
      const nextTeam = { ...teamRef.current, [cardId]: station };
      teamRef.current = nextTeam;
      setTeam(nextTeam);

      setPresent((prev) => {
        const next = new Set(prev);
        next.add(cardId);

        writeLocalStorage({
          collected: Array.from(collected),
          present: Array.from(next),
          flawless: Array.from(flawless),
          rebirthLevel: rebirthLevelRef.current,
          rebirthPath: rebirthPathRef.current,
          team: nextTeam,
        });

        return next;
      });
    },
    [collected, flawless]
  );

  /** Take a droid out of its station. Symmetric with assign: it stops being present. */
  const unassignDroid = useCallback(
    (cardId: string) => {
      const nextTeam = { ...teamRef.current };
      delete nextTeam[cardId];
      teamRef.current = nextTeam;
      setTeam(nextTeam);

      setPresent((prev) => {
        const next = new Set(prev);
        next.delete(cardId);

        writeLocalStorage({
          collected: Array.from(collected),
          present: Array.from(next),
          flawless: Array.from(flawless),
          rebirthLevel: rebirthLevelRef.current,
          rebirthPath: rebirthPathRef.current,
          team: nextTeam,
        });

        return next;
      });
    },
    [collected, flawless]
  );

  return {
    collected,
    present,
    flawless,

    team,
    assignDroid,
    unassignDroid,

    toggleCollected,
    togglePresent,
    toggleFlawless,

    rebirthLevel,
    setRebirthLevel,
    rebirthPath,
    setRebirthPath,
  };
}
