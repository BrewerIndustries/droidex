import { useEffect } from 'react';
import { AlertTriangle, Atom, RefreshCw } from 'lucide-react';
import type { RemovalWarning } from '../lib/teamRemoval';
import type { Station } from '../data/rebirthUnlocks';

interface Props {
  warning: RemovalWarning;
  onConfirm: () => void;
  onCancel: () => void;
}

const STATION_LABEL: Record<Station, string> = {
  WORKER: 'Worker station',
  ASTROMECH: 'Astromech station',
  BATTLE: 'Battle station',
  LOUNGE: 'Lounge',
  COMPANION: 'Companion',
};

/**
 * Second look before pulling a droid that is still spoken for.
 *
 * Removing the last placed copy clears the droid from "on hand", which both
 * silently un-readies a rebirth that was ticked off and takes an ingredient out
 * of a fusion that has not been made yet — the expensive mistakes this is here
 * to catch. It only appears when something would actually be lost, so a plain
 * shuffle of stations still costs one click.
 */
export function RemoveDroidConfirm({ warning, onConfirm, onCancel }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);

  const { name, tier, station, broken, nextLevel, coversLowerTier, fusions } =
    warning;

  const manyRebirths = broken.length > 1;

  const title =
    nextLevel !== null
      ? `Still needed for Rebirth ${nextLevel}`
      : fusions.length > 1
        ? 'Still needed for fusions'
        : `Still needed to fuse ${fusions[0].name}`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
      onClick={onCancel}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="remove-droid-title"
        className="w-full max-w-sm rounded-lg border border-amber-700/60 bg-zinc-950 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-2">
          <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-400" />
          <div>
            <div
              id="remove-droid-title"
              className="text-sm font-black italic text-white"
            >
              {title}
            </div>
            <div className="mt-0.5 text-[10px] tracking-widest text-zinc-500">
              {tier} · {name} · {STATION_LABEL[station]}
            </div>
          </div>
        </div>

        <p className="mt-3 text-[11px] leading-relaxed text-zinc-400">
          This is your last {tier} {name} in a station. Removing it takes the
          droid off hand:
        </p>

        {broken.length > 0 && (
          <div className="mt-2 space-y-1">
            <div className="text-[9px] tracking-widest text-zinc-600">
              {manyRebirths
                ? 'THESE REBIRTHS GO BACK TO MISSING'
                : 'THIS REBIRTH GOES BACK TO MISSING'}
            </div>
            {broken.map((b) => (
              <div
                key={`${b.from}-${b.cardId}`}
                className="flex items-center gap-2 rounded border border-orange-500/40 bg-orange-500/10 px-2 py-1"
              >
                <RefreshCw size={10} className="shrink-0 text-orange-400" />
                <span className="text-[10px] font-bold tracking-wide text-orange-300">
                  RB{b.from} → RB{b.to}
                </span>
                <span className="flex-1 truncate text-right text-[10px] text-zinc-400">
                  needs {b.tier} {b.name}
                </span>
              </div>
            ))}
            {coversLowerTier && (
              <p className="text-[9px] leading-relaxed text-zinc-600">
                A higher tier covers a lower-tier requirement, so your {tier}{' '}
                {name} is what{' '}
                {manyRebirths ? 'those rebirths are' : 'that one is'} counting
                on.
              </p>
            )}
          </div>
        )}

        {fusions.length > 0 && (
          <div className="mt-2 space-y-1">
            <div className="text-[9px] tracking-widest text-zinc-600">
              {fusions.length > 1
                ? 'INGREDIENT FOR FUSIONS YOU HAVE NOT MADE'
                : 'INGREDIENT FOR A FUSION YOU HAVE NOT MADE'}
            </div>
            {fusions.map((f) => (
              <div
                key={f.name}
                className="rounded border border-fuchsia-500/40 bg-fuchsia-500/10 px-2 py-1"
              >
                <div className="flex items-center gap-2">
                  <Atom size={10} className="shrink-0 text-fuchsia-400" />
                  <span className="text-[10px] font-bold tracking-wide text-fuchsia-300">
                    {f.tier} {f.name}
                  </span>
                  {f.count > 1 && (
                    <span
                      title={`The recipe uses ${f.count} of them`}
                      className="text-[9px] font-bold text-fuchsia-400/80"
                    >
                      ×{f.count}
                    </span>
                  )}
                  <span className="flex-1 truncate text-right text-[10px] text-zinc-400">
                    {f.recipe.join(' + ')}
                  </span>
                </div>
              </div>
            ))}
            <p className="text-[9px] leading-relaxed text-zinc-600">
              Fusion keeps the tier of the droids fused, so only a {tier} {name}{' '}
              makes {fusions.length > 1 ? 'these' : 'this'}.
            </p>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            autoFocus
            onClick={onCancel}
            className="flex-1 rounded border border-cyan-700 bg-cyan-500/10 px-2 py-1.5 text-[11px] font-bold text-cyan-300 hover:border-cyan-500"
          >
            Keep on team
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded border border-zinc-800 px-2 py-1.5 text-[11px] font-bold text-zinc-500 hover:border-red-800 hover:text-red-400"
          >
            Remove anyway
          </button>
        </div>
      </div>
    </div>
  );
}
