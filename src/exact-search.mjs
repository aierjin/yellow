// Operations commute: each affected cell advances one step along its own reflected cycle.
// Enumerating nondecreasing click multisets is exhaustive for final board reachability.
export function searchLevel(d,limit,{omitColumn=-1,pathOmitColumn=omitColumn,allowedClicks=null,pathOmitCells=[]}={}){
 const rows=d.rows,n=d.cols,N=rows*n,M=d.maxHeight,period=2*M;
 const adj=Array.from({length:N},(_,i)=>[i-n,i+n,i%n?i-1:-1,i%n<n-1?i+1:-1].filter(j=>j>=0&&j<N));
 const edge=e=>e.platform?e.platform.row*n+e.platform.col:e.pillar?e.pillar.row*n+e.pillar.col:e.edge==='bottom'?(rows-1)*n+e.index:e.edge==='top'?e.index:e.edge==='left'?e.index*n:e.index*n+n-1;
 const entry=edge(d.start),exit=edge(d.end),hs=x=>x<=M?x:period-x;
 if(entry%n===pathOmitColumn||exit%n===pathOmitColumn)return {solution:null,minMoves:null,complete:true};
 const data=d.pillars.flat(),fixed=data.map(p=>Boolean(p.fixed)),holes=data.map(p=>Boolean(p.blocked)),blocked=new Set([...pathOmitCells,...data.flatMap((p,i)=>p.blocked?[i]:[])]);
 if(blocked.has(entry)||blocked.has(exit))return {solution:null,minMoves:null,complete:true};
 const a=d.pillars.flat().map(p=>p.direction>0?p.height:(period-p.height)%period);
 const visited = new Uint8Array(N);
 const path=()=>{if(Math.abs(hs(a[entry])-d.start.height)>1||(!d.end.pillar&&Math.abs(hs(a[exit])-d.end.height)>1))return false;const q=[entry];visited.fill(0);visited[entry]=1;for(let h=0;h<q.length;h++){const i=q[h];if(i===exit)return true;for(const j of adj[i])if(!blocked.has(j)&&j%n!==pathOmitColumn&&!visited[j]&&Math.abs(hs(a[i])-hs(a[j]))<=1){visited[j]=1;q.push(j);}}return false;};
 const actions=Array.from({length:N},(_,i)=>i).filter(i=>!holes[i]&&!fixed[i]&&i%n!==omitColumn&&(!allowedClicks||allowedClicks.includes(i+1))),seq=[];let checked=0;
 const operations=Array.from({length:N},(_,i)=>{
  const base=[i,...adj[i]].filter(j=>!fixed[j]&&!holes[j]);
  const groups=new Set(base.map(j=>data[j].sync).filter(Boolean));
  return [...new Set([...base,...data.flatMap((p,j)=>!fixed[j]&&!holes[j]&&p.sync&&groups.has(p.sync)?[j]:[])])];
 });
 const touchesBoth = operations.some(cells => cells.includes(entry) && cells.includes(exit));
 function endpointDistance(index, height) {
   if (Math.abs(hs(a[index]) - height) <= 1) return 0;
   if (fixed[index]) return Infinity;
   for (let steps = 1; steps < period; steps++) {
     if (Math.abs(hs((a[index] + steps) % period) - height) <= 1) return steps;
   }
   return Infinity;
 }
 function dfs(left,start){
   const startDistance = endpointDistance(entry, d.start.height);
   const endDistance = d.end.pillar ? 0 : endpointDistance(exit, d.end.height);
   const lowerBound = touchesBoth ? Math.max(startDistance, endDistance) : startDistance + endDistance;
   if (lowerBound > left) return false;
   if(left===0){checked++;return path();}for(let k=start;k<actions.length;k++){const i=actions[k],cells=operations[i];for(const j of cells)a[j]=(a[j]+1)%period;seq.push(i+1);const ok=dfs(left-1,k);for(const j of cells)a[j]=(a[j]+period-1)%period;if(ok)return true;seq.pop();}return false;}
 for(let depth=0;depth<=limit;depth++)if(dfs(depth,0))return {minMoves:depth,solution:[...seq],complete:true,checked};return {solution:null,minMoves:null,complete:true,checked};
}
