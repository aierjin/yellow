/**
 * 引擎核心 —— 逻辑状态层（与 3D 表现完全分离）
 * 模块：GameState / PillarSystem / ChainReactionSystem / PathfindingSystem / LevelManager
 */

/* ===================== 常量 ===================== */
const MAX_HEIGHT = 4;      // 方柱高度上限（4 个方块）
const MIN_HEIGHT = 0;      // 方柱高度下限（0 = 缩回地面，无方块）

// A bridge turns 90° on every one-level movement, including a bounce.
export function bridgeAxis(pillar, height = pillar.height) {
  if (!pillar.bridge || height % 2 === 0) return pillar.bridge;
  return pillar.bridge === 'row' ? 'col' : 'row';
}

export function allowsBridgeExit(pillar, axis, height = pillar.height) {
  return !pillar.bridge || bridgeAxis(pillar, height) === axis;
}

export function edgeAxis(edge) {
  return edge === 'left' || edge === 'right' ? 'row' : 'col';
}

/* ===================== 数据结构：单根方柱 ===================== */
class Pillar {
  constructor(row, col, height, direction, fixed = false, blocked = false, sync = null, bridge = null) {
    this.fixed = Boolean(fixed);
    this.blocked = Boolean(blocked);this.sync = sync;
    this.bridge = bridge;
    this.row = row;
    this.col = col;
    this.height = height;          // 当前高度 0..4
    this.direction = direction;    // +1 向上 / -1 向下（下一次被直接激活时的运动方向）
  }
  clone() {
    return new Pillar(this.row, this.col, this.height, this.direction, this.fixed, this.blocked, this.sync, this.bridge);
  }
}

/* ===================== 关卡数据结构 ===================== */
class Level {
  constructor(def) {
    this.rows = def.rows;
    this.cols = def.cols;
    this.type = def.type || 'normal';       // normal | challenge
    this.maxClicks = def.maxClicks || null; // 限步关的点击上限
    this.maxHeight = def.maxHeight ?? MAX_HEIGHT; // 每关最高高度（默认 4，保持第一关）
    this.number = def.number;
    this.name = def.name || ('第 ' + def.number + ' 关');
    // 起点 / 终点（棋盘外，由棋盘边缘位置定义）
    this.start = def.start;   // { edge, index, height }
    this.end = def.end;       // { edge, index, height }
    // 初始方柱
    this.pillars = [];
    for (let r = 0; r < this.rows; r++) {
      const rowArr = [];
      for (let c = 0; c < this.cols; c++) {
        const p = def.pillars[r][c];
        rowArr.push(new Pillar(r, c, p.height, p.direction, p.fixed, p.blocked, p.sync, p.bridge));
      }
      this.pillars.push(rowArr);
    }
  }
  clone() {
    const def = {
      rows: this.rows, cols: this.cols, type: this.type,
      maxClicks: this.maxClicks, maxHeight: this.maxHeight,
      number: this.number, name: this.name,
      start: { ...this.start }, end: { ...this.end },
      pillars: this.pillars
    };
    return new Level(def);
  }
}

/* ===================== 连锁反应系统 ===================== */
/**
 * 规则（严格确定，无随机）：
 *  - 点击一根方柱，它与其上下左右相邻方柱同时各移动一级。
 *  - 被点击方柱沿自身 direction 移动。
 *  - 相邻方柱本次运动方向 = 其当前 direction（各自本来下一步该去的方向）。
 *  - 若本次运动会越过 0 或 4，先反向（反弹）再移动一级。
 *  - 移动结束后：若到达 0 或 4，下一次 direction 指向高度范围内部。
 *  - 同一次点击只执行一轮十字联动，不递归。
 */
