# 厚甲 Runtime 接續

```text
接手Hansen0318/shanhaijing-arena；唯一feat/m0-combat-core-20260927、PR#1open/unmerged，先fetch核對完整HEAD/tree/status，保留無關untracked。所有後續handoff只能用一個完整自足copy block。
讀AGENTS/WORK_PROGRESS/docs/STATE、DEVELOPMENT_PLAYBOOK/PROJECT_BOUNDARIES、docs/decisions/2026-10-23-botuo-passive-execution.md、docs/superpowers/specs/2026-10-23-botuo-passive-design.md、docs/superpowers/plans/2026-10-23-botuo-passive.md、docs/verification/P2_PASSIVE_RUNTIME/WORK_LOG.md。
玩家「確認其他未來整體角色開發真的會有效果，就繼續實作」已確認方案並直接授權原生單人執行；不重問開始/方向/執行方式，不委派。Task1–3完成，共用空間防禦被動、P2資料、無文字護甲真實作用，最新完整1063/1063PASS。不是Browser/Build/guard/Pages/玩家驗收PASS。
繼續Task4第一個未完成項：真native/built手機入口四Tier/敵我/減傷/MAX/時間/CD/cleanup/Graphics、P1改動來源回歸及受影響P2守群鎮岳相容→新完整來源guard→正常完整CI/Build/Pages/public核對→厚甲玩家驗收；舊P1 source guard不可覆蓋新Runtime。失敗log保留，不重做前檢/已完成核心或重審美術。
未來角色必須共用資料驅動且有實際戰鬥效果、獨立Tier、清理、來源驗證、發布與玩家驗收才完整；不把此共用核心當所有未知觸發類型已支援。P1已結案、P2四招/美術/比例/anchor/ground/canonical右向與runtime鏡射保持，普通Hit永久取消，P3技能仍blocked。不merge main/另開分支/TD/角色ID特例；全局素材無固定16MiB/數量/reserve拒絕，保留逐檔安全/兩下載/required/所有權/回收/真失敗/destroy。每切片記錄並同分支commit/push，checkpoint不等於發布。
```
