import { APP_VERSION } from '../data/version';
import { GUIDE } from '../data/guide';
import { UI } from '../data/ui';
import { useAppUpdate } from '../hooks/useAppUpdate';
import { useState } from 'react';

import { getSystemStatus } from '../lib/systemStatus';

import { exportData, importData } from '../lib/exportImport';
import { createUpdateBackup } from '../lib/backup';

export function AboutPage() {
  const { updateAvailable, latestVersion } = useAppUpdate();
  const [updating, setUpdating] = useState(false);
  const fileInputId = 'droidex-import';

  const system = getSystemStatus();

  const ready = system.filter((item) => item.ok).length;
  const total = system.length;
  const percent = Math.round((ready / total) * 100);

  const categories = [
    'application',
    'storage',
    'database',
    'rules',
    'companion',
  ] as const;

  async function forceUpdate() {
    setUpdating(true);

    createUpdateBackup();

    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();

        await Promise.all(registrations.map((reg) => reg.unregister()));
      }

      const keys = await caches.keys();

      await Promise.all(keys.map((key) => caches.delete(key)));

      window.location.reload();
    } catch {
      window.location.reload();
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-white text-xl font-bold">{UI.aboutTitle}</h1>

        <p className="text-zinc-500 text-sm mt-2">{UI.aboutText}</p>

        <div className="mt-2 space-y-2">
          <p className="text-zinc-600 text-xs">
            {UI.installedVersion}: v{APP_VERSION}
          </p>

          {updateAvailable && (
            <>
              <p className="text-cyan-400 text-xs">
                {UI.availableVersion}: v{latestVersion}
              </p>

              <button
                type="button"
                onClick={forceUpdate}
                disabled={updating}
                className="
    mt-2
    px-3
    py-2
    text-xs
    font-bold
    tracking-widest
    rounded-lg
    border
    border-cyan-700
    bg-zinc-900
    text-cyan-400
    disabled:opacity-50
  "
              >
                {updating ? 'UPDATING...' : 'UPDATE APP'}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="text-cyan-400 text-[10px] font-bold tracking-widest">
          DATA
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={exportData}
            className="
        px-3
        py-2
        text-xs
        font-bold
        tracking-widest
        rounded-lg
        border
        border-cyan-700
        bg-zinc-900
        text-cyan-400
      "
          >
            EXPORT DATA
          </button>

          <label
            htmlFor={fileInputId}
            className="
        px-3
        py-2
        text-xs
        font-bold
        tracking-widest
        rounded-lg
        border
        border-orange-700
        bg-zinc-900
        text-orange-400
        text-center
        cursor-pointer
      "
          >
            IMPORT DATA
          </label>

          <input
            id={fileInputId}
            type="file"
            accept=".json"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              try {
                await importData(file);
              } catch {
                alert('Invalid Droidex file');
              }
            }}
          />
          <div className="text-xs text-zinc-500 space-y-1">
            <div>Backup contains:</div>

            <div>✓ Collected</div>
            <div>✓ Present</div>
            <div>✓ Flawless</div>
            <div>✓ Rebirth Path</div>
            <div>✓ Rebirth Level</div>
            <div className="pt-2 text-[11px] text-zinc-600">
              Exported as a JSON file. Can be transferred between devices.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="text-cyan-400 text-[8px] font-bold tracking-widest">
          SYSTEM
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-xs text-zinc-400">
            <span>
              {ready} / {total} Systems Ready
            </span>
            <span>{percent}%</span>
          </div>

          <div className="mt-2 h-2 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-cyan-500 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="mt-2 text-xs text-zinc-500">
            All core systems operational.
          </div>
        </div>

        <div className="mt-4 space-y-5">
          {categories.map((category) => {
            const items = system.filter((item) => item.category === category);

            if (!items.length) return null;

            return (
              <div key={category} className="space-y-4">
                <div className="text-[10px] tracking-widest text-cyan-500 font-bold uppercase">
                  {category}
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-zinc-800 pb-4 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-white">
                        {item.ok ? '✓' : '○'} {item.label}
                      </div>

                      <div
                        className={`
                text-[10px]
                font-bold
                tracking-widest
                ${item.ok ? 'text-cyan-400' : 'text-orange-400'}
              `}
                      >
                        {item.status.toUpperCase()}
                      </div>
                    </div>

                    <div className="mt-1 ml-5 text-xs text-zinc-500">
                      {item.detail}
                    </div>

                    {item.recommendation && (
                      <>
                        <div className="mt-3 ml-5 text-[10px] text-amber-400 tracking-widest">
                          RECOMMENDATION
                        </div>

                        <div className="ml-5 text-xs text-zinc-400">
                          {item.recommendation}
                        </div>
                      </>
                    )}

                    {item.technical && (
                      <>
                        <div className="mt-3 ml-5 text-[10px] text-cyan-500 tracking-widest">
                          TECHNICAL
                        </div>

                        <div className="ml-5 text-xs text-zinc-600">
                          {item.technical}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-cyan-400 text-[10px] font-bold tracking-widest">
        {UI.appGuide}
      </div>
      <ul className="mt-3 text-sm text-zinc-300 space-y-2">
        <li>{UI.feature1}</li>
        <li>{UI.feature2}</li>
        <li>{UI.feature3}</li>
        <li>{UI.feature4}</li>
      </ul>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="text-cyan-400 text-[10px] font-bold tracking-widest">
          APP GUIDE
        </div>

        <div className="mt-3 space-y-3">
          {GUIDE.map((item) => (
            <div key={item.id}>
              <div className="text-cyan-300 text-sm font-medium">
                {item.title}
              </div>

              <div className="text-sm text-zinc-300 whitespace-pre-wrap">
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="text-cyan-400 text-[10px] font-bold tracking-widest">
          {UI.builtWith}
        </div>

        <div className="mt-3 text-sm text-zinc-300 space-y-1">
          <div>React</div>
          <div>Vite</div>
          <div>Tailwind</div>
          <div>GitHub Pages</div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="text-cyan-400 text-[10px] font-bold tracking-widest">
          {UI.specialTools}
        </div>
        <p className="mt-3 text-sm text-zinc-300">{UI.thumbnailTool}</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="text-cyan-400 text-[10px] font-bold tracking-widest">
          {UI.fork}
        </div>

        <a
          href="https://github.com/fluxx-dev/droidex"
          target="_blank"
          rel="noreferrer"
          className="text-cyan-400 text-sm"
        >
          {UI.github}
        </a>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}og-image.png`}
          alt="Droidex Android Offline"
          className="w-full"
        />
      </div>
    </div>
  );
}