const ChainReactionSystem = {
  /**
   * 计算一次点击后的完整下一状态。
   * @param {Array<Array<Pillar>>} pillars 二维方柱数组（会被原地更新）
   * @param {number} row 被点击方柱行
   * @param {number} col 被点击方柱列
   * @param {number} [maxHeight=MAX_HEIGHT] 本关最高高度（反弹上界）
   * @returns {Array} 受影响方柱列表 [{row, col, fromHeight, toHeight}]
   */
  apply(pillars, row, col, maxHeight = MAX_HEIGHT) {
    const rows = pillars.length;
    const cols = pillars[0].length;
    const targets = [];

    // 收集十字形范围内所有方柱，并确定各自的本次运动方向
    const moves = []; // {row, col, stepDir}
    const center = pillars[row][col];
    if (center.fixed || center.blocked) return [];
    moves.push({ row, col, stepDir: center.direction });

    const neighbors = [
      [row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]
    ];
    for (const [r, c] of neighbors) {
      if (r < 0 || r >= rows || c < 0 || c >= cols) continue;
      const p = pillars[r][c];
      if (p.fixed || p.blocked) continue;
      // 相邻方柱按自身本来下一步该去的方向移动
      moves.push({ row: r, col: c, stepDir: p.direction });
    }

    // A link forwards activation only to its partner, never to the remote cross.
    const groups=new Set(moves.map(m=>pillars[m.row][m.col].sync).filter(Boolean));
    const included=new Set(moves.map(m=>m.row*cols+m.col));
    for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
      const p=pillars[r][c];if(p.fixed||p.blocked||!p.sync||!groups.has(p.sync)||included.has(r*cols+c))continue;
      included.add(r*cols+c);moves.push({row:r,col:c,stepDir:p.direction});
    }
    // 统一计算本次移动（同一操作同时更新，先算后写，避免相互污染）
    const computed = [];
    for (const m of moves) {
      const p = pillars[m.row][m.col];
      let step = m.stepDir;
      const nextRaw = p.height + step;
      // 越界反弹：若越过 0 或 maxHeight，先反向再移动一级
      if (nextRaw < MIN_HEIGHT) {
        step = +1; // 反弹为向上
      } else if (nextRaw > maxHeight) {
        step = -1; // 反弹为向下
      }
      let newHeight = p.height + step;
      // 兜底 clamp（理论上不会触发）
      newHeight = Math.max(MIN_HEIGHT, Math.min(maxHeight, newHeight));
      computed.push({ row: m.row, col: m.col, newHeight, actualStep: step });
    }

    // 写入新状态
    const affected = [];
    for (const c of computed) {
      const p = pillars[c.row][c.col];
      const from = p.height;
      p.height = c.newHeight;
      // 更新 direction：到达边界则指向内部
      if (c.newHeight === maxHeight) p.direction = -1;
      else if (c.newHeight === MIN_HEIGHT) p.direction = +1;
      else p.direction = c.actualStep;
      affected.push({ row: c.row, col: c.col, fromHeight: from, toHeight: c.newHeight });
    }
    return affected;
  }
};

/* ===================== 寻路系统 ===================== */
/**
 * 从起点平台出发，经入口方柱，在方柱间正交移动，到出口方柱，再到终点平台。
 * 通行条件：abs(hA - hB) <= 1。
 * 起点 → 入口、出口 → 终点同样受高度差限制。
 */
