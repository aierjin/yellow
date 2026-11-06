let overlay,path;
export function updateGuidePointer(){
 const card=document.getElementById('inline-guide');
 if(!overlay){overlay=document.createElementNS('http://www.w3.org/2000/svg','svg');overlay.id='guide-pointer';overlay.setAttribute('aria-hidden','true');overlay.innerHTML='<defs><marker id="guide-arrow-tip" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#785883"/></marker></defs><path fill="none" stroke="#fff8eb" stroke-width="7"/><path fill="none" stroke="#785883" stroke-width="3" stroke-linecap="round" marker-end="url(#guide-arrow-tip)"/>';document.body.append(overlay);path=overlay.querySelectorAll(':scope > path');}
 if(!card||card.hidden||!document.body.classList.contains('guiding')){overlay.setAttribute('hidden','');return;}
 const target=document.querySelector('.guide-flash');
 if(!target){overlay.setAttribute('hidden','');card.style.left=innerWidth<650?'12px':'28px';card.style.top=innerWidth<650?'110px':'180px';return;}
 const t=target.getBoundingClientRect(),x=t.left+t.width/2,y=t.top+t.height/2;
 const w=Math.min(innerWidth-24,innerWidth<650?245:270),h=card.offsetHeight;
 let left,top;
 if(innerWidth>=650){left=x>innerWidth/2?x-w-105:x+105;left=Math.max(18,Math.min(innerWidth-w-18,left));top=Math.max(110,Math.min(innerHeight-h-160,y-h/2));}
 else{left=12;top=y<innerHeight*.4?Math.min(innerHeight-h-160,y+65):Math.max(100,y-h-85);}
 card.style.left=left+'px';card.style.top=top+'px';card.style.right='auto';card.style.bottom='auto';
 const c=card.getBoundingClientRect();let sx=Math.max(c.left+16,Math.min(c.right-16,x)),sy=y>c.bottom?c.bottom:y<c.top?c.top:Math.max(c.top+16,Math.min(c.bottom-16,y));
 if(y>=c.top&&y<=c.bottom)sx=x>c.right?c.right:c.left;
 const dx=x-sx,dy=y-sy,len=Math.hypot(dx,dy)||1,nx=dx/len,ny=dy/len,pad=Math.min(Math.abs(nx)>.001?t.width/2/Math.abs(nx):Infinity,Math.abs(ny)>.001?t.height/2/Math.abs(ny):Infinity)+8,ex=x-nx*pad,ey=y-ny*pad;
 const d=`M${sx},${sy} L${ex},${ey}`;path.forEach(p=>p.setAttribute('d',d));overlay.removeAttribute('hidden');
}
