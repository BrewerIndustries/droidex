import type { Tier } from './droidTypes';
import type { Station } from '../data/rebirthUnlocks';
import { ALL_CARDS, DROIDS } from '../data/droids';
import { REBIRTH_PATHS } from '../data/rebirthPaths';
import { hasEffectiveCard } from './droidHierarchy';
import type { TeamAssignments } from './team';

/** One upcoming rebirth that a removal would leave short. */
export interface BrokenRequirement {
  from: number;
  to: number;
  /** The droid the rebirth asks for. */
  name: string;
  /** The tier it asks for, which can be lower than the copy being removed. */
  tier: Tier;
  cardId: string;
}

/** One fusion recipe the removed droid feeds, whose result is not collected. */
export interface FusionUse {
  /** The droid the recipe produces. */
  name: string;
  /** Fusion keeps the tier of the droids fused, so this is the removed tier. */
  tier: Tier;
  /** The three droids that go in. */
  recipe: readonly string[];
  /** How many copies of the removed droid the recipe wants, 1 or 2. */
  count: number;
}

export interface RemovalWarning {
  /** Position in the placements list, so the caller can go through with it. */
  index: number;
  cardId: string;
  name: string;
  tier: Tier;
  station: Station;
  /** Rebirths left short by this removal, soonest first. */
  broken: BrokenRequirement[];
  /** The soonest rebirth affected, or null when none is. */
  nextLevel: number | null;
  /**
   * True when a requirement is for a *lower* tier than the copy being removed —
   * the higher tier was covering it, which is worth spelling out.
   */
  coversLowerTier: boolean;
  /** Uncollected fusion droids this one is an ingredient for. */
  fusions: FusionUse[];
}

const cardIndex = new Map(ALL_CARDS.map((c) => [c.id, c]));

export interface RemovalWarningInput {
  index: number;
  team: TeamAssignments;
  present: Set<string>;
  collected: Set<string>;
  rebirthPath: number;
  rebirthLevel: number;
}

/**
 * Rebirths that this removal would leave short.
 *
 * The test is what actually changes, not merely whether the droid appears
 * somewhere in the path: a requirement counts only when it was satisfied before
 * and stops being satisfied after. That runs through `hasEffectiveCard`, so
 * pulling a GOLD copy is flagged when it was the thing covering a DEFAULT
 * requirement.
 */
function brokenRebirths(
  cardId: string,
  present: Set<string>,
  rebirthPath: number,
  rebirthLevel: number
): BrokenRequirement[] {
  const path = REBIRTH_PATHS[rebirthPath as keyof typeof REBIRTH_PATHS];
  if (!path) return [];

  const after = new Set(present);
  after.delete(cardId);

  const broken: BrokenRequirement[] = [];

  // `from >= rebirthLevel` is every rebirth still ahead, starting with the one
  // being worked toward right now.
  path
    .filter((level) => level.from >= rebirthLevel)
    .forEach((level) => {
      level.droids.forEach((droid) => {
        if (
          hasEffectiveCard(present, droid.cardId) &&
          !hasEffectiveCard(after, droid.cardId)
        ) {
          broken.push({
            from: level.from,
            to: level.to,
            name: droid.name,
            tier: droid.tier,
            cardId: droid.cardId,
          });
        }
      });
    });

  return broken.sort((a, b) => a.from - b.from);
}

/**
 * Fusion recipes this droid feeds whose result has not been collected yet.
 *
 * Fusion keeps the tier of the droids fused, so a GOLD ingredient only ever
 * makes the GOLD result — there is no tier hierarchy to fall back on the way
 * rebirth requirements have one. A result already collected at this tier is
 * left out: the recipe is still valid, but nothing is lost by unparking the
 * ingredient.
 */
function fusionUses(
  name: string,
  tier: Tier,
  collected: Set<string>
): FusionUse[] {
  const uses: FusionUse[] = [];

  DROIDS.forEach((droid) => {
    if (!droid.fusion || !droid.tiers.includes(tier)) return;

    const count = droid.fusion.filter((part) => part === name).length;
    if (count === 0) return;

    if (collected.has(`${droid.name}_${tier}`)) return;

    uses.push({ name: droid.name, tier, recipe: droid.fusion, count });
  });

  return uses;
}

/**
 * Whether taking this droid out of its station costs anything, and what.
 *
 * Two things can be lost, and both hinge on the droid leaving "on hand": an
 * upcoming rebirth that was ticked off quietly going back to missing, and a
 * fusion recipe losing an ingredient it needs. A removal that drops a duplicate
 * costs neither — the other copy is still working — so that case returns null
 * and the caller just removes.
 */
export function getRemovalWarning({
  index,
  team,
  present,
  collected,
  rebirthPath,
  rebirthLevel,
}: RemovalWarningInput): RemovalWarning | null {
  const removed = team[index];
  if (!removed) return null;

  const card = cardIndex.get(removed.cardId);
  if (!card) return null; // stale save referencing a droid that no longer exists

  // Another copy still in a station keeps the droid on hand, so nothing breaks.
  const stillPlaced = team.some(
    (p, i) => i !== index && p.cardId === removed.cardId
  );
  if (stillPlaced) return null;

  const tier = card.tier as Tier;

  const broken = brokenRebirths(
    removed.cardId,
    present,
    rebirthPath,
    rebirthLevel
  );
  const fusions = fusionUses(card.droid.name, tier, collected);

  if (broken.length === 0 && fusions.length === 0) return null;

  return {
    index,
    cardId: removed.cardId,
    name: card.droid.name,
    tier,
    station: removed.station,
    broken,
    nextLevel: broken[0]?.to ?? null,
    coversLowerTier: broken.some((b) => b.cardId !== removed.cardId),
    fusions,
  };
}
