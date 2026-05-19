import { useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { getCountryImage } from '../data/countryImages';
import { teamByCode } from '../data/tournament';

function ScoreInput({ value, onChange, label }) {
  return (
    <input
      type="number"
      min={0}
      max={99}
      inputMode="numeric"
      aria-label={label}
      value={value ?? ''}
      onChange={(e) => {
        const raw = e.target.value;
        onChange(raw === '' ? null : Math.max(0, Number(raw)));
      }}
      className="w-10 rounded bg-black/40 border border-outline-variant/40 text-center text-xl font-bold text-secondary focus:border-secondary focus:outline-none"
    />
  );
}

function TeamSelect({ value, onChange, exclude }) {
  return (
    <select
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value || null)}
      className="max-w-[7rem] truncate rounded border border-outline-variant/30 bg-surface-container-high px-2 py-1 text-xs font-bold uppercase text-on-surface focus:border-secondary focus:outline-none"
    >
      <option value="">TBD</option>
      {Object.values(teamByCode)
        .filter((t) => t.code !== exclude)
        .sort((a, b) => a.code.localeCompare(b.code))
        .map((t) => (
          <option key={t.code} value={t.code}>
            {t.code}
          </option>
        ))}
    </select>
  );
}

export default function MatchCard({ match, result, teamOverrides, onScoreChange, onTeamChange, editableTeams = false }) {
  const homeCode = teamOverrides?.home ?? match.home;
  const awayCode = teamOverrides?.away ?? match.away;
  const home = homeCode ? teamByCode[homeCode] : null;
  const away = awayCode ? teamByCode[awayCode] : null;
  const played = result?.homeScore != null && result?.awayScore != null && result.homeScore !== '' && result.awayScore !== '';

  return (
    <div
      className={`glass-card overflow-hidden rounded-xl transition-all ${
        played ? 'border-l-4 border-l-secondary match-active' : ''
      }`}
    >
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          <span>{match.label}</span>
          <span className={played ? 'text-secondary' : ''}>{played ? 'Final' : 'Pendiente'}</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-1 flex-col items-center gap-2">
            {editableTeams ? (
              <TeamSelect
                value={homeCode}
                exclude={awayCode}
                onChange={(code) => onTeamChange?.(match.id, 'home', code)}
              />
            ) : (
              <div className="h-10 w-16 overflow-hidden rounded-md border border-white/10 bg-surface-container-high">
                {home && (
                  <img src={getCountryImage(home.code)} alt="" className="h-full w-full object-cover" />
                )}
              </div>
            )}
            <span className={`text-sm font-bold uppercase ${played && Number(result.homeScore) > Number(result.awayScore) ? 'text-secondary' : 'text-on-surface'}`}>
              {home?.code ?? 'TBD'}
            </span>
          </div>

          <div className="flex items-center gap-2 px-2">
            <ScoreInput
              value={result?.homeScore}
              label={`Goles ${home?.code ?? 'local'}`}
              onChange={(v) => onScoreChange(match.id, 'homeScore', v)}
            />
            <span className="text-on-surface-variant/40">-</span>
            <ScoreInput
              value={result?.awayScore}
              label={`Goles ${away?.code ?? 'visitante'}`}
              onChange={(v) => onScoreChange(match.id, 'awayScore', v)}
            />
          </div>

          <div className="flex flex-1 flex-col items-center gap-2">
            {editableTeams ? (
              <TeamSelect
                value={awayCode}
                exclude={homeCode}
                onChange={(code) => onTeamChange?.(match.id, 'away', code)}
              />
            ) : (
              <div className="h-10 w-16 overflow-hidden rounded-md border border-white/10 bg-surface-container-high">
                {away && (
                  <img src={getCountryImage(away.code)} alt="" className="h-full w-full object-cover" />
                )}
              </div>
            )}
            <span className={`text-sm font-bold uppercase ${played && Number(result.awayScore) > Number(result.homeScore) ? 'text-secondary' : 'text-on-surface opacity-80'}`}>
              {away?.code ?? 'TBD'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
