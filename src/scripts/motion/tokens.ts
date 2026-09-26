// Motion tokens — mirror of src/styles/tokens.css. One verb: register (offset → aligned).
export const ease = {
  register: 'expo.out',
  settle: 'back.out(1.7)',
  drift: 'sine.inOut',
  exit: 'power3.in',
  sweep: 'power3.inOut',
  scrub: 'none',
} as const;

export const dur = {
  micro: 0.16,
  small: 0.32,
  line: 0.6,
  plate: 0.9,
  settle: 0.18,
  scene: 1.3,
  count: 1.2,
} as const;

export const stagger = {
  letters: 0.018,
  lines: 0.07,
  rows: 0.04,
  plates: 0.08,
  digits: 0.03,
} as const;

export const scrubSmoothing = 0.6;
export const revealStart = 'top 80%';
