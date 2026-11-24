/**
 * Dina Dynamics — Theme & Material Configuration
 * 6 interchangeable palettes with metallic silver primary
 * Chanukah Royal is now the default
 */

import { THEMES } from '../../theme-config.js';
export { THEMES };

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
  return window.__DINA_THEME || THEMES['chanukah-royal'];
}

export function setCurrentTheme(themeName) {
  window.__DINA_THEME = THEMES[themeName];
  window.__DINA_THEME_NAME = themeName;
}
