# P4 九尾狐 WORK_LOG

## 2026-10-25 — P4五招規格 PLAYER APPROVED；Basic靈火單張F3 NEXT

玩家先確認「有依照規則，確保技能都能明顯辨識大場面華麗嗎」，收到無FX動作差異/同尺度Basic<Heavy<Special<Awakening/獨立施法與真命中VFX/真target狀態生命週期與GIF驗收說明後，回覆「好我確認，紀錄後繼續」。依此保存已呈交ea1b9e1規格核准，精確收據docs/verification/P4_CHARACTER_PREFLIGHT/spec-acceptance.json綁定spec/proposal/baseline SHA256，原呈交bytes不改；其PENDING僅為原呈交歷史。不得再要求同版整表核准，也不把本次接續當未見美術/GIF/Runtime核准。

唯一下一工作：沿核准P4 identity/Idle、右向canonical/左mirror、配件側別與原解剖尺度，製作Basic靈火單張本體F3候選（單手短促前點、另一臂收身、九尾低幅偏後），供玩家美術審核。這次先不做F1/F2/F4、獨立VFX/GIF/Runtime/部署，不開始Heavy。Basic兩模式真命中0ms，不為姿勢新增蓄力或飛行傷害。F3核准後才其他姿勢/獨立VFX/GIF→玩家核准→Runtime/必要真驗證→正常Pages/public→玩家遊戲核准。

五招/四Tier/獨立惑心/真控制與targetVFX/餘焰等契約依核准spec保持。P1/P2/P3 COMPLETE與P4 base/Idle/Move/KO核准不重做；32個P4現況probe、68source綁定及既有P1–P3證據沿用，不重跑Build/Browser/Pages/公開下載。本節是規格收據/進度checkpoint[skip ci]，尚未生成候選。原生單人、同分支feat/m0-combat-core-20260927、PR1 open/unmerged，不委派/新branch/worktree/TD/main merge/重置存檔，approved bytes/尺度/anchor/ground/mirror、普通Hit取消、整層示意退休與素材安全規則保持。handoff維持單一完整自足code block。後續F3候選狀態以本角色WORK_LOG/最新頂端為準。


## 2026-10-25 — PREFLIGHT COMPLETE / SPEC PLAYER REVIEW PENDING

- 恢復b7d696a原分支及tree9fdafb6e，PR1 open/unmerged；fresh clone無未push工作；完整remote tree未見更新P4 Gate。
- 查讀規則/進度/closure/核准收據與P4已核准base來源，保護P1–P3與全部原圖。
- 完成68來源blob綁定、真Tier資料投影、32個P4現況隔離施放PASS；原始輸出baseline.json/current-source-probes.json，重現腳本preflight.mjs。
- 完成整角spec與machine-readable proposal：保留四主動全部現行數值/範圍/CD/兩模式時序，新增惑心獨立命中被動提案，control持續.2/.3/.4/.5秒、成功才CD8秒，真target狀態VFX；T2顯示名孤焰追獵待審。
- 保存current/proposed/approved/implemented區別、完整五招素材/Collection需求、共用能力差異及控制/同刻/多instance/清理契約。原生單人自審，不是獨立review。
- 沒有新美術/Runtime/Build/Browser/Pages，沒有新acceptance，不宣稱P4整角完成。純文件[skip ci]，不重跑P1–P3。
- **唯一下一Gate：玩家審核spec-v1。** 核准後先保存綁定本次spec/proposal/baseline的收據，再依逐招流程只接Basic靈火單張F3。若修改設計則僅修spec/proposal，不擅自生成四招素材。
- 本Gate推送SHA以包含本檔的最新remote commit為準；復原先fetch，不能拿本節baseline SHA覆蓋較新成果。
