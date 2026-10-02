# M4A Collection / Roster Hub verification

Status: **ENGINEERING PASS / PLAYER SMOKE PENDING** (2026-10-02).
Active branch `feat/m0-combat-core-20260927`, PR #1. Deployed source/safe checkpoint `ae7063c10c90ab43c8c6f6c5c9d88ed3be693ec6`.
Earlier model checkpoint `77d88c1a2ab1a962b3adc2460dcdcc7ef7f7eafa`; UI checkpoint `8fafdb7fd00bbc7bee7a6e57e537cb82055caf97`; connected scroll restoration `25a5f48ac0d6c93dba2c0d6ff4cc51d7d76954f1`. Later closure changes are documentation only.

## Implemented scope

Independent read-only Collection view entered from Chapter Select's temporary COLLECTION button. All five immutable catalog definitions are projected from existing acquisition state; controller ownership also supports the existing isolated dev fixture. Owned characters show retained shard totals; locked portraits are dimmed but identity/progress text remains readable. ALL/Power/Speed/Blast change visible cards only. Single tap opens identity, Type/Role, ownership/progress and configured ability references/categories; optional names/descriptions/lore render if supplied. Names stay below static portraits. Current catalog has no lore or ability descriptions, so these sections are omitted; no invented content.

Vertical grid handles more characters through catalog iteration, with safe-area padding and no horizontal scrolling. Detail close preserves the connected grid/filter/scroll; Collection leave/reopen captures position before detaching and restores only after mounting into connected DOM. Route rendering uses the existing Campaign route owner to hide #game. No duplicate progression store, save writes, Team Select mutations, Tier values/actions, spending, animation, Main Menu, combat or reward-engine changes.

## Executed checks

- RED model/navigation: 0/9 before implementation; GREEN 9/9.
- RED view: missing CollectionView export (test module failed before implementation); GREEN combined targeted 14/14.
- Review identified disconnected-DOM scroll risk. Fixed both capture and mount ordering; stub regression now simulates disconnected scroll becoming zero. Follow-up review found no Important/Critical issues under latest user specification. Optional description absence follows the user's conditional requirement.
- Impacted command: `node --test tests/collection*.test.js tests/campaign*.test.js tests/acquisition*.test.js tests/rewardPresentation.test.js tests/universalRewards.test.js tests/team*.test.js tests/rosterTeam.test.js tests/routeOwnership.test.js tests/appRouteReset.test.js tests/progressReset.test.js tests/viewportSync.test.js` — **133/133 PASS**, zero failures.
- After scroll fix: bounded Collection/navigation/route/Team-flow run **32/32 PASS**; impacted **133/133 PASS**. Build and `git diff --check` PASS. Last subsequent product change was safe-area CSS only; final build PASS.
- [Actions #299 / 36946318660](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36946318660): configured CI **302/302 PASS**, zero failures; Build job110649162200 and Pages deploy job110649250176 success. No extra local full-suite/combat browser replay.
- Final local, CI and public source match: JS `index-nX02OjS0.js`, CSS `index-CHIlF0_H.css`. Public site refreshed and confirmed after final deployment.
- Bounded public runtime checks: Chapter Select entry; all five cards; P1/P2/P3 owned, P4/P5 locked; Power filter; P4 single-tap detail (Type/Role/0/5/ability categories); detail close retains Power; Collection Back restores Chapter Select. #game hidden; locked portrait computed brightness(.5)/saturate(.55); observed grid/detail no horizontal overflow. Checked existing public data without reset or battle replay.

## Contract coverage and limits

Model/navigation/DOM tests cover all catalog IDs, ownership, shard labels, each filter, state immutability, retained shards after unlock and acquisition save/reload, dev fixture, missing lore and synthetic configured descriptions/passives, details identity/categories, single-click, route return, filter/position restoration, saved-team preservation and navigation guards. Impacted tests protect M3 transactions/persistence, Campaign progression, reset, route visibility/pageshow/viewport and Team Select exact-three/filter/battle mapping.

Real iPhone readability/touch/safe areas and overflowing-grid scroll comfort remain player-owned smoke. The public desktop grid contains only five cards and does not overflow vertically, so nonzero real-browser scroll restoration is not newly claimed. No formal art/animation/lore/skill copy exists yet. Existing Phaser bundle-size warning remains; build succeeds.

## Exact player smoke / next action

On the normal deployed URL (keep existing save):
1. Chapter Select → COLLECTION → BACK; Campaign must remain unobscured.
2. Inspect ALL and Power/Speed/Blast: all catalog characters visible as appropriate; owned bright, locked portraits dim but names/progress readable; compare shards to existing M3 save, including retained unlocked-character shards.
3. Tap one owned and one locked card once: correct identity/Type/Role/ownership/shards and ability categories; BACK restores filter/position. Browse and reopen Collection; saved team must remain unchanged.
4. On supported iPhone landscape, check readable cards/detail, easy buttons, safe areas, no horizontal overflow. Reload and reopen: ownership/shards unchanged.

Wait for player M4A acceptance. **STOP. Do not start M4B/M4C/Tier/spending/formal animation.**
