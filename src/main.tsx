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
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
  });
}
