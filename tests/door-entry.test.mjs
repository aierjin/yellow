import test from 'node:test';
import assert from 'node:assert/strict';
import {doorEntry} from '../src/door-entry.mjs';
test('entry stays centered, clears threshold and fades before the back panel',()=>{
 const end={x:1.5,y:2.88,z:-3};
 for(let i=0;i<=100;i++){
  const p=doorEntry(end,.32,i/100);
  assert.equal(p.x,end.x);assert.ok(p.y>=end.y+.11);
  assert.ok(p.z>end.z-.34);assert.ok(p.opacity>=0&&p.opacity<=1);
 }
 assert.equal(doorEntry(end,.32,1).opacity,0);
 assert.equal(doorEntry(end,0,0).z,end.z);
});
