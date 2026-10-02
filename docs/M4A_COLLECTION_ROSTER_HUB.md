# M4A — Collection / Roster Hub

## Status
**ENGINEERING PASS / PLAYER SMOKE PENDING**

M3 reward/shard/unlock and Preview presentation are player accepted. M4A is the next bounded milestone. It adds a dedicated read-only Collection/Roster surface that exposes the progression state already created by M3. It must not start Tier spending/upgrade mechanics; those belong to M4B.

## 1. Goal

Give the player one persistent place to answer:
- which characters exist;
- which characters are owned;
- which characters are still locked;
- how many shards each character currently has;
- how close a locked character is to unlock;
- what character was selected;
- what that character does and what its Shanhaijing identity/lore is.

This screen is separate from Team Select.

Team Select = choose exactly 3 for battle.
Collection/Roster Hub = inspect ownership/progression/character information.

## 2. Navigation / hierarchy

M4A itself may initially be entered from a simple temporary navigation control so the feature can be built and verified without prematurely implementing the formal landing page.

Planned final hierarchy after M4C:

Main Menu / Landing
- BATTLE -> Chapter Select -> Stage Preview -> Team Select -> Battle -> Result
- ROSTER / COLLECTION -> Collection -> Character Detail

M4C will later formalize the full-screen landing page and primary buttons. M4A must not hard-code navigation in a way that prevents that parent layer.

## 3. Collection layout

Mobile-first landscape.

Use a full-page Collection screen rather than the compact Team Select bench.

Requirements:
- page title: COLLECTION or ROSTER (final label can be chosen during presentation pass);
- filters/tabs: ALL / Power / Speed / Blast;
- larger square character cards than Team Select;
- grid can display many characters across pages/scrolling as catalog grows;
- card selection is inspection-only and does not alter battle team selection;
- preserve no accidental coupling to A1/A2/A3 runtime slots.

Each character card should expose:
- portrait / placeholder square art;
- character display name;
- Type indicator;
- owned vs locked visual state;
- current shard count;
- unlock progress if locked;
- Tier display only when authoritative Tier state exists; do not invent Tier progress before M4B data is defined.

Owned:
- normal contrast / full presentation.

Locked:
- still visible and identifiable;
- dimmed presentation;
- shard progress remains readable.

Example conceptual cards:

Owned:
[portrait]
Xingtian
Power
Shards 8

Locked:
[dim portrait]
Character Name
Speed
3 / 5 shards

Do not hide locked characters from the collection unless future content explicitly marks them secret.

## 4. Character Detail

Tap a character card once to open Character Detail.

M4A detail is read-only.

Minimum information:
- larger portrait / placeholder;
- display name;
- Type;
- Role;
- ownership state;
- shard inventory;
- if locked: unlock threshold/progress;
- ability names/categories; concise descriptions when current definitions provide them;
- short Shanhaijing introduction/lore field when available.

Future-capable fields:
- Tier;
- next Tier shard requirement;
- Level;
- stats/derived values;
- formal skill art/animation.

Do not fabricate Level/Tier values in M4A if no authoritative model exists yet.

Interaction:
- one tap opens detail;
- close/back returns to same Collection filter/position;
- no double-tap requirement;
- no upgrade button in M4A.

## 5. Data ownership

Collection must read existing authoritative data:
- immutable character definitions from roster catalog;
- ownership from acquisition progression;
- shard inventory from M3 acquisition state.

Do not create:
- a second ownership store;
- a second shard counter;
- Collection-only character copies.

Unknown/malformed persisted IDs continue to sanitize through existing boundaries.

## 6. Filter behavior

Reuse the semantic Type taxonomy from Team Select:
- ALL
- Power
- Speed
- Blast

But Collection presentation is independent from Team Select's compact no-scroll bench.

Filters:
- do not mutate ownership;
- do not mutate team selection;
- only change visible cards;
- preserve selected-detail behavior predictably.

Future optional filters such as Owned/Locked can be added later; they are not required for first M4A slice.

## 7. Shard presentation

M4A is the canonical player-facing place to inspect accumulated shard inventory.

