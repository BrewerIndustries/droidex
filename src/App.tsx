import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import type { TierOrAll, DroidType, Rarity } from './lib/droidTypes';
import { useTracker } from './hooks/useTracker';
import { Header } from './components/Header';
import { RebirthsPage } from './components/RebirthsPage';
import { Footer } from './components/Footer';
import { TipsPage } from './components/TipsPage';
import { AboutPage } from './components/AboutPage';
import { RebirthPathSelector } from './components/RebirthPathSelector';
import { Workspace } from './components/Workspace';
import { TeamPage } from './components/TeamPage';

type RarityOrAll = Rarity | 'ALL';
type DroidTypeOrAll = DroidType | 'ALL';
type CollectionStatus = 'ALL' | 'OWNED' | 'MISSING';
type FlawlessStatus = 'ALL' | 'FLAWLESS' | 'MISSING';

export default function App() {
  const {
    collected,
    present,
    flawless,

    team,
    assignDroid,
    unassignDroid,

    toggleCollected,
    togglePresent,
    toggleFlawless,

    rebirthLevel,
    setRebirthLevel,
    rebirthPath,
    setRebirthPath,
  } = useTracker(null);

  const [tier, setTier] = useState<TierOrAll>('DEFAULT');
  const [rarity, setRarity] = useState<RarityOrAll>('ALL');
  const [droidClass, setDroidClass] = useState<DroidTypeOrAll>('ALL');
  const [collectionStatus, setCollectionStatus] =
    useState<CollectionStatus>('ALL');

  const [flawlessStatus, setFlawlessStatus] = useState<FlawlessStatus>('ALL');

  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(true);

  const [collectionOpen, setCollectionOpen] = useState(true);

  const [rebirthOpen, setRebirthOpen] = useState(true);

  const [highlightedIds, setHighlightedIds] = useState<Set<string>>(new Set());
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setCollectionStatus('ALL');
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black flex flex-col font-mono">
      <Header
        collected={collected}
        flawless={flawless}
        rebirthLevel={rebirthLevel}
        onShowMissing={() => {
          setTier('ALL');
          setCollectionStatus('MISSING');
        }}
      />

      <RebirthPathSelector value={rebirthPath} onChange={setRebirthPath} />

      <div className="flex-1 min-h-0 flex flex-col">
        <Routes>
          <Route
            path="/"
            element={
              <Workspace
                filtersOpen={filtersOpen}
                setFiltersOpen={setFiltersOpen}
                collectionOpen={collectionOpen}
                setCollectionOpen={setCollectionOpen}
                rebirthOpen={rebirthOpen}
                setRebirthOpen={setRebirthOpen}
                search={search}
                onSearch={setSearch}
                tier={tier}
                onTier={setTier}
                rarity={rarity}
                onRarity={setRarity}
                droidClass={droidClass}
                onClass={setDroidClass}
                collectionStatus={collectionStatus}
                onCollection={setCollectionStatus}
                flawlessStatus={flawlessStatus}
                onFlawless={setFlawlessStatus}
                rebirthPath={rebirthPath}
                rebirthLevel={rebirthLevel}
                setRebirthLevel={setRebirthLevel}
                collected={collected}
                present={present}
                flawless={flawless}
                highlightedIds={highlightedIds}
                setHighlightedIds={setHighlightedIds}
                onToggleCollected={toggleCollected}
                onTogglePresent={togglePresent}
                onToggleFlawless={toggleFlawless}
              />
            }
          />
          <Route
            path="/rebirths"
            element={
              <RebirthsPage
                rebirthPath={rebirthPath}
                rebirthLevel={rebirthLevel}
                collected={collected}
                present={present}
                onSetRebirth={setRebirthLevel}
                onTogglePresent={togglePresent}
                onMarkLevelDone={(ids) => {
                  ids.forEach((id) => {
                    if (!present.has(id)) {
                      togglePresent(id);
                    }
                  });
                }}
              />
            }
          />
          <Route
            path="/team"
            element={
              <TeamPage
                team={team}
                collected={collected}
                rebirthLevel={rebirthLevel}
                onAssign={assignDroid}
                onUnassign={unassignDroid}
              />
            }
          />
          <Route path="/tips" element={<TipsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
