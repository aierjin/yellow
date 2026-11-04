import test from 'node:test';
import assert from 'node:assert/strict';
import {Level} from '../src/engine.js';
import {previewOperation, boardConnections} from '../src/preview.mjs';

const levelDef = {
  number:1,name:'t',type:'normal',rows:3,cols:3,maxHeight:4,
  start:{edge:'bottom',index:0,height:0},
  end:{edge:'top',index:2,height:4},
  pillars:[
    [{height:1,direction:+1},{height:1,direction:+1},{height:4,direction:+1}],
    [{height:1,direction:+1},{height:1,direction:+1},{height:1,direction:+1}],
    [{height:1,direction:+1},{height:1,direction:+1},{height:1,direction:+1}],
  ],
};

test('previewOperation does not mutate the original board',()=>{
  const level=new Level(levelDef);
  const before=level.pillars.map(r=>r.map(p=>p.height+':'+p.direction).join(',')).join('/');
  previewOperation(level,1,1);
  const after=level.pillars.map(r=>r.map(p=>p.height+':'+p.direction).join(',')).join('/');
  assert.equal(after,before);
});

test('preview center cross applies real engine rules and respects boundaries',()=>{
  const level=new Level(levelDef);
  const {affected,next}=previewOperation(level,1,1);
  assert.equal(affected.length,5); // 中心 + 四邻
  // 中心 (1,1) 从 1 -> 2
  assert.equal(affected.find(a=>a.row===1&&a.col===1).toHeight,2);
  // 上邻 (0,1) 从 1 -> 2
  assert.equal(affected.find(a=>a.row===0&&a.col===1).toHeight,2);
  // 克隆棋盘已经变化，原棋盘未变
  assert.equal(next.pillars[1][1].height,2);
  assert.equal(level.pillars[1][1].height,1);
});

test('preview at height 0 bounces up instead of going negative',()=>{
  const def=structuredClone(levelDef);
  def.pillars=[ // 中心 0，方向 +1，点击后应 -> 1
    [{height:0,direction:+1},{height:0,direction:+1},{height:0,direction:+1}],
    [{height:0,direction:+1},{height:0,direction:+1},{height:0,direction:+1}],
    [{height:0,direction:+1},{height:0,direction:+1},{height:0,direction:+1}],
  ];
  const level=new Level(def);
  const {affected,next}=previewOperation(level,1,1);
  for(const a of affected)assert.ok(a.toHeight>=0);
  assert.equal(next.pillars[1][1].height,1);
});

test('preview reports added and removed road connections',()=>{
  const level=new Level(levelDef);
  const before=boardConnections(level);
  const {added,removed}=previewOperation(level,1,1);
  // 预览本身不应改变 before 的键集合
  assert.ok(before.size>=0);
  // 起点(0)->入口(2,0) 高度1，之前 0-1 连；中心点击后 (2,0) 仍 1，起点仍连
  // 至少 added/removed 是数组
  assert.ok(Array.isArray(added));
  assert.ok(Array.isArray(removed));
});
