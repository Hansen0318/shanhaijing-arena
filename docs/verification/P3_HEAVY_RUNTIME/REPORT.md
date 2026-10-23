# P3 Heavy 湧浪 release verification

## 2026-10-24 — Heavy 湧浪已正常部署；唯一下一Gate＝玩家遊戲驗收

Release `4b8552650798a5bc5a23c6b411a40ef86abadcaf` / tree `a726b44da2cb27875c19e88e4dabe07aaa1a55d7`；正常Pages#1110/run40037402312、build120700424740與deploy120701557955 SUCCESS。完整1124/1124、Build、99素材guard、588來源guard PASS；Heavy真native32/built4、Basic相容native32/built4 PASS。CI/local157逐bytes一致，公開157/157（7fresh＋150同path/bytes/hash沿用）PASS；3份artifact SHA256與ZIP CRC PASS。P1相容workflow40037402283 SUCCESS，涵蓋P1/P2被動、P2覺醒native4/built2/尺度與Collection；獨立P2workflow40037402354最後仍ACTIVE，不冒稱其成功，已有相同來源P2真驗證通過證據，不重跑。完整證據 docs/verification/P3_HEAVY_RUNTIME/{release.json,release-jobs.json,release-evidence.json,browser/,basic-compatibility/,p1p2-compatibility/,ci-local-build.json,public-fingerprints.json}。

已核准Heavy動作／壓縮水環／粗浪柱／真命中爆浪接入正常遊戲。單target有限lane，cast鎖aim，發射固定origin/clamp，發射後350ms才真結算，miss無target爆浪；四Tier及兩模式同契約，普通走位/鏡像/懸浮anchor/共同尺度保持。已修復無其他planner時coarse step把release推遲至contact的真Browser缺陷，RED→GREEN regression與失敗證據保留attempts/。全部approved masters/舊收據/P1/P2/Basic保持，無Special/TD/新branch/worktree/委派/main merge。

**唯一下一步：呈交 https://hansen0318.github.io/shanhaijing-arena/?heavy=4b85526 （隔離Lab：https://hansen0318.github.io/shanhaijing-arena/?battleLab=1&heavy=4b85526 ），請玩家選赤鱬並用H重擊實測。** 工程/部署PASS，不代表Heavy遊戲PLAYER VERIFIED；沒有Runtime acceptance收據，不開始Special。玩家本次GIF核准收據 docs/art/approved/chiru/heavy/composite-review-v1/acceptance.json 保持，不把動畫核准擴成未玩過的遊戲核准。來源未變不重跑suite/Build/Browser/Pages。此次為發布證據/進度checkpoint[skip ci]，仍同分支PR#1open/unmerged；逐招Basic→Heavy→Special→Awakening→Passive保持，所有後續交接提示單一自足可複製code block。


Native/built screenshots are controlled real Phaser/WebGL/mobile emulation; no physical-phone/FPS/GPU claim. Failed first two native attempts retained with their artifact hashes and root-cause evidence. Author visual/source review only, no delegation.
