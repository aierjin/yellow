import {completionScore} from './completion-feedback.mjs';
export const STAR_KEY='yellow-best-stars-v1';
export function readStars(storage){try{const d=JSON.parse(storage.getItem(STAR_KEY)||'{}');return Object.fromEntries(Object.entries(d).filter(([k,v])=>/^\d+$/.test(k)&&Number(k)>=1&&Number(k)<=60&&Number.isFinite(v)&&v>=0&&v<=5&&Number.isInteger(v*2)));}catch{return {};}}
export function totalStars(best){return Object.values(best).reduce((a,b)=>a+b,0);}
export function recordStars(best,number,moves,minimum){return {...best,[number]:Math.max(best[number]||0,completionScore(moves,minimum).stars)};}
export function endingUnlocked(best){return totalStars(best)>280;}

export function migrateStars(storage){const best=readStars(storage);try{if(storage.getItem('yellow-60-level-migration-v1')!=='1'){if(best[58]!==undefined){best[60]=Math.max(best[60]??0,best[58]);delete best[58];}storage.setItem(STAR_KEY,JSON.stringify(best));storage.setItem('yellow-60-level-migration-v1','1');}}catch{}return best;}
