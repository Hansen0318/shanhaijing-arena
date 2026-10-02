# M3 — Shard / Reward / Character Unlock Loop

## Status
**M3 PREVIEW PRESENTATION CORRECTION — ENGINEERING PASS / PLAYER SMOKE PENDING**

The player confirmed the initial M3 real-device smoke OK. That acquisition/persistence/unlock/Team Select baseline is protected. The bounded multi-character reward correction is implemented; engineering release checks passed and only its new player acceptance remains pending.

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

Shard inventory applies to **every catalog character**, whether currently owned or locked.

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

Rules for owned vs locked characters:
- locked character shards accumulate toward unlock;
- owned character shards also continue accumulating and persist;
- M3 does not spend owned-character shards;
- those post-ownership shard counts are reserved for M4 Tier/progression;
- receiving shards for an already-owned character must never be discarded merely because ownership is already true.

Unlock threshold for M3:
- 5 shards unlock a locked character.

On unlock:
- character is added to ownership;
- shard count remains recorded; do not silently delete/reset it;
- later rewards for that now-owned character continue increasing its shard count;
- M4 will later decide how owned-character shards are spent for Tier progression.

## 3. Reward definition

Stage reward metadata must be fully data-driven and must support **multiple character shard rewards in the same stage**.

A stage may expose 1–3 or more configured shard items as content requires. Different characters may have different quantities and different repeat policies.

Canonical shape:

```
reward: {
  items: [
    {
      type: 'characterShard',
      characterId: 'P4',
      quantity: 3,
      repeat: 'firstClear'
    },
    {
      type: 'characterShard',
      characterId: 'P2',
      quantity: 2,
      repeat: 'firstClear'
    },
    {
      type: 'characterShard',
      characterId: 'P2',
      quantity: 1,
      repeat: 'repeatable'
    }
  ]
}
```

The example means:
- first clear grants P4 ×3 and P2 ×2;
- later replay victories grant only P2 ×1;
- P4 does not drop again unless a separate repeatable P4 item is configured.

Rules:
- reward metadata belongs to stage config;
- no hard-coded `if stageId === ...` reward logic in controller/view;
- multiple reward items for different characters are first-class, not a future-only extension;
- the same character may have separate first-clear and repeatable entries with different quantities;
- first-clear and repeatable reward sets are independently configurable;
- on an unclaimed stage, use the valid first-clear set if configured, without adding repeatable items; otherwise use the repeatable set (repeatable-only stages reward the initial win too);
- after claim, use only the repeatable set; selection follows catalog/quantity sanitization;
- quantities may differ by character;
- rewards may target locked characters or already-owned roster characters;
- owned-character shards must accumulate and persist exactly like locked-character shards;
- quantity must be a positive integer;
- unknown character reward IDs must fail validation or be safely excluded according to the chosen data-validation boundary;
- reward presentation must read the same stage reward definition used by grant logic;
- M3 remains deterministic/fixed-quantity: no random drop chance is introduced by this rule.

## 4. Current live Chapter 1 engineering fixture

Player-visible engineering content only, not formal balance. Supersedes the original single-item fixture.

| Stage | FIRST CLEAR | REPEATABLE |
|---|---|---|
|1-1|P4×3 + P2×2|P2×1|
|1-2|P4×2 + P1×2|P1×1|
|1-3|P5×2 + P3×2|P3×1|
|1-4|P5×2 + P2×2|P5×1|
|1-5|P5×3 + P1×2|P5×2|

Every Chapter1 stage remains farmable after CLAIMED. First-clear run unlocksP4 after1-2 (3+2=5); P5 after1-5 (2+2+3=7). Shards are retained. OwnedP1/P2/P3 receive inventory too. Chapter2–6 remain empty reward placeholders using identical reward.items schema; synthetic Chapter2 covers three firstClear/two repeatable items without engine changes. Future content is config-only; never special-case stage IDs/numbers.

## 5. Stage Preview reward presentation

Presentation-only player correction (2026-10-02): reward rows show character identity and quantity only, e.g. `P4 Shard ×3`. Do not display FIRST CLEAR, CLAIMED or REPEATABLE labels.

- Currently obtainable items keep normal high-contrast color.
- Already-claimed non-repeatable items remain visible but clearly dimmed (current implementation uses muted color plus50%opacity).
- Repeatable items remain normal/high-contrast after clear.
- Render every configured item separately; do not collapse multi-character rewards.

Internal repeat/status metadata and transaction semantics remain unchanged. Preview consumes the existing authoritative status solely to select visual styling. This decision supersedes older visible-label/checklist wording in this document and historical verification records. No formal reward art.

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
- each completed replay Victory grants every configured repeatable item exactly once for that battle completion;
- first-clear-only items and repeatable items in the same stage are evaluated independently;
- replay may therefore grant only a subset of the characters rewarded on first clear.

