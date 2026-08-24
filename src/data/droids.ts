import type { DroidType, Rarity, Tier } from '../lib/droidTypes';

export interface Droid {
  name: string;
  rarity: Rarity;
  type: DroidType;
  tiers: Tier[];

  eventLocked?: boolean;
  canBeFlawless?: boolean;

  /**
   * The three droids that fuse into this one. Fusion-exclusive droids cannot be
   * bought from the Sandcrawler at all, so they have no purchase cost.
   */
  fusion?: [string, string, string];
}

export interface DroidCard {
  id: string; // `${name}_${tier}`
  droid: Droid;
  tier: Tier;
}

const ALL_TIERS: Tier[] = [
  'DEFAULT',
  'GOLD',
  'DIAMOND',
  'RAINBOW',
  'BESKAR',
  'GALACTIC',
  'STELLAR',
];
const DEFAULT_ONLY: Tier[] = ['DEFAULT'];

export const DROIDS: Droid[] = [
  // COMMON
  { name: 'MOUSE', rarity: 'COMMON', type: 'WORKER', tiers: ALL_TIERS },
  { name: 'PIT', rarity: 'COMMON', type: 'WORKER', tiers: ALL_TIERS },
  { name: 'GONK', rarity: 'COMMON', type: 'WORKER', tiers: ALL_TIERS },
  { name: 'CB', rarity: 'COMMON', type: 'ASTROMECH', tiers: ALL_TIERS },
  { name: 'R3', rarity: 'COMMON', type: 'ASTROMECH', tiers: ALL_TIERS },
  { name: 'R5', rarity: 'COMMON', type: 'ASTROMECH', tiers: ALL_TIERS },
  { name: 'R8', rarity: 'COMMON', type: 'ASTROMECH', tiers: ALL_TIERS },
  {
    name: 'IMPERIAL PROBE',
    rarity: 'COMMON',
    type: 'BATTLE',
    tiers: ALL_TIERS,
  },
  { name: 'B1 BATTLE', rarity: 'COMMON', type: 'BATTLE', tiers: ALL_TIERS },
  { name: 'DRK-1 PROBE', rarity: 'COMMON', type: 'BATTLE', tiers: ALL_TIERS },
  { name: 'ID10', rarity: 'COMMON', type: 'BATTLE', tiers: ALL_TIERS },

  // RARE
  { name: 'BDX EXPLORER', rarity: 'RARE', type: 'WORKER', tiers: ALL_TIERS },
  { name: 'ARG', rarity: 'RARE', type: 'WORKER', tiers: ALL_TIERS },
  { name: 'SENATE HOVERCAM', rarity: 'RARE', type: 'WORKER', tiers: ALL_TIERS },
  { name: 'BU-4D', rarity: 'RARE', type: 'WORKER', tiers: ALL_TIERS },
  { name: 'BAL-CORE', rarity: 'RARE', type: 'WORKER', tiers: ALL_TIERS },
  { name: 'ROLL-R', rarity: 'RARE', type: 'WORKER', tiers: ALL_TIERS },
  { name: '2BB', rarity: 'RARE', type: 'ASTROMECH', tiers: ALL_TIERS },
  { name: 'A-LT', rarity: 'RARE', type: 'ASTROMECH', tiers: ALL_TIERS },
  { name: 'R4', rarity: 'RARE', type: 'ASTROMECH', tiers: ALL_TIERS },
  { name: 'R9', rarity: 'RARE', type: 'ASTROMECH', tiers: ALL_TIERS },
  { name: 'B1 SECURITY', rarity: 'RARE', type: 'BATTLE', tiers: ALL_TIERS },
  { name: 'NAV-EX', rarity: 'RARE', type: 'BATTLE', tiers: ALL_TIERS },
  { name: 'VECT-ARM', rarity: 'RARE', type: 'BATTLE', tiers: ALL_TIERS },
  { name: 'HOV-R', rarity: 'RARE', type: 'BATTLE', tiers: ALL_TIERS },

  // EPIC
  { name: 'GROUNDMECH', rarity: 'EPIC', type: 'WORKER', tiers: ALL_TIERS },
  { name: 'LO', rarity: 'EPIC', type: 'WORKER', tiers: ALL_TIERS },
  { name: 'AMP WALKER', rarity: 'EPIC', type: 'WORKER', tiers: ALL_TIERS },
  { name: 'SEN-TRI', rarity: 'EPIC', type: 'WORKER', tiers: ALL_TIERS },
  { name: 'OPTI-POD', rarity: 'EPIC', type: 'WORKER', tiers: ALL_TIERS },
  { name: 'GUNRUNNER', rarity: 'EPIC', type: 'WORKER', tiers: ALL_TIERS },
  { name: 'BB', rarity: 'EPIC', type: 'ASTROMECH', tiers: ALL_TIERS },
  { name: 'R2', rarity: 'EPIC', type: 'ASTROMECH', tiers: ALL_TIERS },
  { name: 'R6', rarity: 'EPIC', type: 'ASTROMECH', tiers: ALL_TIERS },
  { name: 'TRAK-R', rarity: 'EPIC', type: 'ASTROMECH', tiers: ALL_TIERS },
  { name: 'ORB-WALKER', rarity: 'EPIC', type: 'ASTROMECH', tiers: ALL_TIERS },
  { name: 'UTIL-TEC', rarity: 'EPIC', type: 'ASTROMECH', tiers: ALL_TIERS },
  { name: 'B1 HEAVY', rarity: 'EPIC', type: 'BATTLE', tiers: ALL_TIERS },
  { name: 'B2 SUPER', rarity: 'EPIC', type: 'BATTLE', tiers: ALL_TIERS },
  { name: 'B2 HEAVY', rarity: 'EPIC', type: 'BATTLE', tiers: ALL_TIERS },
  { name: 'STRIKE-ORB', rarity: 'EPIC', type: 'BATTLE', tiers: ALL_TIERS },
  { name: 'HAUL-R', rarity: 'EPIC', type: 'BATTLE', tiers: ALL_TIERS },
  { name: 'LNG-SHOT', rarity: 'EPIC', type: 'BATTLE', tiers: ALL_TIERS },

  // LEGENDARY
  {
    name: 'PROTO-ROLLER',
    rarity: 'LEGENDARY',
    type: 'WORKER',
    tiers: ALL_TIERS,
  },
  {
    name: 'MECHA-DROID',
    rarity: 'LEGENDARY',
    type: 'WORKER',
    tiers: ALL_TIERS,
  },
  {
    name: 'MONO-WALKER',
    rarity: 'LEGENDARY',
    type: 'WORKER',
    tiers: ALL_TIERS,
  },
  { name: 'BB9', rarity: 'LEGENDARY', type: 'ASTROMECH', tiers: ALL_TIERS },
  { name: 'R7', rarity: 'LEGENDARY', type: 'ASTROMECH', tiers: ALL_TIERS },
  { name: 'B2-RP', rarity: 'LEGENDARY', type: 'BATTLE', tiers: ALL_TIERS },
  { name: 'CYCLO-GRAV', rarity: 'LEGENDARY', type: 'BATTLE', tiers: ALL_TIERS },
  {
    name: 'OPTI-STRIKE',
    rarity: 'LEGENDARY',
    type: 'BATTLE',
    tiers: ALL_TIERS,
  },

  // MYTHIC
  { name: 'SNOW MOUSE', rarity: 'MYTHIC', type: 'WORKER', tiers: ALL_TIERS },
  { name: 'RIC', rarity: 'MYTHIC', type: 'WORKER', tiers: ALL_TIERS },
  { name: 'LOADLIFTER', rarity: 'MYTHIC', type: 'WORKER', tiers: ALL_TIERS },
  { name: 'RIC-1200', rarity: 'MYTHIC', type: 'WORKER', tiers: ALL_TIERS },
  { name: 'LEP', rarity: 'MYTHIC', type: 'WORKER', tiers: ALL_TIERS },

  { name: 'DRFT-R', rarity: 'MYTHIC', type: 'ASTROMECH', tiers: ALL_TIERS },
  { name: 'CYCLENS', rarity: 'MYTHIC', type: 'ASTROMECH', tiers: ALL_TIERS },
  { name: 'MO-TRAK', rarity: 'MYTHIC', type: 'ASTROMECH', tiers: ALL_TIERS },

  { name: 'TRI-TEK', rarity: 'MYTHIC', type: 'ASTROMECH', tiers: ALL_TIERS },
  { name: 'IG', rarity: 'MYTHIC', type: 'BATTLE', tiers: ALL_TIERS },
  { name: 'KX', rarity: 'MYTHIC', type: 'BATTLE', tiers: ALL_TIERS },

  // FUSION EXCLUSIVE (v1.27) — obtainable only at the Fusion lab.
  // The result keeps the tier of the droids fused, so these have every tier.
  {
    name: 'WHL-EX',
    rarity: 'RARE',
    type: 'WORKER',
    tiers: ALL_TIERS,
    fusion: ['MOUSE', 'MOUSE', 'ARG'],
  },
  {
    name: 'ZRO-TEC',
    rarity: 'RARE',
    type: 'ASTROMECH',
    tiers: ALL_TIERS,
    fusion: ['ID10', 'ID10', '2BB'],
  },
  {
    name: 'BTL-R',
    rarity: 'RARE',
    type: 'BATTLE',
    tiers: ALL_TIERS,
    fusion: ['B1 BATTLE', 'R9', 'BDX EXPLORER'],
  },
  {
    name: 'N-UL',
    rarity: 'EPIC',
    type: 'WORKER',
    tiers: ALL_TIERS,
    fusion: ['GUNRUNNER', 'BB', 'B1 HEAVY'],
  },
  {
    name: 'SCRP-R',
    rarity: 'EPIC',
    type: 'ASTROMECH',
    tiers: ALL_TIERS,
    fusion: ['GONK', 'R6', 'GROUNDMECH'],
  },
  {
    name: 'ARM-CORE',
    rarity: 'EPIC',
    type: 'BATTLE',
    tiers: ALL_TIERS,
    fusion: ['ARG', 'ARG', 'B2 HEAVY'],
  },
  {
    name: 'OPT-AR',
    rarity: 'EPIC',
    type: 'BATTLE',
    tiers: ALL_TIERS,
    fusion: ['R2', 'R2', 'B2 SUPER'],
  },
  {
    name: 'RO-TOR',
    rarity: 'LEGENDARY',
    type: 'WORKER',
    tiers: ALL_TIERS,
    fusion: ['PIT', 'B1 BATTLE', 'BB9'],
  },
  {
    name: 'FUS-3',
    rarity: 'LEGENDARY',
    type: 'WORKER',
    tiers: ALL_TIERS,
    fusion: ['BU-4D', 'BU-4D', 'R7'],
  },
  {
    name: 'QIK-BIT',
    rarity: 'LEGENDARY',
    type: 'ASTROMECH',
    tiers: ALL_TIERS,
    fusion: ['GROUNDMECH', 'GROUNDMECH', 'BB9'],
  },
  {
    name: 'ORB-XL',
    rarity: 'LEGENDARY',
    type: 'BATTLE',
    tiers: ALL_TIERS,
    fusion: ['CB', 'GUNRUNNER', 'B2-RP'],
  },
  {
    name: 'RIV-3T',
    rarity: 'MYTHIC',
    type: 'WORKER',
    tiers: ALL_TIERS,
    fusion: ['RIC', 'IG', 'KX'],
  },
  {
    name: 'LUG-G',
    rarity: 'MYTHIC',
    type: 'WORKER',
    tiers: ALL_TIERS,
    fusion: ['ID10', 'R5', 'LOADLIFTER'],
  },
  {
    name: 'LOW-MO',
    rarity: 'MYTHIC',
    type: 'WORKER',
    tiers: ALL_TIERS,
    fusion: ['A-LT', 'A-LT', 'LOADLIFTER'],
  },
  {
    name: 'AXI-POD',
    rarity: 'MYTHIC',
    type: 'ASTROMECH',
    tiers: ALL_TIERS,
    fusion: ['BDX EXPLORER', 'R7', 'RIC'],
  },
  {
    name: 'SRV-O',
    rarity: 'MYTHIC',
    type: 'BATTLE',
    tiers: ALL_TIERS,
    fusion: ['B1 HEAVY', 'B1 HEAVY', 'RIC-1200'],
  },
  {
    name: 'X-ONK',
    rarity: 'MYTHIC',
    type: 'BATTLE',
    tiers: ALL_TIERS,
    fusion: ['GONK', 'KX', 'KX'],
  },

  // ICONIC (event locked, DEFAULT only)

  {
    name: 'DJ R-3X',
    rarity: 'ICONIC',
    type: 'WORKER',
    tiers: DEFAULT_ONLY,
    eventLocked: true,
    canBeFlawless: false,
  },
  {
    name: 'C-3PO',
    rarity: 'ICONIC',
    type: 'WORKER',
    tiers: DEFAULT_ONLY,
    eventLocked: true,
    canBeFlawless: false,
  },
  {
    name: 'BB8',
    rarity: 'ICONIC',
    type: 'ASTROMECH',
    tiers: DEFAULT_ONLY,
    canBeFlawless: false,
    eventLocked: true,
  },
  {
    name: 'R2-D2',
    rarity: 'ICONIC',
    type: 'ASTROMECH',
    tiers: DEFAULT_ONLY,
    eventLocked: true,
    canBeFlawless: false,
  },
  {
    name: 'CHOPPER',
    rarity: 'ICONIC',
    type: 'ASTROMECH',
    tiers: DEFAULT_ONLY,
    eventLocked: true,
    canBeFlawless: false,
  },
  {
    name: 'CB-23',
    rarity: 'ICONIC',
    type: 'ASTROMECH',
    tiers: DEFAULT_ONLY,
    eventLocked: true,
    canBeFlawless: false,
  },
  {
    name: 'MISTER BONES',
    rarity: 'ICONIC',
    type: 'BATTLE',
    tiers: DEFAULT_ONLY,
    eventLocked: true,
    canBeFlawless: false,
  },
  {
    name: 'IG-11 MARSHAL',
    rarity: 'ICONIC',
    type: 'BATTLE',
    tiers: DEFAULT_ONLY,
    eventLocked: true,
    canBeFlawless: false,
  },
];

export const ALL_CARDS: DroidCard[] = DROIDS.flatMap((droid) =>
  droid.tiers.map((tier) => ({
    id: `${droid.name}_${tier}`,
    droid,
    tier,
  }))
);

export const TOTAL_DROIDS = ALL_CARDS.length;

export const RARITY_ORDER: Rarity[] = [
  'COMMON',
  'RARE',
  'EPIC',
  'LEGENDARY',
  'MYTHIC',
  'ICONIC',
];

export const TIER_ORDER: Tier[] = [
  'DEFAULT',
  'GOLD',
  'DIAMOND',
  'RAINBOW',
  'BESKAR',
  'GALACTIC',
  'STELLAR',
];
