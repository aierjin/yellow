import { Level, PathfindingSystem, ChainReactionSystem } from '../src/engine.js';
import { solve, initiallySolvable, verifySolution } from '../src/solver.mjs';
import { LEVEL_A, LEVEL_B } from '../src/demo-levels.mjs';

function fourWay(level, s){
  const h0=level.pillars[s.row][s.col].height;let k=0;
  for(const [dr,dc] of [[-1,0],[1,0],[0,-1],[0,1]]){const r=s.row+dr,c=s.col+dc;if(r<0||r>=level.rows||c<0||c>=level.cols)continue;if(Math.abs(level.pillars[r][c].height-h0)<=1)k++;}
  return k;
}

for (const [nm, def] of [['关卡A 中间切入', LEVEL_A], ['关卡B 四方向起点', LEVEL_B]]) {
  const level = new Level(def);
  console.log(`\n========== ${nm}：${def.name} (${def.rows}x${def.cols}) ==========`);
  console.log('起点:', JSON.stringify(def.start), ' 终点:', JSON.stringify(def.end));
  console.log('高度矩阵(fixed[]):');
  for (const r of def.pillars) console.log('  ' + r.map(p => (p.fixed ? '[' + p.height + ']' : ' ' + p.height + ' ')).join(''));
  console.log('初态是否已通:', initiallySolvable(level), '(应 false)');
  if (def.start.pillar) console.log('起点四邻可达:', fourWay(level, def.start.pillar), '/4');
  console.log('声明 minMoves:', def.minMoves, ' solution:', JSON.stringify(def.solution));
  console.log('solution 重放验证:', verifySolution(level, def.solution));
  // 用 solver 独立求最短（深度 = minMoves+1 验证是否更短）
  const res = solve(level, { maxDepth: def.minMoves, maxStates: 2000000 });
  console.log(`solver(≤${def.minMoves}步): solvable=${res.solvable} minClicks=${res.minClicks} exhausted=${res.exhausted}`);
  if (res.solution && res.solution.length) {
    console.log('solver 找到的解:', JSON.stringify(res.solution), '(长度', res.solution.length, ')');
    const c = level.clone();
    for (const id of res.solution) { const r = Math.floor((id-1)/def.cols), cc=(id-1)%def.cols; ChainReactionSystem.apply(c.pillars, r, cc, def.maxHeight); }
    const p = PathfindingSystem.findPath(c);
    if (p) console.log('通关路径(' + p.length + '节点,覆盖' + p.filter(n=>n.type==='pillar').length + '柱):', p.map(n=>n.type==='pillar'?`(${n.row},${n.col})h${n.height}`:`${n.type}@h${n.height}`).join('→'));
  }
}
