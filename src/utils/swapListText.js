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

export function formatMissingListText(missing, totalPlayers) {
  if (!missing.length) {
    return '¡Álbum completo! No me faltan cromos del Panini Mundial 2026.';
  }

  const byCountry = missing.reduce((acc, sticker) => {
    if (!acc[sticker.country]) acc[sticker.country] = [];
    acc[sticker.country].push(sticker);
    return acc;
  }, {});

  const sections = Object.entries(byCountry)
    .sort(([a], [b]) => a.localeCompare(b, 'es'))
    .flatMap(([country, stickers]) => [
      `— ${country} —`,
      ...stickers.map((s) => `• ${s.code} — ${s.name}`),
      '',
    ]);

  return [
    '📋 FALTANTES — Panini Mundial 2026',
    '',
    ...sections,
    `Total: ${missing.length} faltantes · ${totalPlayers} cromos en el álbum`,
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

export async function shareListText(text, title = 'Panini Mundial 2026') {
  if (navigator.share) {
    try {
      await navigator.share({ title, text });
      return 'shared';
    } catch (err) {
      if (err?.name === 'AbortError') return 'cancelled';
    }
  }
  return null;
}

/** @deprecated use shareListText */
export const shareSwapList = shareListText;
