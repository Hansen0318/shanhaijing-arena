# 被動VFX／玩家文案修正 — 正常發布接續

```text
接續Hansen0318/shanhaijing-arena。GitHub唯一權威，先fetch最新feat/m0-combat-core-20260927，核對完整HEAD/tree/branch/PR#1open-unmerged/working tree/最近commits。保留無關untracked，原生單人，不委派、不merge main/新分支/TD/角色ID特例。所有Chat/Work/Codex交接都要單一完整自足可一鍵複製code block。
讀AGENTS/WORK_PROGRESS/docs/STATE/DEVELOPMENT_PLAYBOOK/PROJECT_BOUNDARIES/DEVELOPMENT_ROADMAP/CHARACTER_ACTION_ART_WORKFLOW、docs/decisions/2026-10-23-passive-vfx-player-copy.md、docs/art/approved/botuo/passive/runtime-v1/acceptance.json，以及docs/verification/PASSIVE_VFX_COPY_REVISION/REPORT、WORK_LOG、release-evidence、reuse-proof與最新release/public證據。
玩家要求全現有及未來被動有相符VFX與玩家文案規則，並條件核准已呈交厚甲；收據精確綁定release1f6b47b4e30a867b1b8d294c69fdeaedc51f0b98。Collection修正是本次義務；不冒稱未展示新P1風痕或新文案已驗收。原P1數值/四招/美術與P2四招核准不重開。
已完成共用movement speed-streaks青色風痕1/2/3/4組，P2琥珀護甲保持。P1/P2 Collection只寫玩法效果/必要Tier數字與持續CD，不含工程限制/無文字/已實裝等；未開放被動誠實標示尚未開放。所有現有與未來被動完成必須包含符合技能的真效果、獨立Tier成長、對應VFX、reduced-motion可讀、expiry/KO/end/Restart/destroy清理、驗證/正常發布/玩家驗收；不得只有文案/名字/基礎HP DEF，不一律套護甲/風痕，不放大角色或顯示戰場被動文字牌/HUD/數字/連線。所有玩家介面禁止混入製作規則，工程約束放docs/測試。
新來源P1native16/built8、P2native16/built8、Collectionnative5/built5 PASS；完整1070項含sourceguard負向測試與Build，最終以最新報告為準。P2舊四招native4/built2/尺度10僅沿用reuse-proof逐hash確認不變的計算/素材/技能呈現範圍，共用被動呈現另有新48案，不拿舊599guard覆蓋。
第一未完成步驟是原分支正常完整CI/Build、新scripts/verifyPassiveVfxRelease.mjs、Pages與CI/local及公開149檔核對。若最新報告已完成，來源未變直接沿用，不重跑/重部署/下載相同素材。文案修正發布後以已核准base/四招加本次被動收據行政結案P2，不捏造新裝置整角量測；新P1風痕只交付新增呈現供觀察，原疾行數值/動作不重驗。P3技能仍BLOCKED，不自行開發。
保護所有approved masters/收據/GIF/尺度/anchor/ground/右向canonical左向mirror；P1疾行35/50/65/80%、3秒/CD6秒與95%顯式額度不動；普通movement/outgoing15%不動，不能套到減傷。P2厚甲20/30/40/50%、4秒/CD8秒，守群/鎮岳真傷害/真狀態/instant/tactical/MAX與獨立到期契約保持。普通Hit永久取消。素材無固定16MiB總量/required數量/reserve拒絕門檻，保留逐檔安全、兩下載、完整required、所有權/回收/真失敗/destroy。每切片更新規則/進度/報告/handoff並同分支commit/push，純文件[skip ci]。
```
