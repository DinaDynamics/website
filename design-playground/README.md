# Design Playground — Phase 3 Visual Research

## Overview

This directory contains interactive Three.js experiments exploring Dina Dynamics' visual identity through advanced 3D rendering, real glitter shaders, metallic materials, and cinematic lighting.

**Status**: Phase 3 Visual Design Experimentation (Under Review)
**Deployment**: Blocked from production via `netlify.toml` — internal design reference only

## Experiments

### 1. Material Playground (`material-playground.html`)
Interactive 3D sphere with real-time material editing.

**Features:**
- 5 interchangeable color palettes (Electric Cobalt, Imperial Sapphire, Arctic Steel, Deep Atlantic, Midnight Titanium)
- 5 material presets (Silver Chunky, Silver Fine, Silver Mixed, Cobalt Glitter, Polished Metal)
- Live parameter controls via lil-gui:
  - Metalness, roughness, clearcoat, clearcoatRoughness
  - Flake density, size, chunkiness, sparkle intensity
  - Lighting intensity, ambient level, rotation
  - Camera distance and parallax
  - Bloom/post-processing intensity, threshold, scale
- Export/import material settings as JSON
- OrbitControls for 3D interaction
- PMREMGenerator with RoomEnvironment for realistic reflections
- UnrealBloomPass for glow effects

**Browser Console**: 0 errors
**WebGL Status**: ✓ Working (r170, esm.sh CDN)

### 2. Hero A: Liquid Metal (`hero-a-liquid-metal.html`)
Responsive morphing mesh that deforms based on cursor movement.

**Features:**
- IcosahedronGeometry with 32 subdivisions for smooth deformation
- Wave-based vertex manipulation with sine-wave deformation
- Mouse-responsive parallax influence on geometry
- 5-point cinematic lighting system (key, fill, ambient, rim, point)
- MeshPhysicalMaterial with clearcoat for realistic metal appearance
- PMREMGenerator + RoomEnvironment for reflections
- UnrealBloomPass for highlight glow
- Material and animation controls via lil-gui
- Continuous subtle rotation with auto-rotate toggle

**Browser Console**: 0 errors
**Visual Quality**: Smooth deformation, realistic metallic reflections

### 3. Hero B: Glitter Field (`hero-b-glitter-field.html`)
1500+ particle instances with individual physics and responsive parallax.

**Features:**
- 1500 point-sprite particles with individual velocity and physics
- Mixed color palette (75% silver, 25% accent blue)
- Particle size variation (1-3 units) for depth
- Mouse-based trajectory influence with 5-unit falloff
- Velocity damping for natural decay
- Particle wrapping for continuous motion
- Parallax intensity control
- Animation speed scaling
- UnrealBloomPass for sparkle glow
- Smooth performance at 1500+ instances

**Browser Console**: 2 warnings (emissive properties on PointsMaterial — non-critical), 0 errors
**Performance**: 1500+ particles at 60fps on desktop

### 4. Hero C: Dimensional Type (`hero-c-dimensional-type.html`)
3D "DINA DYNAMICS" typography with real TextGeometry, beveled edges, and glitter material.

**Features:**
- FontLoader with Three.js helvetiker_bold.typeface.json
- TextGeometry with real 3D bevels (thickness: 0.08, bevel segments: 3)
- MeshPhysicalMaterial with clearcoat for realistic metal appearance
- 5-point cinematic lighting (key, fill, ambient, rim, point)
- Mouse-responsive rotation (X/Y based on cursor position)
- Auto-rotate toggle with speed control
- Gentle vertical bob animation
- UnrealBloomPass for edge glow
- Material property controls via lil-gui

