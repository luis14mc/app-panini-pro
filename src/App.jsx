import { useState } from 'react';
import { useGame } from './context/GameContext';
import DashboardView from './components/DashboardView';
import TournamentView from './components/TournamentView';
import SwapView from './components/SwapView';
import AlbumView from './components/AlbumView';
import { mundialLogo } from './data/countryImages';

function NavButton({ active, onClick, icon, label, badge }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 py-1.5 transition-all duration-200 ${
        active ? 'text-secondary font-bold' : 'text-on-surface-variant hover:text-white'
      }`}
    >
      {icon}
      <span className="text-[9px] uppercase tracking-wide">{label}</span>
      {badge > 0 && (
        <span className="absolute right-[calc(50%-22px)] top-0 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-secondary px-0.5 text-[8px] font-bold text-black">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
      {active && (
        <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-secondary shadow-[0_0_8px_#e1c64a]" />
      )}
    </button>
  );
}

const DashboardIcon = ({ filled }) => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={filled ? 0 : 1.8}>
    {filled ? (
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
    ) : (
      <>
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </>
    )}
  </svg>
);

const BracketIcon = ({ filled }) => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8}>
    <path d="M7 3v7H3V3h4zm14 0v4h-4V3h4zM7 14v7H3v-7h4zm14 0v7h-4v-7h4z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 7h2M11 17h2M7 10v4M17 10v4" strokeLinecap="round" />
  </svg>
);

const AlbumIcon = ({ filled }) => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={filled ? 0 : 1.8}>
    {filled ? (
      <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h12V4H6z" />
    ) : (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </>
    )}
  </svg>
);

const SwapIcon = ({ filled }) => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={filled ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3L4 7l4 4" />
    <path d="M4 7h16" />
    <path d="M16 21l4-4-4-4" />
    <path d="M20 17H4" />
  </svg>
);

const TABS = [
  { id: 'dashboard', label: 'Inicio', Icon: DashboardIcon },
  { id: 'tournament', label: 'Torneo', Icon: BracketIcon },
  { id: 'album', label: 'Álbum', Icon: AlbumIcon },
  { id: 'swap', label: 'Cambios', Icon: SwapIcon },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { totalSwapAvailable, isLoaded } = useGame();

  if (!isLoaded) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-secondary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col bg-black circuit-bg">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-surface-container-highest bg-black/95 px-[var(--spacing-container-margin)] backdrop-blur-md">
        <div className="flex items-center gap-2">
          <img src={mundialLogo} alt="" className="h-8 w-8 object-contain" />
          <h1 className="text-lg font-bold tracking-tighter text-white">MUNDIAL 2026</h1>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          {TABS.find((t) => t.id === activeTab)?.label}
        </span>
      </header>

      <main className="flex-1 overflow-y-auto px-[var(--spacing-container-margin)] pb-28 pt-5">
        {activeTab === 'dashboard' && <DashboardView onNavigate={setActiveTab} />}
        {activeTab === 'tournament' && <TournamentView />}
        {activeTab === 'swap' && <SwapView />}
        {activeTab === 'album' && <AlbumView />}
      </main>

      <nav className="glass-nav fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md border-t border-outline-variant/30 shadow-[0_-4px_12px_rgba(225,198,74,0.08)]">
        <div className="flex px-1 py-2">
          {TABS.map(({ id, label, Icon }) => (
            <NavButton
              key={id}
              active={activeTab === id}
              onClick={() => setActiveTab(id)}
              icon={<Icon filled={activeTab === id} />}
              label={label}
              badge={id === 'swap' ? totalSwapAvailable : 0}
            />
          ))}
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
}
