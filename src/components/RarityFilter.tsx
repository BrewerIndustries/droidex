import type { Rarity } from '../lib/droidTypes';
import { UI } from '../data/ui';

type RarityOrAll = Rarity | 'ALL';

interface Props {
  active: RarityOrAll;
  onChange: (r: RarityOrAll) => void;
}

const OPTIONS: {
  value: RarityOrAll;
  label: string;
  color: string;
}[] = [
  { value: 'ALL', label: UI.all, color: '#6b7280' },
  { value: 'COMMON', label: 'COMMON', color: '#16a34a' },
  { value: 'RARE', label: 'RARE', color: '#3b82f6' },
  { value: 'EPIC', label: 'EPIC', color: '#a855f7' },
  { value: 'LEGENDARY', label: 'LEGENDARY', color: '#f59e0b' },
  { value: 'MYTHIC', label: 'MYTHIC', color: '#ef4444' },
  { value: 'ICONIC', label: 'ICONIC', color: '#ff00aa' },
];

export function RarityFilter({ active, onChange }: Props) {
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
