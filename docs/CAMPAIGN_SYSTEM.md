# Campaign System — M1 Skeleton

## Current implementation
- Six data-driven placeholder chapters, five stages each, five chapter cards per row; Chapter 6 begins row two left.
- Chapter cards: locked dark image + central lock, available normal image, cleared CLEAR and replayable.
- Stage Select: in-game BACK, selected large image/title/START above five independent thumbnails. Thumbnail changes preview only.
- Formal fresh progression: only Chapter 1 / 1-1. Victory unlocks next ordered stage; five victories clear the chapter and unlock next chapter / first stage. Defeat/Draw do not clear/unlock. Cleared content stays replayable.
- Result: Victory NEXT STAGE / RETRY / EXIT; Defeat/Draw RETRY / EXIT. NEXT goes to preview, including next chapter first stage; final Campaign stage has no NEXT. EXIT returns to same chapter and Retry starts fresh same-stage BattleSession.

## Boundaries
Data: src/campaign/data.js. Pure state: progression.js. Guarded navigation: controller.js. Replaceable versioned localStorage adapter: persistence.js. DOM view/style separate from Arena. battleFactory.js instantiates existing BattleSession from lineup/formation/duration with explicit stageId/chapterId.
Current shared graybox template supports the protected 90-second battle limit only; other durations reject rather than silently disagree with combat core. No core, joystick, projection, HUD geometry, AI or ability refactor.

## Persistence and fixture
Save key: shanhaijing-arena.campaign.v1. Rebuild availability from known sequential wins, ignoring forged unlock arrays/foreign IDs/obsolete versions. Broken/denied storage recovers fresh/in-memory; persistence cannot survive reload if browser denies storage.
Explicit ?campaignDev=unlock-all is engineering-only, absent from player UI, uses separate in-memory progress and never loads/saves formal progression. ?fixture=ko preserves standalone KO/Restart diagnostic.

## Future concept, not implemented
Each five-stage chapter may later introduce its mechanic, recruitment encounter, escalation, and finale/boss. Reward/finale/unlock/team/background fields reserve content space only. Formal stories, recruit battles, Boss systems, rewards/economy, fragments, tiers, art and animation remain out of M1.

## Verification
M1 regression 134/134, check/build and Actions #223 deployment PASS; public smoke completed fresh selection, Victory/Exit/unlock, replay, Next preview, Back, persistence and fixture isolation. Subsequent bounded return/Pause/Exit/orientation/confirmation corrections also deployed successfully. Player later completed real iPhone smoke and accepted the current M1 Campaign/battle flow. M1 is PASS / PLAYER VERIFIED; see docs/STATE.md and WORK_PROGRESS.md for the current handoff.

## M2 Team Select integration
Stage Preview START now opens Team Select. BACK returns to the same selected Preview. BATTLE is enabled for exactly 3 unique owned eligible characters; selected IDs feed battleFactory at the existing formation. A1/A2/A3 remain runtime slots, with slot 2 front. Retry preserves the frozen battle team; Exit and Next retain existing Campaign behavior. Character/team save is independent of Campaign save. See `docs/M2_TEAM_SELECT_RELEASE.md` for completed deployment/public flow smoke and pending iPhone acceptance.

## Post-acceptance matchup polish
Team Select displays selected ally slots vs the actual stage enemy lineup. Both enemy preview and battle factory use encounterDefinitions/stageEnemyDefinitions; no independent hard-coded preview. Type marks derive from immutable definition type and do not change the counter triangle. Team ownership/eligibility/persistence/navigation remain unchanged. M2 has since been player accepted; polish-specific iPhone readability/feel remains pending.
