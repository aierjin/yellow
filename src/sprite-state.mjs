export const BASE_YAW=-.69;
export const CYCLE_SECONDS=1.1;
export const DIRECTION_HYSTERESIS=Math.PI/36; // 5°，只在边界附近滞回，不拖慢正常转向。

export function spriteDirection(heading,cameraYaw,previousDirection=null){
  const step=Math.PI/4;
  const angle=heading+Math.PI-(cameraYaw-BASE_YAW);
  const nearest=((Math.round(angle/step)%8)+8)%8;
  if(!Number.isInteger(previousDirection))return nearest;
  const center=previousDirection*step;
  const delta=Math.atan2(Math.sin(angle-center),Math.cos(angle-center));
  return Math.abs(delta)<=step/2+DIRECTION_HYSTERESIS?previousDirection:nearest;
}

export function spriteFrame(heading,cameraYaw,elapsed,walking,previousDirection=null){
  const direction=spriteDirection(heading,cameraYaw,previousDirection);
  const frame=walking?Math.floor(((Math.max(0,elapsed)%CYCLE_SECONDS)/CYCLE_SECONDS)*12)%12:0;
  return {direction,frame};
}

// 每个图集单元向内缩 1 个源像素，保留线性过滤，同时避免相邻方向渗入。
export function setAtlasFrame(texture,column,row,columns,rows){
  const width=texture.image?.width||columns,height=texture.image?.height||rows;
  const px=width>columns?1/width:0,py=height>rows?1/height:0;
  texture.repeat.set(1/columns-2*px,1/rows-2*py);
  texture.offset.set(column/columns+px,1-(row+1)/rows+py);
  return {repeatX:texture.repeat.x,repeatY:texture.repeat.y,offsetX:texture.offset.x,offsetY:texture.offset.y};
}
