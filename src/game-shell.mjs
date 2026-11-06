import {STAR_KEY,readStars,migrateStars,recordStars,totalStars,endingUnlocked} from './star-progress.mjs';
import {getLighting} from './lighting.mjs';
import {renderCompletionRating} from './completion-feedback.mjs';
import {LEVELS} from './levels.js';

// 第一关内引导步骤：{title, copy, targets, demo?, interact?, event?}
// targets: [{kind:'pillar',index,flashDigit?}|{kind:'button',id}] —— 由 main.js 负责闪烁高亮；flashDigit 让石柱数字本身明显闪烁
// demo: 可选的 SVG 预览片段（当需要示意抽象规则时使用）
// interact: 该步允许玩家实际操作的类型；event: 玩家完成操作后推进的事件名
// 有 interact 的步骤是「实际操作步」：不显示「确定」按钮，玩家完成操作后自动推进到下一步
const lessons=[
 {title:'你的目标 · 归处',
  copy:'这是一段安静的旅程。你的目标，是从「起点」搭一条高低相连的路，通到发亮的「归处」。相邻石柱的高度差不超过一级，就能走上去。',
  targets:[],
  demo:svgRoute()},
 {title:'石柱上的数字',
  copy:'每根石柱顶上的大数字，是它「当前的高度」，不是编号。薄荷绿表示下一次会上升，橙红表示下一次会下降。',
  targets:[{kind:'pillar',index:4}]},
 {title:'点一下 · 十字联动',
  copy:'点击箭头所指的中央石柱（第2行、第2列）。只需点一次。',
  targets:[{kind:'pillar',index:4,flashDigit:true}],
  interact:'pillar',event:'pillar'},
 {title:'撤销 · 重新开始',
  copy:'刚才点的那一下，让中央和四邻的柱子一起动了。点「撤销」把它收回去（按 Z 也行）；「重新开始」则一键回到本关初始局面（按 R）。',
  targets:[{kind:'button',id:'undo'}],
  interact:'button:undo',event:'undo'},
 {title:'点一下的规律',
  copy:'小字附言：点一下石柱，它和上下左右相邻的柱子各升降一级，斜角不受影响。升到最高或降到 0 后，方向会自动反转。',
  targets:[],
  demo:svgBounce()},
 {title:'转动视角',
  copy:'按住画面空白处，左右拖动，环绕观察这片石林。',
  targets:[],
  interact:'drag',event:'drag'},
 {title:'俯视 · 看高度',
  copy:'点「俯视」，从正上方看清每根柱子的高度。',
  targets:[{kind:'button',id:'top-view'}],
  interact:'button:top-view',event:'top-view'},
 {title:'恢复视角',
  copy:'看完了？点「恢复视角」回到默认角度。',
  targets:[{kind:'button',id:'rotate'}],
  interact:'button:rotate',event:'rotate'},
 {title:'卡住就点「提示」',
  copy:'不知道下一步点哪儿时，点「提示」，会高亮下一步最值得点的石柱，跟着它走。现在点一下试试。',
  targets:[{kind:'button',id:'hint-btn'}],
  interact:'button:hint',event:'hint'},
 {title:'点击正确石柱',
  copy:'点击箭头所指的石柱（第1行、第2列），让路线接到归处。',
  targets:[{kind:'pillar',index:1,flashDigit:true}],
  interact:'pillar',event:'pillar'},
 {title:'累计星星 · 最终结局',copy:'星星旁的数字是累计星数，取每一关最好成绩相加。只有累计超过280颗星星，才能触发最终结局。重玩可以提高本关星级。',targets:[{kind:'button',id:'total-stars'}]},
 {title:'连接道路 · 通关',
  copy:'路连好了！点「连接道路」，人物会沿石阶走进归处，完成第一关。',
  targets:[{kind:'button',id:'confirm'}],
  interact:'button:confirm',event:'confirm'}
];

function svgRoute(){return `<svg viewBox="0 0 360 160" xmlns="http://www.w3.org/2000/svg"><path d="M30 120H110V90H200V60H300" stroke="#d6a36b" stroke-width="16" fill="none"/><circle cx="30" cy="120" r="9" fill="#9cea9f"/><circle cx="300" cy="60" r="9" fill="#e65336"/><text x="180" y="145" text-anchor="middle" font-size="13" fill="#604463">起点 —— 连一条高度差 ≤ 1 的路 —— 归处</text></svg>`;}
function svgBounce(){return `<svg viewBox="0 0 360 160" xmlns="http://www.w3.org/2000/svg"><rect x="141" y="40" width="78" height="80" rx="5" fill="#d6a36b"/><text x="180" y="28" text-anchor="middle" font-size="24" fill="#604463">4</text><text x="180" y="140" text-anchor="middle" font-size="13" fill="#604463">0 → 1 → 2 → 3 → 4 → 3 → 2 → 1</text></svg>`;}

