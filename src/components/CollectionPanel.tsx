import type { TeamAssignments } from '../lib/team';
import { Panel } from './Panel';
import { DroidGrid } from './DroidGrid';
import { DroidList } from './DroidList';
import { DroidRoster } from './DroidRoster';
import { ViewToggle } from './ViewToggle';
import type { ViewMode } from '../hooks/useViewMode';

import type { TierOrAll, DroidType, Rarity } from '../lib/droidTypes';

type RarityOrAll = Rarity | 'ALL';
type DroidTypeOrAll = DroidType | 'ALL';
type CollectionStatus = 'ALL' | 'OWNED' | 'MISSING';
type FlawlessStatus = 'ALL' | 'FLAWLESS' | 'MISSING';

type Props = {
  open: boolean;
  onToggle: () => void;

  rebirthPath: number;
  rebirthLevel: number;

  tier: TierOrAll;
  rarity: RarityOrAll;
  droidClass: DroidTypeOrAll;

  collectionStatus: CollectionStatus;
  flawlessStatus: FlawlessStatus;

  search: string;

  collected: Set<string>;
  present: Set<string>;
  flawless: Set<string>;

  highlightedIds: Set<string>;

  onToggleCollected: (id: string) => void;
  onTogglePresent: (id: string) => void;
  onToggleFlawless: (id: string) => void;

  team: TeamAssignments;
  onTeamOpen: (id: string) => void;

  view: ViewMode;
  onView: (view: ViewMode) => void;

  /** Which variants the combined view draws. */
  variantTier: TierOrAll;
};

export function CollectionPanel(props: Props) {
  return (
    <Panel
      title="COLLECTION"
      scroll
      fill
      open={props.open}
      onToggle={props.onToggle}
    >
      <ViewToggle view={props.view} onChange={props.onView} />

      {props.view === 'COMBINED' ? (
        <DroidRoster
          rebirthPath={props.rebirthPath}
          rebirthLevel={props.rebirthLevel}
          tier={props.variantTier}
          rarity={props.rarity}
          droidClass={props.droidClass}
          collectionStatus={props.collectionStatus}
          flawlessStatus={props.flawlessStatus}
          search={props.search}
          collected={props.collected}
          present={props.present}
          flawless={props.flawless}
          onToggle={props.onToggleCollected}
          onTogglePresent={props.onTogglePresent}
          team={props.team}
          onTeamOpen={props.onTeamOpen}
          highlightedIds={props.highlightedIds}
        />
      ) : props.view === 'LIST' ? (
        <DroidList
          rebirthPath={props.rebirthPath}
          rebirthLevel={props.rebirthLevel}
          tier={props.tier}
          rarity={props.rarity}
          droidClass={props.droidClass}
          collectionStatus={props.collectionStatus}
          flawlessStatus={props.flawlessStatus}
          rebirthFilter="ALL"
          search={props.search}
          collected={props.collected}
          present={props.present}
          flawless={props.flawless}
          onToggle={props.onToggleCollected}
          onTogglePresent={props.onTogglePresent}
          team={props.team}
          onTeamOpen={props.onTeamOpen}
          highlightedIds={props.highlightedIds}
        />
      ) : (
        <DroidGrid
          rebirthPath={props.rebirthPath}
          rebirthLevel={props.rebirthLevel}
          tier={props.tier}
          rarity={props.rarity}
          droidClass={props.droidClass}
          collectionStatus={props.collectionStatus}
          flawlessStatus={props.flawlessStatus}
          rebirthFilter="ALL"
          search={props.search}
          collected={props.collected}
          present={props.present}
          flawless={props.flawless}
          onToggle={props.onToggleCollected}
          onTogglePresent={props.onTogglePresent}
          onToggleFlawless={props.onToggleFlawless}
          team={props.team}
          onTeamOpen={props.onTeamOpen}
          highlightedIds={props.highlightedIds}
        />
      )}
    </Panel>
  );
}
