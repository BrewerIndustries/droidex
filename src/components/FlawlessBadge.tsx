interface Props {
  enabled: boolean;
  active: boolean;

  droidName: string;

  onToggleFlawless: (id: string) => void;
}

export function FlawlessBadge({
  enabled,
  active,
  droidName,
  onToggleFlawless,
}: Props) {
  if (!enabled) return null;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onToggleFlawless(droidName);
      }}
      className={`
        absolute
        top-0.5
        left-0.5
        z-20
        w-5
        h-5
        rounded-full
        tap-tl
        flex
        items-center
        justify-center
        cursor-pointer
        transition-all
        ${
          active
            ? 'bg-yellow-500 shadow-[0_0_12px_rgba(255,215,0,0.9)]'
            : 'bg-black/50 border-2 border-zinc-500'
        }
      `}
      title="Flawless"
    >
      <span
        className={`text-lg leading-none transition-all ${
          active
            ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]'
            : 'text-zinc-500'
        }`}
      >
        ✦
      </span>
    </div>
  );
}
