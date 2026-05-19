import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { worldCupGroups } from '../data/albumGroups';
import {
  TOURNAMENT_PHASES,
  getMatchesByPhase,
  getGroupMatches,
  computeStandings,
  countTournamentProgress,
} from '../data/tournament';
import { getCountryImage } from '../data/countryImages';
import MatchCard from './MatchCard';

export default function TournamentView() {
  const { matchResults, teamOverrides, updateMatchScore, updateMatchTeams } = useGame();
  const [phase, setPhase] = useState('groups');
  const [groupLetter, setGroupLetter] = useState('A');

  const { played, total } = countTournamentProgress(matchResults);
  const progressPercent = total ? Math.round((played / total) * 100) : 0;

  const phaseMatches =
    phase === 'groups' ? getGroupMatches(groupLetter) : getMatchesByPhase(phase);

  const standings = phase === 'groups' ? computeStandings(groupLetter, matchResults, teamOverrides) : [];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          TORNEO <span className="text-secondary">2026</span>
        </h2>
        <p className="mt-1 text-sm text-on-surface-variant">
          Anota resultados fase a fase. Se guardan automáticamente.
        </p>
      </div>

      <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-4">
        <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-on-surface-variant">
          <span>Progreso del torneo</span>
          <span className="text-secondary">{played}/{total}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-surface-container-highest">
          <div
            className="h-full rounded-full bg-secondary transition-all duration-500 gold-glow"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <nav className="no-scrollbar -mx-[var(--spacing-container-margin)] flex gap-6 overflow-x-auto border-b border-white/5 px-[var(--spacing-container-margin)] pb-1">
        {TOURNAMENT_PHASES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPhase(p.id)}
            className={`shrink-0 pb-2 text-xs font-bold uppercase tracking-widest transition-all ${
              phase === p.id
                ? 'border-b-2 border-secondary text-secondary'
                : 'text-on-surface-variant opacity-60 hover:opacity-100'
            }`}
          >
            {p.label}
          </button>
        ))}
      </nav>

      {phase === 'groups' && (
        <>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {worldCupGroups.map((g) => (
              <button
                key={g.letter}
                type="button"
                onClick={() => setGroupLetter(g.letter)}
                className={`shrink-0 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                  groupLetter === g.letter
                    ? 'bg-secondary text-black'
                    : 'border border-outline-variant/30 bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {g.letter}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container">
            <div className="border-b border-outline-variant/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-secondary">
              Clasificación · Grupo {groupLetter}
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-on-surface-variant">
                  <th className="px-3 py-2">#</th>
                  <th className="px-3 py-2">Equipo</th>
                  <th className="px-3 py-2 text-center">PJ</th>
                  <th className="px-3 py-2 text-center">DG</th>
                  <th className="px-3 py-2 text-center font-bold">Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((row, i) => (
                  <tr key={row.code} className="border-t border-outline-variant/10">
                    <td className="px-3 py-2 text-on-surface-variant">{i + 1}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={getCountryImage(row.code)}
                          alt=""
                          className="h-5 w-5 rounded-full object-cover"
                        />
                        <span className="font-bold uppercase">{row.code}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-center">{row.played}</td>
                    <td className="px-3 py-2 text-center">{row.gf - row.ga}</td>
                    <td className="px-3 py-2 text-center font-bold text-secondary">{row.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="space-y-4">
        {phaseMatches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            result={matchResults[match.id]}
            teamOverrides={teamOverrides[match.id]}
            editableTeams={phase !== 'groups'}
            onScoreChange={updateMatchScore}
            onTeamChange={updateMatchTeams}
          />
        ))}
      </div>
    </div>
  );
}
