import type { Tier } from '../lib/droidTypes';
import { TIER_DOT } from '../lib/droidTheme';
import { TIER_DNA } from './TierDNA';

interface Props {
  tier: Tier;
  droidName: string;
  collected: boolean;
  /** Marked on hand — a ring, so it reads without competing with collected. */
  present: boolean;
  /** A rebirth still ahead asks for this exact variant. */
  needed: boolean;
  onToggle: () => void;
}

/**
 * One variant of one droid, as a dot you can tap.
 *
 * Filled means collected, hollow means not. Colour carries the tier, which the
 * letter alone cannot — Default and Diamond are both "D", Gold and Galactic
 * both "G" — and the title says it in words for anyone the colour fails.
 *
 * The dot is 20px inside a 44pt target: seven of them plus a name will not fit
 * across a phone at full size, and shrinking the target rather than the dot is
 * what the tablet pass was written to stop.
 */
export function VariantDot({
  tier,
  droidName,
  collected,
  present,
  needed,
  onToggle,
}: Props) {
  const dot = TIER_DOT[tier];
  const letter = TIER_DNA[tier]?.letter ?? '?';

  const state = collected
    ? present
      ? 'collected, on hand'
      : 'collected'
    : needed
      ? 'not collected — a rebirth ahead needs it'
      : 'not collected';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={collected}
      title={`${droidName} ${tier} — ${state}. Click to toggle collected.`}
      className="flex min-h-tap min-w-tap shrink-0 items-center justify-center"
    >
      <span
        className={[
          'flex h-5 w-5 items-center justify-center rounded-full text-4xs font-black transition-all',
          collected ? 'text-black' : 'text-zinc-600',
          present
            ? 'ring-2 ring-cyan-400/70 ring-offset-1 ring-offset-black'
            : '',
        ].join(' ')}
        style={{
          background: collected ? dot.fill : 'transparent',
          border: collected
            ? 'none'
            : `2px solid ${dot.hex}${needed ? '' : '59'}`,
          boxShadow: collected ? `0 0 6px ${dot.hex}66` : undefined,
        }}
      >
        {letter}
      </span>
    </button>
  );
}
