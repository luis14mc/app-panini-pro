const typeLabels = {
  player: null,
  team_logo: 'Escudo',
  team_photo: 'Equipo',
  special: 'Especial',
};

export default function PlayerCard({
  player,
  count = 0,
  countryImage,
  onIncrement,
  onDecrement,
  interactive = false,
  className = '',
}) {
  const owned = count >= 1;
  const duplicates = Math.max(0, count - 1);
  const typeLabel = typeLabels[player.type];
  const stickerCode = player.code ?? `${player.countryCode ?? ''} ${player.number ?? '?'}`;

  const handleIncrement = (e) => {
    e.stopPropagation();
    onIncrement?.();
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (owned) onDecrement?.();
  };

  if (!owned) {
    return (
      <div
        className={`sticker-card relative flex aspect-[3/4] flex-col overflow-hidden rounded-xl border border-dashed border-surface-container-highest bg-black opacity-60 ${className}`}
      >
        <div className="absolute top-2 left-2 z-10 rounded bg-surface-container px-2 py-0.5 text-[10px] font-bold text-on-surface-variant">
          {stickerCode}
        </div>
        <div className="flex h-3/5 items-center justify-center bg-surface-container">
          {countryImage ? (
            <img
              src={countryImage}
              alt=""
              className="h-full w-full object-cover opacity-30 grayscale"
            />
          ) : (
            <span className="text-3xl text-outline-variant">?</span>
          )}
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 p-2">
          <p className="text-xs text-on-surface-variant">Faltante</p>
          {interactive && onIncrement && (
            <button
              type="button"
              onClick={handleIncrement}
              className="rounded-full bg-surface-container-highest px-4 py-1 text-xs font-bold text-white active:scale-95"
            >
              Marcar
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`sticker-card relative flex aspect-[3/4] flex-col overflow-hidden rounded-xl border-2 border-secondary bg-surface-container gold-glow ${className}`}
    >
      <div className="absolute top-2 left-2 z-10 rounded bg-secondary px-2 py-0.5 text-[10px] font-bold text-black">
        {stickerCode}
        {player.isFoil ? ' · Foil' : ''}
      </div>

      <div className="relative h-3/5 overflow-hidden">
        {countryImage && (
          <img
            src={countryImage}
            alt=""
            className={`h-full w-full object-cover ${duplicates > 0 ? 'brightness-75 grayscale' : ''}`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col justify-between p-3">
        <p className="truncate text-sm font-bold text-white">{player.name}</p>
        {typeLabel && (
          <p className="truncate text-[10px] text-on-surface-variant">{typeLabel}</p>
        )}

        {interactive && (
          <div className="mt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={handleDecrement}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-surface-container-highest bg-black active:scale-90"
              aria-label="Quitar cromo"
            >
              <span className="text-sm text-white">−</span>
            </button>
            <span className="text-sm font-bold text-secondary">
              {duplicates > 0 ? `+${duplicates}` : '0'}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary active:scale-90"
              aria-label="Añadir repetida"
            >
              <span className="text-sm font-black text-black">+</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
