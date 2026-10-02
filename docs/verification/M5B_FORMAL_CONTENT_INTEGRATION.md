# M5B formal Chapter1 data integration verification

## Status
**ENGINEERING PASS / PLAYER SMOKE PENDING.** Final tested/deployed source `a692e2357639c99a36aab196026ec9d358c02575`; original branch/PR retained, no main merge. Later closure is documentation-only.
Player acceptance remains pending. No final art/animation/VFX/audio, advanced Tier mechanics, tactical variation or Chapter2 formal content.

## Recovery / checkpoints
Original branch feat/m0-combat-core-20260927 / PR#1; preflight fbe4645cd04dcd12b12028232bf75df8ac9f1ece.
- A5a08a6f08ade3b59fe1aba173c644d244e3d056a: formal catalog, unique ability IDs/data,60/60 targeted.
- Bfbd957bbe590f485e80bef67df1cb5cbea67daf8: shared effects/targeting/mitigation,63/63 targeted.
- Cc440f5c5d6ec54a5fe925ad9511e90949c127cff: five T0 kits, AI/presentation,106/106 targeted.
- Dadaa3a38ed5c8004b660cfb2e4705ab9a78e3006: exact Chapter1 data/Collection,395/395 local and build.

## Engineering coverage
- formalCatalog11: stableP1–P5, exact names/Type/Role/stats, all25 named definitions, immutable cooldown/range/effect data.
- formalEffects7: deterministic ally HP% tie/KO/dedup; heal clamping/actual event, team once, no revive/crit; affiliation contract; mitigation multiplier/expiry/fresh state; enemy AoE deterministic once; self defense without enemies.
- formalKits11: all five characters; bounded engage/reposition; ranged air-cast; per-target AoE; timed3/4hit sequences and KO cancellation; threshold AI; shared manual/AI pipeline; held control suppresses automatic HSA; prepared AoE opportunity; support preserves enemy target.
- formalChapter9: all exact Chapter1 lineups/rewards/spawn slots; cumulative5 fox/finale bruiser unlock and repeat-only rewards; catalog detail/HUD identities; complete schema3 acquisition receipts/spent/Tier/team/stage reload invariants; fixed golden Chapter2–6 data and Landing hashes.
- Added real ArenaScene Pause test freezes formal mitigation and pending hits; fresh session resets both. Existing Restart/Retry/Pause/controller/cadence/critical/damage tests retained.
- Generic green+heal number and cleanup tested; ◈ placeholder on living mitigated actor label. Uses existing scene tween/Pause clock.
- Full npm test397/397 zero failures covers targeted, impacted and complete combat regression; build PASS. CSS index-082fIvTy.css unchanged, final local JS index-DJGeqONb.js. Existing Phaser bundle-size advisory remains nonblocking.
- No acquisition/Campaign/team persistence, Tier accounting, Landing view/style, route/reset or Chapter2–6 content code changes.

## Independent review
Read-only independent reviewer inspected whole diff and ran112/112 targeted tests; no Critical/Important findings. Minor: prepared AoE opportunity check bypass. Reproduced with RED two focused AI tests; shared opportunity predicate and enemy-target preservation correction GREEN48/48. Final whole suite397/397. Follow-up independent75/75 PASS, no remaining findings.

## CI issue addressed
A–C CI failures were interim stale prototype fixture expectations, corrected atD. Actions350 /37014810174 failed one final golden-baseline test because actions/checkout shallow clone lacked historical commitfbe4645; Build/Deploy skipped. Replaced test-time git history reads with checked-in Chapter2–6 golden data and Landing SHA256 hashes; no CI pipeline/checkout change. Local golden9/9 PASS. No failed source released.

