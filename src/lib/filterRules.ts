// filterRules.ts

import type { DroidCard } from '../data/droids';

import { RARITY_ORDER, TIER_ORDER } from '../data/droids';

import type { Rarity, DroidType, TierOrAll } from './droidTypes';

export interface VisibleCardFilters {
  cards: DroidCard[];

  tier: TierOrAll;
  rarity: Rarity | 'ALL';
  droidClass: DroidType | 'ALL';

  collectionStatus: 'ALL' | 'OWNED' | 'MISSING';
  flawlessStatus: 'ALL' | 'FLAWLESS' | 'MISSING';
  rebirthFilter: 'ALL' | 'NEEDED' | 'HISTORICAL';

  search: string;

  collected: Set<string>;
  present: Set<string>;
  flawless: Set<string>;

  requiredIds: Set<string>;
}

export function getVisibleCards(input: VisibleCardFilters): DroidCard[] {
  const filtered = input.cards.filter((c) => {
    if (input.tier !== 'ALL' && c.tier !== input.tier) return false;
    if (input.rarity !== 'ALL' && c.droid.rarity !== input.rarity) return false;
    if (input.droidClass !== 'ALL' && c.droid.type !== input.droidClass)
      return false;

    if (input.collectionStatus === 'OWNED' && !input.collected.has(c.id))
      return false;

    if (input.collectionStatus === 'MISSING' && input.collected.has(c.id))
      return false;

    const isFlawless = input.flawless.has(c.droid.name);

    if (input.flawlessStatus === 'FLAWLESS' && !isFlawless) return false;

    if (input.flawlessStatus === 'MISSING' && isFlawless) return false;

    if (
      input.search.trim() &&
      !c.droid.name.toLowerCase().includes(input.search.trim().toLowerCase())
    )
      return false;

    if (input.rebirthFilter === 'NEEDED' && !input.requiredIds.has(c.id))
      return false;

    if (
      input.rebirthFilter === 'HISTORICAL' &&
      !(input.collected.has(c.id) && !input.present.has(c.id))
    )
      return false;

    return true;
  });

  const rarityIndex = Object.fromEntries(RARITY_ORDER.map((r, i) => [r, i]));
  const tierIndex = Object.fromEntries(TIER_ORDER.map((t, i) => [t, i]));

  // Rarity then name, rather than the order droids happen to sit in
  // `droids.ts`, where the 17 fusion droids are one block at the end — they
  // were listed together because they were added together, which put a Rare
  // fusion droid after every Mythic. Sorting puts each one in its own rarity
  // run, and sorting by name inside that run mixes them in among the buyable
  // droids rather than trailing them.
  filtered.sort((a, b) => {
    // With a tier selected there is one card per droid, so rarity is the only
    // grouping. Showing every tier at once keeps tier as the outer one.
    if (input.tier === 'ALL') {
      const byTier = tierIndex[a.tier] - tierIndex[b.tier];
      if (byTier !== 0) return byTier;
    }

    const byRarity = rarityIndex[a.droid.rarity] - rarityIndex[b.droid.rarity];
    if (byRarity !== 0) return byRarity;

    // `numeric` so R9 comes before R10 and B1 before B2 — names in this game
    // are mostly a letter and a number, which a plain string compare gets
    // wrong the moment one reaches two digits.
    return a.droid.name.localeCompare(b.droid.name, undefined, {
      numeric: true,
    });
  });

  return filtered;
}
