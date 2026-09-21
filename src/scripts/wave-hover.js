function setWaveFromPoint(element, clientX, clientY) {
  const bounds = element.getBoundingClientRect();
  const originX = clientX - bounds.left;
  const originY = clientY - bounds.top;
  const originSize = 8;
  const coverRadius = Math.max(
    Math.hypot(originX, originY),
    Math.hypot(originX - bounds.width, originY),
    Math.hypot(originX, originY - bounds.height),
    Math.hypot(originX - bounds.width, originY - bounds.height),
  );

  element.style.setProperty('--wave-x', `${originX}px`);
  element.style.setProperty('--wave-y', `${originY}px`);
  element.style.setProperty('--wave-scale', String((coverRadius * 2.2) / originSize));
}

function setWaveCenter(element) {
  const bounds = element.getBoundingClientRect();
  setWaveFromPoint(
    element,
    bounds.left + bounds.width / 2,
    bounds.top + bounds.height / 2,
  );
}

export function setupWaveHover(root = document) {
  const targets = root.querySelectorAll('[data-wave-hover]');
  targets.forEach((target) => {
    if (!(target instanceof HTMLElement) || target.hasAttribute('data-wave-ready')) {
      return;
    }

    target.setAttribute('data-wave-ready', '');
    let leaveTimeout = 0;

    target.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'touch') {
        return;
      }

      window.clearTimeout(leaveTimeout);
      target.classList.remove('is-wave-out');
      setWaveFromPoint(target, event.clientX, event.clientY);
      target.classList.add('is-wave');
    });

    target.addEventListener('pointerleave', () => {
      target.classList.remove('is-wave');
      target.classList.add('is-wave-out');
      window.clearTimeout(leaveTimeout);
      leaveTimeout = window.setTimeout(() => {
        target.classList.remove('is-wave-out');
      }, 380);
    });

    target.addEventListener('focus', () => {
      if (!target.matches(':focus-visible')) {
        return;
      }

      window.clearTimeout(leaveTimeout);
      target.classList.remove('is-wave-out');
      setWaveCenter(target);
      target.classList.add('is-wave');
    });

    target.addEventListener('blur', () => {
      target.classList.remove('is-wave');
      target.classList.add('is-wave-out');
      window.clearTimeout(leaveTimeout);
      leaveTimeout = window.setTimeout(() => {
        target.classList.remove('is-wave-out');
      }, 380);
    });
  });
}

setupWaveHover();
document.addEventListener('astro:page-load', () => {
  setupWaveHover();
});
