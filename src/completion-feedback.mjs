// Keep authored challenge budgets; only add practice limits where none existed.
export function withPracticeLimit(def){
 if(def.maxClicks!=null)return def;
 const limit=def.minMoves===3?10:def.minMoves===4?13:null;
 return limit==null?def:{...def,type:'challenge',maxClicks:limit};
}
export function completionScore(moves,minimum){
 const extraMoves=Math.max(0,moves-minimum),stars=Math.max(0,5-extraMoves*.5);
 return {stars,extraMoves,optimal:extraMoves===0,fills:Array.from({length:5},(_,i)=>Math.max(0,Math.min(1,stars-i))*100)};
}
const star='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01Z"/></svg>';
export function renderCompletionRating(element,moves,minimum){
 const score=completionScore(moves,minimum);
 element.setAttribute('aria-label',`${score.stars} / 5 星`);
 element.dataset.stars=String(score.stars);
 element.innerHTML=score.fills.map(fill=>`<span class="rating-star" aria-hidden="true">${star}<span class="rating-fill" style="width:${fill}%">${star}</span></span>`).join('');
 return score;
}
