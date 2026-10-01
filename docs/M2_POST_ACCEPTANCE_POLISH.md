# M2 Post-Acceptance Combat / Presentation Polish

## Status
AI checkpoint: cooldown preparation integrated with 1.5s tunable window, skill/target commitment and range hysteresis. Targeted AI/Ability/BattleSession tests 67/67 PASS. Remaining: damage numbers, VS/type, integration/deploy. Exact next action: implement real resolved-damage presentation events.

Authorized after player acceptance of M2 Team Select on 2026-10-01.

This is one bounded pre-M3 polish batch. It is not M3 and must preserve the player-verified M0/M1/M2 architecture.

## Goal
Improve battle readability, spacing, impact, and pre-battle information without changing progression/economy scope.

## 1. Cooldown-aware AI spacing

### Problem
When Heavy / Special / Awakening are unavailable, AI currently tends to keep closing for Basic attacks. Multiple actors can collapse into one close-range pile, reducing visual readability and impact.

### Required behavior
- Preserve the existing shared AI/player combat systems and automatic Basic attack.
- AI may identify a higher-priority active skill that is approaching readiness.
- While that selected skill is within a short configurable preparation window, AI may reposition toward that skill's declared preferred/effective range instead of continuing to close to the current Basic engage distance.
- When the prepared skill becomes ready and target/range conditions are valid, AI should cast through the existing shared ability execution path.
- If no useful skill is nearing readiness, retain the existing Basic pursuit behavior.
- Use declarative ability range/cooldown data where practical; do not hard-code character IDs.

### First-pass tuning
Exact timing values are engineering-tunable, not product-locked constants. Start with a conservative short window roughly in the 1–2 second class for Heavy-like skills and scale only where needed for longer-cooldown skills.

### Anti-jitter requirements
- Do not switch preparation target every simulation frame.
- Do not cause repeated forward/back oscillation around a range threshold.
- Use hysteresis/state commitment/minimum hold time or an equivalently bounded method.
- Tank/close-range characters must not all retreat excessively; repositioning should be proportional to the prepared skill's actual range needs.
- KO, invalid target, manual player override, Pause, countdown, bounds, and battle-end rules remain authoritative.

### Acceptance
- In an unattended 3v3 battle, actors no longer spend long periods as one permanent near-overlapping Basic-attack cluster solely because active skills are cooling down.
- At least some near-ready ranged/mid-range skill cases visibly create spacing before cast.
- AI still attacks instead of idling when no useful preparation is available.
- No oscillation/chattering regression.

## 2. Floating damage numbers

### Required behavior
- Every successful damage application may emit a presentation event with resolved damage amount and target position/identity.
- Render a short-lived floating number near the damaged target.
- Mobile-first readability: bold/high-contrast text with outline/shadow as needed.
- Default lifetime approximately 0.8–1.2 seconds, with slight upward drift and fade.
- Rapid hits on the same target should use small positional offsets/staggering so values remain distinguishable.
- Do not alter the resolved damage value or combat math for presentation.
- Heavy/Special/Awakening or unusually large hits may use a stronger scale/emphasis, but keep first implementation simple and non-obstructive.
- Damage numbers must pause/freeze consistently with the existing Pause/orientation interruption model and clean up on scene end/restart.

### Acceptance
- A successful hit visibly produces the exact resolved integer/rounded presentation amount used by combat.
- Miss/invalid/out-of-range/no-damage events do not fabricate damage numbers.
- Several simultaneous hits remain readable and do not permanently obscure the Arena.

## 3. VS-style Team Select presentation

### Purpose
Keep the existing M2 roster/team contracts but make the pre-battle screen communicate both sides of the matchup.

### Required layout/information
- Preserve M2 flow: Stage Preview → START → Team Select → BATTLE.
- Team Select shows the player's selected three on the left/ally side.
- The current stage's three enemy definitions are visible on the right/enemy side.
- A central VS / matchup treatment may visually separate the sides.
- Existing owned roster selection remains available and remains the source for the allied three.
- Exactly three unique eligible owned allied characters are still required.
- BACK returns to the same Stage Preview.
- BATTLE launches the exact three selected definitions into runtime slots A1/A2/A3; slot 2 remains the front formation slot.
- Enemy preview must come from the same stage/config data used by battle launch so the preview cannot disagree with the actual encounter.
- Use current placeholder portraits/cards only. No formal 3D/full-body character art requirement.

