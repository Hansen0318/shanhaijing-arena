# P3 Basic 水矢 Runtime — ledger

Recovery HEAD 2f37959d63f65f76ec697fc98ee9ccb3a7108ea2, single active branch, PR1 open/unmerged. Player confirmed composite preview: 我確認 紀錄 繼續. Exact receipt docs/art/approved/chiru/basic/composite-review-v1/acceptance.json.

## Bounded execution plan (existing approved spec; no new design approval)
1. Save receipt/checkpoint and preserve all sources.
2. RED→GREEN shared opt-in resolve-time finite line (halfWidth .12); windup180ms, target point locked, source follows caster. Four Tier / instant-tactical / movement miss / cancellation / anonymous definition tests.
3. Source-preserving equal-cell runtime poses and three independent water effects; calibrate head/chest/support to existing Idle. Data-only Chiru action descriptor; shared charge/line attachment, both directions, no damage owned by presenter.
4. Necessary full tests/build, real native+built browser, source guard, CI/normal Pages/public validation. Save checkpoints before long validation. Player game acceptance PENDING, no Heavy.

Ruling: use current shared windup/pending action engine with new opt-in line geometry, rather than telegraph/projectile travel; approved Basic is instantaneous line flash at180ms, not Heavy's lane timing. Source spec: docs/superpowers/specs/2026-10-23-chiru-whole-character-design.md, superseded workflow only by latest sequential decision.

Task1 receipt saved, Runtime not yet implemented.

## Runtime implementation / local verification
- Lifecycle RED reproduced missing windup/line; GREEN18/18. Added timeout residual RED→GREEN, lifecycle19/19.
- Presenter RED6/6 missing descriptor; GREEN6/6 with independent charge / line / confirmed impact, mirror/Pause/Idle/destroy. Initial fixture used world units as pixels; fixed fixture to72px/unit, production unchanged for that finding.
- Shared schema opt-in `resolveGeometry: locked-line/halfWidth .12`; range-clamped cast aim from current caster at180ms. Original target only, no homing/retarget/piercing/extra damage. Runtime knows no character ID.
- Four source-preserving cropped cells168x168 from accepted safe cells; pixel roundtrip, common ground163, native density.9; four separate required assets total663928 decoded bytes. Full encounter now53 keys/19000920 decoded bytes; no fixed global limit.
- First full suite logs kept in.git:14 failures were old inventory/timing and release-guard fixture expectations plus real timeout residual. Second full1094/1095, only asset guard expected91 vs95. Updated exact inventory95/5274487 bytes. Final local TAP1096/1096 PASS; Build PASS (existing Phaser bundle-size warning only).
- Approved old passive source guard/receipt unchanged. Historical guard negative test reconstructs only exact hash-matched prior bytes from `previous-passive-release-sources.json`; this is NOT evidence for new source. New source uses its own Chiru release guard and tamper/false-browser tests (RED then GREEN).
- Local Chromium installer returned195-byte HTML `Site Unavailable`, not a ZIP. No local true-browser PASS claimed. Normal CI now runs full tests→Build→new real Chromium native32/built4 cases→exact source-bound guard→Pages; Browser failure blocks deploy. Old P1/P2 verification workflows remain active, no disabling/bounded release tags.
- Ruling: snap only a <=1e-10-second residual at requested maxSeconds to exact deadline; reproduction stranded battle at89.999999999997 with surviving actors. No duration/HP/tie rule changes.
- Final review: native author self-review required by AGENTS no-delegation; not independent review. Checked locked-point/moving-source geometry, opt-in defaults/P1-P2, three required VFX pins/cleanup, frame preservation/ground/mirror and normal CI publication gate. No merge/main/new branch.

NEXT: commit normal Runtime candidate, inspect real CI Browser/source guard/Build/Pages, fix actual findings, retrieve exact artifacts and compare public build. Player actual Basic acceptance still PENDING; no Heavy.

## Normal CI / release completion

## 2026-10-23 — Basic 水矢已正常部署；唯一剩餘Gate=玩家遊戲驗收

Release266114c46406e39c8501ccad370ce69bfe34f236/treeb6289ff292bd6de351ada7260c3bc8ae54963bf4，正常Pages#1106/run39942845654 build120378242516＋deploy120379282819 SUCCESS。完整1096/1096、Build、95素材guard、新555來源guard、CI真native32/built4 PASS；P1被動39942845637/P2覺醒39942845643相容workflow SUCCESS。CI artifact SHA256/ZIP CRC通過，CI/local153逐bytes一致；公開153/153（7新下載＋146相同path/bytes/hash沿用）PASS。證據docs/verification/P3_BASIC_RUNTIME/{REPORT.md,release.json,release-jobs.json,release-evidence.json,browser/,public-fingerprints.json}。

水矢180ms真有限線命中/落空與凝水/水矢/真命中水花已在正常遊戲；核准F3/姿勢/FX/GIF原圖、尺度/anchor/ground及P1/P2保持。此為工程/發布PASS，**Basic尚未PLAYER VERIFIED，不是整角COMPLETE**。唯一下一步：呈交 https://hansen0318.github.io/shanhaijing-arena/?basic=266114c （隔離Lab：https://hansen0318.github.io/shanhaijing-arena/?battleLab=1&basic=266114c ）供玩家實際驗收；未收到本版本明確核准，不存Runtime acceptance、不開始Heavy。來源未改不重跑本次已通過驗證或部署。

已核准美術精確收據docs/art/approved/chiru/basic/composite-review-v1/acceptance.json（玩家「我確認 紀錄 繼續」）只覆蓋GIF/動作/FX，不能取代遊戲驗收。全局逐招Basic→Heavy→Special→Awakening→Passive保持，不恢復整包。PR#1 open/unmerged、同分支，不merge/新branch/worktree/TD/角色ID特例、普通Hit取消、無16MiB固定上限與逐檔安全/兩下載/required/回收/destroy保持。此次只補發布證據與最新進度[skip ci]，不改產品來源。


No further product change after266114c; all final additions are evidence/docs. Native author visual inspection of two exact CI screenshots passed. Player actual game gate remains pending.
