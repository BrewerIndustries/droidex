import { useState } from 'react';
import {
  getFusionGroups,
  getFusionTotals,
  type FusionIngredient,
  type FusionRecipe,
} from '../lib/fusion';
import { RARITY_COLOR, TYPE_BADGE } from '../lib/droidTheme';
import { TierOwnedStrip } from './TierOwnedStrip';
import { TierFilterChips } from './TierFilterChips';
import type { TierOrAll } from '../lib/droidTypes';

interface Props {
  collected: Set<string>;
}

type Filter = 'ALL' | 'MISSING' | 'COLLECTED';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'ALL', label: 'ALL' },
  { key: 'MISSING', label: 'NOT MADE' },
  { key: 'COLLECTED', label: 'MADE' },
];

/**
 * Every fusion recipe, and which tiers of each you have made.
 *
 * Fusion droids cannot be bought, so the only way to hold one is to fuse it —
 * which makes the recipe and the collection state the same question, and worth
 * answering on one screen.
 */
export function FusionPage({ collected }: Props) {
  const [filter, setFilter] = useState<Filter>('ALL');
  const [tier, setTier] = useState<TierOrAll>('ALL');

  const groups = getFusionGroups(collected, tier);
  const totals = getFusionTotals(collected, tier);

  const matches = (r: FusionRecipe) =>
    filter === 'ALL' ||
    (filter === 'MISSING' ? r.collectedCount === 0 : r.collectedCount > 0);

  const shown = groups
    .map((g) => ({ ...g, recipes: g.recipes.filter(matches) }))
    .filter((g) => g.recipes.length > 0);

  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-white text-xl font-bold mb-1">Fusion</h1>
        <p className="text-sm text-zinc-400">
          Seventeen droids cannot be bought at any price — they are made by
          fusing three others. Fusion keeps the tier of what you fuse, so three
          Gold ingredients make a Gold result, and each recipe is worth making
          once per tier.
        </p>
      </div>

      {/* Progress summary */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="text-2xs tracking-widest text-cyan-500 font-bold">
          FUSION PROGRESS
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-black text-emerald-400 tabular-nums">
            {totals.variantsCollected}
          </span>
          <span className="text-sm text-zinc-500 tabular-nums">
            / {totals.variants}{' '}
            {tier === 'ALL' ? 'variants' : `${tier.toLowerCase()} fusions`}
          </span>
        </div>

        <div className="mt-2 h-1.5 rounded bg-zinc-950 border border-zinc-800 overflow-hidden">
          <div
            className="h-full bg-emerald-500/70"
            style={{
              width: `${(totals.variantsCollected / totals.variants) * 100}%`,
            }}
          />
        </div>

        <div className="mt-2 text-2xs text-zinc-600 tabular-nums">
          {tier === 'ALL' ? (
            <>
              {totals.droidsStarted}/{totals.droids} fusion droids made at some
              tier · {totals.droidsComplete} complete at every tier
            </>
          ) : (
            <>
              {totals.droidsStarted}/{totals.droids} fusion droids made at{' '}
              {tier.toLowerCase()}
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-1">
        <TierFilterChips value={tier} onChange={setTier} label="fusion tiers" />
      </div>

      <div className="flex gap-1">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={[
              'flex-1 rounded border px-2 py-2 min-h-tap text-2xs font-bold tracking-widest',
              filter === f.key
                ? 'border-cyan-600 bg-cyan-500/10 text-cyan-300'
                : 'border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-cyan-800',
            ].join(' ')}
          >
            {f.label}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="text-2xs text-zinc-600">
          {filter === 'MISSING'
            ? tier === 'ALL'
              ? 'Every fusion droid is made at one tier or more.'
              : `Every fusion droid is made at ${tier.toLowerCase()}.`
            : tier === 'ALL'
              ? 'No fusion droids made yet. Mark them collected in the Droidex as you fuse them.'
              : `No fusion droids made at ${tier.toLowerCase()} yet.`}
        </div>
      ) : (
        shown.map((group) => (
          <div
            key={group.rarity}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-3"
          >
            <div className="flex items-baseline justify-between">
              <div
                className="text-2xs tracking-widest font-bold"
                style={{ color: RARITY_COLOR[group.rarity] }}
              >
                {group.rarity}
              </div>
              <div className="text-2xs text-zinc-500 tabular-nums">
                {group.recipes.length} recipe
                {group.recipes.length === 1 ? '' : 's'}
              </div>
            </div>

            <div className="mt-2 space-y-1">
              {group.recipes.map((recipe) => (
                <RecipeRow key={recipe.name} recipe={recipe} />
              ))}
            </div>
          </div>
        ))
      )}

      <p className="text-3xs text-zinc-600 leading-relaxed">
        Ingredients are dimmed when you hold no tier of that droid at all, and
        show how many of its seven tiers you have. Collecting is marked in the
        Droidex — this tab reads that state rather than setting it.
      </p>
    </div>
  );
}

function RecipeRow({ recipe }: { recipe: FusionRecipe }) {
  const Badge = TYPE_BADGE[recipe.type]?.Icon;
  const made = recipe.collectedCount > 0;

  return (
    <div
      className={[
        'rounded border px-2 py-2',
        made
          ? 'bg-zinc-950 border-zinc-700'
          : 'bg-zinc-950/50 border-zinc-800/70',
      ].join(' ')}
    >
      <div className="flex items-center gap-2">
        {Badge && (
          <Badge size={12} style={{ color: RARITY_COLOR[recipe.rarity] }} />
        )}
        <span
          className={[
            'text-xs font-bold truncate flex-1',
            made ? 'text-white' : 'text-zinc-400',
          ].join(' ')}
        >
          {recipe.name}
        </span>

        <TierOwnedStrip variants={recipe.variants} />

        <span
          title={`${recipe.collectedCount} of ${recipe.variants.length} tiers collected`}
          className={[
            'text-3xs tabular-nums shrink-0',
            made ? 'text-emerald-400' : 'text-zinc-700',
          ].join(' ')}
        >
          {recipe.collectedCount}/{recipe.variants.length}
        </span>
      </div>

      <div className="mt-1.5 flex flex-wrap items-center gap-1">
        {recipe.ingredients.map((ingredient, i) => (
          <span key={ingredient.name} className="flex items-center gap-1">
            {i > 0 && <span className="text-3xs text-zinc-700">+</span>}
            <Ingredient ingredient={ingredient} />
          </span>
        ))}
      </div>
    </div>
  );
}

function Ingredient({ ingredient }: { ingredient: FusionIngredient }) {
  const { name, count, droid, tiersCollected } = ingredient;
  const held = tiersCollected.length;
  const total = droid?.tiers.length ?? 0;

  return (
    <span
      title={
        droid
          ? `${name} — ${held} of ${total} tiers collected${
              held ? `: ${tiersCollected.join(', ')}` : ''
            }`
          : `${name} — not in the droid list`
      }
      className={[
        'inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-3xs',
        held
          ? 'border-zinc-700 bg-zinc-900 text-zinc-200'
          : 'border-zinc-800/70 bg-zinc-900/40 text-zinc-600',
      ].join(' ')}
    >
      <span className="font-bold">{name}</span>
      {count > 1 && <span className="text-cyan-400">×{count}</span>}
      {total > 0 && (
        <span className={held ? 'text-emerald-500' : 'text-zinc-700'}>
          {held}/{total}
        </span>
      )}
    </span>
  );
}
