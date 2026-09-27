// Certificates on /about/: the peeking certificate opens full size in a dialog (click, tap or keyboard).
// The dialog is native: Escape and the Close button shut it, and focus returns to the certificate.
import type { Env } from './runtime';

export default function certs(buttons: HTMLElement[], _env: Env) {
  const dialog = document.querySelector<HTMLDialogElement>('[data-cert-dialog]');
  const img = dialog?.querySelector<HTMLImageElement>('[data-cert-img]');
  if (!dialog || !img || typeof dialog.showModal !== 'function') return;
  buttons.forEach((b) => b.addEventListener('click', () => {
    img.src = b.dataset.src || '';
    img.alt = b.dataset.alt || '';
    dialog.showModal();
  }));
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
}
