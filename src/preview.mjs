import { ChainReactionSystem, PathfindingSystem } from './engine.js';

const pillarNode = (row, col, height) => ({ type: 'pillar', row, col, height });
const nodeKey = node => node.type === 'pillar' ? `p:${node.row}:${node.col}` : node.type;
const edgeKey = (a, b) => [nodeKey(a), nodeKey(b)].sort().join('|');

export function boardConnections(level) {
  const connections = new Map();
  const add = (a, b) => {
    if (Math.abs(a.height - b.height) <= 1) connections.set(edgeKey(a, b), { a, b });
  };
  const nodeAt = (row, col, height) => {
    for (const type of ['start', 'end']) {
      const cell = level[type].platform;
      if (cell?.row === row && cell.col === col) return { type, height };
    }
    return pillarNode(row, col, height);
  };
  for (let row = 0; row < level.rows; row++) {
    for (let col = 0; col < level.cols; col++) {
      const p = level.pillars[row][col];
      if(p.blocked)continue;
      const a = nodeAt(row, col, p.height);
      if (row + 1 < level.rows && !level.pillars[row+1][col].blocked) add(a, nodeAt(row + 1, col, level.pillars[row + 1][col].height));
      if (col + 1 < level.cols && !level.pillars[row][col+1].blocked) add(a, nodeAt(row, col + 1, level.pillars[row][col + 1].height));
    }
  }
  const entry = PathfindingSystem._edgePillar(level, level.start);
  const exit = PathfindingSystem._edgePillar(level, level.end);
  if (entry && !level.start.platform) add({ type: 'start', height: level.start.height }, pillarNode(entry.row, entry.col, entry.height));
  if (exit && !level.end.pillar && !level.end.platform) add(pillarNode(exit.row, exit.col, exit.height), { type: 'end', height: level.end.height });
  return connections;
}

export function previewOperation(level, row, col) {
  const before = boardConnections(level);
  const next = level.clone();
  const affected = ChainReactionSystem.apply(next.pillars, row, col, next.maxHeight);
  const after = boardConnections(next);
  const added = [...after.entries()].filter(([key]) => !before.has(key)).map(([, edge]) => edge);
  const removed = [...before.entries()].filter(([key]) => !after.has(key)).map(([, edge]) => edge);
  return { affected, added, removed, next };
}
