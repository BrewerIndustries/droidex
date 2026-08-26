import { UI } from '../data/ui';

interface Props {
  visible: boolean;
}

export function EventLockedOverlay({ visible }: Props) {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
      <span className="text-red-400 text-2xs font-bold text-center leading-tight px-1">
        {UI.eventLocked.split(' ').map((line) => (
          <div key={line}>{line}</div>
        ))}
      </span>
    </div>
  );
}
