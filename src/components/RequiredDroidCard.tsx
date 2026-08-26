import { hasEffectiveCard, getDroidProgress } from '../lib/droidHierarchy';
import { TierDNA } from './TierDNA';
import { RequiredDroidImage } from './RequiredDroidImage';
import type { RequiredDroid } from '../lib/types';

interface Props {
  droid: RequiredDroid;

  collected: Set<string>;
  present: Set<string>;

  futureUseCountMap: Record<string, number>;
}

export function RequiredDroidCard({
  droid,
  collected,
  present,
  futureUseCountMap,
}: Props) {
  const progress = getDroidProgress(present, droid.name);

  const isCollected = collected.has(droid.cardId);

  const isPresent = hasEffectiveCard(present, droid.cardId);

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Warning triangle above card if missing */}
      <div className="h-5 flex items-center justify-center">
        {!isPresent && (
          <div className="flex items-center justify-center w-5 h-5 rounded bg-yellow-400/15">
            <svg viewBox="0 0 16 14" className="w-3.5 h-3.5" fill="none">
              <polygon
                points="8,1 15,13 1,13"
                fill="#facc15"
                stroke="#ca8a04"
                strokeWidth="0.5"
              />
              <text
                x="8"
                y="11.5"
                textAnchor="middle"
                fontSize="8"
                fontWeight="bold"
                fill="#1c1917"
              >
                !
              </text>
            </svg>
          </div>
        )}
      </div>

      <RequiredDroidImage
        droid={droid}
        isCollected={isCollected}
        isPresent={isPresent}
        futureUseCountMap={futureUseCountMap}
      />

      <span className="text-white text-2xs font-bold w-[5.5rem] text-center truncate">
        {droid.name}
      </span>

      <div className="w-[5.5rem] mt-0.5">
        <TierDNA progress={progress} />
      </div>
    </div>
  );
}
