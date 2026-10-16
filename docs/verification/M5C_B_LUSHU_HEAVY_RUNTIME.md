# Heavy runtime execution ledger

Plan: docs/superpowers/plans/2026-10-16-heavy-synchronization.md
Base4fd4da4e4da5b724833d01a786139ba26b9ba59e. Latest player authorizes recommended280ms synchronization and continued inline execution2026-10-16T20:54:52+08:00.

Ruling: Continue implementation in this Work as directed, preserving explicit280ms consent; routine spec/plan transcription does not reopen that decision. No other gameplay timing/stat authorization.
Ruling: Budget optimization uses lossless Botuo KO transparent-row derivative with original master untouched and full-width mirrored transform unchanged; no new character art or behavior. Pixel equality and exact transforms are required before release.
Preflight interfaces: pending-actions produce category/phase/actionId consumed by existing ActionPlayback; asset descriptors match existing four-frame/independentFX schema; no subsystem redesign needed.
Status: implementation pending; no runtime/build/deploy PASS yet.

Task1 RED16/16 observed: immediate damage/no phase. Generalized pending action engine; Basic stale assertions updated only for authorized Heavy opt-in. Ruling: read-only pendingBasics getter preserves diagnostics while all production actions use one pendingActions map. Ruling: reusable clear+manual step exposed missing tacticalState after clear; recreate empty state before Object.keys to preserve safe cleanup/reuse. Covered by Heavy clear cancellation test.

Task1 complete: Heavy16 RED→GREEN; Basic14 retained; focused30/30 PASS. Not deployed.

Task2 asset tests RED3→GREEN4/4; original Basic bytes and Botuo master preserved; all-five scene16748808bytes, both-facing crop transform exact,8cache scene cycles.
Ruling: Heavy impact must attach to actual resolved target coordinates, unlike existing Basic source-attached contact. Add optional effect attach=target and copy resolve target in shared playback; preserve default Basic geometry. Bridge RED5 failures prove missing attachment/snapshot; existing Arena feedback already synced.
First full diagnostic:16 failures, largely stale inventory/budget/KO frame and old immediate-Heavy expectations; two Phaser import failures before dependency install. No failures hidden; fix direct contracts before release.

Task2 complete: independent Heavy assets + lossless512x331 KO derivative registered; protected source hashes preserved.
Task3 focused50/50 PASS; bridge RED5→GREEN target-attachment coordinates copied on resolve and anchored to target. First full regression had stale inventory/pinned-count/frame geometry/immediate-Heavy assertions; updated exact new contracts, preserving master hashes and adding true-time assertions. A Basic-only asset test needed explicit reclaim of a warmed optional collection texture because improved budget no longer evicts it by incidental hard-limit pressure. All required keys remain asserted. Dependencies npm ci19packages. Full782/782 PASS; asset guard68files3749260bytes; BuildPASS (Vite existing large-chunk advisory only), diff-checkPASS. Independent whole-delta review in progress. Not deployed yet.

Independent review preliminary Important: same actor Heavy→Basic action replaces playback but reuses Heavy effect image textures. Separate-actor concurrency tests missed cross-skill effect ownership; must add real AI sequence RED test and clear/rebind effect images on accepted new action before release. Checkpoint remains INCOMPLETE/review-pending; do not deploy.

Final independent review: gpt-6-astra fresh context, full working delta against4fd4da4. One Important, no Critical: same-actor cross-skill VFX image reuse. Fixed with actionId-owned effect image replacement; realAI Heavy→Basic and Basic→Heavy RED→GREEN, duplicate/stale starts retained.
Final Ruling: valid next Basic may interrupt resolved Heavy recovery; no new cadence or gameplay/input lock. To keep real resolved-hit feedback visible when several simulation steps precede paint, retain last actual impact per actor for one paint, freeze it at duplicate simulation time, then follow current action. No delayed simulation/HP/CD. Batched resolve+start RED→GREEN. Last-hit-per-actor-per-paint is bounded64owners; no artificial extra damage/hits.
Final fixed: late first paint after ActionPlayback expiry could orphan the one-frame impact; new late-paint test RED→GREEN, clear effects even if active action was already sampled away. No new gameplay change.

FINAL LOCAL VERIFICATION:786/786 tests PASS, asset guard68files3749260bytes, buildPASS, diffcheckPASS, protected tracked public assets unchanged against4fd4da4. Only4new PNG derivatives added. Required16748808bytes; cache/scene high-water within unchanged16777216. Independent Important finding fixed with3 transition/batch RED→GREEN tests plus1 expiry regression RED→GREEN; no Critical/Important remains from review. Feature CI/Pages/public fingerprints NEXT; phone acceptance remains pending.
