import { useGame } from '../context/GameContext';
import { countTournamentProgress } from '../data/tournament';
import { mundialLogo } from '../data/countryImages';
import InstallHint from './InstallHint';

function StatCard({ label, value, accent, onClick }) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`flex flex-col gap-1 rounded-xl border border-outline-variant/20 bg-surface-container-high p-4 text-left transition-colors ${
        onClick ? 'hover:border-secondary/40 active:scale-[0.98]' : ''
      }`}
    >
      <span className="text-xs font-medium uppercase tracking-wide text-on-surface-variant">{label}</span>
      <span className={`text-3xl font-bold ${accent ?? 'text-on-surface'}`}>{value}</span>
    </Tag>
  );
}

export default function DashboardView({ onNavigate }) {
  const { totalCollected, totalPlayers, progress, totalSwapAvailable, matchResults } = useGame();
  const missing = totalPlayers - totalCollected;
  const { played, total } = countTournamentProgress(matchResults);
  const tournamentPct = total ? Math.round((played / total) * 100) : 0;

  return (
    <div className="animate-fade-in space-y-6">
      <InstallHint />
      <section className="relative overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-low p-5">
        <div className="relative z-10 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">Panini · FIFA WC 2026</p>
          <h2 className="text-2xl font-bold leading-tight text-primary">
            Colecciona los <span className="text-secondary">momentos</span>
          </h2>
          <p className="max-w-sm text-sm text-on-surface-variant">
            Sigue tu álbum, gestiona repetidas y anota cada resultado del mundial.
          </p>
        </div>
        <img
          src={mundialLogo}
          alt=""
          className="absolute -right-2 -bottom-2 h-24 w-24 object-contain opacity-20"
        />
      </section>

      <section className="space-y-2">
        <div className="flex items-end justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            Progreso del álbum
          </span>
          <span className="text-lg font-bold text-secondary">{progress}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-surface-container-highest p-0.5">
          <div
            className="h-full rounded-full bg-secondary transition-all duration-700 gold-glow"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] uppercase text-on-surface-variant">
          <span>{totalCollected} pegados</span>
          <span>{totalPlayers} total</span>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Pegados" value={totalCollected} accent="text-secondary" onClick={() => onNavigate('album')} />
        <StatCard label="Faltantes" value={missing} onClick={() => onNavigate('album')} />
        <StatCard
          label="Repetidas"
          value={totalSwapAvailable}
          accent="text-secondary"
          onClick={() => onNavigate('swap')}
        />
        <StatCard
          label="Partidos"
          value={`${played}/${total}`}
          onClick={() => onNavigate('tournament')}
        />
      </div>

      <section className="glass-card rounded-xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-tight text-secondary">Torneo en vivo</h3>
          <span className="text-xs text-on-surface-variant">{tournamentPct}% anotado</span>
        </div>
        <p className="mb-4 text-sm text-on-surface-variant">
          Registra marcadores por fase: grupos, eliminatorias y final en Los Angeles.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('tournament')}
          className="w-full rounded-full bg-secondary py-3 text-sm font-bold uppercase tracking-wide text-black active:scale-[0.98]"
        >
          Ir al bracket
        </button>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onNavigate('album')}
          className="rounded-xl border border-outline-variant/30 bg-surface-container p-4 text-left active:scale-[0.98]"
        >
          <span className="text-2xl">📖</span>
          <p className="mt-2 text-sm font-bold">Álbum</p>
          <p className="text-xs text-on-surface-variant">Marca cromos</p>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('swap')}
          className="rounded-xl border border-outline-variant/30 bg-surface-container p-4 text-left active:scale-[0.98]"
        >
          <span className="text-2xl">🔄</span>
          <p className="mt-2 text-sm font-bold">Cambios</p>
          <p className="text-xs text-on-surface-variant">Lista de repetidas</p>
        </button>
      </div>
    </div>
  );
}
