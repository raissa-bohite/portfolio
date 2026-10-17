import { gsap } from 'gsap';
import { getCardPose, getCircularOffset, wrapIndex } from './carousel-math';
import { prefersReducedMotion } from './motion';

const AUTOPLAY_DELAY_SECONDS = 4.5;
const SWIPE_THRESHOLD_PIXELS = 40;

type CarouselLabels = { pause: string; play: string; position: string };

// Pile de cartes du haut de page : défilement automatique avec pause (WCAG 2.2.2), flèches et balayage
export function setupCarousel(root: HTMLElement): void {
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-card]'));
  const captions = Array.from(root.querySelectorAll<HTMLElement>('[data-caption]'));
  const counter = root.querySelector<HTMLElement>('[data-counter]');
  const status = root.querySelector<HTMLElement>('[data-status]');
  const pauseButton = root.querySelector<HTMLButtonElement>('[data-action="pause"]');
  const labels: CarouselLabels = {
    pause: root.dataset['labelPause'] ?? '',
    play: root.dataset['labelPlay'] ?? '',
    position: root.dataset['labelPosition'] ?? ''
  };
  const total = cards.length;
  const reduceMotion = prefersReducedMotion();
  let activeIndex = 0;
  let paused = reduceMotion;
  let autoplayCall: gsap.core.Tween | undefined;
  let dragStartX: number | undefined;
  let dragStartY: number | undefined;

  // Le centrage CSS sert sans JavaScript ; GSAP le reprend à son compte pour composer les transformations
  gsap.set(cards, { translate: 'none', xPercent: -50, yPercent: -50, transformPerspective: 1200, transformOrigin: '50% 60%' });

  function layout(immediate: boolean): void {
    cards.forEach((card, index) => {
      const pose = getCardPose(getCircularOffset(index, activeIndex, total));
      const isActive = index === activeIndex;
      card.style.zIndex = String(pose.zIndex);
      card.tabIndex = isActive ? 0 : -1;
      card.setAttribute('aria-hidden', String(!isActive));
      gsap.to(card, {
        x: pose.x,
        y: pose.y,
        scale: pose.scale,
        rotation: pose.rotation,
        rotationX: 0,
        rotationY: 0,
        opacity: pose.opacity,
        duration: immediate || reduceMotion ? 0 : 0.8,
        ease: 'power3.out'
      });
    });
    captions.forEach((caption, index) => {
      caption.hidden = index !== activeIndex;
    });
    if (counter) counter.textContent = `${activeIndex + 1} / ${total}`;
  }

  function announce(): void {
    if (!status) return;
    status.textContent = labels.position.replace('{current}', String(activeIndex + 1)).replace('{total}', String(total));
  }

  function scheduleAutoplay(): void {
    autoplayCall?.kill();
    if (paused) return;
    autoplayCall = gsap.delayedCall(AUTOPLAY_DELAY_SECONDS, () => goTo(activeIndex + 1, false));
  }

  function goTo(index: number, fromUser: boolean): void {
    activeIndex = wrapIndex(index, total);
    layout(false);
    // L'annonce vocale ne concerne que les changements demandés : le défilement automatique resterait bavard
    if (fromUser) announce();
    scheduleAutoplay();
  }

  function setPaused(nextPaused: boolean): void {
    paused = nextPaused;
    if (pauseButton) {
      pauseButton.setAttribute('aria-label', paused ? labels.play : labels.pause);
      pauseButton.dataset['paused'] = String(paused);
    }
    scheduleAutoplay();
  }

  root.querySelector('[data-action="previous"]')?.addEventListener('click', () => goTo(activeIndex - 1, true));
  root.querySelector('[data-action="next"]')?.addEventListener('click', () => goTo(activeIndex + 1, true));
  pauseButton?.addEventListener('click', () => setPaused(!paused));

  // Le focus clavier dans le carrousel suspend le défilement pour ne pas déplacer la cible
  root.addEventListener('focusin', () => autoplayCall?.kill());
  root.addEventListener('focusout', () => scheduleAutoplay());

  const stage = root.querySelector<HTMLElement>('[data-stage]');
  stage?.addEventListener('pointerdown', (event) => {
    dragStartX = event.clientX;
    dragStartY = event.clientY;
  });
  window.addEventListener('pointerup', (event) => {
    if (dragStartX === undefined || dragStartY === undefined) return;
    const deltaX = event.clientX - dragStartX;
    const deltaY = event.clientY - dragStartY;
    dragStartX = undefined;
    dragStartY = undefined;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD_PIXELS && Math.abs(deltaX) > Math.abs(deltaY)) {
      goTo(activeIndex + (deltaX < 0 ? 1 : -1), true);
    }
  });

  if (!reduceMotion && stage) {
    stage.addEventListener('pointermove', (event) => {
      const bounds = stage.getBoundingClientRect();
      const ratioX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const ratioY = (event.clientY - bounds.top) / bounds.height - 0.5;
      gsap.to(cards[activeIndex] ?? [], { rotationY: ratioX * 10, rotationX: -ratioY * 8, duration: 0.6, ease: 'power2.out' });
    });
    stage.addEventListener('pointerleave', () => {
      gsap.to(cards[activeIndex] ?? [], { rotationY: 0, rotationX: 0, duration: 0.6, ease: 'power2.out' });
    });
  }

  root.dataset['ready'] = 'true';
  layout(true);
  setPaused(paused);
}
