import {completionScore} from './completion-feedback.mjs';
export const STAR_KEY='yellow-best-stars-v1';
export function readStars(storage){try{const d=JSON.parse(storage.getItem(STAR_KEY)||'{}');return Object.fromEntries(Object.entries(d).filter(([k,v])=>/^\d+$/.test(k)&&Number(k)>=1&&Number(k)<=58&&Number.isFinite(v)&&v>=0&&v<=5&&Number.isInteger(v*2)));}catch{return {};}}
export function totalStars(best){return Object.values(best).reduce((a,b)=>a+b,0);}
export function recordStars(best,number,moves,minimum){return {...best,[number]:Math.max(best[number]||0,completionScore(moves,minimum).stars)};}
export function endingUnlocked(best){return totalStars(best)>280;}
