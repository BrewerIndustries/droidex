import { UI } from '../data/ui';
type CollectionStatus = 'ALL' | 'OWNED' | 'MISSING';

interface Props {
  active: CollectionStatus;
  onChange: (s: CollectionStatus) => void;
}

const OPTIONS: {
  value: CollectionStatus;
  label: string;
  color: string;
}[] = [
  { value: 'ALL', label: UI.all, color: '#6b7280' },
  { value: 'OWNED', label: UI.owned, color: '#22d3ee' },
  { value: 'MISSING', label: UI.missing, color: '#f87171' },
];

export function CollectionFilter({ active, onChange }: Props) {
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
