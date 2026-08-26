import { UI } from '../data/ui';

interface Props {
  requiredCredits: string;
}

export function RequiredCreditsCard({ requiredCredits }: Props) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="h-5" />

      <div className="credits-card relative w-[5.5rem] h-[5.5rem] rounded-xl border-2 border-amber-500/70 flex flex-col items-center justify-center gap-0.5 overflow-hidden">
        <div className="credits-card-glow absolute inset-0 pointer-events-none" />

        <span className="text-amber-400 text-base leading-none relative z-10">
          ◎
        </span>

        <span className="text-amber-400 font-black text-base leading-tight text-center px-1 relative z-10">
          {requiredCredits}
        </span>

        <span className="text-amber-600 text-4xs uppercase tracking-widest relative z-10">
          {UI.credits}
        </span>
      </div>

      <span className="text-zinc-400 text-2xs font-bold w-[5.5rem] text-center truncate">
        {UI.credits}
      </span>
    </div>
  );
}
