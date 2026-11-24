/**
 * Dina Dynamics — Centralized Theme Configuration
 * 
 * Single source of truth for all 5 interchangeable color palettes.
 * All palettes maintain metallic silver (#C0C0C0) as primary brand color.
 * 
 * Usage:
 *   - Apply theme via: document.documentElement.setAttribute('data-theme', 'electric-cobalt')
 *   - Access colors in JS: THEMES['electric-cobalt'].silver
 *   - Use CSS variables: var(--brand-silver), var(--accent-primary), etc.
 */

export const THEMES = {
  'imperial-sapphire': {
    name: 'Imperial Sapphire',
    silver: '#C0C0C0',
    darkBg: '#081426',
    deepBlue: '#123B78',
    accentPrimary: '#2463EB',
    accentLight: '#A7C7E7',
    white: '#FFFFFF'
  },
  'arctic-steel': {
    name: 'Arctic Steel',
    silver: '#C0C0C0',
    darkBg: '#101C2C',
    deepBlue: '#345675',
    accentPrimary: '#7099BB',
    accentLight: '#D3E9F5',
    white: '#FFFFFF'
  },
  'electric-cobalt': {
    name: 'Electric Cobalt',
    silver: '#C0C0C0',
    darkBg: '#050F20',
    deepBlue: '#0047AB',
    accentPrimary: '#007BFF',
    accentLight: '#70B9FF',
    white: '#FFFFFF'
  },
  'deep-atlantic': {
    name: 'Deep Atlantic',
    silver: '#C0C0C0',
    darkBg: '#031E30',
    deepBlue: '#00506E',
    accentPrimary: '#0087A3',
    accentLight: '#8CC9DA',
    white: '#FFFFFF'
  },
  'midnight-titanium': {
    name: 'Midnight Titanium',
    silver: '#C0C0C0',
    darkBg: '#080D17',
    deepBlue: '#192B49',
    accentPrimary: '#4568A0',
    accentLight: '#B0C4DE',
    white: '#FFFFFF'
  }
};

/**
 * Apply theme to document and trigger CSS variable updates
 */
export function applyTheme(themeName = 'electric-cobalt') {
  if (!THEMES[themeName]) {
    console.error(`Theme '${themeName}' not found. Using default.`);
    themeName = 'electric-cobalt';
  }
  
  const theme = THEMES[themeName];
  const root = document.documentElement;
  
  // Set CSS variables for theme
  root.setAttribute('data-theme', themeName);
  root.style.setProperty('--brand-silver', theme.silver);
  root.style.setProperty('--bg-primary', theme.darkBg);
  root.style.setProperty('--accent-deep', theme.deepBlue);
  root.style.setProperty('--accent-primary', theme.accentPrimary);
  root.style.setProperty('--accent-light', theme.accentLight);
  root.style.setProperty('--text-primary', theme.white);
  
  // Store for shader/WebGL access
  window.__DINA_THEME = theme;
  window.__DINA_THEME_NAME = themeName;
}

/**
 * Get current theme object
 */
export function getCurrentTheme() {
  return window.__DINA_THEME || THEMES['electric-cobalt'];
}

/**
 * Convert hex color to RGB normalized (0-1 range) for GLSL uniforms
 */
export function hexToRGBNormalized(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  };
}

/**
 * Material preset configurations for glitter and metallic effects
 */
export const MATERIAL_PRESETS = {
  'silver-chunky': {
    name: 'Silver Chunky Glitter',
    baseColor: '#C0C0C0',
    glitterDensity: 0.8,
    particleSize: { min: 2, max: 8 },
    roughness: 0.3,
    metalness: 1.0,
    chunkiness: 0.9
  },
  'silver-fine': {
    name: 'Silver Fine Glitter',
    baseColor: '#C0C0C0',
    glitterDensity: 0.95,
    particleSize: { min: 0.5, max: 2 },
    roughness: 0.2,
    metalness: 1.0,
    chunkiness: 0.1
  },
  'silver-mixed': {
    name: 'Silver Mixed Glitter',
    baseColor: '#C0C0C0',
    glitterDensity: 0.85,
    particleSize: { min: 1, max: 6 },
    roughness: 0.25,
    metalness: 1.0,
    chunkiness: 0.5
  },
  'cobalt-glitter': {
    name: 'Cobalt Glitter',
    baseColor: '#007BFF',
    glitterDensity: 0.8,
    particleSize: { min: 1.5, max: 7 },
    roughness: 0.3,
    metalness: 0.95,
    chunkiness: 0.7
  },
  'polished-metal': {
    name: 'Polished Metal',
    baseColor: '#C0C0C0',
    glitterDensity: 0.0,
    particleSize: { min: 0, max: 0 },
    roughness: 0.1,
    metalness: 1.0,
    chunkiness: 0.0
  }
};

// Initialize with default theme on load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme('electric-cobalt');
  });
}
