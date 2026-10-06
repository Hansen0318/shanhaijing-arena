# M5C-B 猼訑 Idle Playback + iOS Reload Underfill Verification

Status:
- **Idle playback correction — ENGINEERING PASS / PLAYER SMOKE PENDING**
- **reload underfill correction — ENGINEERING PASS / PLAYER SMOKE PENDING**

Date: 2026-10-06

## Scope
Bounded executable/runtime verification only. No art redesign and no changes to combat, AI, Tier, shards, rewards, progression, unrelated UI, Run/Move, Hit/KO/Cast authoring, VFX, or another character. Main was not merged.

Active branch: `feat/m0-combat-core-20260927`
PR: #1
Tested source checkpoint: `ca6b82c2c6fb351d8f2d74af2dc23a7d281fde9d`

## Idle playback verification
Chat source/spec delta was preserved; approved 猼訑 Idle art and descriptor were not modified.

Executable contracts:
- Team Select upper full-body preview with authored multi-frame battleIdle executes the approved 猼訑 F1→F4 sprite sequence.
- Arena living actor missing formal Hit/Cast art falls back to authored battleIdle using advancing battle time; it no longer freezes on F1.
- KO missing-art fallback remains static.
- Existing upper-Team tests that assumed static full-body identity were stale and were updated only to the new authored-Idle presentation contract.

Passing checks from Actions #704:
- `Team Select idle preview executes the approved Botuo F1-to-F4 sprite sequence`
- `Botuo living missing Hit/Cast art keeps idle frames advancing while KO fallback stays static`
- `upper 3v3 uses authored Idle previews when available, lower bench keeps portraits and actual Tier styling`

## iOS/Safari reload underfill reproduction and fix
The controlled visualViewport harness reproduced the reported failure mode:
- layout viewport remains full-height;
- `pageshow` exposes a transiently short `visualViewport.height`;
- previous `viewportSync` wrote that short value directly to Campaign root height;
- Arena host/canvas sizing itself was correctly visual-viewport-based.

Root cause therefore matched the player's screenshot/static review: Campaign root underfill during reload stabilization.

Bounded fix:
- file: `src/runtime/viewportSync.js`
- only the `pageshow` stabilization path may clamp Campaign root height;
- clamp activates only for a gross underfill greater than 48px;
- clamp target is the stable layout viewport bottom after visualViewport top offset;
- ordinary resize/orientation/route updates remain visualViewport-owned;
- Arena host/canvas width/height/centering still use visualViewport dimensions;
- no orientation-gate, route-return, outer-scroll, battle canvas or broader viewport architecture rewrite.

Passing checks:
- `visual viewport scroll/resize and pageshow refresh layout and input bounds; detach removes listeners`
- `pageshow clamps a transient short Safari visual viewport without changing Arena canvas sizing`
- `actual app Campaign/Battle/Exit route authority survives Phaser refresh and pageshow`

## Build / deploy
GitHub Actions #704 / run `37392526511`:
- directly affected playback/viewport checks: PASS
- repository push CI aggregate: 606 PASS / 0 FAIL
- Asset guard: PASS — 43 files / 226029 bytes
- Vite build: PASS
- Pages Deploy: SUCCESS

The repository's configured push workflow runs its aggregate suite automatically; no separate unrelated full-regression request was initiated for this bounded slice.

## Remaining player-owned smoke
1. On iOS/Safari, reload the public build and confirm no large solid-color underfilled block remains.
2. Confirm Team Select 猼訑 upper full-body visibly idles.
3. Confirm Arena living 猼訑 continues idling through missing Hit/Cast-art fallback.
4. Subjective breathing amplitude/smoothness remains player-owned.

STOP after this gate. Do not advance Run/Move, Hit/KO/Cast art, VFX or next character without a new explicit gate.
