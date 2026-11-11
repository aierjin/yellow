import {DUAL_ROUTE_LEVELS} from '../src/dual-route-level.mjs';
import {CHALLENGE_REPLACEMENTS} from '../src/challenge-replacements.mjs';
import {FINALE_LEVELS} from '../src/finale-levels.mjs';
import test from 'node:test';import assert from 'node:assert/strict';
import {completionScore,withPracticeLimit} from '../src/completion-feedback.mjs';
import {LEVELS} from '../src/levels.js';import {CHAPTER1} from '../src/chapter1-levels.mjs';import {CHAPTER2} from '../src/chapter2-levels.mjs';import {CHAPTER3} from '../src/chapter3-levels.mjs';import {CHAPTER4} from '../src/chapter4-levels.mjs';import {FIXED_LEVELS} from '../src/fixed-levels.mjs';
test('stars decrease by half per extra move and stop at zero',()=>{assert.deepEqual(completionScore(3,3),{stars:5,extraMoves:0,optimal:true,fills:[100,100,100,100,100]});assert.deepEqual(completionScore(4,3),{stars:4.5,extraMoves:1,optimal:false,fills:[100,100,100,100,50]});assert.equal(completionScore(5,3).stars,4);assert.equal(completionScore(13,3).stars,0);assert.equal(completionScore(40,3).stars,0);});
test('practice limits only affect previously unlimited minimum3/4 levels',()=>{const source=[...CHAPTER1,...CHAPTER2,...CHAPTER3,...CHAPTER4,...FIXED_LEVELS,...FINALE_LEVELS];for(const [i,d]of source.entries()){if(CHALLENGE_REPLACEMENTS[d.number] || DUAL_ROUTE_LEVELS[d.number])continue;const expected=d.maxClicks??(d.minMoves===3?10:d.minMoves===4?13:undefined);assert.equal(LEVELS[i].maxClicks??undefined,expected);if(expected!=null)assert.equal(LEVELS[i].type,'challenge');assert.deepEqual(LEVELS[i].pillars,d.pillars);}const d={minMoves:3,type:'normal'};assert.equal(withPracticeLimit(d).maxClicks,10);assert.equal(d.maxClicks,undefined);assert.equal(withPracticeLimit({minMoves:4,maxClicks:5,type:'challenge'}).maxClicks,5);});

