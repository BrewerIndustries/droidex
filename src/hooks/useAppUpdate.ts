// src/hooks/useAppUpdate.ts

import { useEffect, useState } from 'react';
import { APP_VERSION } from '../data/version';
import { createUpdateBackup, hasUpdateBackup } from '../lib/backup';

export function useAppUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [latestVersion, setLatestVersion] = useState(APP_VERSION);

  useEffect(() => {
    const checkForUpdate = () => {
      fetch(`${import.meta.env.BASE_URL}version.json?t=${Date.now()}`)
        .then((r) => r.json())
        .then((data) => {
          setLatestVersion(data.version);

          if (data.version !== APP_VERSION) {
            if (!hasUpdateBackup()) {
              createUpdateBackup();
            }

            setUpdateAvailable(true);
          }
        })
        .catch(() => {});
    };

    // Immediately on startup
    checkForUpdate();

    // When the app becomes visible again
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkForUpdate();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return {
    updateAvailable,
    latestVersion,
  };
}
