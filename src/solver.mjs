/**
 * 可复用 BFS 最短点击求解器。
 * - 行优先编号 1..rows*cols（任务书规定）。
 * - 状态 = 高度 + 方向（含端点方向），去重含方向。
 * - 枚举所有合法空间路径（通过 PathfindingSystem.hasPath 判定），不限预设路线。
 * - 区分「已穷尽」与「搜索上限未完成」，不因超时而谎称无解。
 * - 输出机器可读结果，供 levels-verification.json 与测试复用。
 */
import { Level, GameState, ChainReactionSystem, PathfindingSystem } from './engine.js';

/** 序列化棋盘（高度 + 方向），去重含方向 */
function keyOf(pillars) {
  return pillars.map(r => r.map(p => p.height + ',' + p.direction).join('|')).join('/');
}

/** 深拷贝柱子数组为纯对象 */
function clonePillars(pillars) {
  return pillars.map(r => r.map(p => ({ height: p.height, direction: p.direction, fixed: p.fixed, blocked: p.blocked, sync: p.sync })));
}

/** 从纯对象数组构造 Level（供 hasPath 判定） */
function mkLevel(level, pil) {
  return new Level({
    rows: level.rows, cols: level.cols, type: level.type,
    maxClicks: level.maxClicks, maxHeight: level.maxHeight,
    number: level.number, name: level.name,
    start: { ...level.start }, end: { ...level.end },
    pillars: pil
  });
}

/**
 * 求解某关最短通关点击序列。
 * @param {Level} level 初始关卡（会被视作只读，内部拷贝）
 * @param {object} [opts]
 * @param {number} [opts.maxDepth=Infinity] 搜索深度上限（点击次数）
 * @param {number} [opts.maxStates=2000000] 访问状态数安全上限
 * @param {number} [opts.mode='min'] 'min' 求最短；'first' 找到任意解即返回
 * @returns {{
 *   solvable: boolean,
 *   minClicks: number|null,
 *   solution: number[]|null,      // 行优先编号 1..rows*cols
 *   statesChecked: number,
 *   exhausted: boolean,           // true=已穷尽；false=达到上限未完成
 * }}
 */
export function solve(level, opts = {}) {
  const maxDepth = opts.maxDepth ?? Infinity;
  const maxStates = opts.maxStates ?? 2000000;
  const mode = opts.mode || 'min';

  const rows = level.rows, cols = level.cols;
  const allowed=opts.allowedClicks?new Set(opts.allowedClicks):null;

  // 初始即通：minClicks = 0
  if (PathfindingSystem.hasPath(level)) {
    return { solvable: true, minClicks: 0, solution: [], statesChecked: 0, exhausted: true };
  }

  const startPil = clonePillars(level.pillars);
  const startKey = keyOf(startPil);
  const queue = [{ pillars: startPil, seq: [] }];
  const visited = new Set([startKey]);
  let statesChecked = 0;

  // BFS 按层扩展，保证最短
  let head=0, truncated=false;
  while (head<queue.length) {
    const cur = queue[head]; queue[head++]=null;
    statesChecked++;
    if (statesChecked > maxStates) {
      return { solvable: false, minClicks: null, solution: null, statesChecked, exhausted: false, limitReason:"states" };
    }
    if (cur.seq.length >= maxDepth) { truncated=true; continue; }
    

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if(cur.pillars[r][c].fixed || cur.pillars[r][c].blocked || (allowed&&!allowed.has(r*cols+c+1)))continue;
        const np = clonePillars(cur.pillars);
        ChainReactionSystem.apply(np, r, c, level.maxHeight);
        const nk = keyOf(np);
        if (visited.has(nk)) continue;
        visited.add(nk);
        const nseq = cur.seq.concat([r * cols + c + 1]);
        if (PathfindingSystem.hasPath(mkLevel(level, np))) {
          return {
            solvable: true,
            minClicks: nseq.length,
            solution: nseq,
            statesChecked,
            exhausted: true
          };
        }
        queue.push({ pillars: np, seq: nseq });
      }
    }
  }

  // 队列清空仍未找到：已穷尽
  return { solvable: false, minClicks: null, solution: null, statesChecked, exhausted: !truncated, limitReason:truncated?"depth":null };
}

/**
 * 验证一条点击序列能否通关（重放）。
 * @returns {boolean} 该序列执行后是否存在合法路径
 */
export function verifySolution(level, solution) {
  const game = new GameState(level.clone());
  for (const id of solution) {
    const r = Math.floor((id - 1) / level.cols);
    const c = (id - 1) % level.cols;
    game.click(r, c);
    if (game.status === 'lost') return false;
  }
  return game.confirm();
}

/**
 * 判断初始局面是否已可通关（用于验证「初态不通」）。
 */
export function initiallySolvable(level) {
  return PathfindingSystem.hasPath(level);
}

export { keyOf, clonePillars };
