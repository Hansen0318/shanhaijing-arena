# M6A Developer Battle Lab verification

## Scope and isolation
Explicit `?battleLab=1` takes priority over resetProgress/campaignDev/fixture diagnostics and does not instantiate Campaign or any persistence/migration adapter. Normal URL has no Lab entry. Lab config/controller own only local state; direct launch passes labConfig/labActions and null Campaign actions. Scene ignores accidentally supplied Campaign callbacks in Lab. Victory/defeat/draw offer only RETRY/BACK TO LAB; reward presentation is skipped.

Byte-for-byte whole-storage snapshot stays identical through actual main entry, launch, victory, retry, back and pageshow/resize/orientation events. This covers Campaign clear, first/repeat receipts, acquisition earned/spent/unlocks/Tier/upgrade receipts, saved team and unknown keys. Formal progression modules remain unchanged.

## Runtime and presets
Shared BattleSession, formal rosterCatalog and formalAbilityDefinitions references, AI pipeline, Type multiplier and resolver; no dev character copies. Independent actor IDs allow duplicate lineup slots without changing normal Team Select uniqueness. Fresh retry retains frozen config and resets session state.

NORMAL standard formations/full HP. LOW HP25% all allies. HEAL TEST slot1 at25%, 赤鱬 slot3 selected. AOE TEST enemies clustered near 九尾狐 slot2; unadjusted preset Special hits e1/e2/e3 once. TYPE ADVANTAGE aligns Power/Speed/Blast pairs with advantage1.15/disadvantage0.85/same1.00 cases. MITIGATION TEST puts 猼訑 slot2 against nearby enemies; formal Special grants0.75 damage multiplier. Presets only set initial conditions, no tactics/threat/dodge additions.

HP override100/50/25 applies to all allies. Manual uses existing selection/joystick/HSA; AI-only omits manual controls/selection and uses normal AI. Skip countdown initializes gate0 and battleStarted only in Lab; normal gate3 unchanged. Ready override resets only this session H/S/A initial slots. Existing normal initial skills already ready, so current initial effect is identical with toggle off; no cooldown definitions changed.

## Checks
- RED→GREEN schema5/5, menu32/32, adapter29/29, scene39/39 checkpoints.
- Final targeted41/41; impacted205/205 including Campaign/Collection/INFO/rewards/Tier/lazy/restart/formal effects; full448/448; build and diff check PASS.
- Independent read-only review39/39 PASS, no actionable Major/Minor findings. Physical device touch/layout remains player-owned.
- Protected source diff: no combat core, catalog/abilities, type resolver, Chapter data, persistence, acquisition/Tier accounting or reward quantity edits.
- Build entry79,192 bytes vs accepted INFO71,960 (+7,232); battle chunk1,395,576 bytes remains deferred. Entry index-vwLZrBLX.js / CSSindex-CuxsJ6uc.css / battleRuntime-BZPy0e2X.js. No battle module preload; menu creates no runtime game.
- Mobile CSS uses minmax(0,1fr), min-width0, native44px controls, four safe-area insets, body vertical scroll and separate fixed START row. Public runtime measurement pending below.

## Delivery
A f1db5b78dd4b226108689e3a4f4f90bb989a4058; B9db76a687ed0f88b5e984752b895d1e5a355476a; C10da79092a1103cb5fdc511bcec75e7340c3cc74; D0e3e85e4a32a833cd35ceadaaae312336dd73918. Each tested/committed/pushed; interim skip-CI checkpoints protect accepted deployed build until coherent release. Original branch/PR1 delivery retained, no main merge.
Actions/Pages/public source verification pending. Final status must wait for delivery evidence.

## One player smoke
Open dev URL, configure teams, HEAL TEST, TYPE ADVANTAGE, Skip countdown, Retry, Back; return normal URL and confirm save unchanged. No reset needed. STOP before M6B.
