# P1 Basic action runtime preflight — 2026-10-15

Status: **HISTORICAL PREFLIGHT / B SELECTED; WRITTEN DESIGN REVIEW PENDING**.

Latest2026-10-15T22:33:01+08:00: player selected B and has now accepted docs/superpowers/specs/2026-10-15-shared-basic-windup-design.md with「好，繼續」. Current next gate is implementation-plan review at docs/superpowers/plans/2026-10-15-shared-basic-windup.md, then native execution. Do not repeat A/B or design approval. Historical diagnostic evidence below remains unchanged; no implementation/deployment claimed.

Recovered feature HEAD9b35358fd998186d9877db5c9609f180f94be2e9, branch feat/m0-combat-core-20260927, open PR#1 against main. Remote main16f73932a0399979ba79b92f93f5ce1c1d1909b9. Current AGENTS/playbook/boundaries/current pointers and action-art workflow/spec re-read. No main merge.

## Acceptance and authorized continuation

Player explicitly accepted the normal/slow GIF links with「好ok，繼續」at2026-10-15T22:12:13+08:00. Four poses, independent blade/contact appearance, GIF attack sequence and Idle return are accepted as review art. Record exact files/hashes in docs/art/approved/lushu/basic/review-v1/acceptance.json. Approved artifacts copied byte-for-byte, never regenerated. The player asks to continue integration; deployment is still contingent on a safe engineering contract and passing verification. Art acceptance is not proof of engine synchronization.

## Concrete synchronization mismatch

In src/combat/battleSession.js, executeAbility() calls finishAbility()->applyAbilityEffects()->applyResolvedDamage() in the same call for P1.basic. P1.basic has no telegraph/windup in src/roster/abilities.js. Only afterward does executeAbility() call recordCast(). Thus HP changes and damage/cast records exist before simulation time advances. src/runtime/ArenaScene.js renderCastEvents() renders damage numbers and hit feedback before draining the cast records for that same simulation time.

The approved review GIF instead gives F1=120ms + F2=60ms before F3 contact starts: impact is180ms after action start. Playing the full GIF sequence from the existing cast cannot also put its F3 contact at the existing immediate damage time. This is a timing-contract question, not an asset failure.

Do not silently introduce180ms damage delay, advance attack timers, predict future hits, change cooldown/AI/range/KO behavior, delay HP or damage-number truth, discard F1/F2, or call a180ms visual lag exact synchronization. A presentation-only delay can preserve mechanics, but its visible mismatch needs explicit acceptance. A real windup changes combat timing and needs explicit authority beyond protected-mechanics integration.

## Actual read-only diagnostic (PASS)

Ran existing real Lab/BattleSession code without source edits or simulation stepping, using formal P1 attacker and P2 defender, T0, distance .65, rng()=>.99. Called executeAbility(a1,'basic','ai',e1) directly.

- returned true;
- elapsedSeconds before=0, after=0;
- target HP320 ->313.7;
- one damage event, amount6.299999999999999;
- one cast event, category basic, hit=true;
- Basic cadence0.8695652173913044 seconds;
- pendingHits0, delayedImpacts0;
- approved GIF first F3 contact180ms after action start.

These are diagnostic observations, not a new regression suite or ENGINEERING PASS claim. No production source/runtime/descriptors/public assets changed. No tests/build/CI/Pages/public fingerprint run at this paused checkpoint.

Reproduction, from repository root:

```js
import {createLabConfig} from './src/dev/battleLab/config.js';
import {createLabBattleSession} from './src/dev/battleLab/battleFactory.js';
const s=createLabBattleSession(createLabConfig({allyTeam:['P1','P2','P3'],enemyTeam:['P2','P4','P5']}),{rng:()=>.99});
const a=s.actorById('a1'),e=s.actorById('e1');a.x=0;a.y=0;e.x=.65;e.y=0;
const before=e.hp,time=s.elapsedSeconds;
const executed=s.executeAbility(a,'basic','ai',e);
console.log({executed,timeBefore:time,timeAfter:s.elapsedSeconds,hpBefore:before,hpAfter:e.hp,damage:s.drainDamageEvents(),cast:s.drainCastEvents(),cadence:s.cadence.get('a1'),pending:s.pendingHits.length,delayed:s.delayedImpacts.size});
```

## Next one decision / stop boundary

Ask the player to choose:

- **A — preserve current immediate combat resolution:** keep HP/damage/AI/cadence unchanged; full accepted four-pose visual starts on actual cast, with F3/contact visual180ms after the already-resolved hit. Explicitly accept that visual delay, and cancel deferred visuals safely on KO/interrupt/exit/restart. No false hit on a miss.
- **B — authorize shared actual Basic windup:** introduce a data-driven180ms pre-impact period for this approved P1 action so F3/contact/damage align. This changes combat timing; range revalidation, target/source KO, cancellation, control, pause and cadence semantics require a written design and explicit approval before code. Do not assume unchanged damage coefficients imply unchanged gameplay.

B was subsequently selected at22:18:37+08:00. Preserve all approved art; review the linked written design before implementation planning/code. Selection alone is not an executable-ready contract or runtime PASS. Eventual integration/test/build/CI/Pages/public proof must stop for player iPhone acceptance. No P2–P5 new attack art, Heavy/Special/Awakening, or main merge.
