import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { playersData } from '../data/players';

export const GameContext = createContext(null);

const STORAGE_KEY = 'paniniSim2026v4';

export const GameProvider = ({ children }) => {
  const [collection, setCollection] = useState({});
  const [matchResults, setMatchResults] = useState({});
  const [teamOverrides, setTeamOverrides] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCollection(parsed.collection ?? {});
        setMatchResults(parsed.matchResults ?? {});
        setTeamOverrides(parsed.teamOverrides ?? {});
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    } else {
      const legacy = localStorage.getItem('paniniSim2026v3');
      if (legacy) {
        try {
          const { collection: savedCollection } = JSON.parse(legacy);
          setCollection(savedCollection ?? {});
        } catch {
          /* ignore */
        }
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ collection, matchResults, teamOverrides })
    );
  }, [collection, matchResults, teamOverrides, isLoaded]);

  const incrementSticker = useCallback((sticker) => {
    setCollection((prev) => {
      const current = prev[sticker.id]?.count ?? 0;
      return {
        ...prev,
        [sticker.id]: { count: current + 1, data: sticker },
      };
    });
  }, []);

  const decrementSticker = useCallback((sticker) => {
    setCollection((prev) => {
      const current = prev[sticker.id]?.count ?? 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[sticker.id];
        return next;
      }
      return {
        ...prev,
        [sticker.id]: { count: current - 1, data: sticker },
      };
    });
  }, []);

  const updateMatchScore = useCallback((matchId, field, value) => {
    setMatchResults((prev) => ({
      ...prev,
      [matchId]: { ...prev[matchId], [field]: value },
    }));
  }, []);

  const updateMatchTeams = useCallback((matchId, side, code) => {
    setTeamOverrides((prev) => ({
      ...prev,
      [matchId]: { ...prev[matchId], [side]: code },
    }));
  }, []);

  const totalCollected = useMemo(
    () => Object.values(collection).filter((e) => e.count >= 1).length,
    [collection]
  );

  const totalPlayers = playersData.length;
  const progress = totalPlayers > 0 ? ((totalCollected / totalPlayers) * 100).toFixed(1) : 0;

  const totalSwapAvailable = useMemo(
    () =>
      Object.values(collection).reduce(
        (sum, entry) => sum + Math.max(0, entry.count - 1),
        0
      ),
    [collection]
  );

  return (
    <GameContext.Provider
      value={{
        collection,
        matchResults,
        teamOverrides,
        incrementSticker,
        decrementSticker,
        updateMatchScore,
        updateMatchTeams,
        totalCollected,
        totalPlayers,
        progress,
        totalSwapAvailable,
        isLoaded,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame debe usarse dentro de GameProvider');
  }
  return context;
};
