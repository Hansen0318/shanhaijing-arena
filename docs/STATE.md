# Project State

## Milestone
**Combat Prototype**

## Goal
Prove that the core battle is readable, responsive, and enjoyable before investing in roster art, campaign, progression, or content.

## Locked v1 decisions
- Platform: mobile web, landscape.
- Presentation: 2.5D three-quarter arena.
- Team size: 3v3.
- Arena movement: free 360-degree movement inside bounded arena.
- Character separation: simple collision/avoidance; no complex physics.
- Camera is fixed for the whole battle and does not follow selection.
- The whole 3v3 Arena encounter is intended to remain readable in one fullscreen landscape view.
- Player combat input immediately overrides AI for the selected character.
- When valid player input stops, full AI control resumes immediately on the next simulation step.
- Selected character does not change when AI resumes.
- No visible AUTO/MANUAL state.
- Player controls: movement joystick + Heavy + Special + Awakening.
- Basic attack is automatic; no Basic button.
- Soft auto-targeting in prototype.
- Win: all enemy characters KO.
- Lose: all allied characters KO.
- Battle limit: 90 seconds.
- Timeout winner: higher sum of remaining team HP percentages; exact tie = draw.
- Type triangle: Power > Speed > Blast > Power.
- Initial advantage/disadvantage test value: +15% / -15% damage modifier.
- Roles: Tank / Attacker / Support. Healer/Buffer/Controller are Support subtypes in v1.
- Character stat minimum: HP, ATK, DEF, Move Speed, Attack Speed.
- Skill set: Basic, Heavy, Special, Awakening, Passive.
- KO character cannot be selected or healed in v1.
- If selected character is KO, selection moves to the nearest surviving ally; camera remains fixed.
- M0 runtime stack: Phaser 4.2.1 + Vite 8.3.1 + plain JavaScript/ESM.

## Not in prototype
- Final character art.
- Full animation production.
- Chapter select / story / unlock economy / fragment farming / T3-T1 implementation.
- Large roster.
- PvP, guilds, equipment, gacha, ranking.

## Prototype exit criteria
1. 3v3 can resolve from start to victory/defeat without player input.
2. Player can switch among three allies.
3. Fixed fullscreen camera keeps the Arena readable while player switches selected ally.
4. Manual input overrides AI instantly.
5. Full AI resumes immediately when valid combat input stops.
6. Basic/Heavy/Special/Awakening all function under AI and player control as applicable.
7. Soft targeting is understandable in play.
8. Damage numbers, HP, KO, timer, victory/defeat are readable.
9. Type advantage rules are verifiably correct.
10. Stable mobile landscape smoke test passes.

## Implementation status

### Completed on `feat/m0-combat-core-20260927`
- Framework-independent deterministic combat core through headless 3v3.
- Existing core/headless evidence retained, including **38 / 38** impacted integration PASS.
- Phaser/Vite renderer bootstrap and exact dependency lockfile.
- Previous renderer checkpoint: **48 / 48 Node PASS** and **Vite build PASS**.
- Chat-first first interaction implementation:
  - allied placeholder selection;
  - selected visual state;
  - camera soft-retarget;
  - selected-KO fallback through existing targeting helper.

### Latest fullscreen arena verification
- Fullscreen Arena world/presentation code complete: viewport 960x540, world 1280x720, 16:9, camera clamped to world bounds.
- GitHub Actions on latest branch: **49 / 49 tests PASS**, production build PASS, Pages deploy PASS.
- Fullscreen Arena interactive browser smoke on the deployed default and `?fixture=ko` URLs: PASS. Landscape canvas has a continuous world background without the former bordered card; six actors render as replay advances, A1/A2/A3 highlight and camera retarget work, top/bottom and observed left-to-right camera positions do not reveal outside-world blank space, enemy click is no-op, and A2 KO falls back to A1. No blocking page-origin runtime/console error. **Fullscreen arena/camera defect resolved; ENGINEERING PASS / PLAYER SMOKE PASS for this slice.**

### Arena sand color evaluation (2026-09-28)
- Arena rectangle fill `#8E7B5A`, center line and ellipse stroke `#5F513B`; dark outer camera background retained.
- Color-only source commit `9b9fe641848a412e2b10e26493a73532ba4551bc`; Actions run `36436079695`: Test / Build / Pages Deploy success. Public Pages appearance observed in browser. **ENGINEERING PASS / PLAYER SMOKE PENDING** for player device proportion assessment.
- No arena/actor/control/camera geometry or battle behavior changed in this slice.

### Arena horizontal widening (2026-09-29)
- Logical stage/canvas/DOM host changed from 960x540 to 1120x540; actor projection padding increased from 120 to 200 on both sides, preserving its 720px horizontal span. Ground/line track stage width; center ellipse stays 280x170 and sand colors remain.
- Chat implementation checkpoint `4d13321a660ea25a4cedddb96eb7a7857b4827fa`; stale projection test expectations corrected only in `23c4e759551c24d149203c2574ee0109e5921046`. Actions `36500167030`: 61/61 tests, build, Pages deploy PASS.
- Public browser smoke: wider centered field, unchanged height, complete ground and line, stable circle/actor logical sizes and fixed camera. A1/A2/A3 selection and pointer joystick drag/release movement observed without regression. **Engineering CI/browser pointer checks PASS; player visual proportion and real iPhone touch smoke PENDING.**

### Pending
- Fixed fullscreen Arena / iPhone Safari viewport presentation: **ENGINEERING PASS / PLAYER SMOKE PASS**.
- Movement joystick + shared player override: **known-working mobile baseline restored; player-confirmed movement works; AI resume delay now 0s / immediate**.
- Skill controls: Heavy / Special / Awakening — **Chat implementation complete; CI/deploy + player mobile smoke pending**.
- Minimum HUD/VFX readability.
- Natural combat presentation / AI movement readability.
- Runtime/mobile and player smoke for later slices.
