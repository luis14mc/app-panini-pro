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
      className="h-11 w-11 rounded-lg border border-outline-variant/40 bg-black/50 text-center text-xl font-bold text-secondary focus:border-secondary focus:outline-none"
    />
  );
}

function TeamBlock({ code, name, image, isWinner, align = 'left' }) {
  return (
    <div className={`flex min-w-0 flex-1 items-center gap-2 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-outline-variant/30 bg-surface-container-high">
        {image && <img src={image} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className={`min-w-0 ${align === 'right' ? 'text-right' : ''}`}>
        <p className={`truncate text-sm font-bold uppercase ${isWinner ? 'text-secondary' : 'text-on-surface'}`}>
          {code ?? 'TBD'}
        </p>
        {name && (
          <p className="truncate text-[10px] text-on-surface-variant">{name}</p>
        )}
      </div>
    </div>
  );
}

export default function MatchCard({
  match,
  result,
  effectiveHome,
  effectiveAway,
  onScoreChange,
  compact = false,
}) {
  const home = effectiveHome ? teamByCode[effectiveHome] : null;
  const away = effectiveAway ? teamByCode[effectiveAway] : null;
  const played = isPlayed(result);
  const homeWin = played && Number(result.homeScore) > Number(result.awayScore);
  const awayWin = played && Number(result.awayScore) > Number(result.homeScore);

  if (compact) {
    return (
      <div
        className={`rounded-lg border bg-surface-container-high/80 p-2.5 ${
          played ? 'border-secondary/40' : 'border-outline-variant/20'
        }`}
      >
        <p className="mb-1.5 text-[9px] font-bold uppercase tracking-wider text-on-surface-variant">
          {match.fifa ? `M${match.fifa}` : match.label}
        </p>
        <div className="space-y-1">
          <div className={`flex items-center justify-between text-xs font-bold ${homeWin ? 'text-secondary' : ''}`}>
            <span className="uppercase">{home?.code ?? 'TBD'}</span>
            <span>{played ? result.homeScore : '–'}</span>
          </div>
          <div className={`flex items-center justify-between text-xs font-bold ${awayWin ? 'text-secondary' : 'text-on-surface-variant'}`}>
            <span className="uppercase">{away?.code ?? 'TBD'}</span>
            <span>{played ? result.awayScore : '–'}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`glass-card overflow-hidden rounded-xl transition-all ${
        played ? 'border-l-4 border-l-secondary match-active gold-glow' : ''
      }`}
    >
      <div className="p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="rounded bg-secondary/15 px-2 py-0.5 text-[10px] font-bold text-secondary">
              {match.fifa ? `M${match.fifa}` : match.label}
            </span>
            {match.short && (
              <p className="mt-1 truncate text-[10px] font-medium uppercase tracking-wide text-on-surface-variant">
                {match.short}
              </p>
            )}
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
              played ? 'bg-secondary/20 text-secondary' : 'bg-surface-container-highest text-on-surface-variant'
            }`}
          >
            {played ? 'Final' : 'Pendiente'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <TeamBlock
            code={home?.code}
            name={home?.name}
            image={home ? getCountryImage(home.code) : null}
            isWinner={homeWin}
          />
          <div className="flex shrink-0 flex-col items-center gap-1 px-1">
            <ScoreInput
              value={result?.homeScore}
              label={`Goles ${home?.code ?? 'local'}`}
              onChange={(v) => onScoreChange(match.id, 'homeScore', v)}
            />
            <span className="text-[10px] text-on-surface-variant/50">vs</span>
            <ScoreInput
              value={result?.awayScore}
              label={`Goles ${away?.code ?? 'visitante'}`}
              onChange={(v) => onScoreChange(match.id, 'awayScore', v)}
            />
          </div>
          <TeamBlock
            code={away?.code}
            name={away?.name}
            image={away ? getCountryImage(away.code) : null}
            isWinner={awayWin}
            align="right"
          />
        </div>
      </div>
    </div>
  );
}

function isPlayed(result) {
  return (
    result?.homeScore != null &&
    result?.homeScore !== '' &&
    result?.awayScore != null &&
    result?.awayScore !== ''
  );
}
