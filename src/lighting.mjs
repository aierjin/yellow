/**
 * 光照系统 —— 独立配置/管理器，与关卡数据、解谜逻辑、渲染分离。
 * - LevelLightingConfig：每关一组光照参数。
 * - OKLCH 感知插值（切关平滑过渡），色域安全。
 * - 第一关保留现有实际光照；1→10 从橙红晨光连续过渡到柔和粉蓝。
 * - 预留 11–50 曲线接口（到蓝、绿、金黄），不制作其余 40 关。
 */

/* ============ OKLCH 色彩转换（sRGB <-> OKLCH，用于感知均匀插值） ============ */
function srgbToLinear(c) {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function linearToSrgb(c) {
  c = c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return Math.round(Math.max(0, Math.min(1, c)) * 255);
}

// sRGB -> OKLab（简化 D65，用标准矩阵）
function srgbToOklab(r, g, b) {
  const lr = srgbToLinear(r), lg = srgbToLinear(g), lb = srgbToLinear(b);
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;
  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
  return [
    0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
    1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
  ];
}
function oklabToSrgb(L, a, b) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ * l_ * l_, m = m_ * m_ * m_, s = s_ * s_ * s_;
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
  return [linearToSrgb(r), linearToSrgb(g), linearToSrgb(bl)];
}
function oklabToOklch(L, a, b) {
  const C = Math.sqrt(a * a + b * b);
  const H = Math.atan2(b, a);
  return [L, C, H];
}
function oklchToOklab(L, C, H) {
  return [L, C * Math.cos(H), C * Math.sin(H)];
}

/** 将 0xRRGGBB 转 [r,g,b] */
function hexToRgb(hex) {
  return [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255];
}
/** 将 [r,g,b] 转 0xRRGGBB */
function rgbToHex(rgb) {
  return (rgb[0] << 16) | (rgb[1] << 8) | rgb[2];
}
/** 将 [r,g,b] 转 '#rrggbb' */
function rgbToCss(rgb) {
  return '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('');
}

/** 在 OKLCH 空间插值两个 0xRRGGBB 颜色，返回 0xRRGGBB */
function interpolateColor(hexA, hexB, t) {
  const A = srgbToOklab(...hexToRgb(hexA));
  const B = srgbToOklab(...hexToRgb(hexB));
  const cA = oklabToOklch(...A);
  const cB = oklabToOklch(...B);
  // 色相走最短弧
  let dH = cB[2] - cA[2];
  while (dH > Math.PI) dH -= 2 * Math.PI;
  while (dH < -Math.PI) dH += 2 * Math.PI;
  const L = cA[0] + (cB[0] - cA[0]) * t;
  const C = cA[1] + (cB[1] - cA[1]) * t;
  const H = cA[2] + dH * t;
  const [L2, a2, b2] = oklchToOklab(L, C, H);
  return rgbToHex(oklabToSrgb(L2, a2, b2));
}

/** 数值线性插值 */
function lerp(a, b, t) { return a + (b - a) * t; }
/** 向量线性插值 */
function lerpVec(a, b, t) { return a.map((v, i) => lerp(v, b[i], t)); }

/* ============ 关卡光照配置 ============ */
/**
 * 每关配置字段：
 *   backgroundColor          背景主色（CSS）
 *   skyTop / skyBottom        天空渐变（CSS）
 *   ambientLightColor / ambientLightIntensity
 *   directionalLightColor / directionalLightIntensity
 *   sunPosition               [x, y, z]
 *   shadowIntensity           阴影强度
 *   fogColor / fogDensity
 * 参考环境主色：1 #D98270 → 6 #E3C1BD → 10 柔和粉蓝（7–10 为设计选择）。
 */
