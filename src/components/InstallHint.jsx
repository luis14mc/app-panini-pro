import { useState } from 'react';

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function isBrave() {
  return typeof navigator.brave !== 'undefined' || /Brave/i.test(navigator.userAgent);
}

export default function InstallHint() {
  const [open, setOpen] = useState(() => {
    if (!isIOS()) return false;
    return localStorage.getItem('installHintDismissed') !== '1';
  });

  if (!open) return null;

  const brave = isBrave();

  return (
    <div className="mb-4 rounded-xl border border-secondary/30 bg-secondary/10 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-secondary">Instalar en iPhone</p>
          <p className="mt-1 text-xs text-on-surface-variant">
            {brave
              ? 'Brave en iOS a veces no muestra “Añadir a pantalla de inicio”. Lo más fiable es usar Safari:'
              : 'Para usarla como app en tu pantalla de inicio:'}
          </p>
          <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs text-on-surface">
            {brave && (
              <li>
                Copia la URL y ábrela en <strong className="text-white">Safari</strong>
              </li>
            )}
            <li>Toca el botón <strong className="text-white">Compartir</strong> (cuadrado con flecha ↑)</li>
            <li>
              Desliza hacia abajo y elige{' '}
              <strong className="text-white">Añadir a pantalla de inicio</strong>
            </li>
            <li>Toca <strong className="text-white">Añadir</strong></li>
          </ol>
          {brave && (
            <p className="mt-2 text-[10px] text-on-surface-variant">
              En Brave: menú ⋯ → Compartir → desliza hasta el final. Si no aparece, usa Safari.
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            localStorage.setItem('installHintDismissed', '1');
            setOpen(false);
          }}
          className="shrink-0 text-on-surface-variant hover:text-white"
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
