export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function playWhileVisible(element, play) {
  if (!(element instanceof HTMLElement) || prefersReducedMotion()) {
    return;
  }

  let running = false;
  let generation = 0;
  const pendingWaits = new Set();

  const wait = (duration) =>
    new Promise((resolve) => {
      const timeoutId = window.setTimeout(() => {
        pendingWaits.delete(finish);
        resolve(true);
      }, duration);

      const finish = (shouldContinue) => {
        window.clearTimeout(timeoutId);
        pendingWaits.delete(finish);
        resolve(shouldContinue);
      };

      pendingWaits.add(finish);
    });

  const cancelWaits = () => {
    pendingWaits.forEach((finish) => finish(false));
    pendingWaits.clear();
  };

  const loop = async (currentGeneration) => {
    while (running && currentGeneration === generation) {
      await play(wait);
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!running) {
            running = true;
            generation += 1;
            loop(generation);
          }
          return;
        }

        running = false;
        generation += 1;
        cancelWaits();
      });
    },
    { threshold: 0.25 },
  );

  observer.observe(element);
}

export async function typeText(element, text, delay, wait) {
  element.textContent = '';

  for (let index = 0; index < text.length; index += 1) {
    element.textContent = text.slice(0, index + 1);
    if (index === text.length - 1) {
      return true;
    }

    const shouldContinue = await wait(delay);
    if (!shouldContinue) {
      return false;
    }
  }

  return true;
}
