export function facingHeading(a,b){return Math.atan2(-(b.x-a.x),-(b.z-a.z));}
export function createPursuit(){return {target:'waiting',targetTime:0,player:'following',playerTime:0,hold:0,next:false};}
export function advancePursuit(s,dt,progress,arrived){
 if(s.target==='waiting'&&progress>=.5)s.target='leaving';
 if(s.target==='leaving'){s.targetTime+=dt;if(s.targetTime>=1.6)s.target='gone';}
 if(s.player==='following'&&arrived)s.player='entering';
 if(s.player==='entering'){s.playerTime+=dt;if(s.playerTime>=1.1)s.player='gone';}
 if(s.player==='gone'&&s.target==='gone'){s.hold+=dt;if(s.hold>=.7)s.next=true;}
 return s;
}
