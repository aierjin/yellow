import test from 'node:test';import assert from 'node:assert/strict';
import {createCameraState,dragOrbit,restoreCamera,toggleTopView} from '../src/camera-state.mjs';
test('orbit snaps at pole and releases with hysteresis',()=>{const s=createCameraState(0);dragOrbit(s,0,-500);assert.equal(s.top,true);dragOrbit(s,20,0);assert.equal(s.top,true);dragOrbit(s,0,8);assert.equal(s.top,true);dragOrbit(s,0,60);assert.equal(s.top,false);assert.ok(s.pitch<Math.PI/2);});
test('yaw unrestricted and reset restores pitch',()=>{const s=createCameraState(0);dragOrbit(s,5000,0);assert.ok(Math.abs(s.yaw)>Math.PI*2);toggleTopView(s);restoreCamera(s,1);assert.equal(s.top,false);assert.equal(s.yaw,1);assert.ok(s.pitch<1);});
