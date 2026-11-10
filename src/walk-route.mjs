import { planRoute, CELL, WIDTH } from './route.mjs';

export function walkingFootY(sample){
  return sample.y+(sample.done?.015:sample.kind==='bridge'?.085:.04);
}

function stairHeight(segment,t){
  if(segment.kind!=='stairs')return segment.from.y;
  const u=segment.from.y<segment.to.y?t:1-t;
  const position=u*CELL,start=.12,end=CELL-WIDTH/2+.015,steps=7;
  const tread=(end-start)/steps;
  let climbed=0;
  for(let i=0;i<steps;i++){
    const edge=start+i*tread;
    const lift=Math.max(0,Math.min(1,(position-(edge-.065))/.065));
    climbed+=lift*lift*(3-2*lift);
  }
  return segment.low.y+(segment.high.y-segment.low.y)*climbed/steps;
}

export function createWalkTimeline(level, path, speed = 1.9656) {
  if (!(speed > 0)) throw new Error('Walking speed must be positive');
  let distance = 0;
  const segments = planRoute(level, path).map((segment, index) => {
    const dx = segment.to.x - segment.from.x;
    const dy = segment.to.y - segment.from.y;
    const dz = segment.to.z - segment.from.z;
    const length = Math.hypot(dx, dy, dz);
    const result = { ...segment, index, start: distance, length, heading: Math.atan2(-dx, -dz) };
    distance += length;
    return result;
  });
  return { segments, totalDistance: distance, totalDuration: distance / speed, speed };
}

export function sampleWalk(timeline, distance) {
  const d = Math.max(0, Math.min(timeline.totalDistance, distance));
  const segment = timeline.segments.find(item => d < item.start + item.length) || timeline.segments.at(-1);
  if (!segment) return null;
  if (d >= timeline.totalDistance) {
    return { x: segment.to.x, y: segment.to.y, z: segment.to.z, heading: segment.heading,
      kind: segment.kind, index: segment.index, done: true };
  }
  const t = segment.length ? Math.max(0, Math.min(1, (d - segment.start) / segment.length)) : 1;
  return {
    x: segment.from.x + (segment.to.x - segment.from.x) * t,
    y: stairHeight(segment,t),
    z: segment.from.z + (segment.to.z - segment.from.z) * t,
    heading: segment.heading,
    kind: segment.kind,
    index: segment.index,
    done: d >= timeline.totalDistance
  };
}