Campaign stage unlock and reward grant may happen in the same victory transaction/flow, but reward persistence remains logically separate from combat state.

## 7. Result presentation

Victory Result should expose what was earned in that completed battle.

Minimum:
- one row per actually granted shard item, e.g. `P4 Shard +3`, `P2 Shard +2`;
- updated count for each granted character, e.g. `3 / 5`;
- on replay, show only items actually granted in that replay transaction.

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
3. Stage Preview reads reward metadata and displays quantity + firstClear/repeatable state, including rewards for already-owned characters;
4. 1-1 first Victory grants P4+3 and ownedP2+2 exactly once;
5. replaying cleared 1-1 does not grant first-clear reward again;
6. 1-2 first clear grants P4+2/P1+2, yields P4total5 and unlocks;
7. 1-3 first clear grants P5+2/P3+2; replay grants onlyP3+1;
8. P4 appears/selects in Team Select immediately after unlock;
9. 1-4 Victory grants P5 +1 every successful replay;
10. 1-5 first clear grants P5 +3 once;
11. initial1-3→1-5 gives P5totals2→4→7/unlock;1-4 and1-5 replay keep increasing inventory;
12. Defeat/Draw/unfinished Exit/Restart do not grant;
13. duplicate finish callback cannot double-grant;
14. shard + ownership persistence survives reload, including shard counts for already-owned characters;
15. malformed/obsolete/denied storage recovers safely;
16. pre-M3 campaign save migrates without losing clear progress;
17. stale team with locked character sanitizes safely;
18. existing Campaign stage unlock rules remain Victory-only;
19. exact-three Team Select / filters / battle mapping stay clean;
20. one stage can grant at least two different character shard items on first clear;
21. those items can have different quantities;
22. replay can grant only a configured subset of the first-clear characters;
23. the same character can have a smaller repeatable quantity than its first-clear quantity;
24. multi-item rewards can include an already-owned character and persist its shards;
25. Stage Preview correctly distinguishes CLAIMED first-clear rows from still-obtainable repeatable rows on the same stage;
26. Result renders all and only items granted in that completion;
27. targeted + impacted regression + build + Pages deploy pass.

## 14. Current player smoke

1. Explicitly open the ordinary deployed URL with `?resetProgress=1` once when a clean test is desired. This deletes the three game saves, opens freshChapter1 and removes the parameter. Normal URL/reload never resets progress.
2. 1-1 Preview showsP4×3 FIRST CLEAR, P2×2 FIRST CLEAR, P2×1 REPEATABLE. First Victory ResultP4+3/P2+2; replay onlyP2+1. Cleared Preview keeps twoCLAIMED rows plusREPEATABLE.
3. Check each1-2→1-5 has its configured replay row, as §4; first wins unlockP4after1-2 andP5after1-5. Each replay grants only its configured item, once. OwnedP1/P2/P3 shards persist too.
4. Reload: progress survives, Campaign/Stage/Team have no stale game rectangle. Battle/Result still render Arena. Check Safari toolbar/rotation/route return and multi-row readability/buttons. Automated no-grant/duplicate/owned-save coverage is authoritative; do not repeat unrelated combat smoke.
5. Optional explicit reset again returns zero shards/initialP1/P2/P3/emptyteam; an ordinary reload after subsequent play preserves the new save.

STOP before M4; this follow-up is not PLAYER VERIFIED until the player confirms.

## 15. Implementation / migration decisions (2026-10-01)

