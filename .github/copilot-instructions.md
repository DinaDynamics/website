# DINA — GitHub Copilot Instructions

## 1. Project identity

This repository contains the DINA company website, representing an advanced engineering, maritime robotics, autonomy and defense technology company.

- Brand name: DINA (not WAVESHIFT).
- Name origin: Dinah, Genesis 34, Parshas Vayishlach; the Hebrew root relates to judgment.
- Brand values: justice, strength, resolve, precision and protection.
- Primary brand color: metallic silver.
- Signature materials: smooth polished iron, chrome and silver glitter.
- Default supporting palette: Electric Cobalt (option 03), subject to change.

Do not invent product capabilities, customers, partnerships, certifications, test results or operational claims. Preserve verified company copy and use clearly marked placeholders where facts are not yet available.

## 2. Creative direction

Build a visually ambitious, unmistakably custom website. It should feel like a high-end, interactive 3D product experience rather than a conventional corporate template.

The visual identity combines:

- Realistic glitter nail polish, including chunky and fine metallic flakes.
- Polished silver, smooth iron, chrome and reflective metal.
- Sharp, precision-engineered geometry and dimensional surfaces.
- Cinematic studio lighting, deep shadows and brilliant highlights.
- Saturated cobalt accents and dark oceanic backgrounds.
- Powerful, refined and expressive typography.
- A bold, luxurious aesthetic that is compatible with serious engineering content.

Do not interpret professional as plain, minimalist or visually conservative. Do not automatically tone down glitter because the company operates in defense technology. Explore expressive, dramatic effects while keeping information readable and the navigation intuitive.

Avoid generic SaaS layouts, interchangeable startup templates, excessive rounded pill-shaped components, flat gradients presented as realistic materials, and stock decorative graphics that have no relationship to the brand.

## 3. Real glitter is a signature feature

Glitter is a major design material, not an incidental star icon or a faint background noise layer. Reference real glitter nail polish, metallic automotive finishes, reflective foil and macro photography of glitter particles.

Support multiple material treatments:

- Chunky silver glitter: visibly distinct, irregular or faceted reflective flakes.
- Fine silver glitter: densely distributed microflakes with a smooth metallic appearance.
- Mixed-size glitter: layered large and small particles with natural variation in depth, orientation and brightness.
- Cobalt glitter: richly saturated blue particles with silver and icy-blue reflections.
- Smooth polished metal: continuous mirror-like or brushed surfaces contrasting with glitter.
- Optional holographic accents: restrained spectral reflections where they complement the palette.

Glitter can be bold, dense and visually prominent. Do not categorically prohibit chunky glitter or arts-and-crafts-inspired textures. Instead, evaluate the final effect for material realism, sharpness, quality and fit with DINA's identity.

Prefer actual textured or physically based material treatments over a single CSS gradient. Explore layered photographic textures, procedural noise, instanced flakes, normal maps, roughness maps, environment reflections and shader-based specular highlights. Create convincing depth by varying particle size, orientation, reflectivity and the apparent depth beneath a glossy surface.

Sparkle should respond naturally to changes in light, camera position or pointer movement. Do not make every particle flash simultaneously. Use stable seeded randomness to prevent distracting frame-to-frame noise. Static rendering must remain attractive even when animation is disabled.

Consider using the signature material on hero wordmarks, large typography, 3D objects, section dividers, featured panels and selected buttons. Maintain calm, high-contrast surfaces behind dense body copy.

## 4. Three-dimensional design and rendering

Use genuine 3D rendering where it meaningfully improves the experience. Do not limit the site to CSS approximations of depth.

Evaluate technologies appropriate to the existing project:

- Three.js or React Three Fiber and Drei for interactive WebGL scenes when compatible with the stack.
- Custom GLSL shaders for glitter and metallic reflections when justified.
- Physically based rendering materials with appropriate metalness, roughness, normals and environment lighting.
- Blender-generated assets and optimized glTF/GLB models for detailed geometry.
- CSS perspective, transforms, masks and layered lighting for lightweight dimensional interface elements.
- GSAP, Motion or native CSS animation for smooth, controlled movement when useful.

Use crisp bevels, controlled reflections, strong silhouettes, realistic shadows and high-resolution textures. Avoid excessively rounded, toy-like geometry. Use camera motion and parallax purposefully rather than making the interface constantly move.

