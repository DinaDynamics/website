/**
 * Dina Dynamics — Theme & Material Configuration
 * 5 interchangeable palettes with metallic silver primary
 */

export const THEMES = {
  'electric-cobalt': {
    id: 'electric-cobalt',
    name: 'Electric Cobalt',
    silver: '#C0C0C0',
    darkBg: '#050F20',
    deepBlue: '#0047AB',
    accentPrimary: '#007BFF',
    accentLight: '#70B9FF'
  },
  'imperial-sapphire': {
    id: 'imperial-sapphire',
    name: 'Imperial Sapphire',
    silver: '#C0C0C0',
    darkBg: '#081426',
    deepBlue: '#123B78',
    accentPrimary: '#2463EB',
    accentLight: '#A7C7E7'
  },
  'arctic-steel': {
    id: 'arctic-steel',
    name: 'Arctic Steel',
    silver: '#C0C0C0',
    darkBg: '#101C2C',
    deepBlue: '#345675',
    accentPrimary: '#7099BB',
    accentLight: '#D3E9F5'
  },
  'deep-atlantic': {
    id: 'deep-atlantic',
    name: 'Deep Atlantic',
    silver: '#C0C0C0',
    darkBg: '#031E30',
    deepBlue: '#00506E',
    accentPrimary: '#0087A3',
    accentLight: '#8CC9DA'
  },
  'midnight-titanium': {
    id: 'midnight-titanium',
    name: 'Midnight Titanium',
    silver: '#C0C0C0',
    darkBg: '#080D17',
    deepBlue: '#192B49',
    accentPrimary: '#4568A0',
    accentLight: '#B0C4DE'
  }
};

export const MATERIAL_PRESETS = {
  'silver-chunky': {
    id: 'silver-chunky',
    name: 'Silver Chunky Glitter',
    baseColor: '#C0C0C0',
    metalness: 1.0,
    roughness: 0.15,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
    flakeDensity: 0.75,
    flakeSize: 0.15,
    flakeChunkiness: 0.4,
    sparkleIntensity: 2.0
  },
  'silver-fine': {
    id: 'silver-fine',
    name: 'Silver Fine Glitter',
    baseColor: '#C0C0C0',
    metalness: 1.0,
    roughness: 0.08,
    clearcoat: 0.95,
    clearcoatRoughness: 0.05,
    flakeDensity: 0.95,
    flakeSize: 0.05,
    flakeChunkiness: 0.1,
    sparkleIntensity: 1.5
  },
  'silver-mixed': {
    id: 'silver-mixed',
    name: 'Silver Mixed Glitter',
    baseColor: '#C0C0C0',
    metalness: 1.0,
    roughness: 0.12,
    clearcoat: 0.92,
    clearcoatRoughness: 0.08,
    flakeDensity: 0.85,
    flakeSize: 0.1,
    flakeChunkiness: 0.25,
    sparkleIntensity: 1.8
  },
  'cobalt-glitter': {
    id: 'cobalt-glitter',
    name: 'Cobalt Glitter',
    baseColor: '#007BFF',
    metalness: 0.9,
    roughness: 0.2,
    clearcoat: 0.8,
    clearcoatRoughness: 0.15,
    flakeDensity: 0.8,
    flakeSize: 0.12,
    flakeChunkiness: 0.35,
    sparkleIntensity: 2.2
  },
  'polished-metal': {
    id: 'polished-metal',
    name: 'Polished Metal',
    baseColor: '#C0C0C0',
    metalness: 1.0,
    roughness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    flakeDensity: 0.0,
    flakeSize: 0.0,
    flakeChunkiness: 0.0,
    sparkleIntensity: 0.0
  }
};

export function hexToRGB(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 192, g: 192, b: 192 };
}

export function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function getCurrentTheme() {
  return window.__DINA_THEME || THEMES['electric-cobalt'];
}

export function setCurrentTheme(themeName) {
  window.__DINA_THEME = THEMES[themeName];
  window.__DINA_THEME_NAME = themeName;
}
