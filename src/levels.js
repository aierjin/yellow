import {PENULTIMATE_LEVELS} from './penultimate-levels.mjs';
import {CHALLENGE_REPLACEMENTS} from './challenge-replacements.mjs';
import {ENDING_LEVELS} from './ending-levels.mjs';
import {FINALE_LEVELS} from './finale-levels.mjs';
import {withPracticeLimit} from './completion-feedback.mjs';
import { CHAPTER1 } from './chapter1-levels.mjs';
import { CHAPTER2 } from './chapter2-levels.mjs';
import { FIXED_LEVELS } from './fixed-levels.mjs';
import { CHAPTER4 } from './chapter4-levels.mjs';
import { CHAPTER3 } from './chapter3-levels.mjs';
// Chapter1 teaches observation; later chapters build on those habits.
const LEVELS=[...CHAPTER1,...CHAPTER2,...CHAPTER3,...CHAPTER4,...FIXED_LEVELS,...FINALE_LEVELS,...ENDING_LEVELS].flatMap(d=>d.number===58?[...PENULTIMATE_LEVELS,{...d,number:60}]:[d]).map(d=>withPracticeLimit(CHALLENGE_REPLACEMENTS[d.number]??d));
export {LEVELS};
