// src/components/TierDNA.tsx

import { TIER_ORDER } from '../data/droids';

interface Props {
  progress: number;
}

// One marker per tier, in TIER_ORDER, so the strip never drifts from the
// tier list. Letters repeat across tiers (DEFAULT/DIAMOND, GOLD/GALACTIC);
// the colour is what tells them apart.
const TIER_DNA: Record<string, { letter: string; color: string }> = {
  DEFAULT: { letter: 'D', color: 'text-zinc-300' },
  GOLD: { letter: 'G', color: 'text-amber-400' },
  DIAMOND: { letter: 'D', color: 'text-sky-300' },
  RAINBOW: { letter: 'R', color: 'text-purple-400' },
  BESKAR: { letter: 'B', color: 'text-zinc-100' },
  GALACTIC: { letter: 'G', color: 'text-purple-500' },
  STELLAR: { letter: 'S', color: 'text-orange-400' },
};

export function TierDNA({ progress }: Props) {
  return (
    <div className="flex justify-center gap-0.5 text-4xs font-black">
      {TIER_ORDER.map((tier, index) => {
        const dna = TIER_DNA[tier];
        const reached = progress >= index + 1;

        return (
          <span key={tier} className={reached ? dna.color : 'text-zinc-700'}>
            {reached ? '■' : '□'}
            {dna.letter}
          </span>
        );
      })}
    </div>
  );
}
