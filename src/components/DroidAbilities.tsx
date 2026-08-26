import { DROID_INFO } from '../data/droidInfo';

interface Props {
  info: (typeof DROID_INFO)[string];
}

export function DroidAbilities({ info }: Props) {
  return (
    <>
      {info?.abilities && (
        <div className="mt-1 flex flex-wrap gap-1">
          {info.abilities.map((ability) => (
            <span
              key={ability}
              className="
                text-4xs
                px-1
                py-px
                rounded
                border
                border-cyan-500/40
                bg-cyan-500/10
                text-cyan-300
              "
            >
              {ability}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
