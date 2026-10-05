# M5C-B 猼訑 Idle Micro-animation — Engineering Verification

Status: **ENGINEERING PASS / PLAYER SMOKE PENDING — 2026-10-05**

## Scope
Integrated only the player-approved 猼訑 Idle micro-animation through the existing M5C-A asset/animation descriptor pipeline.

No changes to combat, AI, Tier, shard accounting, rewards, progression, accepted shared UI/layout, Run/Move, Hit/KO/Cast, Skill VFX, or another character. Main was not merged.

## Approved asset contract
- path: `public/assets/characters/botuo/battleIdle-4f.png`
- image: transparent RGBA PNG
- dimensions: 640×160
- frames: 4 horizontal cells, each 160×160
- fps: 2.5
- loop: true
- origin: `[0.5, 158/160]`
- scale: 2
- staticFrame: 0
- bytes: 31,355
- SHA-256: `86cb5c36d7e7a7862287da77e36ec77d04198311fb37f97fcbd46a73f175f6a0`

## Source delta
- `src/assets/manifest.js`: P2 battleIdle points to the approved 4-frame PNG with exact dimensions/byte contract.
- `src/roster/catalog.js`: P2 battleIdle descriptor uses the shared four-frame/fps loop contract while retaining the accepted origin, scale and static frame.
- `tests/lushuPresentationCorrection.test.js`: one stale P2 static-only expectation updated to the approved 4-frame descriptor contract.
- `public/assets/characters/botuo/battleIdle-4f.png`: exact approved binary.

Shared presenter/runtime architecture is unchanged; no character-specific engine branch was introduced.

## Verification
Executable source checkpoint: `8f5f0a22e589e8e1abb8fab6e3f9fae326a868e3`.

GitHub Actions #678 / run `37323591800`:
- Test: **601/601 PASS**
- asset guard: **PASS — 43 files / 226029 bytes**
- production build: **PASS**
- Pages Deploy: **SUCCESS**

Pages build artifact verification:
- `assets/characters/botuo/battleIdle-4f.png`
- 31,355 bytes
- SHA-256 `86cb5c36d7e7a7862287da77e36ec77d04198311fb37f97fcbd46a73f175f6a0`
- exact match to the player-approved production pack.

## Superseded recovery trace
Actions #676 exposed one stale test expectation after the descriptor changed from static to four frames. That test was corrected only.

A first binary transport checkpoint also produced a truncated PNG despite passing structural CI. It was detected by artifact fingerprint comparison and replaced. Neither the stale-test checkpoint nor the truncated binary is authoritative. #678 plus the exact artifact fingerprint above supersedes both.

## Remaining player-owned smoke
Only focused real-device acceptance remains:
1. breathing amplitude feels correct;
2. motion is smooth/readable at mobile battle scale;
3. feet/ground anchor and actor position remain visually fixed;
4. identity, horns, mantle and protector bracer remain readable throughout the loop.

After player confirmation, close 猼訑 Idle as PASS / PLAYER VERIFIED. Do not advance to Run/Move, Hit/KO/Cast, Skill VFX or another character until the next gate is explicitly opened.
