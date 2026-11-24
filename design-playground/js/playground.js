/**
 * Dina Dynamics — Three.js Material Playground
 * Foundation for 3D experiments with glitter, metallic surfaces, and shader effects
 */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@r128/build/three.module.js';
import { applyTheme, getCurrentTheme, hexToRGBNormalized, MATERIAL_PRESETS, THEMES } from './theme-config.js';

class DinaPlayground {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.canvas = null;
    this.materials = {};
    this.meshes = [];
    this.shaders = {};
    this.time = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.containerWidth = window.innerWidth;
    this.containerHeight = window.innerHeight;
    
    this.init();
  }

  /**
   * Initialize Three.js scene, camera, and renderer
   */
  init() {
    // Create canvas container
    this.canvas = document.getElementById('canvas-container');
    if (!this.canvas) {
      console.error('Canvas container not found');
      return;
    }

    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.getThemeColor('darkBg'));
    this.scene.fog = new THREE.Fog(this.getThemeColor('darkBg'), 100, 1000);

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.containerWidth / this.containerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      precision: 'highp',
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.containerWidth, this.containerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.canvas.appendChild(this.renderer.domElement);

    // Lighting setup
    this.setupLighting();

    // Event listeners
    this.setupEventListeners();

    // Start animation loop
    this.animate();

    console.log('Dina Playground initialized with Electric Cobalt theme');
  }

  /**
   * Setup lights for dramatic cinematic effect
   */
  setupLighting() {
    // Main directional light (dramatic key light)
    const keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.2);
    keyLight.position.set(5, 10, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    this.scene.add(keyLight);

    // Fill light (reduces harsh shadows)
    const fillLight = new THREE.DirectionalLight(0x70B9FF, 0.5);
    fillLight.position.set(-5, 5, -5);
    this.scene.add(fillLight);

    // Ambient light (overall illumination)
    const ambientLight = new THREE.AmbientLight(0x1a2a4a, 0.4);
    this.scene.add(ambientLight);

    // Accent light (adds rim/edge highlight)
    const rimLight = new THREE.DirectionalLight(0x007BFF, 0.6);
    rimLight.position.set(0, 0, 10);
    this.scene.add(rimLight);
  }

  /**
   * Get theme color by key
   */
  getThemeColor(key) {
    const theme = getCurrentTheme();
    const colorMap = {
      'darkBg': theme.darkBg,
      'silver': theme.silver,
      'accentPrimary': theme.accentPrimary,
      'accentLight': theme.accentLight,
      'deepBlue': theme.deepBlue
    };
    return colorMap[key] || theme.silver;
  }

  /**
   * Create a glitter material with procedural particle effect
   */
  createGlitterMaterial(preset = 'silver-chunky') {
    const presetConfig = MATERIAL_PRESETS[preset];
    if (!presetConfig) {
      console.warn(`Preset '${preset}' not found, using silver-chunky`);
      return this.createGlitterMaterial('silver-chunky');
    }

    const baseColor = new THREE.Color(presetConfig.baseColor);
    const themeAccent = new THREE.Color(this.getThemeColor('accentPrimary'));

    // Create canvas texture for glitter
    const canvas = this.createGlitterTexture(presetConfig);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      color: baseColor,
      metalness: presetConfig.metalness,
      roughness: presetConfig.roughness,
      emissive: themeAccent,
      emissiveIntensity: 0.1,
      envMapIntensity: 1.0
    });

    return material;
  }

  /**
   * Generate procedural glitter texture using canvas
   */
  createGlitterTexture(preset) {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Base metallic background
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, preset.baseColor);
    gradient.addColorStop(1, '#B0B0B0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Draw glitter particles
    const particleCount = Math.floor(preset.glitterDensity * 500);
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const minSize = preset.particleSize.min;
      const maxSize = preset.particleSize.max;
      const radius = minSize + Math.random() * (maxSize - minSize);
      
      // Vary opacity for depth
      const opacity = Math.random() * 0.8 + 0.2;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Add subtle shadow for depth
      ctx.fillStyle = `rgba(0, 0, 0, ${opacity * 0.3})`;
      ctx.beginPath();
      ctx.arc(x + 2, y + 2, radius * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }

    return canvas;
  }

  /**
   * Create polished metal material
   */
  createPolishedMetalMaterial() {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.getThemeColor('silver')),
      metalness: 1.0,
      roughness: 0.1,
      envMapIntensity: 1.0
    });
  }

  /**
   * Add demo object to scene
   */
  addDemoSphere() {
    const geometry = new THREE.SphereGeometry(2, 128, 128);
    const material = this.createGlitterMaterial('silver-chunky');
    const sphere = new THREE.Mesh(geometry, material);
    
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.userData.rotationSpeed = 0.001;
    
    this.scene.add(sphere);
    this.meshes.push(sphere);
    
    return sphere;
  }

  /**
   * Setup event listeners for interactivity
   */
  setupEventListeners() {
    // Window resize
    window.addEventListener('resize', () => this.onWindowResize());

    // Mouse tracking for cursor-responsive effects
    document.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX / this.containerWidth) * 2 - 1;
      this.mouseY = -(e.clientY / this.containerHeight) * 2 + 1;
    });

    // Theme switcher
    const themeSwitcher = document.getElementById('theme-switcher');
    if (themeSwitcher) {
      themeSwitcher.addEventListener('change', (e) => {
        this.switchTheme(e.target.value);
      });
    }

    // Preset switcher
    const presetSwitcher = document.getElementById('preset-switcher');
    if (presetSwitcher) {
      presetSwitcher.addEventListener('change', (e) => {
        this.switchMaterialPreset(e.target.value);
      });
    }
  }

  /**
   * Switch theme and update scene
   */
  switchTheme(themeName) {
    applyTheme(themeName);
    
    // Update scene background
    const theme = THEMES[themeName];
    this.scene.background.setHex(parseInt(theme.darkBg.slice(1), 16));
    this.scene.fog.color.setHex(parseInt(theme.darkBg.slice(1), 16));

    console.log(`Switched to ${themeName} theme`);
  }

  /**
   * Switch material preset for visible mesh
   */
  switchMaterialPreset(preset) {
    if (this.meshes.length > 0) {
      this.meshes[0].material = this.createGlitterMaterial(preset);
    }
  }

  /**
   * Handle window resize
   */
  onWindowResize() {
    this.containerWidth = window.innerWidth;
    this.containerHeight = window.innerHeight;

    this.camera.aspect = this.containerWidth / this.containerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.containerWidth, this.containerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  /**
   * Animation loop
   */
  animate = () => {
    requestAnimationFrame(this.animate);

    this.time += 0.016; // ~60fps

    // Rotate mesh
    this.meshes.forEach(mesh => {
      if (mesh.userData.rotationSpeed) {
        mesh.rotation.x += mesh.userData.rotationSpeed;
        mesh.rotation.y += mesh.userData.rotationSpeed * 1.5;
      }
    });

    this.renderer.render(this.scene, this.camera);
  };
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  window.playground = new DinaPlayground();
});

export { DinaPlayground };
