import { applyTheme } from './theme-config.js';

applyTheme(document.documentElement.dataset.theme);

// Surface controls are deliberately separate from the palette.
const material = { seed: 7834, flakes: 12000, chunkyRatio: 0.13, reflectivity: 0.85 };

function makeSilverTexture(settings) {
    const canvas = document.createElement('canvas');
    canvas.width = 620;
    canvas.height = 310;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let seed = settings.seed;
    const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    const metal = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    [[0, '#f4f7fa'], [.18, '#7b8793'], [.35, '#eaf2f8'], [.5, '#a0aab4'], [.69, '#f9fcff'], [1, '#687784']].forEach(([stop, color]) => metal.addColorStop(stop, color));
    ctx.fillStyle = metal;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < settings.flakes; i++) {
        const x = random() * canvas.width;
        const y = random() * canvas.height;
        const size = random() < settings.chunkyRatio ? 1.4 + random() * 3.8 : .25 + random() * 1.2;
        const shade = Math.floor(110 + random() * 145);
        const alpha = (.12 + random() * .65) * settings.reflectivity;
        ctx.fillStyle = `rgba(${shade},${Math.min(255, shade + 5)},${Math.min(255, shade + 12)},${alpha})`;
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size * (0.4 + random()), y - size * .2);
        ctx.lineTo(x + size * .4, y + size * .75);
        ctx.lineTo(x - size * .7, y + size * .4);
        ctx.closePath();
        ctx.fill();
    }
    document.documentElement.style.setProperty('--silver-texture', `url("${canvas.toDataURL()}")`);
}
makeSilverTexture(material);

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.site-nav');
menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
});
menu.addEventListener('click', event => {
    if (event.target.closest('a')) {
        menu.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
    }
});

const hero = document.querySelector('.ocean-hero');
const video = document.querySelector('.ocean-video');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
let heroVisible = true;

function updateVideo() {
    if (motion.matches || document.hidden || !heroVisible) {
        video.pause();
        return;
    }
    if (!video.src) {
        video.src = video.dataset.src;
        video.load();
    }
    video.play().catch(() => {}); // The poster remains visible if autoplay is unavailable.
}

if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
        heroVisible = entries[0].isIntersecting;
        updateVideo();
    }, { threshold: 0 }).observe(hero);
}
document.addEventListener('visibilitychange', updateVideo);
motion.addEventListener('change', updateVideo);
updateVideo();

let scrollScheduled = false;
window.addEventListener('scroll', () => {
    if (scrollScheduled || motion.matches || !heroVisible) return;
    scrollScheduled = true;
    requestAnimationFrame(() => {
        hero.style.setProperty('--scroll-y', `${Math.min(window.scrollY * .13, 90)}px`);
        scrollScheduled = false;
    });
}, { passive: true });
motion.addEventListener('change', () => {
    if (motion.matches) hero.style.removeProperty('--scroll-y');
});

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    hero.addEventListener('pointermove', event => {
        if (motion.matches) return;
        const x = event.clientX / window.innerWidth - .5;
        const y = event.clientY / window.innerHeight - .5;
        hero.style.setProperty('--media-x', `${x * -18}px`);
        hero.style.setProperty('--media-y', `${y * -12}px`);
        hero.style.setProperty('--content-x', `${x * 10}px`);
        hero.style.setProperty('--content-y', `calc(-50% + ${y * 8}px)`);
    });
    hero.addEventListener('pointerleave', () => {
        ['--media-x', '--media-y', '--content-x', '--content-y'].forEach(property => hero.style.removeProperty(property));
    });
}