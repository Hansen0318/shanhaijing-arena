# M2 Team Select implementation / recovery plan

User-approved detailed M2 handoff (2026-09-30) is the execution specification. Continue inline on active branch/PR #1; no merge or scope expansion.

## Design
Immutable P1–P5 catalog extends the existing Character definition contract with placeholder portrait and unimplemented Passive metadata. Ownership is a separate player state. TeamSelection owns three ordered slots; removal leaves a hole and addition fills the first hole. Saved valid teams restore in order; unavailable IDs are removed and forced characters inserted, with final validation failing closed for incompatible restrictions.

Campaign START opens Team Select; BATTLE alone starts the encounter. Battle factory receives IDs and ownership, validates current stage restrictions again and instantiates character definitions at existing slot formation coordinates. Retry uses an immutable copy of the battle lineup. Team save has a separate versioned storage adapter; combat never touches storage. Existing portrait card geometry stays fixed, color/labels come from selected definitions, battle slot names remain A1/A2/A3.

## Checkpoints (commit + remote update + WORK_PROGRESS)
- [x] 1. Catalog, ownership, selection/eligibility model; roster/team tests.
- [x] 2. Independent DOM Team Select view/styles; interaction tests.
- [x] 3. Campaign navigation, START/BACK/BATTLE; navigation regression.
- [x] 4. Battle factory/selected lineup/HUD; formation/stats/enemy/Retry tests.
- [x] 5. Versioned recent-team persistence, corruption/denied storage/ownership/restriction tests.
- [ ] 6. Full regression, build, branch review, Pages deployment, requested public browser smoke.

## Protected scope and release
No combat core/input/formation/camera refactor, formal art/animation, economy/rewards/shards/tier/recruit/audio. Five prototypes default owned. Type/Role textual badges use existing lowercase schema with title-case presentation. Restriction conflicts disable BATTLE; unavailable forced characters cannot bypass ownership. Invalid storage and denied localStorage recover safely without saving partial teams.

At completion record actual commits/files/test count/Actions/deploy/public smoke/limitations. Mark M2 TEAM SELECT ENGINEERING PASS only after every required check; iPhone TEAM SELECT PLAYER SMOKE PENDING. Stop for player acceptance.
