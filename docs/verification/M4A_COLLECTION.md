# M4A Collection / Navigation Correction verification

**ENGINEERING PASS / PLAYER SMOKE PENDING** (2026-10-02).
Active branch `feat/m0-combat-core-20260927` / PR #1. Safe deployed source `5ec1c345ad6cd14cbec7777a9c89ce434329db03`; recovery base `f9ffd844b8fa116b1c9d3e82439ce42dd0899bbc`. Later closure commit is docs-only.

## Correction scope

- Normal app boot/reload opens a static Landing with BATTLE and COLLECTION. Chapter Select/Collection are siblings; both top-level BACK paths return Landing. Chapter Select no longer contains COLLECTION. Existing explicit dev reset still lands fresh Chapter1. CampaignController standalone entry stays chapters for existing isolated Campaign contracts; main explicitly enters Landing.
- Collection cards fixed84px wide, portrait44px square (Team Select bench64px card/34px portrait). No viewport stretching. Grid naturally wraps and scrolls vertically, avoids horizontal overflow, and retains name/Type/ownership/shards/progress. Locked portraits remain dim/identifiable; progression labels stay readable.
- Detail body13px/line-height1.45, headings14px, character title18px, portrait96px. Independent vertical scroll body leaves BACK in nonshrinking header. Optional absent lore/descriptions omitted. Catalog/ability source options allow synthetic fixtures without changing production authoritative defaults.
- No acquisition/model/persistence/team/combat edits, second progression state, spending/Tier/upgrade action, formal art/animation or elaborate Landing features.

## Executed evidence

1. Targeted `node --test tests/collection*.test.js tests/appRouteReset.test.js`: RED13/20, then GREEN **20/20**. The existing app battle test now explicitly enters BATTLE before Chapter Select, following new navigation.
2. Impacted `node --test tests/collection*.test.js tests/campaign*.test.js tests/acquisition*.test.js tests/rewardPresentation.test.js tests/universalRewards.test.js tests/team*.test.js tests/rosterTeam.test.js tests/routeOwnership.test.js tests/appRouteReset.test.js tests/progressReset.test.js tests/viewportSync.test.js`: **137/137 PASS**, zero failures. Covers M3 transactions/replay/idempotency/unlock/persistence/reset, Campaign progression, Team Select, route owner/viewport lifecycle.
3. New fixtures render60 catalog characters, each filter subset, long configured lore and ability descriptions; assert BACK outside scroll body and no acquisition mutation. Layout contracts constrain compact widths/portrait/body typography, vertical scroll and horizontal overflow. These are DOM/CSS contract tests, not an iPhone overflow acceptance claim.
4. `npm run build` / `git diff --check` PASS. Configured [Actions #304 /36947859653](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36947859653) full CI **306/306 PASS**, zero failures; Build job110653922030 and Pages deploy110654009361 success. No extra local full-suite or unrelated combat browser smoke.
5. Code reviewer independently targeted20/20 and reported no Important/Critical issues for navigation/boot/reset, compact layout, long-body structure and state preservation.
6. Public/local/CI source match JS `index-B9K7rpSX.js`, CSS `index-ntQrNjSJ.css`. Public normal URL opened Landing; BATTLE→Chapter Select with zero COLLECTION buttons→BACK Landing; COLLECTION→all five cards; actual card84px/portrait44px; Power→single-tap P4 detail with13px body/96px portrait/scroll-auto/nonshrinking header; close retains Power; Collection BACK Landing; reload Landing. Grid/detail no observed horizontal overflow and #game hidden across these UI routes.
7. Executable actual-main integration verifies Landing boot, both sibling routes, pageshow/visualViewport resize/scroll hiding stale arena, battle visible/exit hidden, ordinary URL save retention and explicit reset behavior. Existing reload/progression projection contracts pass.

## Pending player smoke / exact next action

Use the normal deployed URL with existing save; no reset required:
1. Landing BATTLE→Chapter Select→BACK Landing. Confirm no Collection entry nested inside Chapter Select.
2. Landing COLLECTION: compact cards readable, more roster capacity; ALL/Power/Speed/Blast correct; owned bright/locked portraits dim; name/Type/shards/progress retained.
3. Single tap an owned and locked card: compact detail correct, enough information space, BACK always accessible; close restores filter/reasonable position. Collection BACK returns Landing.
4. On supported iPhone landscape, check touch targets/safe areas/no horizontal overflow; reload and inspect unchanged shards/ownership/saved team.

Current catalog has only five characters and no lore/descriptions; actual long-copy/many-row touch comfort cannot be claimed from the public content. Synthetic contracts establish rendering/layout structure; device presentation remains pending. Existing Phaser bundle-size warning persists, build succeeds.

**STOP.** Wait for M4A correction acceptance. No M4B/Tier/spending/formal Landing art/animation.

---

## Historical first M4A release (not player accepted; superseded)

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
