import type { TierOrAll } from '../lib/droidTypes';
import { TIER_ORDER } from '../data/droids';
import { UI } from '../data/ui';

interface Props {
  active: TierOrAll;
  onChange: (tier: TierOrAll) => void;
}

const TIER_STYLE: Record<
  TierOrAll,
  { active: string; inactive: string; label: string }
> = {
  ALL: {
    label: UI.all,
    active: 'bg-zinc-700 text-white border-zinc-500',
    inactive: 'text-zinc-500 border-transparent hover:text-zinc-300',
  },
  DEFAULT: {
    label: 'DEFAULT',
    active: 'bg-zinc-700 text-white border-zinc-500',
    inactive: 'text-zinc-500 border-transparent hover:text-zinc-300',
  },
  GOLD: {
    label: 'GOLD',
    active:
      'bg-amber-500/20 text-amber-400 border-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]',
    inactive: 'text-amber-700 border-transparent hover:text-amber-500',
  },
  DIAMOND: {
    label: 'DIAMOND',
    active:
      'bg-sky-500/20 text-sky-300 border-sky-300 shadow-[0_0_8px_rgba(147,220,255,0.4)]',
    inactive: 'text-sky-800 border-transparent hover:text-sky-400',
  },
  RAINBOW: {
    label: 'RAINBOW',
    active:
      'rainbow-tab bg-purple-500/10 border-violet-400 shadow-[0_0_8px_rgba(168,85,247,0.4)]',
    inactive: 'rainbow-tab-dim border-transparent hover:opacity-80',
  },
  BESKAR: {
    label: 'BESKAR',
    active:
      'bg-zinc-300/20 text-zinc-100 border-zinc-300 shadow-[0_0_8px_rgba(229,229,229,0.4)]',
    inactive: 'text-zinc-500 border-transparent hover:text-zinc-300',
  },
  GALACTIC: {
    label: 'GALACTIC',
    active:
      'bg-purple-900/40 text-purple-300 border-purple-600 shadow-[0_0_8px_rgba(147,51,234,0.45)]',
    inactive: 'text-purple-900 border-transparent hover:text-purple-500',
  },
  STELLAR: {
    label: 'STELLAR',
    active:
      'bg-orange-500/20 text-orange-300 border-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.45)]',
    inactive: 'text-orange-800 border-transparent hover:text-orange-400',
  },
};

const TIER_WITH_ALL: TierOrAll[] = ['ALL', ...TIER_ORDER];

export function TierTabs({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-y-1 px-3 pt-3 border-b border-zinc-800">
      {TIER_WITH_ALL.map((tier) => {
        const isActive = tier === active;
        const style = TIER_STYLE[tier];
        return (
          <button
            key={tier}
            type="button"
            onClick={() => onChange(tier)}
            className={[
              'flex-1 basis-20 px-1 py-2.5 min-h-tap text-xs font-bold tracking-wide text-center rounded-t-md border-t border-x transition-all duration-150',
              isActive
                ? style.active + ' -mb-px border-b border-b-zinc-950'
                : style.inactive,
            ].join(' ')}
          >
            {style.label}
          </button>
        );
      })}
    </div>
  );
}
