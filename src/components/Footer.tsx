import { Link } from 'react-router-dom';
import { useInstallPrompt } from '../hooks/useInstallPrompt';
import { UI } from '../data/ui';
import { useState } from 'react';

export function Footer() {
  const { canInstall, install } = useInstallPrompt();
  const [fanOpen, setFanOpen] = useState(false);

  async function shareApp() {
    const url = 'https://droidex.dabrewer.dev';

    if (navigator.share) {
      await navigator.share({
        title: 'Droidex',
        text: 'Track Fortnite Star Wars Droid collection progress.',
        url,
      });

      return;
    }

    try {
      await navigator.clipboard.writeText(url);

      alert(UI.copied);
    } catch {
      window.prompt(UI.copied, url);
    }
  }

  return (
    <footer className="px-4 py-3 border-t border-zinc-800 bg-black text-center text-xs text-zinc-500">
      <div className="font-semibold text-zinc-400">Droidex</div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-2 justify-center">
        <Link
          to="/tips"
          className="
            px-3 py-1 rounded border text-[10px]
            border-zinc-700 text-zinc-500
            hover:border-cyan-400
            hover:text-cyan-300
            transition-all
          "
        >
          {UI.footerTips}
        </Link>

        <Link
          to="/about"
          className="
            px-3 py-1 rounded border text-[10px]
            border-zinc-700 text-zinc-500
            hover:border-cyan-400
            hover:text-cyan-300
            transition-all
          "
        >
          {UI.footerAbout}
        </Link>

        <a
          href="https://www.fortnite.com/@foad/7865-8305-9184"
          target="_blank"
          rel="noreferrer"
          className="
    px-3 py-1 rounded border text-[10px]
    border-zinc-700 text-zinc-500
    hover:border-cyan-400
    hover:text-cyan-300
    transition-all
  "
        >
          {UI.footerCommunity}
        </a>

        <button
          onClick={shareApp}
          className="
            px-3 py-1 rounded border text-[10px]
            border-zinc-700 text-zinc-500
            hover:border-cyan-400
            hover:text-cyan-300
            transition-all
          "
        >
          {UI.footerShare}
        </button>

        {canInstall && (
          <button
            onClick={install}
            className="
              px-3 py-1 rounded border text-[10px]
              border-emerald-600
              text-emerald-400
              shadow-[0_0_12px_rgba(16,185,129,.2)]
            "
          >
            {UI.footerInstall}
          </button>
        )}
      </div>
      <div className="mt-4 pt-3 border-t border-zinc-800 text-[10px] leading-relaxed text-zinc-600">
        <button
          onClick={() => setFanOpen(!fanOpen)}
          className="w-full text-center"
        >
          <div className="font-bold tracking-wider">
            {UI.fanProject} {fanOpen ? '▲' : '▼'}
          </div>
        </button>

        {fanOpen && (
          <>
            <p className="mt-3">{UI.fanText1}</p>

            <p className="mt-2">{UI.fanText2}</p>

            <p className="mt-2">{UI.fanText3}</p>

            <p className="mt-2">{UI.fanText4}</p>
          </>
        )}
      </div>
    </footer>
  );
}
