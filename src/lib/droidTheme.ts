import { Wrench, Satellite, Crosshair, type LucideIcon } from 'lucide-react';

export const RARITY_COLOR: Record<string, string> = {
  COMMON: '#16a34a',
  RARE: '#3b82f6',
  EPIC: '#a855f7',
  LEGENDARY: '#f59e0b',
  MYTHIC: '#ef4444',
  ICONIC: '#ff00aa',
};

export const TYPE_BADGE: Record<string, { Icon: LucideIcon; bg: string }> = {
  WORKER: { Icon: Wrench, bg: '#16a34a' },
  ASTROMECH: { Icon: Satellite, bg: '#7c3aed' },
  BATTLE: { Icon: Crosshair, bg: '#dc2626' },
};

/**
 * The colour each tier is drawn in, as a value rather than a class, for the
 * roster's variant dots — they need the same colour as a fill, as a border and
 * at reduced opacity, which a Tailwind class cannot supply three ways.
 *
 * Rainbow has no single colour, so it carries a gradient and the others repeat
 * their hex as a flat one, letting the dot use one code path.
 */
export const TIER_DOT: Record<string, { hex: string; fill: string }> = {
  DEFAULT: { hex: '#a1a1aa', fill: '#a1a1aa' },
  GOLD: { hex: '#fbbf24', fill: '#fbbf24' },
  DIAMOND: { hex: '#7dd3fc', fill: '#7dd3fc' },
  RAINBOW: {
    hex: '#a855f7',
    fill: 'linear-gradient(135deg,#f87171,#fbbf24,#4ade80,#38bdf8,#a855f7)',
  },
  BESKAR: { hex: '#e4e4e7', fill: '#e4e4e7' },
  GALACTIC: { hex: '#a855f7', fill: '#a855f7' },
  STELLAR: { hex: '#fb923c', fill: '#fb923c' },
};

export const TIER_BORDER: Record<string, string> = {
  DEFAULT: 'border-zinc-600',
  GOLD: 'border-amber-400',
  DIAMOND: 'border-sky-300',
  RAINBOW: 'border-transparent',
  BESKAR: 'border-zinc-300',
  GALACTIC: 'border-purple-600',
  STELLAR: 'border-orange-400',
};

export const TIER_GLOW: Record<string, string> = {
  DEFAULT: '',
  GOLD: '0 0 10px 2px rgba(251,191,36,0.4)',
  DIAMOND: '0 0 10px 2px rgba(147,220,255,0.4)',
  RAINBOW: '0 0 12px 3px rgba(168,85,247,0.4)',
  BESKAR: '0 0 10px 2px rgba(229,229,229,0.4)',
  GALACTIC: '0 0 12px 3px rgba(147,51,234,0.5)',
  STELLAR: '0 0 12px 3px rgba(251,146,60,0.5)',
};
