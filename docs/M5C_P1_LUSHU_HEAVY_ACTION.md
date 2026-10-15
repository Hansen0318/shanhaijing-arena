# P1 鹿蜀 Heavy「逐風衝」— Chat-first action & VFX art direction

Status: **PLAYER ART DIRECTION REVIEW PENDING — 2026-10-16**. No production images, animation approval, runtime modifications or deployment at this checkpoint.

## Authority and protected material
- Recovered AGENTS.md, DEVELOPMENT_PLAYBOOK.md, WORK_PROGRESS.md, STATE.md, action workflow, M5C art rules, current ability data and deployed P1 Basic.
- Canonical identity: `public/assets/characters/lushu/identity.png`, `public/assets/characters/lushu/battleIdle-4f.png`. Approved P1 Basic F3/source/GIF and runtime under `docs/art/approved/lushu/basic/`; must not regenerate or overwrite.
- Keep exact head, horns, tail, garment and the original compact dark melee weapon; never invent a polearm or redesign.
- P1 Heavy `P1.heavy`: 「逐風衝」, description 「短距切入後重擊」; coefficient 1.4, cooldown 3 seconds, engage movement distance 1.6, stopDistance .65, range max 3 Arena units. These are authoritative combat facts, NOT effect dimensions or license to add another dash, AoE, knockback, damage or windup.
- Basic 「踏角」 already player-approved: faster compact single melee strike with independent blade sweep/contact at true hit; Heavy must show greater physical force and visual spectacle under the new Basic < Heavy < Special < Awakening rule without competing with future ultimate.

## Proposed key impact F3 (first player visual gate)
From the actual approved small battle sprite and compact weapon, show a grounded full-body *heavy crossing strike after the already resolved approach*: lead hoof planted wide, hips and shoulders coiled and released, one strong compact-weapon strike to facing-right target, torso pulled into impact, red tail and white mane lagging behind. The stance and attacking weapon MUST visually match existing P1; no new props and no full-body translation that alters authoritative position. F3 should have a stronger diagonal silhouette, wider arm extension, more body compression and weight transfer than Basic F3. No VFX baked into character art.

Only after player accepts F3: individually author F1 loaded/anticipation, F2 approach-to-strike, F4 recovery/settle from exact approved reference and accepted F3. Four distinct grounded poses, independent source PNGs, consistent scale and safe origin, same right-facing canonical. Current true Heavy timing and engage result must be inspected before fixing animation duration; P1 Basic 180ms windup is not reused by assumption.

## VFX direction — independent, layered
1. Behind actor: broad but brief cyan-white wind ribbon/weapon sweep oriented in actual attack direction; stronger trail and length than Basic.
2. Front/target: concentrated bright impact core plus a small ring/angled air-break shards, optionally short-lived trailing wisps. Keep one resolved-hit truth and match target; no fake projectile, extra target, larger damage geometry, screen occlusion or altered hit event.
3. Compare side-by-side at mobile battle scale against the exact approved P1 Basic GIF. Heavy should be notably more forceful and layered, yet reserved relative to later Special/Awakening. Reduced motion uses shortened static flash while essential action readability persists.
4. Confirm compatibility with dynamic pinned encounter residency and finite guards before runtime asset acceptance.

## Strict workflow
1. Player reviews/accepts this Heavy body mechanics + separate VFX direction.
2. Show exact GitHub-approved P1 reference, not a synthesized facsimile; author only F3 character pose for identity/weapon approval.
3. Produce other poses individually after F3 approved; prep transparent safe cells, full integrity/hash checks; separately author wind and contact FX; generate normal/slow/right/left GIF with return-to-idle.
4. Explicit player art/GIF approval before any executable integration. Work limited to shared data-driven Heavy delivery and verified actual event timing, tests/build/Pages/public fingerprint, stop for phone smoke.
5. Finish P1 Heavy → P1 Special → P1 Awakening → Hit/final character acceptance, then P2. Never merge main.

## Mandatory within-character attack motion differentiation — PLAYER HARD RULE 2026-10-16

**Basic / Heavy / Special / Awakening MUST have immediately distinguishable bodily movements, silhouettes, attack vectors and timing signatures, even with VFX turned off.** The existing escalating power/spectacle hierarchy is additional, not a substitute. Do not produce the same four poses with just recolored/larger effects, faster playback or extra particles. These categories are distinguishable by the character's actual articulated motion and relationship to its ability's validated gameplay mechanics.

Required art review for every character before completing the four skills:
- Build a **four-skill motion differentiation matrix** describing each skill's stance/center of gravity, anticipation, primary limb/weapon path, facing/target vector, release/contact pose, follow-through and rhythm, with the real ability data as authority. Use distinct primary silhouette and action grammar per skill.
- Show each skill's player-preview GIF **both character-only (effects hidden) and with independent VFX** at actual phone battle scale. If testers cannot identify the skill by body movement alone (or its actual support/defense gesture), revise poses before approving effects or integration.
- Preserve exact approved identity, weapon, visual proportions, animation safety and state transitions. Do not add fake hit count/target/path/projectile/teleport/area, nor edit stats/AI/range/real damage timing without a separate player-approved combat change. Power feel escalates Basic < Heavy < Special < Awakening, while distinguishing attack type independently.
- For P1 鹿蜀 starting differentiation proposals, **Basic「踏角」** is the deployed compact grounded horn/hoof/weapon strike; **Heavy「逐風衝」** must uniquely emphasize a forward engage→planted forceful collision/weapon blow, with unmistakably different F3 and silhouette; **Special「迴蹄」** must emphasize a diagonal reposition followed by a rotational/turning hoof strike (no invented extra move/hit); **Awakening「南山奔襲」** must uniquely portray the existing three successive rushing hits, with staged peak burst and strongest overall payoff. Validate the latter two against real ability timing and source prior to making art; these are design directions, not preapproved poses or extra gameplay.
- Develop the current character's full four-skill kit before starting the next character; existing accepted Basic stays intact. No new art is approved simply by recording this rule.