export function createGameShell({levels,start,next,setGuideTargets,getLevelIndex}){
 const $=id=>document.getElementById(id),cover=$('cover'),game=$('game-shell'),guide=$('inline-guide');
 let best=migrateStars(localStorage);
 function refreshStars(){const total=totalStars(best);$('total-stars').textContent='★ '+total;$('picker-stars').textContent='★ '+total;$('total-stars').setAttribute('aria-label','累计 '+total+' 颗星');document.querySelectorAll('.level-choice').forEach((b,i)=>{b.querySelector('.level-best').textContent=(best[i+1]??0)+' ★';});}
 let step=0,completedIndex=0,referenceMode=false;
 const referenceLessons=[lessons[0],lessons[1],{title:"十字联动",copy:"点击一根石柱，它和上下左右相邻的石柱各升降一级，斜角不受影响。到达最高或最低高度后，升降方向自动反转。",demo:svgBounce()},{title:"撤销与重新开始",copy:"撤销可收回上一步操作；重新开始会恢复本关的初始棋盘。键盘也可以使用 Z 撤销、R 重新开始。"},{title:"观察与提示",copy:"拖动画面可环绕观察，点击俯视查看高度，恢复视角可回到默认角度。遇到困难时，点击提示查看下一步。"},{title:"连接道路",copy:"相邻石柱高度差不超过一级时可以通行。搭好从起点到归处的路线后，点击连接道路。有限步要求的关卡还需要在步数范围内完成。"},lessons[10]];
 const guideLessons=()=>referenceMode?referenceLessons:lessons;
 function updateCover(open){cover.hidden=!open;game.inert=open;document.body.classList.toggle('on-cover',open);if(open)$('start-game').focus();}
 // 清除引导高亮（交给 main.js 完成）
 function clearGuide(){guide.hidden=true;document.body.classList.remove('guide-swipe');if(setGuideTargets)setGuideTargets([]);document.body.classList.remove('guiding');}
 // 进入关卡：第一关且尚未教学时，启动关卡内引导；否则聚焦确认按钮
 function enter(index){$('level-picker').close();updateCover(false);$('resume-game').hidden=false;start(index);if(index===0)startGuide();else {clearGuide();$('confirm').focus();}}
 $('start-game').onclick=()=>enter(0);
 $('resume-game').onclick=()=>{if(getLevelIndex()===0){enter(0);return;}updateCover(false);clearGuide();$('confirm').focus();};
 $('menu-btn').onclick=()=>{clearGuide();updateCover(true);};
 const openPicker=()=>{closeGuide();refreshStars();$('level-picker').showModal();};$('choose-level').onclick=openPicker;$('game-choose-level').onclick=openPicker;
 $('close-picker').onclick=()=>$('level-picker').close();
 $('picker-home').onclick=()=>{$('level-picker').close();clearGuide();updateCover(true);};
 const chapterOf=i=>i<10?0:i<20?1:i<30?2:i<50?3:4;
 for(const [i,level] of levels.entries()){
  if(i>0&&chapterOf(i)!==chapterOf(i-1)){const gap=document.createElement('div');gap.className='chapter-gap';gap.setAttribute('aria-hidden','true');$('level-grid').append(gap);}
  const button=document.createElement('button');button.className='level-choice';button.setAttribute('aria-label',`第 ${i+1} 关 ${level.name}`);
  const n=document.createElement('strong');n.textContent=String(i+1).padStart(2,'0');
  const label=document.createElement('span');label.textContent=i===0?'教学':level.maxClicks?`限 ${level.maxClicks} 步`:`${level.rows} × ${level.cols}`;
  const rating=document.createElement('small');rating.className='level-best';rating.textContent=(best[i+1]??0)+' ★';button.append(n,label,rating);const color=getLighting(i).backgroundColor;button.style.backgroundColor='#'+color.toString(16).padStart(6,'0');if(i>=52)button.style.color='#fff8eb';button.dataset.chapter=String(chapterOf(i));button.onclick=()=>enter(i);$('level-grid').append(button);
 }

 $('next-level').onclick=()=>{$('completion').close();clearGuide();next();$('confirm').focus();};
 $('replay-level').onclick=()=>{$('completion').close();enter(completedIndex);};
 $('completion-home').onclick=()=>{$('completion').close();clearGuide();updateCover(true);};
 $('completion').addEventListener('cancel',e=>{e.preventDefault();$('completion').close();$('confirm').focus();});
 // ---- 第一关内引导教学 ----
 function startGuide(reference=false){referenceMode=reference;step=0;document.body.classList.add('guiding');guide.hidden=false;renderGuide();}
 function closeGuide(){guide.hidden=true;document.body.classList.remove('guide-swipe');clearGuide();$('confirm').focus();}
 function renderGuide(){
  const lesson=guideLessons()[step];
  const isInteract=!referenceMode&&!!lesson.interact;
  $('guide-step-label').textContent=`教学 ${step+1} / ${guideLessons().length}`;
  $('guide-title').textContent=lesson.title;
  $('guide-copy').textContent=lesson.copy;
  $('guide-demo').innerHTML=lesson.demo||'';
  $('guide-prev').hidden=step===0;
  // 实际操作步：隐藏「确定/下一步」按钮，改显示「完成操作后自动继续」提示；纯阅读步保留确认按钮
  const actions=$('guide-actions');
  actions.classList.toggle('is-interact',isInteract);
  $('guide-next').hidden=isInteract;
  const hintDo=$('guide-hint-do');
  hintDo.hidden=!isInteract;
  hintDo.textContent=lesson.interact==='drag'?'按住空白处拖动 · 完成后自动继续':lesson.interact==='pillar'?'点击箭头所指石柱 · 完成后自动继续':'点击箭头所指按钮 · 完成后自动继续';
  document.body.classList.toggle('guide-swipe',!referenceMode&&lesson.interact==='drag');
  if(setGuideTargets)setGuideTargets(referenceMode?[]:lesson.targets||[]);
 }
 // main.js 在玩家完成引导操作时调用 guideEvent(event)；guideInteract() 告诉 main.js 当前允许哪种操作
 function guideEvent(event){
  const lesson=guideLessons()[step];
  if(referenceMode||!lesson||lesson.event!==event)return;
  if(step===guideLessons().length-1)closeGuide();else {step++;renderGuide();}
 }
 $('guide-next').onclick=()=>{if(step===guideLessons().length-1)closeGuide();else {step++;renderGuide();}};
 $('guide-prev').onclick=()=>{if(step>0){step--;renderGuide();}};
 $('guide-skip').onclick=closeGuide;
 // 第一关重看实操教学，后续关卡显示说明卡片
 $('tutorial-btn').onclick=()=>{if(getLevelIndex()===0){start(0);startGuide();}else startGuide(true);};
 refreshStars();
 updateCover(true);
 return {paused:()=>document.body.classList.contains('ending-active')||!cover.hidden||!guide.hidden||$('level-picker').open||$('completion').open,
  guideInteract:()=>!referenceMode&&!guide.hidden?(lessons[step]?.interact||null):null,
  guideEvent,
  endingEligible:(index,moves,min)=>index===levels.length-1&&endingUnlocked(recordStars({...best},index+1,moves,min)),
 complete(index,moves,min,cinematic=false){completedIndex=index;best=recordStars(best,index+1,moves,min);try{localStorage.setItem(STAR_KEY,JSON.stringify(best));}catch{}refreshStars();const score=renderCompletionRating($('completion-rating'),moves,min);$('completion-retry-note').hidden=score.optimal;const tip=levels[index].tip;$('completion-tip').hidden=!tip;$('completion-tip').textContent=tip?'tip：'+tip:'';$('completion-title').textContent=index===levels.length-1?'旅程完成':index===49?'第四章完成':index===29?'第三章完成':index===19?'第二章完成':index===9?'第一章完成':'通关成功';$('completion-detail').textContent=`第 ${index+1} 关 · 用了 ${moves} 步 · 最少 ${min} 步`+(index===levels.length-1?(endingUnlocked(best)?' · 终章动画已解锁':' · 超过280颗星可解锁终章动画'):'');if(index===levels.length-1&&endingUnlocked(best))window.dispatchEvent(new CustomEvent('yellow:ending-ready',{detail:{stars:totalStars(best)}}));$('next-level').textContent=index===levels.length-1?'重走旅程 →':`进入第 ${index+2} 关 →`;if(!cinematic)$('completion').showModal();}}
}
