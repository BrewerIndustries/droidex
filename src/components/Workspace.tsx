import type { TeamAssignments } from '../lib/team';
import { FilterPanel } from './FilterPanel';
import { CollectionPanel } from './CollectionPanel';
import { RebirthPanel } from './RebirthPanel';
import type { TierOrAll, DroidType, Rarity } from '../lib/droidTypes';
import { TierTabs } from './TierTabs';
import type { ViewMode } from '../hooks/useViewMode';

type RarityOrAll = Rarity | 'ALL';
type DroidTypeOrAll = DroidType | 'ALL';
type CollectionStatus = 'ALL' | 'OWNED' | 'MISSING';
type FlawlessStatus = 'ALL' | 'FLAWLESS' | 'MISSING';

type Props = {
  filtersOpen: boolean;
  setFiltersOpen: (value: boolean) => void;

  collectionOpen: boolean;
  setCollectionOpen: (value: boolean) => void;

  rebirthOpen: boolean;
  setRebirthOpen: (value: boolean) => void;

  search: string;
  onSearch: (value: string) => void;

  tier: TierOrAll;
  onTier: (tier: TierOrAll) => void;

  rarity: RarityOrAll;
  onRarity: (value: RarityOrAll) => void;

  droidClass: DroidTypeOrAll;
  onClass: (value: DroidTypeOrAll) => void;

  collectionStatus: CollectionStatus;
  onCollection: (value: CollectionStatus) => void;

  flawlessStatus: FlawlessStatus;
  onFlawless: (value: FlawlessStatus) => void;

  rebirthPath: number;
  rebirthLevel: number;
  setRebirthLevel: (level: number) => void;

  collected: Set<string>;
  present: Set<string>;
  flawless: Set<string>;

  highlightedIds: Set<string>;
  setHighlightedIds: (ids: Set<string>) => void;
  onToggleCollected: (id: string) => void;
  onTogglePresent: (id: string) => void;
  onToggleFlawless: (id: string) => void;

  team: TeamAssignments;
  onTeamOpen: (id: string) => void;

  view: ViewMode;
  onView: (view: ViewMode) => void;
};

export function Workspace(props: Props) {
  const collectionLayout = props.collectionOpen ? 'flex-1 min-h-0' : 'shrink-0';

  return (
    <div className="flex flex-col flex-1">
      {/* Combined shows every variant as a dot, so a tier to filter to is a
          question it has already answered. Grid and list still need one. */}
      {props.view !== 'COMBINED' && (
        <TierTabs active={props.tier} onChange={props.onTier} />
      )}

      <div
        className="
        flex-1
        bg-zinc-950
        border
        border-zinc-800
        border-t-0
        mx-3
        rounded-b-lg
        flex
        flex-col
        lg:flex-row
        overflow-hidden
        min-h-0
      "
      >
        <aside className="order-first lg:order-last shrink-0 lg:w-56 lg:border-l border-b lg:border-b-0 border-zinc-800 flex flex-col bg-zinc-950 min-h-0">
          <FilterPanel
            open={props.filtersOpen}
            onToggle={() => props.setFiltersOpen(!props.filtersOpen)}
            search={props.search}
            onSearch={props.onSearch}
            rarity={props.rarity}
            onRarity={props.onRarity}
            droidClass={props.droidClass}
            onClass={props.onClass}
            collectionStatus={props.collectionStatus}
            onCollection={props.onCollection}
            flawlessStatus={props.flawlessStatus}
            onFlawless={props.onFlawless}
          />
        </aside>
        <div className={collectionLayout}>
          <CollectionPanel
            open={props.collectionOpen}
            onToggle={() => props.setCollectionOpen(!props.collectionOpen)}
            rebirthPath={props.rebirthPath}
            rebirthLevel={props.rebirthLevel}
            tier={props.tier}
            rarity={props.rarity}
            droidClass={props.droidClass}
            collectionStatus={props.collectionStatus}
            flawlessStatus={props.flawlessStatus}
            search={props.search}
            collected={props.collected}
            present={props.present}
            flawless={props.flawless}
            highlightedIds={props.highlightedIds}
            onToggleCollected={props.onToggleCollected}
            onTogglePresent={props.onTogglePresent}
            onToggleFlawless={props.onToggleFlawless}
            team={props.team}
            onTeamOpen={props.onTeamOpen}
            view={props.view}
            onView={props.onView}
          />
        </div>
        <RebirthPanel
          open={props.rebirthOpen}
          onToggle={() => props.setRebirthOpen(!props.rebirthOpen)}
          rebirthPath={props.rebirthPath}
          rebirthLevel={props.rebirthLevel}
          collected={props.collected}
          present={props.present}
          onSetRebirth={props.setRebirthLevel}
          onHighlight={props.setHighlightedIds}
        />
      </div>
    </div>
  );
}
