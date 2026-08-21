import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { recoverIfNecessary } from './lib/backup';
import { requestPersistentStorage } from './lib/storagePersistence';

// Ask up front so the save is in persistent mode before anything is written.
void requestPersistentStorage();

if (recoverIfNecessary()) {
  window.location.reload();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
// Production only. In dev, Vite serves unhashed module paths like
// /src/App.tsx, and the worker's cache-first rule for non-navigation requests
// pins them — so edits stop appearing and the app boots against stale modules.
// Hashed production filenames do not have that problem.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
  });
}
