import { worldCupGroups } from './albumGroups';
import { R32_SLOTS, FEED_BRACKET } from './knockoutBracket';

export const allTeams = worldCupGroups.flatMap((g) => g.teams);
export const teamByCode = Object.fromEntries(allTeams.map((t) => [t.code, t]));

export const TOURNAMENT_PHASES = [
  { id: 'groups', label: 'Grupos' },
  { id: 'bracket', label: 'Llaves' },
  { id: 'r32', label: '32avos' },
  { id: 'r16', label: 'Octavos' },
  { id: 'qf', label: 'Cuartos' },
  { id: 'sf', label: 'Semis' },
  { id: 'final', label: 'Final' },
];

function roundRobinPairs(teams) {
  const pairs = [];
  for (let i = 0; i < teams.length; i += 1) {
    for (let j = i + 1; j < teams.length; j += 1) {
      pairs.push([teams[i].code, teams[j].code]);
    }
  }
  return pairs;
}

export const groupMatches = worldCupGroups.flatMap((group) =>
  roundRobinPairs(group.teams).map(([home, away], index) => ({
    id: `group-${group.letter}-${index}`,
    phase: 'groups',
    group: group.letter,
    label: `Grupo ${group.letter}`,
    home,
    away,
  }))
);

function buildFeedMatches(phase, entries) {
  return entries.map((entry) => ({
    id: entry.id,
    phase,
    fifa: entry.fifa,
    label: `Partido ${entry.fifa}`,
    short: entry.short,
    home: null,
    away: null,
    feedHome: entry.home,
    feedAway: entry.away,
  }));
}

export const knockoutMatches = [
  ...R32_SLOTS.map((s) => ({
    id: s.id,
    phase: 'r32',
    fifa: s.fifa,
    label: `Partido ${s.fifa}`,
    short: s.short,
    home: null,
    away: null,
  })),
  ...buildFeedMatches('r16', FEED_BRACKET.r16),
  ...buildFeedMatches('qf', FEED_BRACKET.qf),
  ...buildFeedMatches('sf', FEED_BRACKET.sf),
  ...buildFeedMatches('final', FEED_BRACKET.final),
];

export const allMatches = [...groupMatches, ...knockoutMatches];

export function getMatchesByPhase(phase) {
  if (phase === 'groups') return groupMatches;
  if (phase === 'bracket') return knockoutMatches;
  return knockoutMatches.filter((m) => m.phase === phase);
}

export function getGroupMatches(groupLetter) {
  return groupMatches.filter((m) => m.group === groupLetter);
}

export function isMatchPlayed(result) {
  return (
    result &&
    result.homeScore !== null &&
    result.homeScore !== '' &&
    result.awayScore !== null &&
    result.awayScore !== ''
  );
}

export function computeStandings(groupLetter, matchResults, overrides = {}) {
  const group = worldCupGroups.find((g) => g.letter === groupLetter);
  if (!group) return [];

  const stats = Object.fromEntries(
    group.teams.map((t) => [
      t.code,
      { ...t, played: 0, win: 0, draw: 0, loss: 0, gf: 0, ga: 0, pts: 0 },
    ])
  );

  getGroupMatches(groupLetter).forEach((match) => {
    const stored = matchResults[match.id];
    const home = overrides[match.id]?.home ?? match.home;
    const away = overrides[match.id]?.away ?? match.away;
    if (!isMatchPlayed(stored) || !stats[home] || !stats[away]) return;

    const hs = Number(stored.homeScore);
    const as = Number(stored.awayScore);

    stats[home].played += 1;
    stats[away].played += 1;
    stats[home].gf += hs;
    stats[home].ga += as;
    stats[away].gf += as;
    stats[away].ga += hs;

    if (hs > as) {
      stats[home].win += 1;
      stats[home].pts += 3;
      stats[away].loss += 1;
    } else if (hs < as) {
      stats[away].win += 1;
      stats[away].pts += 3;
      stats[home].loss += 1;
    } else {
      stats[home].draw += 1;
      stats[away].draw += 1;
      stats[home].pts += 1;
      stats[away].pts += 1;
    }
  });

  return Object.values(stats).sort(
    (a, b) => b.pts - a.pts || b.gf - b.ga - (a.gf - a.ga) || b.gf - a.gf
  );
}

export function countTournamentProgress(matchResults) {
  const played = allMatches.filter((m) => isMatchPlayed(matchResults[m.id])).length;
  return { played, total: allMatches.length };
}

export const BRACKET_COLUMNS = [
  { phase: 'r32', label: '32avos' },
  { phase: 'r16', label: 'Octavos' },
  { phase: 'qf', label: 'Cuartos' },
  { phase: 'sf', label: 'Semis' },
  { phase: 'final', label: 'Final' },
];
