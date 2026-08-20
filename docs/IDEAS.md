# IDEAS

## Game

### Rebirth

- Direct link RebirthPanel → RebirthPage
- Rebirth filter for required Droids

### Droid Knowledge

- Companion effects
- Upgrade chip sources
- Nova system
- Squad bonuses

### Droid Model

Long term:

- rarity
- tier
- source
- companionAbility
- rebirthUsage
- eventLocked
- novaCost
- flawless

Goal:

Droids as knowledge objects
instead of pure collectibles.

---

## UI

### Workspace

- Observation:

Launcher-style grid layouts could become a suitable
form of organisation in the long run, if Droidex
gains further systems of equal weight alongside
Collection and Rebirth (Timer, Companion, Events,
Trading, Daily and so on).

Not as a free-form widget system,
but as a structured workspace.

- Shared workspace
- Consistent panel headers
- Shared panel component
- Identical animations
- Identical arrows
- Round only the outer corners
- Central open state
- Fully integrate RebirthPanel

### Navigation

- Switch app pages with a slide transition

### DroidGrid

- Show/hide via triangle
- Quick edit for all states

### TierDNA

- DNA-based filters
- DNA statistics
- Droid details
- Companion explanations

### Flawless

- Flawless statistics
- Flawless collection
- Missing Flawless Droids

### About

Improved project description
for the community and GitHub.

---

## Companion

Planned capabilities:

- getSellAdvice()
- Companion Explanation UI
- Explain TierDNA

Long term:

The Companion should provide recommendations
instead of status.

---

## Developer

### State Layer

Further hooks:

- useRebirthState()
- useCollectionState()
- useWorkspaceState()
- useAboutState()

Goal:

In the long run, components should consist
almost entirely of rendering.

### Debug

- TypeScript debug scripts
- CLI tests
- Rebirth analysis
- Data validation
- Savegame check

Example:

npx tsx scripts/checkRebirth.ts

---

## Future

### Data-driven Updates

New content should mostly come about
through DATA files.

### Architecture

New features are first assigned
to a domain, and only
implemented afterwards.

### Further Modules

- Nova Shop
- Hats
- Paints

---

## Performance

- virtualization
- lazy loading
- caching
- image optimization

---

## Research

### In-App Consistency

Rebirth and Collection states
should never contradict each other.

Possible solution:

- Rebirth only active
  if the Droid has been collected.

- Activating a Rebirth Droid
  sets Collection automatically.

- Collection and Rebirth
  stay consistent permanently.
