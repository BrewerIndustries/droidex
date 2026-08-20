## Droidex LAB NOTES

## Purpose

LAB_NOTES documents findings,
experiments and architecture discoveries.

This is where we record
why Droidex changed.

Not every attempt is adopted.
Not every idea is implemented.
That is exactly why these notes are kept.

LAB_NOTES does not document decisions.

Only findings.

Decisions belong in DECISIONS.

# 1. Architecture Discoveries

### Filter Extraction - 20260705

The first complete piece of UI logic was successfully
extracted from a React component.

getVisibleCards() is the first step
towards a standalone domain for views.

As a result DroidGrid evolved from

UI + rules

to

UI + rendering.

This pattern should also be used in future for

- Rebirth Facts
- View Models
- Workspace

## Workspace Architecture

The main surface does not consist of
several independent components.

It forms a shared workspace.

Navigation

Header
→ Rebirth Path
→ Tier Tabs

Workspace

Filter
→ Collection
→ Rebirth

Panels are evolving into
reusable UI building blocks.

Goal:

A shared panel architecture
instead of several individual components.

Interaction
→ unify

Appearance
→ unify

State
→ centralise

UI Architecture Discovery

The architecture continues to evolve along two independent but complementary axes.

Domain Architecture

Organizes knowledge.

Game World
→ Domain Rules
→ User Progress
→ Companion

UI Architecture

Organizes interaction.

Layout
→ Panel
→ Card
→ Detail

Both architectures emerged from the same observation:

Repeated patterns should become first-class building blocks.

Just as Companion centralizes interpretation instead of duplicating gameplay logic, Panel centralizes interaction instead of duplicating UI behavior.

The same design principle therefore applies on both levels:

Knowledge
→ centralize

Interaction
→ centralize

The result is not only less code duplication.

It creates a common language.

Instead of thinking about individual pages, Droidex gradually evolves into a system composed of reusable domains and reusable interface components.

The UI begins to mirror the architectural principles of the underlying application.

### Architecture Discovery

The architecture was not designed first.

It emerged from repeated extraction
of domain knowledge out of the UI.

Questions gradually replaced pages
as the organizing principle.

The project moved from

UI
→ Data
→ Domains.

The Companion became an
interpretation domain instead
of a collection of helper functions.

# 2. Companion Discoveries

### Companion

The mathematically correct answer
is not always the most helpful one.

Players make decisions
based on the information shown.

LAST may therefore only appear
once the current use
really is the last use
of that Droid.

The display now describes
the remaining uses
including the current rebirth.

This way the Companion supports
selling decisions,
instead of merely counting data.

✓ getReadyExplanation()

no UI yet

### Companion + Hierarchy

The Companion does not only produce answers.

The Companion produces answers
from other Companion findings.

Companion was made visible as a system
of its own for the first time on the AboutPage.

The Companion evolved from
a collection of helper functions into an
interpretation layer with a roadmap of its own.

The Companion must not check ownership states
directly against present.

Gameplay relevance is based on
Effective Present.

getMissingDroids()
and getReadyReason()
therefore use hasEffectiveCard().

This keeps Companion,
RebirthPage and Droid Hierarchy
consistent.

20260622

## Companion Consolidation

Rebirth future logic was moved out of the UI
into companion.ts.

The RebirthPage shows future information,
but no longer computes it itself.

Companion is thereby evolving from a
collection of helper functions into a central
interpretation layer.

## Companion

New features are built as
interpretation first, and only then
integrated into existing UIs.

Goal:

Centralise knowledge,
simplify the UI.

## Findings

New architecture layer

✓ useDroidCardState
✓ useDroidGridState

View state is being extracted
from the components step by step.

Pattern

DATA
↓

RULES
↓

FACTS
↓

STATE
↓

UI

Architecture finding
Something is happening right now that fits these LAB_NOTES very well:
Before:
Rebirth computes rebirth knowledge
RebirthPage computes rebirth knowledge
DroidCard computes rebirth knowledge
After Companion:
Companion computes knowledge

RebirthPanel shows knowledge
RebirthPage shows knowledge
DroidCard shows knowledge
That is exactly the decoupling already achieved with TierDNA.

## Companion Layer

companion.ts introduced.

Purpose:

Not to store new data,
but to explain existing systems.

Companion forms an interpretation layer over:

- Rebirth
- Present
- Flawless
- TierDNA
- Droid Hierarchy

Planned functions:

- getReadyReason()
- getMissingDroids()
- getFutureUsage()

Goal:

Derive answers from states.

# 3. UI Discoveries

### AboutPage

The AboutPage evolved from an
information page into a status page.

Systems, data and current state
proved more valuable
than a pure project description.

Users primarily look for orientation
about the current state of the system.

### TierDNA

A Droid is mentally perceived as a line of development.

D G D R B

A condensed representation
beats a generic progress bar.

### Rebirth UX

Status displays may be actions at the same time.

READY
✓
x/y

instead of additional buttons.

### Header Consolidation

Information density can be increased,
as long as the visual structure is preserved.

### Backup System

- Export/Import is based on the complete droidex_v2 state.
- No field-selective exports.
- Progress relevant to the user is backed up automatically.
- The UI communicates the backed-up areas as a status list.
- Future extensions are possible via backupVersion.

# 4. Architecture Patterns

New architecture layer

DATA
↓

RULES
↓

FACTS
↓

STATE
↓

UI

# 5. Systems

Backup system

# 6. Documentation

### SNAP Decoupling

SNAP
= current state

LAB_NOTES
= research

CHANGELOG
= history

# 7. Open Questions

Architecture questions that are still open.

Examples:

- When does a new FACTS file come into being?
- Which responsibilities belong in Companion in the long run?
- How does the STATE layer evolve?
