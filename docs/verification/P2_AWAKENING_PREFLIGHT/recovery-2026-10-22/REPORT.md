# Recovery baseline — 2026-10-22 (Asia/Taipei)

Source HEAD `bd9caac3509f1219dd5e23a517cc01eb0ba1b2e9`; tree `87767a5b6496dfc9b9c50c9fc5f4a92ec24e4cc3`. Same feature branch, PR#1 open/unmerged; fresh clone initially clean. The two named historical untracked temporary files are absent in this fresh clone; none added/deleted/modified.

## Actual verification

| Command | Exit | Tests | Pass | Fail |
| --- | ---: | ---: | ---: | ---: |
| `node --test --test-reporter=tap` | 1 | 986 | 957 | 29 |
| `node --test --test-concurrency=1 --test-reporter=tap` | 1 | 986 | 957 | 29 |
| `node --test tests/assetCache.test.js tests/assetResidency.test.js tests/dynamicAssetIntegration.test.js` | 0 | 23 | 23 | 0 |

Both full runs have identical29 failure names/order. These results supersede the five-failure historical baseline for this recovery only; no old evidence is rewritten. One failure is a SIGKILL test-file worker, not an ordinary assertion; unexecuted cases are unknown. Original stdout is preserved compressed with SHA256 in baseline.json. Initial unsupported JSON-reporter attempt exit7 did not execute tests; switched to TAP. npm ci succeeded; package lock unchanged.

## All current failures

| # | Test / file | Observed cause |
| --- | --- | --- |
| 1 | lossless row packing preserves every visible pixel world position including asymmetric mirror pivot (`tests/awakeningRuntimePacking.test.js:9:1`) | Test assumes Chiru Move first logical frame height118; current catalog is115. Row-only packing expectation predates current packing. |
| 2 | all required assets reserve and upload concurrently below cap while optional loads retain 128KiB (`tests/awakeningRuntimePacking.test.js:12:1`) | Required-key enumerator assumes every action/stage has blade and contact; approved utility Special does not. Access to undefined.assetKey fails before residency loading. |
| 3 | twenty five-roster Restart/scene transitions retain all action art within finite caps (`tests/basicActionIntegration.test.js:25:1`) | Hardcoded required decoded total16639660 differs from current16611224. |
| 4 | Basic windup validates finite integer opt-in and preserves default immediate abilities (`tests/basicWindup.test.js:3:1`) | Global expectation omits approved P2.basic windup250ms; actual250 vs expected0. |
| 5 | other characters retain immediate Basic resolution (`tests/basicWindup.test.js:6:1`) | Fixture target e1 is P2; it now starts a250ms Basic action, while the test expects immediate damage. |
| 6 | manual air-cast emits visible cast intent without remote damage (`tests/battleSession.test.js:176:1`) | Deep exact event comparison omits current eventAt,eventSequence,presentationEpoch metadata; actual event retains those fields. |
| 7 | formal idle presentation is intentionally static F1 while keeping runtime frame architecture (`tests/botuoIdleRuntime.test.js:19:1`) | Test expects old160x160 physical Idle crop at0,0; native packed current crop is1,1,154,152. Not a new actor-size finding. |
| 8 | approved P3 KO resolves, preloads inside the shared budget and is one static grounded frame (`tests/chiruKo.test.js:26:1`) | Manifest selects special-runtime-v1/chiru-battleKo.png; test hardcodes characters/chiru/battleKo.png. |
| 9 | P3 approved static pack resolves all surfaces without breathing or extra frames (`tests/formalCatalog.test.js:13:1`) | Test assumes Chiru Idle physical160x160/44131bytes; current physical148x160/44025bytes. Logical geometry and physical storage are distinct. |
| 10 | Approved campaign layout and Chapter2–6 rewards/schema retain their respective baselines (`tests/formalChapter.test.js:10:1`) | CSS hash changed in prior viewport release5d9b4f8d48251d29b2c060c3120c356e8e998125. Baseline asserts earlier entire-file hash before comparing Chapter2-6 data; later assertions not established by this failed test. |
| 11 | Heavy opts into280ms at every Tier without altering Basic or other skills (`tests/heavyWindup.test.js:13:1`) | Global windup expectation omits approved P2.basic250ms, as in basicWindup test. |
| 12 | P4 runtime KO manifest/descriptor is a single static grounded 512 frame (`tests/jiuweihuKo.test.js:34:2`) | P4 KO manifest selects special-runtime-v1; test hardcodes runtime-packing-v1. |
| 13 | P4 all three approved slots resolve actual byte-identical runtime PNGs (`tests/jiuweihuStatic.test.js:27:1`) | P4 Idle manifest selects special-runtime-v1; test hardcodes botuo-basic-packing-v1. |
| 14 | runtime Idle is exact old F1, not a regenerated idle (`tests/lushuBasicAssets.test.js:5:1`) | P1 Idle manifest selects special-runtime-v1; test hardcodes characters/lushu/battleIdle-static.png. |
| 15 | five-roster required art plus new action/effects fit actual cache and scene across restarts (`tests/lushuBasicAssets.test.js:8:1`) | Test historical subset sum expects15632136; current subset14148100. This subset is not the full current required inventory. |
| 16 | P1 runtime KO manifest/descriptor is a single static grounded 512 frame (`tests/lushuBotuoKo.test.js:38:2`) | P1 KO manifest selects special-runtime-v1; test hardcodes characters/lushu/battleKo-trimmed.png. |
| 17 | P2 runtime KO manifest/descriptor is a single static grounded 512 frame (`tests/lushuBotuoKo.test.js:38:2`) | P2 KO manifest selects special-runtime-v1; test hardcodes characters/botuo/battleKo-trimmed.png. |
| 18 | tests/lushuHeavyAssets.test.js (`tests/lushuHeavyAssets.test.js:1:1`) | Test file worker receives SIGKILL in both full runs. Separate bounded hash/length inspection confirms its first assertion compares current387x83/128484 RGBA bytes with old512x85/174080bytes. SIGKILL root cause is NOT established; do not call this an OOM diagnosis or claim its remaining tests passed. |
| 19 | runtime PNG is RGBA, bounded and encounter-only, never a menu image (`tests/lushuIdle.test.js:29:1`) | P1 Idle current physical width78 vs old96; test assumes old physical storage. |
| 20 | approved move slot is encounter-loaded with four isolated canonical cells and static idle preserved (`tests/lushuMove.test.js:20:1`) | P1 Move manifest selects special-runtime-v1; test hardcodes characters/lushu/battleMove-trimmed.png. |
| 21 | Special loads four safe authored frames and distinct approved independent effects (`tests/lushuSpecialAssets.test.js:5:1`) | P1 Special atlas current physical235x59 vs old320x59 row-strip expectation. |
| 22 | P1 transparent-row Move/KO derivatives retain all original pixels and exact display transforms (`tests/lushuSpecialAssets.test.js:13:1`) | P1 Move current physical atlas height182 vs old row-only91 expectation; native multi-row packing is not row-only cropping. |
| 23 | all-five Basic Heavy Special required textures fit unchanged16MiB across scenes (`tests/lushuSpecialAssets.test.js:25:1`) | Hardcoded required decoded total16639660 differs from current16611224. |
| 24 | three confirmed impacts survive batched paint with distinct identity, follow target, then expire (`tests/stagedActionPlayback.test.js:30:1`) | Synthetic staged fixture borrows packed lushu.battleBasic source but invents80x80 logical frames not listed in specialRuntimePacking. physicalRegion explicitly rejects unsupported logical frame before impact assertions. |
| 25 | staged whiff creates source cue only; cancel clears owner impacts and KO removes target impacts (`tests/stagedActionPlayback.test.js:36:1`) | Same invalid synthetic80x80 frame/source fixture; not proof that whiff/cancel behavior itself is broken or passing. |
| 26 | retained legacy contact cannot replace the next staged body or hide its first30ms rush (`tests/stagedActionPlayback.test.js:41:1`) | Same invalid synthetic80x80 frame/source fixture; not proof that staged30ms/contact-retention behavior itself is broken or passing. |
| 27 | P5 approved lossless KO resolves exact RGBA PNG and a single static crop-corrected descriptor (`tests/xingxingKo.test.js:24:1`) | P5 KO manifest selects special-runtime-v1; test hardcodes botuo-basic-packing-v1. |
| 28 | all five Portrait/Idle/Move/KO textures remain present in real cache and scene under unchanged16MiB (`tests/xingxingKo.test.js:40:1`) | Hardcoded required decoded total16639660 differs from current16611224. |
| 29 | P5 all three approved slots resolve actual byte-identical runtime PNGs (`tests/xingxingStatic.test.js:27:1`) | P5 Idle manifest selects special-runtime-v1; test hardcodes botuo-basic-packing-v1. |

