import { useState } from 'react';
import type { TeamAssignments } from '../lib/team';
import { candidatesFor, getStationGroups, getTeamEarnings } from '../lib/team';
import {
  CLASS_MATCH_BONUS,
  MAX_KNOWN_MULTIPLIER_LEVEL,
  EARNING_STATIONS,
  type Station,
} from '../data/rebirthUnlocks';
import { formatCredits, getDroidEconomy } from '../lib/droidEconomy';
import { RARITY_COLOR, TYPE_BADGE } from '../lib/droidTheme';
import { ALL_CARDS } from '../data/droids';

interface Props {
  team: TeamAssignments;
  collected: Set<string>;
  rebirthLevel: number;
  onAssign: (cardId: string, station: Station) => void;
  onUnassign: (index: number) => void;
}

const STATION_LABEL: Record<Station, string> = {
  WORKER: 'WORKER STATIONS',
  ASTROMECH: 'ASTROMECH STATIONS',
  BATTLE: 'BATTLE STATIONS',
  LOUNGE: 'LOUNGE',
  COMPANION: 'COMPANION',
};

const STATION_NOTE: Record<Station, string> = {
  WORKER: 'Any droid works here — Workers earn +10%',
  ASTROMECH: 'Any droid works here — Astromechs earn +10%',
  BATTLE: 'Any droid works here — Battle droids earn +10%',
  LOUNGE: 'Parked — earns nothing, still counts as on hand for rebirths',
  COMPANION: 'Follows you — grants its perk instead of income',
};

const cardIndex = new Map(ALL_CARDS.map((c) => [c.id, c]));

