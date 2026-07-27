# GAPS

Offene Punkte, die noch nicht im Datenmodell oder in der Architektur umgesetzt sind.

---

## Architecture

### Platform Layer

Hooks erfüllen derzeit unterschiedliche Verantwortlichkeiten.

Beispiele:

- Domänen-State
- Browser-/PWA-Integration
- localStorage
- Service Worker
- Install Prompt
- Update-System

Zu prüfen:

- Trennung zwischen Domain Hooks und Platform Hooks
- mögliche platform/-Domain
- klarere Verantwortlichkeiten
- gemeinsame Runtime-Architektur

✅ Knowledge Pipeline (knowledge/)
✅ DATA → RULES → FACTS → STATE → UI
🟡 Platform / Runtime (erst als Muster erkennbar)

## UI

### Workspace Synchronisation

Workspace, Collection und DroidGrid besitzen noch keinen vollständig gemeinsamen State.

Ziel:

- sofortige Synchronisation
- keine manuellen Refreshes
- konsistente Filter

---

## DATA

### Rebirth

    - Unlocks in REBIRTH_PATHS integrieren

- Worker Slot
- Astromech Slot
- Battle Slot
- Lounge Slot

- Max-Level aller Rebirth-Pfade vereinheitlichen

---

## Data Quality

### BB-8

Ability allgemeingültig formulieren.

### Flawless Chance

Noch keine belastbaren Werte vorhanden.

---
