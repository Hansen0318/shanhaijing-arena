# M3 — Shard / Reward / Character Unlock Loop

## Status
**AUTHORIZED / CHAT SPEC COMPLETE / IMPLEMENTATION PENDING**

M2 combat-feedback, movement pacing and impact-text corrections are player accepted. M3 may now begin.

This milestone establishes the minimum persistent acquisition loop required before M4 Tier / Collection work.

## Goal
Connect Campaign victories to visible, persistent roster growth:

Stage Preview
→ see configured character-shard reward
→ Team Select
→ Battle
→ Victory
→ receive configured shard reward
→ persist shard inventory
→ reach unlock threshold
→ character ownership updates
→ newly owned character becomes selectable in existing M2 Team Select

No full economy, shop, gacha, Tier upgrading or formal character content in M3.

## 1. Ownership model

Character definitions remain immutable catalog data.

Player ownership must become progression-derived state.

M3 must stop treating all catalog entries as automatically owned in normal Campaign play.

Prototype engineering baseline:
- initially owned: P1, P2, P3
- initially locked: P4, P5
- dev/unlock-all modes may still expose all prototype characters for engineering use

Ownership contract:
- owned character IDs are stored/derived from player progression data;
- battle slot IDs A1/A2/A3 remain runtime slots only;
- unlocking a character must not mutate the character definition;
- Team Select consumes current ownership each time it opens;
- stale saved teams containing a now-unowned/invalid ID must continue to sanitize safely.

## 2. Shard inventory

Add persistent shard inventory outside combat state.

Minimum logical shape:

```
shardsByCharacterId: {
  P4: 0,
  P5: 0
}
```

Requirements:
- keyed by stable character definition ID;
- nonnegative integer counts;
- unknown IDs ignored/sanitized;
- malformed/obsolete storage recovers safely;
- denied storage degrades safely to in-memory behavior;
- shards are not battle actor state and are never stored on A1/A2/A3.

Unlock threshold for M3:
- 5 shards unlock the character.

On unlock:
- character is added to ownership;
- shard count remains recorded; do not silently delete/reset it;
- M4 will later decide how post-unlock shards are spent for Tier progression.

## 3. Reward definition

Stage reward metadata must be data-driven.

Minimum shard reward shape:

```
reward: {
  items: [
    {
      type: 'characterShard',
      characterId: 'P4',
      quantity: 2,
      repeat: 'firstClear' | 'repeatable'
    }
  ]
}
```

Rules:
- reward metadata belongs to stage config;
- no hard-coded `if stageId === ...` reward logic in controller/view;
- one stage may support multiple reward items later even if prototype uses one;
- quantity must be positive integer;
- unknown character reward IDs must fail validation or be safely excluded according to chosen data-validation boundary;
- reward presentation reads the same stage reward definition used by grant logic.

## 4. Prototype Chapter 1 engineering fixture

Placeholder only; not formal content/balance.

Use Chapter 1 to exercise both first-clear and repeatable paths:

- 1-1: P4 shard ×2, firstClear
- 1-2: P4 shard ×2, firstClear
- 1-3: P4 shard ×1, firstClear
  - after normal first-clear progression through 1-1→1-3, P4 reaches 5 and unlocks
- 1-4: P5 shard ×1, repeatable
- 1-5: P5 shard ×3, firstClear
  - first pass through 1-4/1-5 yields 4 total P5 shards
  - one replay victory on 1-4 yields the fifth shard and unlocks P5

Chapters 2–6 may remain placeholder/no-shard unless an engineering test needs reward metadata.

This fixture exists to test:
- multi-stage accumulation;
- first-clear non-duplication;
- repeatable farming;
- unlock at exact threshold;
- newly owned roster availability.

## 5. Stage Preview reward presentation

Current Stage Preview must visibly explain configured rewards before START.

Minimum presentation:
- reward section near stage details;
- character placeholder identity / portrait token;
- text such as `P4 Shard ×2`;
- clear label:
  - `FIRST CLEAR`
  - or `REPEATABLE`

For a cleared first-clear-only stage:
- keep the reward visible for historical clarity;
- visually mark it already claimed / `CLAIMED`;
- do not imply it will drop again.

For repeatable reward:
- keep normal obtainable presentation on replay.

Do not introduce formal reward art.

## 6. Victory grant timing

Rewards are granted only when a valid battle transitions to result with `victory`.

Do not grant on:
- defeat;
- draw;
- unfinished Exit;
- Restart;
- Retry start;
- opening Result twice / duplicate callback;
- page rerender.

Granting must be idempotent for first-clear rewards.

For repeatable rewards:
- each completed replay Victory grants the configured quantity exactly once for that battle completion.

Campaign stage unlock and reward grant may happen in the same victory transaction/flow, but reward persistence remains logically separate from combat state.

## 7. Result presentation

Victory Result should expose what was earned in that completed battle.

Minimum:
- `P4 Shard +2`
- updated count, e.g. `2 / 5`

