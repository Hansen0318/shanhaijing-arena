# Global dynamic residency — shared-policy implementation checkpoint

2026-10-22 (Asia/Taipei). Scope: approved four-task shared capacity policy. **Shared policy implemented / scoped tests PASS; full-suite remains FAIL; Browser BLOCKED; Awakening NOT installed; NOT deployed or PLAYER VERIFIED.**

Player approved exact plan with「核准，繼續」after the plan link at50dcd3a. Receipt: `global-residency-plan-acceptance.json`. Approved plan bytes remain unchanged. Local tested source `33912570264d52b9c794668c20c623c9212d636e`, tree `8a86bf3fe755af34f4f5edc4cebf2c366161dcc7`; the final containing GitHub checkpoint may have different commit metadata but must have byte-identical runtime/test trees.

## Changes and preserved behavior

- `schema.js` retains4MiB encoded /2048 dimension /4194304 pixels. Cache defaults16MiB/64 are **inactive retention targets**, not admission, required-count or total-device-memory gates. Scene soft12MiB reclamation never evicts pinned keys or refuses a valid load.
- Cache removes pending64 rejection and per-load maxBytes rejection; keeps individual real metadata checks, fallback/dedupe and two transports. A result remains a valid image even if immediately dropped from inactive cache retention; never close a scene-owned decoded image.
- Residency removes hardBytes/maxEntries/131072 reserve admission and misleading hard-cap diagnostics. Keeps all encounter pins, estimated live/reserved/high-water bytes, optional LRU, actual load/renderer failures, retries and late destroy safety.
- Existing AssetPresenter already sequences portrait/Idle first, requires every image registration, fails on actual missing/decode/allocation errors and cleans scenes without destroying another scene's decoded images. No presenter change needed; two-scene+trim regression verifies retained ownership.
- Only retired policy assertions in eight legacy files changed; all historical anatomy/KO/ground/path/pixel assertions retained. The single formerly failing all-five inventory test is explicitly migrated to all-required ownership/finite diagnostics/zero teardown, rather than a stale sum/cap. Seven old path/metadata assertions in the affected run remain FAIL; no blanket harmlessness claim.

## Actual verification

| Run | Tests | Pass | Fail | Exit |
| --- | ---: | ---: | ---: | ---: |
| Cache Task1 |8|8|0|0|
| Residency Task2 |12|12|0|0|
| Shared cache/residency/required integration |30|30|0|0|
| Full affected11-file command |120|113|7|1|
| Full `npm test -- --test-reporter=tap` |993|965|28|1|

Build exit0; asset guard87files/4614620bytes. Existing Vite large-chunk warning retained. Unit tests use decode/renderer doubles; none are native GPU or physical-phone memory proof.

RED evidence: cache3new policy cases fail on original code; residency5new/revised cases fail on original residency. New65-image presenter integration rerun against an isolated archive of coherent50dcd3a source fails at required64, then passes current source. Guard/concurrency/failure tests already working were retained; no forced false RED. One run has65pinned/17039360estimated decoded bytes; independent two-image case33554432bytes. Real P1–P5 encounter stays45required/16611224bytes in eight warm restarts with critical ordering and teardown0.

## All28 remaining full-suite failures

