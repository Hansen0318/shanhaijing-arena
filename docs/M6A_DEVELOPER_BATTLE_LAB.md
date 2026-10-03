# M6A Developer Battle Lab

Status: IN PROGRESS / CHECKPOINT A. User approved a coherent A–E batch; checkpoints continue automatically.

## Entry / hard isolation
Explicit query battleLab=1. Lab wins over resetProgress/campaignDev/fixture; bypass reset, formal CampaignController and ALL browser persistence initialization (including acquisition migration writes). Dedicated in-memory BattleLabController without formal ledger/storage capability. No normal Landing entry. Normal URL retains current routes/lazy runtime.

## Data and UI contracts
Six scenario records in src/dev/battleLab/config.js: normal/low-hp/heal/aoe/types/mitigation. Immutable configuration references rosterCatalog IDs and shared formal ability definitions; no copied dev stats. Both sides3 slots; duplicates allowed here only. HP override preset/100/50/25 applies allies only; enemies full HP.
LOW HP allies25% each. HEAL slot1 at25%, other allies100%, 赤鱬 slot3 selected. AOE clustered enemies within1.6-unit radius, 九尾狐 slot2 within formal range. MITIGATION 猼訑 slot2 near attackers, no pre-applied buff; use its real Special. TYPE matched lanes: Power/Speed/Blast allies; variant selects advantage/disadvantage/same enemy Types, live multiplier untouched. Presets are setup, not scripts locking AI/targets after launch.
Quick options: skip countdown; all skills ready; control mode AI only/manual enabled (mutually exclusive select). All-ready resets initial H/S/A slots only, never definition cooldowns. Current formal initial slots already ready when option off; explain this honestly. Manual uses existing joystick/skills; AI-only hides/disables manual inputs, same AI/execution.
Lab START constructs isolated config→lazy existing Arena→shared BattleSession, not Campaign factory validation/reward completion. Retry keeps frozen config and creates fresh session. Result only RETRY/BACK TO LAB; pause/exit/restart can remain common lifecycle. No next/rewards/unlocks.

## Integration boundaries
Separate Lab factory uses createCharacterState/createBattleSession, exact rosterCatalog/formalAbilityDefinitions. ArenaScene receives labConfig/labActions independently of campaignActions. Only battle setup/input presentation/result adapter change for Lab; normal default behavior preserved. Scene shutdown/restart clears statuses, transients and session. Routes still detach host/sleep loop on Lab menu.
Scenario schema supports additional formation/HP/team data records without executable per-character branches. Future dodge/telegraph/kite/boss/Tier test content requires separate authorization; not implemented now.

## Internal execution / checkpoints
A schema/controller isolation tests, commit/push (5/5 PASS).
B Lab UI/dev entry and reset/migration bypass tests, commit/push.
C formal session factory/direct launch adapter and save snapshot tests, commit/push.
D Arena options/manual/AI/result/retry/back tests, commit/push.
E targeted/impacted/full relevant/build/independent review, final push/Actions/Pages/public normal+dev verify, closure docs.
Recovery/main inspected; existing feat/m0-combat-core-20260927/PR1 branch Pages flow retained. No release infrastructure changes.

## Final smoke
One short normal-save-preserving run: open Lab, choose teams, HEAL/TYPE, skip countdown, retry/back, then normal URL save unchanged. Physical readability/touch remains player-owned. No full Campaign replay.

Checkpoint B: dev entry/menu targeted32/32 PASS; normal Landing remains default, Lab bypasses all formal persistence/reset initialization. Runtime adapter pending.
