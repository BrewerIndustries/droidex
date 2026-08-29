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
- Grid, list or combined view for the collection, remembered between visits
- Combined view: every droid once, with a tappable dot per tier
- Fusion tab: all 17 recipes, and which tiers of each you have made
- Team tab: assign droids to stations and see live earnings
- Removal guard: warns before pulling a droid a rebirth or fusion still needs
- Per-tier cost / income / sell, with an efficiency rating and payback time
- Collection tracking
- Effective Present tracking
- Rebirth planning
- Future rebirth indicators
- Flawless tracking
- Offline income timer
- Local data storage, kept in persistent mode so browsers do not evict it
- Offline-first operation
- Mobile-friendly interface, scaling up to tablet-sized type and 44pt tap targets
- Installable PWA

---

## Sizing and touch targets

The interface was drawn phone-first, in hardcoded pixels — which meant a 6px
label stayed 6px on a 12.9" iPad. Sizing is now expressed in `rem` throughout
and driven from one dial: the root font size in `src/index.css`.

| Viewport | Root | Effect |
| --- | --- | --- |
| Phone (< 640px) | 16px | The baseline the layout was drawn against |
| 640 / 768px | 17 / 18px | Large phones and small tablets |
| 1024px (iPad portrait) | 20px | ~1.25x |
| 1280px+ (iPad landscape) | 21px | ~1.3x |

Type uses the Tailwind scale plus three named steps below `xs` — `text-2xs`,
`text-3xs`, `text-4xs` — defined in `tailwind.config.ts`. Spacing, widths and
radii already came from Tailwind's rem-based utilities, so they scale with the
same dial. The smallest text in the app went from 6px to ~10.5px on a 12.9"
iPad without the phone layout moving.

Tap targets are held to Apple's 44pt minimum via `min-h-tap` / `min-w-tap`.
Those tokens are deliberately **px, not rem** — a physical floor is not part of
the type scale, and expressing it in rem would inflate it to 58px on a tablet.

The card corner badges are a special case: a 20px dot on a thumbnail is the
design, so they keep their size and gain a 44px hit area from the `.tap-tl` /
`.tap-br` utilities. The area is anchored to the badge's own corner so it grows
*into* the card — a centred one spilled past the card edge, where the card's
`overflow-hidden` silently ate half the target.

Two knock-on fixes came out of the pass: the tier tabs now wrap instead of
running off the right edge of a phone (they overflowed by 55px before this
change, leaving STELLAR unreachable), and the rebirth panel is width-capped on
large screens so the collection grid keeps the space.

One deliberate exception: the collected/flawless progress bars in the header are
26px tall rather than 44. They are over 1300px wide on a tablet, so they are
comfortable to hit despite being short, and making them 44px would turn the
header into a slab.

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
| Companion | 1 | No — grants its perk, shown on the row |

**Slots are positional.** Every slot in a station is numbered and holds its
place: clicking the third empty slot fills the third slot, and pulling a droid
out of it leaves that slot open rather than sliding the ones below it up. The
team keeps the arrangement you gave it. Placements made from the card badge,
which names a station and nothing more, take the first free slot.

**Click a placed droid to move it.** The menu lays out the whole base — every
station, every slot, with whoever is in it — and picking one moves the droid
there. Landing on an occupied slot **swaps** the two, which is what "put this
one in slot 1" means when slot 1 is taken, and it is why moving is its own
action rather than a remove and a re-add: removing first would free the slot,
drop the droid from "on hand" if it were the last copy, and put up the removal
warning for a change that loses nothing. Neither droid leaves the team, so a
move can never break a rebirth requirement or a fusion the way a removal can.
Remove is still on the menu, and still goes through that warning.

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

### Removing a droid asks first when it costs something

Taking the last placed copy of a droid off the team takes it off hand, which can
quietly undo work you have already done. Both removal paths — the ✕ on the Team
tab and REMOVE in the card's station chooser — check first and put up a
confirmation naming what would be lost:

- **A rebirth goes back to missing.** Every rebirth still ahead on the selected
  path is checked, starting with the one you are working toward, and the dialog
  lists each affected level as `RB4 → RB5 — needs DIAMOND R9`. The check is on
  what actually changes rather than on whether the name appears in the path, so
  a Gold copy is flagged when it was the thing covering a Default requirement,
  and the dialog says so.
- **A fusion loses an ingredient.** If the droid feeds a fusion recipe whose
  result you have not collected, the dialog names it with the full recipe.
  Fusion keeps the tier of what you fused, so only that exact tier counts here —
  there is no higher-tier fallback the way rebirth requirements have one.

Removals that cost nothing stay one click: dropping a duplicate while another
copy is still working, or unparking a droid no upcoming rebirth wants and whose
fusion results are already collected, never prompts.

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

- 87 documented droids / 561 tier cards
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

## Grid, List or Combined

