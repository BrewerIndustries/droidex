export type Rarity =
  | 'COMMON'
  | 'RARE'
  | 'EPIC'
  | 'LEGENDARY'
  | 'MYTHIC'
  | 'ICONIC';

export type DroidType = 'WORKER' | 'ASTROMECH' | 'BATTLE';

export type Tier =
  | 'DEFAULT'
  | 'GOLD'
  | 'DIAMOND'
  | 'RAINBOW'
  | 'BESKAR'
  | 'GALACTIC'
  | 'STELLAR';

export type TierOrAll = Tier | 'ALL';

export type CollectionStatus = 'ALL' | 'OWNED' | 'MISSING';

export type RebirthStatus = 'ALL' | 'NEEDED' | 'HISTORICAL';

export type FlawlessStatus = 'ALL' | 'FLAWLESS' | 'MISSING';
