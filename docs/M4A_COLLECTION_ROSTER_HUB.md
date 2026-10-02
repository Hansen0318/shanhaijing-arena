# M4A — Collection / Roster Hub

## Status
**M4A COLLECTION / NAVIGATION CORRECTION — ENGINEERING PASS / PLAYER SMOKE PENDING**

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

Player clarification (2026-10-02): Chapter Select and Collection are sibling modes and must not appear as buttons inside each other.

Add the minimal parent navigation shell now:

Main Menu / Landing
- BATTLE -> Chapter Select -> Stage Preview -> Team Select -> Battle -> Result
- COLLECTION -> Collection -> Character Detail

For this milestone, the landing shell may be simple/static: full-screen background/placeholder plus two clear buttons. Formal promotional art, animation and polish remain later scope.

Collection BACK returns to the landing shell, not Chapter Select.
Chapter Select BACK/top-level exit returns to the landing shell when applicable.

Do not place a COLLECTION button inside Chapter Select as the final navigation model.

## 3. Collection layout

Mobile-first landscape.

Use a full-page Collection screen rather than the compact Team Select bench.

Requirements:
- page title: COLLECTION or ROSTER (final label can be chosen during presentation pass);
- filters/tabs: ALL / Power / Speed / Blast;
- compact square character cards, approximately the same visual scale as the Team Select bench cards or only modestly larger;
- prioritize density so a large roster remains practical on mobile landscape;
- grid can display many characters across pages/scrolling as catalog grows;
- card selection is inspection-only and does not alter battle team selection;
- preserve no accidental coupling to A1/A2/A3 runtime slots.

Each character card should expose:
- portrait / placeholder square art;
- character display name;
- Type indicator;
- owned vs locked visual state;
- shard progress as available / next requirement rather than a bare count;
- unlock progress if locked;
- Tier display only when authoritative Tier state exists; do not invent Tier progress before M4B data is defined.

Owned:
- normal contrast / full presentation.

Locked:
- still visible and identifiable;
- dimmed presentation;
- shard progress remains readable.

Example conceptual cards:

Owned T1:
[portrait]
Xingtian
Power
4 / 5

Locked:
[dim portrait]
Character Name
Speed
3 / 5

Do not hide locked characters from the collection unless future content explicitly marks them secret.

## 4. Character Detail

Tap a character card once to open Character Detail.

M4A detail is read-only.

Minimum information:
- medium portrait / placeholder;
- display name;
- Type;
- Role;
- ownership state;
- shard inventory;
- if locked: unlock threshold/progress;
- ability names/categories; concise descriptions when current definitions provide them;
- short Shanhaijing introduction/lore field when available.

Detail typography must be compact enough for future real content. Do not use oversized prototype text. Reserve readable space for:
- a short character introduction;
- Shanhaijing lore/story paragraph;
- ability descriptions;
- future progression fields.

The detail body may use vertical scrolling if content exceeds the landscape viewport.

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
- show shard progress as available / next requirement, not a bare "Shards N" label;
- locked character uses recruit threshold 5;
- T1 uses next requirement 5;
- T2 uses next requirement 10;
- T3 has no next upgrade requirement;
- exact spending/action belongs to M4B, but M4A presentation must be compatible with this progression model.

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

A minimal Main Menu / Landing shell is now required in M4A correction because it defines the proper top-level information architecture:
- app/site opens to a full-screen parent screen;
- clear BATTLE button;
- clear COLLECTION button;
- BATTLE opens Chapter Select;
- COLLECTION opens Collection;
- the two modes are siblings, not nested inside one another.

The minimal shell should remain static/low-cost. Formal promotional art, animated hero/background, extra destinations and presentation polish remain later M4C scope.

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
- player performs short device smoke on the top-level landing shell, Battle/Collection sibling navigation, compact Collection grid, filters, locked/owned contrast, shard visibility and Character Detail readability;
- stop;
- do not begin M4B until player accepts M4A and Tier naming/order is explicitly confirmed.

## 15. First-release evidence (historical; superseded by correction below)

Implemented on active branch `feat/m0-combat-core-20260927` / PR #1. Safe deployed source `ae7063c10c90ab43c8c6f6c5c9d88ed3be693ec6`. Targeted14/14, impacted133/133, build/diff/review PASS; Actions#299 /36946318660 CI302/302, Build/Pages success. Public source assets match. Verification and exact pending player checklist: `docs/verification/M4A_COLLECTION.md`.

Current definitions have no lore or ability description metadata; omission is intentional under the conditional requirement. Placeholder cards remain static, names underneath. No Tier/spending/upgrade/Main Menu/animation. M3 is unchanged. Wait for M4A player smoke and STOP.


## 16. Player correction — density, detail typography, and top-level navigation (2026-10-02)

The first deployed M4A presentation is not yet player accepted.

Required corrections:
1. Collection character cards are too large. Reduce them to approximately Team Select bench-card scale (or only modestly larger) so many characters fit naturally in landscape.
2. Character Detail typography is too large. Use compact UI/body text and reserve room for future lore/story and ability descriptions; allow vertical body scroll when needed.
3. Chapter Select and Collection must live on separate sibling pages under a parent landing screen. Remove the final-navigation assumption that COLLECTION is a button inside Chapter Select.
4. Implement only a minimal static landing shell now with BATTLE and COLLECTION. Formal promotional animation/art remains later M4C polish.

This is a bounded M4A presentation/navigation correction. Do not start Tier spending, Level, formal animation or M4B mechanics.

## 17. Correction release evidence (2026-10-02)

Safe deployed source `5ec1c345ad6cd14cbec7777a9c89ce434329db03`, active branch `feat/m0-combat-core-20260927` / PR #1. Minimal static sibling Landing now implemented;84px cards/44px portraits;13px detail body/96px portrait and fixed BACK with scroll body. No M3/acquisition/team/combat changes. Targeted20/20, impacted137/137, build/diff/review PASS; Actions#304 /36947859653 configured CI306/306, Build/Pages success. Public dimensions/source/routes verified. Full evidence and exact pending player smoke: `docs/verification/M4A_COLLECTION.md`. STOP before M4B/Tier/formal landing art/animation.


## 17. Player correction — shard fraction presentation (2026-10-02)

Collection cards must not present a standalone shard number such as `Shards 4`.

Use progression fraction semantics:
- locked: `4 / 5` toward recruit/unlock;
- owned T1: `4 / 5`, `5 / 5`, or `10 / 5` toward T2;
- owned T2: e.g. `7 / 10` toward T3.

The numerator may exceed the requirement until the player explicitly upgrades. Excess carries forward after spending.

Character Detail will host the upgrade/synthesis action in M4B. M4A must not invent a second shard inventory.