export function TeamPage({
  team,
  collected,
  rebirthLevel,
  onAssign,
  onUnassign,
}: Props) {
  const [picking, setPicking] = useState<Station | null>(null);

  const groups = getStationGroups(team, rebirthLevel);
  const earnings = getTeamEarnings(team, rebirthLevel);
  const assignedCount = Object.keys(team).length;

  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-white text-xl font-bold mb-1">Team</h1>
        <p className="text-sm text-zinc-400">
          Assign collected droids to stations to track earnings. Anything in a
          station counts as on hand for rebirth requirements.
        </p>
      </div>

      {/* Earnings summary */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="text-[10px] tracking-widest text-cyan-500 font-bold">
          TEAM EARNINGS
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-black text-emerald-400 tabular-nums">
            {formatCredits(earnings.effective)}
          </span>
          <span className="text-sm text-zinc-500">/sec</span>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs tabular-nums">
          <Row label="Base rate" value={`${formatCredits(earnings.base)}/s`} />
          <Row
            label={`Class match (${earnings.matched}/${earnings.working})`}
            value={`+${formatCredits(earnings.classBonus)}/s`}
          />
          <Row
            label={`Rebirth ${rebirthLevel} bonus`}
            value={`+${Math.round(earnings.multiplier * 100)}%`}
          />
          <Row label="Per minute" value={formatCredits(earnings.perMinute)} />
          <Row label="Per hour" value={formatCredits(earnings.perHour)} />
        </div>

        {rebirthLevel > MAX_KNOWN_MULTIPLIER_LEVEL && (
          <div className="mt-2 text-[10px] text-amber-500/80">
            Multiplier data stops at rebirth {MAX_KNOWN_MULTIPLIER_LEVEL}; using
            that value.
          </div>
        )}

        <div className="mt-2 text-[10px] text-zinc-600">
          {assignedCount} droid{assignedCount === 1 ? '' : 's'} assigned ·
          earnings count workstations only · a droid in a station matching its
          class earns 10% more
        </div>
      </div>

      {/* Stations */}
      {groups.map((group) => (
        <div
          key={group.station}
          className="bg-zinc-900 border border-zinc-800 rounded-lg p-3"
        >
          <div className="flex items-baseline justify-between">
            <div className="text-[10px] tracking-widest text-cyan-500 font-bold">
              {STATION_LABEL[group.station]}
            </div>
            <div className="text-[10px] text-zinc-500 tabular-nums">
              {group.members.length} / {group.slots}
            </div>
          </div>

          <div className="text-[10px] text-zinc-600 mt-0.5">
            {STATION_NOTE[group.station]}
          </div>

          <div className="mt-2 space-y-1">
            {group.members.map((m) => {
              const card = cardIndex.get(m.cardId);
              const Badge = card ? TYPE_BADGE[card.droid.type]?.Icon : null;
              return (
                <div
                  key={m.index}
                  className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded px-2 py-1"
                >
                  {Badge && (
                    <Badge
                      size={12}
                      style={{
                        color: card
                          ? RARITY_COLOR[card.droid.rarity]
                          : undefined,
                      }}
                    />
                  )}
                  <span className="text-white text-xs font-bold truncate flex-1">
                    {m.name}
                  </span>
                  <span className="text-[9px] text-zinc-500 tracking-wide">
                    {m.tier}
                  </span>
                  {m.station === 'COMPANION' && m.perk && (
                    <span
                      title="Active while this droid is your Companion"
                      className="text-[10px] text-amber-300 truncate max-w-[10rem]"
                    >
                      {m.perk}
                    </span>
                  )}
                  {m.income !== null && (
                    <span className="text-[10px] text-emerald-400 tabular-nums">
                      {formatCredits(m.income + m.classMatchBonus)}/s
                    </span>
                  )}
                  {m.income !== null && (
                    <span
                      title={
                        m.classMatch
                          ? `${m.type} in a ${m.station} station — earning the 10% class bonus`
                          : `${m.type} in a ${m.station} station — no class bonus`
                      }
                      className={[
                        'text-[9px] font-bold',
                        m.classMatch ? 'text-cyan-300' : 'text-zinc-700',
                      ].join(' ')}
                    >
                      +10%
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => onUnassign(m.index)}
                    className="text-[10px] text-zinc-500 hover:text-red-400 px-1"
                    title="Remove from station"
                  >
                    ✕
                  </button>
                </div>
              );
            })}

            {Array.from({
              length: Math.max(0, group.slots - group.members.length),
            }).map((_, i) => (
              <button
                key={`empty-${i}`}
                type="button"
                onClick={() =>
                  setPicking(picking === group.station ? null : group.station)
                }
                className="w-full text-left text-[10px] text-zinc-600 border border-dashed border-zinc-800 rounded px-2 py-1 hover:border-cyan-700 hover:text-cyan-500"
              >
                + empty slot
              </button>
            ))}
          </div>

          {picking === group.station && (
            <Picker
              station={group.station}
              team={team}
              collected={collected}
              rebirthLevel={rebirthLevel}
              onPick={(cardId) => {
                onAssign(cardId, group.station);
                setPicking(null);
              }}
              onClose={() => setPicking(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-zinc-500">{label}</span>
      <span className="text-zinc-300">{value}</span>
    </div>
  );
}

function Picker({
  station,
  team,
  collected,
  rebirthLevel,
  onPick,
  onClose,
}: {
  station: Station;
  team: TeamAssignments;
  collected: Set<string>;
  rebirthLevel: number;
  onPick: (cardId: string) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState('');

  const q = search.trim().toLowerCase();
  const matches = candidatesFor(station, collected, team, rebirthLevel).filter(
    (c) => c.card.droid.name.toLowerCase().includes(q)
  );

  // Eligible first, best earner first where the station pays out; the rest
  // follow greyed out so a search never comes back mysteriously empty.
  const sorted = [...matches].sort((a, b) => {
    if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
    if (a.eligible && EARNING_STATIONS.includes(station)) {
      const rate = (c: typeof a) =>
        (getDroidEconomy(c.card.droid.name, c.card.tier)?.income ?? 0) *
        (c.classMatch ? 1 + CLASS_MATCH_BONUS : 1);
      const ia = rate(a);
      const ib = rate(b);
      if (ia !== ib) return ib - ia;
    }
    return a.card.droid.name.localeCompare(b.card.droid.name);
  });

  const eligibleCount = sorted.filter((c) => c.eligible).length;

  return (
    <div className="mt-2 border-t border-zinc-800 pt-2">
      <div className="flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="SEARCH COLLECTED DROIDS..."
          className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-[11px] text-white placeholder:text-zinc-700"
        />
        <button
          type="button"
          onClick={onClose}
          className="text-[10px] text-zinc-500 hover:text-white px-1"
        >
          ✕
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="mt-2 text-[10px] text-zinc-600">
          {q
            ? `Nothing collected matches "${search.trim()}".`
            : 'No droids collected yet. Mark them as collected in the Droidex first.'}
        </div>
      ) : (
        <>
          {eligibleCount === 0 && (
            <div className="mt-2 text-[10px] text-amber-500/80">
              This station is full at rebirth {rebirthLevel}.
            </div>
          )}

          <div className="mt-2 max-h-52 overflow-y-auto space-y-1">
            {sorted.map(({ card, eligible, reason, classMatch, already }) => (
              <button
                key={card.id}
                type="button"
                disabled={!eligible}
                onClick={() => onPick(card.id)}
                title={
                  eligible
                    ? classMatch
                      ? `Assign to a ${station} slot — matches its class, earns 10% more`
                      : `Assign to a ${station} slot — no class bonus`
                    : `Cannot go here — ${reason}`
                }
                className={[
                  'w-full flex items-center gap-2 rounded border px-2 py-1 text-left',
                  eligible
                    ? 'bg-zinc-950 border-zinc-800 hover:border-cyan-700'
                    : 'bg-zinc-950/40 border-zinc-900 opacity-50 cursor-not-allowed',
                ].join(' ')}
              >
                <span
                  className={[
                    'text-xs font-bold truncate flex-1',
                    eligible ? 'text-white' : 'text-zinc-500',
                  ].join(' ')}
                >
                  {card.droid.name}
                </span>
                <span className="text-[9px] text-zinc-500">{card.tier}</span>
                {already > 0 && (
                  <span
                    title={`${already} already on the team`}
                    className="text-[9px] text-cyan-500"
                  >
                    ×{already}
                  </span>
                )}
                {eligible ? (
                  EARNING_STATIONS.includes(station) && (
                    <>
                      <span className="text-[9px] text-emerald-400 tabular-nums">
                        {formatCredits(
                          (getDroidEconomy(card.droid.name, card.tier)
                            ?.income ?? 0) *
                            (classMatch ? 1 + CLASS_MATCH_BONUS : 1)
                        )}
                        /s
                      </span>
                      {classMatch && (
                        <span
                          title="Class matches this station — earns 10% more"
                          className="text-[9px] font-bold text-cyan-300"
                        >
                          +10%
                        </span>
                      )}
                    </>
                  )
                ) : (
                  <span className="text-[9px] text-zinc-600 uppercase tracking-wide">
                    {reason}
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
