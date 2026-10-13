# P4 九尾狐 static runtime integration — 2026-10-13

## Executable checkpoint / ledger
Recovered authoritative feature HEAD d7847c9dc95adade35975e9621c7e65c1b2af8a6, PR#1 open/unmerged; preceding Actions38324146220 SUCCESS. Player-approved derivatives verified as exact PNG/RGBA/bytes/SHA before byte-for-byte copy. Only manifest/catalog presentation data changes; shared presenter/cache/playback/gameplay/UI architecture unchanged.

| Repo path | Dimensions | Bytes | SHA256 |
| --- | --- | ---: | --- |
| public/assets/characters/jiuweihu/portrait.png | 128×128 | 38601 | b2df8fab63cd71a538622914b0c0d8eabcfc104bc245fd316beaf5e24ff573ef |
| public/assets/characters/jiuweihu/identity.png | 160×192 | 54502 | f8fe054e7a0de50d66e62081ec0fd53e493674cd707d5f2e28be098ab277dd0d |
| public/assets/characters/jiuweihu/battleIdle.png | 160×160 | 32063 | 394497ffa5314a4559fee10d58d799fab9be59b282a31bb3ffebb02670ed6640 |

Identity alpha bbox(6,4)-(153,188); Idle(21,16)-(139,151). Idle descriptor: one160-square frame, duration1/fps1, loopfalse/staticFrame0, origin[.5,151/160], scale2. Display144-square; visible width106.2/height121.5px; bottom alpha extent on gameplay anchor. No enlarging beyond current scale2 family, no coordinates changed. No authored Move/KO/Hit/Cast/VFX/breathing. Team/Collection use identity; compact/HUD portrait use portrait; Arena uses static Idle. Shared ally-original/enemy-mirror paths untouched.

Test-first new6 contracts:5 RED on absent formal slots/descriptor/runtime preload, existing purity contract PASS; all6 GREEN after data-only integration. Actual shared presenter in normal/reduced motion follows X/Y displacement without changing the static frame; enemy/default and negative-X facing + HUD side mirror preserved; snapshots unchanged. Actual createAssetCache and presenter.prepare plus explicit identity loading (menu assets are intentionally not battle-preloaded) retain all accepted P1-P4 slots in both load orders. Transport/renderer doubles only, actual repo file bytes supplied. Shared cache peak10955408 and independently tracked scene decoded-equivalent peak10955408bytes; all below unchanged16777216bytes. No silent drop/fallback for P1/P2/P3 KO or P4 static pack. This is decoded-equivalent residency, not total physical GPU memory. P4stats maxHp230/atk19/def4/moveSpeed1.7/attackSpeed1.05 unchanged.

Targeted70/70 PASS: jiuweihuStatic,assetManifest,formalCatalog,assetPresenter,assetIntegration,assetMenu,teamView,collectionView,battleHud,lushuBotuoKo. Guard55files2037797bytes PASS; build PASS, existing >500k chunk advisory only. Build fingerprints index-C8zPKbfi.js/battleRuntime-Dq3X78vd.js/index-DcqtNRF0.css. Review/push/Pages/public runtime verification pending.

Ruling: explicit user-provided structured handoff is the implementation plan; no design rediscovery. Existing linked isolated worktree reused. User minimal impacted checks override skill full-suite default; configuredCI unchanged. Canonical key spelling is jiuweihu (matches attached filenames and requested paths); jiuwihu in some prompt acceptance rows is a typo, not an alternate asset key. No main merge, no next gate. Remaining player-owned phone acceptance: Team size/Collection/HUD fox face/Arena scale/grouped tails/enemy mirror.
