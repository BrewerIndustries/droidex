import { REBIRTH_LEVELS } from './rebirths';
import { REBIRTH_LEVELS_2 } from './rebirthPath2';
import { REBIRTH_LEVELS_3 } from './rebirthPath3';
import { REBIRTH_LEVELS_4 } from './rebirthPath4';
import { REBIRTH_LEVELS_5 } from './rebirthPath5';

export const REBIRTH_PATHS = {
  1: REBIRTH_LEVELS,
  2: REBIRTH_LEVELS_2,
  3: REBIRTH_LEVELS_3,
  4: REBIRTH_LEVELS_4,
  5: REBIRTH_LEVELS_5,
} as const;

export const REBIRTH_PATH_NUMBERS = Object.keys(REBIRTH_PATHS).map(Number);