For every catalog character:
- show current persisted shard count;
- owned characters continue to show shards after unlock;
- locked characters show progress toward the M3 unlock threshold (currently 5);
- M4A does not spend shards.

This closes the information gap created by repeatable Campaign farming.

## 8. Tier boundary

M4A may reserve visual space for Tier, and card border treatments may later communicate Tier.

However:
- Tier naming/order must be confirmed before actual Tier state is implemented;
- do not infer T1/T2/T3 direction from historical notes;
- do not spend shards;
- do not add upgrade actions;
- do not create a fake Tier persistence model.

Those belong to M4B.

## 9. Formal idle/micro-animation boundary

Future formal character presentation may replace static portrait/placeholder art with idle/micro-animation.

When that happens:
- keep the character name beneath/with the character;
- Collection cards and Team Select can share character identity assets where practical;
- animation is presentation only and must not own character progression state.

M4A first implementation does not require formal animation.

## 10. Main Menu / Landing boundary

Player-approved direction:
- eventual app entry is a full-screen promotional/hero presentation;
- clear BATTLE button;
- clear ROSTER / COLLECTION button;
- future Settings/Event/About can attach later;
- initial landing implementation should be static/low-cost;
- animated promotional background is later presentation polish.

This is M4C, not required to make M4A functional.

## 11. Protected baseline

Do not regress:
- all M0/M1/M2 player-verified combat/team/campaign behavior;
- M3 multi-character firstClear/repeatable rewards;
- universal shard persistence;
- unlock at 5;
- owned-character shard retention;
- Campaign Preview dim/bright reward presentation;
- explicit testing reset behavior;
- route visibility fix;
- Team Select exact-three/filter/slot behavior;
- fixed Arena presentation/input.

## 12. Out of scope

Do not implement in M4A:
- shard spending;
- Tier upgrade transaction;
- Level progression;
- stars/rarity;
- stat upgrade;
- shop/gacha/currency;
- Character Challenge/Mastery;
- formal art;
- formal idle animation;
- formal landing animation;
- M4C full landing page;
- TD gameplay rules.

## 13. Engineering acceptance

At minimum:
1. Collection can be opened and left without corrupting Campaign/Team state.
2. All catalog characters appear.
3. Owned characters render normal.
4. Locked characters render dimmed but identifiable.
5. P1/P2/P3 normal initial ownership is reflected.
6. P4/P5 ownership changes are reflected from existing M3 state.
7. Every character shows authoritative persisted shard count.
8. Locked character shows current count against unlock threshold.
9. Owned character continues showing retained shards after unlock.
10. ALL/Power/Speed/Blast filters work without mutating state.
11. One tap opens Character Detail.
12. Detail shows correct identity, Type/Role, ownership and shards.
13. Ability summary comes from current character definition data.
14. Lore field is data-driven/optional and missing lore degrades cleanly.
15. Back/close preserves Collection state/filter.
16. Team Select saved lineup remains unchanged after Collection browsing.
17. Reload preserves displayed ownership/shards because Collection reads existing persistence.
18. mobile landscape layout is readable at existing supported widths/heights.
19. no Tier/spending state is introduced.
20. targeted + impacted regression + build/deploy pass.

## 14. Stop condition

After engineering PASS/deploy:
- player performs short device smoke on Collection grid, filters, locked/owned contrast, shard visibility and Character Detail;
- stop;
- do not begin M4B until player accepts M4A and Tier naming/order is explicitly confirmed.

## 15. Release evidence (2026-10-02)

Implemented on active branch `feat/m0-combat-core-20260927` / PR #1. Safe deployed source `ae7063c10c90ab43c8c6f6c5c9d88ed3be693ec6`. Targeted14/14, impacted133/133, build/diff/review PASS; Actions#299 /36946318660 CI302/302, Build/Pages success. Public source assets match. Verification and exact pending player checklist: `docs/verification/M4A_COLLECTION.md`.

Current definitions have no lore or ability description metadata; omission is intentional under the conditional requirement. Placeholder cards remain static, names underneath. No Tier/spending/upgrade/Main Menu/animation. M3 is unchanged. Wait for M4A player smoke and STOP.
