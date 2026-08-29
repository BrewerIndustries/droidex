import type { Rarity, Tier } from './droidTypes';
import { DROIDS, RARITY_ORDER, TIER_ORDER, type Droid } from '../data/droids';

/**
 * One tier of a fusion droid, and whether it has been collected.
 *
 * Fusion keeps the tier of the droids fused — three Gold ingredients make a
 * Gold result — so every recipe exists once per tier rather than once overall,
 * and "have I made this?" is a question per variant.
 */
export interface FusionVariant {
  tier: Tier;
  cardId: string;
  collected: boolean;
}

/** One ingredient of a recipe, with how much of it is on hand. */
export interface FusionIngredient {
  name: string;
  /** How many copies the recipe wants, 1 or 2. */
  count: number;
  /** The droid itself, for its class and rarity. Absent if the name is stale. */
  droid?: Droid;
  /** Tiers of this ingredient that have been collected. */
  tiersCollected: Tier[];
}

export interface FusionRecipe {
  name: string;
  rarity: Rarity;
  type: string;
  /** The three droids that go in, deduplicated with a count. */
  ingredients: FusionIngredient[];
  /** Every tier of the result, in tier order. */
  variants: FusionVariant[];
  /** How many variants have been collected. */
  collectedCount: number;
}

export interface FusionGroup {
  rarity: Rarity;
  recipes: FusionRecipe[];
}

const droidIndex = new Map(DROIDS.map((d) => [d.name, d]));

/** Every droid that is made by fusing, in data order. */
export const FUSION_DROIDS: Droid[] = DROIDS.filter((d) => d.fusion);

/**
 * The three ingredients as they should read, collapsed to one entry per droid.
 *
 * Several recipes want two of the same droid, and "MOUSE x2 + ARG" says that
 * more plainly than listing MOUSE twice.
 */
function toIngredients(
  fusion: readonly string[],
  collected: Set<string>
): FusionIngredient[] {
  const order: string[] = [];
  const counts = new Map<string, number>();

  fusion.forEach((name) => {
    if (!counts.has(name)) order.push(name);
    counts.set(name, (counts.get(name) ?? 0) + 1);
  });

  return order.map((name) => {
    const droid = droidIndex.get(name);
    return {
      name,
      count: counts.get(name) ?? 1,
      droid,
      tiersCollected: (droid?.tiers ?? []).filter((tier) =>
        collected.has(`${name}_${tier}`)
      ),
    };
  });
}

/** Every fusion recipe, tagged with which of its variants are collected. */
export function getFusionRecipes(collected: Set<string>): FusionRecipe[] {
  return FUSION_DROIDS.map((droid) => {
    const variants: FusionVariant[] = TIER_ORDER.filter((tier) =>
      droid.tiers.includes(tier)
    ).map((tier) => {
      const cardId = `${droid.name}_${tier}`;
      return { tier, cardId, collected: collected.has(cardId) };
    });

    return {
      name: droid.name,
      rarity: droid.rarity,
      type: droid.type,
      ingredients: toIngredients(droid.fusion ?? [], collected),
      variants,
      collectedCount: variants.filter((v) => v.collected).length,
    };
  });
}

/** The recipes grouped by rarity, rarest last, skipping empty groups. */
export function getFusionGroups(collected: Set<string>): FusionGroup[] {
  const recipes = getFusionRecipes(collected);
  return RARITY_ORDER.map((rarity) => ({
    rarity,
    recipes: recipes.filter((r) => r.rarity === rarity),
  })).filter((group) => group.recipes.length > 0);
}

export interface FusionTotals {
  /** Fusion droids collected at one tier or more. */
  droidsStarted: number;
  /** Fusion droids collected at every tier. */
  droidsComplete: number;
  droids: number;
  /** Variants collected, out of every tier of every fusion droid. */
  variantsCollected: number;
  variants: number;
}

export function getFusionTotals(collected: Set<string>): FusionTotals {
  const recipes = getFusionRecipes(collected);

  return {
    droidsStarted: recipes.filter((r) => r.collectedCount > 0).length,
    droidsComplete: recipes.filter(
      (r) => r.collectedCount === r.variants.length
    ).length,
    droids: recipes.length,
    variantsCollected: recipes.reduce((sum, r) => sum + r.collectedCount, 0),
    variants: recipes.reduce((sum, r) => sum + r.variants.length, 0),
  };
}
