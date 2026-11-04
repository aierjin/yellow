// Keep actors centered in the enlarged portal; disappear before its solid back.
export function doorEntry(end,startOffset,t){
 const u=Math.max(0,Math.min(1,t));
 return {x:end.x,y:end.y+.11,z:end.z+startOffset+(-.18-startOffset)*u,
 opacity:1-Math.max(0,Math.min(1,(u-.2)/.8))};
}