## Release and review boundary

No src/public/tests/art/workflow changes; no Build, Browser/native/mobile, Actions release or public fingerprint validation. Existing approved Special deployment is not a deployed Awakening. No PLAYER VERIFIED claim. The classifications above establish mismatches, not permission to delete old protection checks, overwrite expected hashes blindly, or label all failures harmless. Future migration must compare reconstructed logical RGBA/transforms and assert actual behavior.

## Implementation-plan review prepared

Unchanged plan: `docs/superpowers/plans/2026-10-22-global-dynamic-asset-residency.md`, SHA256 `16d36b5a209dc6c83fb240dad51f1fab17d0646f60a31cea7de4786e3d1ed067`. Approved specification hash matches its existing receipt. Current AGENTS.md and plan execution-handoff explicitly require independent player review before production-code changes; current request says to check actual approval scope, and supplies no separate approval of this exact plan. Do not fabricate an acceptance receipt. Next action is present that concrete plan for review.

Review summary: Task1 changes cache admission to per-image validation with soft inactive retention and two transports. Task2 removes scene total/count/reserve rejection, preserves every required pin and real allocation/late-load cleanup. Task3 proves >16MiB/>64required full readiness and migrates affected assertions without changing artwork/gameplay. Task4 records affected/full/build results and prepares the separate Awakening event/art slice.

Plan corrections to apply during an approved implementation: (1) invalid metadata and the existing two-transport checks already pass on this base; only genuinely new behavior must be observed RED, never force an already-good guard to fail; (2) Task3 legacy-file assertions include already-failing path/physical geometry expectations, not only retired capacity-policy assertions, so do not promise a fully green legacy command without bounded source-exact migration; (3) use this exact29-failure baseline, not the older five; (4) keep SIGKILL diagnosis open until direct evidence establishes the process-kill cause, avoiding huge Buffer assertion diffs; (5) global-policy PASS alone is not Awakening, native browser or release PASS.

All original approved masters/receipts/GIFs, cache/residency/schema, gameplay clocks, and superseded Chiru KO plan remain untouched.
