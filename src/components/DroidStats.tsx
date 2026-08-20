import type { Tier } from '../lib/droidTypes';
import {
  getDroidEconomy,
  formatCredits,
  formatDuration,
  formatEfficiency,
} from '../lib/droidEconomy';

interface Props {
  droidName: string;
  tier: Tier;
}

/**
 * Cost / income / sell for this exact card, plus the two numbers that actually
 * drive buy-and-sell decisions:
 *
 *   EFF    credits per second earned per 1,000 credits spent — higher is better
 *   PAY    how long the droid takes to earn its own cost back — lower is better
 *   UPG    Upgrade Chips this tier step costs
 *   /CHIP  credits/sec the upgrade buys, per chip spent — higher is better
 *
 * EFF and PAY are two views of the income/cost ratio: EFF ranks droids against
 * each other, PAY says what that ratio means in play.
 *
 * /CHIP is the one to read when chips are the bottleneck rather than credits,
 * and it ranks droids almost the opposite way round — a Mythic upgrade costs
 * thousands of chips but buys thousands of credits/sec, while a Common upgrade
 * is cheap in chips and buys almost nothing.
 */
export function DroidStats({ droidName, tier }: Props) {
  const eco = getDroidEconomy(droidName, tier);
  if (!eco) return null;

  // Iconics are bought with Nova Crystals and earn a share of total income,
  // so credit-based efficiency does not apply to them.
  if (eco.cost === null) {
    return (
      <div className="mt-1 text-[8px] leading-tight text-zinc-500 tabular-nums">
        <div className="flex justify-between gap-1">
          <span className="text-zinc-600">COST</span>
          <span className="text-amber-400/80 truncate">
            {eco.costNote ?? '—'}
          </span>
        </div>
        <div className="flex justify-between gap-1">
          <span className="text-zinc-600">INCOME</span>
          <span className="text-emerald-400/80">{eco.incomeNote ?? '—'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-1 text-[8px] leading-tight tabular-nums">
      <div className="flex justify-between gap-1">
        <span className="text-zinc-600">COST</span>
        <span className="text-amber-400/90">{formatCredits(eco.cost)}</span>
      </div>

      <div className="flex justify-between gap-1">
        <span className="text-zinc-600">INC</span>
        <span className="text-emerald-400/90">
          {eco.income === null ? '—' : `${formatCredits(eco.income)}/s`}
        </span>
      </div>

      <div className="flex justify-between gap-1">
        <span className="text-zinc-600">SELL</span>
        <span className="text-zinc-400">
          {eco.sell === null ? '—' : formatCredits(eco.sell)}
        </span>
      </div>

      {eco.upgradeChips !== null && (
        <div
          className="flex justify-between gap-1"
          title={`${eco.upgradeChips.toLocaleString()} Upgrade Chips to bring this droid up into ${tier}`}
        >
          <span className="text-zinc-600">UPG</span>
          <span className="text-cyan-400/90">
            {formatCredits(eco.upgradeChips)}
          </span>
        </div>
      )}

      {eco.efficiency !== null && (
        <div
          className="flex justify-between gap-1 mt-0.5 pt-0.5 border-t border-zinc-800"
          title={`${formatEfficiency(eco.efficiency)} credits/sec earned per 1,000 credits spent — higher is more efficient`}
        >
          <span className="text-zinc-600">EFF</span>
          <span className="text-cyan-300 font-bold">
            {formatEfficiency(eco.efficiency)}
          </span>
        </div>
      )}

      {eco.paybackSeconds !== null && (
        <div
          className="flex justify-between gap-1"
          title="How long this droid takes to earn back its own cost"
        >
          <span className="text-zinc-600">PAY</span>
          <span className="text-zinc-300">
            {formatDuration(eco.paybackSeconds)}
          </span>
        </div>
      )}

      {eco.chipValue !== null && (
        <div
          className="flex justify-between gap-1"
          title="Credits per second this upgrade buys, per Upgrade Chip spent — read this when chips are the bottleneck"
        >
          <span className="text-zinc-600">/CHIP</span>
          <span className="text-cyan-300 font-bold">
            {formatEfficiency(eco.chipValue)}
          </span>
        </div>
      )}
    </div>
  );
}
