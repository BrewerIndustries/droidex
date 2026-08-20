import { REBIRTH_PATH_NUMBERS } from '../data/rebirthPaths';

type Props = {
  value: number;
  onChange: (path: number) => void;
};

export function RebirthPathSelector({ value, onChange }: Props) {
  return (
    <div className="flex justify-center gap-2 py-2">
      {REBIRTH_PATH_NUMBERS.map((path) => (
        <button
          key={path}
          onClick={() => onChange(path)}
          className={`px-3 py-1 rounded border ${
            value === path
              ? 'border-orange-500 text-orange-400'
              : 'border-zinc-700 text-zinc-400'
          }`}
        >
          RB{path}
        </button>
      ))}
    </div>
  );
}
