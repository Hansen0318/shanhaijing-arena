# M3 execution plan

Spec: docs/M3_SHARD_REWARD_UNLOCK.md. User authorized direct inline execution, checkpoints and deployment on feat/m0-combat-core-20260927 / PR #1. Preserve the accepted combat/input/presentation baseline. Do not start M4.

1. Pure acquisition model: universal catalog-keyed shard counts, initial P1/P2/P3 ownership, normalized reward items, retained shards at threshold 5, firstClear receipts and completion idempotence. Test owned rewards and invalid data before implementation.
2. Dedicated versioned acquisition save: migrate missing/pre-M3 data by seeding first-clear receipts from existing Campaign clears (no retroactive grants), preserve other save keys. Denied storage retains in-memory state. Test reload/malformed/obsolete storage; checkpoint.
3. Chapter 1 metadata fixture, controller Victory transaction, fresh battle completion identity and current ownership. Test firstClear/repeatable flow, cancellation, duplicate/stale callbacks, team sanitation. Keep explicit ownership injection as an engineering-only fixture.
4. Shared reward presentation model, compact Stage Preview labels/CLAIMED and actual Result grant/unlock rows; render current roster ownership. Test executable view/result integration. Checkpoint.
5. Impacted progression/navigation/roster/lifecycle regression, build and whole-diff review; public workflow requires full Node suite, so run it once for release. Push/deploy and verify public bundle. Update recovery evidence and player smoke checklist. STOP.

Interfaces: acquisition transaction returns state + grantedItems/unlockedCharacterIds/shardCounts; persistence normalizes the same state; controller owns completion IDs and passes authoritative result to UI. Campaign clear save remains unchanged. Acquisition receipts, rather than DOM or Campaign UI text, control claims.

Migration ruling: pre-M3 cleared stages are CLAIMED and do not award retroactive shards. All existing Campaign clears remain intact. Fresh users obtain the documented Chapter 1 fixture. Existing users can test using separate browser/site data without wiping their original saves.

Review focus: firstClear/repeatable mixed items; storage write failures/reload; stale finish after Restart; dev save isolation; multi-item result layout; no owned-shard discard/reset; no protected combat diff.
