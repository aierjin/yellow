import {updateGuidePointer} from './guide-pointer.mjs';
import {animateEnding,showStarField,flyStars} from './ending-scene.mjs';
import {boardKey,continuation} from './hint-route.mjs';
import {homeViewSample} from './home-view.mjs';
import { nextDirection } from './next-direction.mjs';
import {createGameShell} from './game-shell.mjs';
import * as THREE from 'three';
import { Level, GameState, PathfindingSystem, ChainReactionSystem } from './engine.js';
import { LEVELS } from './levels.js';
import { planRoute, worldPoint, CELL, HEIGHT, WIDTH } from './route.mjs';
import { loadStairCharacter } from './character.mjs';
import { createWalkTimeline, sampleWalk, walkingFootY } from './walk-route.mjs';
import {doorEntry} from './door-entry.mjs';
import { BASE_YAW } from './sprite-state.mjs';
import {loadTarget} from './target-character.mjs';
import {createPursuit,advancePursuit,facingHeading} from './pursuit.mjs';
import { solve } from './solver.mjs';
import { getLighting, interpolateLighting, rgbToCss } from './lighting.mjs';
import { createCameraState, dragCamera, dragOrbit, toggleTopView, restoreCamera } from './camera-state.mjs';
import { createGesture, moveGesture, cancelGesture, releaseGesture } from './pointer-gesture.mjs';
import { previewOperation } from './preview.mjs';

const $ = id => document.getElementById(id);
let shell=null;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-7, 7, 7, -7, .1, 100);
function createRenderer(){
  try{return new THREE.WebGLRenderer({antialias:true,alpha:true});}
  catch(error){$('loading').classList.add('loaded');$('loading').setAttribute('aria-hidden','true');$('error').hidden=false;throw error;}
}
const renderer = createRenderer();
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
$('app').appendChild(renderer.domElement);
const ambient = new THREE.AmbientLight(0xffecd9, 1.8);
scene.add(ambient);
const light = new THREE.DirectionalLight(0xfff7e5, 2.2);
light.position.set(-7, 12, 7);
light.castShadow = true;
light.shadow.mapSize.set(2048,2048);
Object.assign(light.shadow.camera, {left:-8,right:8,top:8,bottom:-8,near:1,far:40});
light.shadow.bias = -.0003;
light.shadow.normalBias = .025;
scene.add(light);
const fill = new THREE.DirectionalLight(0xd7b7d9,.65);
fill.position.set(6,4,-7);
scene.add(fill);

// 场景雾（随关卡变化）
scene.fog = new THREE.Fog(0xeab09e, 12, 60);

/** 应用一组光照配置到场景（数据驱动，与解谜逻辑分离）。非法值防御：任何非有限强度直接忽略，防止 NaN 灭光 */
function applyLighting(cfg) {
  if (!cfg || typeof cfg.ambientLightIntensity !== 'number' || !Number.isFinite(cfg.ambientLightIntensity)) return;
  ambient.color.setHex(cfg.ambientLightColor);
  ambient.intensity = cfg.ambientLightIntensity;
  light.color.setHex(cfg.directionalLightColor);
  if (!Number.isFinite(cfg.directionalLightIntensity)) return;
  light.intensity = cfg.directionalLightIntensity;
  if (Array.isArray(cfg.sunPosition) && cfg.sunPosition.every(Number.isFinite)) {
    light.position.set(cfg.sunPosition[0], cfg.sunPosition[1], cfg.sunPosition[2]);
  }
  light.target.position.set(0, 0, 0);
  light.shadow.intensity = cfg.shadowIntensity;
  if (scene.fog) {
    scene.fog.color.setHex(cfg.fogColor);
    scene.fog.density = cfg.fogDensity;
  }
  // 同步 CSS 背景与天空（非整屏纯色滤镜）
  document.body.classList.toggle('night-scene',levelIndex>=52);
  document.body.style.background = rgbToCss([(cfg.backgroundColor >> 16) & 255, (cfg.backgroundColor >> 8) & 255, cfg.backgroundColor & 255]);
  const sky = document.querySelector('.sky');
  if (sky) {
    sky.style.background = `radial-gradient(ellipse at 48% 35%, ${rgbToCss([(cfg.skyTop >> 16) & 255, (cfg.skyTop >> 8) & 255, cfg.skyTop & 255])} 0%, transparent 58%), linear-gradient(${rgbToCss([(cfg.skyTop >> 16) & 255, (cfg.skyTop >> 8) & 255, cfg.skyTop & 255])}, ${rgbToCss([(cfg.skyBottom >> 16) & 255, (cfg.skyBottom >> 8) & 255, cfg.skyBottom & 255])} 75%, ${rgbToCss([(cfg.backgroundColor >> 16) & 255, (cfg.backgroundColor >> 8) & 255, cfg.backgroundColor & 255])})`;
  }
}

const mat = (color, extra={}) => new THREE.MeshStandardMaterial({color,roughness:1,metalness:0,...extra});
const stone = mat(0xf4dfc3);
const fixedStone = mat(0xbcae99), fixedCap = mat(0xe0d1b6), fixedTrim = mat(0x927f69);
const cap = mat(0xfff1d9);
const rose = mat(0xc98e82);
const recess = mat(0x866c80);
const gold = mat(0xcda271);
const warm = mat(0xe7bd96);
const routeStone = mat(0xffebca);
const dark = mat(0x63516e);
const poolMat = mat(0x91a5a3,{transparent:true,opacity:.8});
let level, game, board, routeGroup, pillars=[], keyButtons=[], startPoint, endPoint, startSentinel;
let characterStatus='loading';
let targetCharacter=null,pursuit=createPursuit(),levelIndex=0;
const cameraState = createCameraState(BASE_YAW);
let minMoves = 1; // 当前关初始局面经求解器验证的最少点击次数
let lightingFrom = 0, lightingTo = 0, lightingT = 1; // 光照过渡状态
let CHAPTER_NAME = '第一章';
let environment;
let character = null, walkTimeline = null, walkDistance = 0, walkHeading = 0, walkingStairs = false;
let phase = 'playing', hoverIndex=-1;
let homeTransition=null;
let hoverPreview = null;      // 桌面悬停预览 {row,col,affected,added,removed,next}
let activeGesture = null;     // 当前按下手势
let boardTween = null, revealStart = 0, lastFrame = 0;
let selectedHint = -1;
let hintUntil = 0;
const ray = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const projection = new THREE.Vector3();

