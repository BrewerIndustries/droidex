import { Link } from 'react-router-dom';
import { UI } from '../data/ui';
import { getRebirthFacts } from '../lib/rebirthFacts';
import { RebirthRequirements } from './RebirthRequirements';
import { RebirthHeader } from './RebirthHeader';

interface Props {
  open: boolean;
  onToggle: () => void;
  rebirthPath: number;
  rebirthLevel: number;
  collected: Set<string>;
  present: Set<string>;
  onSetRebirth: (level: number) => void;
  onHighlight: (ids: Set<string>) => void;
}

export function RebirthPanel({
  open,
  onToggle,
  rebirthPath,
  rebirthLevel,
  collected,
  present,
  onSetRebirth,
  onHighlight,
}: Props) {
  const {
    futureUseCountMap,
    maxRebirth,
    nextLevel,
    requiredCredits,
    requiredDroids,
    ready,
    ownedCount,
    totalCount,
  } = getRebirthFacts({
    rebirthPath,
    rebirthLevel,
    collected,
    present,
  });

  const handleMouseEnter = () => {
    if (requiredDroids.length === 0) return;

    onHighlight(new Set(requiredDroids.map((d) => d.cardId)));
  };

  const handleMouseLeave = () => onHighlight(new Set());

  return (
    <div
      className={`
  border
  border-zinc-800
  rounded-xl
  overflow-hidden
  rebirth-panel
  ${ready ? 'rebirth-panel-ready' : 'rebirth-panel-pending'}
`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <RebirthHeader
        open={open}
        onToggle={onToggle}
        rebirthLevel={rebirthLevel}
        maxRebirth={maxRebirth}
        nextLevel={nextLevel}
        ready={ready}
        ownedCount={ownedCount}
        totalCount={totalCount}
        onSetRebirth={onSetRebirth}
      />

      {open && nextLevel !== null && (
        <div className="px-4 pb-4 pt-1">
          {/* NEED divider */}
          <div className="flex items-center gap-3 mb-3">
            <div className="need-divider-left flex-1 h-px" />
            <span className="need-label text-[10px] font-black tracking-[0.3em] uppercase">
              {UI.need}
            </span>
            <div className="need-divider-right flex-1 h-px" />
          </div>

          <RebirthRequirements
            requiredCredits={requiredCredits}
            requiredDroids={requiredDroids}
            collected={collected}
            present={present}
            futureUseCountMap={futureUseCountMap}
          />
        </div>
      )}

      {open && nextLevel === null && (
        <div className="px-4 pb-4 pt-2 text-center">
          <span className="glow-yellow text-yellow-400 font-black text-sm tracking-widest uppercase">
            {UI.maxRebirth}
          </span>
        </div>
      )}

      {open && (
        <div className="pt-2">
          <Link
            to="/rebirths"
            className="
			block
			border-t border-zinc-800
			bg-zinc-950/70
			hover:bg-zinc-900
      px-4 py-3
      text-center
      text-[11px]
      font-bold
      tracking-[0.25em]
      uppercase
      text-orange-400
      transition-colors
      rounded-b-xl
    "
          >
            ▼ Rebirth Planner
          </Link>
        </div>
      )}
    </div>
  );
}