const LIGHTING = [
  // 第 1 关：保留现有实际光照（暖橙红晨光）
  {
    backgroundColor: 0xeab09e, skyTop: 0xf9dbc0, skyBottom: 0xe8ab99,
    ambientLightColor: 0xffecd9, ambientLightIntensity: 1.8,
    directionalLightColor: 0xfff7e5, directionalLightIntensity: 2.2,
    sunPosition: [-7, 12, 7], shadowIntensity: 1.0,
    fogColor: 0xeab09e, fogDensity: 0.0,
  },
  // 第 2 关
  {
    backgroundColor: 0xdf917d, skyTop: 0xf7d4bc, skyBottom: 0xe0a086,
    ambientLightColor: 0xffe9d3, ambientLightIntensity: 1.78,
    directionalLightColor: 0xfff3e0, directionalLightIntensity: 2.16,
    sunPosition: [-6.6, 12.2, 7.2], shadowIntensity: 0.98,
    fogColor: 0xe6a38d, fogDensity: 0.004,
  },
  // 第 3 关
  {
    backgroundColor: 0xe6a08a, skyTop: 0xf6d6c2, skyBottom: 0xe5a68f,
    ambientLightColor: 0xffead8, ambientLightIntensity: 1.75,
    directionalLightColor: 0xfff1de, directionalLightIntensity: 2.12,
    sunPosition: [-6.2, 12.4, 7.4], shadowIntensity: 0.96,
    fogColor: 0xe8a893, fogDensity: 0.008,
  },
  // 第 4 关
  {
    backgroundColor: 0xe9ac9a, skyTop: 0xf6dcc9, skyBottom: 0xe8ac99,
    ambientLightColor: 0xffecdc, ambientLightIntensity: 1.72,
    directionalLightColor: 0xfff0dd, directionalLightIntensity: 2.08,
    sunPosition: [-5.8, 12.6, 7.6], shadowIntensity: 0.94,
    fogColor: 0xeab09e, fogDensity: 0.012,
  },
  // 第 5 关
  {
    backgroundColor: 0xe8b8ad, skyTop: 0xf6e0d3, skyBottom: 0xe8b8ac,
    ambientLightColor: 0xffeedf, ambientLightIntensity: 1.68,
    directionalLightColor: 0xfff1e0, directionalLightIntensity: 2.04,
    sunPosition: [-5.4, 12.8, 7.8], shadowIntensity: 0.92,
    fogColor: 0xeab7ae, fogDensity: 0.016,
  },
  // 第 6 关
  {
    backgroundColor: 0xe3c1bd, skyTop: 0xf5e3dc, skyBottom: 0xe4c1bc,
    ambientLightColor: 0xfff0e2, ambientLightIntensity: 1.64,
    directionalLightColor: 0xfff2e4, directionalLightIntensity: 2.0,
    sunPosition: [-5.0, 13.0, 8.0], shadowIntensity: 0.9,
    fogColor: 0xe5c2be, fogDensity: 0.02,
  },
  // 第 7 关：开始偏粉（设计选择）
  {
    backgroundColor: 0xdcc4c8, skyTop: 0xf2e3e3, skyBottom: 0xdcc4c6,
    ambientLightColor: 0xfff1e5, ambientLightIntensity: 1.6,
    directionalLightColor: 0xfff3e8, directionalLightIntensity: 1.96,
    sunPosition: [-4.6, 13.2, 8.2], shadowIntensity: 0.88,
    fogColor: 0xdec6c8, fogDensity: 0.024,
  },
  // 第 8 关
  {
    backgroundColor: 0xd0c5d2, skyTop: 0xeee5e8, skyBottom: 0xd0c5d0,
    ambientLightColor: 0xfff2ea, ambientLightIntensity: 1.56,
    directionalLightColor: 0xfff4ec, directionalLightIntensity: 1.92,
    sunPosition: [-4.2, 13.4, 8.4], shadowIntensity: 0.86,
    fogColor: 0xd3c7d2, fogDensity: 0.028,
  },
  // 第 9 关
  {
    backgroundColor: 0xc2c6da, skyTop: 0xeae7ee, skyBottom: 0xc2c6d8,
    ambientLightColor: 0xfff3ef, ambientLightIntensity: 1.52,
    directionalLightColor: 0xfff5ef, directionalLightIntensity: 1.88,
    sunPosition: [-3.8, 13.6, 8.6], shadowIntensity: 0.84,
    fogColor: 0xc5c8da, fogDensity: 0.032,
  },
  // 第 10 关：柔和粉蓝
  {
    backgroundColor: 0xb4c8e0, skyTop: 0xe6eaf2, skyBottom: 0xb6c8de,
    ambientLightColor: 0xfff5f2, ambientLightIntensity: 1.48,
    directionalLightColor: 0xfff7f2, directionalLightIntensity: 1.84,
    sunPosition: [-3.4, 13.8, 8.8], shadowIntensity: 0.82,
    fogColor: 0xb8c9df, fogDensity: 0.036,
  },
];

/**
 * 获取某关（0-based index）的光照配置。
 * 防御：index 必须为有限数字，否则回退到第 1 关（防止事件对象等污染引发 NaN 光照）。
 * 超出 1–10 的关卡（11–50 预留接口）走「延展曲线」：橙红→蓝→绿→金黄，
 * 目前仅返回一个平滑延展值，不制作其余 40 关。
 */