function box(parent,w,h,d,x,y,z,material=stone){
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);
  mesh.position.set(x,y,z); mesh.castShadow=true; mesh.receiveShadow=true; parent.add(mesh); return mesh;
}
function cylinder(parent,r,h,x,y,z,material=cap,segments=32){
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,segments),material);
  mesh.position.set(x,y,z); mesh.castShadow=true; mesh.receiveShadow=true; parent.add(mesh); return mesh;
}
function archShape(width,height){
  const shape=new THREE.Shape(), radius=width/2;
  shape.moveTo(-radius,0);shape.lineTo(radius,0);shape.lineTo(radius,height-radius);
  shape.absarc(0,height-radius,radius,0,Math.PI,false);shape.lineTo(-radius,0);return shape;
}
function archPanel(parent,w,h,x,y,z,material){
  const mesh=new THREE.Mesh(new THREE.ShapeGeometry(archShape(w,h),32),material);
  mesh.position.set(x,y,z); parent.add(mesh);return mesh;
}
function portal(parent,x,y,z,scale=1){
  const group = new THREE.Group();group.position.set(x,y,z);group.scale.setScalar(scale);parent.add(group);
  // A dark inset, stone jambs and a semicircular stone arch.
  archPanel(group,.57,1.02,0,.03,.06,dark);
  box(group,.16,.73,.23,-.38,.365,.02,cap);box(group,.16,.73,.23,.38,.365,.02,cap);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.38,.08,4,40,Math.PI),cap);
  ring.position.set(0,.73,.02);group.add(ring);
  box(group,1.0,.07,.38,0,.015,.02,cap);
  box(group,.64,.035,.35,0,.06,.13,gold);
  const jewel=new THREE.Mesh(new THREE.OctahedronGeometry(.09),gold);
  jewel.position.set(0,1.32,.02);group.add(jewel);
  return group;
}
function pavilion(parent,index){
 const g=new THREE.Group();parent.add(g);
 for(const x of [-.23,.23])for(const z of [-.23,.23])box(g,.065,1.45,.065,x,.725,z,cap);
 const roof=new THREE.Mesh(new THREE.ConeGeometry(.49,.25,4),gold);roof.rotation.y=Math.PI/4;roof.position.y=1.575;roof.castShadow=true;g.add(roof);
 g.traverse(o=>{if(o.isMesh)o.userData.pillar=index;});
 return g;
}
function syncDestination(){
 if(!level?.end.pillar)return;
 const {row,col}=level.end.pillar,p=pillars[row*level.cols+col];
 endPoint={x:p.group.position.x,y:p.displayHeight*HEIGHT,z:p.group.position.z};
 if(['playing','moving','revealing'].includes(phase))placeTarget();
}
function disposeGroup(group){
  if(!group)return;
  group.traverse(o=>{if(o.isMesh)o.geometry.dispose();});
  scene.remove(group);
}
function makeEnvironment(){
  disposeGroup(environment);
  const env=new THREE.Group();environment=env;scene.add(env);
  const irregular=level.pillars.flat().some(p=>p.blocked);
  if(irregular){
    for(let r=0;r<level.rows;r++)for(let c=0;c<level.cols;c++){
      if(level.pillars[r][c].blocked)continue;
      const x=(c-(level.cols-1)/2)*CELL,z=(r-(level.rows-1)/2)*CELL;
      box(env,CELL,.20,CELL,x,-.14,z,cap);box(env,CELL,.55,CELL,x,-.5,z,warm);
      box(env,CELL,.11,CELL,x,-.82,z,rose);box(env,CELL,.9,CELL,x,-1.31,z,rose);
      box(env,CELL,.10,CELL,x,-1.8,z,warm);
      for(const [dr,dc,angle] of [[1,0,0],[-1,0,Math.PI],[0,1,Math.PI/2],[0,-1,-Math.PI/2]]){
        if(level.pillars[r+dr]?.[c+dc]&&!level.pillars[r+dr][c+dc].blocked)continue;
        const a=archPanel(env,.48,.63,x+dc*(CELL/2+.003),-1.72,z+dr*(CELL/2+.003),recess);a.rotation.y=angle;
      }
    }
  }else{
  // Floating limestone terrace and its deep rose foundation.
  box(env,4.85,.20,5.0,0,-.14,0,cap);
  box(env,4.62,.55,4.77,0,-.5,0,warm);
  box(env,4.82,.11,4.96,0,-.82,0,rose);
  box(env,4.52,.9,4.65,0,-1.31,0,rose);
  box(env,4.65,.10,4.79,0,-1.8,0,warm);
  // Recessed arcade across the front and left walls.
  for(let i=0;i<5;i++){
    archPanel(env,.48,.63,-1.75+i*.86,-1.72,2.332,recess);
    const side=archPanel(env,.48,.63, -2.267,-1.72,-1.75+i*.86,recess);side.rotation.y=-Math.PI/2;
  }
  // Small reflecting pools in the aisles, away from the stepping surfaces.
  box(env,.17,.015,4.15,-.75,-.025,0,poolMat);
  box(env,.17,.015,4.15,.75,-.025,0,poolMat);
  box(env,4.15,.015,.17,0,-.025,.75,poolMat);
  box(env,4.15,.015,.17,0,-.025,-.75,poolMat);
  if(level){env.scale.x=Math.max(1,level.cols/3);env.scale.z=Math.max(1,level.rows/3);}
  }
  // Quiet architectural fragments frame the playable island.
  if(levelIndex<10){
  const garden=new THREE.Group();garden.position.set(-3.5,-1.13,-1.35);env.add(garden);
  box(garden,1.12,.16,1.18,0,0,0,cap);box(garden,.92,1.5,.98,0,-.82,0,rose);
  box(garden,1.01,.10,1.07,0,-1.6,0,warm);
  cylinder(garden,.24,.15,0,.14,0,cap);
  const tree = new THREE.Mesh(new THREE.ConeGeometry(.24,1.2,7),mat(0x82968c));
  tree.position.set(0,.78,0);tree.castShadow=true;garden.add(tree);
  const spire=new THREE.Group();spire.position.set(3.35,-.95,.25);env.add(spire);
  box(spire,.85,.16,.9,0,0,0,cap);box(spire,.64,1.3,.69,0,-.73,0,rose);
  box(spire,.36,1.5,.36,0,.8,0,warm);box(spire,.48,.09,.48,0,1.58,0,cap);
  const roof=new THREE.Mesh(new THREE.ConeGeometry(.36,.45,4),gold);roof.rotation.y=Math.PI/4;roof.position.y=1.85;spire.add(roof);
  }else if(levelIndex>=30){
    const pot=new THREE.Group();pot.position.set(irregular?-level.cols*CELL/2-.7:-3.4,-2.25,.6);env.add(pot);cylinder(pot,.22,.36,0,0,0,rose);
    cylinder(pot,.025,.65,0,.4,0,mat(0x758b58),8);
    const flower=new THREE.Group();flower.position.set(0,.77,0);pot.add(flower);
    for(let i=0;i<8;i++){const a=i*Math.PI/4,petal=new THREE.Mesh(new THREE.SphereGeometry(.10,8,6),gold);petal.position.set(Math.cos(a)*.14,Math.sin(a)*.14,0);petal.scale.set(1,1,.3);flower.add(petal);}
    const center=new THREE.Mesh(new THREE.SphereGeometry(.09,10,6),mat(0x806040));center.scale.z=.4;flower.add(center);
    const fragment=new THREE.Group();fragment.position.set(levelIndex>=38?2.65:3.35,-2.4,levelIndex>=38?3.05:.3);env.add(fragment);box(fragment,.6,.12,.6,0,0,0,cap);
    if(levelIndex>=50){
      box(fragment,.40,.10,.40,0,.72,0,warm);
      for(const x of [-.15,.15])for(const z of [-.15,.15])box(fragment,.04,.52,.04,x,.40,z,fixedTrim);
      cylinder(fragment,.10,.26,0,.37,0,gold);box(fragment,.44,.08,.44,0,.12,0,cap);
    }else if(levelIndex>=38){cylinder(fragment,.16,.36,0,.24,0,fixedStone);cylinder(fragment,.32,.06,0,.45,0,fixedCap);const needle=box(fragment,.035,.24,.035,0,.58,0,fixedTrim);needle.rotation.z=.35;}else cylinder(fragment,.14,.50,0,.3,0,warm);
  }else if(levelIndex>=20){
    const treeGroup=new THREE.Group();treeGroup.position.set(-3.45,-2.5,1);env.add(treeGroup);
    box(treeGroup,.65,.12,.65,0,0,0,cap);cylinder(treeGroup,.08,.34,0,.22,0,warm);
    const foliage=new THREE.Mesh(new THREE.ConeGeometry(.36,1.35,7),mat(0x668c72));foliage.position.y=.95;treeGroup.add(foliage);
    const rockGroup=new THREE.Group();rockGroup.position.set(3.35,-2.48,1);env.add(rockGroup);
    const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(.38,0),mat(0xb8b2a0));rock.scale.set(1,.7,.85);rockGroup.add(rock);
    const moss=new THREE.Mesh(new THREE.DodecahedronGeometry(.26,0),mat(0x819a65));moss.scale.set(1,.36,.8);moss.position.y=.2;rockGroup.add(moss);
  }else{
    const arch=new THREE.Group();arch.position.set(-3.45,-2.55,1);env.add(arch);
    box(arch,1.15,.12,.65,0,0,0,cap);
    box(arch,.20,.7,.28,-.36,.4,0,warm);box(arch,.20,.7,.28,.36,.4,0,warm);
    const arc=new THREE.Mesh(new THREE.TorusGeometry(.36,.10,6,20,Math.PI),cap);arc.position.set(0,.75,0);arch.add(arc);
    const relic=new THREE.Group();relic.position.set(3.4,-2.55,1);env.add(relic);box(relic,.65,.12,.65,0,0,0,cap);cylinder(relic,.21,.65,0,.38,0,warm);
  }
  const shadow=new THREE.Mesh(new THREE.PlaneGeometry(30,30),new THREE.ShadowMaterial({opacity:.12}));
  shadow.rotation.x=-Math.PI/2;shadow.position.y=-2.65;shadow.receiveShadow=true;env.add(shadow);
}


