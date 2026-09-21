export const SLIDE_DURATION_MS = 280;

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getTabDirection(fromIndex, toIndex, length) {
  if (fromIndex < 0 || toIndex === fromIndex) {
    return 1;
  }

  if (fromIndex === length - 1 && toIndex === 0) {
    return 1;
  }

  if (fromIndex === 0 && toIndex === length - 1) {
    return -1;
  }

  return toIndex > fromIndex ? 1 : -1;
}

export function applyTabDirection(element, direction) {
  if (!(element instanceof HTMLElement)) {
    return;
  }

  element.style.setProperty('--tab-direction', String(direction));
}

export function moveTabIndicator(tablist, selectedTab, { instant = false } = {}) {
  if (!(tablist instanceof HTMLElement) || !(selectedTab instanceof HTMLElement)) {
    return;
  }

  const indicator = tablist.querySelector('[data-tab-indicator]');
  if (!(indicator instanceof HTMLElement)) {
    return;
  }

  const reducedMotion = prefersReducedMotion();
  indicator.style.transition = instant || reducedMotion ? 'none' : '';
  indicator.style.width = `${selectedTab.offsetWidth}px`;
  indicator.style.height = `${selectedTab.offsetHeight}px`;
  indicator.style.transform = `translate(${selectedTab.offsetLeft}px, ${selectedTab.offsetTop}px)`;
  tablist.classList.add('is-ready');

  if (instant && !reducedMotion) {
    window.requestAnimationFrame(() => {
      indicator.style.removeProperty('transition');
    });
  }
}
