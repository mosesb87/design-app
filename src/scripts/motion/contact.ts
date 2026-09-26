// Contact finale: copy-to-clipboard gives the email a happy bounce and stamps the result.
import { gsap } from 'gsap';
import type { Env } from './runtime';

export default function contact([section]: HTMLElement[], env: Env) {
  const btn = section.querySelector<HTMLButtonElement>('[data-copy]');
  const status = section.querySelector<HTMLElement>('[data-copy-status]');
  const email = section.querySelector<HTMLElement>('[data-email]');
  if (!btn || !status) return;
  const label = btn.querySelector<HTMLElement>('[data-copy-label]')!;
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy || '';
    let ok = false;
    try { await navigator.clipboard.writeText(text); ok = true; } catch {
      // Fallback for browsers without the async clipboard.
      const ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { ok = document.execCommand('copy'); } catch { ok = false; }
      ta.remove();
    }
    status.textContent = ok ? '✓ Copied — checked' : 'Select the address above to copy it';
    label.textContent = ok ? 'Copied' : 'Copy email';
    if (!env.reduced) {
      if (email && ok) gsap.fromTo(email, { scale: 0.94, rotation: -1.5 }, { scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)', transformOrigin: 'left center' });
      gsap.fromTo(status, { scale: 1.35, rotate: -9, autoAlpha: 0 }, { scale: 1, rotate: -3, autoAlpha: 1, duration: 0.45, ease: 'back.out(2)' });
    }
    setTimeout(() => { label.textContent = 'Copy email'; }, 2600);
  });
}
