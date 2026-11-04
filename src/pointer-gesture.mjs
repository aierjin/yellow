export const DRAG_THRESHOLD_PX = 10;

export function createGesture(pointerId, x, y, candidate = -1, threshold = DRAG_THRESHOLD_PX) {
  return { pointerId, startX: x, startY: y, lastX: x, lastY: y, candidate, threshold, dragged: false, cancelled: false };
}

export function moveGesture(gesture, x, y) {
  if (!gesture) return null;
  gesture.lastX = x;
  gesture.lastY = y;
  if (!gesture.dragged && Math.hypot(x - gesture.startX, y - gesture.startY) > gesture.threshold) {
    gesture.dragged = true;
    gesture.candidate = -1;
  }
  return gesture;
}

export function cancelGesture(gesture) {
  if (!gesture) return null;
  gesture.cancelled = true;
  gesture.candidate = -1;
  return gesture;
}

export function releaseGesture(gesture, { inside = true } = {}) {
  if (!gesture) return { click: -1, dragged: false };
  const click = !gesture.dragged && !gesture.cancelled && inside ? gesture.candidate : -1;
  return { click, dragged: gesture.dragged };
}
