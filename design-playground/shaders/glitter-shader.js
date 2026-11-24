/**
 * Dina Dynamics — Glitter Shader
 * Real shader-based glitter with per-flake normals and Worley noise
 * 
 * References:
 * - Three.js ShaderMaterial examples
 * - Worley noise implementations (shadertoy.com)
 * - Per-pixel normal perturbation techniques
 */

export const glitterShaderChunk = {
  // Worley noise for per-flake sparkle pattern
  worleyNoise: `
    // Worley noise - cell pattern for glitter flakes
    vec3 worleyNoise(vec3 p, float scale, float seed) {
      p = p * scale;
      vec3 i = floor(p);
      vec3 f = fract(p);
      
      float minDist = 1.0;
      vec3 nearestCell = vec3(0.0);
      
      // Check surrounding cells
      for(int x = -1; x <= 1; x++) {
        for(int y = -1; y <= 1; y++) {
          for(int z = -1; z <= 1; z++) {
            vec3 neighbor = vec3(float(x), float(y), float(z));
            vec3 point = i + neighbor;
            
            // Pseudo-random cell point using hash
            vec3 cellPoint = neighbor + hash3(point + seed);
            cellPoint = fract(cellPoint);
            
            float dist = length(f - (cellPoint - neighbor));
            if(dist < minDist) {
              minDist = dist;
              nearestCell = point;
            }
          }
        }
      }
      
      return vec3(minDist, nearestCell);
    }
  `,
  
  // Hash function for reproducible randomness
  hash3: `
    vec3 hash3(vec3 p) {
      p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
               dot(p, vec3(269.5, 183.3, 246.1)),
               dot(p, vec3(113.5, 271.9, 124.6)));
      return fract(sin(p) * 43758.5453123);
    }
  `,
  
  // Glitter flake normal generation
  glitterFlakeNormal: `
    // Generate per-flake normal with random orientation
    vec3 glitterFlakeNormal(vec3 p, vec3 baseNormal, float flakeSize, float seed) {
      // Get flake pattern from Worley noise
      vec3 worley = worleyNoise(p, 1.0 / flakeSize, seed);
      float flakeDist = worley.x;
      
      // Create edge-based lighting for flake facets
      float edgeSharpness = smoothstep(0.1, 0.0, flakeDist);
      
      // Random rotation per flake using hash of nearest cell
      vec3 randomVec = hash3(worley.yz + seed);
      
      // Create perturbed normal with random tilt
      vec3 perturbedNormal = normalize(
        baseNormal + 
        (randomVec - 0.5) * edgeSharpness * 0.8
      );
      
      return perturbedNormal;
    }
  `
};

export const glitterVertexShader = `
  #include <common>
  #include <uv_pars_vertex>
  #include <displacementmap_pars_vertex>
  #include <fog_pars_vertex>
  #include <normal_pars_vertex>
  #include <morphtarget_pars_vertex>
  #include <skinning_pars_vertex>
  #include <logdepthbuf_pars_vertex>
  #include <clipping_planes_pars_vertex>

  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    #include <uv_vertex>
    #include <skinbase_vertex>
    #include <beginnormal_vertex>
    #include <morphnormal_vertex>
    #include <skinning_normal_vertex>
    #include <defaultnormal_vertex>
    #include <normal_vertex>
    #include <begin_vertex>
    #include <morphtarget_vertex>
    #include <skinning_vertex>
    #include <displacementmap_vertex>
    #include <project_vertex>
    #include <logdepthbuf_vertex>
    #include <clipping_planes_vertex>
    #include <fog_vertex>

    vPosition = transformed;
    vNormal = normalize(normalMatrix * objectNormal);
    vViewPosition = -mvPosition.xyz;
  }
`;

