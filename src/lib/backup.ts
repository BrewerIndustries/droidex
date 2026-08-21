// Storage Keys

const STORAGE_KEY = 'droidex_v2';
const UPDATE_BACKUP_KEY = 'droidex_v2_update_backup';

// Device-local reminder bookkeeping. Deliberately kept out of droidex_v2:
// importing someone else's save should not claim you have backed yours up.
const LAST_EXPORT_KEY = 'droidex_last_export_at';
const SNOOZE_KEY = 'droidex_backup_snooze_until';

// Internal Helpers

function getRawData() {
  return localStorage.getItem(STORAGE_KEY);
}

function getRawUpdateBackup() {
  return localStorage.getItem(UPDATE_BACKUP_KEY);
}

// Data API

export function getCurrentData() {
  const raw = getRawData();

  if (!raw) return null;

  return JSON.parse(raw);
}

export function saveCurrentData(data: unknown) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Backup Export

export function exportBackup(data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');

  a.href = url;
  a.download = 'droidex-backup.json';

  a.click();

  URL.revokeObjectURL(url);
}

// Update Recovery

export function createUpdateBackup() {
  const data = getCurrentData();

  if (!data) return false;

  localStorage.setItem(UPDATE_BACKUP_KEY, JSON.stringify(data));

  return true;
}

export function restoreUpdateBackup() {
  const raw = getRawUpdateBackup();

  if (!raw) return false;

  saveCurrentData(JSON.parse(raw));

  return true;
}

export function clearUpdateBackup() {
  localStorage.removeItem(UPDATE_BACKUP_KEY);
}

export function hasUpdateBackup() {
  return getRawUpdateBackup() !== null;
}

export function recoverIfNecessary() {
  if (getCurrentData()) {
    clearUpdateBackup();

    return false;
  }

  if (!hasUpdateBackup()) {
    return false;
  }

  try {
    restoreUpdateBackup();
    clearUpdateBackup();

    return true;
  } catch {
    clearUpdateBackup();

    return false;
  }
}

// Export reminder bookkeeping

function readTime(key: string): number | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

/** When the user last downloaded a backup, or null if they never have. */
export function getLastExportAt(): number | null {
  return readTime(LAST_EXPORT_KEY);
}

export function markExported(now: number = Date.now()) {
  localStorage.setItem(LAST_EXPORT_KEY, String(now));
  localStorage.removeItem(SNOOZE_KEY);
}

export function getSnoozedUntil(): number | null {
  return readTime(SNOOZE_KEY);
}

export function snoozeBackupReminder(days: number, now: number = Date.now()) {
  localStorage.setItem(SNOOZE_KEY, String(now + days * 86_400_000));
}

// Status

export function getBackupInfo() {
  const recoveryAvailable = hasUpdateBackup();

  return {
    hasData: getCurrentData() !== null,

    recoveryAvailable,

    recoveryState: recoveryAvailable ? 'Recovery ready' : 'Idle',
  };
}
