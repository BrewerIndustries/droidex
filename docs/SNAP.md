# Droidex SNAP

2026-07

Result

Workspace V2 completed.

The main workspace now consists of reusable panels with a shared layout and consistent interaction.

Future development shifts from UI architecture towards Knowledge and Platform architecture.

## 2026-07

### Architecture Refactor

Architecture

- DATA → RULES → FACTS → STATE → UI → COMPANION
- Domain responsibilities clarified
- UI simplified through extraction

New modules

- droidHierarchy.ts
- filterRules.ts
- droidFacts.ts
- rebirthFacts.ts
- useDroidCardState()
- useDroidGridState()

Result

- DroidGrid contains no gameplay logic.
- DroidCard focuses on rendering.
- Facts are reusable across UI and Companion.
- View state is separated from domain logic.

Next

- Continue moving gameplay logic into FACTS.
- Keep React components focused on rendering.
- Expand Companion through reusable domain knowledge.

### Future template for this SNAP:

## 2026-08

Changed

New or reworked modules.

Added

New features or systems.

Result

What impact this has on the architecture or behaviour.

Next

The next logical development step.
