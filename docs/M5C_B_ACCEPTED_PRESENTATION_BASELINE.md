# M5C-B Accepted Presentation Baseline

Status: **PASS / PLAYER VERIFIED — 2026-10-04**

This document is the canonical zero-context baseline for the currently accepted M5C-B presentation/UI behavior. It does **not** mean the whole M5C-B art milestone is complete. It locks the accepted reusable presentation rules and the current per-character asset progress so future Chat / Work sessions do not regress or rediscover them.

This file records the **current accepted result**, not the chronological discussion history. Earlier provisional layouts, superseded player feedback, and old `PLAYER SMOKE PENDING` checkpoints are historical evidence only and must not be used to override this baseline.

## 1. Active development context

- Repository: `Hansen0318/shanhaijing-arena`
- Active long-lived branch: `feat/m0-combat-core-20260927`
- Active PR: #1
- GitHub is the single source of truth.
- Keep using the existing branch / PR until a later handoff explicitly authorizes merge.
- Do not import `shanhaijing-td` rules.

## 2. Player-verified presentation baseline

### Stage Select
- Large stage preview image is text-free.
- Right information column order is:
  1. chapter title, e.g. `南山初境`;
  2. stage id + stage title, e.g. `1-1 山麓試煉`;
  3. reward rows, e.g. `九尾狐 Shard ×3`.
- Chapter/stage title text is larger than reward text.
- Reward row font sizing remains at the accepted existing size.
- BACK is lower-left.
- START is lower-right and visually pairs with BACK.
- Stage cards remain below the main preview.
- Existing screens that were not scrollable must not gain outer vertical scrolling because of layout changes.
- This is a shared stage presentation contract. Do not special-case Stage 1-1.

### Team Select
- Ally team is always on the **left**.
- Enemy team is always on the **right**.
- Central `VS` remains the matchup divider.
- Upper lineup uses full-body identity presentation.
- Formal ally and enemy full-body art use the same visual sizing contract; one side must not become larger because of transform/mirroring CSS.
- Formal full-body art may be packed closely / slightly overlap, but must not obscure headings, controls, filters, roster cards, or VS.
- Once a formal full-body asset exists for a slot, temporary development captions such as `SLOT 1`, `SLOT 2 · FRONT`, `E1`, `E2 · FRONT`, `E3`, temporary name blocks, and equivalent scaffolding retire for that slot.
- Placeholder-only slots keep the fallback captions until formal art exists.
- Lower roster cards are information cards:
  - square head/bust portrait area;
  - character name retained;
  - Type retained;
  - head/horns must not be cropped.
- Lower roster is a horizontal-scroll region for future roster growth.
- BACK is lower-left and BATTLE is lower-right, sharing the lower control band with the roster strip.
- BATTLE width should fit its content rather than becoming an oversized wide block.
- `3 / 3 READY` is removed.
- Team Select itself must not gain outer vertical scrolling.

### Cross-screen BACK / viewport
- Non-landing BACK controls use the accepted lower-left placement.
- Page title/content should reflow independently instead of reserving the old upper-left BACK space.
- Moving BACK must not introduce new outer scroll.
- Existing intentional internal scrollers (for example Collection/Detail content) remain internal only.

### Battle actor presentation
- Formal battle sprites replace graybox actor body markers completely on that actor:
  - no placeholder body dot;
  - no white placeholder ring;
  - no floating A/E instance id;
  - no temporary actor-name/debug label.
- Placeholder-only actors retain graybox fallback until their formal art exists.
- Formal actor visual scaling is presentation-only; hitbox, range, AI spacing, movement, targeting and telegraph geometry remain independent.
- Dynamic facing priority is:
  1. current attack/cast direction;
  2. current movement direction;
  3. last/default facing.
- A character must not face right while firing/casting left, or vice versa.
- This facing rule is shared and not character-ID-specific.

### Battle HUD portraits
- Ally-side portrait/card art uses canonical portrait orientation.
- Enemy-side portrait/card art is the horizontal mirror of the ally/canonical orientation so the two sides face inward relative to each other.
- This rule is side-based and applies to every current and future character.
- It is separate from in-arena dynamic facing.

