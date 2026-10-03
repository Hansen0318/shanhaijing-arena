# M6C-B Tier Power Curve Implementation Plan

Native execution with executing-plans; user authorized automatic coherent A–E and independent final review. Spec: M6C_B_TIER_POWER_CURVE.md and latest user exact table.

Goal: one immutable T0-relative power projection, weighted per definition, shared by AI/player/session/Lab without progression writes.
Architecture: pure tierScaling.js owns curve/weights/caps; tierEffects projection resolves per-actor stats, abilities and mechanics once at setup; BattleSession consumes actor-owned projection throughout. Telegraph geometry remains hit authority. Lab imports only pure summary data.
Tech: current JavaScript/Node/Vite/Phaser; no dependencies. Keep active feature/PR1 per AGENTS13A.

Review focus: same character on opposite sides at different Tier; heal double scaling from scaled recipient HP; residual coefficient double scaling; warning vs area mismatch; KO/Retry/clock/progression isolation.

## A — curve/profile contract
- [x] RED tests/tierScaling.test.js canonical exact cumulative rows, fifteen weights interpolation/default/invalid/immutability/future definition.
- [x] Implement src/combat/tierScaling.js createTierScalingProfile(input), resolveTierScaling(tier,profile), resolveTierStats(definition,scales). Default weights1; zero weight=identity; unknown weights rejected.
- [x] GREEN targeted, progress/state ledger, commit/push.
## B — HP/output/tempo
- [x] RED tests/tierPowerRuntime.test.js independent actor Tier HP ratios, DEF base, damage/heal one scale, cooldown/windup floors, Basic cadence and movement.
- [x] Add initialization-only combat maxHP projection to CharacterState; per-actor definition map/method in BattleSession, preserve base catalog for presentation. Resolver damage uses base ATK/coefficient→Tier→mechanic→Type/DEF→crit→incoming status. Heal uses recipient base HP→caster healing→mechanic→clamp.
- [x] Resolve H/S/A cooldown floor.75s, Basic cadence floor.25s, opt-in windup floor300ms and total dodgeable350ms. Projectile travel unchanged. Existing definitions immutable.
- [x] GREEN targeted/impacted, ledger, commit/push.
## C — geometry/status
- [x] RED tests/tierPowerGeometry.test.js exact range/min/preferred, AoE/mobility/status opt-in/caps, warnings/AI bands, persistent magnitude-only and existing M6C mechanic compatibility.
- [x] Resolve global geometry then existing mechanic gains. Shared statuses opt-in duration/strength; control max.5s, avoidance max.4s, steadfast max1s, mitigation max.5. AoE max6, support range max20, skill displacement max4 arena units. Persistent duration/interval unchanged; magnitude scale applied once at pulse.
- [x] GREEN targeted/impacted, ledger, commit/push.
## D — profiles/Lab
- [x] RED tests/tierPowerProfiles.test.js five immutable validation profiles, future full default, same-team/enemy/seed/scenario comparison and Lab-only summaries.
- [x] Add src/roster/tierScalingProfiles.js data and catalog references; Lab-only table from pure projection, refresh on team/Tier/baseline changes. No runtime preload or formal HUD change.
- [x] GREEN targeted/impacted, ledger, commit/push.
## E — release
- [x] Targeted, impacted/full relevant suite, deterministic/performance fixtures, build and bundle check, independent review/fixes.
- [x] Release push, exact Actions/Pages/source/public Lab+normal URL verify; close progress/state/spec/verification evidence.
- [ ] Player focused T0/T1/T2/T3 comparison then STOP. No final art/audio/Chapter2/new progression.

Pre-flight A→B/C/D: scales object has fifteen named multiplier fields, profile validation is pure. B/C share resolveTierAbilities(projection,definitions), apply exactly once from immutable base; no character-ID branches. D consumes projection without Phaser. Existing Tier mechanics retained cumulatively.

Ruling: latest explicit user checkpoint C includes range/AoE/status; use that split over older doc C title. Health-ratio init is at session setup only. Heals scale target T0 maxHP (not scaled maxHP) to avoid double growth. Safety seeds listed above are bounded first-playtest choices; phone readability/balance remains player-owned.

B: complete, targeted56/56; impacted134/134. Existing Tier-kit fixture uses matched enemy Tier to preserve surviving targets, heal expected target T0HP×3.2. Joystick test refreshes active input at each step, preserving 0s release rule.

C: complete, targeted17/17/impacted165/165. Shared M6B tactics untouched; profile preferred bands and target scoring consume projected geometry. Existing generic status/area engine unchanged except metadata validation. Residual coefficient remains T0; power scale at resolver only, interval/count/duration unchanged.

D complete: targeted47/47/full564/564. Supplemental shared-HUD ring defect proved RED angle4.52 instead2π, fixed to actor-resolved definition then GREEN. No visual asset pipeline files changed.

E engineering complete: targeted28/28, impacted221/221, full570/570/build/diff PASS; three independent findings reproduced RED→GREEN. Range opt-out feeds AI; delayed Basic cadence starts at cast; growth caps preserve base geometry. Twelve deterministic fixtures bounded. Release Actions/Pages/public verified; closure complete. Player comparison remains pending.
