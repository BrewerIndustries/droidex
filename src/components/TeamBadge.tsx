import type { Station } from '../data/rebirthUnlocks';

interface Props {
  /** The station this droid currently occupies, or null if it is not on the team. */
  station: Station | null;
  /** Where a click would put it. Null means every eligible slot is full. */
  target: Station | null;
  onToggle: () => void;
}

const SHORT: Record<Station, string> = {
  WORKER: 'W',
  ASTROMECH: 'A',
  BATTLE: 'B',
  LOUNGE: 'L',
  COMPANION: 'C',
};

/**
 * Bottom-right corner control for putting a droid on the team.
 *
 * Sits inside the card's own button, so the click has to be stopped from
 * bubbling into the collected toggle.
 */
export function TeamBadge({ station, target, onToggle }: Props) {
  const assigned = station !== null;
  const disabled = !assigned && target === null;

  const title = assigned
    ? `On the team in a ${station} slot — click to remove`
    : target
      ? `Add to the team in a ${target} slot`
      : 'No free slot for this droid at your rebirth level';

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (!disabled) onToggle();
      }}
      title={title}
      className={[
        'absolute bottom-0.5 right-0.5 z-20 w-5 h-5 rounded-full',
        'flex items-center justify-center text-[9px] font-black transition-all',
        assigned
          ? 'bg-cyan-400 text-black shadow-[0_0_10px_rgba(34,211,238,0.8)] cursor-pointer'
          : disabled
            ? 'bg-black/50 border-2 border-zinc-800 text-zinc-700 cursor-not-allowed'
            : 'bg-black/50 border-2 border-zinc-500 text-zinc-400 cursor-pointer hover:border-cyan-400 hover:text-cyan-300',
      ].join(' ')}
    >
      {assigned ? SHORT[station] : '+'}
    </div>
  );
}
