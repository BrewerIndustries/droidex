import { useEffect, useState } from 'react';

const STORAGE_KEY = 'offlineTimer';
const BACKUP_KEY = 'offlineTimer_backup';

type TimerData = {
  startedAt: number | null;
  durationHours: number;
};

export function useOfflineTimer() {
  function readLocalStorage(): TimerData | null {
    const candidates = [
      localStorage.getItem(STORAGE_KEY),
      localStorage.getItem(BACKUP_KEY),
    ];

    for (const raw of candidates) {
      if (!raw) continue;

      try {
        return JSON.parse(raw) as TimerData;
      } catch {
        // try the next candidate
      }
    }

    return null;
  }

  const [data, setData] = useState<TimerData>(() => {
    return (
      readLocalStorage() ?? {
        startedAt: null,
        durationHours: 8,
      }
    );
  });

  const [remaining, setRemaining] = useState('');

  useEffect(() => {
    const payload = JSON.stringify(data);

    localStorage.setItem(STORAGE_KEY, payload);
    localStorage.setItem(BACKUP_KEY, payload);
  }, [data]);

  useEffect(() => {
    const tick = () => {
      if (!data.startedAt) {
        setRemaining('--');
        return;
      }

      const end = data.startedAt + data.durationHours * 60 * 60 * 1000;

      const diff = end - Date.now();

      if (diff <= 0) {
        setRemaining('READY');
        return;
      }

      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);

      setRemaining(`${h}h ${m}m`);
    };

    tick();

    const id = setInterval(tick, 30000);

    return () => clearInterval(id);
  }, [data]);

  function start() {
    setData((d) => ({
      ...d,
      startedAt: Date.now(),
    }));
  }

  function reset() {
    setData((d) => ({
      ...d,
      startedAt: null,
    }));
  }

  function setDuration(hours: number) {
    setData((d) => ({
      ...d,
      durationHours: hours,
    }));
  }

  return {
    remaining,
    durationHours: data.durationHours,
    start,
    reset,
    setDuration,
  };
}
