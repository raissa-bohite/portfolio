import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { whenPageReady } from './page-transition';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Le titre monte ligne par ligne derrière un masque, puis le curseur orange clignote deux fois, comme en haut de page
function buildTitleTimeline(lines: Element[], cursor: Element | null, trigger: HTMLElement): gsap.core.Timeline {
  const timeline = gsap.timeline({ scrollTrigger: { trigger, start: 'top 85%', once: true } });
  timeline.from(lines, { yPercent: 110, duration: 0.9, stagger: 0.12, ease: 'power4.out' });
  if (cursor) {
    timeline.fromTo(cursor, { autoAlpha: 0 }, { keyframes: { autoAlpha: [0, 1, 0, 1, 0, 1] }, duration: 0.9, ease: 'none' }, '-=0.3');
  }
  return timeline;
}

export function setupTitleReveal(title: HTMLElement): void {
  if (title.dataset['titleRevealSetup'] === 'true') return;
  title.dataset['titleRevealSetup'] = 'true';
  const cursor = title.querySelector('[data-section-cursor]');
  const media = gsap.matchMedia();
  void whenPageReady().then(() => {
    media.add('(prefers-reduced-motion: no-preference)', () => {
      // autoSplit refait le découpage quand la largeur ou la police change ; aria « auto » garde le titre lisible d'un bloc
      const split = SplitText.create(title, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        aria: 'auto',
        onSplit: (self) => buildTitleTimeline(self.lines, cursor, title)
      });
      return () => split.revert();
    });
  });
}