## 3. Formal asset / placeholder rule

Placeholder retirement is **asset-driven and roster-wide**.

- Placeholder UI/art exists only while the corresponding formal asset is unavailable.
- When a formal asset resolves successfully for a surface/state, the placeholder for that same surface/state retires.
- Do not implement per-character branches such as `if (id === 'P1')`.
- Apply the same shared logic to allies, enemies, current characters and future characters.
- Missing formal art must fail safely to the existing fallback rather than making a character disappear.
- Future formal Hit / KO / Cast assets must replace their current fallbacks through the same shared state/asset resolution path.

## 4. Current character / art progress

| Character | Gameplay/data identity | Written visual direction | portraitSquare | collectionArt / identity | battleIdle | Idle motion | Hit | KO | Cast |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 鹿蜀 | canonical/integrated | locked for current direction | integrated + accepted | integrated + accepted | integrated + accepted | 4-frame accepted/integrated | not authored | not authored | not authored |
| 猼訑 | canonical/integrated | written concept direction exists | placeholder | placeholder | placeholder | not authored | not authored | not authored | not authored |
| 赤鱬 | canonical/integrated | written concept direction exists | placeholder | placeholder | placeholder | not authored | not authored | not authored | not authored |
| 九尾狐 | canonical/integrated | written concept direction exists | placeholder | placeholder | placeholder | not authored | not authored | not authored | not authored |
| 狌狌 | canonical/integrated | written concept direction exists | placeholder | placeholder | placeholder | not authored | not authored | not authored | not authored |

Important:
- Do not regenerate or redesign accepted 鹿蜀 portrait/identity/idle assets merely because a session is new.
- 鹿蜀 currently has no formal Hit / KO / Cast art.
- Existing KO/missing-state fallback remains valid until formal state art is supplied.
- Do not claim the other four characters have formal runtime art until their actual approved assets exist.

## 5. 鹿蜀 accepted identity/runtime constraints

Preserve:
- humanoid/anthropomorphic playable body;
- white head;
- warm tawny/amber body;
- broad charcoal tiger-like markings;
- exactly one vermilion/red tail;
- tall lean Speed/Attacker silhouette;
- horse/deer-derived mythic face;
- compact rear-swept horn/antler;
- compact curved skirmisher weapon / rush-guard language;
- no Tank/Bruiser mass;
- simplified mobile battle detail.

Accepted Idle:
- 4-frame breathing loop;
- fixed feet/ground anchor;
- no glow/aura/trail/VFX;
- visible body rise/fall;
- tail follows breathing vertically rather than wagging sideways;
- small coordinated head/weapon-hand follow;
- must read at battle scale without becoming attack anticipation.

Runtime/source optimization rules remain governed by `docs/M5C_B_FORMAL_ASSET_BATCH.md` and `docs/ASSET_PIPELINE.md`.

## 6. Development method that must continue

- Chat-first is mandatory: Chat completes every safe bounded repo edit, spec update, static review and root-cause narrowing it can do before Work.
- Work receives only the irreducible executable delta: tests/build/browser/runtime/deploy or implementation that genuinely requires Work's environment.
- Work prompts must be concise and execution-focused; do not repeat long GitHub context or offer long/short variants.
- Verification is risk-based and minimal: reuse earlier PASS evidence unless the new change can materially invalidate it.
- Player smoke owns device-realistic visual/readability/feel acceptance when appropriate.
- Every meaningful slice updates `WORK_PROGRESS.md` and `docs/STATE.md`.
- New Chat / Work sessions recover first and continue the first unfinished item; do not redo accepted work.

## 7. Next eligible M5C-B step

The latest presentation/UI correction is player verified.

The next visual-production step must be chosen as a **new bounded M5C-B slice** after recovery. Do not silently start it during handoff documentation.

At minimum:
- preserve all accepted baseline above;
- do not restart 鹿蜀 concept / portrait / identity / idle authoring;
- do not change combat / AI / Tier / shard / reward / progression while advancing formal art;
- formal Hit / KO / Cast or the next character asset batch requires an explicit new slice and the existing shared asset/state pipeline.
