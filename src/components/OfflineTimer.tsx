import { Clock3 } from 'lucide-react';
import { useOfflineTimer } from '../hooks/useOfflineTimer';
import { useState } from 'react';

export function OfflineTimer() {
  const { remaining, durationHours, setDuration, start, reset } =
    useOfflineTimer();

  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Hauptbutton */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="
        flex
        items-center
        justify-between
        rounded-lg
        border
        border-zinc-700
        bg-zinc-900
        px-2
        py-1.5
        min-h-tap
        text-cyan-400
      "
      >
        <div className="flex items-center gap-2">
          <Clock3 size={15} />

          <span className="text-xs uppercase tracking-widest">Offline</span>
        </div>

        <span className="font-semibold text-xs leading-none">{remaining}</span>
      </button>

      {/* Panel */}
      {open && (
        <div
          className="
  mt-2
  rounded-lg
  border
  border-zinc-700
  bg-black
  p-2
  shadow-2xl
"
        >
          <div className="text-2xs tracking-widest text-zinc-500 mb-2">
            OFFLINE TIMER
          </div>

          <select
            value={durationHours}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="
            w-full
            bg-zinc-950
            border
            border-zinc-700
            rounded
            px-2
            py-2
            text-sm
          "
          >
            <option value={5}>05:00</option>
            <option value={6}>06:00</option>
            <option value={8}>08:00</option>
          </select>

          <div className="flex gap-2 mt-2">
            <button
              onClick={start}
              className="
              flex-1
              rounded
              bg-cyan-900
              hover:bg-cyan-800
              py-2
              text-xs
            "
            >
              Logged out
            </button>

            <button
              onClick={reset}
              className="
              flex-1
              rounded
              bg-zinc-800
              hover:bg-zinc-700
              py-2
              text-xs
            "
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