Inspect the repository before choosing libraries. Reuse existing rendering utilities, custom shaders, animation helpers, 3D assets and approved dependencies. Do not introduce a second framework merely to implement an effect already supported by the current stack.

## 5. Existing technical skills and 3D capabilities

The founder has experience in mechanical and aerospace engineering, 3D CAD modeling using Fusion 360 and SolidWorks, engineering visualization, MATLAB simulations, and web development using HTML, CSS, JavaScript, VS Code and GitHub.

Take advantage of these capabilities by incorporating genuine interactive 3D geometry, CAD-derived glTF/GLB models, Three.js, WebGL, custom GLSL shaders, physically based rendering (PBR), environment mapping, ray-marched effects and procedural metallic glitter materials. Do not restrict implementation to basic CSS effects. Advanced libraries, shaders and open-source 3D resources are encouraged, even if they require learning additional technologies.

## 6. Centralized color system

Silver remains the primary brand color regardless of the selected supporting palette. Electric Cobalt is the current default, not an irreversible decision.

| Theme key | Palette | Silver | Dark background | Deep blue | Accent | Light blue |
| --- | --- | --- | --- | --- | --- | --- |
| `imperial-sapphire` | 01 Imperial Sapphire | #C0C0C0 | #081426 | #123B78 | #2463EB | #A7C7E7 |
| `arctic-steel` | 02 Arctic Steel | #C0C0C0 | #101C2C | #345675 | #7099BB | #D3E9F5 |
| `electric-cobalt` | 03 Electric Cobalt | #C0C0C0 | #050F20 | #0047AB | #007BFF | #70B9FF |
| `deep-atlantic` | 04 Deep Atlantic | #C0C0C0 | #031E30 | #00506E | #0087A3 | #8CC9DA |
| `midnight-titanium` | 05 Midnight Titanium | #C0C0C0 | #080D17 | #192B49 | #4568A0 | #B0C4DE |

