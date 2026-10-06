# M5C-B Team Select Identity Restoration Verification

Status: **ENGINEERING PASS / PLAYER SMOKE PENDING**

Date: 2026-10-06

## Scope
Verify only the Chat-completed Team Select identity restoration.

Protected and unchanged:
- Arena Idle playback correction
- iOS/Safari reload-underfill correction
- approved 猼訑 art
- gameplay
- main branch (not merged)

Active branch: `feat/m0-combat-core-20260927`
PR: #1
Tested source: `10f8522068dc00234fa70dd47d6e61398f0a7d4e`

## Verified contract
Team Select upper 3v3 full-body slots use approved `collectionArt`:
- 鹿蜀: `lushu.identity`
- 猼訑: `botuo.identity`

Team Select no longer substitutes authored `battleIdle` sprite sheets into the upper full-body slots. The four-frame horizontal sprite strip is therefore not a Team Select presentation source.

Only stale Team Select test expectations from the superseded animated-upper experiment were updated. Production source from the Chat restoration was not changed during executable verification.

## Targeted checks
Actions #714 / run `37394036756`:
- `Team Select upper full-body preview preserves approved collectionArt instead of substituting battle sprite sheets` — PASS
- `upper 3v3 preserves approved full identity collectionArt, lower bench keeps portraits and actual Tier styling` — PASS
- `upper and Collection retire formal placeholder names while lower roster preserves name and Type` — PASS

Configured push workflow aggregate:
- 605 PASS / 0 FAIL
- Asset guard: PASS — 43 files / 226029 bytes
- Vite build: PASS
- Pages Deploy: SUCCESS

## Deployed artifact fingerprint
Pages artifact from Actions #714:
- application bundle: `assets/index-DI2fU24j.js`
- 猼訑 approved Team Select identity:
  - `assets/characters/botuo/identity.png`
  - SHA-256 `79a210c187745886fb9c1fce3877512b275998bc17c7c537369fdc6f2b8dae5b`
- 猼訑 approved Arena Idle asset remains present and unchanged:
  - `assets/characters/botuo/battleIdle-4f.png`
  - SHA-256 `86cb5c36d7e7a7862287da77e36ec77d04198311fb37f97fcbd46a73f175f6a0`

The deployed bundle contains both runtime assets because Arena still legitimately uses battleIdle; the Team Select source contract and tests prove upper Team Select resolves collectionArt only.

## Remaining player-owned smoke
Open Team Select on the real device and confirm the upper 猼訑 full-body is the approved single identity image, with no four-frame sprite strip visible.

STOP after player confirmation.