export const glitterFragmentShader = `
  #include <common>
  #include <packing>
  #include <dithering_pars_fragment>
  #include <color_pars_fragment>
  #include <uv_pars_fragment>
  #include <map_pars_fragment>
  #include <alphamap_pars_fragment>
  #include <alphatest_pars_fragment>
  #include <alphahash_pars_fragment>
  #include <aomap_pars_fragment>
  #include <lightmap_pars_fragment>
  #include <emissivemap_pars_fragment>
  #include <envmap_common_pars_fragment>
  #include <envmap_pars_fragment>
  #include <fog_pars_fragment>
  #include <bsdfs>
  #include <lights_pars_begin>
  #include <normal_pars_fragment>
  #include <lights_pars_map>
  #include <lights_phong_pars_fragment>
  #include <shadowmap_pars_fragment>
  #include <bumpmap_pars_fragment>
  #include <normalmap_pars_fragment>
  #include <roughnessmap_pars_fragment>
  #include <metalnessmap_pars_fragment>
  #include <logdepthbuf_pars_fragment>
  #include <clipping_planes_pars_fragment>

  uniform float uFlakeDensity;
  uniform float uFlakeSize;
  uniform float uFlakeChunkiness;
  uniform float uSparkleIntensity;
  uniform vec3 uFlakeColor;
  uniform sampler2D uGlitterTexture;

  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  // Hash function
  vec3 hash3(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return fract(sin(p) * 43758.5453123);
  }

  // Worley noise for glitter cell pattern
  float worleyNoise(vec3 p) {
    p = p * (1.0 / uFlakeSize);
    vec3 i = floor(p);
    vec3 f = fract(p);
    
    float minDist = 1.0;
    for(int x = -1; x <= 1; x++) {
      for(int y = -1; y <= 1; y++) {
        for(int z = -1; z <= 1; z++) {
          vec3 neighbor = vec3(float(x), float(y), float(z));
          vec3 point = i + neighbor;
          vec3 cellPoint = neighbor + hash3(point);
          float dist = length(f - (cellPoint - neighbor));
          minDist = min(minDist, dist);
        }
      }
    }
    return minDist;
  }

  void main() {
    #include <clipping_planes_fragment>
    vec4 diffuseColor = vec4(1.0);
    #include <logdepthbuf_fragment>
    #include <map_fragment>
    #include <color_fragment>
    #include <alphamap_fragment>
    #include <alphatest_fragment>
    #include <alphahash_fragment>
    
    ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));

    #include <normal_fragment_begin>

    // Add glitter per-flake normal perturbation
    float glitterPattern = worleyNoise(vPosition);
    float flakeEdge = smoothstep(uFlakeChunkiness + 0.1, uFlakeChunkiness, glitterPattern);
    
    vec3 flakeRandom = hash3(vPosition + vec3(0.5));
    vec3 glitterNormal = normalize(normal + (flakeRandom - 0.5) * flakeEdge * 0.5);

    #include <normal_fragment_maps>

    // Use perturbed normal for lighting
    normal = normalize(mix(normal, glitterNormal, flakeEdge * 0.6));

    #include <emissivemap_fragment>
    
    // Calculate sparkle/specular highlight
    float sparkle = flakeEdge * uSparkleIntensity;
    vec3 viewDir = normalize(vViewPosition);
    vec3 reflectDir = reflect(viewDir, normal);
    
    diffuseColor.rgb += uFlakeColor * sparkle * 0.5;
    diffuseColor.rgb = mix(diffuseColor.rgb, uFlakeColor, flakeEdge * 0.3);

    #include <lights_fragment_begin>
    #include <lights_fragment_map>
    #include <lights_fragment_maps>
    #include <lights_phong_fragment>
    #include <lights_fragment_end>
    #include <aomap_fragment>
    
    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
    
    outgoingLight += uFlakeColor * sparkle * 2.0;

    #include <envmap_fragment>
    #include <opaque_fragment>
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
    #include <premultiplied_alpha_fragment>
    #include <dithering_fragment>
  }
`;
