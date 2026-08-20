import { type LucideIcon } from 'lucide-react';
import { DroidRebirthBadge } from './DroidRebirthBadge';
import { TierDNA } from './TierDNA';
import type { Droid } from '../data/droids';
import type { Tier } from '../lib/droidTypes';
import { DROID_INFO } from '../data/droidInfo';
import { getDroidFacts } from '../lib/droidFacts';
import { DroidAbilities } from './DroidAbilities';
import { DroidStats } from './DroidStats';

interface Props {
  droid: Droid;

  tier: Tier;

  facts: ReturnType<typeof getDroidFacts>;

  rarityColor: string;

  badge: {
    Icon: LucideIcon;
    bg: string;
  };

  info: (typeof DROID_INFO)[string];

  rebirthLevels?: number[];
  futureUsage: string;

  isPresent: boolean;
  isSafe: boolean;

  id: string;
  onTogglePresent: (id: string) => void;
}

export function DroidCardFooter({
  droid,
  tier,
  facts,
  rarityColor,
  badge,
  info,
  rebirthLevels,
  futureUsage,
  isPresent,
  isSafe,
  id,
  onTogglePresent,
}: Props) {
  return (
    <div className="w-full bg-black px-1.5 pt-1 pb-0.5 min-h-[5.2rem]">
      <p className="text-white font-black italic leading-tight truncate text-sm">
        {droid.name}
      </p>

      <div className="mt-0.5">
        <TierDNA progress={facts.dna} />
      </div>

      <p className="flex items-center justify-center gap-1 text-[9px] uppercase tracking-wider text-zinc-500">
        <badge.Icon size={10} />
        {droid.type}
      </p>

      <div className="mt-0.5">
        <span
          className="text-[9px] font-bold px-1.5 py-px rounded-full uppercase tracking-wide inline-block"
          style={{
            color: rarityColor,
            backgroundColor: rarityColor + '22',
            border: `1px solid ${rarityColor}66`,
          }}
        >
          {droid.rarity}
        </span>
      </div>

      <DroidStats droidName={droid.name} tier={tier} />

      <DroidAbilities info={info} />

      <DroidRebirthBadge
        rebirthLevels={rebirthLevels}
        futureUsage={futureUsage}
        isPresent={isPresent}
        isSafe={isSafe}
        id={id}
        onTogglePresent={onTogglePresent}
      />
    </div>
  );
}
