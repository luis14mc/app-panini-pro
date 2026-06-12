import { useMemo, useState, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { playersData } from '../data/players';
import { getCountryImage } from '../data/countryImages';
import {
  formatSwapListText,
  formatMissingListText,
  getWhatsAppShareUrl,
  copyTextToClipboard,
  shareListText,
} from '../utils/swapListText';

const TABS = [
  { id: 'duplicates', label: 'Repetidas' },
  { id: 'missing', label: 'Faltantes' },
];

export default function SwapView() {
  const { collection, totalSwapAvailable, totalPlayers, decrementSticker } = useGame();
  const [activeTab, setActiveTab] = useState('duplicates');
  const [feedback, setFeedback] = useState(null);

  const duplicates = useMemo(
    () =>
      Object.values(collection)
        .filter((entry) => entry.count > 1)
        .map((entry) => ({
          ...entry.data,
          count: entry.count,
          available: entry.count - 1,
        }))
        .sort((a, b) => a.country.localeCompare(b.country, 'es') || a.number - b.number),
    [collection]
  );

  const missing = useMemo(
    () =>
      playersData
        .filter((sticker) => (collection[sticker.id]?.count ?? 0) < 1)
        .sort((a, b) => a.country.localeCompare(b.country, 'es') || a.number - b.number),
    [collection]
  );

  const listText = useMemo(() => {
    if (activeTab === 'missing') {
      return formatMissingListText(missing, totalPlayers);
    }
    return formatSwapListText(duplicates, totalSwapAvailable);
  }, [activeTab, missing, totalPlayers, duplicates, totalSwapAvailable]);

  const hasItems = activeTab === 'missing' ? missing.length > 0 : duplicates.length > 0;
  const shareTitle = activeTab === 'missing' ? 'Faltantes Panini 2026' : 'Repetidas Panini 2026';

  const showFeedback = useCallback((message) => {
    setFeedback(message);
    setTimeout(() => setFeedback(null), 2200);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      const ok = await copyTextToClipboard(listText);
      showFeedback(ok ? 'Lista copiada' : 'No se pudo copiar');
    } catch {
      showFeedback('No se pudo copiar');
    }
  }, [listText, showFeedback]);

  const handleWhatsApp = useCallback(() => {
    window.open(getWhatsAppShareUrl(listText), '_blank', 'noopener,noreferrer');
    showFeedback('Abriendo WhatsApp…');
  }, [listText, showFeedback]);

  const handleShare = useCallback(async () => {
    const result = await shareListText(listText, shareTitle);
    if (result === 'shared') {
      showFeedback('Lista compartida');
    } else if (result === 'cancelled') {
      return;
    } else {
      await handleCopy();
    }
  }, [listText, shareTitle, showFeedback, handleCopy]);

  return (
    <div className="animate-fade-in space-y-6 pb-20">
      <div>
        <h2 className="mb-1 text-2xl font-bold text-on-surface">Listas de cambio</h2>
        <p className="text-on-surface-variant">
          Comparte lo que te sobra o lo que te falta para intercambiar con amigos.
        </p>
      </div>

      <div className="flex rounded-xl border border-outline-variant/30 bg-surface-container-low p-1">
        {TABS.map((tab) => {
          const count = tab.id === 'missing' ? missing.length : totalSwapAvailable;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-all ${
                active
                  ? 'bg-secondary text-black'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  active ? 'bg-black/20' : 'bg-surface-container-highest'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {activeTab === 'duplicates' ? (
        <DuplicatesPanel duplicates={duplicates} totalSwapAvailable={totalSwapAvailable} decrementSticker={decrementSticker} />
      ) : (
        <MissingPanel missing={missing} totalPlayers={totalPlayers} />
      )}

      {hasItems && (
        <ShareToolbar
          onCopy={handleCopy}
          onWhatsApp={handleWhatsApp}
          onShare={handleShare}
          showNativeShare={typeof navigator !== 'undefined' && !!navigator.share}
        />
      )}

      {feedback && (
        <p className="text-center text-sm font-semibold text-secondary" role="status">
          {feedback}
        </p>
      )}

      {hasItems && (
        <>
          <details className="rounded-xl border border-outline-variant/20 bg-surface-container-low">
            <summary className="cursor-pointer px-4 py-3 text-xs font-bold uppercase tracking-wide text-on-surface-variant">
              Vista previa del texto
            </summary>
            <pre className="max-h-48 overflow-auto whitespace-pre-wrap border-t border-outline-variant/20 px-4 py-3 text-xs text-on-surface-variant">
              {listText}
            </pre>
          </details>

          <div className="fixed bottom-24 left-0 right-0 z-40 mx-auto flex max-w-md justify-center px-[var(--spacing-container-margin)] pointer-events-none">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="pointer-events-auto flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-black shadow-[0_0_20px_rgba(225,198,74,0.4)] active:scale-95"
            >
              <ShareIcon />
              Compartir lista
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function DuplicatesPanel({ duplicates, totalSwapAvailable, decrementSticker }) {
  if (!duplicates.length) {
    return (
      <EmptyState
        title="Sin repetidas"
        description="Marca un cromo dos veces en el álbum para registrar una repetida."
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Total repetidas" value={totalSwapAvailable} accent />
        <StatCard label="Cromos distintos" value={duplicates.length} />
      </div>
      <div className="flex flex-col gap-3">
        {duplicates.map((sticker, index) => (
          <StickerRow
            key={sticker.id}
            sticker={sticker}
            badge={`+${sticker.available}`}
            featured={index === 0}
            action={
              <button
                type="button"
                onClick={() => decrementSticker(sticker)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-outline-variant/30 text-on-surface-variant active:scale-90"
                aria-label="Quitar repetida"
              >
                −
              </button>
            }
          />
        ))}
      </div>
    </div>
  );
}

function MissingPanel({ missing, totalPlayers }) {
  const grouped = useMemo(
    () =>
      missing.reduce((acc, sticker) => {
        if (!acc[sticker.country]) acc[sticker.country] = [];
        acc[sticker.country].push(sticker);
        return acc;
      }, {}),
    [missing]
  );

  if (!missing.length) {
    return (
      <EmptyState
        title="¡Álbum completo!"
        description="Tienes todos los cromos registrados. No te falta ninguno."
      />
    );
  }

  const collected = totalPlayers - missing.length;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Faltantes" value={missing.length} accent />
        <StatCard label="Pegados" value={collected} />
      </div>
      <div className="flex flex-col gap-3">
        {Object.entries(grouped)
          .sort(([a], [b]) => a.localeCompare(b, 'es'))
          .map(([country, stickers]) => (
            <details
              key={country}
              className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-high"
              open={Object.keys(grouped).length <= 4}
            >
              <summary className="flex cursor-pointer items-center justify-between px-4 py-3">
                <span className="text-sm font-bold text-on-surface">{country}</span>
                <span className="rounded-full bg-surface-container px-2.5 py-0.5 text-xs font-bold text-on-surface-variant">
                  {stickers.length}
                </span>
              </summary>
              <div className="flex flex-col gap-2 border-t border-outline-variant/10 px-2 pb-2">
                {stickers.map((sticker) => (
                  <StickerRow
                    key={sticker.id}
                    sticker={sticker}
                    badge="Falta"
                    badgeMuted
                    compact
                  />
                ))}
              </div>
            </details>
          ))}
      </div>
    </div>
  );
}

function StickerRow({ sticker, badge, badgeMuted, featured, compact, action }) {
  const flagImg = getCountryImage(sticker.countryCode);

  return (
    <div
      className={`flex items-center justify-between rounded-xl bg-surface-container-high ${
        compact ? 'p-3' : 'p-4'
      } ${featured ? 'neon-border' : compact ? '' : 'border border-outline-variant/20'}`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-outline-variant/20 bg-surface-container">
          <img src={flagImg} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-on-surface">{sticker.code}</span>
          <span className="text-xs text-on-surface-variant">{sticker.name}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`rounded-full border px-3 py-1 text-sm font-bold ${
            badgeMuted
              ? 'border-outline-variant/30 bg-surface-container text-on-surface-variant'
              : 'border-secondary/30 bg-secondary/10 text-secondary glow-gold'
          }`}
        >
          {badge}
        </span>
        {action}
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-outline-variant/30 bg-surface-container-low p-4">
      <span className="text-xs font-medium uppercase text-on-surface-variant">{label}</span>
      <span className={`text-2xl font-bold ${accent ? 'text-secondary' : 'text-on-surface'}`}>{value}</span>
    </div>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="rounded-xl border border-dashed border-outline-variant/40 bg-surface-container px-6 py-12 text-center">
      <p className="font-semibold text-on-surface">{title}</p>
      <p className="mt-1 text-sm text-on-surface-variant">{description}</p>
    </div>
  );
}

function ShareToolbar({ onCopy, onWhatsApp, onShare, showNativeShare }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <button
        type="button"
        onClick={onCopy}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-high px-4 py-3 text-sm font-bold text-on-surface active:scale-[0.98]"
      >
        <CopyIcon />
        Copiar lista
      </button>
      <button
        type="button"
        onClick={onWhatsApp}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white active:scale-[0.98]"
      >
        <WhatsAppIcon />
        WhatsApp
      </button>
      {showNativeShare && (
        <button
          type="button"
          onClick={onShare}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-secondary/40 bg-secondary/10 px-4 py-3 text-sm font-bold text-secondary active:scale-[0.98]"
        >
          <ShareIcon />
          Más opciones
        </button>
      )}
    </div>
  );
}

function CopyIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}