If threshold is reached during that victory:
- clearly show an unlock message, e.g. `P4 UNLOCKED`;
- ownership must already be updated before the player next enters Team Select.

If no shard reward was granted:
- no fake reward row.

Defeat/Draw Result:
- no shard reward presentation.

Restart / unfinished Exit:
- no reward presentation.

Do not build a separate reward-claim button in M3; grant is automatic on valid Victory.

## 8. Persistence and migration

Prefer a dedicated versioned progression/acquisition save boundary rather than mixing shard data into combat session state.

Acceptable design:
- extend existing versioned Campaign persistence carefully, or
- create a dedicated acquisition persistence module.

Whichever is used must preserve:
- existing stage/chapter clear progress;
- existing valid team persistence;
- safe migration from users who already have the M1/M2 save with no shard data.

Migration expectation for existing player saves:
- existing Campaign clear state remains intact;
- initialize M3 acquisition state without corrupting progression;
- prototype initial ownership should resolve predictably for pre-M3 saves.

Do not silently wipe localStorage as the implementation strategy.

## 9. Team Select integration

When ownership changes:
- newly unlocked P4/P5 appears in lower roster/bench on next Team Select render/open;
- existing ALL/Power/Speed/Blast filters continue working;
- exact-three unique rule unchanged;
- selected/saved team validation remains ownership-aware;
- no locked character can be manually selected.

Optional lightweight locked-character preview is out of scope unless implementation is trivial and does not disturb M2 layout. M3 only requires owned characters to become selectable after unlock.

## 10. Reward transaction result

Controller/progression logic should expose an explicit result object rather than forcing UI to reconstruct state from storage.

Recommended semantic output:

```
{
  grantedItems: [...],
  unlockedCharacterIds: [...],
  shardCounts: {...}
}
```

The exact internal API may differ, but UI must consume authoritative grant results, not infer unlock by comparing DOM text.

## 11. Protected baseline

Do not regress:
- M0/M1/M2 player-verified flow;
- fixed 1120×540 Arena / Phaser.Scale.NONE;
- joystick / selected character / 0s AI resume;
- cooldown-aware AI;
- 3/5/10 prototype cooldowns;
- deterministic crit resolver;
- accepted impact text sizing/behavior;
- prototype moveSpeed P1–P5 1.8, runtime enemy 1.6;
- Pause / CONTINUE / RESTART / EXIT;
- orientation gate;
- Stage navigation / BACK / Retry / Next;
- Team Select filters and no-scroll mobile layout;
- A1/A2/A3 runtime slot semantics.

## 12. Out of scope

Do not implement:
- Tier upgrades / M4;
- shard spending after unlock;
- level/star progression;
- rarity;
- universal shards;
- duplicate conversion;
- shop;
- gacha;
- currencies;
- stamina/energy;
- daily missions;
- formal character/stage art;
- formal reward balance;
- audio;
- PvP;
- TD gameplay rules.

## 13. Engineering acceptance

At minimum verify:

1. normal Campaign initial ownership is P1/P2/P3 only;
2. dev mode can still expose all prototypes if retained;
3. Stage Preview reads reward metadata and displays quantity + firstClear/repeatable state;
4. 1-1 Victory grants P4 +2 exactly once;
5. replaying cleared 1-1 does not grant first-clear reward again;
6. 1-2 first clear yields P4 total4;
7. 1-3 first clear yields P4 total5 and unlocks P4;
8. P4 appears/selects in Team Select immediately after unlock;
9. 1-4 Victory grants P5 +1 every successful replay;
10. 1-5 first clear grants P5 +3 once;
11. subsequent 1-4 replay can reach5 and unlock P5;
12. Defeat/Draw/unfinished Exit/Restart do not grant;
13. duplicate finish callback cannot double-grant;
14. shard + ownership persistence survives reload;
15. malformed/obsolete/denied storage recovers safely;
16. pre-M3 campaign save migrates without losing clear progress;
17. stale team with locked character sanitizes safely;
18. existing Campaign stage unlock rules remain Victory-only;
19. exact-three Team Select / filters / battle mapping stay clean;
20. targeted + impacted regression + build + Pages deploy pass.

## 14. Player smoke

Player-owned smoke after engineering PASS:

1. fresh/cleared-state appropriate Chapter 1 Stage Preview shows shard reward and FIRST CLEAR / REPEATABLE clearly;
2. win 1-1 and see P4 +2 / 2 of 5;
3. replay 1-1 and confirm no duplicate first-clear reward;
4. progress to P4 5/5 and see P4 UNLOCKED;
5. enter Team Select and verify P4 appears and can be selected;
6. verify repeatable P5 reward can increase again on replay;
7. reload page and confirm shards/ownership persist;
8. Defeat/Exit check only if convenient; automated coverage is authoritative for no-grant paths.

Stop after M3 player-ready deployment. Do not begin M4 automatically.
