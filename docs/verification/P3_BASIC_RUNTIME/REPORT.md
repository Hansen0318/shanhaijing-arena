# 赤鱬 Basic「水矢」發布驗證

ENGINEERING / NORMAL CI / PAGES / PUBLIC PASS；玩家遊戲驗收 PENDING。

發布266114c46406e39c8501ccad370ce69bfe34f236，tree b6289ff292bd6de351ada7260c3bc8ae54963bf4。正常Pages #1106／39942845654 build120378242516與deploy120379282819均SUCCESS。完整1096/1096、Build、95檔素材guard、555檔新來源guard PASS。P1既有被動workflow39942845637與P2覺醒workflow39942845643皆SUCCESS，未禁用/取代既有檢查。

CI真Chromium/Phaser/WebGL：native32案（四Tier×instant/tactical×normal/reduced×左右）；built4案（T0、左右×normal/reduced、實際Campaign→Stage→Team→Arena、portrait selection callback與真正自動Basic）。證明180ms真生效、無提前傷害、凝水/水矢/命中水花、Pause、Idle返回、落空無target水花、取消、KO/end、Restart/texture清理與尺度/ground。不是physical phone/FPS/GPU證據。本機Chromium下載失敗如ledger紀錄，全部真Browser PASS來自CI；artifact已下載、SHA256與ZIP CRC核對並保存原始報告/截圖，無捏造本機執行。

CI Pages ZIP與本機153檔逐bytes一致；公開153/153匹配，7個新path/hash重新下載核對，146個未變path/bytes/hash沿用既有公開證據，詳public-fingerprints.json。兩個artifact digest詳release.json，正常CI原始步驟詳release-jobs.json；release-evidence.json為CI精確產物，本機新guard讀回仍PASS555。已目視built-T0-normal-1.png與native-T3-normal-1.png，水矢與真target水花清楚可見，未放大角色或更動已核准原圖。

改動：共用windup搭配opt-in locked-line半寬.12、180ms固定aim/current caster finite segment/range clamp，無homing/穿透/角色ID特例。四個Runtime PNG保留核准safe-cell像素與獨立FX；普通攻擊cadence及Tier傷害/range不改，Collection只修本招玩法文案。既有P1/P2/passives、其餘P3招式和全部approved art/receipt不改；歷史passive guard原樣保留，負向測試用精確舊來源fixture，不能以其PASS代替本次新來源。

本機回歸曾重現90秒前3e-12秒殘差造成戰鬥不結束，已有RED→GREEN測試，只在請求maxSeconds且差距≤1e-10時收斂精確deadline。原生單人作者自審，非獨立review。無main merge/新branch/worktree/TD，PR#1 open/unmerged。

唯一下一Gate：玩家實際遊戲驗收Basic。使用release.json內normal/Lab URL。收到本發布版本明確核准才保存Runtime acceptance receipt並開始Heavy；不能把本次GIF核准當作Runtime已PLAYER VERIFIED。
