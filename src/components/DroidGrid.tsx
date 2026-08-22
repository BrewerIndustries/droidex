import type { TeamAssignments } from '../lib/team';
import type { TierOrAll, DroidType, Rarity } from '../lib/droidTypes';
import { DroidCard } from './DroidCard';
import { useDroidGridState } from '../hooks/useDroidGridState';

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
  onToggleFlawless: (id: string) => void;

  team: TeamAssignments;
  onTeamOpen: (id: string) => void;

  highlightedIds?: Set<string>;
}

export function DroidGrid({
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
  onToggleFlawless,
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
    <div
      className="grid gap-3 p-4"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}
    >
      {cards.map((card) => (
        <DroidCard
          key={card.id}
          card={card}
          collectedCards={collected}
          presentCards={present}
          flawlessCards={flawless}
          onToggle={onToggle}
          onTogglePresent={onTogglePresent}
          onToggleFlawless={onToggleFlawless}
          teamStation={team[card.id] ?? null}
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
