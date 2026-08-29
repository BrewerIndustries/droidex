import { useEffect } from 'react';
import { ALL_CARDS } from '../data/droids';
import {
  EARNING_STATIONS,
  STATIONS,
  isClassMatch,
  slotsAt,
  type Station,
} from '../data/rebirthUnlocks';
import { getStationGroups, type TeamAssignments } from '../lib/team';
import { RARITY_COLOR, TYPE_BADGE } from '../lib/droidTheme';

interface Props {
  /** Position in the placements list of the droid being moved. */
  index: number;
  team: TeamAssignments;
  rebirthLevel: number;
  onMove: (station: Station, slot: number) => void;
  onRemove: () => void;
  onClose: () => void;
}

const LABEL: Record<Station, string> = {
  WORKER: 'Worker',
  ASTROMECH: 'Astromech',
  BATTLE: 'Battle',
  LOUNGE: 'Lounge',
  COMPANION: 'Companion',
};

const cardIndex = new Map(ALL_CARDS.map((c) => [c.id, c]));

/**
 * Where a placed droid should sit — every slot in the base, laid out as it is.
 *
 * Slots hold their position, so moving is its own action rather than a remove
 * and a re-add: taking the droid out first would free its slot, clear it from
 * "on hand" if it was the last copy, and put up the removal warning for a
 * change that loses nothing. Landing on an occupied slot swaps the two droids,
 * which is what "put this one in slot 1" actually means when slot 1 is taken.
 */
export function PlacementMenu({
  index,
  team,
  rebirthLevel,
  onMove,
  onRemove,
  onClose,
}: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const placement = team[index];
  if (!placement) return null;

  const card = cardIndex.get(placement.cardId);
  if (!card) return null;

  const groups = getStationGroups(team, rebirthLevel);
  const Badge = TYPE_BADGE[card.droid.type]?.Icon;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="placement-menu-title"
        className="w-full max-w-xs max-h-[85vh] overflow-y-auto rounded-lg border border-zinc-700 bg-zinc-950 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div
              id="placement-menu-title"
              className="flex items-center gap-1.5 text-sm font-black italic text-white"
            >
              {Badge && (
                <Badge
                  size={12}
                  style={{ color: RARITY_COLOR[card.droid.rarity] }}
                />
              )}
              <span className="truncate">{card.droid.name}</span>
            </div>
            <div className="text-2xs tracking-widest text-zinc-500">
              {card.tier} · in {LABEL[placement.station]} slot{' '}
              {placement.slot + 1}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-zinc-600 hover:text-zinc-300 text-sm leading-none min-w-tap min-h-tap flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <p className="mt-2 text-3xs text-zinc-600 leading-relaxed">
          Pick a slot to move to. Landing on a droid swaps the two — neither
          leaves the team.
        </p>

        <div className="mt-3 space-y-3">
          {STATIONS.map((station) => {
            const group = groups.find((g) => g.station === station);
            const slots = slotsAt(station, rebirthLevel);
            const match =
              EARNING_STATIONS.includes(station) &&
              isClassMatch(station, card.droid.type);

            return (
              <div key={station}>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xs tracking-widest text-zinc-500 font-bold">
                    {LABEL[station]}
                    {match && (
                      <span
                        title="Matches its class — earns 10% more here"
                        className="ml-1 text-3xs text-cyan-300"
                      >
                        +10%
                      </span>
                    )}
                  </span>
                  <span className="text-3xs tabular-nums text-zinc-600">
                    {group?.members.length ?? 0}/{slots}
                  </span>
                </div>

                <div className="mt-1 grid grid-cols-4 gap-1">
                  {Array.from({ length: slots }).map((_, slot) => {
                    const occupant = group?.cells[slot] ?? null;
                    const here =
                      placement.station === station && placement.slot === slot;
                    const occupantCard = occupant
                      ? cardIndex.get(occupant.cardId)
                      : null;

                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={here}
                        onClick={() => onMove(station, slot)}
                        title={
                          here
                            ? 'Already here'
                            : occupant
                              ? `Swap with ${occupant.name} (${occupant.tier})`
                              : `Move to ${LABEL[station]} slot ${slot + 1}`
                        }
                        className={[
                          'rounded border px-1 py-1 min-h-tap flex flex-col items-center justify-center gap-0.5 text-3xs',
                          here
                            ? 'border-cyan-500 bg-cyan-500/15 text-cyan-300 cursor-default'
                            : occupant
                              ? 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-cyan-600'
                              : 'border-dashed border-zinc-800 text-zinc-600 hover:border-cyan-700 hover:text-cyan-400',
                        ].join(' ')}
                      >
                        <span className="tabular-nums font-bold">
                          {slot + 1}
                        </span>
                        <span
                          className="w-full truncate text-4xs leading-none"
                          style={{
                            color: occupantCard
                              ? RARITY_COLOR[occupantCard.droid.rarity]
                              : undefined,
                          }}
                        >
                          {here ? 'here' : occupant ? occupant.name : 'empty'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="mt-4 w-full rounded border border-zinc-800 px-2 py-2 min-h-tap text-2xs tracking-widest text-zinc-500 hover:border-red-800 hover:text-red-400"
        >
          REMOVE FROM TEAM
        </button>
      </div>
    </div>
  );
}
