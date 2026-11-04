export const CELL = 1.5;
export const HEIGHT = 0.72;
export const WIDTH = 1.18;

export function worldPoint(level, node) {
  const ox = (level.cols - 1) * CELL / 2;
  const oz = (level.rows - 1) * CELL / 2;
  let x, z;
  if (node.type === 'pillar') {
    x = node.col * CELL - ox;
    z = node.row * CELL - oz;
  } else {
    const def = node.type === 'start' ? level.start : level.end;
    if (def.pillar) {
      x = def.pillar.col * CELL - ox; z = def.pillar.row * CELL - oz;
    } else if (def.edge === 'bottom' || def.edge === 'top') {
      x = def.index * CELL - ox;
      z = def.edge === 'bottom' ? oz + CELL : -oz - CELL;
    } else {
      x = def.edge === 'left' ? -ox - CELL : ox + CELL;
      z = def.index * CELL - oz;
    }
  }
  return { x, y: node.height * HEIGHT, z };
}

export function planRoute(level, path) {
  if (!path) return [];
  return path.slice(1).map((node, i) => {
    const from = worldPoint(level, path[i]);
    const to = worldPoint(level, node);
    if (Math.abs(node.height - path[i].height) > 1) throw new Error('Route exceeds one height step');
    const horizontal = Math.abs(from.x - to.x) + Math.abs(from.z - to.z);
    if (Math.abs(horizontal - CELL) > 0.001) throw new Error('Route is not orthogonally adjacent');
    return { from, to, low: from.y <= to.y ? from : to, high: from.y <= to.y ? to : from,
      kind: node.height === path[i].height ? 'bridge' : 'stairs' };
  });
}
