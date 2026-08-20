New information on page 2 of the datasheet

There is exactly one piece of information here that Droidex does not yet store, as far as I know:
Unlocks
After certain rebirths the following are unlocked:
Worker Slot
Astromech Slot
Battle Slot
Lounge Slot
and later
NONE
So far this is more UI knowledge, or implicitly present, but not part of the rebirth data.
Architectural idea
I would not hard-code this information in the UI, but attach it directly to each rebirth.
For example:
{
level: 6,
credits: 14500000,
unlock: 'WORKER_SLOT',
...
}
or more generally:
unlock?: 'WORKER_SLOT'
| 'ASTROMECH_SLOT'
| 'BATTLE_SLOT'
| 'LOUNGE_SLOT';
I like that much better, because then:
RebirthPanel can display it automatically
The Companion can access it later
Tooltips can be derived from it
Export/Import stays complete
without any special cases.

One more observation: the column is called "Unlocks" in general terms. For phase 4 that is a hint that we should perhaps not name the field slotUnlock at all, but simply unlock. Then Nova, cosmetic or other unlocks could go there later without having to change the model again. That feels considerably more future-proof for the upcoming Nova integration.
