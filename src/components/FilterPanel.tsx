import { Panel } from './Panel';

import { SearchInput } from './SearchInput';
import { RarityFilter } from './RarityFilter';
import { ClassFilter } from './ClassFilter';
import { CollectionFilter } from './CollectionFilter';
import { FlawlessFilter } from './FlawlessFilter';

import type { DroidType, Rarity } from '../lib/droidTypes';

type RarityOrAll = Rarity | 'ALL';
type DroidTypeOrAll = DroidType | 'ALL';
type CollectionStatus = 'ALL' | 'OWNED' | 'MISSING';
type FlawlessStatus = 'ALL' | 'FLAWLESS' | 'MISSING';
type Props = {
  open: boolean;
  onToggle: () => void;

  search: string;
  onSearch: (value: string) => void;

  rarity: RarityOrAll;
  onRarity: (value: RarityOrAll) => void;

  droidClass: DroidTypeOrAll;
  onClass: (value: DroidTypeOrAll) => void;

  collectionStatus: CollectionStatus;
  onCollection: (value: CollectionStatus) => void;

  flawlessStatus: FlawlessStatus;
  onFlawless: (value: FlawlessStatus) => void;
};

export function FilterPanel(props: Props) {
  return (
    <Panel title="FILTERS" scroll open={props.open} onToggle={props.onToggle}>
      <div className="flex flex-col">
        <div className="px-4 py-3 border-b border-zinc-800">
          <p className="text-3xs font-bold tracking-widest text-zinc-500 mb-2">
            SEARCH
          </p>

          <SearchInput value={props.search} onChange={props.onSearch} />
        </div>

        <div className="px-4 py-3 border-b border-zinc-800">
          <p className="text-3xs font-bold tracking-widest text-zinc-500 mb-2">
            RARITY
          </p>

          <RarityFilter active={props.rarity} onChange={props.onRarity} />
        </div>
      </div>

      <div className="px-4 py-3 border-b border-zinc-800">
        <p className="text-3xs font-bold tracking-widest text-zinc-500 mb-2">
          CLASS
        </p>

        <ClassFilter active={props.droidClass} onChange={props.onClass} />
      </div>

      <div className="px-4 py-3">
        <p className="text-3xs font-bold tracking-widest text-zinc-500 mb-2">
          COLLECTION
        </p>

        <CollectionFilter
          active={props.collectionStatus}
          onChange={props.onCollection}
        />

        <div className="px-4 py-3 border-t border-zinc-800">
          <p className="text-3xs font-bold tracking-widest text-zinc-500 mb-2">
            FLAWLESS
          </p>

          <FlawlessFilter
            active={props.flawlessStatus}
            onChange={props.onFlawless}
          />
        </div>
      </div>
    </Panel>
  );
}
