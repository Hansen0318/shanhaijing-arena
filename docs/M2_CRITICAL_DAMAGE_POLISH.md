# M2 Combat Feedback — Critical Hit / Damage Number Polish

## Status
Authorized by player after M2 player verification and prototype cooldown pacing closure.

This is a final bounded combat-feedback slice before M3. It must not start shard/reward/progression work.

## Goal
Make hits more readable and satisfying while establishing a data-driven, per-ability critical-hit contract that remains compatible with the deterministic/shared combat architecture.

## 1. Ability critical-hit data

Each active Ability Definition may declare:
- `canCrit`: boolean;
- `critChance`: probability in [0, 1];
- `critMultiplier`: positive multiplier, normally >= 1.

Rules:
- Critical capability belongs to the Ability Definition, not to category-wide hard-coded logic.
- Different characters and different abilities may use different values later.
- `canCrit:false` or `critChance:0` means the ability never crits.
- Basic remains automatic; whether a Basic can crit is still ability-data driven.
- Do not infer crit rules from Type, Role, cooldown, or ability category.
- Preserve immutable ability definitions.

Prototype visibility values may be tuned for testing. Initial recommended placeholder values:
- Basic: canCrit true, chance 0.10, multiplier 1.50
- Heavy: canCrit true, chance 0.20, multiplier 1.75
- Special: canCrit true, chance 0.15, multiplier 1.75
- Awakening: canCrit false for the current shared placeholder
These are test values only, not formal character balance.

## 2. Deterministic critical resolution

The combat core must remain reproducible.

- Do not call uncontrolled `Math.random()` from the shared damage resolver.
- Critical rolls must come from an injected/session-owned deterministic random source or an equivalent seeded deterministic mechanism.
- Given the same battle seed/state/input sequence, critical outcomes must be reproducible.
- AI and player casts use the same critical resolution path.
- Tests must be able to force a crit and force a non-crit without timing/flakiness.

## 3. Damage formula boundary

Keep the existing type multiplier / ATK / coefficient / DEF calculation as the base resolved damage contract.

For this slice, apply critical multiplier to the positive resolved damage result after the existing base/type/DEF calculation:
1. compute existing resolved damage;
2. clamp existing minimum-damage rule as today;
3. if the hit is critical, multiply that resolved amount by `critMultiplier`;
4. apply the final amount to HP;
5. emit the exact final resolved amount in the damage event.

Do not change the Power > Speed > Blast triangle or DEF/type rules.

## 4. Damage-event contract

A real successful damage event must expose at least:
- actorId;
- targetId;
- category;
- source;
- final resolved `amount`;
- target position;
- `critical`: boolean.

Miss / air-cast / invalid target / zero-damage events must not emit a fake damage number or fake critical result.

## 5. Damage-number presentation

Keep floating combat text short-lived, mobile readable, and presentation-only.

Normal hits:
- continue to display the exact resolved amount;
- retain upward drift + fade;
- retain small positional staggering for rapid hits;
- vary emphasis modestly by ability category so heavier skills feel stronger:
  - Basic: smallest;
  - Heavy: stronger;
  - Special: stronger again;
  - Awakening: strongest normal-hit treatment.

Critical hits:
- clearly stronger than the same category's normal hit;
- larger number;
- high-contrast warm highlight;
- stronger but brief scale/pop;
- show `CRITICAL!` or `CRIT!` adjacent/above the number;
- remain around roughly 0.9–1.2s total; do not leave persistent screen clutter.

Do not create a full combo system, hit counter, screen shake system, or formal VFX package in this slice.

## 6. Pause / restart / cleanup
- Floating normal/critical text uses the existing battle presentation clock and freezes with Pause/orientation interruption.
- Restart / Retry / scene shutdown must clean all active damage/critical text.
- A restarted battle gets a fresh deterministic RNG state according to the chosen session-seed contract.
- No critical state leaks across battle sessions.

## 7. Protected baseline
Do not regress:
- M0/M1/M2 player-verified flows;
- Team Select / filters / roster ownership/persistence;
- 3/5/10 current placeholder H/S/A cooldown pacing;
- cooldown-aware AI spacing;
- fixed Arena / input / joystick / skill controls;
- A1/A2/A3 runtime slots and slot2-front formation;
- Pause / CONTINUE / RESTART / EXIT / orientation gate;
- 90s results;
- type triangle;
- shared AI/player ability path.