## Content seeds / honest boundaries
Exact range tuples, heal25%/16%, mitigation25%/4s/selfT0, area radii2.2/1.6, movement seeds and crit metadata are recorded in docs/M5B_FORMAL_CONTENT_INTEGRATION.md and immutable src/roster/abilities.js.
Named passives have metadata and honest descriptions; unspecified numeric conditional bonuses are not invented. Base stats/mobility/support identity express this first T0 baseline. Tier advanced effects, control/disruption, persistent zones and retreat tactics remain approved future spec.
Multi-hit total coefficient is2.20/2.30, split3/4 hits. Existing DEF/type resolver applies per hit; final HP loss is not equivalent to subtracting DEF only once.

## Targeted player checklist (normal URL; no reset)
1. Collection: five formal names, Type/Role, existing Tier/shards, lore/summary and five ability names/descriptions; reopen/reload retains prior data.
2. Team Select: same formal identities on ally bench and enemy preview; saved team order retained.
3. A battle with 赤鱬: green+heal, lowest-HP ally and team heal, KO stays KO. HSA manual use while holding joystick remains player-owned.
4. 九尾狐: ranged attacks/AoE; 猼訑: ◈ protection; 鹿蜀/狌狌: short engage and multi-hit. Pause/Restart should leave no old indicators/hits.
5. Chapter1 Preview: exact formal first/repeat rewards; existing claimed firstClear stays unavailable and replay remains farmable. No need to reset/replay historical M0–M4 smoke.

STOP after engineering release and this player handoff.

## Public label follow-up
Actions351/37015324723 at838c1bdaba238a0ea713b8f5c85a6f10c88d59d7 CI397/397, Build and Deploy PASS. Public JSindex-BU900RvY.js/CSSindex-082fIvTy.css matched; Collection/赤鱬 Detail and formal 1-1 enemy/team preview observed. Reward Preview still showed P IDs; generic presentation now resolves catalog names for Preview/Result/unlock prose. No transaction/receipt/save ID or quantity change. RED6/7→GREEN7/7; impacted34/34; independent34/34/no findings; final full397/397/build PASS, JSindex-DJGeqONb.js. Final deployment confirmed below.

## Final release evidence
- Actions#352 [37015761111](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37015761111), sourcea692e2357639c99a36aab196026ec9d358c02575: CI397/397 zero failures, Build and Pages Deploy SUCCESS. Buildjob110866095038/deployjob110866226090. CI log confirms JSindex-DJGeqONb.js/CSSindex-082fIvTy.css, matching local build and public DOM asset URLs.
- Public normal URL reload, Landing and both modes, all five Collection formal names, 赤鱬 full data/detail/skill copy and disabled insufficient UPGRADE, formal Chapter1 theme/stage, 1-1九尾狐×3/鹿蜀×2/replay鹿蜀×1, TeamSelect allies/enemy狌狌/鹿蜀/赤鱬 and initial battle HUD observed. No reset/save injection performed. Browser extension metadata errors are external; no page-origin warning/error captured.
- Public cloud battle startup shows correct HP245/320/235 vs285/245/235, named placeholder portraits, frozen3 countdown and Pause/Resume UI. Sustained cloud countdown/animation progression was not established (still observed3 after Resume); supported visibility capability unavailable. Do not claim a live full-round smoke. Actual-clock/scene Pause tests and headless terminal battles passed; physical countdown, touch, visual feel and live kit readability remain targeted player smoke.
- Deterministic normal initial team P1/P2/P3 auto terminal probe:1-1defeat26s (205damage/14heal),1-2victory34.2s (181/6),1-3defeat27.35s (190/11),1-4defeat20.8s (159/5),1-5defeat27.3s (163/7); mitigation observed all5. These are fixed-seed engine observations, not player acceptance/final balance; no stat or lineup tuning was performed.
- Independent label follow-up34/34 clean. No Critical/Important/Minor findings remain. Named unspecified passive modifiers remain deferred; no invented numerical bonuses.
- Player checklist additionally confirms countdown actually enters battle on iPhone. STOP at this handoff; do not expand scope.
