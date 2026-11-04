import {ChainReactionSystem} from './engine.js';
export const boardKey=level=>level.pillars.flat().map(p=>`${p.height}:${p.height===0||p.height===level.maxHeight?0:p.direction}`).join(',');
// Validate against the actual engine and match every intermediate board, including undo.
export function continuation(level,source,extra=[]){
 for(const route of [source.solution,...extra]){if(!route?.length)continue;const board=new level.constructor(source);for(let step=0;step<=route.length;step++){if(boardKey(board)===boardKey(level))return route.slice(step);if(step<route.length){const id=route[step]-1;ChainReactionSystem.apply(board.pillars,Math.floor(id/board.cols),id%board.cols,board.maxHeight);}}}
 return null;
}
