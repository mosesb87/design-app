// S10 — Contact finale: copy-to-clipboard snaps the email's plates into register and stamps the result.
import { gsap } from 'gsap';
import type { Env } from './runtime';
import { registerType } from './reveals';

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
      if (email && ok) registerType(email, { from: 0.18, duration: 0.7 });
      gsap.fromTo(status, { scale: 1.35, rotate: -9, autoAlpha: 0 }, { scale: 1, rotate: -3, autoAlpha: 1, duration: 0.45, ease: 'back.out(2)' });
    }
    setTimeout(() => { label.textContent = 'Copy email'; }, 2600);
  });
}