function heightTicks(group){
 const marks=[];const material=new THREE.MeshBasicMaterial({color:0xa45f49});
 for(let h=1;h<=level.maxHeight;h++){
  const line=new THREE.Group(),d=(WIDTH-.07)/2+.004;
  for(let side=0;side<4;side++){
   const face=new THREE.Group();face.rotation.y=side*Math.PI/2;
   const tick=new THREE.Mesh(new THREE.PlaneGeometry(.23,.023),material);
   tick.position.set(-.30,h*HEIGHT,d);face.add(tick);line.add(face);
  }
  group.add(line);marks.push({line,height:h});
 }return marks;
}
function fixedHeightMark(group,height){
 if(height<=0)return;
 const canvas=document.createElement('canvas');canvas.width=768;canvas.height=384;
 const ctx=canvas.getContext('2d');ctx.fillStyle='#704b32';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='500 252px Georgia,serif';ctx.fillText(String(height),384,192);
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
 const material=new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});
 for(let side=0;side<4;side++){const a=side*Math.PI/2,mesh=new THREE.Mesh(new THREE.PlaneGeometry(2.46,1.23),material);mesh.position.set(Math.sin(a)*(WIDTH-.04+.005)/2,height*HEIGHT-.75,Math.cos(a)*(WIDTH-.04+.005)/2);mesh.rotation.y=a;group.add(mesh);}
}

function makePillar(row,col){
  const ox=(level.cols-1)*CELL/2, oz=(level.rows-1)*CELL/2;
  const group=new THREE.Group();group.position.set(col*CELL-ox,0,row*CELL-oz);board.add(group);
  if(level.pillars[row][col].blocked){
    const b=document.createElement('button');b.className='pillar-key blocked-key';b.disabled=true;b.hidden=true;
    b.innerHTML='<span class="digit"></span><span class="height-label"></span><span class="direction"></span>';
    $('pillar-controls').appendChild(b);keyButtons.push(b);return {group,row,col,blocked:true,displayHeight:0};
  }
  const isFixed=level.pillars[row][col].fixed;
  const syncMark=new THREE.Group();group.add(syncMark);
  if(level.pillars[row][col].sync)for(const x of [-.07,.07]){
    const ring=new THREE.Mesh(new THREE.TorusGeometry(.105,.015,6,24),fixedTrim);
    ring.rotation.x=-Math.PI/2;ring.position.set(x,0,.43);syncMark.add(ring);
  }
  const shaft=box(group,WIDTH-.07,1,WIDTH-.07,0,.5,0,isFixed?fixedStone:stone);
  const cornice=box(group,WIDTH,.08,WIDTH,0,0,0,isFixed?fixedCap:cap);
  const inset=box(group,WIDTH-.16,.035,WIDTH-.16,0,0,0,warm);
  const pad=box(group,WIDTH,.055,WIDTH,0,-.0275,0,cap);
  // Inset slit windows move with the capital, echoing a tiny tower.
  const windowFront=archPanel(group,.16,.30,0,0,(WIDTH-.07)/2+.003,recess);
  const windowSide=archPanel(group,.16,.30,-(WIDTH-.07)/2-.003,0,0,recess);windowSide.rotation.y=-Math.PI/2;
  for(const mesh of [shaft,cornice,pad,inset])mesh.userData.pillar=row*level.cols+col;
  const button=document.createElement('button');button.className='pillar-key';
  button.type='button';button.classList.toggle('fixed-key',isFixed);button.classList.toggle('sync-key',!!level.pillars[row][col].sync);
  if(isFixed){const top=level.pillars[row][col].height*HEIGHT;for(const side of [-1,1]){box(group,.20,.012,.025,side*.34,top+.006,-.40,fixedTrim);box(group,.025,.012,.20,side*.43,top+.006,-.31,fixedTrim);box(group,.20,.012,.025,side*.34,top+.006,.40,fixedTrim);}} 
  button.innerHTML='<span class="digit"></span><span class="height-label"></span><span class="direction" aria-hidden="true"></span>';
  button.addEventListener('click',()=>clickPillar(row,col));
  button.addEventListener('pointermove',()=>{if(!activeGesture&&phase==='playing')setHoverPreview(row*level.cols+col);});
  button.addEventListener('pointerleave',()=>{if(!activeGesture)clearHoverPreview();});
  $('pillar-controls').appendChild(button);keyButtons.push(button);
  return {group,syncMark,shaft,cornice,inset,pad,windowFront,windowSide,row,col,ticks:heightTicks(group),displayHeight:0};
}
function setHeight(p,h){
  if(p.blocked)return;
  if(p.syncMark)p.syncMark.position.y=h*HEIGHT+.012;
  const top=h*HEIGHT;
  p.shaft.scale.y=Math.max(.02,top-.10);p.shaft.position.y=(top-.10)/2;
  p.shaft.visible=top>.1;
  p.cornice.position.y=top-.04;p.cornice.visible=top>.1;
  p.inset.position.y=top-.098;p.inset.visible=top>.13;
  p.windowFront.position.y=top-.47;p.windowSide.position.y=top-.47;
  p.windowFront.visible=p.windowSide.visible=top>.62;
  for(const mark of p.ticks)mark.line.visible=mark.height*HEIGHT<top-.13;
  p.displayHeight=h;
  if(p.pavilion)p.pavilion.position.y=top;
}
function fixedPlatform(node, isEnd){
  const p=worldPoint(level,node), group=new THREE.Group();group.position.set(p.x,0,p.z);board.add(group);
  box(group,WIDTH-.04,p.y+.95,WIDTH-.04,0,(p.y-1.15)/2,0,isEnd?warm:rose);
  box(group,WIDTH+.09,.1,WIDTH+.09,0,p.y-.05,0,cap);
  box(group,WIDTH+.04,.10,WIDTH+.04,0,-1.05,0,warm);
  fixedHeightMark(group,node.height);
  if(isEnd){portal(group,0,p.y,-.42,1.35);}
  else{
    // Removed the colored pad under the character.

  }
  return p;
}
const startLabel=document.createElement('span');startLabel.className='marker-label marker-label--start';startLabel.textContent='起 点';
const endLabel=document.createElement('span');endLabel.className='marker-label marker-label--end';endLabel.textContent='归 处';
$('pillar-controls').append(startLabel,endLabel);

