import * as THREE from 'three';
import {spriteFrame,setAtlasFrame} from './sprite-state.mjs';

// Only small sprite sheets are loaded at runtime, never GLB or FBX.
export async function loadStairCharacter({height=1.08,reduced=false,assetRoot='./assets/'}={}){
  const loader=new THREE.TextureLoader();
  const [idle,walk]=await Promise.all([
    loader.loadAsync(assetRoot+'yellow-idle.webp'),
    loader.loadAsync(assetRoot+'yellow-walk.webp')
  ]);
  for(const texture of [idle,walk]){
    texture.colorSpace=THREE.SRGBColorSpace;
    texture.minFilter=THREE.LinearFilter;
    texture.magFilter=THREE.LinearFilter;
    texture.generateMipmaps=false;
  }
  idle.repeat.set(1/8,1);walk.repeat.set(1/12,1/8);
  const material=new THREE.SpriteMaterial({map:idle,transparent:true,alphaTest:.035,depthTest:true,depthWrite:false,toneMapped:false});
  const sprite=new THREE.Sprite(material);
  const elevation=Math.atan2(11.7-.28,15);
  sprite.center.set(.5,.5-.5*Math.cos(elevation)/1.36);
  sprite.scale.set(1.02*height,1.36*height,1);
  const group=new THREE.Group();group.add(sprite);
  let clock=0,lastWalking=false,direction=null;
  return {group,setOpacity(v){material.opacity=v;},
    update(delta,elapsed,walking,stairs,cameraYaw){
      if(walking&&!lastWalking)clock=0;
      if(walking)clock+=delta*(stairs?.85:1.1);
      lastWalking=walking;
      const frame=spriteFrame(group.rotation.y,cameraYaw,clock,walking&&!reduced,direction);
      direction=frame.direction;
      const texture=walking&&!reduced?walk:idle;
      if(material.map!==texture){material.map=texture;material.needsUpdate=true;}
      if(texture===walk)setAtlasFrame(texture,frame.frame,frame.direction,12,8);
      else setAtlasFrame(texture,frame.direction,0,8,1);
      sprite.position.y=walking&&!reduced?Math.abs(Math.sin(clock/1.1*Math.PI*2))*.012:0;
    },
    dispose(){idle.dispose();walk.dispose();material.dispose();}
  };
}
