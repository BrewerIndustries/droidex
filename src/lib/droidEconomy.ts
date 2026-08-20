import type { Tier } from './droidTypes';
import {
  DROID_STATS,
  SELL_RATIO,
  UPGRADE_CHIP_COST,
  type TierStats,
} from '../data/droidStats';
import { TIER_ORDER } from '../data/droids';

export interface DroidEconomy {
  /** Purchase cost in credits, or null for Iconics (bought with Nova Crystals). */
  cost: number | null;
  /** Credits per second. */
  income: number | null;
  /** Credits back when sold — a flat 70% of cost across the whole game. */
  sell: number | null;
  /**
   * Credits per second earned per 1,000 credits spent. Higher is better.
   * This is the "income per cost" ratio, scaled so the numbers stay readable.
   */
  efficiency: number | null;
  /** Seconds for the droid's income to repay its own cost. Lower is better. */
  paybackSeconds: number | null;
  /**
   * Upgrade Chips needed to bring the droid up into this tier from the one
   * below. null at DEFAULT, which is bought rather than upgraded into.
   */
  upgradeChips: number | null;
  /**
   * Credits/sec gained per Upgrade Chip spent on that upgrade. Higher is
   * better, and it is the number to compare when chips are the bottleneck
   * rather than credits — it favours very different droids than `efficiency`.
   */
  chipValue: number | null;
  /**
   * Upgrade Chips returned when the droid is sold.
   *
   * The game pays chips on sale for self-crafted droids, and the amount scales
   * with rarity and tier, but no public source documents the values — so this
   * stays null until the numbers are read out of the game.
   */
  chipsOnSale: number | null;
  /** Free-text stand-ins for Iconics, e.g. "30 Nova Crystals" or "15%/s". */
  costNote?: string;
  incomeNote?: string;
}

export function getDroidEconomy(name: string, tier: Tier): DroidEconomy | null {
  const entry = DROID_STATS[name];
  if (!entry) return null;

  const s: TierStats | undefined = entry.tiers[tier];
  const cost = s?.cost ?? null;
  const income = s?.income ?? null;

  const upgradeChips =
    UPGRADE_CHIP_COST[entry.rarity.toUpperCase()]?.[tier] ?? null;

  // Income the upgrade actually buys you, per chip spent.
  const prevTier = TIER_ORDER[TIER_ORDER.indexOf(tier) - 1];
  const prevIncome = prevTier ? (entry.tiers[prevTier]?.income ?? null) : null;
  const chipValue =
    upgradeChips && income !== null && prevIncome !== null
      ? (income - prevIncome) / upgradeChips
      : null;

  return {
    cost,
    income,
    sell: cost === null ? null : Math.round(cost * SELL_RATIO),
    efficiency: cost && income ? (income / cost) * 1000 : null,
    paybackSeconds: cost && income ? cost / income : null,
    upgradeChips,
    chipValue,
    chipsOnSale: null,
    costNote: entry.costNote,
    incomeNote: entry.incomeNote,
  };
}

/** 950 -> "950", 15200 -> "15.2K", 8.4e12 -> "8.4T" */
export function formatCredits(n: number): string {
  const units: [number, string][] = [
    [1e12, 'T'],
    [1e9, 'B'],
    [1e6, 'M'],
    [1e3, 'K'],
  ];
  for (const [size, suffix] of units) {
    if (n >= size) {
      const v = n / size;
      return `${v >= 100 ? Math.round(v) : parseFloat(v.toFixed(v >= 10 ? 1 : 2))}${suffix}`;
    }
  }
  return String(Math.round(n));
}

/** 475 -> "7m", 9.3e6 -> "108d" — coarse on purpose, it is a comparison aid. */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  if (seconds < 86400) return `${parseFloat((seconds / 3600).toFixed(1))}h`;
  if (seconds < 86400 * 365)
    return `${parseFloat((seconds / 86400).toFixed(1))}d`;
  return `${parseFloat((seconds / (86400 * 365)).toFixed(1))}y`;
}

/** Efficiency is tiny at high tiers, so keep 2 significant-ish decimals. */
export function formatEfficiency(e: number): string {
  if (e >= 100) return String(Math.round(e));
  if (e >= 1) return e.toFixed(1);
  if (e >= 0.01) return e.toFixed(2);
  return e.toExponential(1);
}
