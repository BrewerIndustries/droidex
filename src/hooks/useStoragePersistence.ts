import { useEffect, useState } from 'react';
import {
  requestPersistentStorage,
  toStatusItem,
  type StoragePersistence,
} from '../lib/storagePersistence';
import type { SystemStatusItem } from '../lib/systemStatus';

/**
 * Requests persistent storage once on mount and reports the outcome so the
 * About page can show whether the save is safe from eviction.
 */
export function useStoragePersistence(): {
  persistence: StoragePersistence | null;
  statusItem: SystemStatusItem | null;
} {
  const [persistence, setPersistence] = useState<StoragePersistence | null>(
    null
  );

  useEffect(() => {
    let cancelled = false;
    requestPersistentStorage().then((p) => {
      if (!cancelled) setPersistence(p);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    persistence,
    statusItem: persistence ? toStatusItem(persistence) : null,
  };
}