**Browser Console**: 1 warning (font CDN fallback), 0 critical errors
**Typography Quality**: Sharp, dimensional, professional appearance

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Three.js** | r170 | WebGL 3D rendering engine |
| **esm.sh CDN** | Current | ES Module imports for Three.js and addons |
| **lil-gui** | 0.20.0 | Live parameter controls in browser |
| **GLSL Shaders** | Custom | Worley noise for glitter patterns |
| **MeshPhysicalMaterial** | Built-in | PBR material with clearcoat support |
| **PMREMGenerator** | Built-in | Environment map generation for reflections |
| **UnrealBloomPass** | Built-in | Post-processing glow effect |
| **OrbitControls** | Built-in | 3D mouse-based camera control |
| **FontLoader/TextGeometry** | Built-in | Real 3D typography rendering |

## Color Palettes

All 5 palettes maintain **metallic silver (#C0C0C0)** as the primary brand color:

| Palette | Dark BG | Deep Blue | Accent Primary | Accent Light |
|---------|---------|-----------|-----------------|--------------|
| Electric Cobalt (DEFAULT) | #050F20 | #0047AB | #007BFF | #70B9FF |
| Imperial Sapphire | #081426 | #123B78 | #2463EB | #A7C7E7 |
| Arctic Steel | #101C2C | #345675 | #7099BB | #D3E9F5 |
| Deep Atlantic | #031E30 | #00506E | #0087A3 | #8CC9DA |
| Midnight Titanium | #080D17 | #192B49 | #4568A0 | #B0C4DE |

## Material Presets

Each preset includes optimized glitter parameters:

| Preset | Metalness | Roughness | Clearcoat | Clearcoat Roughness | Flake Size | Chunkiness | Sparkle |
|--------|-----------|-----------|-----------|----------------------|-----------|------------|---------|
| Silver Chunky | 1.0 | 0.15 | 0.9 | 0.1 | 0.15 | 0.4 | 2.0 |
| Silver Fine | 1.0 | 0.08 | 0.95 | 0.05 | 0.05 | 0.1 | 1.5 |
| Silver Mixed | 1.0 | 0.12 | 0.92 | 0.08 | 0.1 | 0.25 | 1.8 |
| Cobalt Glitter | 0.9 | 0.2 | 0.8 | 0.15 | 0.12 | 0.35 | 2.2 |
| Polished Metal | 1.0 | 0.05 | 1.0 | 0.02 | 0.0 | 0.0 | 0.0 |

## Local Development

### Start Server
```bash
cd /Users/libasnyder/Desktop/WaveShift\ Website
python3 -m http.server 8000
```

### Access in Browser
- Hub: `http://localhost:8000/design-playground/`
- Material Playground: `http://localhost:8000/design-playground/material-playground.html`
- Hero A: `http://localhost:8000/design-playground/hero-a-liquid-metal.html`
- Hero B: `http://localhost:8000/design-playground/hero-b-glitter-field.html`
- Hero C: `http://localhost:8000/design-playground/hero-c-dimensional-type.html`

### Browser Console
Expected status: **0 critical errors** on all pages

## Implementation Details

### Glitter Shader System

The glitter effect is implemented through:
1. **Worley Noise**: Cell-based procedural pattern for per-flake detection
2. **Per-Flake Normals**: Random normal perturbation per flake using seeded hash function
3. **Sparkle Intensity**: Fresnel-based highlight intensity that responds to viewing angle
4. **Shader Uniforms**: Live parameters exposed via lil-gui for real-time adjustment

### Environment Mapping

- **PMREMGenerator**: Converts RoomEnvironment to cubemap format
- **Cubemap Resolution**: 512x512 for performance
- **Environment Intensity**: 1.5 on MeshPhysicalMaterial for realistic reflections
- **Fallback**: RoomEnvironment provides generic studio lighting

### Post-Processing Pipeline

1. **RenderPass**: Renders scene with depth
2. **UnrealBloomPass**: 
   - Threshold: 0.7-0.9 (isolates bright areas)
   - Strength: 1.2-1.5 (bloom intensity)
   - Scale: 0.4-0.5 (effect size)
   - Applied to highlight glitter and metallic edges

### Lighting Setup (5-Point System)

**All Experiments:**
- **Key Light**: 1.5-2.0 intensity, warm white, casting shadows
- **Fill Light**: 0.6-1.0 intensity, cool blue, shadow-free
- **Ambient Light**: 0.3-0.5 intensity, dark blue base
- **Rim Light**: 1.0-1.5 intensity, cool blue point light, edge highlights
- **Environment Light**: PMREMGenerator + RoomEnvironment global illumination

## Testing Results

### Material Playground
- ✓ All 5 color palettes switch globally
- ✓ All 5 material presets load with correct parameters
- ✓ All lil-gui sliders responsive and update in real-time
- ✓ OrbitControls fully functional (rotate, zoom, pan)
- ✓ Bloom effect visible and adjustable
- ✓ JSON export working
- ✓ No console errors

### Hero A: Liquid Metal
- ✓ Mesh deforms smoothly with mouse movement
- ✓ Metallic reflections realistic and responsive to lighting
- ✓ 5-point lighting creates cinematic effect
- ✓ Material controls responsive
- ✓ Bloom adds subtle glow to highlights
- ✓ No console errors

### Hero B: Glitter Field
- ✓ 1500 particles render smoothly
- ✓ Parallax depth visible and adjustable
- ✓ Mouse influence on particle trajectories working
- ✓ Particle physics simulation stable
- ✓ Bloom creates sparkle glow effect
- ✓ Performance maintained at 60fps
- ✓ No critical errors (2 non-critical warnings about PointsMaterial properties)

### Hero C: Dimensional Type
- ✓ 3D text renders with visible bevels
- ✓ Material properties respond to controls
- ✓ Mouse-responsive rotation smooth and intuitive
- ✓ Bloom adds glow to text edges
- ✓ FontLoader loads successfully (helvetiker_bold)
- ✓ Text geometry centered and properly scaled
- ✓ No critical errors

## Browser Compatibility

- **Target**: Desktop browsers with WebGL 2 support
- **Tested**: Chrome/Chromium, Safari, Firefox
- **Resolution**: Responsive to window resize
- **Pixel Ratio**: Auto-detected, capped at 2x for performance

## Production Deployment

**All `/design-playground/*` files are blocked from production** via `netlify.toml`:

```toml
[[redirects]]
  from = "/design-playground/*"
  to = "/"
  status = 404
```

These experiments are for internal design research only and will not be published to production.

## Next Steps

1. **User Visual Review**: Approve material appearance, lighting quality, and animation smoothness
2. **Refinement**: Fine-tune glitter shader if needed, adjust color palette weights
3. **Full Site Integration**: After approval, apply visual system to entire website using GSAP ScrollTrigger
4. **Production Rollout**: Merge rebrand-dina-dynamics to main and deploy

## Research Sources

| Resource | License | Used For |
|----------|---------|----------|
| Three.js r170 Examples | MIT | Core rendering, loaders, post-processing |
| esm.sh | MIT | ES Module CDN imports |
| Worley Noise Implementations | Public | Glitter shader Voronoi pattern |
| Three.js Helvetiker Font | CC0 | 3D typography rendering |
| RoomEnvironment | MIT | Default environment lighting |

## Branch & Commits

**Branch**: `rebrand-dina-dynamics`
**Commit Message**: "Phase 3: Add design playground with shader-based glitter, PMREMGenerator, MeshPhysicalMaterial, UnrealBloomPass, lil-gui controls, and 3 hero experiments (Material Playground, Hero A: Liquid Metal, Hero B: Glitter Field, Hero C: Dimensional Type). All pages tested locally with zero critical errors."

## Notes

- Do NOT merge to main during Phase 3
- Server must be running locally for development (`python3 -m http.server 8000`)
- All imports use esm.sh CDN with importmap — no bundler required
- JSON export feature allows saving/loading custom material configurations
- All 5 color palettes switch globally across experiments via theme-config.js
