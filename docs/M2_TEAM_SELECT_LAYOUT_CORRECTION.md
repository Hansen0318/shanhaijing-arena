# M2 Team Select Layout / Roster Filter / Battle Restart Correction

## Checkpoint evidence
- Checkpoint 1: viewport-row layout and clean upper matchup implemented. View/flow/encounter targeted 6/6, diff PASS; runtime geometry still pending.
- Next: compact bench + display filter, then shared Restart; no M3.

## Status
Authorized from player real-device feedback after the first M2 post-acceptance polish deployment.

This is a bounded UI / flow correction before M3. It does not reopen M0/M1/M2 core work and must preserve the current AI-spacing, floating-damage, roster, campaign, input, and persistence baselines.

## Player feedback / problem
- Current Team Select content is too large on iPhone landscape and requires vertical scrolling to reach BATTLE.
- The lower roster cards are oversized for their purpose.
- The upper ally/enemy matchup area should stay visually cleaner; future production art may show larger standing character previews with light idle motion, but no formal art/animation is authorized now.
- Type icons are wanted in the lower roster/bench, not on the upper matchup cards.
- The roster should be filterable by character Type while team composition remains unrestricted.
- Battle X menu should add RESTART between CONTINUE and EXIT.

## A. Single-screen Team Select
- Team Select must fit in one mobile-landscape viewport without requiring vertical scroll to reach BATTLE.
- BACK, title/stage, upper matchup preview, lower roster bench, selection state, and BATTLE must remain visible/usable in one screen.
- Prefer reducing roster-card size, padding, spacing, and vertical footprint over introducing scrolling.
- Preserve Stage Preview → START → Team Select → BATTLE, exact-three guard, BACK, saved recent team, ownership, restrictions, and persistence.

## B. Upper matchup presentation
- Keep ally three vs actual stage enemy three with central VS treatment.
- Preserve slot identity: ally slot 1 / slot 2 front / slot 3 and enemy E1 / E2 front / E3.
- Remove type icons from upper ally/enemy matchup cards.
- Keep upper cards visually simple and structurally replaceable by future production character standing previews / subtle idle presentation.
- Do not create formal art or formal animation in this slice.
- Enemy preview must still come from the same encounter/stage data used for battle launch.

## C. Lower roster / bench
- Shrink bench entries to compact square-icon-style cards, closer in scale to battle portrait cards than the current large information panels.
- Keep only information needed for selection; detailed Type/Role prose may be reduced or removed if needed for single-screen layout.
- Type mark remains on roster/bench entries.
- Selected/unselected/disabled states must stay clear and touch-friendly.

## D. Type filter tabs
- Add roster filter tabs for Power, Speed, Blast; an All tab is optional if useful.
- Tab label may use type icon + type name.
- Tabs are display filters only, never team-composition restrictions.
- Team composition remains unrestricted by type: three same-type characters are valid if ownership/eligibility/uniqueness rules allow them.
- Switching filters must not clear or reorder the already selected team.
- Existing exact-three, duplicate guard, restrictions, recent-team restore, and persistence remain authoritative.

## E. Battle X menu RESTART
- Existing battle interruption/exit overlay becomes three actions:
  - left: CONTINUE
  - center: RESTART
  - right: EXIT
- CONTINUE resumes the current round.
- RESTART restarts the current stage battle with the same selected team, full HP, reset cooldown/runtime state, fresh countdown, and original formation/spawn. It must not return to Team Select or Stage Preview.
- EXIT keeps the current unfinished-exit semantics and must not award completion/unlock/rewards.
- Pause/orientation interruption reasons must remain correct.

## Protected baseline
Do not regress:
- M2 catalog / ownership / team persistence;
- immutable definitions vs mutable ownership separation;
- A1/A2/A3 runtime slots and slot 2 front formation;
- Campaign result/unlock/persistence/navigation;
- 1120x540 fixed landscape Arena / Phaser.Scale.NONE / existing pointer mapping;
- joystick, skills, ally selection, immediate manual override, 0s AI return;
- current cooldown-aware AI spacing and floating damage numbers;
- Pause / orientation gate / Retry / Exit / Next / BACK;
- 90s Victory / Defeat / Draw and type-counter rules.

## Not in scope
- M3 rewards/shards/character unlock;
- M4 Tier/Collection;
- formal character art;
- formal idle animation;
- audio;
- new balance pass;
- battle HUD type icons;
- economy/gacha/PvP;
- shanhaijing-td gameplay contracts.

## Verification
Use risk-based verification.
At minimum establish:
1. Team Select fits target mobile landscape without vertical scroll and BATTLE is visible.
2. exact-three select/remove/replace/recent-team/persistence still work.
3. filter switching preserves selected team.
4. three same-type allies can be selected when otherwise eligible.
5. enemy preview still matches actual battle enemies.
6. CONTINUE resumes, RESTART resets same-team same-stage round, EXIT remains unfinished exit.
7. impacted Team Select/navigation/pause/orientation/persistence tests pass.
8. build/deploy pass.

## Recovery / Work rule
Create pushed checkpoints for:
1. no-scroll layout;
2. compact bench + filters;
3. restart menu;
4. integration/verification/deploy.

Update WORK_PROGRESS.md, docs/STATE.md, and this file with exact checkpoint SHAs, actual tests, known limitations, and next player-smoke step. Stop before M3.
