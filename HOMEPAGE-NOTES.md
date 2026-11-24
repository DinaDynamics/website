# Homepage implementation notes

- Run a static server from the repository root and open its root URL; no build step is required.
- Change the `data-theme` attribute on the homepage's `html` element to one of `electric-cobalt`, `imperial-sapphire`, `arctic-steel`, `deep-atlantic`, or `midnight-titanium`. Palette values are shared with the internal playground in `theme-config.js`. Other existing pages have not yet been migrated to these tokens.
- The wordmark's seeded flake density, chunky ratio and reflectivity are controlled by `material` in `homepage.js`. Its metallic gradient is the no-JavaScript fallback.
- The ocean video is decorative, muted, pauses off-screen or in a hidden tab, and is replaced by a still for reduced motion. The poster also serves as the loading and autoplay fallback.

## Media credit

- Ocean wave footage: [BlenderTimer, Wave, Breaking, Sea](https://pixabay.com/videos/wave-breaking-sea-ocean-water-283533/), via Pixabay. Used under the [Pixabay Content License](https://pixabay.com/service/terms/); see also its [license summary](https://pixabay.com/service/license-summary/). The license prohibits standalone redistribution and use of the footage as part of a trademark. Attribution is not required, but is recorded here. The local poster is a frame from the same footage.
- Platform concept rendering: existing company asset, presented as a concept rather than an operational photograph.