### Acceptance
- Before entering battle, the player can clearly see allied three vs actual stage enemy three.
- Swapping an ally updates the left-side matchup immediately without mutating enemy data.
- Actual battle identities match both sides shown before launch.

## 4. Power / Speed / Blast type icons

### Required behavior
- Define one small replaceable placeholder icon/mark for each existing type: Power, Speed, Blast.
- Show the type mark adjacent to character identity/name in the VS Team Select presentation for both allies and enemies.
- Where low-risk and readable, reuse the same type mark in battle portrait identity presentation; do not change HUD geometry if doing so would destabilize the verified mobile layout.
- Icon data must derive from the immutable character definition type.
- Do not add a new type system or conflate Type with Role/Tier/rarity.
- Existing combat triangle remains unchanged: Power > Speed > Blast > Power.

### Acceptance
- Every previewed ally/enemy has the correct type mark.
- Changing selected characters updates the displayed type correctly.
- Type icons are presentation-only and do not alter damage rules.

## Protected baseline / forbidden scope
Do not change unless strictly required by the four items above:
- M2 ownership/catalog/team persistence contracts;
- immutable character definitions vs mutable progression ownership;
- A1/A2/A3 as runtime slots, not permanent character identities;
- one-front-two-back formation with slot 2 front;
- Campaign unlock/persistence/result routing;
- 1120x540 fixed landscape Arena and current Phaser.Scale.NONE/input mapping architecture;
- manual input immediate override and 0s AI return on release;
- 90-second battle/result/type-counter rules;
- Pause/orientation gate behavior.

Forbidden in this slice:
- M3 rewards/shards/character acquisition;
- M4 Tier/Collection progression;
- formal character art/animation/audio;
- economy/gacha/PvP;
- any shanhaijing-td gameplay contract.

## Chat / Work division
Chat has completed:
- player-feedback interpretation;
- product behavior decisions;
- scope boundary;
- acceptance criteria;
- GitHub state/handoff documentation.

Work owns only:
- recover existing active branch/checkpoint;
- implement the four items as the smallest coherent multi-file delta;
- add/update deterministic tests for AI preparation logic, damage-event correctness, Team Select enemy-preview identity, and type-icon mapping;
- run targeted tests first, then impacted regression appropriate to touched shared AI/battle/view surfaces;
- build and deploy when engineering checks pass;
- update WORK_PROGRESS.md / docs/STATE.md / this document with exact checkpoint SHAs, actual tests, known limitations, and next player-smoke step;
- checkpoint/push before long runtime/browser verification or if interruption risk rises.

## Player smoke after engineering PASS
Keep it short:
1. Enter Team Select and confirm selected allied 3 vs actual enemy 3 and correct type marks.
2. Start battle and observe several AI skill cycles: characters should visibly create some spacing before suitable near-ready skills instead of remaining a single permanent pile.
3. Confirm damage numbers appear on real hits, are readable, and disappear quickly.
4. Confirm joystick/skill controls, Retry/Exit, and orientation behavior still feel normal.

Stop after this slice. Do not start M3 automatically.

## Polish damage checkpoint (2026-10-01)
- AI checkpoint remote: `e83dd34b738b7dcd7561e872e9e88da32d284b56`.
- Real resolved-damage events and 1s outlined floating numbers integrated; air/invalid/KO hits excluded, rapid hits offset, same tween pause clock, shutdown cleanup.
- Damage + Pause/tween targeted tests 13/13 PASS; earlier BattleSession impacted tests PASS.
- Remaining: VS/type and integration/deploy. Exact next action: shared encounter definition lookup and VS view.

## Polish VS/type checkpoint (2026-10-01)
- Damage checkpoint remote: `30c6419e61c6de8594515af418b611fa49f8e54c`.
- VS ally/enemy placeholders; preview and battle share immutable encounter definition lookup. Power/Speed/Blast replaceable marks derive from definition type. Battle HUD geometry unchanged.
- Roster/team/VS impacted tests 26/26 PASS.
- Remaining: whole-diff review, targeted/impacted checks, build/deploy and minimum public runtime smoke. Exact next action: inspect integrated diff and verify impacted surfaces.
