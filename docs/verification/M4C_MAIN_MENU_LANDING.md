# M4C Main Menu / Landing Visual Polish — Verification

**ENGINEERING PASS / PLAYER SMOKE PENDING** — 2026-10-02.

## Scope and recovery

Branch `feat/m0-combat-core-20260927`, PR#1 retained.
Recovery base `23c311120c97bdc9853954d9be831c02c9a8bd30`.
Early implementation checkpoint `c91ac3ed3d2814fb0d8f65122c973223fab5e3db`.
Final tested/deployed source `0a17954f6766ff79c68e825e942e6fb6a995bb06`.
Subsequent closure is documentation-only; recover remote latest.

Only product files changed: Landing branch in src/campaign/view.js and Landing-scoped src/campaign/style.css. Static CSS mountain/sun hero, title identity, gold primary BATTLE and outlined secondary COLLECTION. No motion, transition, timer, formal art or additional entry. Decorative backdrop is aria-hidden and ignores pointer events.

Protected: existing route/navigation owner, Campaign, Collection, M3 rewards/accounting, M4B T0 costs5/10/15, team and combat. No state/controller/persistence changes.

## Checks actually run

- New Landing tests RED0/4 -> GREEN4/4: hero/two actions, both routes and BACK, retained nonzero earned/spent/Tier/team/Campaign state with zero writes, rerender without duplicates.
- Final targeted27/27 PASS:
  `node --test tests/landingView.test.js tests/appRouteReset.test.js tests/collectionNavigation.test.js tests/collectionView.test.js tests/routeOwnership.test.js tests/viewportSync.test.js`
- Final impacted188/188 PASS:
  `node --test tests/landingView.test.js tests/collection*.test.js tests/tier*.test.js tests/allChapterRewards.test.js tests/campaign*.test.js tests/acquisition*.test.js tests/rewardPresentation.test.js tests/universalRewards.test.js tests/team*.test.js tests/rosterTeam.test.js tests/routeOwnership.test.js tests/appRouteReset.test.js tests/progressReset.test.js tests/viewportSync.test.js tests/orientationGate.test.js`
- Four added actual-main restoration cases:568×320,667×300,844×390,932×430. pageshow/orientation/window resize/visualViewport resize+scroll reassert Landing/#game hidden and viewport offset, without altering saves. Existing Battle owner test still covers #game visible. These exercise executable contracts, not browser-rendered physical readability.
- Independent read-only review24/24 PASS, no Critical/Important findings.
- npm run build and git diff --check PASS. No unrelated manual combat replay or ritual local full suite.

## Actions / Pages / public source

[Actions#332 /37009391394](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/37009391394) at final source:
- build job110845215683: tests357/357, fail0, build/artifact success;
- deploy job110845344569: Pages success.

Public/local/CI bundles match:
- JS `index-nO1VZ07x.js`
- CSS `index-082fIvTy.css`

Public [Pages](https://hansen0318.github.io/shanhaijing-arena/) observed:
- normal launch renders polished Landing;
- BATTLE -> Chapter Select -> BACK -> Landing;
- COLLECTION -> Collection -> BACK -> Landing;
- reload -> Landing; #game stays hidden;
- cloud1363×936: no horizontal overflow; both buttons310×58px;
- static hero screenshot visually inspected; clear primary/secondary hierarchy.

No reset/save injection/upgrade performed during public verification.

## Limits and exact player smoke

Static prototype presentation only. Existing Phaser bundle-size advisory remains nonblocking. Safe-area padding and compact max-height320px styling are implemented; physical iPhone Safari readability, browser chrome and touch acceptance are not claimed.

Use normal URL; no reset or broad replay required:
1. Open/reload on iPhone landscape. Title, BATTLE and COLLECTION fully readable including shorter viewport; no horizontal scroll or notch/browser chrome overlap.
2. Tap BATTLE, then top-level BACK: return Landing. Tap COLLECTION, then BACK: return Landing.
3. Rotate and expand/collapse Safari toolbar, then reload: no stale Arena rectangle or blocked buttons.
4. Confirm existing Collection shards/Tier and saved lineup remain unchanged.

Await player acceptance, then STOP. Do not start formal content/art/animation, AI tactical variation, Tier bonuses or new progression.
