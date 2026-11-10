import { ChainReactionSystem, PathfindingSystem, allowsBridgeExit, edgeAxis } from './engine.js';

const pillarNode = (row, col, height) => ({ type: 'pillar', row, col, height });
const nodeKey = node => node.type === 'pillar' ? `p:${node.row}:${node.col}` : node.type;
const edgeKey = (a, b) => [nodeKey(a), nodeKey(b)].sort().join('|');

export function boardConnections(level) {
  const connections = new Map();
  const add = (a, b) => {
    if (Math.abs(a.height - b.height) <= 1) connections.set(edgeKey(a, b), { a, b });
  };
  for (let row = 0; row < level.rows; row++) {
    for (let col = 0; col < level.cols; col++) {
      const p = level.pillars[row][col];
      if(p.blocked)continue;
      const a = pillarNode(row, col, p.height);
      const below = level.pillars[row + 1]?.[col];
      if (below && !below.blocked && allowsBridgeExit(p, 'col') && allowsBridgeExit(below, 'col')) add(a, pillarNode(row + 1, col, below.height));
      const right = level.pillars[row][col + 1];
      if (right && !right.blocked && allowsBridgeExit(p, 'row') && allowsBridgeExit(right, 'row')) add(a, pillarNode(row, col + 1, right.height));
    }
  }
  const entry = PathfindingSystem._edgePillar(level, level.start);
  const exit = PathfindingSystem._edgePillar(level, level.end);
  if (entry && !entry.blocked && (level.start.pillar || allowsBridgeExit(entry, edgeAxis(level.start.edge)))) add({ type: 'start', height: level.start.height }, pillarNode(entry.row, entry.col, entry.height));
  if (exit && !exit.blocked && !level.end.pillar && allowsBridgeExit(exit, edgeAxis(level.end.edge))) add(pillarNode(exit.row, exit.col, exit.height), { type: 'end', height: level.end.height });
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
