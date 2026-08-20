import { UI } from '../data/ui';

export type FlawlessStatus = 'ALL' | 'FLAWLESS' | 'MISSING';

interface Props {
  active: FlawlessStatus;
  onChange: (s: FlawlessStatus) => void;
}

const OPTIONS: {
  value: FlawlessStatus;
  label: string;
  color: string;
}[] = [
  { value: 'ALL', label: UI.all, color: '#6b7280' },
  { value: 'FLAWLESS', label: 'UNLOCKED', color: '#ffffff' },
  { value: 'MISSING', label: 'NOT UNLOCKED', color: '#a1a1aa' },
];

export function FlawlessFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {OPTIONS.map((opt) => {
        const isActive = opt.value === active;

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className="px-2.5 py-0.5 text-[10px] font-bold tracking-widest rounded-full border transition-all duration-100"
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
