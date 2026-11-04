import test from 'node:test';
import assert from 'node:assert/strict';
import {spriteFrame, BASE_YAW} from '../src/sprite-state.mjs';

test('front idle and backward walking select distinct authored directions',()=>{
  assert.equal(spriteFrame(Math.PI,BASE_YAW,0,false).direction,0);
  assert.equal(spriteFrame(0,BASE_YAW,0,true).direction,4);
  assert.equal(spriteFrame(-Math.PI/2,BASE_YAW,0,true).direction,2);
});
test('sprite changes viewpoint when camera rotates, without loading a 3D model',()=>{
  assert.equal(spriteFrame(Math.PI,BASE_YAW+Math.PI/2,0,false).direction,6);
  assert.equal(spriteFrame(Math.PI,BASE_YAW+Math.PI*2,0,false).direction,0);
});
test('animation loops within sheet bounds and idle stays still',()=>{
  for(let t=0;t<10;t+=.047){const f=spriteFrame(0,BASE_YAW,t,true);assert.ok(f.frame>=0&&f.frame<12);}
  assert.equal(spriteFrame(0,BASE_YAW,.55,true).frame,6);
  assert.equal(spriteFrame(0,BASE_YAW,4.4,false).frame,0);
});
