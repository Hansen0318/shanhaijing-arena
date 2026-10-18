# P2 Basic phase-pose review / zero-context handoff

```text
【山海經聯盟 — P2 猼訑 Basic F1/F2/F4 接手】
所有後續 Chat／Work／Codex 指令必須是一個完整、自足、可一鍵複製 code block。
GitHub 唯一權威。先 fetch 最新 remote，確認 HEAD／分支／PR／乾淨狀態與近期 commits。
Repository Hansen0318/shanhaijing-arena；既有分支 feat/m0-combat-core-20260927；PR #1 open/unmerged。
F3 核准 checkpoint cfd2b22c56e995a528909af08a5a491e490c3afa；phase-poses checkpoint 為包含此檔的 feature commit，必須重新查 remote，不能把 checkpoint 當永久最新。
先讀 AGENTS、WORK_PROGRESS、STATE 頂部，再讀 DEVELOPMENT_PLAYBOOK、PROJECT_BOUNDARIES、DEVELOPMENT_ROADMAP、DEVELOPMENT_ACCELERATION、M5C_ART_ANIMATION_VFX、CHARACTER_ACTION_ART_WORKFLOW，以及 docs/M5C_P2_BOTUO_BASIC_ACTION.md。
P1 COMPLETE BY EXISTING ACCEPTANCE EVIDENCE；普通 Hit Reaction 永久取消。禁止重畫／重測／重部署／重新要求 P1 驗收。保留普通傷害、數字、技能特效、真正狀態控制與 KO。
P2 已核准 Concept／肖像／全身／靜態 Idle／Move／KO 原圖與 packing 保護。F3 已 PLAYER ART APPROVED，玩家原文「好f3我approved，繼續，要確保未來動畫東西要足夠明顯」。
F3 receipt：docs/art/approved/botuo/basic/f3-v1/acceptance.json。
F3 source：docs/art/candidates/botuo/basic/key-pose-v1/F3-contact-master.png。
F3 SHA25619a8e9f8cf74c870558a4ea734b67e03d5eacce71072c5bc979931cf00f42f36。不得再生成或重開 F3 審核。
F1/F2v2/F4 候選、個別提示詞、光暗／小尺寸四張對照、PNG/alpha/hash 檢查與 F2v1 失敗歷史：
docs/art/candidates/botuo/basic/phase-poses-v1/，先讀 README.md 與 verification.json。
第一未完成 Gate：玩家審核 F1 蓄勢、F2v2 出手、F4 收勢。F2-release-rejected-v1.png 僅歷史，禁止採用。
所有未核准姿勢只能 ART CANDIDATE。玩家核准後才做 accepted-pixel common-scale/ground/padding 與獨立 VFX、正常／慢速／角色-only／鏡射／Idle-return GIF 審核，再依授權進 runtime／最小測試／Build/Pages/Public Fingerprint／手機驗收。
明顯可辨識是永久要求：特效關閉仍能看出階段與技能差異；正常速度、手機尺度下角色動作、出招效果及真實命中特效都要清楚。Basic<Heavy<Special<Awakening 逐級增強，reduced-motion 保留靜態辨識。不能靠放大角色、假命中或偷改技能機制。
現行 Basic T0 近距單敵、係數1.00、range0/0.7/1.4、windup0ms、attackSpeed0.85、無位移；禁止套用 P1 180ms 或只延遲 HP。F3/姿勢核准不是時序契約核准，任何變更另行明確批准。
靜態 QA 使用統一 source scale，未宣稱實際手機尺寸／runtime normalization。新圖邊緣 alpha1 雜訊原樣保存，角色可見輪廓有留白；未宣稱透明噪點已清除。
本階段無新 VFX/GIF/runtime/ENGINEERING PASS/deploy/手機 PASS。沿用已驗收部署8e2f5e049095017d7350b1d0d61e96527ab21e44；維持16MiB cache/scene 與 reserve。
Chat 先完成審核素材；Work 僅處理核准後不可替代工程。每個 coherent slice [skip ci] commit+push，更新頂部規則／進度／workflow；所有狀態分開記錄。
禁止 merge main、新建取代分支、引入 TD、開始 Heavy/P3、重做已核准素材；目前停在玩家 F1/F2/F4 姿勢審核 Gate。
```
