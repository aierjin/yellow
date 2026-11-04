import test from 'node:test';
import assert from 'node:assert/strict';
import {spriteDirection, BASE_YAW, DIRECTION_HYSTERESIS} from '../src/sprite-state.mjs';

test('direction stays stable inside the hysteresis band near a boundary',()=>{
  // 边界角：让角度正好落在方向 0 与 1 之间偏一点，回正时应停在 0。
  let prev=null;
  prev=spriteDirection(Math.PI,BASE_YAW,prev);
  assert.equal(prev,0);
  // 轻微扰动（小于滞回带），不应跳变
  const jitter=BASE_YAW+DIRECTION_HYSTERESIS*0.5;
  assert.equal(spriteDirection(Math.PI,jitter,prev),0);
});

test('large camera rotation does change direction (not stuck)',()=>{
  const prev=spriteDirection(Math.PI,BASE_YAW,null);
  assert.equal(spriteDirection(Math.PI,BASE_YAW+Math.PI/2,prev),6);
});

test('hysteresis never traps a full 45-degree step change',()=>{
  let prev=spriteDirection(0,BASE_YAW,null);
  prev=spriteDirection(0,BASE_YAW+Math.PI/4,prev);
  assert.notEqual(prev,spriteDirection(0,BASE_YAW,null));
});
