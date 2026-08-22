import type { Tier } from './droidTypes';
import { ALL_CARDS } from '../data/droids';
import { getDroidEconomy } from './droidEconomy';
import {
  CLASS_MATCH_BONUS,
  EARNING_STATIONS,
  STATIONS,
  creditMultiplierAt,
  isClassMatch,
  slotsAt,
  type Station,
} from '../data/rebirthUnlocks';

/**
 * One droid sitting in one slot.
 *
 * A list rather than a cardId -> station map, because you can craft several of
 * the same droid and work them in different stations. Keying by cardId capped
 * every droid at a single placement, which the game does not.
 */
export interface TeamPlacement {
  cardId: string;
  station: Station;
}

export type TeamAssignments = TeamPlacement[];

/** Placements are removed by position, which stays unambiguous with duplicates. */
export type PlacementIndex = number;

/** How many copies of this card are currently placed anywhere. */
export function placedCount(
  assignments: TeamAssignments,
  cardId: string
): number {
  return assignments.filter((p) => p.cardId === cardId).length;
}

/** How many slots of this station are taken. */
export function usedSlots(
  assignments: TeamAssignments,
  station: Station
): number {
  return assignments.filter((p) => p.station === station).length;
}

export interface TeamMember {
  /** Position in the placements list, for removing this exact copy. */
  index: PlacementIndex;
  cardId: string;
  name: string;
  tier: Tier;
  type: string;
  station: Station;
  /** Credits per second before the rebirth multiplier. Null in non-earning slots. */
  income: number | null;
  /** True when the droid's class matches its station, earning the 10% bonus. */
  classMatch: boolean;
  /** The bonus itself, in credits per second. */
  classMatchBonus: number;
}

export interface StationGroup {
  station: Station;
  members: TeamMember[];
  slots: number;
  full: boolean;
}

export interface TeamEarnings {
  /** Sum of assigned workstation income, before bonuses. */
  base: number;
  /** Extra credits/sec from droids sitting in a station matching their class. */
  classBonus: number;
  /** How many assigned droids are earning that bonus. */
  matched: number;
  /** How many are in an earning station at all. */
  working: number;
  /** Rebirth credit multiplier as a fraction (0.45 = +45%). */
  multiplier: number;
  /** What the team actually earns: base x (1 + multiplier). */
  effective: number;
  /** Per-second figures scaled out, for readability. */
  perMinute: number;
  perHour: number;
}

const cardIndex = new Map(ALL_CARDS.map((c) => [c.id, c]));

export function getTeam(assignments: TeamAssignments): TeamMember[] {
  const members: TeamMember[] = [];
  assignments.forEach(({ cardId, station }, index) => {
    const card = cardIndex.get(cardId);
    if (!card) return; // stale save referencing a droid that no longer exists
    const eco = getDroidEconomy(card.droid.name, card.tier);
    const earning = EARNING_STATIONS.includes(station);
    const income = earning ? (eco?.income ?? null) : null;
    const classMatch = earning && isClassMatch(station, card.droid.type);
    members.push({
      index,
      cardId,
      name: card.droid.name,
      tier: card.tier,
      type: card.droid.type,
      station,
      income,
      classMatch,
      classMatchBonus: classMatch && income ? income * CLASS_MATCH_BONUS : 0,
    });
  });
  return members;
}

export function getStationGroups(
  assignments: TeamAssignments,
  rebirthLevel: number
): StationGroup[] {
  const team = getTeam(assignments);
  return STATIONS.map((station) => {
    const members = team.filter((m) => m.station === station);
    const slots = slotsAt(station, rebirthLevel);
    return { station, members, slots, full: members.length >= slots };
  });
}

