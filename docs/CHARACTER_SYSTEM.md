# Character System v1

## 2026-10-22 — 疾行書面規格 PLAYER APPROVED／實作計畫待審

玩家「好繼續」直接回覆已呈交的正式規格，精確核准收據 `docs/verification/P1_PASSIVE_DESIGN/spec-acceptance.json` 綁定 `docs/superpowers/specs/2026-10-22-lushu-passive-design.md` 原SHA256；書面規格Gate CLOSED，不再重問。規格原檔/舊direction receipt保留不改，其舊REVIEW PENDING是歷史狀態。已完成 `docs/superpowers/plans/2026-10-22-lushu-passive.md` 四切片計畫及靜態自審；**下一唯一Gate：玩家審閱實作計畫**，不是再審規格。

計畫：1不可變被動定義/rolling-distance狀態核心；2一般移動分段與戰鬥事件整合/P1opt-in；3獨立可見badge/HUD/誠實Collection；4真native/built/受影響P2相容性證據、完整normal CI/Build/來源綁定guard/Pages/公開比對，最後P1被動玩家驗收。原生單人執行方式已定，不再次詢問或委派subagents。計畫尚未核准，不把規格同意擴大成未展示計畫已批准。

本次只有核准記錄/實作計畫/進度/handoff [skip ci]；沒有產品程式/依賴安裝/新測試/Build/Browser/部署/可讀性PASS。P1 ACTIVE／未完整，P2厚甲等P1被動驗收後，兩者完成前P3技能BLOCKED。保留全體已核准美術/四招/尺度與無關untracked、原branch/PR#1 open未merge、普通Hit取消及全局素材政策。舊1014/149只能沿用原範圍，不代表新被動PASS。接手索引 `docs/handoffs/P1_P2_PASSIVE_NEXT_WORK.md` 已更新到計畫審閱；交接仍單一完整自足code block。

## 2026-10-22 — 疾行方向續行／可辨識要求入規格／書面規格待審

玩家「確認視覺和數值有明顯可看得出來，若確認沒錯，就記錄繼續」記於 `docs/verification/P1_PASSIVE_DESIGN/direction-confirmation.json`：方案A依原2秒窗/1單位/+8%/2秒效果/CD4秒推進書面規格，附帶實際視覺及數值必須可辨識條件；不是已實測PASS或新文件核准。已完成正式規格 `docs/superpowers/specs/2026-10-22-lushu-passive-design.md`，**下一唯一Gate：書面規格審閱**，不重問已呈交方案A或角色順序。

fresh純資料投影：T0一般移速2.05→2.214，同條件有效2秒距離4.1→4.428（+0.328）；T0–T3投影保存於 `docs/verification/P1_PASSIVE_DESIGN/numerical-projection.json`，不是Session/Browser驗證，不能宣稱肉眼已明顯。發現現有MOB在正式角色view.label隨hasFormalArt隱藏，因此新規格要求獨立「疾行 +8%」狀態牌、真expiry時間條及HUD實際移速/進度/CD；觸及總15%上限須誠實顯示上限，不假稱額外+8%。新UI細節在書面規格內待審，未實作。

此切片純docs/投影/條件確認[skip ci]，無Runtime/美術/測試/Build/Browser/部署；未寫新被動或宣稱P1完成。P1仍ACTIVE、P2厚甲QUEUED、兩者PASSIVE PLAYER VERIFIED前P3技能BLOCKED。全部四招/base已核准成果、普通Hit取消、單分支/PR#1 open未merge與共用素材政策保持。後續依書面規格審閱→實作計畫審閱/原生單人執行→真驗證/發布/玩家驗收。接手索引 `docs/handoffs/P1_P2_PASSIVE_NEXT_WORK.md` 已移至新Gate，所有交接單一完整自足code block。舊proposal pending文字為前一切片歷史。

## 2026-10-22 — PLAYER OVERRIDE：被動列入完整交付；P1 疾行 → P2 厚甲補完

**最新玩家決定優先，取代下方P1/P2整角色COMPLETE／無剩餘Gate結論。** 未來角色技能順序固定 **Basic → Heavy → Special → Awakening → Passive（被動）→ 整角色結案**。既有identity/static/Idle/Move/KO及四招美術、機制、Runtime、玩家驗收保持；普通Hit永久取消。獨立被動須完成具體規格、共用資料驅動實作、必要驗證、部署及玩家驗收才算完整，基礎HP/DEF/移速或既有Tier效果不能代替被動完成。

當前補完順序：**P1鹿蜀「疾行」ACTIVE／機制設計審核準備 → P1被動驗收完成 → P2猼訑「厚甲」QUEUED → P2被動驗收完成 → 才可開始P3角色技能**。本次指令已授權P1/P2補完工作及規則變更，不必重問順序；未提供的觸發/數值/效果設計仍須依既有設計審核流程，不把任務授權當成尚未展示方案的核准。P1/P2改標 **FOUR ACTIVE SKILLS PLAYER VERIFIED / PASSIVE INCOMPLETE / FULL CHARACTER INCOMPLETE**，不退回已完成四招Gate。

權威決定 `docs/decisions/2026-10-22-passive-character-completion.md`；當前進度/來源證據 `docs/verification/P1_P2_PASSIVE_RECOVERY.json`；P1首個具體候選與取捨 `docs/M5C_P1_LUSHU_PASSIVE.md`。P2只排隊、不並行開發。P3既有base/Move/KO不重做，角色技能仍BLOCKED；本次未開始P3。舊P2_CHARACTER_CLOSURE.json與P1/P2結案條目保留為舊範圍歷史，不能證明新完整標準已達成。