| # | Test | Existing cause |
| --- | --- | --- |
|1|lossless row packing preserves every visible pixel world position including asymmetric mirror pivot|Test assumes Chiru Move first logical frame height118; current catalog is115. Row-only packing expectation predates current packing.|
|2|all required assets reserve and upload concurrently below cap while optional loads retain 128KiB|Required-key enumerator assumes every action/stage has blade and contact; approved utility Special does not. Access to undefined.assetKey fails before residency loading.|
|3|twenty five-roster Restart/scene transitions retain all action art within finite caps|Hardcoded required decoded total16639660 differs from current16611224.|
|4|Basic windup validates finite integer opt-in and preserves default immediate abilities|Global expectation omits approved P2.basic windup250ms; actual250 vs expected0.|
|5|other characters retain immediate Basic resolution|Fixture target e1 is P2; it now starts a250ms Basic action, while the test expects immediate damage.|
|6|manual air-cast emits visible cast intent without remote damage|Deep exact event comparison omits current eventAt,eventSequence,presentationEpoch metadata; actual event retains those fields.|
|7|formal idle presentation is intentionally static F1 while keeping runtime frame architecture|Test expects old160x160 physical Idle crop at0,0; native packed current crop is1,1,154,152. Not a new actor-size finding.|
|8|approved P3 KO resolves, preloads inside the shared budget and is one static grounded frame|Manifest selects special-runtime-v1/chiru-battleKo.png; test hardcodes characters/chiru/battleKo.png.|
|9|P3 approved static pack resolves all surfaces without breathing or extra frames|Test assumes Chiru Idle physical160x160/44131bytes; current physical148x160/44025bytes. Logical geometry and physical storage are distinct.|
|10|Approved campaign layout and Chapter2–6 rewards/schema retain their respective baselines|CSS hash changed in prior viewport release5d9b4f8d48251d29b2c060c3120c356e8e998125. Baseline asserts earlier entire-file hash before comparing Chapter2-6 data; later assertions not established by this failed test.|
|11|Heavy opts into280ms at every Tier without altering Basic or other skills|Global windup expectation omits approved P2.basic250ms, as in basicWindup test.|
|12|P4 runtime KO manifest/descriptor is a single static grounded 512 frame|P4 KO manifest selects special-runtime-v1; test hardcodes runtime-packing-v1.|
|13|P4 all three approved slots resolve actual byte-identical runtime PNGs|P4 Idle manifest selects special-runtime-v1; test hardcodes botuo-basic-packing-v1.|
|14|runtime Idle is exact old F1, not a regenerated idle|P1 Idle manifest selects special-runtime-v1; test hardcodes characters/lushu/battleIdle-static.png.|
|15|five-roster required art plus new action/effects fit actual cache and scene across restarts|Test historical subset sum expects15632136; current subset14148100. This subset is not the full current required inventory.|
|16|P1 runtime KO manifest/descriptor is a single static grounded 512 frame|P1 KO manifest selects special-runtime-v1; test hardcodes characters/lushu/battleKo-trimmed.png.|
|17|P2 runtime KO manifest/descriptor is a single static grounded 512 frame|P2 KO manifest selects special-runtime-v1; test hardcodes characters/botuo/battleKo-trimmed.png.|
|18|tests/lushuHeavyAssets.test.js|Test file worker receives SIGKILL in both full runs. Separate bounded hash/length inspection confirms its first assertion compares current387x83/128484 RGBA bytes with old512x85/174080bytes. SIGKILL root cause is NOT established; do not call this an OOM diagnosis or claim its remaining tests passed.|
|19|runtime PNG is RGBA, bounded and encounter-only, never a menu image|P1 Idle current physical width78 vs old96; test assumes old physical storage.|
|20|approved move slot is encounter-loaded with four isolated canonical cells and static idle preserved|P1 Move manifest selects special-runtime-v1; test hardcodes characters/lushu/battleMove-trimmed.png.|
|21|Special loads four safe authored frames and distinct approved independent effects|P1 Special atlas current physical235x59 vs old320x59 row-strip expectation.|
|22|P1 transparent-row Move/KO derivatives retain all original pixels and exact display transforms|P1 Move current physical atlas height182 vs old row-only91 expectation; native multi-row packing is not row-only cropping.|
|23|all-five Basic Heavy Special required textures fit unchanged16MiB across scenes|Hardcoded required decoded total16639660 differs from current16611224.|
|24|three confirmed impacts survive batched paint with distinct identity, follow target, then expire|Synthetic staged fixture borrows packed lushu.battleBasic source but invents80x80 logical frames not listed in specialRuntimePacking. physicalRegion explicitly rejects unsupported logical frame before impact assertions.|
|25|staged whiff creates source cue only; cancel clears owner impacts and KO removes target impacts|Same invalid synthetic80x80 frame/source fixture; not proof that whiff/cancel behavior itself is broken or passing.|
|26|retained legacy contact cannot replace the next staged body or hide its first30ms rush|Same invalid synthetic80x80 frame/source fixture; not proof that staged30ms/contact-retention behavior itself is broken or passing.|
|27|P5 approved lossless KO resolves exact RGBA PNG and a single static crop-corrected descriptor|P5 KO manifest selects special-runtime-v1; test hardcodes botuo-basic-packing-v1.|
|28|P5 all three approved slots resolve actual byte-identical runtime PNGs|P5 Idle manifest selects special-runtime-v1; test hardcodes botuo-basic-packing-v1.|

Full per-failure TAP excerpts and inherited categories: `result.json`. Compare against `recovery-2026-10-22/baseline.json`: all28 names are present in the previous29. Seven new tests and one explicitly migrated old capacity assertion explain993/965/28 vs986/957/29. SIGKILL remains observed, cause unconfirmed; do not claim underlying unexecuted tests PASS.

## Browser blocker and publication

Playwright is installed but local Chromium/headless-shell executable is absent. Standard `playwright install chromium --only-shell` failed with 'End of central directory record signature not found' and 'Failed to install browsers', exit1. Preserve `browser-install.log`. No native Phaser, actual built-app or mobile viewport run occurred. Do not bypass this with an art GIF or pretend a Node renderer double is native sampling.

Runtime checkpoint uses normal CI, not [skip ci] or a bounded release/probe bypass. Existing workflow full-suite step is expected to stop on existing failures; inspect actual Actions after push. No new Pages delivery, public fingerprint or phone acceptance is established. No main merge, replacement branch, TD or P3.

## Review and rulings

Self-review only because the project requires single-agent execution. Read full runtime diff and surrounding prepare/destroy, fallback and transport queue paths; examined all five plan Review Focus cases. No new critical/important finding in the scoped shared-policy delta. This is not an independent review or release clearance.

Minor deferred: several legacy test titles still mention unchanged16MiB after their assertions migrated. Kept as test-name history; they no longer establish a hard ceiling. No source behavior or release readiness depends on those titles.

Rulings: (1) preserve already-green guards/concurrency instead of manufacturing RED; risk: missed regression, mitigated by retained guard tests. (2) keep sole-branch task checkout and unrelated untracked temporary file; risk: less filesystem isolation, mitigated by explicit staging and protected diffs. (3) use locally installed same6.4.2 test reference after unavailable cloud subresource; risk: version mismatch checked by path. (4) reproduce integration RED on archived base after unit-level implementation; risk: weak coverage, mitigated by observed required64 rejection. (5) retain seven unrelated affected failures and all28 full failures rather than rewrite them to PASS; risk: assertions behind those failures remain unverified and bar a blanket release claim. (6) leave presenter unchanged after two-scene/failure tests; risk: uncovered readiness/lifetime edge case remains for native validation.

## Next exact Gate

Global-policy source is ready for the separate Awakening observational event/status + faithful installation contract review. Top current addendum in `../M5C_P2_BOTUO_AWAKENING_PREFLIGHT.md` supersedes its historical fixed-cap blocker without changing accepted art or clocks. That contract has no approval receipt yet. After scoped approval: true-victim/action identity and actual boyi.team provenance, faithful four-key pack and native scale/mirror/gutter checks, affected/full/build/actual browser, then validated Pages/public delivery for player review. Browser access and existing CI failures are explicit unresolved release concerns.

