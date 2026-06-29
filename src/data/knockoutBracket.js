/** Estructura oficial del cuadro FIFA WC 2026 — IDs internos sin cambiar (r32-0, etc.) */

export const R32_SLOTS = [
  { id: 'r32-0', fifa: 73, home: { type: 'rank', group: 'A', rank: 2 }, away: { type: 'rank', group: 'B', rank: 2 }, short: '2A vs 2B' },
  { id: 'r32-1', fifa: 74, home: { type: 'rank', group: 'E', rank: 1 }, away: { type: 'thirdVs', winnerGroup: 'E' }, short: '1E vs 3?' },
  { id: 'r32-2', fifa: 75, home: { type: 'rank', group: 'F', rank: 1 }, away: { type: 'rank', group: 'C', rank: 2 }, short: '1F vs 2C' },
  { id: 'r32-3', fifa: 76, home: { type: 'rank', group: 'C', rank: 1 }, away: { type: 'rank', group: 'F', rank: 2 }, short: '1C vs 2F' },
  { id: 'r32-4', fifa: 77, home: { type: 'rank', group: 'I', rank: 1 }, away: { type: 'thirdVs', winnerGroup: 'I' }, short: '1I vs 3?' },
  { id: 'r32-5', fifa: 78, home: { type: 'rank', group: 'E', rank: 2 }, away: { type: 'rank', group: 'I', rank: 2 }, short: '2E vs 2I' },
  { id: 'r32-6', fifa: 79, home: { type: 'rank', group: 'A', rank: 1 }, away: { type: 'thirdVs', winnerGroup: 'A' }, short: '1A vs 3?' },
  { id: 'r32-7', fifa: 80, home: { type: 'rank', group: 'L', rank: 1 }, away: { type: 'thirdVs', winnerGroup: 'L' }, short: '1L vs 3?' },
  { id: 'r32-8', fifa: 81, home: { type: 'rank', group: 'D', rank: 1 }, away: { type: 'thirdVs', winnerGroup: 'D' }, short: '1D vs 3?' },
  { id: 'r32-9', fifa: 82, home: { type: 'rank', group: 'G', rank: 1 }, away: { type: 'thirdVs', winnerGroup: 'G' }, short: '1G vs 3?' },
  { id: 'r32-10', fifa: 83, home: { type: 'rank', group: 'K', rank: 2 }, away: { type: 'rank', group: 'L', rank: 2 }, short: '2K vs 2L' },
  { id: 'r32-11', fifa: 84, home: { type: 'rank', group: 'H', rank: 1 }, away: { type: 'rank', group: 'J', rank: 2 }, short: '1H vs 2J' },
  { id: 'r32-12', fifa: 85, home: { type: 'rank', group: 'B', rank: 1 }, away: { type: 'thirdVs', winnerGroup: 'B' }, short: '1B vs 3?' },
  { id: 'r32-13', fifa: 86, home: { type: 'rank', group: 'J', rank: 1 }, away: { type: 'rank', group: 'H', rank: 2 }, short: '1J vs 2H' },
  { id: 'r32-14', fifa: 87, home: { type: 'rank', group: 'K', rank: 1 }, away: { type: 'thirdVs', winnerGroup: 'K' }, short: '1K vs 3?' },
  { id: 'r32-15', fifa: 88, home: { type: 'rank', group: 'D', rank: 2 }, away: { type: 'rank', group: 'G', rank: 2 }, short: '2D vs 2G' },
];

export const FEED_BRACKET = {
  r16: [
    { id: 'r16-0', fifa: 89, home: 'r32-1', away: 'r32-4', short: 'W74 vs W77' },
    { id: 'r16-1', fifa: 90, home: 'r32-0', away: 'r32-2', short: 'W73 vs W75' },
    { id: 'r16-2', fifa: 91, home: 'r32-3', away: 'r32-5', short: 'W76 vs W78' },
    { id: 'r16-3', fifa: 92, home: 'r32-6', away: 'r32-7', short: 'W79 vs W80' },
    { id: 'r16-4', fifa: 93, home: 'r32-10', away: 'r32-11', short: 'W83 vs W84' },
    { id: 'r16-5', fifa: 94, home: 'r32-8', away: 'r32-9', short: 'W81 vs W82' },
    { id: 'r16-6', fifa: 95, home: 'r32-13', away: 'r32-15', short: 'W86 vs W88' },
    { id: 'r16-7', fifa: 96, home: 'r32-12', away: 'r32-14', short: 'W85 vs W87' },
  ],
  qf: [
    { id: 'qf-0', fifa: 97, home: 'r16-0', away: 'r16-1', short: 'W89 vs W90' },
    { id: 'qf-1', fifa: 98, home: 'r16-4', away: 'r16-5', short: 'W93 vs W94' },
    { id: 'qf-2', fifa: 99, home: 'r16-2', away: 'r16-3', short: 'W91 vs W92' },
    { id: 'qf-3', fifa: 100, home: 'r16-6', away: 'r16-7', short: 'W95 vs W96' },
  ],
  sf: [
    { id: 'sf-0', fifa: 101, home: 'qf-0', away: 'qf-1', short: 'W97 vs W98' },
    { id: 'sf-1', fifa: 102, home: 'qf-2', away: 'qf-3', short: 'W99 vs W100' },
  ],
  final: [{ id: 'final-0', fifa: 104, home: 'sf-0', away: 'sf-1', short: 'W101 vs W102' }],
};

/** Combinación 67 — terceros clasificados B,D,E,F,I,J,K,L (WC 2026 real) */
export const THIRD_PLACE_COMBO_67 = {
  A: 'E',
  B: 'J',
  D: 'B',
  E: 'D',
  G: 'I',
  I: 'F',
  K: 'L',
  L: 'K',
};
