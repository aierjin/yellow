import test from 'node:test';
import assert from 'node:assert/strict';
import {createPursuit, advancePursuit, facingHeading} from '../src/pursuit.mjs';
test('target waits until halfway, leaves once, then player enters before next level',()=>{
 const s=createPursuit();advancePursuit(s,.1,.49,false);assert.equal(s.target,'waiting');
 advancePursuit(s,.1,.5,false);assert.equal(s.target,'leaving');
 advancePursuit(s,2,.8,false);assert.equal(s.target,'gone');assert.equal(s.next,false);
 advancePursuit(s,.1,1,true);assert.equal(s.player,'entering');
 advancePursuit(s,2,1,true);assert.equal(s.player,'gone');
 advancePursuit(s,1,1,true);assert.equal(s.next,true);
});
test('reset state is fresh and two actors face each other',()=>{
 const a={x:-1,z:3},b={x:1,z:-3};
 const diff=facingHeading(a,b)-facingHeading(b,a);
 assert.ok(Math.abs(Math.abs(diff)-Math.PI)<1e-8);
 const s=createPursuit();advancePursuit(s,10,1,true);
 assert.equal(createPursuit().target,'waiting');
});
