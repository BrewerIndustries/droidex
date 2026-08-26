import { exportData } from '../lib/exportImport';

interface Props {
  visible: boolean;
  /** Storage is best-effort, so the browser may evict the save. */
  atRisk: boolean;
  neverExported: boolean;
  daysSinceExport: number | null;
  onSnooze: () => void;
  onDone: () => void;
}

/**
 * Quiet corner nudge to download a backup.
 *
 * Non-blocking on purpose — progress is not in danger this second, and a modal
 * that interrupts play to talk about file exports would be worse than the
 * problem it solves.
 */
export function BackupReminder({
  visible,
  atRisk,
  neverExported,
  daysSinceExport,
  onSnooze,
  onDone,
}: Props) {
  if (!visible) return null;

  const line = neverExported
    ? 'Your collection has never been backed up.'
    : `Last backup was ${daysSinceExport} days ago.`;

  return (
    <div
      role="status"
      className="fixed bottom-3 right-3 z-50 w-[17rem] max-w-[calc(100vw-1.5rem)] rounded-lg border border-cyan-800 bg-zinc-950/95 p-3 shadow-[0_0_24px_rgba(0,0,0,0.8)] backdrop-blur"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-2xs font-bold tracking-widest text-cyan-400">
          BACKUP REMINDER
        </div>
        <button
          type="button"
          onClick={onSnooze}
          title="Remind me later"
          className="text-zinc-600 hover:text-zinc-300 text-xs leading-none"
        >
          ✕
        </button>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-zinc-300">{line}</p>

      <p className="mt-1 text-2xs leading-relaxed text-zinc-500">
        {atRisk
          ? 'Progress is saved only in this browser, and it is in best-effort storage — clearing site data or a long gap between visits can lose it.'
          : 'Progress is saved only in this browser. A backup file also moves it to another device.'}
      </p>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => {
            exportData();
            onDone();
          }}
          className="flex-1 rounded border border-cyan-600 bg-cyan-500/10 px-2 py-2 min-h-tap text-2xs font-bold tracking-wider text-cyan-300 hover:bg-cyan-500/20"
        >
          DOWNLOAD BACKUP
        </button>
        <button
          type="button"
          onClick={onSnooze}
          className="rounded border border-zinc-700 px-3 py-2 min-h-tap text-2xs tracking-wider text-zinc-500 hover:text-zinc-300"
        >
          LATER
        </button>
      </div>
    </div>
  );
}
