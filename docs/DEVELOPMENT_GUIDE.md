# Droidex Development Guide

## Droidex Identity

Droidex is an onboard computer.

The UI is not the centre of attention,
the pilot is.

The Companion observes.
Knowledge remembers.
Rules decide.
Facts explain.
The UI only shows
what the pilot needs right now.

###

New game mechanics are modelled as knowledge first. Only then are they interpreted in the Companion, and finally rendered in the UI.

Panels have no fixed height. Only their content determines the space they take.

Every new idea has to make Droidex better as an onboard computer. Not just add new features.

Droidex is not the largest knowledge collection about Droid Tycoon. It is the onboard-computer HUD for the pilot.
The Companion does not see more than the pilot — but it remembers better and spots connections faster.

###

## Development Order

New features always come about in the same order. ↓

KNOWLEDGE
↓

DATA
↓

RULES
↓

FACTS
↓

COMPANION
↓

STATE
↓

UI

## Information Flow

Patch notes
↓
Knowledge
↓
Data
↓
Rules
↓
Facts
├──► State ─► UI
└──► Companion

## Companion Rule

The Companion never creates data.

It interprets only existing knowledge and the current player state.

## Domain Ownership

Every piece of information has exactly one owner.

KNOWLEDGE
collects, checks and normalises knowledge.

DATA
stores knowledge.

RULES
make decisions.

FACTS
compute states.

STATE
connects FACTS to React.

UI
presents information.

COMPANION
interprets states.

---

## Design Principles

Knowledge collects knowledge.

Components render.

Hooks connect.

Facts compute.

Rules decide.

Data stores knowledge.

---

## Refactoring Rules

Before every new file, ask:

Is there already a domain
that owns this responsibility?

If yes:
→ extend it.

If no:
→ create a new one.

Do not abstract
until a pattern actually repeats.

Only once the same logic appears more than once
is it extracted.

Prefer moving code over rewriting code.

Extract first.
Delete later.

Avoid creating parallel implementations.

---

## Documentation

ARCHITECTURE
describes the architecture.

LAB_NOTES
describes findings.

SNAP
describes the current state.

CHANGELOG
describes released changes.
