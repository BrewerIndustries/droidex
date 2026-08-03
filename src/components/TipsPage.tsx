import { useState } from 'react';
import { TIPS } from '../data/tips';
import { TipCard } from './TipCard';
import { UI } from '../data/ui';
import { t } from '../lib/t';

export function TipsPage() {
  const [filter, setFilter] = useState('ALL');

  const filteredTips = TIPS.filter((tip) => {
    if (filter === 'ALL') return true;
    if (filter === 'VERIFIED') return tip.verified;
    if (filter === 'COMMUNITY') return !tip.verified;

    return tip.category === filter;
  });

  const sortedTips = [...filteredTips].sort((a, b) => b.priority - a.priority);

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-white text-xl font-bold mb-1">Droid Guide</h1>

      <p className="text-xs text-zinc-500 mb-4">
        Community findings, progression advice and hidden mechanics.
      </p>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          'ALL',
          'VERIFIED',
          'COMMUNITY',
          'DISCOVERY',
          'EVENT',
          'MISSION',
          'TEAM',
          'PROGRESSION',
        ].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`
  	    px-3 py-1 rounded border text-[10px]
  	    whitespace-nowrap transition-all
  	    ${
          filter === item
            ? 'border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,.25)]'
            : 'border-zinc-700 text-zinc-500'
        }
	`}
          >
            {item}
          </button>
        ))}
      </div>

      {sortedTips.map((tip) => (
        <TipCard key={tip.id} tip={tip} />
      ))}

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="text-cyan-400 text-xs tracking-widest font-bold mb-2">
          {t(UI.communityTitle)}
        </div>

        <div className="text-xs text-zinc-400 mb-3">{t(UI.communityText)}</div>

        <a
          href="mailto:fluxx-dev@proton.me?subject=Droidex%20Feedback"
          className="text-sm text-cyan-400 hover:text-cyan-300"
        >
          {t(UI.communityReport)}
        </a>
      </div>
    </div>
  );
}
