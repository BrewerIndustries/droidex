import { ALL_CARDS, TIER_ORDER } from '../data/droids';

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
 * Returns the index of that tier in TIER_ORDER,
 * or -1 if the Droid is not present in any tier.
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
 * Droid progress as 0..TIER_ORDER.length
 *
 * 0 = nothing present, otherwise the highest owned tier index + 1.
 */
export function getDroidProgress(
  present: Set<string>,
  droidName: string
): number {
  return getHighestOwnedTier(present, droidName) + 1;
}

/**
 * Progress as a percentage, 0..100.
 */
export function getDroidProgressPercent(
  present: Set<string>,
  droidName: string
): number {
  return (getDroidProgress(present, droidName) / TIER_ORDER.length) * 100;
}
