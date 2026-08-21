import { useEffect, useState } from 'react';
import {
  getLastExportAt,
  getSnoozedUntil,
  snoozeBackupReminder,
} from '../lib/backup';

/** Enough progress that losing it would actually sting. */
const MIN_CARDS_TO_CARE = 10;
/** How long an export buys before we mention it again. */
const REMIND_AFTER_DAYS = 14;
/** How long "Later" buys. */
const SNOOZE_DAYS = 7;

const DAY = 86_400_000;

interface Options {
  collectedCount: number;
  /** False when the browser put us in best-effort storage, which raises the stakes. */
  storagePersisted: boolean | null;
}

/**
 * Decides whether to nudge the user to download a backup.
 *
 * Progress lives only in this browser's localStorage, so a cleared site or an
 * evicted origin loses it outright. The nudge is deliberately quiet: it waits
 * until there is something worth losing, stays away for a fortnight after an
 * export, and takes "Later" for an answer.
 */
export function useBackupReminder({
  collectedCount,
  storagePersisted,
}: Options) {
  const [dismissed, setDismissed] = useState(false);
  const [now] = useState(() => Date.now());

  const lastExport = getLastExportAt();
  const snoozedUntil = getSnoozedUntil();

  const enoughProgress = collectedCount >= MIN_CARDS_TO_CARE;
  const overdue =
    lastExport === null || now - lastExport > REMIND_AFTER_DAYS * DAY;
  const snoozing = snoozedUntil !== null && now < snoozedUntil;

  const visible = !dismissed && enoughProgress && overdue && !snoozing;

  // Best-effort storage is the case where this actually matters, so say so.
  const atRisk = storagePersisted === false;

  useEffect(() => {
    if (!visible) setDismissed(false);
  }, [visible]);

  return {
    visible,
    atRisk,
    neverExported: lastExport === null,
    daysSinceExport:
      lastExport === null ? null : Math.floor((now - lastExport) / DAY),
    snooze: () => {
      snoozeBackupReminder(SNOOZE_DAYS);
      setDismissed(true);
    },
    dismiss: () => setDismissed(true),
  };
}
