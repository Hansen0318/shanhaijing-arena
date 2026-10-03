# INFO Hub verification

Status: INFO HUB IMPLEMENTATION — ENGINEERING PASS / PLAYER SMOKE PENDING.

## Canonical recovery and scope
Remote abe131de3ca45e783524510fed8ad6534a68357f on feat/m0-combat-core-20260927 / PR1; main16f73932a0399979ba79b92f93f5ce1c1d1909b9 inspected. Latest Actions37083335426 success. Prior overlay/performance player acceptance recovered from canonical handoff. Existing feature-branch Pages delivery retained; no delivery infrastructure change.
Spec: docs/INFO_HUB.md and explicit player implementation request. Three Landing sibling entries; exactly three INFO subpages. INFO local navigation only; normal reload remains Landing.

## Implementation
CampaignController adds guarded info/info-page screen states and infoPageId; no ledger/team/battle mutation. CampaignView delegates to read-only INFO data/view, with INFO CSS import in main. Shared typeMark supplies ◆/➤/✦. Triangle places Power top, Blast bottom-left, Speed bottom-right with directional P→S→B→P arrows; no names inside triangle. Relations and multipliers below:1.15/.85/1.00.
Guide documents current controls,3v3,KO/90-second HP%,shards/recruitment,T0→T3. World is a short premise. Every subpage has media placeholder; no fake art. Fixed header outside scrolling content keeps BACK available, safe-area insets on all sides, flexible columns and short-height CSS. Static, no motion/dependency/cleanup timers.
Protected: combat resolver/typeMultiplier/acquisition/Tier/persistence/Chapter data/roster/Collection/Landing CSS/runtime lazy loader and route visibility sources unchanged. Whole CampaignView hash from M5B test removed because this authorized milestone changes Landing and route adapter; existing Landing behavioral assertions extended to three buttons, CSS hash and Chapter2–6 exact baseline retained.

## Test evidence
RED: absent Landing INFO/navigation contracts before implementation. GREEN targeted40/40: infoHub,landingView,appRouteReset,lazyBattleRuntime,routeOwnership,viewportSync.
Impacted152/152: preceding + collectionNavigation,campaignNavigation,campaignRewards,rewardPresentation,resultShardProgress,tierT0Correction,acquisition,acquisitionPersistence,collectionView,formalChapter,teamFilter,teamFlowView,battleRestart.
Full npm test431/431, zero failures; npm run build PASS; git diff --check PASS. INFO tests use real controller/view with minimal DOM, snapshot all non-navigation controller properties and count zero writes. INFO route lifecycle covers four routes, orientation/pageshow/viewport + reload to Landing and no Game creation. Existing multiplier behavior exact; source file unchanged.
CSS contract checks reserve minmax(0,1fr),44px buttons, safe insets and short-height rules. Physical landscape/short-height readability remains player smoke; do not label static CSS checks as physical phone verification.

## Loading evidence
Same Vite build: entry71,960 bytes vs accepted67,234 (+4,726 bytes); battle chunk1,393,903 bytes unchanged in size and deferred. No INFO imports Phaser/ArenaScene/runtime. No INFO media network assets. Existing large deferred Phaser chunk advisory remains.
Fingerprints: index-BdiMi8Tk.js, index-CCHQa3nv.css, battleRuntime-DhqO-uAr.js. CSS17,389 bytes.

## Independent review / release
Independent read-only review12/12: no Critical/Important; Minor recruitment copy/language/focus addressed with RED→GREEN assertions. Re-review confirmed fixes; remaining Minor hub→Landing focus was also fixed and tested. Final tested/deployed source39561844877136940fcb09a3270d1bd35327f511; subsequent closure documentation-only. [Actions#365 /37088162820](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37088162820) SUCCESS: CI431/431 zero failures; Build111102623655 and Pages111102788768 success. Public/local/CI index-BdiMi8Tk.js / index-CCHQa3nv.css match; CI deferred battleRuntime-DhqO-uAr.js artifact present. Public HTML has no modulepreload.
Public normal URL https://hansen0318.github.io/shanhaijing-arena/: Landing shows3 entries; Hub exactly3 pages, all subpages and BACK paths observed. Headings receive focus; Hub BACK restores focus to Landing INFO. Reload from Type subpage returns Landing. Collection/Chapter sibling navigation remains usable. INFO host absent, zero canvases throughout; no reset/save injection/battle/reward/upgrade performed. Observed page-origin error list empty.
Cloud1363×936: root scrollWidth=clientWidth1363; Guide/Type body scrollWidth=clientWidth1323; BACK82.3×46px atx20/y12. Type screenshot inspected: icons-only triangle correctly directed, readable explanation below; no blue canvas. CSS/automated viewport contracts cover short landscape restoration; physical safe-area/short-height/readability acceptance remains pending (cloud tool has no viewport emulation control).

## Focused player smoke
Normal https://hansen0318.github.io/shanhaijing-arena/ without reset. Landing INFO→each of3pages→BACK→Hub→BACK→Landing. On iPhone landscape/short-height: BACK accessible while scrolling, no horizontal overflow, readable icon-only triangle/arrows/explanation, placeholders and text contained. Rotate portrait/landscape and reload; no blue canvas. Existing Collection and Campaign remain available. No battle replay/reward/upgrade required.
STOP: no AI dodge/tactics/type changes/combat/art/animation/audio or extra INFO pages.
