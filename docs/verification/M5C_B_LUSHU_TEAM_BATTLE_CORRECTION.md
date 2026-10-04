# M5C-B — 鹿蜀 Team Preview / battle correction

Status: implementation/checks complete; safe checkpoint / deployment pending.
Baseline32beb119e5e0af2c2af9301223f6e0485e608af8, feat/m0-combat-core-20260927 /PR#1 OPEN; baseline Actions37178297499 SUCCESS. No main merge.

## Latest direction / implementation
- Latest player direction separates upper selected3v3 full-body lineup from lower head/bust cards. Upper uses static collectionArt via existing decoratePortrait/resolver; unframed three ally figures and three enemy figures, central VS36–68px. Existing slot click/removal/forced FRONT rules, enemy definitions and battle spawn untouched. Enemy identity preview mirrors only pixels. No overlap required in this first layout. Structures can later host micro-animation; no animation runtime added now.
- Only鹿蜀 has approved identity art: both ally/enemy preview slots show its complete existing144×192 F1 static image. Other characters retain procedural identity placeholders; no new designs/images are authored. Portraits only belong to lower bench/Collection small cards in this flow.
- Bench portrait uses full inner card width versus old34px; Collection portrait uses full inner width versus old44px. Existing128×128 portrait magnified1.12 around50%/40% to emphasize head/bust; clipped in small-card host only. Shared gradient is35% character color mixed with#101a28 at top,80% character color mixed with#c4d8e5 at bottom. Shared read-only Tier palette: T0#ffffff /T1#70d99a /T2#70baff /T3#c899ff. Actual acquisition Tier forwarded to Team and used in Collection; selected inset gold highlight keeps Tier border distinct. No gameplay/acquisition changes.
- Detail remains static144×192 full identity with existing larger-layout/no-overflow contracts. Future Detail breathing and Shanhaijing character scenic background recorded in M5C/art visual spec, explicitly deferred. Upper-lineup future animation also deferred.
- Battle left/right side-card name text removed from actual Arena createHud; portrait/HP text/bars/input/selected scale/KO alpha retained. Formal HUD image remains under HP.

## Disappearance root cause / fix
Actual Arena drains damage events and calls presenter.hit. Hit descriptor resolves to procedural placeholder.battle with no texture. Old render always hid the previously loaded idle sprite before imageFor returned null. Thus body disappeared for each hit interval; when idle resumed it reappeared near its changed gameplay location. This is a missing-state-art presentation bug, not movement/reset/AI geometry.
New render selects current state art if loaded, else existing idle descriptor static first frame. State identity/start/duration remain untouched; idle resumes normally after transient duration; missing KO renders idle static at.35alpha. The visual follows current projection/facing/origin each render. Characters with no image retain Arena procedural markers. No Hit/KO/Cast asset authoring, new state engine or duplicated facing artwork.

## Protected assets / budgets
All canonical/runtime PNG hashes unchanged from baseline: canonical2172×724 /4×543×724 SHA256b6270ec433a1e35a6d9075ed3b6a860a1032ab0ab9e06099227fc78fea60a49b. Runtime idle384×128 /4×96×128 /70,848encoded /196,608decoded; portrait128×128 /23,816 /65,536; identity144×192 /35,708 /110,592. Encoded/decoded asset delta0. Battle continues72×96 display/scale2/fps2.5/1.6s/common origin[.5,691/724]. Four frames/no VFX/no tail redesign/Pause-safe clock preserved.
Battle cache impact unchanged: idle+portrait256KiB/two entries. Upper Team static identity is now intentionally requested only on that visible menu surface; Landing has no art preload, menus never decode/play idle strip. No future-character preloads or architecture change. Existing guards/cache/scene cleanup/fallback limits intact.

## Verification evidence
- Four new contracts observed RED before implementation: upper/lower slot split; real hit/missing cast/KO visible static identity with movement/mirror/anchor; deterministic actual battle damage events keep both formal actors visible; actual Arena HUD names absent/HP states intact.
- Fifth contract covers four distinct Tier palette values and Collection using a valid earnedT3 fixture without mutating acquisition. Invalid test fixture initially normalized toT0 per existing accounting rules; fixture corrected to earned/spent30, no production accounting change.
- Targeted/impacted command: node --test tests/lushu*.test.js tests/asset*.test.js tests/collection*.test.js tests/team*.test.js tests/viewportSync.test.js tests/routeOwnership.test.js tests/lazyBattleRuntime.test.js tests/battleLabRuntime.test.js tests/preBattleGate.test.js tests/appRouteReset.test.js tests/hudCardLayout.test.js →133/133 PASS.
- Existing Team row budget covers667×320,844×320(inset21),740×360,844×390,932×430. Full figures use contain/flexible zero-min-height region; real iPhone Safari visual acceptance is player-owned. No added overlap. Prior Detail nonzero grid remembered scroll/focus/root and Team/Stage/Chapter BACK/visualViewport/orientation/idle/loading tests PASS.
- Build/asset guard40files148,075bytes/diff PASS. Existing chunk advisory remains. No full local suite; unchanged Pages workflow runs standard CI policy.
- Whole diff review: menu/presenter/HUD/CSS and tests only; no combat/AI/numbers/Tier costs/accounting/rewards/progression/save schemas/spawn geometry changes. Baseline BACK/facing/Idle integrations reused.

## Release closure pending
Save checkpoint; verify Actions/Pages/public fingerprint and changed Team/Collection/Detail/HUD surfaces. Then ENGINEERING PASS / PLAYER SMOKE PENDING. Do not claim device/player verification.

## Player smoke / STOP
Only13 requested items: upper full-body3v3; bigVS; complete ally/enemy鹿蜀; any overlap acceptable; enlarged lower head; dark-top/light-bottom gradient; distinct Tier borders; Detail full identity; side-card names absent; no battle disappearing; readable battle body; movement mirror; BACK/root/internal-scroll correct. No Detail animation/scenic background smoke. Stop for player and Chat post-acceptance review before promoting future-character hard rules; no other states/characters/VFX/audio/Chapter2/gameplay work.