The collection panel has a **GRID / LIST / COMBINED** toggle. The grid is the
card wall — artwork, full per-tier stats, the badges. The list is one line per
card: name, rarity, tier, the tier-DNA strip, income and cost, and the same
present and team controls the card carries.

**Combined** answers a different question. Grid and list both show one card per
droid *per tier*, so the collection is 561 cards behind seven tier tabs and
"which tiers of Gonk do I have?" means visiting seven of them. Combined puts a
droid on one row with its seven variants as coloured dots — filled for
collected, hollow for not — so the answer is one glance, and changing it is one
tap on the dot.

The tier tabs mean something different here: which *variants* to draw, rather
than which tier's cards to list. Picking Gold leaves every droid on screen
showing only its Gold dot, so "which droids am I missing in Gold?" is that tab
plus the MISSING filter. Each view keeps its own tier, so combined can sit on
ALL — which is the whole point of it — without resetting the grid's tab.

The dot is 20px inside a 44pt target. Seven dots plus a name will not fit across
a phone at full size, so the dots take their own line under the name rather than
shrinking the target — which is the thing the tablet pass was written to stop.
Colour carries the tier because the letters cannot: Default and Diamond are both
"D", Gold and Galactic both "G". Every dot names its tier and state in a title
for anyone the colour fails.

The collection filter applies to the variants left after the tier filter, so
OWNED means owned *at that tier* — and with the tier on ALL it means owned at
any tier, which keeps every dot on screen rather than punching holes in the row.
A cyan ring marks a variant that is also on hand for rebirths.

All three views run off the same `useDroidGridState`, so the filters, the search
and the ordering cannot drift between them — switching view changes how the
cards are drawn, never which cards are shown.

The choice is remembered in `localStorage` under `droidex_view`, deliberately
outside the save file: it is a preference about the screen in front of you, not
collection data, and it has no business travelling in an export or being restored
onto another device.

Below 640px the per-card list drops its income/cost column — at that width the name, the
tier strip and two 44pt controls are already the whole line, and truncating names
to keep a stat visible is the worse trade.

## Fusion Droids

v1.27 added the Fusion lab, unlocked at Rebirth 3: combine three droids into one
better one. **17 droids are fusion-exclusive** and cannot be bought at all.

They sit in the Droidex among the droids of their own rarity, alphabetically,
rather than in a block of their own — BTL-R between BDX EXPLORER and BU-4D.
Cards sort on `RARITY_ORDER` and then by name, rather than being left to the
order `droids.ts` happens to list things in, where the seventeen were one run at
the end because they were added together. Names compare with `numeric` collation
so R9 comes before R10 and RIC before RIC-1200: names here are mostly a letter
and a number, which a plain string compare gets wrong the moment one reaches two
digits.

Their cards show the recipe instead of the usual cost/efficiency block, because
those figures do not apply to something with no purchase price:

```
WHL-EX   RARE   WORKER
INC      72/s
FUSE     MOUSE + MOUSE + ARG
```

The result keeps the tier of what you fused — three Gold droids give a Gold
result — so fusion droids exist at all seven tiers like any other. Because there
is no tier fallback, the Team tab warns before you remove a droid that is an
ingredient for a fusion you have not made yet.

Sell values are deliberately absent. The community sheet is still filling that
column in and 16 of the 17 currently deviate from the standard tier progression,
some by absurd margins, so it is better to show nothing than something wrong.
Companion perks for these droids are not documented anywhere yet either.

### The Fusion tab

All 17 recipes on one screen, grouped by rarity, each showing which tiers of the
result you have made. A tier filter narrows the recipes to one variant rather
than dropping recipes: picking Rainbow still lists all seventeen, each showing
only its Rainbow answer, and the totals switch from 119 variants to 17. Because fusion keeps the tier, "have I made this?" is a
question per variant rather than per droid — so each recipe carries a seven-tier
strip and a count, and the totals read in variants (119) rather than droids (17).

The strip reads each tier on its own rather than filling up to a high-water mark
the way the card grid's tier-DNA does. Fusion earns that: you can fuse three
Rainbow ingredients into a Rainbow result without ever having held the Gold one,
so a collection with gaps in it is normal rather than a sign of missing data.

Ingredients carry how many of their own tiers you hold, and dim when you hold
none — enough to see what a recipe is waiting on without the tab trying to solve
craftability, which it cannot: the tracker records *whether* a droid is
collected, not how many copies are on hand, and a recipe wanting two of
something needs the count.

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

**Some Companion perks step up with the tier.** A Rainbow TRAK-R grants +6
pickaxe levels where its lower tiers grant +3. Perks are stored once per droid
with a `tierPerks` override for the tiers known to differ; a tier with no
override shows the droid's base perk. No public source documents a scaling rule,
so overrides are added only as values are read out of the game — if a perk in the
app looks low for a high tier, that is a gap rather than a claim.

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
