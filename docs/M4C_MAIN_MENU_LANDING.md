# M4C — Main Menu / Landing Visual Polish

## Status
**PASS / PLAYER VERIFIED**

M4B T0 Tier progression is PLAYER VERIFIED. The minimal Landing navigation shell already exists and its information architecture is fixed:

Landing
- BATTLE -> Chapter Select
- COLLECTION -> Collection

M4C is presentation polish only. It must not rewrite navigation, progression, reward, Collection, Team Select, or combat systems.

## 1. Goal

Turn the current minimal Landing screen into a coherent game entry screen while preserving its simple two-mode hierarchy.

The first polished version should feel like a real game home/entry screen without requiring final character production assets.

## 2. Required layout

Mobile-first landscape.

Landing should contain:
- full-screen hero/background area;
- game/title/logo placeholder area;
- primary BATTLE button;
- secondary COLLECTION button;
- optional small version/build text if useful for engineering;
- safe-area aware layout;
- no horizontal scrolling.

Buttons must remain large enough for iPhone landscape touch.

## 3. Visual hierarchy

BATTLE is the primary action.
COLLECTION is the secondary action.

Do not add Shop/Event/Gacha/Settings/Character Challenge or other future systems in this milestone.

Use placeholder/graybox visual assets if formal art is not yet available.

## 4. Background / motion scope

Allowed:
- static full-screen background;
- subtle low-cost presentation motion;
- simple parallax/light ambient motion if it can be implemented without coupling to combat;
- restrained button/entry transitions.

Not required:
- formal character animation;
- cinematic intro;
- complex shader/VFX;
- video background;
- audio/BGM.

If motion is added:
- it must not obstruct buttons;
- it must pause/stop when route leaves Landing;
- it must not cause Safari performance or resize/viewport regressions;
- reduced-motion behavior should degrade safely.

## 5. Navigation contract

Must preserve:
- app normal launch -> Landing;
- BATTLE -> Chapter Select;
- Chapter Select top-level BACK -> Landing;
- COLLECTION -> Collection;
- Collection BACK -> Landing.

Landing must not mutate:
- Campaign progress;
- acquisition shards;
- Tier state;
- saved team;
- battle state.

## 6. Route visibility

Reuse the existing route visibility owner.

Non-battle UI routes:
- #game hidden.

Battle:
- #game visible.

Landing reload/pageshow/rotation/Safari visualViewport changes must never reveal the stale Arena rectangle.

## 7. Transition scope

Optional bounded transitions:
- Landing -> BATTLE fade/slide;
- Landing -> COLLECTION fade/slide;
- return -> Landing.

Keep transitions brief and interrupt-safe.

Do not animate route changes in a way that delays state persistence or creates duplicate navigation actions.

## 8. Protected baseline

Do not regress:
- M0/M1/M2 combat/input/HUD;
- universal Chapter1–6 rewards;
- M3 acquisition/unlock/farming;
- M4A Collection/filter/detail;
- M4B T0/T1/T2/T3 progression;
- shard accounting;
- saved team;
- route visibility;
- explicit reset behavior.

## 9. Out of scope

Do not implement:
- formal chapter content;
- final Shanhaijing character art;
- formal idle animation;
- Tier combat bonuses;
- Level/stars/rarity;
- shop/gacha;
- Event;
- audio;
- AI tactical variation;
- new game modes.

## 10. Engineering acceptance

At minimum:
1. normal app launch opens Landing;
2. BATTLE opens Chapter Select;
3. COLLECTION opens Collection;
4. both top-level BACK paths return Landing;
5. Landing is readable at supported iPhone landscape sizes;
6. no horizontal overflow;
7. safe areas respected;
8. buttons remain easily tappable;
9. reload/pageshow/rotation retain correct route visibility;
10. no stale Arena rectangle;
11. Landing does not mutate progression/team state;
12. optional motion cleans up on route exit;
13. reduced/no-motion path remains usable;
14. Campaign/Collection/Tier regressions clean;
15. targeted + impacted regression + build/deploy pass.

## 11. Stop condition

After engineering PASS/deploy:
- player performs a short visual/navigation smoke;
- stop;
- do not start formal Chapter1 art/content or AI polish automatically.

The next phase after player acceptance is formal content definition and art/animation planning.

## 12. Implemented release evidence (2026-10-02)

Static CSS mountain/sun hero and title treatment; gold primary BATTLE, outlined secondary COLLECTION. No motion/transition/timer or formal asset. Existing navigation and route ownership remain unchanged. Safe-area padding and a compact max-height320px variant retain48px minimum buttons.

Safe deployed source: `0a17954f6766ff79c68e825e942e6fb6a995bb06`, branch `feat/m0-combat-core-20260927`, PR#1. Targeted27/27, impacted188/188, build PASS, independent review24/24/no important findings. Actions#332 CI357/357 and Pages deploy SUCCESS. Public source hashes and both navigation/return paths verified.

Detailed evidence and exact physical-device checklist: [M4C verification](verification/M4C_MAIN_MENU_LANDING.md). Physical iPhone safe-area/readability/toolbar acceptance remains pending. M4B T0 player acceptance remains protected. STOP after this release.


## 13. Player acceptance (2026-10-02)

Player completed the deployed real-device Landing visual/navigation smoke and reported the result OK.

Accepted baseline:
- normal launch -> Landing;
- BATTLE and COLLECTION remain sibling entries;
- top-level BACK returns to Landing;
- current static visual hierarchy/readability accepted;
- route visibility and existing progression state remain protected.

M4C is closed. The next phase is formal content definition, not additional Landing rework.
