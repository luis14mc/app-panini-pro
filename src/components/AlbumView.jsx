import { useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import { albumSections, playersByCountry, countries } from '../data/players';
import { buildCountryMeta } from '../data/albumGroups';
import { getCountryImage } from '../data/countryImages';
import PlayerCard from './PlayerCard';

const countryMeta = buildCountryMeta(albumSections, playersByCountry);
const INTRO_SECTIONS = ['Panini', 'Mundial 2026'];

function ProgressRing({ percent }) {
  const dash = `${percent}, 100`;

  return (
    <div className="relative h-20 w-20 shrink-0">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#353535"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#e1c64a"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={dash}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
        {percent}%
      </div>
    </div>
  );
}

export default function AlbumView() {
  const { collection, incrementSticker, decrementSticker, progress, totalCollected, totalPlayers } = useGame();
  const [pageIndex, setPageIndex] = useState(2);
  const selectedRef = useRef(null);

  const currentCountry = albumSections[pageIndex];
  const meta = countryMeta[currentCountry] ?? { code: '?', flag: '🏳️' };
  const stickers = playersByCountry[currentCountry] ?? [];
  const collected = stickers.filter((s) => (collection[s.id]?.count ?? 0) >= 1).length;
  const countryPercent = stickers.length ? Math.round((collected / stickers.length) * 100) : 0;
  const countryImage = getCountryImage(meta.code);
  const isIntro = INTRO_SECTIONS.includes(currentCountry);

  useEffect(() => {
    selectedRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [pageIndex]);

  return (
    <div className="animate-fade-in space-y-5">
      <div className="space-y-2">
        <div className="flex items-end justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            Álbum global
          </span>
          <span className="text-sm font-bold text-secondary">{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-surface-container-highest">
          <div
            className="h-full rounded-full bg-secondary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[10px] text-on-surface-variant">
          {totalCollected} / {totalPlayers} cromos
        </p>
      </div>

      <div className="flex gap-2">
        {INTRO_SECTIONS.map((section) => {
          const idx = albumSections.indexOf(section);
          const sectionMeta = countryMeta[section];
          const active = pageIndex === idx;
          return (
            <button
              key={section}
              type="button"
              onClick={() => setPageIndex(idx)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-xs font-bold uppercase tracking-wide transition-all ${
                active
                  ? 'border-secondary bg-secondary/10 text-secondary'
                  : 'border-outline-variant/30 text-on-surface-variant'
              }`}
            >
              <img src={getCountryImage(sectionMeta.code)} alt="" className="h-5 w-5 rounded-full object-cover" />
              {sectionMeta.code}
            </button>
          );
        })}
      </div>

      <section>
        <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
          Seleccionar nación
        </h2>
        <div className="no-scrollbar flex gap-3 overflow-x-auto py-1">
          {countries.map((section) => {
            const idx = albumSections.indexOf(section);
            const sectionMeta = countryMeta[section] ?? { code: section.slice(0, 3).toUpperCase() };
            const active = pageIndex === idx;

            return (
              <button
                key={section}
                ref={active ? selectedRef : null}
                type="button"
                onClick={() => setPageIndex(idx)}
                className={`flex shrink-0 flex-col items-center gap-1.5 transition-opacity ${
                  active ? 'opacity-100' : 'opacity-45 hover:opacity-70'
                }`}
              >
                <div
                  className={`h-14 w-14 rounded-full p-0.5 ${
                    active
                      ? 'border-2 border-secondary bg-black gold-glow'
                      : 'border border-surface-container-highest'
                  }`}
                >
                  <img
                    src={getCountryImage(sectionMeta.code)}
                    alt={sectionMeta.code}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <span className={`text-[10px] ${active ? 'font-bold text-secondary' : 'text-on-surface-variant'}`}>
                  {sectionMeta.code}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="flex items-center justify-between gap-3 rounded-xl border border-surface-container-highest bg-surface-container p-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-tight text-on-surface-variant">
            {isIntro ? 'Sección especial' : 'Colección'}
          </p>
          <p className="truncate text-lg font-bold text-white">{currentCountry}</p>
          <p className="text-2xl font-bold text-secondary">
            {collected} / {stickers.length}{' '}
            <span className="text-sm font-normal text-on-surface-variant">pegados</span>
          </p>
        </div>
        <ProgressRing percent={countryPercent} />
      </section>

      <section className="grid grid-cols-2 gap-4">
        {stickers.map((sticker) => {
          const count = collection[sticker.id]?.count ?? 0;
          return (
            <PlayerCard
              key={sticker.id}
              player={sticker}
              count={count}
              countryImage={countryImage}
              interactive
              onIncrement={() => incrementSticker(sticker)}
              onDecrement={() => decrementSticker(sticker)}
            />
          );
        })}
      </section>
    </div>
  );
}
