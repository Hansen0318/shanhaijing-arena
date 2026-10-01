# M3 Preview Contrast Correction — 2026-10-02

**ENGINEERING PASS / PLAYER SMOKE PENDING**. Branch feat/m0-combat-core-20260927 / PR#1 retained. Recovery base0636172132c2719f68d5a154039a1f34e30aac7e; safe deployed source2d25cdeb8fb07fbf3e1078b67bff9c66d123bddc; closure is documentation only.

Product diff only removes the policy span from CampaignView reward rows and its unused CSS. Claimed non-repeatable rows retain muted color and now use opacity.5; normal rows stay#ffe0a0/opacity1. Existing authoritative status chooses the class. Reward engine/transactions/persistence/quantity/config/ownership/TeamSelect/Result/combat unchanged.

Actual checks:
- RED `node --test tests/rewardPresentation.test.js`:5/7 (two expected label-removal failures).
- GREEN `node --test tests/rewardPresentation.test.js tests/universalRewards.test.js tests/campaignNavigation.test.js tests/teamFlowView.test.js`:28/28. Updated existing actualDOM tests assert label absence, each separate character/quantity row, unclaimed normal, claimed firstClear dimmed and repeatable normal. Existing authoritative Scene Result coverage retained.
- Build, diff whitespace and bounded product diff review PASS. No unrelated local full suite/manual historical smoke.
- [Actions#290 /36942296853](https://github.com/Hansen0318/shanhaijing-arena/actions/runs/36942296853): configured full CI288/pass288/fail0, Build and Pages Deploy success; jobs110636375075/110636469702.
- Local/CI/public JSindex-BLZigtQP.js, CSSindex-CtA1vGg1.css match. Public fresh1-1 Preview renders P4Shard×3/P2Shard×2/P2Shard×1 without policy words; all computedcolor rgb(255,224,160)/opacity1. Already-cleared visual distinction is DOM contract coverage, not a new live battle/player claim.

Exact player smoke: on a cleared Stage Preview, policy labels absent, already-claimed first-clear rows clearly dimmed, repeatable row remains bright; unclaimed rewards bright, text readable on the device. No reset/full unlock replay needed for this presentation-only correction. STOP before M4.

Design decision recorded in CHARACTER_SYSTEM: future formal Team Select idle/micro-animation character name remains below the character. No Team Select or animation implementation in this slice.
