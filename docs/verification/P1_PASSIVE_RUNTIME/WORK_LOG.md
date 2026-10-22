# SDD ledger — plan: docs/superpowers/plans/2026-10-22-lushu-passive.md

Base:7497b3545cd618b0f349393f5b88a0707b4a6f13. Spec and plan approved; native single-agent. Tasks1–4 pending.

Pre-flight Task1→Task2: PassiveRuntime.characterForActor supplies Tier-projected instance definitions, ordinary segments only. Task2→Task3: immutable PassiveView snapshot, no UI clocks. Task3→Task4: actual renderer independent formal-art badge and real CSSfont metrics. Task4: normal source-bound release guard must block unverified source.

Ruling: Use existing task-specific feature checkout in scratch; user forbids alternate branch and all prior work uses this checkout. No linked worktree/new branch; preserve unrelated untracked. Cost if wrong: no extra checkout-level isolation, mitigated by exact staged path allowlists.
Ruling: Cloud skill scripts have no local executable root; implement their ledger/brief/completion steps in .git/lushu-passive-work and copy durable evidence to WORK_LOG. Cost if wrong: bookkeeping implemented manually; commands/results recorded explicitly.
Ruling: Reuse source-identical1014/1014 baseline rather than rerun unchanged fullsuite at setup per user rule; after shared Runtime changes run actual fullsuite normally. Cost if wrong: environment-only baseline fault discovered later, distinguish using saved source/evidence hashes.
Ruling: Existing project explicitly requires native single-agent/self-review, so do not spawn final reviewer; document independent-review limitation. Cost if wrong: same-author blind spots, mitigated by RED→GREEN/real browser/fullsuite and focused self-review.

Task1: ACTIVE. Read task brief and approved spec; tests first.

Task1: complete — new schema/runtime10/10 PASS after10 intendedRED missing-feature failures; command node --test tests/passiveDefinition.test.js tests/passiveRuntime.test.js. Production roster stilldisabled. npmci exit0, Node24.19.0 satisfies>=22.12.0; normalCI willuse22.12.0. Exact RED/GREEN logs saved besideWORK_LOG.
Task2: ACTIVE — motion/session tests first.
Ruling: optional writing-good-tests reference is unavailable from cloud package; main TDD instructions read and applied, actual feature-missing RED and real status behavior tested. Cost if wrong: missing supplemental testing advice; no gate bypass.