## 8. Out of scope
- M3 shards/rewards/unlocks;
- M4 Tier;
- formal art/animation/audio;
- character-specific final balance;
- full crit stat system on characters/equipment;
- crit resistance;
- combo/hit counter;
- screen shake/camera shake;
- gacha/economy/PvP;
- TD gameplay rules.

## 9. Acceptance
Engineering acceptance requires:
1. per-ability crit fields validate and remain immutable;
2. forced crit/non-crit deterministic tests pass;
3. same seed + same input reproduces same crit sequence;
4. AI/player share the same crit path;
5. critical final damage equals existing resolved base damage × ability crit multiplier;
6. non-crit damage remains unchanged;
7. type/DEF rules remain unchanged;
8. real damage event carries exact amount + critical flag;
9. normal and critical floating text render distinctly;
10. miss/no-damage never renders damage/CRITICAL text;
11. Pause freezes and Restart/scene shutdown cleans text/state;
12. targeted + impacted regression + build + Pages deploy pass.

## 10. Player smoke
After engineering PASS, player only needs to observe:
1. several normal hits: numbers remain readable and disappear quickly;
2. wait for a few criticals: CRITICAL treatment is clearly stronger but not obstructive;
3. confirm Heavy/Special/Awakening normal hits visually feel progressively stronger;
4. Pause/Restart once to confirm floating text does not remain stuck.

Stop after this slice. Do not begin M3 automatically.

## Implementation plan / recovery ledger
Execution follows the authorized four checkpoints on the existing branch/PR; no new approval or alternate implementation.
- [x] 1. `ability.js`: validate immutable optional crit fields (defaults false/0/1); `seededRandom.js`: uint32 seed → isolated reproducible [0,1) rolls. RED7/7 → GREEN21/21 with ability regression; diff PASS.
- [x] 2. `combatResolver.js`: shared structured damage result with legacy numeric wrapper; `battleSession.js`: session-owned RNG + boolean event flag. Runtime prototype data enables crit; headless fixture remains no-crit. New critical tests11/11, combined core impacted88/88 PASS; checkpoint1 remote `9c696717deedeb733824934b2b129066af17d680`.
- [x] 3. `damageNumbers.js`: category emphasis, critical label/pop, owned tween/text cleanup using existing presentation clock. RED5 failures → GREEN26/26 presentation/lifecycle; checkpoint2 remote `ea7bf1db2e09fead0cfa2f3a547a602efa20b6b1`.
- [ ] 4. Targeted + impacted regression, `npm run check`, build/diff review, fresh whole-diff reviewer, Pages deploy + minimum changed-surface public smoke, final recovery docs.

Interface review: task1 definition fields + RNG feed task2; task2 `{amount,critical}` damage events feed task3; all use one shared resolver. No conflicting interfaces.
Review focus: overkill amount vs HP clamp; miss/no-damage roll consumption; different ability settings in the same category; critical label/tween cleanup during interruptions; fresh Restart seed with same team/stage.
Ruling: preserve canonical overkill event amount (final resolver value, not remaining-HP delta) and integer display rounding; no existing damage rule changes. Fresh sessions use the same documented default seed unless explicitly configured. No-crit canonical headless fixture remains independent of runtime visibility tuning.
Current: checkpoint1 complete; resolver/event tests next. Active branch `feat/m0-combat-core-20260927`, PR#1. Default seed `0x5348414e`; generator Mulberry32. No global/time random state.
Integration: checkpoints1 `9c696717deedeb733824934b2b129066af17d680`,2 `ea7bf1db2e09fead0cfa2f3a547a602efa20b6b1`,3 `238cd00bb459f95cf84415aba8be5318e28a79dc`. Targeted31/31; impacted168/168; full check227/227; build/diff PASS. Independent review + final Pages/public engineering smoke still pending. Known limitations: prototype visibility tuning only; integer display rounding and overkill unchanged; default seed intentionally repeats on fresh rounds; real iPhone readability/player smoke pending.
