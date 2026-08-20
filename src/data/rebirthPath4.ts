import { req, type RebirthLevel } from './rebirths';

// Source: https://star-wars-droid-tycoon.fandom.com/wiki/Rebirths (v1.26, 5 paths, RB 0-35)
export const REBIRTH_LEVELS_4: RebirthLevel[] = [
  {
    from: 0,
    to: 1,
    credits: '10K',
    droids: [
      req('DEFAULT', 'ID10'),
      req('DEFAULT', 'PIT'),
      req('DEFAULT', 'DRK-1 PROBE'),
    ],
  },
  {
    from: 1,
    to: 2,
    credits: '150K',
    droids: [
      req('DEFAULT', 'R3'),
      req('DEFAULT', '2BB'),
      req('DEFAULT', 'SENATE HOVERCAM'),
    ],
  },
  {
    from: 2,
    to: 3,
    credits: '975K',
    droids: [req('GOLD', 'R5'), req('GOLD', 'R8'), req('DEFAULT', 'R4')],
  },
  {
    from: 3,
    to: 4,
    credits: '2.95M',
    droids: [
      req('GOLD', 'B1 BATTLE'),
      req('GOLD', 'R9'),
      req('GOLD', 'B1 SECURITY'),
    ],
  },
  {
    from: 4,
    to: 5,
    credits: '5.35M',
    droids: [
      req('GOLD', 'R3'),
      req('GOLD', '2BB'),
      req('GOLD', 'SENATE HOVERCAM'),
    ],
  },
  {
    from: 5,
    to: 6,
    credits: '9.85M',
    droids: [
      req('DIAMOND', 'R5'),
      req('DIAMOND', 'R4'),
      req('DIAMOND', 'BDX EXPLORER'),
    ],
  },
  {
    from: 6,
    to: 7,
    credits: '14.5M',
    droids: [
      req('DIAMOND', 'R8'),
      req('DIAMOND', 'B1 BATTLE'),
      req('DIAMOND', 'R9'),
    ],
  },
  {
    from: 7,
    to: 8,
    credits: '36M',
    droids: [
      req('RAINBOW', 'R3'),
      req('RAINBOW', 'B1 SECURITY'),
      req('RAINBOW', '2BB'),
    ],
  },
  {
    from: 8,
    to: 9,
    credits: '89M',
    droids: [
      req('RAINBOW', 'R5'),
      req('RAINBOW', 'R4'),
      req('RAINBOW', 'BDX EXPLORER'),
    ],
  },
  {
    from: 9,
    to: 10,
    credits: '220M',
    droids: [
      req('RAINBOW', 'SENATE HOVERCAM'),
      req('DEFAULT', 'GROUNDMECH'),
      req('DEFAULT', 'TRAK-R'),
    ],
  },
  {
    from: 10,
    to: 11,
    credits: '550M',
    droids: [
      req('DEFAULT', 'B2 HEAVY'),
      req('DEFAULT', 'B2 SUPER'),
      req('DEFAULT', 'UTIL-TEC'),
    ],
  },
  {
    from: 11,
    to: 12,
    credits: '1.36B',
    droids: [
      req('RAINBOW', 'BAL-CORE'),
      req('GOLD', 'GROUNDMECH'),
      req('GOLD', 'TRAK-R'),
    ],
  },
  {
    from: 12,
    to: 13,
    credits: '3.40B',
    droids: [
      req('RAINBOW', 'B2 SUPER'),
      req('DEFAULT', 'MECHA-DROID'),
      req('DEFAULT', 'PROTO-ROLLER'),
    ],
  },
  {
    from: 13,
    to: 14,
    credits: '8.45B',
    droids: [
      req('DIAMOND', 'BAL-CORE'),
      req('DIAMOND', 'GROUNDMECH'),
      req('RAINBOW', 'TRAK-R'),
    ],
  },
  {
    from: 14,
    to: 15,
    credits: '21.00B',
    droids: [
      req('DIAMOND', 'B2 HEAVY'),
      req('RAINBOW', 'B2 SUPER'),
      req('DEFAULT', 'B2-RP'),
    ],
  },
  {
    from: 15,
    to: 16,
    credits: '52.00B',
    droids: [
      req('RAINBOW', 'UTIL-TEC'),
      req('DEFAULT', 'BB9'),
      req('GOLD', 'R7'),
    ],
  },
  {
    from: 16,
    to: 17,
    credits: '130.00B',
    droids: [
      req('DEFAULT', 'OPTI-STRIKE'),
      req('GOLD', 'CYCLO-GRAV'),
      req('GOLD', 'MECHA-DROID'),
    ],
  },
  {
    from: 17,
    to: 18,
    credits: '325.00B',
    droids: [req('GOLD', 'B2-RP'), req('GOLD', 'BB9'), req('DIAMOND', 'R7')],
  },
  {
    from: 18,
    to: 19,
    credits: '810.00B',
    droids: [
      req('DIAMOND', 'MECHA-DROID'),
      req('RAINBOW', 'R7'),
      req('RAINBOW', 'B2-RP'),
    ],
  },
  {
    from: 19,
    to: 20,
    credits: '2.00T',
    droids: [
      req('RAINBOW', 'MONO-WALKER'),
      req('RAINBOW', 'OPTI-STRIKE'),
      req('RAINBOW', 'CYCLO-GRAV'),
    ],
  },
  {
    from: 20,
    to: 21,
    credits: '3.00T',
    droids: [
      req('BESKAR', 'AMP WALKER'),
      req('BESKAR', 'GROUNDMECH'),
      req('BESKAR', 'HAUL-R'),
    ],
  },
  {
    from: 21,
    to: 22,
    credits: '4.50T',
    droids: [
      req('BESKAR', 'GUNRUNNER'),
      req('BESKAR', 'STRIKE-ORB'),
      req('BESKAR', 'B2 SUPER'),
    ],
  },
  {
    from: 22,
    to: 23,
    credits: '6.00T',
    droids: [
      req('BESKAR', 'MONO-WALKER'),
      req('BESKAR', 'CYCLO-GRAV'),
      req('BESKAR', 'B2-RP'),
    ],
  },
  {
    from: 23,
    to: 24,
    credits: '9.00T',
    droids: [
      req('BESKAR', 'MECHA-DROID'),
      req('BESKAR', 'PROTO-ROLLER'),
      req('DEFAULT', 'MO-TRAK'),
    ],
  },
  {
    from: 24,
    to: 25,
    credits: '13.50T',
    droids: [
      req('BESKAR', 'OPTI-STRIKE'),
      req('DEFAULT', 'TRI-TEK'),
      req('GOLD', 'DRFT-R'),
    ],
  },
  {
    from: 25,
    to: 26,
    credits: '21.00T',
    droids: [
      req('GOLD', 'CYCLENS'),
      req('DIAMOND', 'LEP'),
      req('RAINBOW', 'MO-TRAK'),
    ],
  },
  {
    from: 26,
    to: 27,
    credits: '32.00T',
    droids: [
      req('DIAMOND', 'RIC-1200'),
      req('RAINBOW', 'SNOW MOUSE'),
      req('BESKAR', 'LOADLIFTER'),
    ],
  },
  {
    from: 27,
    to: 28,
    credits: '45.00T',
    droids: [
      req('GALACTIC', 'OPTI-STRIKE'),
      req('RAINBOW', 'IG'),
      req('BESKAR', 'KX'),
    ],
  },
  {
    from: 28,
    to: 29,
    credits: '68.00T',
    droids: [
      req('GALACTIC', 'BB9'),
      req('GALACTIC', 'R7'),
      req('BESKAR', 'TRI-TEK'),
    ],
  },
  {
    from: 29,
    to: 30,
    credits: '100.00T',
    droids: [
      req('GALACTIC', 'MONO-WALKER'),
      req('BESKAR', 'CYCLENS'),
      req('GALACTIC', 'IG'),
    ],
  },
  {
    from: 30,
    to: 31,
    credits: '150.00T',
    droids: [
      req('STELLAR', 'TRAK-R'),
      req('BESKAR', 'CYCLO-GRAV'),
      req('BESKAR', 'TRI-TEK'),
    ],
  },
  {
    from: 31,
    to: 32,
    credits: '230.00T',
    droids: [req('GALACTIC', 'R2'), req('GALACTIC', 'R6'), req('BESKAR', 'IG')],
  },
  {
    from: 32,
    to: 33,
    credits: '345.00T',
    droids: [
      req('STELLAR', 'B2 HEAVY'),
      req('GALACTIC', 'BB9'),
      req('GALACTIC', 'RIC-1200'),
    ],
  },
  {
    from: 33,
    to: 34,
    credits: '520.00T',
    droids: [
      req('STELLAR', 'STRIKE-ORB'),
      req('STELLAR', 'AMP WALKER'),
      req('GALACTIC', 'MO-TRAK'),
    ],
  },
  {
    from: 34,
    to: 35,
    credits: '778.00T',
    droids: [
      req('STELLAR', 'B2-RP'),
      req('STELLAR', 'LOADLIFTER'),
      req('STELLAR', 'LEP'),
    ],
  },
];