- Pure state/transactions: src/acquisition/model.js. Dedicated save: src/acquisition/persistence.js, key shanhaijing-arena.acquisition.v1, schema version1. Presentation: src/acquisition/presentation.js. Controller owns a fresh completion UUID per start/Restart/Retry and binds it through main's scene callback; stale callbacks cannot settle a later round.
- State contains shards for EVERY catalog ID, derived ownership, claimed stage receipts and completed Victory UUID receipts. Items normalize against own catalog properties and positive safe integers. Unlock requires5 and preserves the full inventory. Owned synthetic P1 rewards are separately tested without changing Chapter1 fixture.
- Pre-M3 save migration preserves Campaign clear/team keys; existing clears initialize claimedStageIds with no retroactive grants. This deliberately makes already-cleared firstClear rewards unavailable for earning missed P4 shards. Full engineering fixture player smoke needs an independent fresh browser save. Never clear the original user's storage automatically.
- Acquisition receipts + inventory save in one write before the independent Campaign write. Denied/quota storage preserves in-memory state for current session; no reload durability can be claimed for failed writes. Dev unlock-all skips all normal saves. Prototype completion receipt history is retained without pruning.
- Result rendering reads controller rewardResult only. Multiple granted items aggregate by character; measured text height scales into space above action buttons. No DOM-based unlock inference. Team ownership refresh updates eligibility without compacting empty slots.
- Actual engineering evidence: baseline15/15; domain/persistence37/37; model/controller31/31; impacted106/106; independent reviewer36/36; final presentation5/5; full267/267; build/diff PASS. Review found a multi-item Result height issue, reproduced RED and fixed GREEN. No protected combat/source changes beyond Result presentation/callback integration.
- Final deployed safe SHA dd3a4d1a5472c720a6f75c55f7980ada7cfacde3; Actions#279 /36873107391 Test267/267, Build and Pages Deploy success. Public index-DXT92jQP.js matches local/CI. Final-source Preview CLAIMED/FIRST CLEAR and roster/stale team sanitation observed. Closure in WORK_PROGRESS.md / docs/STATE.md; engineering evidence docs/verification/M3_ENGINEERING.md. This is historical initial-M3 evidence; the player subsequently confirmed that baseline smoke OK. Current correction evidence is in §17.

### Historical initial-M3 player smoke (now accepted; do not require replay)
1. Normal roster contains P1/P2/P3.1-1 Preview:P4 Shard×2 + FIRST CLEAR.
2. Win1-1:P4+2,2/5. Replay1-1:no reward row; Preview:CLAIMED.
3. Win1-2:P4total4; win1-3:P4total5 and P4 UNLOCKED. Next Team Select:P4 selectable; filters/order/exact-three remain normal.
4. Win1-4:P5total1; win1-5:P5total4; replay1-4:P5total5 and P5 UNLOCKED. Another1-4 Victory continues6; replay1-5 grants nothing.
5. Reload and open Team Select:P4/P5 remain available. Further repeatable Result reports retained inventory. Readability/no-scroll/feel are player-owned; automated no-grant coverage is authoritative for Defeat/Draw/Exit/Restart/Retry.
6. With original pre-M3 save:verify existing CLEAR survives and firstClear is CLAIMED; stale locked P4/P5 team entries safely disappear. Do not expect retroactive shards.

After player-ready M3 deployment STOP. Await player smoke; no M4 authorization implied.


## 16. Player decision — flexible multi-character stage rewards (2026-10-01)

This decision supersedes any assumption that a stage normally has only one shard reward.

Content designers may define per stage:
- multiple character shard rewards, commonly 2–3 characters;
- different shard quantities per character;
- separate first-clear and repeatable reward sets;
- a first-clear-only character that does not drop on replay;
- another character that continues to drop on replay;
- lower replay quantities than first-clear quantities;
- rewards for characters already owned in the roster.

Example:
- first clear: Character A ×3 + Character B ×2;
- replay: Character B ×1 or ×2 only.

Stage 5 / chapter finale is expected to be the hardest stage and may be configured with higher-value shards, shards for stronger characters, or shards for strong already-owned roster characters. This is a content/configuration rule, not a hard-coded `stageNumber === 5` reward algorithm.

Exact characters and quantities remain stage-design data. M3 does not introduce random drop rates; fixed configured quantities remain authoritative until a later explicit decision.


## 17. Multi-character reward correction release (2026-10-01)
- ENGINEERING PASS / PLAYER SMOKE PENDING. Existing branch / PR#1 retained; safe deployed source a26de3f88f5e9e8d2c439593ea50308cd1fe39b6. Prior M3 smoke is explicitly player accepted.
- First-clear and replay sets select alternatively after normalization. Repeatable-only stages grant the initial win too. Owned shards, receipts, unlock/persistence/migration/Team Select and Chapter1 fixture are unchanged.
- Targeted33/33; impacted100/100; independent review33/33/no findings; build/diff PASS. Actions#284 /36877458362 automatically ran CI272/272 and deployed Pages. Public index-BmyZkd3-.js equals local/CI; original save CLEAR/CLAIMED survives.
- Synthetic P4×3/P2×2 firstClear, P2×1 repeatable covers actual Preview three rows/CLAIMED, Scene Result two/one grants, owned persistence/reload, duplicate protection and unlock refresh. No live multi-item stage content was added.
- Exact next player smoke: original save/CLAIMED intact, Preview/Result/buttons readable; optional convenient1-4 repeatable Victory increments once and survives reload. Do not repeat the accepted full unlock path. Future authorized multi-item content device check should show all three Preview rows, first two CLAIMED after clear, first ResultP4+3/P2+2 and replayP2+1. Engineering synthetic coverage already establishes that contract.
- Full evidence/coverage mapping: docs/verification/M3_MULTI_REWARD_CORRECTION.md. STOP; no M4 or formal content authorization.

