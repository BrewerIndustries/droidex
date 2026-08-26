import { REBIRTH_PATHS } from '../data/rebirthPaths';
import { hasEffectiveCard, getDroidProgress } from '../lib/droidHierarchy';
import { TierDNA } from './TierDNA';
import {
  getRemainingRequirementCount,
  getMissingDroids,
  getReadyReason,
  getReadyExplanation,
  getNextAction,
} from '../lib/companion';

interface Props {
  rebirthPath: number;
  rebirthLevel: number;
  collected: Set<string>;
  present: Set<string>;
  onSetRebirth: (level: number) => void;
  onTogglePresent: (id: string) => void;

  onMarkLevelDone: (cardIds: string[]) => void;
}

const TIER_TEXT: Record<string, string> = {
  DEFAULT: 'text-gray-400',
  GOLD: 'text-amber-400',
  DIAMOND: 'text-sky-300',
  RAINBOW: 'text-purple-400',
};

function imgSrc(name: string, tier: string): string {
  const safe = name.replace(/ /g, '_');
  return `${import.meta.env.BASE_URL}droids/${safe}_${tier}.png`;
}

export function RebirthsPage({
  rebirthPath,
  rebirthLevel,
  collected,
  present,
  onSetRebirth,
  onTogglePresent,
  onMarkLevelDone,
}: Props) {
  const activePath = REBIRTH_PATHS[rebirthPath as keyof typeof REBIRTH_PATHS];
  const MAX_REBIRTH = Math.max(...activePath.map((r) => r.from));

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Sticky rebirth level selector */}
      <div className="sticky top-0 z-10 bg-black border-b border-zinc-800 px-4 py-2 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => onSetRebirth(Math.max(0, rebirthLevel - 1))}
          disabled={rebirthLevel === 0}
          className="w-10 h-10 min-w-tap min-h-tap rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-base font-bold transition-colors"
        >
          ←
        </button>
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 text-xs uppercase tracking-widest">
            Current Rebirth
          </span>
          <span className="text-orange-400 font-black text-xl leading-none w-8 text-center">
            {rebirthLevel}
          </span>
          {rebirthLevel >= MAX_REBIRTH && (
            <span className="text-yellow-400 text-xs font-bold">MAX</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => onSetRebirth(Math.min(MAX_REBIRTH, rebirthLevel + 1))}
          disabled={rebirthLevel >= MAX_REBIRTH}
          className="w-10 h-10 min-w-tap min-h-tap rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-base font-bold transition-colors"
        >
          →
        </button>
      </div>

      {/* Level cards */}
      <div className="max-w-3xl mx-auto px-3 py-3 space-y-3">
        {activePath.map((level) => {
          const isDone = level.to <= rebirthLevel;
          const isCurrent = level.from === rebirthLevel;
          const missing = getMissingDroids(present, level.droids);
          const readyReason = getReadyReason(present, level.droids);
          const nextAction = getNextAction(present, level.droids);
          const allMet = missing.length === 0;

          return (
            <div
              key={level.from}
              className={`rounded-xl border px-4 py-3 transition-all ${
                isCurrent
                  ? 'border-orange-500 bg-zinc-900 shadow-[0_0_10px_2px_rgba(249,115,22,0.2)]'
                  : isDone
                    ? 'border-zinc-800 bg-zinc-950 opacity-40'
                    : 'border-zinc-800 bg-zinc-950'
              }`}
            >
              {/* Row header */}
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span
                  className={`font-black text-sm tracking-widest uppercase ${isCurrent ? 'text-orange-400' : isDone ? 'text-zinc-500' : 'text-zinc-300'}`}
                >
                  Rebirth {level.from} → {level.to}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-zinc-800 border border-yellow-500/40 text-yellow-400 font-bold text-xs">
                  {level.credits} credits
                </span>
                <div className="ml-auto">
                  <button
                    type="button"
                    onClick={() =>
                      onMarkLevelDone(level.droids.map((d) => d.cardId))
                    }
                    className={`px-3 py-2 min-h-tap rounded-md text-xs font-bold transition-colors ${
                      isDone
                        ? 'text-zinc-500 hover:text-zinc-300'
                        : allMet
                          ? 'text-green-400 hover:text-green-300'
                          : 'text-red-400 hover:text-red-300'
                    }`}
                  >
                    {isDone ? '✓ DONE' : readyReason}
                  </button>
                </div>
              </div>

              {!isDone && (
                <div className="mt-2 text-xs space-y-1">
                  {nextAction && (
                    <div className="text-sky-400 font-medium">{nextAction}</div>
                  )}

                  {getReadyExplanation(present, level.droids).map((line) => (
                    <div key={line} className="text-zinc-500">
                      {line}
                    </div>
                  ))}
                </div>
              )}
              {/* Droid cards */}
              <div className="flex flex-wrap gap-3">
                {level.droids.map((d) => {
                  const isCollected = collected.has(d.cardId);
                  const isPresent = hasEffectiveCard(present, d.cardId);
                  const remainingRequirements = getRemainingRequirementCount(
                    activePath,
                    level.from,
                    d.name
                  );

                  const isLastRequirement = remainingRequirements === 1;
                  const progress = getDroidProgress(present, d.name);
                  return (
                    <div
                      key={d.cardId}
                      className="flex flex-col items-center gap-1"
                    >
                      <div
                        className={`relative w-[4.75rem] h-[4.75rem] rounded-xl border-2 overflow-hidden bg-zinc-900 ${
                          isDone
                            ? 'border-zinc-700'
                            : isPresent
                              ? 'border-green-500'
                              : isCollected
                                ? 'border-yellow-500'
                                : 'border-red-500'
                        }`}
                      >
                        <img
                          src={imgSrc(d.name, d.tier)}
                          alt={d.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              'none';
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 text-center py-0.5 bg-black/60">
                          <span
                            className={`text-4xs font-black uppercase tracking-wide ${TIER_TEXT[d.tier]}`}
                          >
                            {d.tier}
                          </span>
                        </div>

                        {remainingRequirements > 0 && (
                          <div
                            className={`absolute top-1 right-1 px-1 rounded border text-4xs font-bold ${
                              isLastRequirement
                                ? 'bg-emerald-900/90 border-amber-500/50 text-amber-300'
                                : 'bg-amber-900/90 border-amber-500/50 text-amber-300'
                            }`}
                          >
                            {isLastRequirement
                              ? 'LAST'
                              : `↻${remainingRequirements}`}
                          </div>
                        )}

                        {!isDone && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onTogglePresent(d.cardId);
                            }}
                            className={`tap-tl absolute top-1 left-1 w-5 h-5 rounded-full flex items-center justify-center ${
                              isPresent ? 'bg-green-500' : 'bg-red-500'
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
                                <path
                                  d="M2 2l6 6M8 2l-6 6"
                                  strokeLinecap="round"
                                />
                              </svg>
                            )}
                          </button>
                        )}
                      </div>
                      <span className="text-white text-2xs font-bold w-[4.75rem] text-center truncate">
                        {d.name}
                      </span>
                      <div className="w-[4.75rem] mt-0.5">
                        <TierDNA progress={progress} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {rebirthLevel >= MAX_REBIRTH && (
          <div className="text-center py-6 text-yellow-400 font-bold text-sm">
            Maximum rebirth level reached!
          </div>
        )}
      </div>
    </div>
  );
}
