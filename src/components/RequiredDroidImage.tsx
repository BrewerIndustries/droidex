import type { RequiredDroid } from '../lib/types';

interface Props {
  droid: RequiredDroid;

  isCollected: boolean;
  isPresent: boolean;

  futureUseCountMap: Record<string, number>;
}

const TIER_CLASS: Record<string, string> = {
  DEFAULT: 'text-gray-400',
  GOLD: 'text-amber-400',
  DIAMOND: 'text-sky-300',
  RAINBOW: 'rainbow-tab',
};

function imgSrc(name: string, tier: string) {
  const safe = name.replace(/ /g, '_');
  return `${import.meta.env.BASE_URL}droids/${safe}_${tier}.png`;
}

export function RequiredDroidImage({
  droid,
  isCollected,
  isPresent,
  futureUseCountMap,
}: Props) {
  return (
    <div
      className={`relative w-[5.5rem] h-[5.5rem] rounded-xl border-2 overflow-hidden bg-zinc-900 ${
        isPresent
          ? 'droid-card-owned'
          : isCollected
            ? 'border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.45)]'
            : 'droid-card-missing'
      }`}
    >
      <img
        src={imgSrc(droid.name, droid.tier)}
        alt={droid.name}
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 text-center py-0.5 bg-black/60">
        <span
          className={`text-4xs font-black uppercase tracking-wide ${
            TIER_CLASS[droid.tier] ?? 'text-gray-400'
          }`}
        >
          {droid.tier}
        </span>
      </div>

      {futureUseCountMap[droid.cardId] > 0 && (
        <div className="absolute top-1 right-1 px-1.5 rounded bg-amber-900/90 border border-amber-500/50 text-3xs font-bold text-amber-300">
          ↻{futureUseCountMap[droid.cardId]}
        </div>
      )}

      <div
        className={`absolute top-1 left-1 w-5 h-5 rounded-full flex items-center justify-center ${
          isPresent
            ? 'bg-green-500'
            : isCollected
              ? 'bg-cyan-500'
              : 'bg-red-500'
        }`}
      >
        {isPresent ? (
          <svg
            viewBox="0 0 10 10"
            className="w-3 h-3"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
          >
            <path
              d="M1.5 5l2.5 2.5 4.5-4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 10 10"
            className="w-3 h-3"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
          >
            <path d="M2 2l6 6M8 2l-6 6" strokeLinecap="round" />
          </svg>
        )}
      </div>
    </div>
  );
}