function placeCharacterAtStart(){
  if(!character)return;
  walkDistance=0;walkHeading=facingHeading(startPoint,targetPosition());
  character.setOpacity(1);
  character.group.visible=true;
  character.group.position.set(startPoint.x,startPoint.y+.02,startPoint.z);
  character.group.rotation.y=walkHeading;
}
function placeCharacterAtSample(){
  if(!character||!walkTimeline)return placeCharacterAtStart();
  const sample=sampleWalk(walkTimeline,walkDistance);
  character.group.visible=true;
  character.group.position.set(sample.x,walkingFootY(sample),sample.z);
  character.group.rotation.y=sample.heading;
}
function targetPosition(){return level.end.pillar?{x:endPoint.x-.43,y:endPoint.y+.02,z:endPoint.z+.22}:{x:endPoint.x,y:endPoint.y+.02,z:endPoint.z+.32};}
function placeTarget(){
 if(!targetCharacter||!endPoint)return;
 const pos=targetPosition();targetCharacter.group.position.set(pos.x,pos.y,pos.z);
 targetCharacter.group.rotation.y=facingHeading(pos,startPoint);targetCharacter.group.visible=true;targetCharacter.setOpacity(1);
}
function reset(fromIndex){
  if($('completion').open)$('completion').close();
  homeTransition=null;pursuit=createPursuit();restoreCamera(cameraState,BASE_YAW);
  phase='playing';boardTween=null;selectedHint=-1;clearHoverPreview();clearActiveGesture();
  walkTimeline=null;walkDistance=0;walkHeading=0;walkingStairs=false;

  disposeGroup(board);disposeGroup(routeGroup);
  routeGroup=new THREE.Group();scene.add(routeGroup);
  keyButtons.forEach(b=>b.remove());keyButtons=[];
  level=new Level(LEVELS[levelIndex]);game=new GameState(level);document.body.classList.toggle('moving-goal',Boolean(level.end.pillar));document.body.classList.toggle('fixed-chapter',level.pillars.flat().some(p=>p.fixed));
  CHAPTER_NAME=levelIndex<10?"第一章 · 晨光之遇":levelIndex<20?"第二章 · 水上遗迹":levelIndex<30?"第三章 · 森林山谷":levelIndex<50?"第四章 · 随路而归":"第五章 · 黄昏之时";makeEnvironment();
  board=new THREE.Group();scene.add(board);pillars=[];
  for(let r=0;r<level.rows;r++)for(let c=0;c<level.cols;c++){const p=makePillar(r,c);setHeight(p,level.pillars[r][c].height);pillars.push(p);}
  startPoint=fixedPlatform({type:'start',height:level.start.height},false);
  if(level.end.pillar){
    const {row,col}=level.end.pillar,index=row*level.cols+col,p=pillars[index];
    p.pavilion=pavilion(p.group,index);p.pavilion.position.y=p.displayHeight*HEIGHT;
    keyButtons[index].classList.add('destination-key');
    syncDestination();
  }else endPoint=fixedPlatform({type:'end',height:level.end.height},true);
  startLabel.innerHTML=`<span class="marker-name">起点</span><span class="endpoint-height">${level.start.height}</span>`;endLabel.innerHTML=`<span class="marker-name">归处</span><span class="endpoint-height">${level.end.height??''}</span>`;startLabel.setAttribute('aria-label',`起点，高度 ${level.start.height}`);endLabel.setAttribute('aria-label',level.end.pillar?'归处':`归处，高度 ${level.end.height}`);
  placeCharacterAtStart();placeTarget();resize();
  // 求解当前关初始局面的最少点击次数（一次性，非当前局面的剩余最短距离）
  const sol = LEVELS[levelIndex].minMoves ? {solvable:true,minClicks:LEVELS[levelIndex].minMoves} : solve(level.clone(), { maxDepth: level.maxClicks != null ? level.maxClicks : 8 });
  minMoves = sol.solvable ? sol.minClicks : (level.maxClicks ?? 0);
  // 章节与关卡编号
  $('chapter-name').textContent = CHAPTER_NAME;
  $('chapter-tag').textContent = String(levelIndex+1).padStart(2,'0') + ' · ' + CHAPTER_NAME;
  $('level-number').textContent = String(levelIndex+1).padStart(2,'0');
  document.body.classList.remove('complete');
  $('status-title').textContent='连接起点和终点';
  $('hint').textContent=LEVELS[levelIndex].discovery || '轻触石柱，连同四邻一起升降。';
  $('confirm').innerHTML='连接道路 <span aria-hidden="true">→</span>';
  // 光照：若提供过渡起始关（fromIndex，必须为数字），则从旧关平滑插值到当前关；否则直接设到当前关
  if (typeof fromIndex === 'number' && fromIndex !== levelIndex) {
    lightingFrom = fromIndex; lightingTo = levelIndex; lightingT = 0;
  } else {
    lightingFrom = lightingTo = levelIndex; lightingT = 1;
    applyLighting(getLighting(levelIndex));
  }
  updateUI();
}
function updateUI(){
  $('total-levels').textContent=String(LEVELS.length);
  $('current-level').textContent=`第 ${levelIndex+1} 关 / ${LEVELS.length}`;
  $('max-moves').hidden=level.maxClicks==null;
  $('max-moves').querySelector('b').textContent=level.maxClicks??'';
  $('tutorial-btn').disabled=phase!=='playing';
  $('steps').textContent=String(game.clickCount).padStart(2,'0');
  $('min-moves').querySelector('b').textContent=String(minMoves);
  $('undo').disabled=phase!=='playing'||game.history.length===0;
  $('confirm').disabled=characterStatus==='loading'||phase==='moving'||phase==='revealing'||phase==='walking'||phase==='exiting';
  $('rotate').disabled=['revealing','walking','exiting'].includes(phase);
  $('rotate').querySelector('span').textContent='恢复视角';
  $('rotate').setAttribute('aria-label','恢复默认视角');
  $('rotate').title='回到初始视角';
  $('top-view').disabled=['revealing','walking','exiting'].includes(phase);
  $('top-view').setAttribute('aria-pressed',String(cameraState.top));
  $('top-view').querySelector('span').textContent=cameraState.top?'退出俯视':'俯视 · 看高度';
  document.body.classList.toggle('top-view',cameraState.top);
  // 限步关：显示剩余点击次数
  const movesLeftEl = $('moves-left');
  if (level.type === 'challenge' && level.maxClicks != null) {
    const left = Math.max(0, level.maxClicks - game.clickCount);
    movesLeftEl.hidden = false;
    movesLeftEl.querySelector('b').textContent = String(left);
  } else {
    movesLeftEl.hidden = true;
  }
  if(characterStatus==='loading')$('confirm').textContent='人物加载中…';
  if(characterStatus==='failed'){
    $('confirm').textContent='重试加载人物';
    $('hint').textContent='人物图片加载失败，点击下方按钮重试。';
  }
  $('hint-btn').disabled=phase!=='playing';
  const n = level.rows * level.cols;
  for(let i=0;i<n;i++){
    const p=level.pillars[Math.floor(i/level.cols)][i%level.cols], b=keyButtons[i];
    if(!b)continue;
    b.querySelector('.digit').textContent=String(p.height);
    b.classList.toggle('zero-height',p.height===0);
    b.querySelector('.height-label').textContent='';
    b.querySelector('.direction').textContent='';
    b.setAttribute('data-tint',p.fixed?'fixed':nextDirection(p,level.maxHeight)===1?'up':'down');
    b.setAttribute('aria-label',`${level.end.pillar?.row===Math.floor(i/level.cols)&&level.end.pillar?.col===i%level.cols?'归处，':''}${p.sync?'同步柱，':''}第${Math.floor(i/level.cols)+1}行第${i%level.cols+1}列石柱，高度${p.height}，${p.fixed?'固定高度，不可点击':'下一次'+(nextDirection(p,level.maxHeight)===1?'上升':'下降')}`);
    b.disabled=p.fixed||p.blocked||phase!=='playing'||(level.type==='challenge'&&level.maxClicks!=null&&game.clickCount>=level.maxClicks);
    b.classList.toggle('highlight',i===selectedHint);
  }
}
// 引导教学：把 targets 指定的石柱/按钮加上闪烁高亮，其余清除
function setGuideTargets(targets){
  document.getElementById('guide-pointer')?.setAttribute('hidden','');
  selectedHint=-1;clearHoverPreview();
  document.querySelectorAll('.pillar-key.highlight').forEach(b=>b.classList.remove('highlight'));
  const list=targets||[];
  for(const b of keyButtons)b.classList.remove('guide-flash','flash-digit');
  for(const id of ['undo','reset','confirm','hint-btn','top-view','rotate','menu-btn','tutorial-btn','total-stars'])document.getElementById(id)?.classList.remove('guide-flash');
  for(const t of list){
    if(t.kind==='pillar'&&keyButtons[t.index]){
      keyButtons[t.index].classList.add('guide-flash');
      if(t.flashDigit)keyButtons[t.index].classList.add('flash-digit');
    }
    else if(t.kind==='button')document.getElementById(t.id)?.classList.add('guide-flash');
  }
}
function clickPillar(row,col){
  if(phase!=='playing'||game.status!=='playing')return;
  if(shell?.paused()){
    // 引导教学期间仅允许教学指定的点击（步骤：点中央柱体验十字联动）
    if(shell.guideInteract?.()!=='pillar')return;
    if(!keyButtons[row*level.cols+col]?.classList.contains('guide-flash'))return;
  }
  const affected=game.click(row,col);if(!affected)return;
  if(shell?.guideInteract?.()==='pillar')shell.guideEvent('pillar');
  selectedHint=-1;clearHoverPreview();phase='moving';
  boardTween={start:performance.now(),duration:reduced?1:420,affected};
  $('status-title').textContent='连接起点和终点';
  $('hint').textContent=level.pillars.flat().some(p=>p.fixed)?'可动石柱升降一级，灰褐刻字的石台保持不变。':'石柱上升或下降一级；高度相差不超过一级即可相连。';
  updateUI();
}
function undo(){
  const gi=shell?.guideInteract?.();
  if(shell?.paused()&&gi!=='button:undo')return; // 引导中仅允许教学指定的撤销
  if(phase!=='playing'||!game.undo())return;
  selectedHint=-1;clearHoverPreview();clearActiveGesture();
  pillars.forEach(p=>setHeight(p,level.pillars[p.row][p.col].height));syncDestination();
  $('status-title').textContent='连接起点和终点';
  $('hint').textContent='已撤销上一步。';updateUI();
  if(gi==='button:undo')shell.guideEvent('undo');
}
function addRouteSegment(segment,index){
  const group=new THREE.Group();routeGroup.add(group);
  const a=segment.low,b=segment.high, dx=(b.x-a.x)/CELL,dz=(b.z-a.z)/CELL;
  const alongX=Math.abs(dx)>.5;
  if(segment.kind==='bridge'){
    box(group,alongX?CELL:.46,.08,alongX?.46:CELL,(a.x+b.x)/2,a.y+.025,(a.z+b.z)/2,routeStone);
    box(group,alongX?CELL:.035,.012,alongX?.035:CELL,(a.x+b.x)/2,a.y+.071,(a.z+b.z)/2,gold);
  }else{
    const start=.12,end=CELL-WIDTH/2+.015,n=7,stepLength=(end-start)/n;
    for(let j=0;j<n;j++){
      const offset=start+(j+.5)*stepLength, rise=(b.y-a.y)*(j+1)/n;
      box(group,alongX?stepLength+.003:.47,rise+.04,alongX?.47:stepLength+.003,
        a.x+dx*offset,a.y+rise/2+.01,a.z+dz*offset,routeStone);
      // Thin warm risers give each real stair an unambiguous edge.
      box(group,alongX?.012:.47,.012,alongX?.47:.012,
        a.x+dx*(offset-stepLength/2+.006),a.y+rise+.034,a.z+dz*(offset-stepLength/2+.006),gold);
    }
  }
  group.userData.delay=index*(reduced?0:130);
  group.visible=false;
  return group;
}
function confirm(){
  const gi=shell?.guideInteract?.();
  if(shell?.paused()&&gi!=='button:confirm')return; // 引导教学期间暂停（最后「连接道路」步骤放行）
  if(characterStatus==='failed'){loadCharacter();return;}
  if(characterStatus!=='ready')return;
  if(phase==='complete'){if(levelIndex<LEVELS.length-1)nextLevel();else {levelIndex=0;reset();}return;}
  if(phase!=='playing')return;
  if(game.status==='lost'){$('status-title').textContent='步数已用完';$('hint').textContent='这一步没能连成路，可以撤销，或重新开始本关。';return;}
  if(!game.confirm()){
    $('status-title').textContent='道路还未相连';
    $('hint').textContent=level.end.pillar?'连到小亭所在石柱即可，相邻高度差需不超过一级。':'从起点连到归处，相邻石柱的高度差需不超过一级。';return;
  }
  if(gi==='button:confirm')shell.guideEvent('confirm'); // 引导最后一步：连接道路成功后关闭教学
  phase='revealing';selectedHint=-1;clearHoverPreview();clearActiveGesture();
  homeTransition={from:{yaw:cameraState.yaw,pitch:cameraState.pitch},start:performance.now()};
  cameraState.top=false;
  const segments=planRoute(level,level.number===LEVELS.length?game.getPath().slice(0,-1):game.getPath());
  segments.forEach(addRouteSegment);
  revealStart=performance.now();
  $('status-title').textContent='道路已连接';
  $('hint').textContent='';updateUI();
}
function beginWalking(){
  const timeline=createWalkTimeline(level,level.number===LEVELS.length?game.getPath().slice(0,-1):game.getPath());
  if(!timeline.segments.length){finishWalking();return;}
  walkTimeline=timeline;walkDistance=0;walkingStairs=false;
  walkHeading=timeline.segments[0].heading;
  phase='walking';selectedHint=-1;
  $('status-title').textContent='正在前往终点';
  $('hint').textContent='自动行走中';
  updateUI();
}
function finishWalking(){
 if(level.number===LEVELS.length&&shell?.endingEligible(levelIndex,game.clickCount,minMoves)){runFinalEnding();return;}
 if(level.number===LEVELS.length){phase='complete';$('status-title').textContent='抵达归处前';$('hint').textContent='';$('confirm').textContent='重走旅程';updateUI();shell?.complete(levelIndex,game.clickCount,minMoves);return;}
 phase='exiting';$('status-title').textContent='到达终点';$('hint').textContent='';updateUI();
}
async function runFinalEnding(){
 phase='finale';clearGuideTargetsForEnding();
 const path=game.getPath(),segment=planRoute(level,path.slice(-2))[0];
 const mid=new THREE.Vector3((segment.from.x+segment.to.x)/2,(segment.from.y+segment.to.y)/2+.2,(segment.from.z+segment.to.z)/2);
 const project=()=>{const v=mid.clone().project(camera);return {x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2};};
 await flyStars(document.getElementById('total-stars'),project);
 addRouteSegment(segment);const stair=routeGroup.children.at(-1);stair.visible=true;
 await animateEnding(1200,t=>{stair.scale.y=.05+.95*t;stair.position.y=-.12*(1-t);});
 const timeline=createWalkTimeline(level,path.slice(-2),.85);
 await animateEnding(timeline.totalDuration*1000,t=>{const v=sampleWalk(timeline,t*timeline.totalDistance);character.group.position.set(v.x,walkingFootY(v),v.z);character.group.rotation.y=v.heading;character.update(.016,t*timeline.totalDuration,true,true,cameraState.yaw);});
 const male=character.group.position.clone(),female=targetCharacter.group.position.clone();
 await animateEnding(2200,t=>{const a=t*t*(3-2*t);for(const [actor,from,offset] of [[character,male,.12],[targetCharacter,female,-.12]]){actor.group.position.set(from.x+(endPoint.x+offset-from.x)*a,from.y,from.z+(endPoint.z-.12-from.z)*a);actor.setOpacity(1-Math.max(0,(a-.55)/.45));}});
 character.group.visible=false;targetCharacter.group.visible=false;
 shell.complete(levelIndex,game.clickCount,minMoves,true);
 showStarField();
}
function clearGuideTargetsForEnding(){clearHoverPreview();clearActiveGesture();document.body.classList.add('ending-active');}
function updatePursuit(delta){
 if(!targetCharacter||!character)return;
 if(level.number===LEVELS.length)return;
 if(!['walking','exiting'].includes(phase))return;
 const progress=walkTimeline?.totalDistance?walkDistance/walkTimeline.totalDistance:0;
 advancePursuit(pursuit,delta,progress,phase==='exiting');
 const pos=targetPosition();
 if(pursuit.target==='leaving'){
  const t=Math.min(1,pursuit.targetTime/1.6),move=Math.max(0,(t-.25)/.75);
  const from=facingHeading(pos,startPoint);
  const desired=level.end.pillar?facingHeading(pos,endPoint):0;
  const turn=Math.atan2(Math.sin(desired-from),Math.cos(desired-from));
  targetCharacter.group.rotation.y=from+turn*Math.min(1,t/.25);
  const entry=level.end.pillar?{x:pos.x+(endPoint.x-pos.x)*move,y:pos.y,z:pos.z+(endPoint.z-pos.z)*move,opacity:1-Math.max(0,(move-.6)/.4)}:doorEntry(endPoint,.32,move);
  targetCharacter.group.position.set(entry.x,entry.y,entry.z);
  targetCharacter.setOpacity(entry.opacity);
 }
 if(pursuit.target==='gone')targetCharacter.group.visible=false;
 if(pursuit.player!=='following'){
  const t=Math.min(1,pursuit.playerTime/1.1);
  const entry=level.end.pillar?{...endPoint,y:endPoint.y+.02,opacity:1-Math.max(0,(t-.5)*2)}:doorEntry(endPoint,0,t);
  character.group.rotation.y=level.end.pillar?walkHeading:0;character.group.position.set(entry.x,entry.y,entry.z);
  character.setOpacity(entry.opacity);
  if(pursuit.player==='gone')character.group.visible=false;
 }
 if(pursuit.next){
  phase='complete';
  $('status-title').textContent='通关成功';
  $('hint').textContent=levelIndex===LEVELS.length-1?'旅程已完成':'点击进入下一关';
  $('confirm').textContent=levelIndex===LEVELS.length-1?'重走旅程':'进入下一关 →';
  updateUI();
  shell?.complete(levelIndex,game.clickCount,minMoves);
 }
}

