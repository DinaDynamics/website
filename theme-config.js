// Shared by the homepage and the internal material playground.
// Change data-theme on the homepage's <html> element to select a palette.
export const THEMES = {
  'chanukah-royal': { id: 'chanukah-royal', name: 'Chanukah Royal', silver: '#C0C0C0', darkBg: '#050F20', deepBlue: '#0038B8', accentPrimary: '#0066FF', accentLight: '#70B9FF' },
  'electric-cobalt': { id: 'electric-cobalt', name: 'Electric Cobalt', silver: '#C0C0C0', darkBg: '#050F20', deepBlue: '#0047AB', accentPrimary: '#007BFF', accentLight: '#70B9FF' },
  'imperial-sapphire': { id: 'imperial-sapphire', name: 'Imperial Sapphire', silver: '#C0C0C0', darkBg: '#081426', deepBlue: '#123B78', accentPrimary: '#2463EB', accentLight: '#A7C7E7' },
  'arctic-steel': { id: 'arctic-steel', name: 'Arctic Steel', silver: '#C0C0C0', darkBg: '#101C2C', deepBlue: '#345675', accentPrimary: '#7099BB', accentLight: '#D3E9F5' },
  'deep-atlantic': { id: 'deep-atlantic', name: 'Deep Atlantic', silver: '#C0C0C0', darkBg: '#031E30', deepBlue: '#00506E', accentPrimary: '#0087A3', accentLight: '#8CC9DA' },
  'midnight-titanium': { id: 'midnight-titanium', name: 'Midnight Titanium', silver: '#C0C0C0', darkBg: '#080D17', deepBlue: '#192B49', accentPrimary: '#4568A0', accentLight: '#B0C4DE' }
};

export function applyTheme(name = 'electric-cobalt') {
  const theme = THEMES[name] || THEMES['electric-cobalt'];
  const root = document.documentElement;
  root.dataset.theme = theme.id;
  Object.entries({ '--brand-silver': theme.silver, '--bg-primary': theme.darkBg, '--accent-deep': theme.deepBlue, '--accent-primary': theme.accentPrimary, '--accent-light': theme.accentLight }).forEach(([key, value]) => root.style.setProperty(key, value));
  return theme;
}