# Character System v1

## Character identity
Characters are anthropomorphic Shanhaijing creatures.
- Human-readable combat silhouette.
- Preserve at least several defining creature traits such as horns, wings, scales, tail, claws, insect armor, fins, serpent motifs, etc.
- Avoid reducing designs to a normal human with only decorative ears.

## Source families
Art/world taxonomy may include:
- beasts;
- serpent/reptile forms;
- insect/arthropod forms;
- aquatic forms;
- flying/bird forms.

This taxonomy does not determine combat role.

## Combat data
Minimum prototype stats:
- HP
- ATK
- DEF
- Move Speed
- Attack Speed

Ability data includes cooldown, range, targeting rules, coefficient/effect, and AI-use conditions.

## M0 Character definition contract
The framework-independent combat layer must separate immutable character definition data from mutable per-battle state.

A character definition must contain, at minimum:
- stable `id`;
- display `name`;
- `type`: Power / Speed / Blast;
- `role`: Tank / Attacker / Support;
- base stats: `maxHp`, `atk`, `def`, `moveSpeed`, `attackSpeed`;
- ability definition references for Basic / Heavy / Special / Awakening;
- zero or more Passive definition references.

Rules:
- definition objects are battle-independent and must not store current HP, cooldown timers, selected target, controller ownership, or transient status;
- type and role remain independent axes;
- player and enemy characters use the same definition schema;
- M0 does not implement T3/T2/T1 progression fields as runtime mechanics.

## M0 Character battle-state contract
Each spawned combatant has mutable state derived from one character definition.

Required state:
- stable runtime `instanceId`;
- `definitionId`;
- `teamId`;
- current `hp`;
- position as numeric `x` / `y`;
- current target identifier or `null`;
- KO flag/state;
- per-ability runtime state;
- controller/arbitration state needed by the existing player-override timer.

State invariants:
- `0 <= hp <= maxHp`;
- `hp === 0` implies KO;
- KO is terminal for M0 battle state: a KO character cannot act, be selected, or be healed;
- living/KO checks must be derived consistently rather than maintained by contradictory duplicate flags;
- mutable combat state must not mutate the underlying character definition;
- coordinates are arena-space data only; no rendering-engine objects belong in the model.

## M0 damage / healing boundary
Character state owns HP mutation but not presentation.

Required deterministic operations:
- apply damage, clamped at zero;
- apply healing, clamped at `maxHp`;
- reject healing for KO targets in M0;
- expose living/KO status for targeting, selection, battle resolution, and AI.

Damage formula ownership remains in the combat resolver. Character state receives the resolved amount and applies only state transition/clamping.

## M0 Ability definition contract
Ability definitions are declarative and shared by AI/player-controlled combatants.

Each active ability definition must contain:
- stable `id`;
- category: Basic / Heavy / Special / Awakening;
- cooldown in seconds; Basic uses `0`;
- effective range;
- targeting rule identifier;
- effect/coefficient data sufficient for the deterministic prototype;
- AI-use conditions or profile data, kept declarative.

Passive definitions may omit cooldown/execution fields when they are not actively cast.

No rendering/VFX/animation object is part of the core ability definition.

## M0 Ability runtime-state contract
Per combatant, each active ability tracks mutable execution state separately from its definition.

Minimum runtime state:
- `cooldownRemaining`;
- execution phase/state sufficient to distinguish ready vs executing vs cooldown;
- current execution target identifier when applicable.

Required deterministic behavior:
- cooldown never becomes negative;
- an ability can start only when the character is living, the ability is ready, and its target is valid for its targeting contract;
- starting an ability transitions it out of ready state immediately;
- cooldown begins at the deterministic execution boundary chosen by the implementation and is tested consistently;
- invalid/dead targets are rejected or re-resolved through the shared targeting system rather than silently accepted;
- KO during execution cancels any future action/effect that requires the caster to remain active;
- AI and player intents invoke the same ability execution API.

## Basic attack rule
Basic attack remains automatic and has no player button.
For M0:
- Basic has cooldown `0` in definition data;
- attack cadence is derived from Attack Speed by the combat/ability runtime rather than represented as a user-facing cooldown;
- both allied and enemy AI use the same Basic execution path;
- manual control does not create a separate Basic implementation.

## Enemy/player parity
Enemies and player-controlled heroes use the same core character and ability model.
Difficulty may vary through level/stats, AI profile, tier-like modifiers, or encounter rules rather than separate incompatible character implementations.

## M0 implementation acceptance criteria
Character/Ability core is accepted when deterministic tests establish:
1. definitions remain immutable while battle state changes;
2. HP damage/heal clamping is correct;
3. KO at zero HP prevents action, selection, and healing;
4. all three Types and all three Roles are accepted independently;
5. ability ready -> execution -> cooldown -> ready transitions are deterministic;
6. cooldown reaches zero without becoming negative;
7. invalid/KO targets cannot start a targeted ability;
8. the same execution API can be called by AI or player intent without duplicated combat logic;
9. existing type, battle-resolution, targeting, and 2-second handoff tests remain green if the new model touches their contracts.

## Future progression concept
- Recruit character at T3.
- T3 -> T2: 5 character fragments.
- T2 -> T1: 10 additional character fragments.
- T3 already has the full skill categories.
- T2/T1 should add mechanics, synergy, or enhanced effects in addition to modest stat gains.