const PathfindingSystem = {
  /**
   * 找到一条合法路径（BFS，最短路）。
   * @param {Level} level
   * @returns {Array|null} 路径节点列表 [{type:'start'|'pillar'|'end', row?, col?, height}] 或 null
   */
  findPath(level) {
    const rows = level.rows, cols = level.cols;
    const start = level.start, end = level.end;

    // 起点平台 → 入口方柱（棋盘边缘）
    const entry = this._edgePillar(level, start);
    const exit = this._edgePillar(level, end);
    if (!entry || !exit || entry.blocked || exit.blocked) return null;

    // 起点到入口的高度差检查
    if (Math.abs(start.height - entry.height) > 1) return null;
    if (!start.pillar && !allowsBridgeExit(entry, edgeAxis(start.edge))) return null;
    if (!end.pillar && !allowsBridgeExit(exit, edgeAxis(end.edge))) return null;

    // BFS 在方柱网格内搜索（从入口到出口）
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
    const queue = [];
    queue.push([entry.row, entry.col]);
    visited[entry.row][entry.col] = true;

    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let found = false;
    while (queue.length && !found) {
      const [r, c] = queue.shift();
      const h = level.pillars[r][c].height;
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
        if (visited[nr][nc] || level.pillars[nr][nc].blocked) continue;
        const axis = dr ? 'col' : 'row';
        if (!allowsBridgeExit(level.pillars[r][c], axis) || !allowsBridgeExit(level.pillars[nr][nc], axis)) continue;
        if (Math.abs(level.pillars[nr][nc].height - h) > 1) continue;
        visited[nr][nc] = true;
        parent[nr][nc] = [r, c];
        if (nr === exit.row && nc === exit.col) { found = true; break; }
        queue.push([nr, nc]);
      }
    }

    if (!found) {
      // 入口即出口的情况（1x1 边缘等）——处理边界
      if (entry.row === exit.row && entry.col === exit.col) {
        // 直接检查起点→入口→终点
        if (end.pillar || Math.abs(exit.height - end.height) <= 1) {
          return [
            { type: 'start', height: start.height },
            { type: 'pillar', row: entry.row, col: entry.col, height: entry.height },
            ...(end.pillar ? [] : [{ type: 'end', height: end.height }])
          ];
        }
      }
      return null;
    }

    // 出口到终点高度差检查
    if (!end.pillar && Math.abs(exit.height - end.height) > 1) return null;

    // 回溯路径
    const pathPillars = [];
    let cur = [exit.row, exit.col];
    while (cur) {
      pathPillars.unshift({ row: cur[0], col: cur[1], height: level.pillars[cur[0]][cur[1]].height });
      cur = parent[cur[0]][cur[1]];
    }

    // 组装完整路径：起点 → 方柱 → 终点
    const full = [{ type: 'start', height: start.height }];
    for (const p of pathPillars) full.push({ type: 'pillar', row: p.row, col: p.col, height: p.height });
    if (!end.pillar) full.push({ type: 'end', height: end.height });
    return full;
  },

  /** 判断是否存在合法路径 */
  hasPath(level) {
    return this.findPath(level) !== null;
  },

  /** 由 edge 定义找到棋盘上对应的入口/出口方柱 */
  _edgePillar(level, edgeDef) {
    const rows = level.rows, cols = level.cols;
    if (edgeDef.pillar) return level.pillars[edgeDef.pillar.row]?.[edgeDef.pillar.col] ?? null;
    const e = edgeDef.edge;
    const idx = edgeDef.index;
    let r, c;
    if (e === 'left') { r = idx; c = 0; }
    else if (e === 'right') { r = idx; c = cols - 1; }
    else if (e === 'bottom') { r = rows - 1; c = idx; }
    else if (e === 'top') { r = 0; c = idx; }
    else return null;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return null;
    return level.pillars[r][c];
  }
};

/* ===================== 游戏状态 ===================== */
class GameState {
  constructor(level) {
    this.level = level;                 // Level 实例
    this.clickCount = 0;                // 已用点击次数（限步关）
    this.status = 'playing';            // playing | won | lost | walking
    this.history = [];                  // 撤销栈：每项为完整棋盘快照 {heights, directions}
  }

  /** 执行一次点击（逻辑层，不含动画）。返回受影响方柱列表，若不可点击返回 null */
  click(row, col) {
    if (this.status !== 'playing' || (this.level.pillars[row][col].fixed || this.level.pillars[row][col].blocked)) return null;
    if (this.level.type === 'challenge' && this.level.maxClicks != null && this.clickCount >= this.level.maxClicks) return null;
    // 先抓取点击前快照（高度 + 方向），再执行连锁
    const snapshot = this._snapshot();
    this.history.push(snapshot);
    const affected = ChainReactionSystem.apply(this.level.pillars, row, col, this.level.maxHeight);
    this.clickCount++;

    // 限步关：次数用尽且尚未通关则判失败（不在这里判胜，由 confirm() 判胜）
    if (this.level.type === 'challenge' && this.level.maxClicks != null) {
      if (this.clickCount >= this.level.maxClicks && !PathfindingSystem.hasPath(this.level)) {
        this.status = 'lost';
      }
    }
    return affected;
  }

