import { useState, useEffect, useCallback, useRef } from 'react';
import {
  firstFreeSlot,
  occupiedSlots,
  type TeamAssignments,
} from '../lib/team';
import { STATIONS, type Station } from '../data/rebirthUnlocks';

const STORAGE_KEY = 'droidex_v2';
const BACKUP_KEY = 'droidex_v2_backup';
interface StoredState {
  collected: string[];
  present: string[];
  flawless: string[];

  rebirthLevel: number;
  rebirthPath: number;

  /**
   * Placements. Absent in saves written before the Team tab existed, an object
   * in saves written before duplicates were supported, and without slot
   * positions in saves written before the team became positional.
   */
  team?: StoredPlacement[] | Record<string, Station>;
}

/** A placement as it may appear on disk: `slot` is missing in older saves. */
interface StoredPlacement {
  cardId: string;
  station: Station;
  slot?: number;
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

/**
 * Placements used to be a cardId -> station object, which allowed only one copy
 * of each droid. Saves in that shape are converted to the list form on load.
 *
 * Older saves also predate slot positions. Those droids are packed into the
 * first positions of their station in the order they were placed, which is
 * exactly how they used to be drawn — so a save opened after this change looks
 * the same as it did before it.
 */
function migrateTeam(
  stored: StoredPlacement[] | Record<string, Station> | undefined
): TeamAssignments {
  if (!stored) return [];

  const list: StoredPlacement[] = Array.isArray(stored)
    ? stored
    : Object.entries(stored).map(([cardId, station]) => ({ cardId, station }));

  // Positions already on disk are kept; the rest fill the gaps left over,
  // per station, in placement order.
  const taken = new Map<Station, Set<number>>(
    STATIONS.map((station) => [station, new Set<number>()])
  );
  const slotOf = new Array<number | null>(list.length).fill(null);

  list.forEach((p, i) => {
    const used = taken.get(p.station);
    if (!used) return;
    if (Number.isInteger(p.slot) && p.slot! >= 0 && !used.has(p.slot!)) {
      used.add(p.slot!);
      slotOf[i] = p.slot!;
    }
  });

  return list.flatMap((p, i) => {
    const used = taken.get(p.station);
    if (!used) return []; // stale save naming a station that no longer exists

    let slot = slotOf[i];
    if (slot === null) {
      slot = 0;
      while (used.has(slot)) slot++;
      used.add(slot);
    }

    return [{ cardId: p.cardId, station: p.station, slot }];
  });
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

  const [team, setTeam] = useState<TeamAssignments>([]);

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

    const loadedTeam = migrateTeam(local?.team);
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
   *
   * `slot` names the exact position to fill, which is what clicking an empty
   * slot on the Team page does. Left out — the droid card's station picker
   * names a station and nothing more — it takes the first free position.
   */
  const assignDroid = useCallback(
    (cardId: string, station: Station, slot?: number) => {
      const team = teamRef.current;

      let target = slot;
      if (target === undefined || occupiedSlots(team, station).has(target)) {
        const free = firstFreeSlot(team, station, rebirthLevelRef.current);
        if (free === null) return; // station full — nothing to fill
        target = free;
      }

      const nextTeam = [...team, { cardId, station, slot: target }];
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

  /**
   * Take one copy out of its station, by position.
   *
   * Symmetric with assign, but only the *last* copy clears `present` — while
   * another is still working, the droid is very much on hand.
   */
  const unassignDroid = useCallback(
    (index: number) => {
      const removed = teamRef.current[index];
      if (!removed) return;

      const nextTeam = teamRef.current.filter((_, i) => i !== index);
      teamRef.current = nextTeam;
      setTeam(nextTeam);

      setPresent((prev) => {
        const next = new Set(prev);
        const stillPlaced = nextTeam.some((p) => p.cardId === removed.cardId);
        if (!stillPlaced) next.delete(removed.cardId);

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
