import { UI } from '../data/ui';
import { RefreshCw } from 'lucide-react';

interface Props {
  rebirthLevels?: number[];
  futureUsage: string;

  isPresent: boolean;
  isSafe: boolean;

  id: string;
  onTogglePresent: (id: string) => void;
}

export function DroidRebirthBadge({
  rebirthLevels,
  futureUsage,
  isPresent,
  isSafe,
  id,
  onTogglePresent,
}: Props) {
  if (!rebirthLevels?.length) return null;

  return (
    <div className="mt-auto pt-1 -mx-1">
      <span
        className="
          w-full
          h-7
          px-0.5
          rounded-full
          border
          border-orange-500/40
          bg-orange-500/15
          text-orange-400
          text-3xs
          font-bold
          uppercase
          tracking-wide
          flex
          items-center
          justify-between
        "
        title={`${futureUsage} ${
          rebirthLevels.length > 1
            ? UI.rebirthRequiredPlural
            : UI.rebirthRequired
        } ${rebirthLevels.join(', ')}`}
        onClick={(e) => {
          e.stopPropagation();
          onTogglePresent(id);
        }}
      >
        <span
          className={`w-2.5 h-2.5 rounded-full border border-black/40 ${
            isPresent ? 'bg-green-500' : 'bg-zinc-500'
          }`}
        />

        <span className="flex items-center gap-1">
          <RefreshCw size={8} />
          {rebirthLevels.join('·')}
        </span>

        <span className="w-3 text-right">{isSafe ? '✓' : ''}</span>
      </span>
    </div>
  );
}
