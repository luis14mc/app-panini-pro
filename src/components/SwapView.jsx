import { useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { getCountryImage } from '../data/countryImages';

export default function SwapView() {
  const { collection, totalSwapAvailable, decrementSticker } = useGame();

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

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="mb-1 text-2xl font-bold text-on-surface">Lista de cambios</h2>
        <p className="text-on-surface-variant">
          {duplicates.length > 0
            ? `${totalSwapAvailable} repetidas disponibles para intercambiar.`
            : 'Marca un cromo dos veces en el álbum para registrar una repetida.'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1 rounded-xl border border-outline-variant/30 bg-surface-container-low p-4">
          <span className="text-xs font-medium uppercase text-on-surface-variant">
            Total repetidas
          </span>
          <span className="text-2xl font-bold text-secondary">{totalSwapAvailable}</span>
        </div>
        <div className="flex flex-col gap-1 rounded-xl border border-outline-variant/30 bg-surface-container-low p-4">
          <span className="text-xs font-medium uppercase text-on-surface-variant">
            Cromos distintos
          </span>
          <span className="text-2xl font-bold text-on-surface">{duplicates.length}</span>
        </div>
      </div>

      {duplicates.length === 0 ? (
        <div className="rounded-xl border border-dashed border-outline-variant/40 bg-surface-container px-6 py-12 text-center">
          <p className="font-semibold text-on-surface">Sin repetidas</p>
          <p className="mt-1 text-sm text-on-surface-variant">
            Usa el botón + en el álbum para añadir copias extra.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {duplicates.map((sticker, index) => {
            const flagImg = getCountryImage(sticker.countryCode);
            const isFeatured = index === 0;

            return (
              <div
                key={sticker.id}
                className={`flex items-center justify-between rounded-xl bg-surface-container-high p-4 ${
                  isFeatured ? 'neon-border' : 'border border-outline-variant/20'
                }`}
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
                  <span className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-sm font-bold text-secondary glow-gold">
                    +{sticker.available}
                  </span>
                  <button
                    type="button"
                    onClick={() => decrementSticker(sticker)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-outline-variant/30 text-on-surface-variant active:scale-90"
                    aria-label="Quitar repetida"
                  >
                    −
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
