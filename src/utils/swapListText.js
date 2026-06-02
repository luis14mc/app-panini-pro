export function formatSwapListText(duplicates, totalSwapAvailable) {
  if (!duplicates.length) {
    return 'Sin repetidas en mi álbum Panini Mundial 2026.';
  }

  const lines = duplicates.map(
    (s) => `• ${s.code} — ${s.name} (×${s.available})`
  );

  return [
    '🔄 REPETIDAS — Panini Mundial 2026',
    '',
    ...lines,
    '',
    `Total: ${totalSwapAvailable} repetidas · ${duplicates.length} cromos distintos`,
  ].join('\n');
}

export function getWhatsAppShareUrl(text) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(textarea);
  return ok;
}

export async function shareSwapList(text) {
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Repetidas Panini 2026', text });
      return 'shared';
    } catch (err) {
      if (err?.name === 'AbortError') return 'cancelled';
    }
  }
  return null;
}