export function getLighting(index) {
  if (typeof index !== 'number' || !Number.isFinite(index) || index < 0) index = 0;
  if (index >= 0 && index < LIGHTING.length) return LIGHTING[index];
  if(index>=10&&index<20){const t=(index-9)/10,c=interpolateColor(0xb4c8e0,0xa09cc9,t);return {...LIGHTING[9],backgroundColor:c,skyTop:c,skyBottom:c,fogColor:c};}
  if(index>=20&&index<30){const t=(index-19)/10,c=interpolateColor(0xb4c4ba,0x9dbd91,t);return {...LIGHTING[9],backgroundColor:c,skyTop:c,skyBottom:c,fogColor:c,ambientLightColor:0xf3f5df};}
  if(index>=30&&index<38){const t=(index-30)/7,c=interpolateColor(0xe8c9b1,0xe5bf97,t);return {...LIGHTING[0],backgroundColor:c,skyTop:c,skyBottom:c,fogColor:c};}
  if(index>=38&&index<46){const t=(index-37)/8,c=interpolateColor(0xe5bf97,0xd4b3b6,t);return {...LIGHTING[0],backgroundColor:c,skyTop:c,skyBottom:c,fogColor:c};}
  if(index>=46&&index<50){const c=interpolateColor(0xd4b3b6,0xe2bbb0,(index-45)/4);return {...LIGHTING[0],backgroundColor:c,skyTop:c,skyBottom:c,fogColor:c};}
  if(index>=52){const t=Math.min(1,(index-51)/6),c=interpolateColor(0xe6c183,0x7187ab,t);return {...LIGHTING[9],backgroundColor:c,skyTop:c,skyBottom:c,fogColor:c,ambientLightColor:0xdce6ff,ambientLightIntensity:1.45,directionalLightColor:0xffdfae,directionalLightIntensity:1.65};}
  if(index>=50&&index<=54){const c=interpolateColor(0xe2bbb0,0xeac66d,(index-49)/5);return {...LIGHTING[0],backgroundColor:c,skyTop:c,skyBottom:c,fogColor:c,directionalLightColor:0xffedc8};}
  // Later chapters reserved
  const last = LIGHTING[LIGHTING.length - 1];
  const k = Math.min(1, (index - LIGHTING.length) / 40);
  return {
    backgroundColor: interpolateColor(last.backgroundColor, 0xe8c76a, k),
    skyTop: interpolateColor(last.skyTop, 0xf2e6b0, k),
    skyBottom: interpolateColor(last.skyBottom, 0xe0b860, k),
    ambientLightColor: interpolateColor(last.ambientLightColor, 0xfff0c0, k),
    ambientLightIntensity: lerp(last.ambientLightIntensity, 1.4, k),
    directionalLightColor: interpolateColor(last.directionalLightColor, 0xfff0b8, k),
    directionalLightIntensity: lerp(last.directionalLightIntensity, 1.8, k),
    sunPosition: lerpVec(last.sunPosition, [-2, 14, 9], k),
    shadowIntensity: lerp(last.shadowIntensity, 0.8, k),
    fogColor: interpolateColor(last.fogColor, 0xe0c070, k),
    fogDensity: lerp(last.fogDensity, 0.04, k),
  };
}

/**
 * 在任意两关（可跨关）之间做整组光照参数的 OKLCH 平滑插值。
 * 用于切关时的连续过渡（无闪白/闪黑）。
 */
export function interpolateLighting(fromIndex, toIndex, t) {
  const A = getLighting(fromIndex);
  const B = getLighting(toIndex);
  return {
    backgroundColor: interpolateColor(A.backgroundColor, B.backgroundColor, t),
    skyTop: interpolateColor(A.skyTop, B.skyTop, t),
    skyBottom: interpolateColor(A.skyBottom, B.skyBottom, t),
    ambientLightColor: interpolateColor(A.ambientLightColor, B.ambientLightColor, t),
    ambientLightIntensity: lerp(A.ambientLightIntensity, B.ambientLightIntensity, t),
    directionalLightColor: interpolateColor(A.directionalLightColor, B.directionalLightColor, t),
    directionalLightIntensity: lerp(A.directionalLightIntensity, B.directionalLightIntensity, t),
    sunPosition: lerpVec(A.sunPosition, B.sunPosition, t),
    shadowIntensity: lerp(A.shadowIntensity, B.shadowIntensity, t),
    fogColor: interpolateColor(A.fogColor, B.fogColor, t),
    fogDensity: lerp(A.fogDensity, B.fogDensity, t),
  };
}

export { LIGHTING, interpolateColor, rgbToCss, hexToRgb };
