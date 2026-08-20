import type { DroidType } from '../lib/droidTypes';

/**
 * Where a droid can be placed in the tycoon.
 *
 * The three workstation kinds each take one droid class and generate credits.
 * LOUNGE is storage: parked droids earn nothing, but they still count as being
 * on hand for rebirth requirements. COMPANION is the single droid following the
 * player around, which contributes its perk rather than income.
 */
export type Station =
  | 'WORKER'
  | 'ASTROMECH'
  | 'BATTLE'
  | 'LOUNGE'
  | 'COMPANION';

export const STATIONS: Station[] = [
  'WORKER',
  'ASTROMECH',
  'BATTLE',
  'LOUNGE',
  'COMPANION',
];

/** Workstations pay out; the lounge and companion slot do not. */
export const EARNING_STATIONS: Station[] = ['WORKER', 'ASTROMECH', 'BATTLE'];

/** Slots available before any rebirth. */
export const BASE_SLOTS: Record<Station, number> = {
  WORKER: 4,
  ASTROMECH: 3,
  BATTLE: 2,
  LOUNGE: 5,
  COMPANION: 1,
};

/**
 * Extra slots granted on reaching each rebirth level.
 *
 * Source: the "Base Upgrades" column of
 * https://star-wars-droid-tycoon.fandom.com/wiki/Rebirths
 *
 * Levels 17-20 grant a Battle slot *and* a Lounge slot. droidex.web.app models
 * only one slot per rebirth and records just the Lounge there, which is why its
 * battle-slot totals come out lower; the wiki's cell lists both.
 */
export const SLOT_UNLOCKS: Record<number, Station[]> = {
  1: ['WORKER'],
  2: ['ASTROMECH'],
  3: ['BATTLE'],
  4: ['WORKER'],
  5: ['ASTROMECH'],
  6: ['BATTLE'],
  7: ['WORKER'],
  8: ['ASTROMECH'],
  9: ['BATTLE'],
  10: ['WORKER'],
  11: ['ASTROMECH'],
  12: ['WORKER'],
  13: ['ASTROMECH'],
  14: ['WORKER'],
  15: ['ASTROMECH'],
  16: ['WORKER'],
  17: ['BATTLE', 'LOUNGE'],
  18: ['BATTLE', 'LOUNGE'],
  19: ['BATTLE', 'LOUNGE'],
  20: ['BATTLE', 'LOUNGE'],
  21: ['BATTLE'],
  22: ['BATTLE'],
};

/**
 * Total credit multiplier held at each rebirth level, as a fraction
 * (0.45 = +45%). These are totals, not increments — increments would compound
 * far past the +200% the game shows at rebirth 30.
 */
export const CREDIT_MULTIPLIER: Record<number, number> = {
  1: 0.45,
  2: 0.45,
  3: 0.5,
  4: 0.5,
  5: 0.55,
  6: 0.55,
  7: 0.6,
  8: 0.6,
  9: 0.65,
  10: 0.65,
  11: 0.65,
  12: 0.7,
  13: 0.7,
  14: 0.75,
  15: 0.75,
  16: 0.75,
  17: 0.8,
  18: 0.8,
  19: 0.8,
  20: 0.85,
  21: 0.85,
  22: 0.9,
  23: 0.95,
  24: 1,
  25: 1.1,
  26: 1.2,
  27: 1.3,
  28: 1.5,
  29: 1.75,
  30: 2,
};

/** Highest rebirth level the multiplier table covers. */
export const MAX_KNOWN_MULTIPLIER_LEVEL = 30;

/** Which droid classes a station accepts. LOUNGE and COMPANION take any. */
export function stationAccepts(station: Station, type: DroidType): boolean {
  if (station === 'LOUNGE' || station === 'COMPANION') return true;
  return station === type;
}

/** Slots of a given kind available at a rebirth level. */
export function slotsAt(station: Station, rebirthLevel: number): number {
  let extra = 0;
  for (const [level, gained] of Object.entries(SLOT_UNLOCKS)) {
    if (Number(level) <= rebirthLevel) {
      extra += gained.filter((s) => s === station).length;
    }
  }
  return BASE_SLOTS[station] + extra;
}

/**
 * Credit multiplier held at a rebirth level. Levels past the documented range
 * hold at the highest known value rather than inventing a curve.
 */
export function creditMultiplierAt(rebirthLevel: number): number {
  if (rebirthLevel <= 0) return 0;
  const capped = Math.min(rebirthLevel, MAX_KNOWN_MULTIPLIER_LEVEL);
  return CREDIT_MULTIPLIER[capped] ?? 0;
}