Use white (#FFFFFF) as an additional neutral where needed.

Implement a single source of truth for the five palettes. Use semantic CSS custom properties and, where necessary, a typed theme configuration shared by CSS and 3D rendering code. Do not duplicate literal palette values throughout components.

Suggested semantic tokens:

- `--brand-silver`, `--bg-primary`, `--bg-secondary`
- `--accent-deep`, `--accent-primary`, `--accent-light`
- `--text-primary`, `--text-secondary`, `--text-on-accent`
- `--surface-primary`, `--surface-metal`, `--border-subtle`
- `--metal-dark`, `--metal-mid`, `--metal-light`
- `--glitter-base`, `--glitter-highlight`, `--glow-primary`

Use a root-level theme selector such as `data-theme="electric-cobalt"`. Make it possible to change the entire site's palette by changing one configuration value. All components, gradients, glows, glitter materials, SVG graphics and WebGL shader uniforms must follow the selected theme. Keep the metallic silver identity consistent across themes.

Provide a development-only theme preview or an internal design preview if useful. Do not add a public-facing theme switcher unless requested.

## 7. Material and effect controls

Make visual effects independently configurable, not entangled with palette selection. Maintain reusable parameters for:

- Glitter density and particle-size distribution.
- Chunky-to-fine glitter ratio.
- Flake reflectivity, roughness and depth.
- Silver versus cobalt tint.
- Highlight intensity and environment lighting.
- Animation speed and pointer responsiveness.
- Bevel depth, shadow intensity and surface finish.

Keep reusable material presets such as `silver-chunky`, `silver-fine`, `silver-mixed`, `cobalt-glitter` and `polished-metal`. The team should be able to experiment without rewriting components or shaders.

## 8. Interface and layout

Build layouts with intentional visual hierarchy, generous but controlled spacing, crisp edges and a strong editorial structure.

### Hero sections

Create a memorable first impression. Consider oversized metallic or glitter-filled DINA lettering, dramatic lighting and an interactive 3D material or object. Keep the central message and primary action clear. Avoid generic text-and-stock-image split layouts unless they genuinely serve the content.

### Buttons and interactive elements

Use tactile dimensional treatments, metallic edge highlights, sharp or gently beveled geometry and responsive lighting. Hover and focus states must be distinct. Avoid making every interactive element visually identical.

### Cards and panels

Use engineered-looking surfaces, controlled reflections and strong alignment. Combine smooth silver and glitter textures where appropriate. Reserve the most visually intense effects for important content rather than obscuring every surface.

### Typography

Use strong, modern, geometric or technical sans-serif typography. Favor confident headings, crisp letterforms and clear body text. Typography choices remain provisional until approved. Do not treat a suggested font as a finalized brand decision.

### Motion

Use smooth transitions, realistic light movement, shimmer sweeps, responsive reflections, scroll reveals and subtle camera motion. Dramatic effects are encouraged where they reinforce the brand. Avoid unnecessary bouncing, constant visual distraction or motion that interferes with navigation.

## 9. Online resources and creative tooling

Actively investigate useful existing resources rather than recreating every rendering technique from scratch. Consider open-source shaders, procedural glitter materials, PBR texture libraries, optimized 3D models and animation examples.

When evaluating external resources:

- Confirm that the repository or asset actually exists and is appropriate for the task.
- Check the license for commercial use, redistribution and attribution requirements.
- Prefer maintained, compatible dependencies and trusted sources.
- Record source URLs, authors and license information for third-party assets.
- Do not copy proprietary site designs, unlicensed assets or code with incompatible licenses.
- Store approved production assets locally or use an approved asset pipeline instead of relying on unstable hotlinks.
- Do not install unverified scripts or packages just because a tutorial recommends them.

Potential starting points include the official Three.js examples, React Three Fiber documentation, ambientCG and Poly Haven. Select resources based on actual material quality and compatibility.

## 10. Engineering and collaboration

Before editing, inspect the existing repository structure, package manager, configuration, components, assets and Git conventions. Preserve the existing stack unless the team agrees to a change.

- Keep components modular and reusable.
- Separate content, theme configuration, material presets, rendering logic and UI components.
- Avoid duplicating implementations or hardcoding brand colors.
- Follow existing linting, formatting and naming conventions.
- Add dependencies only when they provide a meaningful improvement.
- Keep credentials, API keys and private configuration out of the repository.
- Avoid destructive changes, unrelated rewrites or overwriting teammates' work.
- Make scoped changes with clear commit descriptions.
- Document how to change themes, adjust material settings and run the project locally.

The site is collaboratively maintained. Design decisions should be easy for another developer to locate, understand and change.

## 11. Accessibility, responsiveness and performance

Visual ambition must not come at the expense of usability.

- Maintain WCAG AA text contrast and accessible interactive controls.
- Support keyboard navigation, visible focus indicators and semantic markup.
- Respect `prefers-reduced-motion`; provide an attractive static alternative.
- Keep critical content and navigation functional without WebGL.
- Avoid rapid flashing and aggressive full-screen flickering.
- Make the layout work on desktop, tablet and mobile.
- Optimize textures, geometry, shaders and image formats.
- Lazy-load nonessential 3D assets; prioritize the initial view.
- Cap rendering resolution and adjust effect complexity to device capability.
- Pause unnecessary rendering when scenes are off-screen or the tab is inactive.
- Avoid blocking content behind a long-loading animation.

Do not automatically replace the distinctive design with a generic mobile layout. Adapt materials and motion to device capability while retaining DINA's identity.

## 12. Content and messaging

Write like a serious, ambitious engineering company. Use confident, precise, concise language. Avoid generic marketing filler, exaggerated claims and unverified specifications.

The visual identity may be extravagant and expressive; the company messaging should remain credible, technically grounded and professional.

## 13. Review criteria

When implementing or reviewing a page, ask:

1. Does this feel unmistakably like DINA rather than a generic technology company?
2. Does the glitter resemble a real reflective material, including visible chunky flakes where appropriate?
3. Are the metallic surfaces, geometry and lighting convincingly dimensional?
4. Can all five blue palettes be switched centrally without editing individual components?
5. Are the typography, layout and edges crisp and intentional?
6. Is the experience accessible, responsive, performant and maintainable?
7. Can another teammate easily adjust the colors, glitter materials and 3D effects?

If the answer to any of these is no, improve the implementation rather than settling for a generic aesthetic.

**Design mandate:** Real glitter. Real depth. Sharp geometry. Metallic silver. Bold cobalt. A distinctive, immersive DINA experience.
