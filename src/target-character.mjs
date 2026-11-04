import * as THREE from 'three';
import {spriteFrame,setAtlasFrame} from './sprite-state.mjs';
export async function loadTarget(){
 const map=await new THREE.TextureLoader().loadAsync('./assets/target-idle.webp');
 map.colorSpace=THREE.SRGBColorSpace;map.repeat.set(1/8,1);map.generateMipmaps=false;map.minFilter=THREE.LinearFilter;
 const material=new THREE.SpriteMaterial({map,transparent:true,alphaTest:.025,depthWrite:false,toneMapped:false});
 const sprite=new THREE.Sprite(material);sprite.center.set(.5,1-233/256);sprite.scale.set(.80,1.07,1);
 const group=new THREE.Group();group.add(sprite);
 let direction=null;
 return {group,setOpacity(v){material.opacity=v;},update(yaw){
  // Atlas front is direction 4 in this supplied, visually inspected sheet.
  direction=spriteFrame(group.rotation.y+Math.PI,yaw,0,false,direction).direction;
  setAtlasFrame(map,direction,0,8,1);
 },dispose(){map.dispose();material.dispose();}};
}
