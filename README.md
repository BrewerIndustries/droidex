## DROIDEX

An offline-first companion for Fortnite Star Wars: Droid Tycoon.

Originally inspired by the Droidex project created by Erik Peik.

Upstream, Droidex is developed by FLUXX DEV as a knowledge-driven companion focused on collection management, rebirth planning and long-term progression.

This repository is the Brewer Industries fork. It is English-only (the upstream de/en/fi localization has been collapsed) and adds the GALACTIC and STELLAR tiers.

---

## Live App

Prod (`main`) — https://droidex.dabrewer.dev/

Dev (`dev`) — https://droidex.dabrewer.dev/dev/

Upstream — https://fluxx-dev.github.io/droidex/

---

## Install as App

Droidex can be installed directly from your browser.

Android / Chrome

1. Open Droidex
2. Tap the browser menu (⋮)
3. Select Install App or Add to Home Screen
4. Droidex appears in the Android app drawer

Installed version includes:

- standalone app mode
- launcher icon
- splash screen
- offline support
- local save data
- no browser UI

No Play Store required.

---

## Features

- Track all Droid Tycoon droids across every tier
- Collection tracking
- Effective Present tracking
- Rebirth planning
- Future rebirth indicators
- Flawless tracking
- Offline income timer
- Local data storage
- Offline-first operation
- Mobile-friendly interface
- Installable PWA

---

## Rebirth Planning

Droidex highlights droids that are required for future rebirth milestones.

Example:

↻ 3·5·7

This means the droid is required again for Rebirth 3, 5 and 7.

Keeping these droids active in your Tycoon or parked in the Lounge can save you from rebuilding them later.

Required rebirth droids are visible directly on Droid Cards and in the Rebirth section.

---

## Data

Droid list, rebirth requirements and gameplay data are based on community-maintained research.

https://star-wars-droid-tycoon.fandom.com/wiki/Droidex

https://docs.google.com/spreadsheets/d/1otLCKSCMKICMlnefirQ8KZhh_rdZTd5Mp8h0UYFUiqg

Current game coverage:

- 70 documented droids / 442 tier cards
- DEFAULT
- GOLD
- DIAMOND
- RAINBOW
- BESKAR
- GALACTIC
- STELLAR tiers
- Rebirths documented through 35, across 5 rebirth paths

GALACTIC and STELLAR are wired through the tier chain, filters, theming and the
tier-DNA strip, and the rebirth paths are rebuilt from the community wiki
(v1.26): 5 paths x 35 levels, including the Galactic levels at RB 27-32 and the
Stellar levels at RB 30-35. Droid artwork for the two new tiers does not exist
yet — those cards fall back to the class icon until art lands.

Data source for droids and rebirths:
https://star-wars-droid-tycoon.fandom.com/wiki/Rebirths

---

## Tech Stack

- React
- TypeScript
- Vite
- TailwindCSS
- localStorage
- Service Worker
- Web Manifest
- GitHub Pages
- GitHub Actions

---

## Architecture

Droidex follows a domain-driven architecture.

DATA
↓
RULES
↓
FACTS
↓
STATE
↓
UI
↓
COMPANION

This separation keeps gameplay logic independent from React components and makes future game updates easier to integrate.

---

## Community

Droidex is a fan-made companion app created for the Star Wars: Droid Tycoon community.

Official game information:

FOAD (Future Trash)
https://www.foad.gg/

Official community:

FOAD Discord
https://discord.gg/foad

Many Droidex features, game data, and gameplay improvements are inspired by community research, player feedback, and discoveries shared by the FOAD community.

---

## Credits

Original project:

Erik Peik

https://github.com/erikpeik/droidex

Additional work in the FLUXX DEV fork:

- Offline-first architecture
- Local-first persistence
- Collection tracking
- Effective Present system
- Rebirth planning
- Flawless tracking
- Offline income timer
- Mobile UI improvements
- Progressive Web App support

Community research

FOAD Discord Community

https://discord.gg/foad

---

## Fan Project Notice

Droidex is an independent fan-made companion application for Star Wars: Droid Tycoon.

It is not affiliated with, endorsed by, sponsored by, or approved by Future Trash, Epic Games, Disney, Lucasfilm Ltd., or any other rights holder.

Official game website:
https://www.foad.gg/

Official community:
https://discord.gg/foad/

Fortnite is a trademark of Epic Games.

Star Wars and related names are trademarks of Lucasfilm Ltd. / Disney.

All game-related assets, names, and imagery belong to their respective owners.

---

## Development

```
npm install
npm run dev      # http://localhost:8888
npm run build
```

Deployment is automatic: pushing to `dev` runs `.github/workflows/pages.yml`,
which builds **both** branches and publishes `main` to `/` and `dev` to `/dev/`
on one GitHub Pages site. Pushing to `main` alone does not redeploy — re-run the
workflow or push to `dev`.

---

Made with ❤️ for the Droid Tycoon community.
