import type { SystemStatusItem } from './systemStatus';

export interface StoragePersistence {
  /** Whether the browser exposes the Storage API at all. */
  supported: boolean;
  /** True once the origin is in persistent mode rather than best-effort. */
  persisted: boolean;
  /** Bytes currently used by this origin, when the browser reports it. */
  usage: number | null;
  /** Bytes this origin is allowed, when the browser reports it. */
  quota: number | null;
}

/**
 * Ask the browser to keep Droidex's save data.
 *
 * By default an origin's storage is "best effort": the browser may evict it
 * under storage pressure, and WebKit clears script-writable storage after seven
 * days without interaction unless the app is installed to the home screen.
 * Persistent mode exempts the origin from that. All progress lives in
 * localStorage, so this is the difference between a save that survives and one
 * that quietly disappears over a fortnight away from the game.
 *
 * Safe to call on every start — once granted it resolves true without
 * re-prompting, and browsers that do not implement it simply report
 * unsupported.
 */
export async function requestPersistentStorage(): Promise<StoragePersistence> {
  if (!navigator.storage?.persist || !navigator.storage?.persisted) {
    return { supported: false, persisted: false, usage: null, quota: null };
  }

  let persisted = false;
  try {
    persisted = await navigator.storage.persisted();
    if (!persisted) persisted = await navigator.storage.persist();
  } catch {
    // Treated as best-effort; nothing else to do.
  }

  let usage: number | null = null;
  let quota: number | null = null;
  try {
    const estimate = await navigator.storage.estimate?.();
    usage = estimate?.usage ?? null;
    quota = estimate?.quota ?? null;
  } catch {
    // Estimates are optional.
  }

  return { supported: true, persisted, usage, quota };
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`;
  return `${(n / 1024 ** 3).toFixed(1)} GB`;
}

/** Renders the persistence state as a row in the About page's SYSTEM list. */
export function toStatusItem(p: StoragePersistence): SystemStatusItem {
  const technical =
    p.usage !== null
      ? `${formatBytes(p.usage)} used${p.quota ? ` of ${formatBytes(p.quota)}` : ''}`
      : 'storage.persist()';

  if (!p.supported) {
    return {
      id: 'persistence',
      category: 'storage',
      label: 'Storage Durability',
      ok: false,
      status: 'Unknown',
      detail: 'Browser cannot report storage durability',
      recommendation: 'Export a backup now and then.',
      technical,
    };
  }

  return {
    id: 'persistence',
    category: 'storage',
    label: 'Storage Durability',
    ok: p.persisted,
    status: p.persisted ? 'Persistent' : 'Best effort',
    detail: p.persisted
      ? 'Save data is exempt from browser eviction'
      : 'Browser may evict save data',
    recommendation: p.persisted
      ? undefined
      : 'Install Droidex as an app, or export a backup regularly.',
    technical,
  };
}
