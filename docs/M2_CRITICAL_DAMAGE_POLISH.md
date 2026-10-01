# M2 Combat Feedback — Critical Hit / Damage Number Polish

## Status
Latest correction: **ENGINEERING PASS / iPhone PLAYER SMOKE PENDING**. Normal32/36/40/44px; crit1.25×; CRITICAL! another6px larger.80ms yoyo pop, fade begins120ms after spawn; total840–1040ms, no x/y tween. Roster1.8/runtime enemy1.6; headless4/3.5 unchanged. Targeted17/17, impacted battle/AI98/98, check230/230, build/diff PASS. No crit/RNG/resolver/cooldown/input/AI/progression edits.
Final implementation/deployed source `9ad74e6f9b93a85451f9cf09552243530274f35a`; [Actions#265 /36865286592](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36865286592) Test/Build/Pages Deploy success. Public `index-CI9O6wHr.js` matches local build; Chapter Select renders after reload. No unnecessary historical Campaign browser replay. Bounded whole-diff review confirms only3 production files (damageNumbers, roster catalog, runtime enemy data) changed; shared protected systems untouched. No known engineering failures; existing build advisory unchanged.
Recovery baseline `7428d34661df2b453b83d9f777519e830380b682`, Actions#263 success. Tests RED6 contract failures before implementation; stale Restart pop count1→3 corrected for all three text objects. Latest closure after deployed source is docs only [skip ci]. Prototype pacing/readability are not formal balance or device acceptance. Exact next: six-point player smoke at end of this document; STOP before M3.

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
- brief pop then fade in place, with no upward tween translation;
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
- show `CRITICAL!` above the number, larger than the critical number itself;
- remain around roughly 0.8–1.1s total; do not leave persistent screen clutter.

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
- [x] 4. Targeted31/31 + impacted168/168, `npm run check`227/227, build/diff PASS, fresh whole-diff reviewer (30/30 independently, no findings), Pages deploy#260 PASS + minimum changed-surface public smoke. Final recovery docs recorded below.

Interface review: task1 definition fields + RNG feed task2; task2 `{amount,critical}` damage events feed task3; all use one shared resolver. No conflicting interfaces.
Review focus: overkill amount vs HP clamp; miss/no-damage roll consumption; different ability settings in the same category; critical label/tween cleanup during interruptions; fresh Restart seed with same team/stage.
Ruling: preserve canonical overkill event amount (final resolver value, not remaining-HP delta) and integer display rounding; no existing damage rule changes. Fresh sessions use the same documented default seed unless explicitly configured. No-crit canonical headless fixture remains independent of runtime visibility tuning.
Current: all four checkpoints complete. Active branch `feat/m0-combat-core-20260927`, PR#1 (open, not merged). Default seed `0x5348414e`; generator Mulberry32. No global/time random state.

## Final release evidence
- Recovery baseline `07416754954be1f337f929bfb0f133cbf96fb033`; no reimplementation of accepted M0/M1/M2/layout/filter/Restart/pacing.
- Checkpoint1 `9c696717deedeb733824934b2b129066af17d680`; checkpoint2 `ea7bf1db2e09fead0cfa2f3a547a602efa20b6b1`; checkpoint3 `238cd00bb459f95cf84415aba8be5318e28a79dc`; checkpoint4 / final deployed source `80054aea902a3bc48a726509ca3f70aa9897b397`.
- Local final targeted31/31: criticalDefinition, criticalDamage, criticalPresentation, damageEvents, damageNumbers, battleTweenPause. Impacted168/168: ability/AI/preparation/session/headless/character/type/target/control/battle rules/runtime/pause/Restart/countdown/Campaign/team/input/VFX surfaces. Full `npm run check`227/227. No failures/skips.
- Vite production build PASS; public JS `index-CTo9sRxy.js` equals local + CI bundle. Whole-diff whitespace + source review PASS. Existing large-Phaser bundle and environment npm proxy advisories remain non-blocking; no dependency changes.
- Actions [#260 / 36861577213](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36861577213): CI Test227/227, Build, Configure/Upload Pages and Deploy Pages all success. Earlier checkpoint Actions#257/#258/#259 also success.
- Public URL https://hansen0318.github.io/shanhaijing-arena/ . Actual changed-surface engineering smoke: Chapter1 → 1-1 Preview → Team Select P1/P3/P5 → BATTLE, selected portraits and full HP, countdown; Pause/Resume state changes; X → RESTART closes menu and creates fresh same-team Arena. Page-origin runtime errors none; repeated Chrome-extension metadata errors are external.
- Public cloud smoke additionally observed real resolved floating numbers and HP/CD changes at01:26/01:25; Pause retained the same text positions/opacity/timer across observations. Restart from this damaged/KO paused round returns full HP,01:30/countdown and clears old numbers. Critical-specific styling/pop and pause/cleanup are established by deterministic tests with real Phaser TweenManager; no live crit/iPhone readability claim or full historical replay. Cloud clock initially progressed slowly. Screenshot proof is deployed normal-damage/Pause and fresh Arena evidence only.
- Independent fresh reviewer: no Critical/Important/Minor findings; independently30/30 relevant tests, additional differing same-category Heavy settings and overkill probes PASS. Declined-to-judge items ruled as player-owned real-device readability, separate completed deploy evidence, and out-of-scope formal balance/M3. No deferred source issues.
- Known limitations: prototype values only; display rounds integer while combat/events keep exact final amount including overkill; fresh sessions intentionally repeat the default crit sequence; injected RNG reset is caller-owned (runtime factories use fresh seeded RNG). No formal art/VFX/audio/global crit stats or progression.
- Next exact action: player checks normal numbers short-lived/not obstructive; Heavy/Special stronger than Basic; occasional larger warm CRIT! distinguishable; Pause/Restart no stuck/old texts. STOP until player reports acceptance. Do not start M3.
- Public evidence: `docs/verification/m2-critical-public-damage.jpg` (normal floating numbers frozen at01:25), `docs/verification/m2-critical-public-reset.jpg` (same team full HP/countdown, prior numbers absent).


## Player correction — text presentation and prototype movement pacing

Player tested the deployed critical/damage-number slice and requested one bounded readability/feel correction before acceptance.

### A. Damage-number presentation
Replace the current upward-drift/evaporation feel.

Required:
- increase normal damage-number size from the current prototype treatment;
- critical damage number must be larger than the corresponding normal hit;
- the `CRITICAL!` label must be larger than the critical damage number itself;
- on spawn, use a brief flash/pop emphasis;
- after that, hold essentially at the impact position and fade out;
- do **not** translate upward during lifetime;
- keep rapid-hit positional staggering so simultaneous hits remain separable;
- keep total lifetime short and mobile-readable;
- preserve Pause/orientation freeze and Restart/shutdown cleanup.

Intent:
- impact should feel like a quick flash at the hit point;
- avoid the current rising/evaporating text motion.

### B. Character movement-speed contract
`moveSpeed` is character-definition data and remains per-character.

Future formal characters may have different movement speeds.

For the current prototype only, increase test pacing:
- owned prototype roster P1–P5: `moveSpeed 1.4 -> 1.8`;
- runtime placeholder enemy: `moveSpeed 1.2 -> 1.6`.

These are test pacing values only, not formal balance.
Do not change the canonical deterministic headless fixture unless a test explicitly depends on runtime fixture values.

### C. Protected
Do not change:
- crit probability/multipliers;
- 3/5/10 skill cooldowns;
- AI spacing rules;
- attack speed;
- arena bounds;
- joystick/input;
- combat formulas;
- M3 progression.

### D. Verification
- targeted damage-number presentation tests;
- runtime/roster movement-speed contract tests;
- impacted battle/AI/input regression only as needed;
- build + Pages deploy;
- update GitHub handoff evidence.

Player smoke after deploy:
1. normal damage number visibly larger;
2. critical number larger than normal;
3. `CRITICAL!` visibly larger than the critical number;
4. text flashes/pops and fades in place, with no upward drift;
5. movement feels faster for both sides;
6. Pause/Restart leaves no stuck text.
