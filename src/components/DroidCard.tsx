import { UI } from '../data/ui';
import { useState } from 'react';
import { TIER_BORDER, TIER_GLOW } from '../lib/droidTheme';
import { useDroidCardState } from '../hooks/useDroidCardState';
import type { DroidCard as DroidCardType } from '../data/droids';
import { getDroidFacts } from '../lib/droidFacts';
import { DroidCardFooter } from './DroidCardFooter';
import { FlawlessBadge } from './FlawlessBadge';
import { OwnedBadge } from './OwnedBadge';
import { EventLockedOverlay } from './EventLockedOverlay';
import { DroidImage } from './DroidImage';
import { TeamBadge } from './TeamBadge';
import type { Station } from '../data/rebirthUnlocks';

interface Props {
  card: DroidCardType;

  collectedCards: Set<string>;
  presentCards: Set<string>;
  flawlessCards: Set<string>;

  onToggle: (id: string) => void;
  onTogglePresent: (id: string) => void;
  onToggleFlawless: (id: string) => void;

  highlighted?: boolean;
  rebirthLevels?: number[];
  lastRequiredRebirth?: number;
  currentRebirth?: number;

  futureUseCountMap: Record<string, number>;

  /** Station this droid occupies, or null when it is not on the team. */
  teamStation: Station | null;
  /** Where a one-click add would place it, or null when nothing is free. */
  teamTarget: Station | null;
  onTeamToggle: (id: string) => void;
}

export function DroidCard({
  card,

  collectedCards,
  presentCards,
  flawlessCards,

  onToggle,
  onTogglePresent,
  onToggleFlawless,

  highlighted,
  rebirthLevels,
  lastRequiredRebirth,
  currentRebirth,

  futureUseCountMap,

  teamStation,
  teamTarget,
  onTeamToggle,
}: Props) {
  const { droid, tier, id } = card;
  const [imgFailed, setImgFailed] = useState(false);

  const facts = getDroidFacts({
    cardId: id,
    name: droid.name,

    collected: collectedCards,
    present: presentCards,
    flawless: flawlessCards,

    rebirthPath: 0,
    rebirthLevel: currentRebirth ?? 0,

    futureUseCountMap,

    eventLocked: droid.eventLocked,
    canBeFlawless: droid.canBeFlawless,
  });

  const { ui, state, info } = useDroidCardState({
    droid,
    tier,
    highlighted,
    facts,
    currentRebirth,
    lastRequiredRebirth,
  });

  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      title={`${droid.name} (${tier}) — ${UI.cardToggle}`}
      className={[
        'relative flex flex-col rounded-lg border-4 overflow-hidden',
        'transition-all duration-150 select-none cursor-pointer',
        'bg-zinc-900 active:scale-95 droid-card',
        facts.owned || highlighted
          ? 'hover:brightness-110'
          : 'opacity-40 hover:opacity-90',
        TIER_BORDER[tier],
        ui.isRainbow ? 'rainbow-border-animated' : '',
        ui.ringClass,
      ].join(' ')}
      style={{
        boxShadow: TIER_GLOW[tier] || undefined,
      }}
    >
      <DroidImage
        droidName={droid.name}
        tier={tier}
        rarityColor={ui.rarityColor}
        badge={ui.badge}
        imgFailed={imgFailed}
        onImageError={() => setImgFailed(true)}
      />

      {/* Footer */}
      <DroidCardFooter
        droid={droid}
        tier={tier}
        facts={facts}
        rarityColor={ui.rarityColor}
        badge={ui.badge}
        info={info}
        rebirthLevels={rebirthLevels}
        futureUsage={state.futureUsage}
        isPresent={state.isPresent}
        isSafe={state.isSafe}
        id={id}
        onTogglePresent={onTogglePresent}
      />

      <FlawlessBadge
        enabled={facts.canBeFlawless}
        active={facts.flawless}
        droidName={droid.name}
        onToggleFlawless={onToggleFlawless}
      />
      <OwnedBadge visible={facts.owned} />
      <TeamBadge
        station={teamStation}
        target={teamTarget}
        onToggle={() => onTeamToggle(id)}
      />
      <EventLockedOverlay visible={facts.eventLocked && !facts.owned} />
    </button>
  );
}
