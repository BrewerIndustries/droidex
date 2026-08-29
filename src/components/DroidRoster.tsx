import { RefreshCw } from 'lucide-react';
import { placedCount, type TeamAssignments } from '../lib/team';
import type { DroidType, Rarity, Tier, TierOrAll } from '../lib/droidTypes';
import type { Droid } from '../data/droids';
import { useDroidGridState } from '../hooks/useDroidGridState';
import { hasEffectiveCard } from '../lib/droidHierarchy';
import { RARITY_COLOR, TYPE_BADGE } from '../lib/droidTheme';
import { VariantDot } from './VariantDot';

type CollectionStatus = 'ALL' | 'OWNED' | 'MISSING';
type FlawlessStatus = 'ALL' | 'FLAWLESS' | 'MISSING';

interface Props {
  /** Which variants to draw. 'ALL' shows every tier's dot. */
  tier: TierOrAll;
  rarity: Rarity | 'ALL';
  droidClass: DroidType | 'ALL';
  collectionStatus: CollectionStatus;
  flawlessStatus: FlawlessStatus;
  rebirthPath: number;
  rebirthLevel: number;
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

interface Variant {
  tier: Tier;
  cardId: string;
  collected: boolean;
  present: boolean;
  needed: boolean;
}

interface RosterRow {
  droid: Droid;
  variants: Variant[];
  collectedCount: number;
  rebirthLevels?: number[];
  flawless: boolean;
  highlighted: boolean;
}

/**
 * Every droid once, with its variants as dots.
 *
 * The card grid shows one card per droid *per tier*, so the collection is 561
 * cards behind seven tier tabs, and answering "which tiers of Gonk do I have?"
 * means visiting seven of them. A droid is one row here and its seven variants
 * are seven dots, which is the same question answered in one glance and one tap
 * to change.
 *
 * Rows come from the same `useDroidGridState` as the grid so the search and the
 * rarity and class filters behave identically, then collapse by droid.
 */
export function DroidRoster({
  tier,
  rarity,
  droidClass,
  collectionStatus,
  flawlessStatus,
  rebirthPath,
  rebirthLevel,
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
  // Every tier, and no collection filter: a row needs all seven variants to
  // draw, so filtering cards away here would punch holes in the dots. The
  // collection filter is applied to the finished row instead.
  const { cards, rebirthMap, futureUseCountMap } = useDroidGridState({
    tier: 'ALL',
    rarity,
    droidClass,
    collectionStatus: 'ALL',
    flawlessStatus,
    rebirthPath,
    rebirthLevel,
    rebirthFilter: 'ALL',
    search,
    collected,
    present,
    flawless,
  });

  // Cards arrive tier-major and rarity-then-name sorted inside each tier, so
  // first sighting of a droid is in the Default block — which puts the rows in
  // the same order the grid uses, without sorting again.
  const byDroid = new Map<string, RosterRow>();

  cards.forEach((card) => {
    let row = byDroid.get(card.droid.name);
    if (!row) {
      row = {
        droid: card.droid,
        variants: [],
        collectedCount: 0,
        rebirthLevels: rebirthMap[card.droid.name],
        flawless: flawless.has(card.droid.name),
        highlighted: false,
      };
      byDroid.set(card.droid.name, row);
    }

    const isCollected = collected.has(card.id);
    if (isCollected) row.collectedCount++;
    if (highlightedIds?.has(card.id)) row.highlighted = true;

    row.variants.push({
      tier: card.tier,
      cardId: card.id,
      collected: isCollected,
      // Present counts a higher tier as covering a lower one, the same way the
      // rebirth tracker reads it.
      present: hasEffectiveCard(present, card.id),
      needed: (futureUseCountMap[card.id] ?? 0) > 0,
    });
  });

  // Narrowing to a tier drops the other dots rather than the row, so the
  // question becomes "which droids am I missing in Gold?" with every droid
  // still listed and answering it. The count and the collection filter follow
  // the dots that are left, so OWNED means owned *at that tier*.
  const rows = [...byDroid.values()]
    .map((row) => {
      if (tier === 'ALL') return row;
      const variants = row.variants.filter((v) => v.tier === tier);
      return {
        ...row,
        variants,
        collectedCount: variants.filter((v) => v.collected).length,
      };
    })
    .filter((row) => {
      if (row.variants.length === 0) return false; // Iconics are Default only
      if (collectionStatus === 'OWNED') return row.collectedCount > 0;
      if (collectionStatus === 'MISSING') return row.collectedCount === 0;
      return true;
    });

  if (rows.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-zinc-600">
        No droids match this filter.
      </div>
    );
  }

  return (
    <div className="space-y-1 p-2">
      {rows.map((row) => (
        <Row
          key={row.droid.name}
          row={row}
          teamPlaced={row.variants.reduce(
            (sum, v) => sum + placedCount(team, v.cardId),
            0
          )}
          onToggle={onToggle}
          onTogglePresent={onTogglePresent}
          onTeamOpen={onTeamOpen}
        />
      ))}
    </div>
  );
}

function Row({
  row,
  teamPlaced,
  onToggle,
  onTogglePresent,
  onTeamOpen,
}: {
  row: RosterRow;
  teamPlaced: number;
  onToggle: (id: string) => void;
  onTogglePresent: (id: string) => void;
  onTeamOpen: (id: string) => void;
}) {
  const { droid, variants, collectedCount, rebirthLevels, flawless } = row;

  const Badge = TYPE_BADGE[droid.type]?.Icon;
  const rarityColor = RARITY_COLOR[droid.rarity];
  const owned = collectedCount > 0;

  // The lowest collected variant stands in for the droid on the present and
  // team controls, which are per card. Falling back to Default keeps the
  // controls in place for a droid you have not collected yet.
  const anchor = variants.find((v) => v.collected) ?? variants[0];
  const anyPresent = variants.some((v) => v.present);

  return (
    <div
      className={[
        'rounded border px-2 py-1.5',
        owned
          ? 'border-zinc-700 bg-zinc-900'
          : 'border-zinc-800/70 bg-zinc-950/60',
        row.highlighted ? 'ring-1 ring-cyan-500' : '',
      ].join(' ')}
    >
      <div className="flex items-center gap-2">
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
              owned ? 'text-white' : 'text-zinc-400',
            ].join(' ')}
          >
            {droid.name}
          </span>
          <span className="flex items-center gap-1.5 text-3xs text-zinc-600">
            <span style={{ color: rarityColor }}>{droid.rarity}</span>
            <span>{droid.type}</span>
            {flawless && <span className="text-amber-400">FLAWLESS</span>}
            {droid.fusion && <span className="text-cyan-600">FUSION</span>}
          </span>
        </span>

