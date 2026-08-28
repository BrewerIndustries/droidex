import type { Tier } from '../lib/droidTypes';
import { TIER_DNA } from './TierDNA';

interface Props {
  /** One entry per tier the droid comes in, in tier order. */
  variants: { tier: Tier; collected: boolean }[];
}

/**
 * Which tiers of a droid are collected, one marker each.
 *
 * The card grid's `TierDNA` takes a count, because a card's tiers are worked
 * through in order. Fusion is not like that — you fuse three Rainbow
 * ingredients into a Rainbow result without ever holding the Gold one — so this
 * reads each tier on its own rather than filling a bar up to a high-water mark.
 */
export function TierOwnedStrip({ variants }: Props) {
  return (
    <div className="flex gap-0.5 text-4xs font-black">
      {variants.map(({ tier, collected }) => {
        const dna = TIER_DNA[tier];
        return (
          <span
            key={tier}
            title={`${tier} — ${collected ? 'collected' : 'not collected'}`}
            className={collected ? dna.color : 'text-zinc-700'}
          >
            {collected ? '■' : '□'}
            {dna.letter}
          </span>
        );
      })}
    </div>
  );
}
