# M5C-B — Chat-side presentation correction validation / deploy

Status: targeted checks PASS; checkpoint / public validation pending.
Recovered baseline ff21825d362765f337fcfd51bf3f3b16d317b51e on feat/m0-combat-core-20260927 /PR#1. Chat source b1ca7f48 /b0582d07 /6ab67d70 /8b5b4588 /eebf53a8 preserved. Docs aaf97a10 /4c12ca32 /ff21825d preserved. Baseline Actions37181713979 failed; no main merge.

## Executable delta only
Initial targeted133:129 PASS/4 FAIL. Three were intended-contract test drift: slot captions are now child spans, formal upper identities no longer have duplicate name nodes, and actual Arena marker now calls setFillStyle absent in the minimal mock. Updated assertions/mocks to the new real APIs, retaining required/toggle/canBattle/identity semantics.
Fourth failure was genuine responsive CSS: minimum upper180px +44header +104bench +44footer +12gaps +4top +21bottom needs409px, exceeding390px and320px landscape. Added only max-height420px rule allowing upper min82px/flexible remaining height. Tall-screen180 target, Chat flex36%/negative2.5% overlap, enlargedVS52–92 and74px bench columns remain untouched. No layout redesign. Budget test still covers667×320,844×320(inset21),740×360,844×390 and932×430 using the correct media rule.

## Verified contracts
- Team static collectionArt full-body groups/formal conditional names vs placeholder names; lower formal compact-meta/type icon vs placeholder identity; failed formal image restores shared fallback label. Accessible character name labels remain for controls.
- Collection formal portrait retires duplicate collection-name node; other characters retain it. Enlarged1.28 crop/gradient/read-only Tier palette preserved, Detail static full identity unchanged.
- Actual Arena applyFrame: loaded visible formal sprite sets marker fill0; absent/invisible sprite sets fill1; selected ally stroke6/unselected3 remains, actor snapshot untouched. Dot→ring change only; marker positions/depth/geometry unchanged. Missing-Hit fallback preserves visible image.
- Prior72×96, facing/mirror,4-frame2.5fps/1.6s/common origin, pause/resume/cleanup, real combat hit-event visibility, viewport/internal grid restoration, menu loading/cache guards remain PASS. Source/runtime PNGs unchanged, encoded/decoded asset delta0, battle cache idle+portrait256KiB unchanged. Menus use static files only.

## Engineering evidence
Command: node --test tests/lushu*.test.js tests/asset*.test.js tests/collection*.test.js tests/team*.test.js tests/viewportSync.test.js tests/routeOwnership.test.js tests/lazyBattleRuntime.test.js tests/battleLabRuntime.test.js tests/preBattleGate.test.js tests/appRouteReset.test.js tests/hudCardLayout.test.js →134/134 PASS.
Asset guard40files148,075bytes /npm run build /git diff --check PASS. Existing chunk advisory unchanged. No full local regression; existing CI policy unchanged. Diff from Chat checkpoint only responsive CSS, three targeted test files and verification/handoff docs. No art/master/combat/AI/Tier/accounting/reward/progression/save/asset-architecture change.

## Release pending
Push tested correction; verify Actions/Pages/public entry/CSS/deferred battle chunk and PNG fingerprints; inspect actual Team/Collection/Detail/Battle ring surfaces. Then ENGINEERING PASS / PLAYER SMOKE PENDING.

## Ten-item player smoke / stop
1 Upper3v3 matches intended main visual;2鹿蜀 full-body large enough;3small overlap natural;4formal names retire;5lower head large;6Collection same contract;7battle no solid dot plus formal body;8selection ring works;9no disappearance;10facing/idle/BACK protected.
No formal Hit/KO/Cast, other characters, preview/Detail animation, scenic background,VFX/audio/Chapter2. Post-acceptance/global rule promotion stays Chat-owned after player PASS.
