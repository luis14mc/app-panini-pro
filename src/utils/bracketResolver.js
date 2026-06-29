import { worldCupGroups } from '../data/albumGroups';
import { R32_SLOTS, FEED_BRACKET } from '../data/knockoutBracket';
import { getGroupMatches, isMatchPlayed, computeStandings } from '../data/tournament';

const FEED_ORDER = ['r16', 'qf', 'sf', 'final'];

function thirdPlaceStats(groupLetter, matchResults, teamOverrides) {
  const standings = computeStandings(groupLetter, matchResults, teamOverrides);
  const third = standings[2];
  if (!third || third.played === 0) return null;
  return {
    group: groupLetter,
    code: third.code,
    pts: third.pts,
    gd: third.gf - third.ga,
    gf: third.gf,
  };
}

function rankThirdPlaces(matchResults, teamOverrides) {
  return worldCupGroups
    .map((g) => thirdPlaceStats(g.letter, matchResults, teamOverrides))
    .filter(Boolean)
    .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.group.localeCompare(b.group));
}

function resolveThirdPlaceMap(matchResults, teamOverrides) {
  const ranked = rankThirdPlaces(matchResults, teamOverrides);
  const top8 = ranked.slice(0, 8);
  const letters = top8.map((t) => t.group).sort().join('');

  if (letters === 'BDEFIJKL') {
    const byGroup = Object.fromEntries(ranked.map((t) => [t.group, t.code]));
    const map = {};
    for (const [winnerGroup, thirdGroup] of Object.entries({
      A: 'E',
      B: 'J',
      D: 'B',
      E: 'D',
      G: 'I',
      I: 'F',
      K: 'L',
      L: 'K',
    })) {
      map[winnerGroup] = byGroup[thirdGroup] ?? null;
    }
    return map;
  }

  const map = {};
  const winnerGroups = ['A', 'B', 'D', 'E', 'G', 'I', 'K', 'L'];
  winnerGroups.forEach((wg, i) => {
    map[wg] = top8[i]?.code ?? null;
  });
  return map;
}

function getGroupRankCode(groupLetter, rank, matchResults, teamOverrides) {
  const standings = computeStandings(groupLetter, matchResults, teamOverrides);
  const row = standings[rank - 1];
  if (!row || row.played === 0) return null;
  return row.code;
}

function resolveSlot(slot, thirdMap, matchResults, teamOverrides) {
  if (slot.type === 'rank') {
    return getGroupRankCode(slot.group, slot.rank, matchResults, teamOverrides);
  }
  if (slot.type === 'thirdVs') {
    return thirdMap[slot.winnerGroup] ?? null;
  }
  return null;
}

function matchWinner(home, away, result) {
  if (!isMatchPlayed(result) || !home || !away) return null;
  const hs = Number(result.homeScore);
  const as = Number(result.awayScore);
  if (hs > as) return home;
  if (as > hs) return away;
  return null;
}

export function resolveBracketTeams(matchResults, teamOverrides = {}) {
  const thirdMap = resolveThirdPlaceMap(matchResults, teamOverrides);
  const resolved = {};

  for (const slot of R32_SLOTS) {
    resolved[slot.id] = {
      home: resolveSlot(slot.home, thirdMap, matchResults, teamOverrides),
      away: resolveSlot(slot.away, thirdMap, matchResults, teamOverrides),
    };
  }

  for (const phase of FEED_ORDER) {
    for (const m of FEED_BRACKET[phase]) {
      resolved[m.id] = {
        home: winnerOf(m.home, matchResults, resolved),
        away: winnerOf(m.away, matchResults, resolved),
      };
    }
  }

  return { resolved, thirdMap };
}

function overridesChanged(before, after) {
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  for (const key of keys) {
    if (before[key]?.home !== after[key]?.home || before[key]?.away !== after[key]?.away) {
      return true;
    }
  }
  return false;
}

export { overridesChanged };

function winnerOf(matchId, matchResults, resolved) {
  const teams = resolved[matchId];
  if (!teams) return null;
  return matchWinner(teams.home, teams.away, matchResults[matchId]);
}

/** Persiste equipos del cuadro en teamOverrides (no toca matchResults ni collection) */
export function syncKnockoutOverrides(resolved, existing = {}) {
  const next = { ...existing };
  for (const [matchId, teams] of Object.entries(resolved)) {
    next[matchId] = {
      home: teams.home ?? null,
      away: teams.away ?? null,
    };
  }
  return next;
}

export function getEffectiveTeams(match, resolved) {
  const auto = resolved[match.id] ?? { home: null, away: null };
  if (match.phase && match.phase !== 'groups') {
    return { home: auto.home, away: auto.away };
  }
  return {
    home: auto.home ?? match.home ?? null,
    away: auto.away ?? match.away ?? null,
  };
}

export function getGroupQualificationStatus(groupLetter, matchResults, teamOverrides) {
  const standings = computeStandings(groupLetter, matchResults, teamOverrides);
  const ranked = rankThirdPlaces(matchResults, teamOverrides);
  const thirdRank = ranked.findIndex((t) => t.group === groupLetter);

  return standings.map((row, i) => ({
    ...row,
    qualBadge:
      i === 0 ? '1°' : i === 1 ? '2°' : thirdRank >= 0 && thirdRank < 8 && i === 2 ? '3°*' : i === 2 ? '3°' : null,
  }));
}

export function isGroupComplete(groupLetter, matchResults) {
  return getGroupMatches(groupLetter).every((m) => isMatchPlayed(matchResults[m.id]));
}
