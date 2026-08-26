import type { DroidType } from '../lib/droidTypes';
import { UI } from '../data/ui';

type DroidTypeOrAll = DroidType | 'ALL';

interface Props {
  active: DroidTypeOrAll;
  onChange: (c: DroidTypeOrAll) => void;
}

const OPTIONS: {
  value: DroidTypeOrAll;
  label: string;
  color: string;
}[] = [
  { value: 'ALL', label: UI.all, color: '#6b7280' },
  { value: 'WORKER', label: UI.worker, color: '#16a34a' },
  { value: 'ASTROMECH', label: UI.astromech, color: '#7c3aed' },
  { value: 'BATTLE', label: UI.battle, color: '#dc2626' },
];

export function ClassFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {OPTIONS.map((opt) => {
        const isActive = opt.value === active;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className="px-3 py-1.5 min-h-tap text-2xs font-bold tracking-widest rounded-full border transition-all duration-100 inline-flex items-center justify-center"
            style={{
              borderColor: opt.color,
              color: isActive ? '#000' : opt.color,
              backgroundColor: isActive ? opt.color : 'transparent',
              boxShadow: isActive ? `0 0 8px ${opt.color}88` : 'none',
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