/** 进入下一关：加载下一关初态、复位角色、光照平滑变色（不闪白/闪黑） */
function nextLevel(){
  const from = levelIndex;
  levelIndex++;
  reset(from);
}

const hintPlans=new Map();
function hint(){
  if(phase!=='playing')return;
  const gi=shell?.guideInteract?.();if(shell?.paused()&&gi!=='button:hint')return;
  if(PathfindingSystem.hasPath(level)){$('hint').textContent='路已经搭好了，点击「连接道路」看石阶出现。';if(gi==='button:hint')shell.guideEvent('hint');return;}
  // Bound the search so exploratory taps cannot freeze a mobile browser.
  const queue=[{level:level.clone(),first:null,depth:0,steps:[]}],visited=new Set();
  const source=LEVELS[levelIndex], key=levelIndex+'|'+boardKey(level), remaining=level.maxClicks==null?Infinity:level.maxClicks-game.clickCount;
  const route=hintPlans.get(key)??continuation(level,source);
  let found=route?.length&&route.length<=remaining?route[0]-1:null;
  search:for(let head=0;found===null&&head<queue.length&&head<1200;head++){
    const node=queue[head];if(node.depth>=Math.min(4,remaining))continue;
    for(let r=0;r<level.rows;r++)for(let c=0;c<level.cols;c++){
      if(node.level.pillars[r][c].fixed||node.level.pillars[r][c].blocked)continue;
      const next=node.level.clone();ChainReactionSystem.apply(next.pillars,r,c,level.maxHeight);
      const key=next.pillars.flat().map(p=>p.height+':'+p.direction).join(',');
      if(visited.has(key))continue;visited.add(key);
      const first=node.first??r*level.cols+c;
      if(PathfindingSystem.hasPath(next)){found=first;const steps=[...node.steps,r*level.cols+c+1],board=level.clone();for(let k=0;k<steps.length;k++){hintPlans.set(levelIndex+'|'+boardKey(board),steps.slice(k));const id=steps[k]-1;ChainReactionSystem.apply(board.pillars,Math.floor(id/level.cols),id%level.cols,level.maxHeight);}break search;}
      if(queue.length<2500)queue.push({level:next,first,depth:node.depth+1,steps:[...node.steps,r*level.cols+c+1]});
    }
  }
  if(found!==null){selectedHint=found;hintUntil=performance.now()+5000;$('hint').textContent=`试试第 ${Math.floor(found/level.cols)+1} 行、第 ${found%level.cols+1} 列的石柱。`;}
  else $('hint').textContent='暂未找到短路线，可以撤销几步，或重新开始。';
  updateUI();if(gi==='button:hint'&&found!==null)shell.guideEvent('hint');
}
function placeLabel(el,p,dy=0){
  projection.set(p.x,p.y+dy,p.z).project(camera);
  el.style.transform=`translate(${(projection.x*.5+.5)*innerWidth}px,${(-projection.y*.5+.5)*innerHeight}px)`;
}
function updateCamera(){
  document.body.classList.toggle("top-view",cameraState.top);
  const target = new THREE.Vector3(0,.28,0);
  if(cameraState.top){camera.up.set(-Math.sin(cameraState.yaw),0,-Math.cos(cameraState.yaw));camera.position.set(0,22,.00001);}
  else {camera.up.set(0,1,0);const radius=19,flat=radius*Math.cos(cameraState.pitch);camera.position.set(Math.sin(cameraState.yaw)*flat,.28+radius*Math.sin(cameraState.pitch),Math.cos(cameraState.yaw)*flat);}
  camera.lookAt(target);
  camera.updateMatrixWorld();
  pillars.forEach((p,i)=>!p.blocked&&placeLabel(keyButtons[i],{x:p.group.position.x+(p.pavilion&&!cameraState.top?.36:0),y:p.displayHeight*HEIGHT+.08,z:p.group.position.z+(p.pavilion&&!cameraState.top?.38:0)}));
  if(startPoint){placeLabel(startLabel,{...startPoint,z:startPoint.z+(cameraState.top?0:.65)},.01);placeLabel(endLabel,endPoint,level.end.pillar?1.97:1.52);}
}
function resize(){
  const aspect=innerWidth/innerHeight;
  // Reserve vertical room for UI; maintain a readable island on portrait screens.
  const scale=level?Math.max(1,level.cols/3,level.rows/3):1;
  const size=Math.max(11.4/aspect,9.1*innerHeight/Math.max(230,innerHeight-344))*Math.sqrt(scale);
  camera.left=-size*aspect/2;camera.right=size*aspect/2;camera.top=size/2;camera.bottom=-size/2;
  camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);updateCamera();
}
function pick(e){
  pointer.set(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2);ray.setFromCamera(pointer,camera);
  return ray.intersectObjects(board.children,true).find(h=>h.object.userData.pillar!==undefined)?.object.userData.pillar??-1;
}
function toggleTopViewLeave(){
  if(cameraState.top){toggleTopView(cameraState);updateUI();}
}
function buildPreview(i){
  if(i<0||i>=level.rows*level.cols)return null;
  const row=Math.floor(i/level.cols), col=i%level.cols;
  if(level.pillars[row][col].fixed||level.pillars[row][col].blocked)return null;
  const p=previewOperation(level,row,col);
  const map={};for(const a of p.affected)map[a.row*level.cols+a.col]={from:a.fromHeight,to:a.toHeight};
  return {index:i,row,col,affected:map,added:p.added,removed:p.removed};
}
function setHoverPreview(i){
  hoverIndex=i;
  hoverPreview=(i>=0&&phase==='playing')?buildPreview(i):null;
  applyPreview();
}
function clearHoverPreview(){hoverIndex=-1;hoverPreview=null;applyPreview();}
function applyPreview(){
  for(const b of keyButtons)b.classList.remove('preview','preview-center');
  const pv=(activeGesture&&activeGesture.preview)?activeGesture.preview:hoverPreview;
  if(!pv){renderer.domElement.style.cursor='default';drawPreviewOverlay(null);return;}
  const center=pv.index;
  for(const key in pv.affected){const b=keyButtons[key];if(!b)continue;b.classList.add('preview');if(Number(key)===center)b.classList.add('preview-center');}
  renderer.domElement.style.cursor='pointer';
  drawPreviewOverlay(pv);
}
let previewMeshes=[];
function drawPreviewOverlay(pv){
  for(const m of previewMeshes){board.remove(m);m.geometry.dispose();m.material.dispose();}
  previewMeshes=[];
  if(!pv)return;
  for(const key in pv.affected){
    const {from,to}=pv.affected[key];
    if(to===from)continue;
    const p=pillars[key];if(!p)continue;
    const fromH=Math.max(.02,from*HEIGHT), toH=Math.max(.02,to*HEIGHT);
    const d=WIDTH/2-.09,len=.16,points=[];
    for(const x of [-1,1])for(const z of [-1,1]){
      points.push(new THREE.Vector3(x*d,0,z*d),new THREE.Vector3(x*(d-len),0,z*d),new THREE.Vector3(x*d,0,z*d),new THREE.Vector3(x*d,0,z*(d-len)));
    }
    const mesh=new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:Number(key)===pv.index?0x735570:0xa38a9c,depthWrite:false}));
    mesh.position.set(p.group.position.x,fromH+.025,p.group.position.z);board.add(mesh);previewMeshes.push(mesh);
  }
}