        <span
          title={`${collectedCount} of ${variants.length} variants collected`}
          className={[
            'shrink-0 text-3xs tabular-nums',
            owned ? 'text-emerald-400' : 'text-zinc-700',
          ].join(' ')}
        >
          {collectedCount}/{variants.length}
        </span>

        {/* Present, only for droids a rebirth on this path asks for. */}
        {rebirthLevels?.length ? (
          <button
            type="button"
            onClick={() => onTogglePresent(anchor.cardId)}
            title={
              anyPresent
                ? `On hand for rebirths — click to clear ${anchor.tier}`
                : `Not on hand — click to mark ${anchor.tier} present`
            }
            className={[
              'flex min-h-tap min-w-tap shrink-0 items-center justify-center gap-0.5 rounded-full border px-1.5 text-3xs font-bold',
              anyPresent
                ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-300'
                : 'border-orange-500/40 bg-orange-500/15 text-orange-400',
            ].join(' ')}
          >
            <RefreshCw size={9} />
            <span className="tabular-nums">{rebirthLevels[0]}</span>
          </button>
        ) : null}

        <button
          type="button"
          onClick={() => onTeamOpen(anchor.cardId)}
          title={
            teamPlaced
              ? `${teamPlaced} on the team — click to place another, move or remove`
              : `Add ${anchor.tier} to the team — pick a station`
          }
          className="flex min-h-tap min-w-tap shrink-0 items-center justify-center"
        >
          <span
            className={[
              'flex h-5 w-5 items-center justify-center rounded-full text-3xs font-black',
              teamPlaced
                ? 'bg-cyan-400 text-black'
                : 'border-2 border-zinc-600 bg-black/50 text-zinc-400',
            ].join(' ')}
          >
            {teamPlaced || '+'}
          </span>
        </button>
      </div>

      {/* The variants. Their own line, so each dot keeps a 44pt target. */}
      <div className="mt-0.5 flex flex-wrap items-center">
        {variants.map((v) => (
          <VariantDot
            key={v.cardId}
            tier={v.tier}
            droidName={droid.name}
            collected={v.collected}
            present={v.present}
            needed={v.needed}
            onToggle={() => onToggle(v.cardId)}
          />
        ))}
      </div>
    </div>
  );
}
