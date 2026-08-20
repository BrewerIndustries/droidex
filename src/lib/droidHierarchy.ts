import { ALL_CARDS } from '../data/droids';

export const TIER_ORDER = [
  'DEFAULT',
  'GOLD',
  'DIAMOND',
  'RAINBOW',
  'BESKAR',
] as const;

export function hasEffectiveCard(
  present: Set<string>,
  cardId: string
): boolean {
  if (present.has(cardId)) {
    return true;
  }

  const card = ALL_CARDS.find((c) => c.id === cardId);

  if (!card) {
    return false;
  }

  const currentTierIndex = TIER_ORDER.indexOf(card.tier as any);

  return ALL_CARDS.some((candidate) => {
    return (
      candidate.droid.name === card.droid.name &&
      TIER_ORDER.indexOf(candidate.tier as any) > currentTierIndex &&
      present.has(candidate.id)
    );
  });
}

/**
 * Highest tier of a Droid that is currently present.
 *
 * Returns:
 * -1 = nichts vorhanden
 *  0 = DEFAULT
 *  1 = GOLD
 *  2 = DIAMOND
 *  3 = RAINBOW
 *  4 = BESKAR
 */
export function getHighestOwnedTier(
  present: Set<string>,
  droidName: string
): number {
  let highest = -1;

  ALL_CARDS.forEach((card) => {
    if (card.droid.name === droidName && present.has(card.id)) {
      highest = Math.max(highest, TIER_ORDER.indexOf(card.tier as any));
    }
  });

  return highest;
}

/**
 * Droid-Fortschritt als 0..5
 *
 * 0 = nichts
 * 1 = DEFAULT
 * 2 = GOLD
 * 3 = DIAMOND
 * 4 = RAINBOW
 * 5 = BESKAR
 */
export function getDroidProgress(
  present: Set<string>,
  droidName: string
): number {
  return getHighestOwnedTier(present, droidName) + 1;
}

/**
 * Fortschritt in Prozent.
 *
 * 0, 20, 40, 60, 80, 100
 */
export function getDroidProgressPercent(
  present: Set<string>,
  droidName: string
): number {
  return (getDroidProgress(present, droidName) / TIER_ORDER.length) * 100;
}
