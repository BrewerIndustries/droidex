import type { Tier } from '../lib/droidTypes';
export interface RebirthDroidReq {
  name: string;
  tier: Tier;
  cardId: string; // matches DroidCard.id
}

export interface RebirthLevel {
  from: number;
  to: number;
  credits: string;
  droids: RebirthDroidReq[];
}

export function req(tier: Tier, name: string): RebirthDroidReq {
  return { name, tier, cardId: `${name}_${tier}` };
}

// Source: https://star-wars-droid-tycoon.fandom.com/wiki/Rebirths (v1.26, 5 paths, RB 0-35)
// "Base" in the wiki = DEFAULT tier. MONO-WLKR -> MONO-WALKER, OPTI-STRK -> OPTI-STRIKE.
// The wiki's trailing "*" (droid re-used by a later rebirth) is dropped; Droidex derives
// that from the path data itself.
export const REBIRTH_LEVELS: RebirthLevel[] = [
  {
    from: 0,
    to: 1,
    credits: '10K',
    droids: [
      req('DEFAULT', 'CB'),
      req('DEFAULT', 'PIT'),
      req('DEFAULT', 'DRK-1 PROBE'),
    ],
  },
  {
    from: 1,
    to: 2,
    credits: '150K',
    droids: [
      req('DEFAULT', 'BDX EXPLORER'),
      req('DEFAULT', '2BB'),
      req('DEFAULT', 'BAL-CORE'),
    ],
  },
  {
    from: 2,
    to: 3,
    credits: '975K',
    droids: [
      req('DEFAULT', 'A-LT'),
      req('DEFAULT', 'BU-4D'),
      req('GOLD', 'R9'),
    ],
  },
  {
    from: 3,
    to: 4,
    credits: '2.95M',
    droids: [
      req('GOLD', 'ARG'),
      req('GOLD', 'B1 SECURITY'),
      req('DEFAULT', 'GROUNDMECH'),
    ],
  },
  {
    from: 4,
    to: 5,
    credits: '5.35M',
    droids: [req('GOLD', 'BU-4D'), req('GOLD', 'HOV-R'), req('DIAMOND', 'R9')],
  },
  {
    from: 5,
    to: 6,
    credits: '9.85M',
    droids: [
      req('DIAMOND', 'A-LT'),
      req('DIAMOND', 'ARG'),
      req('GOLD', 'GROUNDMECH'),
    ],
  },
  {
    from: 6,
    to: 7,
    credits: '14.5M',
    droids: [
      req('DIAMOND', 'BU-4D'),
      req('DIAMOND', 'B1 SECURITY'),
      req('GOLD', 'BB'),
    ],
  },
  {
    from: 7,
    to: 8,
    credits: '36M',
    droids: [
      req('DIAMOND', 'HOV-R'),
      req('GOLD', 'LO'),
      req('GOLD', 'UTIL-TEC'),
    ],
  },
  {
    from: 8,
    to: 9,
    credits: '89M',
    droids: [
      req('GOLD', 'TRAK-R'),
      req('GOLD', 'R6'),
      req('RAINBOW', 'GROUNDMECH'),
    ],
  },
  {
    from: 9,
    to: 10,
    credits: '220M',
    droids: [
      req('GOLD', 'STRIKE-ORB'),
      req('RAINBOW', 'HAUL-R'),
      req('RAINBOW', 'LO'),
    ],
  },
  {
    from: 10,
    to: 11,
    credits: '550M',
    droids: [
      req('RAINBOW', 'AMP WALKER'),
      req('RAINBOW', 'B1 HEAVY'),
      req('DEFAULT', 'BB9'),
    ],
  },
  {
    from: 11,
    to: 12,
    credits: '1.36B',
    droids: [
      req('GOLD', 'PROTO-ROLLER'),
      req('DEFAULT', 'MECHA-DROID'),
      req('DEFAULT', 'MONO-WALKER'),
    ],
  },
  {
    from: 12,
    to: 13,
    credits: '3.40B',
    droids: [
      req('DEFAULT', 'R7'),
      req('DEFAULT', 'CYCLO-GRAV'),
      req('DEFAULT', 'B2-RP'),
    ],
  },
  {
    from: 13,
    to: 14,
    credits: '8.45B',
    droids: [
      req('DEFAULT', 'OPTI-STRIKE'),
      req('GOLD', 'MONO-WALKER'),
      req('GOLD', 'MECHA-DROID'),
    ],
  },
  {
    from: 14,
    to: 15,
    credits: '21.00B',
    droids: [req('GOLD', 'B2-RP'), req('GOLD', 'BB9'), req('GOLD', 'R7')],
  },
  {
    from: 15,
    to: 16,
    credits: '52.00B',
    droids: [
      req('GOLD', 'OPTI-STRIKE'),
      req('DIAMOND', 'MONO-WALKER'),
      req('DIAMOND', 'PROTO-ROLLER'),
    ],
  },
  {
    from: 16,
    to: 17,
    credits: '130.00B',
    droids: [
      req('DIAMOND', 'B2-RP'),
      req('DIAMOND', 'CYCLO-GRAV'),
      req('DIAMOND', 'MECHA-DROID'),
    ],
  },
  {
    from: 17,
    to: 18,
    credits: '325.00B',
    droids: [
      req('DIAMOND', 'BB9'),
      req('DIAMOND', 'R7'),
      req('RAINBOW', 'MONO-WALKER'),
    ],
  },
  {
    from: 18,
    to: 19,
    credits: '810.00B',
    droids: [
      req('RAINBOW', 'B2-RP'),
      req('RAINBOW', 'CYCLO-GRAV'),
      req('RAINBOW', 'PROTO-ROLLER'),
    ],
  },
  {
    from: 19,
    to: 20,
    credits: '2.00T',
    droids: [
      req('RAINBOW', 'R7'),
      req('RAINBOW', 'OPTI-STRIKE'),
      req('RAINBOW', 'MECHA-DROID'),
    ],
  },
  {
    from: 20,
    to: 21,
    credits: '3.00T',
    droids: [
      req('BESKAR', 'BB'),
      req('BESKAR', 'ORB-WALKER'),
      req('BESKAR', 'GROUNDMECH'),
    ],
  },
  {
    from: 21,
    to: 22,
    credits: '4.50T',
    droids: [
      req('BESKAR', 'AMP WALKER'),
      req('BESKAR', 'B1 HEAVY'),
      req('BESKAR', 'PROTO-ROLLER'),
    ],
  },
  {
    from: 22,
    to: 23,
    credits: '6.00T',
    droids: [
      req('BESKAR', 'OPTI-STRIKE'),
      req('BESKAR', 'MONO-WALKER'),
      req('BESKAR', 'R7'),
    ],
  },
  {
    from: 23,
    to: 24,
    credits: '9.00T',
    droids: [
      req('BESKAR', 'BB9'),
      req('BESKAR', 'CYCLO-GRAV'),
      req('DEFAULT', 'MO-TRAK'),
    ],
  },
  {
    from: 24,
    to: 25,
    credits: '13.50T',
    droids: [
      req('BESKAR', 'B2-RP'),
      req('DEFAULT', 'IG'),
      req('GOLD', 'DRFT-R'),
    ],
  },
  {
    from: 25,
    to: 26,
    credits: '21.00T',
    droids: [
      req('GOLD', 'CYCLENS'),
      req('DIAMOND', 'LOADLIFTER'),
      req('RAINBOW', 'RIC-1200'),
    ],
  },
  {
    from: 26,
    to: 27,
    credits: '32.00T',
    droids: [
      req('DIAMOND', 'KX'),
      req('RAINBOW', 'TRI-TEK'),
      req('BESKAR', 'SNOW MOUSE'),
    ],
  },
  {
    from: 27,
    to: 28,
    credits: '45.00T',
    droids: [
      req('GALACTIC', 'PROTO-ROLLER'),
      req('RAINBOW', 'MO-TRAK'),
      req('BESKAR', 'DRFT-R'),
    ],
  },
  {
    from: 28,
    to: 29,
    credits: '68.00T',
    droids: [
      req('GALACTIC', 'MONO-WALKER'),
      req('GALACTIC', 'MECHA-DROID'),
      req('BESKAR', 'IG'),
    ],
  },
  {
    from: 29,
    to: 30,
    credits: '100.00T',
    droids: [
      req('GALACTIC', 'B2-RP'),
      req('BESKAR', 'CYCLENS'),
      req('GALACTIC', 'LOADLIFTER'),
    ],
  },
  {
    from: 30,
    to: 31,
    credits: '150.00T',
    droids: [
      req('STELLAR', 'SEN-TRI'),
      req('BESKAR', 'PROTO-ROLLER'),
      req('BESKAR', 'KX'),
    ],
  },
  {
    from: 31,
    to: 32,
    credits: '230.00T',
    droids: [
      req('GALACTIC', 'ORB-WALKER'),
      req('GALACTIC', 'OPTI-POD'),
      req('BESKAR', 'RIC'),
    ],
  },
  {
    from: 32,
    to: 33,
    credits: '345.00T',
    droids: [
      req('STELLAR', 'B1 HEAVY'),
      req('GALACTIC', 'CYCLO-GRAV'),
      req('GALACTIC', 'DRFT-R'),
    ],
  },
  {
    from: 33,
    to: 34,
    credits: '520.00T',
    droids: [
      req('STELLAR', 'GROUNDMECH'),
      req('STELLAR', 'BB'),
      req('GALACTIC', 'CYCLENS'),
    ],
  },
  {
    from: 34,
    to: 35,
    credits: '778.00T',
    droids: [
      req('STELLAR', 'BB9'),
      req('STELLAR', 'IG'),
      req('STELLAR', 'SNOW MOUSE'),
    ],
  },
];