同branch feat/m0-combat-core-20260927／PR#1 open/unmerged。此切片只有規則/規格討論/進度/handoff [skip ci]；無Runtime/新被動實作、測試/Build/Browser/部署。既有1014/1014與149/149只沿用其原來源範圍，未來真被動Runtime變更須重取受影響驗證及正常發布證據，不可拿舊PASS覆蓋。全部已核准master/receipt/GIF/尺度/anchor/ground/mirror、全局無固定總量容量政策與逐檔/兩下載/完整required/回收/真失敗/destroy保留；無main merge/替代分支/TD/角色ID特例。唯一當前接手索引 `docs/handoffs/P1_P2_PASSIVE_NEXT_WORK.md`，所有交接單一自足可複製code block。

### Optional ability critical metadata (M2 bounded polish)
Critical settings belong to immutable Ability Definition, not Character stats, Type, Role, Tier or cooldown: `canCrit:boolean` (default false), `critChance:number` in [0,1] (default0), `critMultiplier:number` positive finite (default1). Different abilities, including same-category abilities, may differ. False capability or zero chance never crits. No equipment/global crit stat or crit resistance is introduced. Shared deterministic session resolution is specified in COMBAT_SYSTEM.md.

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
- phase: `ready`, `executing`, or `cooldown`;
- current execution target identifier when applicable.

### Locked execution boundary
To avoid implementation ambiguity, M0 uses this deterministic lifecycle:

1. **start**: a valid request changes `ready -> executing` immediately and records the resolved target id when applicable.
2. **finish**: successful execution resolution changes `executing -> cooldown` and sets `cooldownRemaining = definition.cooldown`.
3. If the configured cooldown is `0`, finishing returns directly to `ready`.
4. **tick**: cooldown time is reduced by a nonnegative delta and clamps at `0`; reaching `0` changes `cooldown -> ready`.
5. **cancel**: if the caster becomes KO before an execution that requires an active caster resolves, clear the execution target and return the slot to `ready` without applying that pending effect or starting cooldown.

Cooldown therefore begins at **successful execution resolution**, not at request/start time.

### Shared execution API boundary
AI and player control must submit the same ability request shape into the same execution surface. Controller source may be carried as metadata for diagnostics, but it must not select different combat code paths.

The ability layer must not choose targets itself. Existing targeting systems resolve/retain/fallback targets. Ability execution receives the resolved target (or target id/state) and validates it against the ability targeting contract before start.

At minimum, start validation must reject:
- KO caster;
- non-`ready` ability slot;
- missing/invalid target for an ability that requires a target;
- KO target for a targeting rule that requires a living target;
- target outside effective range.

Target validation should remain a small dependency/predicate or helper boundary rather than embedding target-selection policy inside the Ability state machine.

Required deterministic behavior:
- cooldown never becomes negative;
- an ability can start only when the character is living, the ability is ready, and its target is valid for its targeting contract;
- starting an ability transitions it out of ready state immediately;
- invalid/dead targets are rejected rather than silently executed;
- KO during execution cancels any future action/effect that requires the caster to remain active;
- AI and player intents invoke the same ability execution API.

## Basic attack rule
Basic attack remains automatic and has no player button.
For M0:
- Basic has cooldown `0` in definition data;
- attack cadence is derived from Attack Speed by the combat/ability runtime rather than represented as a user-facing cooldown;
- both allied and enemy AI use the same Basic execution path;
- manual control does not create a separate Basic implementation;
- a Basic execution still uses the same start/finish validation lifecycle, but finishing returns the slot to `ready` immediately because declared cooldown is zero.

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
7. invalid/KO/out-of-range targets cannot start a targeted ability;
8. KO during execution cancels pending caster-required resolution without starting cooldown;
9. Basic uses the same execution path and returns to ready after successful finish because cooldown is zero;
10. the same execution API can be called by AI or player intent without duplicated combat logic;
11. existing type, battle-resolution, targeting, and 2-second handoff tests remain green if the new model touches their contracts.

## Canonical progression concept
- Newly owned characters begin at T0.
- T0 -> T1: 5 available character fragments.
- T1 -> T2: 10 available character fragments.
- T2 -> T3: 15 available character fragments.
- T3 is the current maximum.
- T0 already has the full Basic / Heavy / Special / Awakening / Passive identity.
- Higher Tiers should add mechanics, reliability, synergy, or enhanced effects rather than existing only as flat stat gains.
- Acquisition shard cost, when applicable, is separate from Tier-upgrade spending and cannot be double-used.
- Canonical persistence/accounting rules live in docs/M4B_TIER_UPGRADE.md.

## M2 prototype catalog / ownership
`src/roster/catalog.js` defines immutable P1–P5 independently of battle slot IDs, using the existing lowercase Type/Role schema and four active ability references. Each definition has placeholder portrait metadata and explicit unimplemented Passive metadata; no Passive mechanic was added. HP varies (P1 280, P2 260, P3 240, P4 260, P5 250) to verify selected-data integration; other pacing stats match the established ally runtime. These are test values, not a balance pass.

Ownership is separate `{characterIds: [...]}` player state. Prototype defaults own P1–P5; recruitment/unlock persistence is later scope. Stage fields `allowedRoster` (null means all owned), `forcedCharacters` and `bannedCharacters` are applied by team eligibility and revalidated at controller/factory launch boundaries. Conflicting restrictions fail closed.


## Future Team Select presentation decision (2026-10-02)
When formal character idle/micro-animation presentation is designed, retain the character name below that character. This records the player decision only; current Team Select presentation and animation implementation are unchanged. Not part of the M3 Preview label correction.