function nodePos(n){
  if(n.type==='start')return {x:startPoint.x,y:startPoint.y,z:startPoint.z};
  if(n.type==='end')return {x:endPoint.x,y:endPoint.y,z:endPoint.z};
  const p=pillars[n.row*level.cols+n.col];return p?{x:p.group.position.x,y:n.height*HEIGHT,z:p.group.position.z}:null;
}
function clearActiveGesture(){activeGesture=null;applyPreview();}
let gesture=null,pointerActive=false,pointerInside=true;
const canvasEl=renderer.domElement;
canvasEl.style.touchAction='none';
canvasEl.addEventListener('pointerdown',e=>{
  if(phase!=='playing')return;
  const gi=shell?.guideInteract?.();
  if(shell?.paused()&&gi!=='pillar'&&gi!=='drag')return; // 引导教学期间仅允许教学指定的点击/拖动
  if(gesture){gesture=null;activeGesture=null;applyPreview();return;} // 多指介入：取消本次
  const candidate=pick(e);
  gesture=createGesture(e.pointerId,e.clientX,e.clientY,candidate);
  activeGesture={pointerId:e.pointerId,candidate,preview:null,dragging:false,startX:e.clientX,startY:e.clientY};
  if(candidate>=0)activeGesture.preview=buildPreview(candidate);
  pointerActive=true;pointerInside=true;
  applyPreview();
  try{canvasEl.setPointerCapture(e.pointerId);}catch(_){}
});
canvasEl.addEventListener('pointermove',e=>{
  if(pointerActive&&activeGesture&&activeGesture.pointerId===e.pointerId){
    const dx=e.clientX-activeGesture.startX,dy=e.clientY-activeGesture.startY;
    if(!activeGesture.dragging&&Math.hypot(dx,dy)>10){
      activeGesture.dragging=true;activeGesture.candidate=-1;activeGesture.preview=null;
      activeGesture.lastX=e.clientX;activeGesture.lastY=e.clientY;
      applyPreview();
    }
    if(activeGesture.dragging){
      // 逐帧增量：拖右 → 相机向左环绕（画面内容跟手指同向）；灵敏度约 0.2°/px。
      dragOrbit(cameraState,e.clientX-activeGesture.lastX,e.clientY-activeGesture.lastY);
      updateUI();
      activeGesture.lastX=e.clientX;activeGesture.lastY=e.clientY;
      updateCamera();
    }
    return;
  }
  setHoverPreview(phase==='playing'?pick(e):-1);
});
canvasEl.addEventListener('pointerup',e=>{
  if(!pointerActive||!activeGesture||activeGesture.pointerId!==e.pointerId)return;
  pointerActive=false;
  const inside=e.clientX>=0&&e.clientY>=0&&e.clientX<=innerWidth&&e.clientY<=innerHeight;
  const dragged=activeGesture.dragging;
  const cand=dragged?-1:activeGesture.candidate;
  activeGesture=null;gesture=null;
  clearHoverPreview();applyPreview();
  if(dragged&&shell?.guideInteract?.()==='drag')shell.guideEvent('drag'); // 引导：完成一次环绕拖动
  if(cand>=0&&inside&&phase==='playing')clickPillar(Math.floor(cand/level.cols),cand%level.cols);
});
canvasEl.addEventListener('pointercancel',e=>{
  if(activeGesture&&activeGesture.pointerId===e.pointerId){activeGesture=null;gesture=null;pointerActive=false;clearHoverPreview();applyPreview();}
});
window.addEventListener('blur',()=>{if(activeGesture){activeGesture=null;gesture=null;pointerActive=false;clearHoverPreview();applyPreview();}});
canvasEl.addEventListener('pointerleave',e=>{if(activeGesture&&activeGesture.pointerId===e.pointerId)pointerInside=false;});
canvasEl.addEventListener('pointerenter',e=>{if(activeGesture&&activeGesture.pointerId===e.pointerId)pointerInside=true;});
$('undo').addEventListener('click',undo);$('reset').addEventListener('click',()=>{if(shell?.paused())return;reset();});
$('confirm').addEventListener('click',confirm);$('hint-btn').addEventListener('click',hint);
$('rotate').addEventListener('click',()=>{const gi=shell?.guideInteract?.();if(shell?.paused()&&gi!=='button:rotate')return;if(['revealing','walking','exiting'].includes(phase))return;if(cameraState.top)toggleTopView(cameraState);restoreCamera(cameraState,BASE_YAW);updateUI();if(gi==='button:rotate')shell.guideEvent('rotate');});
$('top-view').addEventListener('click',()=>{const gi=shell?.guideInteract?.();if(shell?.paused()&&gi!=='button:top-view')return;if(['revealing','walking','exiting'].includes(phase))return;toggleTopView(cameraState);updateUI();if(gi==='button:top-view')shell.guideEvent('top-view');});
window.addEventListener('resize',resize);
window.addEventListener('keydown',e=>{
  if(shell?.paused()||e.altKey||e.ctrlKey||e.metaKey||e.repeat)return;
  if(e.key.toLowerCase()==='r')reset();
  if(e.key.toLowerCase()==='z')undo();
  if(/^[1-9]$/.test(e.key)){const i=Number(e.key)-1;if(i<level.rows*level.cols)clickPillar(Math.floor(i/level.cols),i%level.cols);}
});

