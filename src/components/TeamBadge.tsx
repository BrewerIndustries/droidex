interface Props {
  /** How many copies of this droid are currently placed. */
  placed: number;
  onOpen: () => void;
}

/**
 * Bottom-right corner control for putting a droid on the team.
 *
 * Sits inside the card's own button, so the click has to be stopped from
 * bubbling into the collected toggle.
 */
export function TeamBadge({ placed, onOpen }: Props) {
  const assigned = placed > 0;

  const title = assigned
    ? `${placed} on the team — click to place another, move or remove`
    : 'Add to the team — pick a station';

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      title={title}
      className={[
        'absolute bottom-0.5 right-0.5 z-20 w-5 h-5 rounded-full',
        'flex items-center justify-center text-[9px] font-black transition-all',
        assigned
          ? 'bg-cyan-400 text-black shadow-[0_0_10px_rgba(34,211,238,0.8)] cursor-pointer'
          : 'bg-black/50 border-2 border-zinc-500 text-zinc-400 cursor-pointer hover:border-cyan-400 hover:text-cyan-300',
      ].join(' ')}
    >
      {assigned ? placed : '+'}
    </div>
  );
}
