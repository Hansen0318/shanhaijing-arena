# M3 Multi-character Reward Correction — Engineering Evidence

Status: **ENGINEERING PASS / PLAYER SMOKE PENDING**. Initial M3 smoke was explicitly player confirmed before this correction. Active branch `feat/m0-combat-core-20260927`, PR #1 open; no main merge/M4. Recovery base c9cc6253a28a9448193d553e9342ba190206273d. Safe implementation/deployed source a26de3f88f5e9e8d2c439593ea50308cd1fe39b6; closure changes docs only.

## Implementation
Only src/acquisition/model.js changes product behavior. Sanitize reward items using the existing boundary, then select firstClear on an unclaimed stage if any valid firstClear items exist; otherwise select repeatable. Replay selects repeatable. The sets do not add together. Repeatable-only initial wins remain eligible. No stage-number logic or randomness.

Existing Preview maps every definition row; existing Result maps authoritative granted items. No presentation/layout/controller/save/team/combat refactor was necessary. Chapter1 single-item engineering content remains unchanged. Tests temporarily inject a bounded multi-item reward into1-1 and restore it; nothing writes that content into production metadata.

## Actual checks
- RED `node --test tests/acquisition.test.js`:12/15, three expected failures reproducing additive initial reward semantics.
- GREEN `node --test tests/acquisition.test.js tests/campaignRewards.test.js tests/rewardPresentation.test.js`:33/33.
- Impacted `node --test tests/acquisition*.test.js tests/campaign*.test.js tests/rewardPresentation.test.js tests/rosterTeam.test.js tests/team*.test.js`:100/100.
- Independent read-only review of c9cc625→a26de3f:33/33 targeted and diff check; zero findings.
- `npm run build`, `git diff c9cc625..HEAD --check`:PASS. Existing large Phaser chunk advisory unchanged.
- Configured workflow automatically ran full suite; no unrelated local full/historical visual smoke was repeated. [Actions#284 /36877458362](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36877458362):272 tests,272 pass,0 fail; Build and Pages Deploy success. Build110420440136 /deploy110420594787.
- Local/CI/public JS index-BmyZkd3-.js; CSS index-Da2FpEU1.css unchanged. Public Chapter Select and Chapter1 Preview render, original1-1 CLEAR/CLAIMED survives,1-2 FIRST CLEAR visible. No page-origin error observed; browser-extension metadata errors excluded.

## Required coverage mapping
| Requirement | Executable evidence |
|---|---|
|1 firstClearA3+B2;2 replayB1;3 no replayA;4 unequalB quantities|acquisition multi-character transaction test; Campaign multi-item Victory integration|
|5 owned reward;6 owned persistence|P2 initially owned in synthetic integration; fresh persistence instances restore2 then3; existing syntheticP1 repeatable test retained|
|7 Preview multiple rows;8 firstClearCLAIMED;9 repeatable obtainable|actual CampaignView renders three character-specific rows before/after clear|
|10 Result first two items;11 replay one actual item|actual ArenaScene showResult fed real pure transaction output|
|12 duplicate multi-item callback|pure immediate/delayed receipt tests; actual controller duplicate and stale UUID rejection|
|13 existing single-item regression|exact unchanged Chapter1 metadata and full P4/P5 grant/unlock path|
|14 unlock/Team Select/persistence regression|seedP4=2 plus reward3 unlocks5, reload ownership and next Team Select availability; impacted acquisition save/Campaign/team suites|

Added five tests; updated one mixed-policy test's previous additive expectation to new canonical set semantics. New Preview test initially used an incorrect CSS class selector; corrected the harness to actual stage-reward class. No product UI bug or layout adjustment resulted.

## Limits and next action
Multi-character contract is covered by synthetic model/controller/DOM/Scene fixtures. The public approved Chapter1 content still uses single-item rewards, so this is not a claim of live mobile multi-row acceptance. Exact content remains a future explicit content decision.

Previous migration/storage limitations unchanged: old clears seed CLAIMED without retroactive shards, denied writes retain memory only, receipts grow; acquisition and Campaign keys are not cross-key atomic. Do not wipe saves.

Player smoke now: open original save and confirm CLEAR/CLAIMED intact; check Preview/Result/buttons readable; optionally complete one convenient repeatable1-4 Victory and reload to confirm a single increment survives. No need to repeat accepted full unlock path. When a real multi-item stage config is explicitly authorized, device checklist is three Preview rows, two CLAIMED after clear with repeatable available, first ResultP4+3/P2+2 and replayP2+1. STOP before M4; do not mark this correction PLAYER VERIFIED without confirmation.