function frame(now){
  requestAnimationFrame(frame);
  const delta=lastFrame?Math.min(.05,(now-lastFrame)/1000):0;lastFrame=now;
  if(shell?.paused()){
    // 引导中：仍推进棋盘升降动画（点击教学需要看到动画完成并恢复交互状态）
    if(boardTween){
      const t=Math.min(1,(now-boardTween.start)/boardTween.duration), ease=t*t*(3-2*t);
      for(const a of boardTween.affected)setHeight(pillars[a.row*level.cols+a.col],a.fromHeight+(a.toHeight-a.fromHeight)*ease);
      if(t>=1){boardTween=null;phase='playing';updateUI();}
    }
    updateCamera();updateGuidePointer();renderer.render(scene,camera);return;
  }
  if(homeTransition){
    const t=reduced?1:Math.min(1,(now-homeTransition.start)/850);
    const home=createCameraState(BASE_YAW),view=homeViewSample(homeTransition.from,BASE_YAW,home.pitch,t);
    Object.assign(cameraState,{yaw:view.yaw,pitch:view.pitch,rawPitch:view.pitch,obliquePitch:view.pitch,obliqueYaw:view.yaw});
    if(t>=1){restoreCamera(cameraState,BASE_YAW);homeTransition=null;}
  }
  // 光照平滑过渡（切关时从旧关插值到新关）
  if(lightingT<1){
    lightingT=Math.min(1,lightingT+delta*1.2);
    const t=lightingT*lightingT*(3-2*lightingT);
    applyLighting(interpolateLighting(lightingFrom,lightingTo,t));
  }
  if(boardTween){
    const t=Math.min(1,(now-boardTween.start)/boardTween.duration), ease=t*t*(3-2*t);
    for(const a of boardTween.affected)setHeight(pillars[a.row*level.cols+a.col],a.fromHeight+(a.toHeight-a.fromHeight)*ease);
    if(t>=1){boardTween=null;phase='playing';if(game.status==='lost'){$('status-title').textContent='步数已用完';$('hint').textContent='这一步没能连成路，可以撤销，或重新开始本关。';}updateUI();}
  }
  syncDestination();
  if(phase==='walking'&&walkTimeline&&character){
    if(reduced)walkDistance=walkTimeline.totalDistance;
    else walkDistance=Math.min(walkTimeline.totalDistance,walkDistance+delta*walkTimeline.speed);
    const sample=sampleWalk(walkTimeline,walkDistance);
    walkingStairs=sample.kind==='stairs';
    character.group.position.set(sample.x,walkingFootY(sample),sample.z);
    // Turn toward the next step; a shortest-angle follow keeps corners readable.
    const turn=Math.atan2(Math.sin(sample.heading-walkHeading),Math.cos(sample.heading-walkHeading));
    walkHeading+=turn*Math.min(1,delta*10);
    character.group.rotation.y=walkHeading;
    if(sample.done)finishWalking();
  }

  if(phase==='revealing'){
    let done=true;
    routeGroup.children.forEach(g=>{
      const t=reduced?1:Math.max(0,Math.min(1,(now-revealStart-g.userData.delay)/350));
      g.visible=t>0;g.position.y=-.16*(1-t);g.scale.y=.75+.25*t;
      if(t<1)done=false;
    });
    if(done){beginWalking();}
  }
  if(selectedHint>=0&&now>hintUntil){selectedHint=-1;updateUI();}
  updatePursuit(delta);
  updateCamera();
  updateGuidePointer();
  if(targetCharacter)targetCharacter.update(cameraState.yaw);
  if(character&&phase!=='finale')character.update(delta*1.05,now/1000,phase==='walking',walkingStairs,cameraState.yaw);
  renderer.render(scene,camera);
}
try{
  // 支持 ?level=N 直接加载指定关卡（1-based，默认第 1 关，用于验收/调试）
  const qs = new URLSearchParams(location.search).get('level');
  if (qs != null) {
    const n = Number(qs);
    if (Number.isInteger(n) && n >= 1 && n <= LEVELS.length) levelIndex = n - 1;
  }
  reset();resize();requestAnimationFrame(frame);
  $('loading').classList.add('loaded');
  $('loading').setAttribute('aria-hidden','true');
  loadCharacter();
  shell=createGameShell({levels:LEVELS,getLevelIndex:()=>levelIndex,start(index){const from=levelIndex;levelIndex=index;reset(from);},next:confirm,setGuideTargets});
}catch(error){
  console.error(error);$('loading').classList.add('loaded');$('error').hidden=false;
}

function loadCharacter(){
  if(characterStatus==='ready')return;
  characterStatus='loading';$('confirm').innerHTML='人物加载中…';updateUI();
  Promise.all([loadStairCharacter({height:1.08,reduced}),loadTarget()]).then(([loaded,target])=>{
    character=loaded;targetCharacter=target;characterStatus='ready';scene.add(character.group,targetCharacter.group);
    placeCharacterAtSample();placeTarget();$('confirm').innerHTML='连接道路 <span aria-hidden="true">→</span>';
    updateUI();

  }).catch(error=>{
    characterStatus='failed';character=null;
    $('hint').textContent='人物图片加载失败，点击下方按钮重试。';
    $('confirm').textContent='重试加载人物';updateUI();console.error(error);
  });
}


