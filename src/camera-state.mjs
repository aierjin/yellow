const BASE_PITCH=Math.atan2(11.7-.28,15),MAX=Math.PI/2;
export function createCameraState(baseYaw){return {yaw:baseYaw,obliqueYaw:baseYaw,pitch:BASE_PITCH,rawPitch:BASE_PITCH,obliquePitch:BASE_PITCH,top:false};}
export function dragOrbit(s,dx,dy){
 s.yaw-=dx*.0035;s.obliqueYaw=s.yaw;
 s.rawPitch=Math.max(.22,Math.min(MAX,s.rawPitch-dy*.0035));
 if(s.top){if(s.rawPitch<78*Math.PI/180)s.top=false;}
 else if(s.rawPitch>=84*Math.PI/180)s.top=true;
 s.pitch=s.top?MAX:s.rawPitch;
 if(!s.top)s.obliquePitch=s.pitch;
}
export function dragCamera(s,yaw){s.yaw=yaw;s.obliqueYaw=yaw;s.top=false;s.pitch=s.rawPitch=s.obliquePitch;}
export function toggleTopView(s){if(s.top){s.top=false;s.pitch=s.rawPitch=s.obliquePitch;s.yaw=s.obliqueYaw;}else{s.obliquePitch=s.pitch;s.obliqueYaw=s.yaw;s.top=true;s.pitch=s.rawPitch=MAX;}}
export function restoreCamera(s,yaw){Object.assign(s,createCameraState(yaw));}
