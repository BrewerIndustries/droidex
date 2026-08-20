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
      'bg-indigo-500/20 text-indigo-300 border-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.4)]',
    inactive: 'text-indigo-800 border-transparent hover:text-indigo-400',
  },
  STELLAR: {
    label: 'STELLAR',
    active:
      'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.4)]',
    inactive: 'text-fuchsia-800 border-transparent hover:text-fuchsia-400',
  },
};

const TIER_WITH_ALL: TierOrAll[] = ['ALL', ...TIER_ORDER];

export function TierTabs({ active, onChange }: Props) {
  return (
    <div className="flex px-3 pt-3 border-b border-zinc-800">
      {TIER_WITH_ALL.map((tier) => {
        const isActive = tier === active;
        const style = TIER_STYLE[tier];
        return (
          <button
            key={tier}
            type="button"
            onClick={() => onChange(tier)}
            className={[
              'flex-1 px-1 py-1.5 text-[11px] font-bold tracking-wide text-center rounded-t-md border-t border-x transition-all duration-150',
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
