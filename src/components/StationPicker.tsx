import { ALL_CARDS } from '../data/droids';
import {
  CLASS_MATCH_BONUS,
  EARNING_STATIONS,
  STATIONS,
  isClassMatch,
  slotsAt,
  type Station,
} from '../data/rebirthUnlocks';
import { formatCredits, getDroidEconomy } from '../lib/droidEconomy';
import type { TeamAssignments } from '../lib/team';

interface Props {
  cardId: string;
  team: TeamAssignments;
  rebirthLevel: number;
  onPick: (station: Station) => void;
  onRemove: () => void;
  onClose: () => void;
}

const LABEL: Record<Station, string> = {
  WORKER: 'Worker station',
  ASTROMECH: 'Astromech station',
  BATTLE: 'Battle station',
  LOUNGE: 'Lounge',
  COMPANION: 'Companion',
};

const cardIndex = new Map(ALL_CARDS.map((c) => [c.id, c]));

/**
 * Asks which station a droid should go to.
 *
 * Any droid works any station, so there is no single right answer to guess at —
 * but the choice is not arbitrary either, since a station matching the droid's
 * class pays 10% more. Each option shows what the droid would actually earn
 * there, so the trade-off is visible at the point of deciding.
 */
export function StationPicker({
  cardId,
  team,
  rebirthLevel,
  onPick,
  onRemove,
  onClose,
}: Props) {
  const card = cardIndex.get(cardId);
  if (!card) return null;

  const current = team[cardId] ?? null;
  const income = getDroidEconomy(card.droid.name, card.tier)?.income ?? 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs rounded-lg border border-zinc-700 bg-zinc-950 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-sm font-black italic text-white">
              {card.droid.name}
            </div>
            <div className="text-[10px] tracking-widest text-zinc-500">
              {card.tier} · {card.droid.type}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-600 hover:text-zinc-300 text-sm leading-none"
          >
            ✕
          </button>
        </div>

        <div className="mt-3 space-y-1">
          {STATIONS.map((station) => {
            const used = Object.entries(team).filter(
              ([id, s]) => s === station && id !== cardId
            ).length;
            const slots = slotsAt(station, rebirthLevel);
            const full = used >= slots;
            const here = current === station;
            const earns = EARNING_STATIONS.includes(station);
            const match = earns && isClassMatch(station, card.droid.type);
            const rate = earns
              ? income * (match ? 1 + CLASS_MATCH_BONUS : 1)
              : 0;

            return (
              <button
                key={station}
                type="button"
                disabled={full || here}
                onClick={() => onPick(station)}
                title={
                  here
                    ? 'Already here'
                    : full
                      ? `No free ${station} slot at rebirth ${rebirthLevel}`
                      : match
                        ? 'Matches its class — earns 10% more'
                        : undefined
                }
                className={[
                  'w-full flex items-center gap-2 rounded border px-2 py-1.5 text-left',
                  here
                    ? 'border-cyan-600 bg-cyan-500/10'
                    : full
                      ? 'border-zinc-900 bg-zinc-950/40 opacity-40 cursor-not-allowed'
                      : 'border-zinc-800 bg-zinc-900 hover:border-cyan-700',
                ].join(' ')}
              >
                <span className="flex-1 text-xs font-bold text-white">
                  {LABEL[station]}
                </span>

                {match && (
                  <span className="text-[9px] font-bold text-cyan-300">
                    +10%
                  </span>
                )}

                <span className="text-[10px] tabular-nums text-emerald-400">
                  {earns ? `${formatCredits(rate)}/s` : '—'}
                </span>

                <span className="text-[9px] tabular-nums text-zinc-600">
                  {used}/{slots}
                </span>
              </button>
            );
          })}
        </div>

        {current && (
          <button
            type="button"
            onClick={onRemove}
            className="mt-3 w-full rounded border border-zinc-700 px-2 py-1 text-[10px] tracking-wider text-zinc-400 hover:border-red-700 hover:text-red-400"
          >
            REMOVE FROM TEAM
          </button>
        )}

        <p className="mt-3 text-[9px] leading-relaxed text-zinc-600">
          Any droid works any station. Matching its class earns 10% more. The
          Lounge earns nothing but keeps the droid on hand for rebirths.
        </p>
      </div>
    </div>
  );
}
