import { NavLink } from 'react-router-dom';

const TABS = [
  { to: '/', label: 'DROIDEX' },
  { to: '/rebirths', label: 'REBIRTH' },
  { to: '/team', label: 'TEAM' },
];

/** Primary navigation. The three places you actually work. */
export function TabNav() {
  return (
    <nav className="flex px-3 pt-2 gap-1 border-b border-zinc-800 bg-black">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) =>
            [
              'flex-1 px-2 py-3 min-h-tap flex items-center justify-center text-xs font-bold tracking-widest text-center',
              'rounded-t-md border-t border-x transition-all duration-150',
              isActive
                ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500 -mb-px border-b border-b-zinc-950 shadow-[0_0_10px_rgba(34,211,238,0.25)]'
                : 'text-zinc-500 border-transparent hover:text-cyan-400',
            ].join(' ')
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
