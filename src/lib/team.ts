import type { Tier } from './droidTypes';
import { ALL_CARDS } from '../data/droids';
import { getDroidEconomy } from './droidEconomy';
import {
  EARNING_STATIONS,
  STATIONS,
  creditMultiplierAt,
  slotsAt,
  stationAccepts,
  type Station,
} from '../data/rebirthUnlocks';

/** cardId -> the station that droid is sitting in. */
export type TeamAssignments = Record<string, Station>;

export interface TeamMember {
  cardId: string;
  name: string;
  tier: Tier;
  type: string;
  station: Station;
  /** Credits per second before the rebirth multiplier. Null in non-earning slots. */
  income: number | null;
}

export interface StationGroup {
  station: Station;
  members: TeamMember[];
  slots: number;
  full: boolean;
}

export interface TeamEarnings {
  /** Sum of assigned workstation income, before the rebirth multiplier. */
  base: number;
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
  for (const [cardId, station] of Object.entries(assignments)) {
    const card = cardIndex.get(cardId);
    if (!card) continue; // stale save referencing a droid that no longer exists
    const eco = getDroidEconomy(card.droid.name, card.tier);
    members.push({
      cardId,
      name: card.droid.name,
      tier: card.tier,
      type: card.droid.type,
      station,
      income: EARNING_STATIONS.includes(station) ? (eco?.income ?? null) : null,
    });
  }
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
  const base = getTeam(assignments).reduce(
    (sum, m) => sum + (m.income ?? 0),
    0
  );
  const multiplier = creditMultiplierAt(rebirthLevel);
  const effective = base * (1 + multiplier);
  return {
    base,
    multiplier,
    effective,
    perMinute: effective * 60,
    perHour: effective * 3600,
  };
}

/**
 * Whether a card can go into a station right now: the class has to match, the
 * station needs a free slot, and a droid cannot be in two places at once.
 */
export function canAssign(
  cardId: string,
  station: Station,
  assignments: TeamAssignments,
  rebirthLevel: number
): { ok: boolean; reason?: string } {
  const card = cardIndex.get(cardId);
  if (!card) return { ok: false, reason: 'Unknown droid' };

  if (!stationAccepts(station, card.droid.type)) {
    return {
      ok: false,
      reason: `${station} slots only take ${station} droids`,
    };
  }

  const current = assignments[cardId];
  if (current === station)
    return { ok: false, reason: 'Already assigned here' };

  const used = Object.entries(assignments).filter(
    ([id, s]) => s === station && id !== cardId
  ).length;
  if (used >= slotsAt(station, rebirthLevel)) {
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

  const preferred = card.droid.type as Station;
  for (const station of [preferred, 'LOUNGE' as Station]) {
    if (canAssign(cardId, station, assignments, rebirthLevel).ok)
      return station;
  }
  return null;
}

/**
 * Cards eligible for a station: owned, class-appropriate, and not already
 * placed somewhere. "Owned" is `collected` rather than `present`, because
 * assigning a droid is what marks it present in the first place.
 */
export function eligibleFor(
  station: Station,
  collected: Set<string>,
  assignments: TeamAssignments
) {
  return ALL_CARDS.filter(
    (c) =>
      collected.has(c.id) &&
      !assignments[c.id] &&
      stationAccepts(station, c.droid.type)
  );
}

export interface Candidate {
  card: (typeof ALL_CARDS)[number];
  eligible: boolean;
  /** Why it cannot go here, when it cannot. */
  reason?: string;
}

/**
 * Every collected card, tagged with whether it can go in this station.
 *
 * The picker shows the ineligible ones too, greyed out with the reason. Simply
 * hiding them makes the search look broken — someone who knows they own a droid
 * searches for it, gets nothing back, and concludes the search is at fault
 * rather than learning the droid is the wrong class for the slot.
 */
export function candidatesFor(
  station: Station,
  collected: Set<string>,
  assignments: TeamAssignments,
  rebirthLevel: number
): Candidate[] {
  return ALL_CARDS.filter((c) => collected.has(c.id)).map((card) => {
    const placed = assignments[card.id];
    if (placed) {
      return {
        card,
        eligible: false,
        reason: placed === station ? 'already here' : `in ${placed}`,
      };
    }
    if (!stationAccepts(station, card.droid.type)) {
      return { card, eligible: false, reason: `${card.droid.type} droid` };
    }
    // Belt and braces: the picker only opens from an empty slot, but do not
    // let it overfill a station if that ever stops being true.
    const check = canAssign(card.id, station, assignments, rebirthLevel);
    if (!check.ok) return { card, eligible: false, reason: 'no free slot' };
    return { card, eligible: true };
  });
}