export function getTeamEarnings(
  assignments: TeamAssignments,
  rebirthLevel: number
): TeamEarnings {
  const team = getTeam(assignments);
  const working = team.filter((m) => m.income !== null);

  const base = working.reduce((sum, m) => sum + (m.income ?? 0), 0);
  const classBonus = working.reduce((sum, m) => sum + m.classMatchBonus, 0);

  const multiplier = creditMultiplierAt(rebirthLevel);
  const effective = (base + classBonus) * (1 + multiplier);

  return {
    base,
    classBonus,
    matched: working.filter((m) => m.classMatch).length,
    working: working.length,
    multiplier,
    effective,
    perMinute: effective * 60,
    perHour: effective * 3600,
  };
}

/**
 * Whether a card can go into a station right now. Class is not a constraint —
 * any droid works any station — so this is just: the station needs a free slot,
 * and a droid cannot be in two places at once.
 */
export function canAssign(
  cardId: string,
  station: Station,
  assignments: TeamAssignments,
  rebirthLevel: number
): { ok: boolean; reason?: string } {
  const card = cardIndex.get(cardId);
  if (!card) return { ok: false, reason: 'Unknown droid' };

  if (usedSlots(assignments, station) >= slotsAt(station, rebirthLevel)) {
    return {
      ok: false,
      reason: `No free ${station} slot at rebirth ${rebirthLevel}`,
    };
  }

  return { ok: true };
}

/**
 * Where a one-click "add to team" should put this droid.
 *
 * Prefers the workstation matching its class, since that is the only placement
 * that earns. Falls back to the Lounge, which still counts the droid as on hand
 * for rebirth requirements. Returns null when everything is full, so the caller
 * can explain why nothing happened rather than failing silently.
 */
export function autoStationFor(
  cardId: string,
  assignments: TeamAssignments,
  rebirthLevel: number
): Station | null {
  const card = cardIndex.get(cardId);
  if (!card) return null;

  // Its own class first, for the 10% match bonus; then any other workstation,
  // since an unmatched droid still earns full rate; then the Lounge, which
  // earns nothing but keeps the droid on hand for rebirth requirements.
  const preferred = card.droid.type as Station;
  const order: Station[] = [
    preferred,
    ...EARNING_STATIONS.filter((s) => s !== preferred),
    'LOUNGE',
  ];
  for (const station of order) {
    if (canAssign(cardId, station, assignments, rebirthLevel).ok)
      return station;
  }
  return null;
}

/**
 * Cards that can be placed. "Owned" is `collected` rather than `present`,
 * because assigning a droid is what marks it present in the first place.
 *
 * A card already on the team is still offered — you can craft several of the
 * same droid and work them in different stations.
 */
export function eligibleFor(collected: Set<string>) {
  return ALL_CARDS.filter((c) => collected.has(c.id));
}

export interface Candidate {
  card: (typeof ALL_CARDS)[number];
  eligible: boolean;
  /** Whether this droid's class matches the station, earning 10% more. */
  classMatch: boolean;
  /** How many copies of this card are already placed somewhere. */
  already: number;
  /** Why it cannot go here, when it cannot. */
  reason?: string;
}

/**
 * Every collected card, tagged with whether it can go in this station and
 * whether it would earn the class-match bonus there.
 *
 * Ineligible ones are still returned so the picker can show them greyed out
 * with a reason — hiding them makes the search look broken to someone who knows
 * they own the droid.
 */
export function candidatesFor(
  station: Station,
  collected: Set<string>,
  assignments: TeamAssignments,
  rebirthLevel: number
): Candidate[] {
  return ALL_CARDS.filter((c) => collected.has(c.id)).map((card) => {
    const classMatch =
      EARNING_STATIONS.includes(station) &&
      isClassMatch(station, card.droid.type);

    // Already-placed copies do not disqualify a card; you can work several of
    // the same droid. Only a full station does.
    const already = placedCount(assignments, card.id);
    const check = canAssign(card.id, station, assignments, rebirthLevel);
    if (!check.ok) {
      return {
        card,
        classMatch,
        already,
        eligible: false,
        reason: 'no free slot',
      };
    }
    return { card, classMatch, already, eligible: true };
  });
}
