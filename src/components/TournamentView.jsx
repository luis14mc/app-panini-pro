import { useMemo, useState } from 'react';
import { useGame } from '../context/GameContext';
import { worldCupGroups } from '../data/albumGroups';
import {
  TOURNAMENT_PHASES,
  getMatchesByPhase,
  getGroupMatches,
  countTournamentProgress,
  BRACKET_COLUMNS,
} from '../data/tournament';
import { getCountryImage } from '../data/countryImages';
import {
  resolveBracketTeams,
  getEffectiveTeams,
  getGroupQualificationStatus,
  isGroupComplete,
} from '../utils/bracketResolver';
import MatchCard from './MatchCard';

export default function TournamentView() {
  const { matchResults, teamOverrides, updateMatchScore } = useGame();
  const [phase, setPhase] = useState('groups');
  const [groupLetter, setGroupLetter] = useState('A');

  const { resolved } = useMemo(
    () => resolveBracketTeams(matchResults, teamOverrides),
    [matchResults, teamOverrides]
  );

  const { played, total } = countTournamentProgress(matchResults);
  const progressPercent = total ? Math.round((played / total) * 100) : 0;

  const phaseMatches =
    phase === 'groups' ? getGroupMatches(groupLetter) : getMatchesByPhase(phase);

  const standings =
    phase === 'groups' ? getGroupQualificationStatus(groupLetter, matchResults, teamOverrides) : [];

  const groupComplete = isGroupComplete(groupLetter, matchResults);

  return (
    <div className="animate-fade-in space-y-4 pb-4">
      <div className="rounded-xl border border-outline-variant/30 bg-gradient-to-b from-surface-container-low to-black p-4 text-center">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          TORNEO <span className="text-secondary">2026</span>
        </h2>
        <p className="mt-1 text-xs text-on-surface-variant">
          Llaves oficiales · Los equipos se actualizan con tus resultados
        </p>
      </div>

      <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-3">
        <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          <span>Progreso</span>
          <span className="text-secondary">{played}/{total}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-surface-container-highest">
          <div
            className="h-full rounded-full bg-secondary transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <nav className="no-scrollbar -mx-[var(--spacing-container-margin)] flex gap-1 overflow-x-auto px-[var(--spacing-container-margin)] pb-1">
        {TOURNAMENT_PHASES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPhase(p.id)}
            className={`shrink-0 rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-wide transition-all ${
              phase === p.id
                ? 'bg-secondary text-black'
                : 'border border-outline-variant/30 bg-surface-container-high text-on-surface-variant'
            }`}
          >
            {p.label}
          </button>
        ))}
      </nav>

      {phase === 'groups' && (
        <>
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
            {worldCupGroups.map((g) => {
              const complete = isGroupComplete(g.letter, matchResults);
              return (
                <button
                  key={g.letter}
                  type="button"
                  onClick={() => setGroupLetter(g.letter)}
                  className={`relative shrink-0 rounded-lg px-3 py-2 text-sm font-bold transition-all ${
                    groupLetter === g.letter
                      ? 'bg-secondary text-black'
                      : 'border border-outline-variant/30 bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {g.letter}
                  {complete && (
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-secondary" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container">
            <div className="flex items-center justify-between border-b border-outline-variant/20 px-3 py-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                Grupo {groupLetter}
              </span>
              {groupComplete && (
                <span className="text-[10px] font-bold text-secondary">Completo</span>
              )}
            </div>
            <div className="grid grid-cols-[1rem_1.75rem_1fr_auto] gap-x-2 border-b border-outline-variant/20 px-3 py-1.5 text-[9px] font-bold uppercase text-on-surface-variant">
              <span>#</span>
              <span />
              <span>Equipo</span>
              <span className="text-right">PJ · DG · Pts</span>
            </div>
            <div className="divide-y divide-outline-variant/10">
              {standings.map((row, i) => (
                <div key={row.code} className="grid grid-cols-[1rem_1.75rem_1fr_auto] items-center gap-x-2 px-3 py-2.5">
                  <span className="text-xs text-on-surface-variant">{i + 1}</span>
                  <img
                    src={getCountryImage(row.code)}
                    alt=""
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold uppercase">{row.code}</p>
                    <p className="truncate text-[10px] text-on-surface-variant">{row.name}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="font-bold text-secondary">{row.pts}</span>
                    <span className="text-on-surface-variant">{row.gf - row.ga}</span>
                    {row.qualBadge && (
                      <span className="rounded bg-secondary/15 px-1 py-0.5 text-[8px] font-bold text-secondary">
                        {row.qualBadge}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {phase === 'bracket' && (
        <div className="space-y-3">
          <p className="text-center text-xs text-on-surface-variant">
            Desliza para ver el cuadro completo →
          </p>
          <div className="no-scrollbar -mx-[var(--spacing-container-margin)] flex gap-3 overflow-x-auto px-[var(--spacing-container-margin)] pb-2">
            {BRACKET_COLUMNS.map((col) => {
              const colMatches = getMatchesByPhase(col.phase);
              return (
                <div key={col.phase} className="w-[148px] shrink-0 space-y-2">
                  <p className="sticky top-0 text-center text-[10px] font-bold uppercase tracking-widest text-secondary">
                    {col.label}
                  </p>
                  {colMatches.map((match) => {
                    const teams = getEffectiveTeams(match, resolved);
                    return (
                      <MatchCard
                        key={match.id}
                        match={match}
                        result={matchResults[match.id]}
                        effectiveHome={teams.home}
                        effectiveAway={teams.away}
                        onScoreChange={updateMatchScore}
                        compact
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {phase !== 'bracket' && (
        <div className="space-y-3">
          {phaseMatches.map((match) => {
            const teams = getEffectiveTeams(match, resolved);
            return (
              <MatchCard
                key={match.id}
                match={match}
                result={matchResults[match.id]}
                effectiveHome={teams.home}
                effectiveAway={teams.away}
                onScoreChange={updateMatchScore}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
