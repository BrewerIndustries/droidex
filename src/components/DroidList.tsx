import { RefreshCw } from 'lucide-react';
import { placedCount, type TeamAssignments } from '../lib/team';
import type { TierOrAll, DroidType, Rarity } from '../lib/droidTypes';
import type { DroidCard } from '../data/droids';
import { useDroidGridState } from '../hooks/useDroidGridState';
import { getDroidFacts } from '../lib/droidFacts';
import { formatCredits, getDroidEconomy } from '../lib/droidEconomy';
import { RARITY_COLOR, TYPE_BADGE } from '../lib/droidTheme';
import { TierDNA } from './TierDNA';

type CollectionStatus = 'ALL' | 'OWNED' | 'MISSING';
type RebirthStatus = 'ALL' | 'NEEDED' | 'HISTORICAL';
type FlawlessStatus = 'ALL' | 'FLAWLESS' | 'MISSING';

interface Props {
  tier: TierOrAll;
  rarity: Rarity | 'ALL';
  droidClass: DroidType | 'ALL';
  collectionStatus: CollectionStatus;
  flawlessStatus: FlawlessStatus;
  rebirthPath: number;
  rebirthLevel: number;
  rebirthFilter: RebirthStatus;
  search: string;

  collected: Set<string>;
  present: Set<string>;
  flawless: Set<string>;

  onToggle: (id: string) => void;
  onTogglePresent: (id: string) => void;

  team: TeamAssignments;
  onTeamOpen: (id: string) => void;

  highlightedIds?: Set<string>;
}

/**
 * The same cards as the grid, one line each.
 *
 * The grid is built for recognising artwork; this is built for reading down a
 * column — comparing income, finding a name, working through a rebirth list.
 * It runs off the same `useDroidGridState` as the grid, so the filters, the
 * search and the ordering cannot drift between the two views.
 */
export function DroidList({
  tier,
  rarity,
  droidClass,
  collectionStatus,
  flawlessStatus,
  rebirthPath,
  rebirthLevel,
  rebirthFilter,
  search,

  collected,
  present,
  flawless,

  onToggle,
  onTogglePresent,
  team,
  onTeamOpen,

  highlightedIds,
}: Props) {
  const { cards, rebirthMap, futureUseMap, futureUseCountMap } =
    useDroidGridState({
      tier,
      rarity,
      droidClass,
      collectionStatus,
      flawlessStatus,
      rebirthPath,
      rebirthLevel,
      rebirthFilter,
      search,
      collected,
      present,
      flawless,
    });

  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-zinc-600 text-sm">
        No droids match this filter.
      </div>
    );
  }

  return (
    <div className="p-2 space-y-1">
      {cards.map((card) => (
        <Row
          key={card.id}
          card={card}
          collected={collected}
          present={present}
          flawless={flawless}
          onToggle={onToggle}
          onTogglePresent={onTogglePresent}
          teamPlaced={placedCount(team, card.id)}
          onTeamOpen={onTeamOpen}
          highlighted={highlightedIds?.has(card.id)}
          rebirthLevels={rebirthMap[card.droid.name]}
          lastRequiredRebirth={futureUseMap[card.id]}
          currentRebirth={rebirthLevel}
          futureUseCountMap={futureUseCountMap}
        />
      ))}
    </div>
  );
}