## 18. Player clarification — repeatable reward is a stage-wide content contract (2026-10-01)

The earlier smoke correction must not be interpreted as fixing only Stage 1-1.

All Campaign stages use the same reward schema and must be able to define both:
- first-clear shard rewards; and
- repeatable shard rewards after the stage is cleared.

A stage may define different characters and quantities for those two sets. First-clear may include 2–3 character shard types; replay may grant only a subset and/or lower quantities. Exact characters and quantities are stage content data.

For the current live Chapter 1 engineering fixture, every Stage 1-1 through 1-5 must expose a valid repeatable shard reward so the player can verify that no cleared stage becomes a dead reward stage merely because its first-clear rows are CLAIMED. This is an engineering/content fixture, not final balance.

Do not implement this with stage-ID conditionals. Chapter 2+ must inherit the same data-driven capability automatically when their reward tables are authored.


## 19. Universal farming / route / reset follow-up
The current live fixture in §4 supersedes old fixture quantities and old acceptance-path totals in historical sections. Previous release evidence remains historical, not this follow-up's PASS claim.

Campaign/Stage/Team routes explicitly show #campaign and hide #game. Battle/Result explicitly show #game and hide #campaign. A route owner reasserts hidden/visibility on render and every viewport sync (pageshow, resize, visualViewport scroll/resize), after Phaser refresh; hidden game CSS uses display:none. Arena geometry1120×540 unchanged.

Explicit testing reset: `?resetProgress=1` consumes the parameter via history.replaceState before removing only Campaign/acquisition/team save keys; then opens fresh Chapter1. Normal URL never removes saves. Reload cannot reuse the consumed trigger. If storage removal is denied, this explicit reset uses fresh in-memory persistence only; history failure prevents the destructive action. No localStorage.clear().

Engineering PASS: targeted16/16, impacted126/126, independent review39/39/no findings; build/diff PASS. Actions#289 /36881481144 CI288/288, Build/Pages success. Safe deployed source1f5ef823d18d424dc4ffe97f16a0f08ab48fbeab. Public index-fgF_0oLa.js matches local/CI; cleared1-1 shows CLAIMED+REPEATABLE and reload hidesgame. See docs/verification/M3_UNIVERSAL_FARMING.md. Current player smoke in §14; physicalSafari acceptance pending. STOP before M4.


## 20. Preview label removal (2026-10-02)
Presentation-only correction implemented in campaign/view.js and campaign/style.css; transaction/model/persistence/grant logic and live fixture unchanged. Removed policy spans/CSS; already-claimed rows use muted color plus50%opacity. Actual DOM tests cover all labels absent and cleared first rows dimmed while repeatable stays bright. RED5/7 then GREEN targeted/impacted28/28; build/diff passed. Safe deployed source2d25cdeb8fb07fbf3e1078b67bff9c66d123bddc; Actions#290 /36942296853 CI288/288, Build/Pages success. Public/local/CI bundles match. Evidence docs/verification/M3_PREVIEW_CONTRAST.md. Only short Preview contrast/readability smoke remains for this slice.

Future Team Select formal idle/micro-animation presentation keeps the character name below the character. This is a design decision only; no Team Select or animation code changed, no M4 started.


## 21. Universal chapter reward content correction (2026-10-02)

The reward **mechanism** is not Chapter1-specific.

Hard rule:
- Chapter1, Chapter2, Chapter3, Chapter4, Chapter5, Chapter6, and future chapters all use the same stage.reward.items schema;
- every player-visible engineering chapter/stage should expose configured firstClear and repeatable shard rewards so the player can verify the same farming loop everywhere;
- exact characters and quantities are replaceable chapter content;
- do not use chapter-number/stage-number branches in acquisition/controller/view logic.

The prior state where Chapters2–6 had `reward.items: []` was only a placeholder-content shortcut and is no longer acceptable for the player-visible engineering build. Add placeholder engineering reward tables for current Chapters2–6 until formal content design replaces them.

## Universal Chapter content completion / M4B compatibility (2026-10-02)

All30 Chapter1–6 stages now contain firstClear and repeatable rewards through the same schema. Chapter1 unchanged; Chapters2–6 engineering tables use two first-clear characters with quantities3/2 and repeat subset1. Replace content data for future formal design without reward-engine changes.

M4B preserves M3 `shardsByCharacterId` as lifetime earned and reward receipts; it adds separate spent/Tier accounting. Collection now displays available, so historical earned5 that recruited a character showsT1available0/5. M3 grant result remains actual granted items and lifetime inventory; no reward semantic change. Full evidence `docs/verification/M4B_TIER_UNIVERSAL_REWARDS.md`.
