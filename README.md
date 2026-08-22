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
- Team tab: assign droids to stations and see live earnings
- Per-tier cost / income / sell, with an efficiency rating and payback time
- Collection tracking
- Effective Present tracking
- Rebirth planning
- Future rebirth indicators
- Flawless tracking
- Offline income timer
- Local data storage, kept in persistent mode so browsers do not evict it
- Offline-first operation
- Mobile-friendly interface
- Installable PWA

---

## Team

The **Team** tab mirrors your actual base. Assign collected droids to stations
and it totals what they earn.

Two ways in: pick a slot on the Team tab, or click the **badge in a card's
lower-right corner** in the Droidex. The badge opens a chooser listing every
station with what the droid would earn there, which slots are free, and which
placement carries the class bonus — so the trade-off is visible at the point of
deciding. Once placed the badge shows the station's initial, and reopening it
lets you move the droid or take it off the team.

| Station | Slots at RB0 | Earns |
| --- | --- | --- |
| Worker / Astromech / Battle | 4 / 3 / 2 | Yes — any droid, +10% on class match |
| Lounge | 5 | No — parked storage |
| Companion | 1 | No — contributes its perk |

**You can place several copies of the same droid.** If you have crafted three
Gold Gonks you can work all three, in the same station or spread across
different ones. The card badge shows how many are placed.

**Slots are typed but not gated.** Any droid can work any station; putting one in
a station matching its own class earns it 10% more. The Team tab marks which
placements are getting that bonus, so it is an optimisation to chase rather than
a rule to obey.

Slot counts grow with your rebirth level (rebirths 1-22 grant extra slots), so
the tab shows the capacity you actually have. Earnings are the sum of assigned
workstation income multiplied by the rebirth credit bonus, shown per second, per
minute and per hour.

**A droid in a station is on hand.** Assigning marks it present, so the Rebirth
tab immediately counts it against requirements — including via higher tiers, so
a Beskar Loadlifter in a worker station satisfies a Diamond Loadlifter
requirement. Removing a droid from its station clears that again.

## Rebirth Planning

Droidex highlights droids that are required for future rebirth milestones.

Example:

↻ 3·5·7

This means the droid is required again for Rebirth 3, 5 and 7.

Keeping these droids active in your Tycoon or parked in the Lounge can save you from rebuilding them later.

Required rebirth droids are visible directly on Droid Cards and in the Rebirth section.

---

## Saved Progress

There is no account and no server. Progress lives in `localStorage` on the device
you played on, written on every change, and the About page can export it to a
JSON file to move between devices or keep as a backup.

Droidex nudges you to download a backup when one is overdue — a dismissible
corner prompt, not a blocking dialog. It stays quiet until there are at least 10
cards to lose, goes away for a fortnight after an export, and takes "Later" for a
week. When the browser has put the save in best-effort storage it says so, since
that is the case where it actually matters.

Not to be confused with the **Backup Engine** on the About page. That is
internal: it snapshots your save when a new version is detected and restores it
on startup if the main save has gone. It reads "INACTIVE" whenever no update is
pending, which is its normal idle state.

On startup Droidex calls `navigator.storage.persist()`, which moves the origin
from the browser's default "best effort" storage into persistent mode so the save
is exempt from eviction under storage pressure. Browsers grant this on their own
heuristics — installing Droidex as an app is the surest way to get it. The About
page's **Storage Durability** row reports which mode you are actually in, so the
answer is never a guess.

This matters most on iOS: WebKit clears script-writable storage after seven days
without interaction. A home-screen install is exempt, a browser tab is not.

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

## Droid Economy

Every card shows the numbers for that exact droid *and tier*:

| Field | Meaning |
| --- | --- |
| `COST` | Purchase cost in credits |
| `INC` | Credits per second |
| `SELL` | Credits back when sold — a flat 70% of cost |
| `UPG` | Upgrade Chips this tier step costs |
| `EFF` | Credits/sec earned per 1,000 credits spent — **higher is better** |
| `PAY` | How long the droid takes to earn its own cost back — **lower is better** |
| `/CHIP` | Credits/sec the upgrade buys, per chip spent — **higher is better** |

`EFF` and `PAY` are two views of the same income/cost ratio: `EFF` ranks droids
against each other, `PAY` says what that ratio means in play.

`/CHIP` is the one to read when Upgrade Chips are the bottleneck rather than
credits — and it ranks droids almost the opposite way round. A Rainbow Mouse has
20x the credit efficiency of a Rainbow Gunrunner, but the Gunrunner upgrade
returns 55x more income per chip spent. Epic droids at Rainbow are the sweet
spot for chips; pushing Commons up the tiers is the worst chip spend in the game
even though those cards top the `EFF` table.

The interesting consequence: efficiency *drops* through the Gold/Diamond/Rainbow
upgrades (cost quadruples while income only doubles), then climbs again at
Beskar, Galactic and Stellar, where cost rises much more slowly than income. A
Stellar Mouse is the most credit-efficient card in the game; a Stellar Loadlifter
is among the worst.

Iconic droids are bought with Nova Crystals and earn a percentage of total income
rather than a flat rate, so they show those values instead of an efficiency
rating.

Chips *returned on sale* are still missing. The game does pay chips when you sell
a self-crafted droid and the amount scales with rarity and tier, but no public
source documents the values, so only the upgrade side (`UPG`, `/CHIP`) is shown.

## Data Sources

Stats are generated and validated by a script rather than hand-maintained. The
primary source is the community-maintained sheet, cross-checked against three
others:

| Source | Used for |
| --- | --- |
| [Community sheet](https://docs.google.com/spreadsheets/d/1otLCKSCMKICMlnefirQ8KZhh_rdZTd5Mp8h0UYFUiqg) | Cost/income for all 7 tiers, and the Upgrade Chip cost table |
| [Fandom wiki](https://star-wars-droid-tycoon.fandom.com/wiki/Droidex) | Companion perks, Iconic Nova Crystal prices, rebirth paths |
| [tycoon-tools](https://tycoon-tools.com/droid-tycoon/value-list/) | Independent all-tier income chart |
| [erikpeik/droidex](https://github.com/erikpeik/droidex) | Independent cost/income for 54 droids across 5 tiers |

The generator refuses to emit data that fails its checks: every name must resolve
against `droids.ts`, cost and income must increase along the tier chain, and each
droid's tier-to-tier steps must match the median for its rarity. That last check
is what caught the wiki's Rainbow column being a duplicate of its Beskar column —
sell is a flat 70% of cost, and the real progression is base x 1, 4, 8, **12**,
16, 20, 24.

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

Droidex began as Erik Peik's project and was developed further by FLUXX DEV.
This repository is the Brewer Industries fork; in-app links point here rather
than upstream.

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