  /** 玩家主动确认：检测当前是否存在合法路径，存在则通关 */
  confirm() {
    if (this.status !== 'playing') return false;
    if (PathfindingSystem.hasPath(this.level)) {
      this.status = 'won';
      return true;
    }
    return false;
  }

  /** 抓取当前棋盘快照（高度 + 方向） */
  _snapshot() {
    const heights = this.level.pillars.map(r => r.map(p => p.height));
    const dirs = this.level.pillars.map(r => r.map(p => p.direction));
    return { heights, dirs };
  }

  /** 撤销一步 */
  undo() {
    if (this.history.length === 0) return false;
    if (this.status !== 'playing' && this.status !== 'lost') return false;
    const snap = this.history.pop();
    for (let r = 0; r < this.level.rows; r++) {
      for (let c = 0; c < this.level.cols; c++) {
        this.level.pillars[r][c].height = snap.heights[r][c];
        this.level.pillars[r][c].direction = snap.dirs[r][c];
      }
    }
    if (this.clickCount > 0) this.clickCount--;
    if (this.status === 'lost') this.status = 'playing';
    return true;
  }

  /** 重置到初始状态 */
  reset() {
    this.clickCount = 0;
    this.status = 'playing';
    this.history = [];
  }

  getPath() {
    return PathfindingSystem.findPath(this.level);
  }
}

/* ===================== 提示系统 ===================== */
/**
 * 给出「下一步该点哪根柱子」的提示。
 * 在当前棋盘状态下，BFS 搜索点击序列（最多搜索 depth 步），返回一步能使
 * 局面「更接近通关」的点击坐标（即最短解序列的第一步）。
 */
const HintSystem = {
  /** 序列化棋盘（高度+方向） */
  _key(pillars) {
    return pillars.map(r => r.map(p => p.height + ',' + p.direction).join('|')).join('/');
  },
  _clone(pillars) {
    return pillars.map(r => r.map(p => ({ height: p.height, direction: p.direction, fixed: p.fixed, blocked: p.blocked, sync: p.sync })));
  },
  /**
   * 返回提示：最短解序列的第一步行列，或 null（无解/已通关）。
   * @param {Level} level
   * @param {number} maxDepth 搜索深度上限（默认 6）
   * @returns {{row:number,col:number}|null}
   */
  suggest(level, maxDepth = 6) {
    if (PathfindingSystem.hasPath(level)) return null; // 已可通关，无需提示
    const start = this._clone(level.pillars);
    const startKey = this._key(start);
    const queue = [{ pillars: start, first: null }];
    const visited = new Set([startKey]);
    // 用 level 的副本做 hasPath 检测
    const mkLevel = (pil) => {
      const def = {
        rows: level.rows, cols: level.cols, type: level.type,
        maxClicks: level.maxClicks, maxHeight: level.maxHeight,
        number: level.number, name: level.name,
        start: { ...level.start }, end: { ...level.end },
        pillars: pil
      };
      return new Level(def);
    };

    while (queue.length) {
      const cur = queue.shift();
      for (let r = 0; r < level.rows; r++) {
        for (let c = 0; c < level.cols; c++) {
          if (cur.pillars[r][c].fixed || cur.pillars[r][c].blocked) continue;
          const np = this._clone(cur.pillars);
          ChainReactionSystem.apply(np, r, c, level.maxHeight);
          const nk = this._key(np);
          if (visited.has(nk)) continue;
          visited.add(nk);
          const first = cur.first || { row: r, col: c };
          if (PathfindingSystem.hasPath(mkLevel(np))) return first;
          queue.push({ pillars: np, first });
          if (visited.size > 200000) return null; // 安全上限
        }
      }
    }
    return null;
  }
};

/* ===================== 导出（兼容 ES module + CommonJS） ===================== */
export { Pillar, Level, GameState, ChainReactionSystem, PathfindingSystem, HintSystem, MAX_HEIGHT, MIN_HEIGHT };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Pillar, Level, GameState, ChainReactionSystem, PathfindingSystem, HintSystem,
    MAX_HEIGHT, MIN_HEIGHT
  };
}
