import type { TierOrAll } from '../lib/droidTypes';
import { TIER_ORDER } from '../data/droids';
import { TIER_DOT } from '../lib/droidTheme';

interface Props {
  value: TierOrAll;
  onChange: (tier: TierOrAll) => void;
  /** What the filter narrows, for the ALL chip's tooltip. */
  label?: string;
}

const OPTIONS: TierOrAll[] = ['ALL', ...TIER_ORDER];

/**
 * Narrow a variant-per-tier view to one tier.
 *
 * The workspace has tier *tabs*, which are the same idea at the size of a
 * header. This is the same control for a page that has no header to put them
 * in, and it carries each tier's colour so it reads against the dots and strips
 * it filters.
 */
export function TierFilterChips({
  value,
  onChange,
  label = 'variants',
}: Props) {
  return (
    <div className="flex flex-wrap gap-1">
      {OPTIONS.map((tier) => {
        const active = value === tier;
        const dot = tier === 'ALL' ? null : TIER_DOT[tier];

        return (
          <button
            key={tier}
            type="button"
            onClick={() => onChange(tier)}
            aria-pressed={active}
            title={
              tier === 'ALL'
                ? `Show all ${label}`
                : `Show only ${tier} ${label}`
            }
            className={[
              'flex min-h-tap items-center gap-1 rounded border px-2 text-3xs font-bold tracking-widest',
              active
                ? 'bg-zinc-800 text-white'
                : 'border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-zinc-300',
            ].join(' ')}
            style={
              dot
                ? {
                    borderColor: active ? dot.hex : undefined,
                    color: active ? dot.hex : undefined,
                    boxShadow: active ? `0 0 8px ${dot.hex}44` : undefined,
                  }
                : { borderColor: active ? '#71717a' : undefined }
            }
          >
            {dot && (
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{
                  background: active ? dot.fill : 'transparent',
                  border: active ? 'none' : `1.5px solid ${dot.hex}80`,
                }}
              />
            )}
            {tier === 'ALL'
              ? 'ALL'
              : tier.charAt(0) + tier.slice(1).toLowerCase()}
          </button>
        );
      })}
    </div>
  );
}
