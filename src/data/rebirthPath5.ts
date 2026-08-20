import { req, type RebirthLevel } from './rebirths';

// Source: https://star-wars-droid-tycoon.fandom.com/wiki/Rebirths (v1.26, 5 paths, RB 0-35)
export const REBIRTH_LEVELS_5: RebirthLevel[] = [
  {
    from: 0,
    to: 1,
    credits: '10K',
    droids: [
      req('DEFAULT', 'ID10'),
      req('DEFAULT', 'MOUSE'),
      req('DEFAULT', 'GONK'),
    ],
  },
  {
    from: 1,
    to: 2,
    credits: '150K',
    droids: [
      req('DEFAULT', '2BB'),
      req('GOLD', 'IMPERIAL PROBE'),
      req('DEFAULT', 'ROLL-R'),
    ],
  },
  {
    from: 2,
    to: 3,
    credits: '975K',
    droids: [
      req('DEFAULT', 'R4'),
      req('DEFAULT', 'VECT-ARM'),
      req('GOLD', 'BDX EXPLORER'),
    ],
  },
  {
    from: 3,
    to: 4,
    credits: '2.95M',
    droids: [
      req('GOLD', 'R9'),
      req('GOLD', 'B1 BATTLE'),
      req('GOLD', 'B1 SECURITY'),
    ],
  },
  {
    from: 4,
    to: 5,
    credits: '5.35M',
    droids: [req('GOLD', 'BAL-CORE'), req('GOLD', 'R4'), req('GOLD', 'R3')],
  },
  {
    from: 5,
    to: 6,
    credits: '9.85M',
    droids: [
      req('DEFAULT', 'GUNRUNNER'),
      req('DIAMOND', '2BB'),
      req('DIAMOND', 'BDX EXPLORER'),
    ],
  },
  {
    from: 6,
    to: 7,
    credits: '14.5M',
    droids: [req('DIAMOND', 'ROLL-R'), req('DIAMOND', 'R5'), req('GOLD', 'R2')],
  },
  {
    from: 7,
    to: 8,
    credits: '36M',
    droids: [
      req('GOLD', 'B2 SUPER'),
      req('DIAMOND', 'R8'),
      req('DIAMOND', 'B1 BATTLE'),
    ],
  },
  {
    from: 8,
    to: 9,
    credits: '89M',
    droids: [
      req('RAINBOW', 'NAV-EX'),
      req('GOLD', 'STRIKE-ORB'),
      req('GOLD', 'AMP WALKER'),
    ],
  },
  {
    from: 9,
    to: 10,
    credits: '220M',
    droids: [
      req('BESKAR', 'IMPERIAL PROBE'),
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
      req('GOLD', 'B2 SUPER'),
      req('GOLD', 'B2 HEAVY'),
      req('DIAMOND', 'R2'),
    ],
  },
  {
    from: 13,
    to: 14,
    credits: '8.45B',
    droids: [
      req('DIAMOND', 'GROUNDMECH'),
      req('DIAMOND', 'TRAK-R'),
      req('RAINBOW', 'UTIL-TEC'),
    ],
  },
  {
    from: 14,
    to: 15,
    credits: '21.00B',
    droids: [
      req('DIAMOND', 'B2 HEAVY'),
      req('DIAMOND', 'B2 SUPER'),
      req('DEFAULT', 'B2-RP'),
    ],
  },
  {
    from: 15,
    to: 16,
    credits: '52.00B',
    droids: [
      req('DEFAULT', 'BB9'),
      req('GOLD', 'R7'),
      req('GOLD', 'PROTO-ROLLER'),
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
    droids: [req('GOLD', 'BB9'), req('GOLD', 'B2-RP'), req('DIAMOND', 'R7')],
  },
  {
    from: 18,
    to: 19,
    credits: '810.00B',
    droids: [
      req('DIAMOND', 'OPTI-STRIKE'),
      req('DIAMOND', 'CYCLO-GRAV'),
      req('RAINBOW', 'MECHA-DROID'),
    ],
  },
  {
    from: 19,
    to: 20,
    credits: '2.00T',
    droids: [
      req('RAINBOW', 'B2-RP'),
      req('RAINBOW', 'BB9'),
      req('RAINBOW', 'R7'),
    ],
  },
  {
    from: 20,
    to: 21,
    credits: '3.00T',
    droids: [
      req('BESKAR', 'LO'),
      req('BESKAR', 'STRIKE-ORB'),
      req('BESKAR', 'HAUL-R'),
    ],
  },
  {
    from: 21,
    to: 22,
    credits: '4.50T',
    droids: [
      req('BESKAR', 'SEN-TRI'),
      req('BESKAR', 'R6'),
      req('BESKAR', 'GUNRUNNER'),
    ],
  },
  {
    from: 22,
    to: 23,
    credits: '6.00T',
    droids: [
      req('BESKAR', 'BB9'),
      req('BESKAR', 'CYCLO-GRAV'),
      req('BESKAR', 'B2-RP'),
    ],
  },
  {
    from: 23,
    to: 24,
    credits: '9.00T',
    droids: [
      req('BESKAR', 'MONO-WALKER'),
      req('BESKAR', 'OPTI-STRIKE'),
      req('DEFAULT', 'MO-TRAK'),
    ],
  },
  {
    from: 24,
    to: 25,
    credits: '13.50T',
    droids: [
      req('BESKAR', 'MECHA-DROID'),
      req('DEFAULT', 'RIC'),
      req('GOLD', 'TRI-TEK'),
    ],
  },
  {
    from: 25,
    to: 26,
    credits: '21.00T',
    droids: [
      req('GOLD', 'CYCLENS'),
      req('DIAMOND', 'LEP'),
      req('RAINBOW', 'SNOW MOUSE'),
    ],
  },
  {
    from: 26,
    to: 27,
    credits: '32.00T',
    droids: [
      req('DIAMOND', 'RIC-1200'),
      req('RAINBOW', 'IG'),
      req('BESKAR', 'LOADLIFTER'),
    ],
  },
  {
    from: 27,
    to: 28,
    credits: '45.00T',
    droids: [
      req('RAINBOW', 'RIC'),
      req('BESKAR', 'MO-TRAK'),
      req('GALACTIC', 'BB9'),
    ],
  },
  {
    from: 28,
    to: 29,
    credits: '68.00T',
    droids: [
      req('BESKAR', 'IG'),
      req('GALACTIC', 'MECHA-DROID'),
      req('GALACTIC', 'OPTI-STRIKE'),
    ],
  },
  {
    from: 29,
    to: 30,
    credits: '100.00T',
    droids: [
      req('GALACTIC', 'R7'),
      req('BESKAR', 'LEP'),
      req('GALACTIC', 'CYCLENS'),
    ],
  },
  {
    from: 30,
    to: 31,
    credits: '150.00T',
    droids: [
      req('STELLAR', 'AMP WALKER'),
      req('BESKAR', 'OPTI-STRIKE'),
      req('BESKAR', 'SNOW MOUSE'),
    ],
  },
  {
    from: 31,
    to: 32,
    credits: '230.00T',
    droids: [
      req('GALACTIC', 'LO'),
      req('GALACTIC', 'TRAK-R'),
      req('BESKAR', 'DRFT-R'),
    ],
  },
  {
    from: 32,
    to: 33,
    credits: '345.00T',
    droids: [
      req('STELLAR', 'UTIL-TEC'),
      req('GALACTIC', 'R7'),
      req('GALACTIC', 'TRI-TEK'),
    ],
  },
  {
    from: 33,
    to: 34,
    credits: '520.00T',
    droids: [
      req('STELLAR', 'HAUL-R'),
      req('STELLAR', 'LNG-SHOT'),
      req('GALACTIC', 'IG'),
    ],
  },
  {
    from: 34,
    to: 35,
    credits: '778.00T',
    droids: [
      req('STELLAR', 'MECHA-DROID'),
      req('STELLAR', 'RIC-1200'),
      req('STELLAR', 'MO-TRAK'),
    ],
  },
];