function Row({
  card,
  collected,
  present,
  flawless,
  onToggle,
  onTogglePresent,
  teamPlaced,
  onTeamOpen,
  highlighted,
  rebirthLevels,
  lastRequiredRebirth,
  currentRebirth,
  futureUseCountMap,
}: {
  card: DroidCard;
  collected: Set<string>;
  present: Set<string>;
  flawless: Set<string>;
  onToggle: (id: string) => void;
  onTogglePresent: (id: string) => void;
  teamPlaced: number;
  onTeamOpen: (id: string) => void;
  highlighted?: boolean;
  rebirthLevels?: number[];
  lastRequiredRebirth?: number;
  currentRebirth?: number;
  futureUseCountMap: Record<string, number>;
}) {
  const { droid, tier, id } = card;

  const facts = getDroidFacts({
    cardId: id,
    name: droid.name,
    collected,
    present,
    flawless,
    rebirthPath: 0,
    rebirthLevel: currentRebirth ?? 0,
    futureUseCountMap,
    eventLocked: droid.eventLocked,
    canBeFlawless: droid.canBeFlawless,
  });

  const eco = getDroidEconomy(droid.name, tier);
  const Badge = TYPE_BADGE[droid.type]?.Icon;
  const rarityColor = RARITY_COLOR[droid.rarity];
  const wanted = Boolean(rebirthLevels?.length);
  const stillNeeded =
    wanted &&
    lastRequiredRebirth !== undefined &&
    lastRequiredRebirth >= (currentRebirth ?? 0);

  return (
    <div
      className={[
        'flex items-center gap-2 rounded border px-2 min-h-tap',
        facts.owned
          ? 'bg-zinc-900 border-zinc-700'
          : 'bg-zinc-950/60 border-zinc-800/70',
        highlighted ? 'ring-1 ring-cyan-500' : '',
      ].join(' ')}
    >
      {/* The row itself is the collect toggle, matching a card click. */}
      <button
        type="button"
        onClick={() => onToggle(id)}
        title={`${droid.name} (${tier}) — click to toggle collected`}
        className="flex flex-1 items-center gap-2 py-2 min-h-tap text-left min-w-0"
      >
        <span
          className={[
            'w-4 h-4 shrink-0 rounded-sm border flex items-center justify-center text-3xs font-black',
            facts.owned
              ? 'bg-cyan-400 border-cyan-300 text-black'
              : 'border-zinc-700 text-transparent',
          ].join(' ')}
        >
          ✓
        </span>

        {Badge && (
          <Badge
            size={12}
            className="shrink-0"
            style={{ color: rarityColor }}
          />
        )}

        <span className="min-w-0 flex-1">
          <span
            className={[
              'block truncate text-xs font-bold',
              facts.owned ? 'text-white' : 'text-zinc-400',
            ].join(' ')}
          >
            {droid.name}
          </span>
          <span className="flex items-center gap-1.5 text-3xs text-zinc-600">
            <span style={{ color: rarityColor }}>{droid.rarity}</span>
            <span className="tracking-wide">{tier}</span>
            {facts.flawless && <span className="text-amber-400">FLAWLESS</span>}
          </span>
        </span>

        <TierDNA progress={facts.dna} />

        <span className="hidden w-16 shrink-0 flex-col items-end text-3xs tabular-nums leading-tight sm:flex">
          <span className="text-emerald-400/90">
            {eco?.income == null ? '—' : `${formatCredits(eco.income)}/s`}
          </span>
          <span className="text-zinc-600">
            {eco?.cost == null ? '—' : formatCredits(eco.cost)}
          </span>
        </span>
      </button>

      {/* Present, shown only for droids a rebirth on this path asks for. */}
      {wanted && (
        <button
          type="button"
          onClick={() => onTogglePresent(id)}
          title={
            facts.present
              ? 'On hand — click to clear'
              : 'Not on hand — click to mark present'
          }
          className={[
            'shrink-0 flex items-center justify-center gap-0.5 rounded-full border px-1.5 min-w-tap min-h-tap text-3xs font-bold',
            facts.present
              ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-300'
              : stillNeeded
                ? 'border-orange-500/40 bg-orange-500/15 text-orange-400'
                : 'border-zinc-800 text-zinc-600',
          ].join(' ')}
        >
          <RefreshCw size={9} />
          {rebirthLevels && rebirthLevels.length > 0 && (
            <span className="tabular-nums">{rebirthLevels[0]}</span>
          )}
        </button>
      )}

      {/* Team, the same control the card carries in its corner. */}
      <button
        type="button"
        onClick={() => onTeamOpen(id)}
        title={
          teamPlaced
            ? `${teamPlaced} on the team — click to place another, move or remove`
            : 'Add to the team — pick a station'
        }
        className="shrink-0 flex items-center justify-center min-w-tap min-h-tap"
      >
        <span
          className={[
            'w-5 h-5 rounded-full flex items-center justify-center text-3xs font-black',
            teamPlaced
              ? 'bg-cyan-400 text-black'
              : 'bg-black/50 border-2 border-zinc-600 text-zinc-400',
          ].join(' ')}
        >
          {teamPlaced || '+'}
        </span>
      </button>
    </div>
  );
}
