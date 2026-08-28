import { LayoutGrid, List } from 'lucide-react';
import type { ViewMode } from '../hooks/useViewMode';

interface Props {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}

const OPTIONS: { key: ViewMode; label: string; Icon: typeof List }[] = [
  { key: 'GRID', label: 'GRID', Icon: LayoutGrid },
  { key: 'LIST', label: 'LIST', Icon: List },
];

/** Grid or list for the collection. */
export function ViewToggle({ view, onChange }: Props) {
  return (
    <div className="flex items-center justify-end gap-2 px-3 py-1.5 border-b border-zinc-800/70">
      <div className="flex gap-1">
        {OPTIONS.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            title={
              key === 'GRID'
                ? 'Card grid — artwork and full stats'
                : 'List — one line per droid'
            }
            aria-pressed={view === key}
            className={[
              'flex items-center gap-1 rounded border px-2 py-1 min-h-tap text-3xs font-bold tracking-widest',
              view === key
                ? 'border-cyan-600 bg-cyan-500/10 text-cyan-300'
                : 'border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-cyan-800 hover:text-cyan-400',
            ].join(' ')}
          >
            <Icon size={11} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
