# M1 Campaign Skeleton — accepted player brief

The 2026-09-30 player request authorizes implementation and release of M1 on the existing active branch/PR. M0 GREYBOX ENGINEERING PASS and iPhone FINAL PLAYER SMOKE PASS are the protected baseline.

## Architecture
Campaign data owns six ordered placeholder chapters, each with five uniquely identified stages. Five chapter cards per row, sixth at row two left. Every stage owns an independent preview image/config and reserved encounter/reward/unlock metadata. No final art/content/economy.

Pure progression derives locked/available/cleared states from validated victory history. Explicit unlocked/cleared chapter/stage arrays are recorded; victory alone unlocks the ordered successor, final victory clears its chapter. Cleared stages remain replayable. Storage adapter validates/version-checks local saves; storage failure leaves a playable in-memory session.

A pure CampaignController guards chapter/stage selection, start, result, retry, exit, next and back. DOM Campaign UI is separate from the immutable 1120x540 Phaser.Scale.NONE arena/input/camera. Stage selection changes preview only; START routes selected stage config through a battle factory using existing BattleSession and graybox definitions. Combat core never reads/writes storage.

Arena result records the authoritative session outcome once. Victory offers NEXT STAGE, RETRY, EXIT; defeat/draw offer RETRY/EXIT only. NEXT shows successor preview, including next chapter first stage. EXIT returns to the current chapter, RETRY reuses stage identity. Standalone KO fixture retains Restart.

## Fixtures and verification
Explicit campaignDev=unlock-all is isolated in memory and never reads/writes formal progress; no fixture button in player UI. Formal fresh state is Chapter 1 / 1-1 only. Node targeted tests cover model, progression, storage, navigation and stage routing. Full existing combat regression/build and public Pages smoke required; real iPhone Campaign acceptance remains pending.

## Stop
After engineering/deploy/public smoke, stop. No formal art, story, bosses, rewards, tiers, recruitment, shop, gacha or animation.
